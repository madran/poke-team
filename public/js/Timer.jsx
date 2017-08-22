import React from 'react';

export default class Timer extends React.Component
{
    constructor(props) {
        super(props);

        var raidEndTime = this.props.timeToRaidEnd.split(":");
        raidEndTime = raidEndTime.map((value, index) => {
            return parseInt(value);
        });

        var date = new Date();
        date.setHours(date.getHours() + raidEndTime[0]);
        date.setMinutes(date.getMinutes() + raidEndTime[1]);
        date.setSeconds(date.getSeconds() + raidEndTime[2]);
        
        this.state = {
            raidEndTime: date,
            timeToRaidEnd: '',
            initialTime: this.props.timeToRaidEnd
        };
        
        this.timer = this.timer.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        var raidEndTime = nextProps.timeToRaidEnd.split(":");
        raidEndTime = raidEndTime.map((value, index) => {
            return parseInt(value);
        });

        var date = new Date();
        date.setHours(date.getHours() + raidEndTime[0]);
        date.setMinutes(date.getMinutes() + raidEndTime[1]);
        date.setSeconds(date.getSeconds() + raidEndTime[2]);
        
        this.setState({
            raidEndTime: date,
            timeToRaidEnd: this.state.timeToRaidEnd
        });
    }
    
//    shouldComponentUpdate(nextProps, nextState) {
//        console.log(nextProps.timeToRaidEnd === this.state.initialTime);
//        if(nextProps.timeToRaidEnd !== this.state.initialTime) {
//        }
//        return true;
//    }
    
    componentDidMount() {
        this.timerId = setInterval(this.timer, 1000);
    }

    timer() {
        var currentDate = new Date();
        var timeToRaidEnd = this.state.raidEndTime.getTime() - currentDate.getTime();
        
        var newTimeToRaidEnd = new Date(timeToRaidEnd);
        if(timeToRaidEnd > 0) {
            this.setState({
                timeToRaidEnd: String('00' + newTimeToRaidEnd.getUTCHours()).slice(-2) + ':' + 
                               String('00' + newTimeToRaidEnd.getMinutes()).slice(-2) + ':' + 
                               String('00' + newTimeToRaidEnd.getSeconds()).slice(-2)
            });
        } else {
            window.clearInterval(this.timerId)
        }
    }
        
    render() {
        var date = new Date(this.state.timeToRaidEnd);
        return (
            <div id="poke-team-timer" className="row">
                <div className="col-12 text-center">
                    {this.state.timeToRaidEnd}
                </div>
            </div>
        );
    }
}