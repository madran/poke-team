import React from 'react'

export default class IWillComeForm extends React.Component
{
    constructor(props) {
        super(props);
        
        this.save = this.save.bind(this);
    }
    
    save(event) {
        var $form = $('#i-will-come-form');
        var hours = $form.find('#hoursToCome').val();
        var minutes = $form.find('#minutesToCome').val();
        
        this.props.saveTime(hours, minutes, event);
    }
    
    render() {
        var minutes = []
        for(var i = 5; i < 60; i = i + 5) {
            minutes.push(i);
        }
        
        minutes = minutes.map((value, index) => {
            return <option key={index} value={value}>{value}</option>;
        });
    
        return (
            <div className="row">
                <form id="i-will-come-form" className="col-md-12">
                    <div className="form-row">
                        <div className="col-md-12 text-center mt-3"><h3>When will you come?</h3></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="hoursToCome" className="col-form-label">Hours:</label>
                            <select id="hoursToCome" className="form-control form-control-lg">
                                 <option value="0">0</option>
                                  <option value="1">1</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="minutesToCome" className="col-form-label">Minutes:</label>
                            <select id="minutesToCome" className="form-control form-control-lg">
                                {minutes}
                            </select>
                        </div>
                    </div>
                    <div className="form-row mt-3">
                        <div className="form-group col-md-6 i-will-come-buttons">
                            <button type="button" className="btn btn-danger btn-lg i-will-come-button" onClick={this.props.hideTimeListAction}>Back</button>
                        </div>
                        <div className="form-group col-md-6 i-will-come-buttons">
                            <button type="button" className="btn btn-success btn-lg i-will-come-button" data-style="zoom-out" onClick={this.save}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}