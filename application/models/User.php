<?php

/**
 * @Entity
 * @Table(name="user")
 */
class Db_Model_User {
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue
     */
    private $id;
    
    /**
     * @Column(type="string", length=100, unique=true)
     */
    private $email;
    
    /**
     * @OneToMany(targetEntity="Db_Model_Gym", mappedBy="User")
     */
    private $gym;
    
    public function __construct() {
        $this->gym = new ArrayCollection();
    }
    
    function getId() {
        return $this->id;
    }

    function getEmail() {
        return $this->email;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setEmail($email) {
        $this->email = $email;
    }
}
