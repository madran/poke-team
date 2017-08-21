import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import Ladda from 'ladda';

import Timer from '../js/Timer.jsx';
import PokemonInfo from '../js/PokemonInfo.jsx';
import PokeMasterCounter from '../js/PokeMasterCounter.jsx';
import IWillComeButton from '../js/IWillComeButton.jsx';
import IWillComeForm from '../js/IWillComeForm.jsx';
import IComming from '../js/IComming.jsx';
import ListOfIncomingPokeMasters from '../js/ListOfIncomingPokeMasters.jsx';

class Test extends React.Component
{
    constructor(props) {
        super(props);
        
        var userState = this.props.isComming ? 'incomming' : 'not_comming';
        
        this.state = {
            userState: userState,
            showError: false
        };
        
        this.showTimeList = this.showTimeList.bind(this);
        this.hideTimeList = this.hideTimeList.bind(this);
        this.resign = this.resign.bind(this);
        this.saveTime = this.saveTime.bind(this);
    }
    
    showTimeList() {
        this.setState({ userState: 'registering_for_come' });
    }
    
    hideTimeList() {
        this.setState({ userState: 'not_comming' });
    }
    
    resign(event) {
        event.preventDefault();
        
        var button = Ladda.create(event.target);
        $.ajax({
            url: '/remove',
            method: 'post',
            context: this,
            data: {
                gym: {
                    id: this.props.id
                }
            },
            beforeSend: function() {
                button.start();
            },
            success: function(data) {
                button.stop();
                
                if(data.error === true) {
                    this.setState({ showError: true });
                } else {
                    this.setState({ userState: 'not_comming' });
                }
            },
            error: function(xhr, status, error) {
                button.stop();
                console.log(xhr, status, error);
            }
        });
    }
    
    saveTime(hours, minutes, event) {
        var button = Ladda.create(event.target);
        
        $.ajax({
            url: '/save',
            method: 'post',
            context: this,
            data: {
                time: {
                    hours: hours,
                    minutes: minutes
                },
                gym: {
                    id: this.props.id
                }
            },
            beforeSend: function() {
                if(!button.isLoading()) {
                    button.start();
                }    
            },
            success: function(data) {
                button.stop();
                
                if(data.error === true) {
                    this.setState({ showError: true });
                } else {
                    this.setState({ userState: 'incomming' });
                }
            },
            error: function(xhr, status, error) {
                button.stop();
                console.log(xhr, status, error);
            }
        });
    }
    
    iWillComeRenderer() {
        if(this.state.userState === 'registering_for_come') {
            return <IWillComeForm hideTimeListAction={this.hideTimeList} saveTime={this.saveTime} />;
        }
        
        if(this.state.userState === 'not_comming'){
            return <IWillComeButton showTimeListAction={this.showTimeList} />;
        }
        
        if(this.state.userState === 'incomming'){
            return <IComming resignAction={this.resign} />;
        }
    }
    
    render() {
        return (
            <div id="poke-team" className="container-fluid">
                <Timer timeToRaidEnd="00:00:31" />
                <div className="row">
                    <div className="col-md-6">
                        <PokemonInfo pokemonName="Feralligator" raidLvl="3"/>
                        <PokeMasterCounter number="7" />
                        {this.iWillComeRenderer()}
                    </div>
                    <div className="col-md-6">
                        <ListOfIncomingPokeMasters />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Test id="33" />,
    document.getElementById('root')
)