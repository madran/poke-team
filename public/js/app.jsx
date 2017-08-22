import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import PokeTeam from '../js/PokeTeam.jsx';
import GymMap from '../js/GymMap.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentGym: null
        };
        
        this.showGym = this.showGym.bind(this);
    }
    
    showGym(gym) {
        this.setState({
            currentGym: gym
        });
    }
    
    render() {
        return (
            <div id="app" className="">
                <GymMap showGymAction={this.showGym} />
                <div id="gymModal" className="modal fade" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <PokeTeam gym={this.state.currentGym} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);