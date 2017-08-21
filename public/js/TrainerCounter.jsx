import React from 'react';

export default class TrainerCounter extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="row mt-3">
                <div id="poke-master-counter-text" className="col-md-12 text-center">
                    <span className="oi oi-person" title="person" aria-hidden="true"></span> x {this.props.number}
                </div>
            </div>
        );
    }
}