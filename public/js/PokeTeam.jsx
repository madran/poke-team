import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import Timer from '../js/Timer.jsx';
import PokemonInfo from '../js/PokemonInfo.jsx';

class Test extends React.Component
{
    render() {
        return (
            <div id="poke-team" className="container-fluid">
                <Timer timeToRaidEnd="00:00:31" />
                <div className="row">
                    <div className="col-md-6">
                        <PokemonInfo pokemonName="Feralligator" raidLvl="3"/>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('root')
)