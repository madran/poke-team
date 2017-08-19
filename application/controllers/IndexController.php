<?php

use \Doctrine\ORM\ORMException;

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        $this->em = Zend_Registry::get('em');
    }

    public function indexAction()
    {
        
    }
    
    public function loadGymsDataAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        
        if ($this->getRequest()->isXmlHttpRequest()) {
            if ($this->getRequest()->isPost()) {
                $gyms = '['
                        . '{"id":1,"raidEndTime":"01:23:49","raidLvl":3,"pokemonName":"Pika"},'
                        . '{"id":2,"raidEndTime":"00:23:01","raidLvl":5,"pokemonName":"Piku"},'
                        . '{"id":3,"raidEndTime":"01:23:23","raidLvl":1,"pokemonName":"Pike"}'
                        . ']';

                return $gyms;
            }
        } else {
            echo 'error';
        }
    }

    public function saveAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        
        if ($this->getRequest()->isXmlHttpRequest()) {
            if ($this->getRequest()->isPost()) {
                $gymData = $this->getRequest()->getParam('gym');
                $raidEndTime = $this->getRequest()->getParam('time');
                
                $time = new \DateTime();
                $time->modify('+' . $raidEndTime['hours'] . 'hours');
                $time->modify('+' . $raidEndTime['minutes'] . 'minutes');
                
                $user = $this->em->find('Db_Model_User', 1);
                $gym = new \Db_Model_Gym();
                $gym->setGymId($gymData['id']);
                $gym->setUserId($user);
                $gym->setRaidEndTime($time);
                
                $this->em->persist($gym);
                
                try {
                    $this->em->flush();
                } catch(ORMException $e) {
                    echo json_encode(['error' => true, 'errorMessage' => $e->getMessage()]);
                    exit;
                }
                
                echo json_encode(['error' => false]);
                exit;
            }
        } else {
            echo ['error' => true];
            exit;
        }
    }

}

