<?php

use \Doctrine\ORM\ORMException;

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        $this->em = Zend_Registry::get('em');
        $this->userId = 1;
    }

    public function indexAction()
    {
        
    }
    
    public function gymsAction()
    {
        $this->disableLayout();
        
        if ($this->getRequest()->isXmlHttpRequest()) {
            if ($this->getRequest()->isPost()) {
                $gyms = [
                    ['id' => 1, 'raidEndTime' => '01:57:49', 'raidLvl' => 3, 'pokemonName' => 'Pika'],
                    ['id' => 2, 'raidEndTime' => '00:23:01', 'raidLvl' => 5, 'pokemonName' => 'Piku'],
                    ['id' => 3, 'raidEndTime' => '01:23:23', 'raidLvl' => 1, 'pokemonName' => 'Pike'],
                    ['id' => 4, 'raidEndTime' => '', 'raidLvl' => '', 'pokemonName' => '']
                ];

                $this->_helper->json($gyms);
            }
        } else {
            $this->_helper->json(['error' => true]);
        }
    }

    public function registerAction()
    {
        $this->disableLayout();
        
        if ($this->isAjaxPostRequest()) {
            $gymId = $this->getRequest()->getParam('gymId');
            $hoursToRaidEnd = $this->getRequest()->getParam('hoursToRaidEnd');
            $minutesToRaidEnd = $this->getRequest()->getParam('minutesToRaidEnd');

            $time = $this->getTimeToRaidEnd($hoursToRaidEnd, $minutesToRaidEnd);

            $user = $this->em->find('Db_Model_User', $this->userId);

            if ($this->isTrainerRegisteredInGym($gymId)) {
                $this->_helper->json(['message' => 'You are registered in this gym']);
            }

            $gym = new \Db_Model_Gym();
            $gym->setGymId($gymId);
            $gym->setUserId($user);
            $gym->setRaidEndTime($time);
            
            $this->em->persist($gym);

            try {
                $this->em->flush();
            } catch(ORMException $e) {
                $this->_helper->json(['error' => true, 'errorMessage' => $e->getMessage()]);
            }

            $this->_helper->json(['error' => false]);
        } else {
            $this->_helper->json(['error' => true]);
        }
    }
    
    public function unregisterAction()
    {
        $this->disableLayout();
        
        if ($this->isAjaxPostRequest()) {
            $gymId = $this->getParam('gymId');

            $gym = $this->em->getRepository('Db_Model_Gym')->findOneBy(['userId' => $this->userId, 'gymId' => $gymId]);

            $this->em->remove($gym);

            try {
                $this->em->flush();
            } catch (ORMException $e) {
                $this->_helper->json(['error' => true, 'errorMessage' => $e->getMessage()]);
            }

            $this->_helper->json(['error' => false]);
        } else {
            $this->_helper->json(['error' => true]);
        }
    }
    
    private function disableLayout()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
    }
    
    private function isAjaxPostRequest()
    {
        return $this->getRequest()->isXmlHttpRequest() && $this->getRequest()->isPost();
    }
    
    private function getTimeToRaidEnd($hours, $minutes)
    {
        $time = new \DateTime();
        $time->modify('+' . $hours . 'hours');
        $time->modify('+' . $minutes . 'minutes');
        
        return $time;
    }
    
    private function isTrainerRegisteredInGym($gymId)
    {
        return boolval($this->em->getRepository('Db_Model_Gym')->findOneBy(['userId' => $this->userId, 'gymId' => $gymId]));
    }
}

