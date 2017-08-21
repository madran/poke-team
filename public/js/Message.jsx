import React from 'react';

export default class Message extends React.Component
{
    constructor(props) {
        super(props);
        
        
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className={'alert alert-' + this.props.messageType} role="alert">
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
    }
}