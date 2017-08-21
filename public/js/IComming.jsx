import React from 'react';

export default class IComming extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div className="row mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <button type="button" className="btn btn-danger btn-lg i-will-come-button" onClick={this.props.resignAction}>Resign</button>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}