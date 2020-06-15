import React, { Component } from 'react'

export class SubmitButtons extends Component {
    render(props) {
        if(this.props.currentStep == 2){
            return (
                <div>
                    <button className="usa-button usa-button--outline">Save as draft</button>
                    <button className="usa-button" type="submit" onClick={() => this.props.handleSteps(3)}>Save and Continue</button>
                </div>
            )
        } else if(this.props.currentStep == 3){
            return (
                <div>
                    <button className="usa-button usa-button--outline">Save as draft</button>
                    <button className="usa-button" type="submit">Finish</button>
                </div>
            )
        } else {
            return null
        }
        
    }
}

export default SubmitButtons
