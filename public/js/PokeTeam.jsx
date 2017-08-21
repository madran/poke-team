import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import Ladda from 'ladda';

import Timer from '../js/Timer.jsx';
import PokemonInfo from '../js/PokemonInfo.jsx';
import TrainerCounter from '../js/TrainerCounter.jsx';
import IWillComeButton from '../js/IWillComeButton.jsx';
import IWillComeForm from '../js/IWillComeForm.jsx';
import IComming from '../js/IComming.jsx';
import IncomingTrainers from '../js/IncomingTrainers.jsx';
import Message from '../js/Message.jsx';


class Test extends React.Component
{
    get REGISTRAION_STATUS_REGISTERED() { return 'registerd'; };
    get REGISTRAION_STATUS_NOT_REGISTERED() { return 'not_registered'; };
    get REGISTRAION_STATUS_REGISTERING() { return 'registering'; };
    
    constructor(props) {
        super(props);
        
        this.state = {
            userState: this.REGISTRAION_STATUS_NOT_REGISTERED,
            serverResponseMessage: '',
            serverResponseType: ''
        };
        
        this.showRegisterForm = this.showRegisterForm.bind(this);
        this.hideRegisterForm = this.hideRegisterForm.bind(this);
        this.unregister = this.unregister.bind(this);
        this.saveTime = this.saveTime.bind(this);
    }
    
    showRegisterForm() {
        this.setState({ userState: this.REGISTRAION_STATUS_REGISTERING });
    }
    
    hideRegisterForm() {
        this.setState({ userState: this.REGISTRAION_STATUS_NOT_REGISTERED });
    }
    
    removeMessage() {
        setTimeout(() => {
            this.setState({
                serverResponseMessage: '',
                serverResponseType: ''
            });
        }, 5000);
    }
    
    unregister(event) {
        event.preventDefault();
        
        var button = Ladda.create(event.target);
        $.ajax({
            url: '/unregister',
            method: 'post',
            context: this,
            data: {
                gymId: this.props.id
            },
            beforeSend: function() {
                button.start();
            },
            success: function(data) {
                button.stop();
                
                if(data.error === true) {
                    this.showMessage('error', data.errorMessage);
                } else {
                    this.setState({
                        userState: this.REGISTRAION_STATUS_NOT_REGISTERED
                    });
                    
                    this.showMessage('success', 'success');
                }
                this.removeMessage();
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
            url: '/register',
            method: 'post',
            context: this,
            data: {
                hoursToRaidEnd: hours,
                minutesToRaidEnd: minutes,
                gymId: this.props.id
            },
            beforeSend: function() {
                if(!button.isLoading()) {
                    button.start();
                }    
            },
            success: function(data) {
                button.stop();
                
                if(data.error === true) {
                    this.showMessage('error', data.errorMessage);
                } else {
                    this.setState({
                        userState: this.REGISTRAION_STATUS_REGISTERED,
                    });
                    
                    this.showMessage('success', 'success');
                }
            },
            error: function(xhr, status, error) {
                button.stop();
                console.log(xhr, status, error);
            }
        });
    }
    
    iWillComeRenderer() {
        if(this.state.userState === this.REGISTRAION_STATUS_REGISTERING) {
            return <IWillComeForm hideRegisterFormAction={this.hideRegisterForm} saveTime={this.saveTime} />;
        }
        
        if(this.state.userState === this.REGISTRAION_STATUS_NOT_REGISTERED){
            return <IWillComeButton showRegisterFormAction={this.showRegisterForm} />;
        }
        
        if(this.state.userState === this.REGISTRAION_STATUS_REGISTERED){
            return <IComming unregisterAction={this.unregister} />;
        }
    }
    
    showMessage(messageType, message) {
        this.setState({ 
                serverResponseMessage: message,
                serverResponseType: messageType
            }
        );

        setTimeout(() => {
            this.setState({
                serverResponseMessage: '',
                serverResponseType: ''
            });
        }, 5000);
    }
    
    render() {
        return (
            <div id="poke-team" className="container-fluid pt-3">
                <Message alertType={this.state.serverResponseType} alertMessage={this.state.serverResponseType} />
                <Timer timeToRaidEnd="00:00:31" />
                <div className="row">
                    <div className="col-md-6">
                        <PokemonInfo pokemonName="Feralligator" raidLvl="3"/>
                        <TrainerCounter number="7" />
                        {this.iWillComeRenderer()}
                    </div>
                    <div className="col-md-6">
                        <IncomingTrainers />
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