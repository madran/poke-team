import React from 'react';

export default class IComming extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div className="row mt-3">
                <div className="col-md-12">
                    <button type="button" className="btn btn-danger btn-lg i-will-come-button" data-target="#confirmResignModal" data-toggle="modal">Resign</button>
                </div>
            </div>
        );
    }
}