import React from 'react';
import ShortId from 'shortid';

import Timer from '../js/Timer.jsx';
import PokemonInfo from '../js/PokemonInfo.jsx';
import TrainerCounter from '../js/TrainerCounter.jsx';
import IWillComeButton from '../js/IWillComeButton.jsx';
import IWillComeForm from '../js/IWillComeForm.jsx';
import IComming from '../js/IComming.jsx';
import IncomingTrainers from '../js/IncomingTrainers.jsx';
import Message from '../js/Message.jsx';

export default class PokeTeam extends React.Component
{
    get REGISTRAION_STATUS_REGISTERED() { return 'registerd'; };
    get REGISTRAION_STATUS_NOT_REGISTERED() { return 'not_registered'; };
    get REGISTRAION_STATUS_REGISTERING() { return 'registering'; };
    
    constructor(props) {
        super(props);
        
        this.state = {
            userState: this.REGISTRAION_STATUS_NOT_REGISTERED,
            serverResponseMessage: '',
            serverResponseType: '',
            messages: [],
            waitingTrainers: '',
            incomingTrainers: []
        };
        
        this.showRegisterForm = this.showRegisterForm.bind(this);
        this.hideRegisterForm = this.hideRegisterForm.bind(this);
        this.unregister = this.unregister.bind(this);
        this.register = this.register.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.loadGymData= this.loadGymData.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
        var prevId = prevProps.gym === null ? 0 : prevProps.gym.id;
        
        if(prevId != this.props.gym.id) {
            this.loadGymData();
        }
    }
    
    loadGymData() {
        $.ajax({
            url: '/gym',
            method: 'post',
            context: this,
            data: {
                gymId: this.props.gym.id
            },
            success: function(data) {
                if(data.error === true) {
                    
                } else {
                    this.setState({
                        waitingTrainers: data.trainers.waiting,
                        incomingTrainers: data.trainers.incoming
                    });
                    
                    if(this.state.userState !== this.REGISTRAION_STATUS_REGISTERING) {
                        this.setState({
                            userState: data.registered ? this.REGISTRAION_STATUS_REGISTERED : this.REGISTRAION_STATUS_NOT_REGISTERED
                        });
                    }
                }
            },
            error: function() {
                
            }
        });
    }
    
    showRegisterForm() {
        this.setState({ userState: this.REGISTRAION_STATUS_REGISTERING });
    }
    
    hideRegisterForm() {
        this.setState({ userState: this.REGISTRAION_STATUS_NOT_REGISTERED });
    }
    
    notUnregister() {
        $('#confirmResignModal').modal('toggle');
    }
    
    unregister(event) {
        event.preventDefault();
        
        var button = Ladda.create(event.target);
        $.ajax({
            url: '/unregister',
            method: 'post',
            context: this,
            data: {
                gymId: this.props.gym.id
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
                    
                    $('#confirmResignModal').modal('toggle');
                    
                    this.showMessage('success', 'success');
                }
            },
            error: function(xhr, status, error) {
                button.stop();
                console.log(xhr, status, error);
            }
        });
    }
    
    register(hours, minutes, event) {
        var button = Ladda.create(event.target);
        
        $.ajax({
            url: '/register',
            method: 'post',
            context: this,
            data: {
                hours: hours,
                minutes: minutes,
                gymId: this.props.gym.id
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
            return <IWillComeForm hideRegisterFormAction={this.hideRegisterForm} registerAction={this.register} />;
        }
        
        if(this.state.userState === this.REGISTRAION_STATUS_NOT_REGISTERED){
            return <IWillComeButton showRegisterFormAction={this.showRegisterForm} />;
        }
        
        if(this.state.userState === this.REGISTRAION_STATUS_REGISTERED){
            return <IComming />;
        }
    }
    
    showMessage(messageType, message) {
        this.setState((prevState, props) => {
            var messages = [(
                <Message key={ShortId.generate()} messageType={messageType} message={message} />
            )];

            messages = messages.concat(prevState.messages);
            
            return {
                messages: messages
            };
        });

        setTimeout(() => {
            this.setState((prevState, props) => {
                var messages = prevState.messages.slice(0, -1);

                return {
                    messages: messages
                };
            });
        }, 5000);
    }
    
    render() {
        if(this.props.gym === null) return null;
        
        return (
            <div id="poke-team" className="container-fluid">
                {this.state.messages}
                <Timer timeToRaidEnd={this.props.gym.timeToRaidEnd} />
                <div className="row">
                    <div className="col-md-6">
                        <PokemonInfo pokemonName={this.props.gym.pokemonName} raidLvl={this.props.gym.raidLvl} />
                        <TrainerCounter number={this.state.waitingTrainers} />
                        {this.iWillComeRenderer()}
                    </div>
                    <div className="col-md-6">
                        <IncomingTrainers incoming={this.state.incomingTrainers}/>
                    </div>
                </div>
                
                <div id="confirmResignModal" className="modal fade" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>Are you sure?</p>
                            </div>
                            <div className="modal-footer">
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-primary app-button" onClick={this.unregister}>Yes</button>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-alert app-button" onClick={this.notUnregister}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}