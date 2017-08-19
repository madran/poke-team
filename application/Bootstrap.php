<?php

use Doctrine\ORM\Tools\Setup as DoctrineSetup;
use Doctrine\ORM\EntityManager;
use Doctrine\Common\Cache\ArrayCache;

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    public function _initAutoloader()
    {
        $autoloader = new Zend_Application_Module_Autoloader(array(
            'namespace' => 'Db_',
            'basePath'  => dirname(__FILE__),
        ));
    }
    
    public function _initRouting()
    {
        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/routing.ini', 'production');
        
        $this->bootstrap('FrontController');
        $frontController = $this->getResource('FrontController');
        $router = $frontController->getRouter();
        $router->addConfig($config, 'routes');
    }
    
    public function _initViewHelpers()
    {
        $this->bootstrap('view');
        
        $view = $this->getResource('view');
        $view->headMeta()->appendHttpEquiv('viewport', 'width=device-width, initial-scale=1');
        $view->headTitle('PokeTeam');
        
        $view->headLink()->appendStylesheet('packs/bundle.css');
        
        $view->headScript()->appendFile('packs/bundle.js', 'text/javascript');
    }
    
    public function _initDoctrine()
    {
        $config = $this->getOption('doctrine');
        $isDevMode = APPLICATION_ENV === 'development' ?: false;
        
        $cacheDriver = new ArrayCache();

        $doctrineSetup = DoctrineSetup::createAnnotationMetadataConfiguration($config['paths'], $isDevMode);
        $doctrineSetup->setQueryCacheImpl($cacheDriver);
        
        $entityManager = EntityManager::create($config['connection'], $doctrineSetup);
        
        Zend_Registry::set('em', $entityManager);
        
        return $entityManager;
    }
}

