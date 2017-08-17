import React from 'react';

export default class PokeMasterCounter extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <span className="oi oi-person" title="person" aria-hidden="true"></span> x {this.props.number}
                </div>
            </div>
        );
    }
}