import React from 'react';

export default class Message extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    render() {
        var message = null;
        if(this.props.alertType && this.props.alertMessage) {
            message = (
                <div className="col-md-12">
                    <div className={'alert alert-' + this.props.alertType} role="alert">
                        {this.props.alertMessage}
                    </div>
                </div>
            );
        } else {
            message = null;
        }
        
        return (
            <div className="row">
                {message}
            </div>
        );
    }
}