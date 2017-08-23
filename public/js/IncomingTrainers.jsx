import React from 'react'

export default class IncomingTrainers extends React.Component
{
    constructor(props) {
        super(props);
        
    }
    
    render() {
        var trainerList = this.props.incoming;
        var currentDate = new Date();
        var trainersListGroups = [];
        var shouldBeHere = 0;
        
        if(trainerList.length > 0) {
            for(var i = 0; i < trainerList.length; i++) {
                var incomeTime = new Date(trainerList[i].incomeTime.date);

                var timeToIncome = incomeTime - currentDate;
        
                var minutesToIncome = Math.floor(timeToIncome / 1000 / 60);
                var roudedMinutesToIncome = Math.ceil(minutesToIncome / 5) * 5;
                
                if(roudedMinutesToIncome <= 0) {
                    shouldBeHere = shouldBeHere + 1;
                } else {
                    trainersListGroups[roudedMinutesToIncome] = (trainersListGroups[roudedMinutesToIncome] || 0) + 1;
                }
            };
            
//            for(var i = 0; i < minutes.length; i++) {
//                var minutes = Math.ceil(minutes[i].incomeTime / 5) * 5;
//                trainersListGroups[minutes] = (trainersListGroups[minutes] || 0) + 1;
//            }
//            
            trainersListGroups = trainersListGroups.map((numberOfTrainers, index) => {
                return <li className="list-group-item incoming-trainers" key={index}>{index}min : <span className="oi oi-person" title="person" aria-hidden="true"></span> X {numberOfTrainers}</li>;
            });
        }
        
//        var items = this.props.pokeMasters.map((pokeMaster, index) => {
//            var TimeOfArrival = this.props.timeToRaidEnd.split(":");
//            TimeOfArrival = ((+TimeOfArrival[0]) * 60 * 60 + (+TimeOfArrival[1]) * 60 + (+TimeOfArrival[2])) * 1000;
//        });
        
        return (
            <div className="row">
                <div className="col-md-12 text-center"><h5>Incoming:</h5></div>
                <div className="col-md-12">
                    <ul className="list-group text-center borderless">
                        {trainersListGroups}
                    </ul>
                </div>
                <div className="col-md-12 text-center mt-3"><h5>Should be here:</h5></div>
                <div className="col-md-12 text-center incoming-trainers"><span className="oi oi-person" title="person" aria-hidden="true"></span> X {shouldBeHere}</div>
            </div>
        );
    }
}