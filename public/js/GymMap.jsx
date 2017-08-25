import React from 'react';

import Gym from '../js/Gym.jsx';
import GymWithRaid from '../js/GymWithRaid.jsx';

export default class GymMap extends React.Component
{
    constructor(props) {
        super(props);
        
        this.state = {
            gyms: [],
        };
        
        this.loadGymData = this.loadGymData.bind(this);
        this.changeGymType = this.changeGymType.bind(this);

        this.loadGymData();
        setInterval(this.loadGymData, 5000);
    }
    
    loadGymData() {
         $.ajax({
            url: 'gyms',
            method: 'post',
            context: this,
            success: function(data) {
                if(data.error === true) {

                } else {
                    this.setState({
                        gyms: data
                    });
                }
            }
        });
    }
    
    changeGymType(gymId) {
        var gyms = this.state.gyms.map((gym, index) => {
            if(gym.id === gymId) {
                gym.pokemonName = '';
            }
             return gym;
        });
        
        this.setState({
            gyms: gyms
        });
    }
    
    render() {
        var gyms = this.state.gyms.map((gym, index) => {
            if(gym.pokemonName.length > 0) {
                return <GymWithRaid key={gym.id} gym={gym} showGymAction={this.props.showGymAction} changeGymTypeAction={this.changeGymType} />;
            } else {
                return <Gym key={gym.id} />;
            }
        });
        
        return(
            <div className="container">
                {gyms}
            </div>
        );
    }
}