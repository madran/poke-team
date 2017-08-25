import React from 'react';

//import PokeTeam from '../js/PokeTeam.jsx';

export default class GymWithRaid extends React.Component
{
    constructor(props) {
        super(props);
        
        var raidEndTime = this.props.gym.raidEndTime.split(":");
        raidEndTime = raidEndTime.map((value, index) => {
            return parseInt(value);
        });

        var date = new Date();
        date.setHours(date.getHours() + raidEndTime[0]);
        date.setMinutes(date.getMinutes() + raidEndTime[1]);
        date.setSeconds(date.getSeconds() + raidEndTime[2]);
        
        this.state = {
            raidEndTime: date,
            timeToRaidEnd: '00:00:00'
        };
        
        this.timer = this.timer.bind(this);
        this.showGym = this.showGym.bind(this);
    }
    
    componentDidMount() {
        this.timerId = setInterval(this.timer, 1000);
    }
    
    timer() {
        var currentDate = new Date();
        var timeToRaidEnd = this.state.raidEndTime - currentDate;
        
        var hours = Math.floor(timeToRaidEnd / 1000 / 60 / 60);
        var minutes = Math.floor((timeToRaidEnd / 1000 / 60) - hours * 60);
        var seconds = Math.floor((timeToRaidEnd / 1000) - minutes * 60);
        
        if(timeToRaidEnd > 0) {
            this.setState({
                timeToRaidEnd: String('00' + hours).slice(-2) + ':' + 
                               String('00' + minutes).slice(-2) + ':' + 
                               String('00' + seconds).slice(-2)
            });
        } else {
            this.props.changeGymTypeAction(this.props.gym.id);
            window.clearInterval(this.timerId)
        }
    }
    
    showGym() {
        var gym = this.props.gym;
        gym.timeToRaidEnd = this.state.timeToRaidEnd;
        this.props.showGymAction(this.props.gym); 
    }
    
    render() {
        var date = new Date(this.state.timeToRaidEnd);
        return(
            <div className="container">
                <div className="row">
                    <button type="button" data-target="#gymModal" data-toggle="modal" className="btn btn-primary" onClick={this.showGym}>
                        {this.state.timeToRaidEnd}
                    </button>
                </div>
            </div>
        );
    }
}