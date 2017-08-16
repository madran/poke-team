import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import Timer from '../js/Timer.jsx';

class Test extends React.Component
{
    render() {
        return (
            <div id="poke-team" className="container-fluid">
                <Timer timeToRaidEnd="00:00:31" />
            </div>
        );
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('root')
)