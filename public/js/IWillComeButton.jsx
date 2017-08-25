import React from 'react';

export default class IWillComeButton extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="row mt-3">
                <div className="col-md-12 text-center">
                    <button type="button" className="btn btn-success app-button" onClick={this.props.showRegisterFormAction}>I will come</button>
                </div>
            </div>
        )
    }
}