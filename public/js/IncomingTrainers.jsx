import React from 'react'

export default class IncomingTrainers extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        
        
//        var items = this.props.pokeMasters.map((pokeMaster, index) => {
//            var TimeOfArrival = this.props.timeToRaidEnd.split(":");
//            TimeOfArrival = ((+TimeOfArrival[0]) * 60 * 60 + (+TimeOfArrival[1]) * 60 + (+TimeOfArrival[2])) * 1000;
//        });
        
        return (
            <div className="row">
                <div className="col-md-12 text-center">Incoming</div>
                <div className="col-md-12">
                    <ul>
                        
                    </ul>
                </div>
            </div>
        );
    }
}