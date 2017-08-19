<?php

/**
 * @Entity
 * @Table(name="gym")
 */
class Db_Model_Gym {
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue
     */
    private $id;
    
    /**
     * @Column(type="integer")
     * 
     */
    private $gymId;
    
    /**
     * @ManyToOne(targetEntity="Db_Model_User", inversedBy="gym")
     * @JoinColumn(name="userId", referencedColumnName="id")
     */
    private $userId;
    
    /**
     * @Column(type="datetime")
     */
    private $raidEndTime;
    
    function getId() {
        return $this->id;
    }

    function getGymId() {
        return $this->gymId;
    }

    function getUserId() {
        return $this->userId;
    }

    function getRaidEndTime() {
        return $this->raidEndTime;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setGymId($gymId) {
        $this->gymId = $gymId;
    }

    function setUserId($userId) {
        $this->userId = $userId;
    }

    function setRaidEndTime($raidEndTime) {
        $this->raidEndTime = $raidEndTime;
    }
}
