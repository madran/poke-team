import React from 'react';

export default class Timer extends React.Component
{
    constructor(props) {
        super(props);
        
        var timeToRaidEnd = this.props.timeToRaidEnd.split(":");
        timeToRaidEnd = ((+timeToRaidEnd[0]) * 60 * 60 + (+timeToRaidEnd[1]) * 60 + (+timeToRaidEnd[2])) * 1000;
        
        var currentDate = new Date();
        var raidEndTime = currentDate.getTime() + timeToRaidEnd;
        
        this.state = {
            raidEndTime: raidEndTime,
            timeToRaidEnd: timeToRaidEnd
        }
        
        this.timer = this.timer.bind(this);
    }
    
    componentDidMount() {
        this.timerId = setInterval(this.timer, 1000);
    }

    timer() {
        this.setState((prevState, props) => {
            var currentDate = new Date();
            var timeToRaidEnd = prevState.raidEndTime - currentDate.getTime();

            if(timeToRaidEnd > 0) {
                return { timeToRaidEnd: timeToRaidEnd };
            } else {
                window.clearInterval(this.timerId)
            }
        })
    }
        
    render() {
        var date = new Date(this.state.timeToRaidEnd);
        return (
            <div id="poke-team-timer" className="row">
                <div className="col-12 text-center">
                    {date.getUTCHours()}:{date.getMinutes()}:{date.getSeconds()}
                </div>
            </div>
        );
    }
}