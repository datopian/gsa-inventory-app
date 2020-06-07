import React, { Component } from 'react'

export class BackButton extends Component {
    render(props) {
        if(this.props.currentStep == 1) {
            return null
        } else if (this.props.currentStep == 2){
            return(
                <button className="usa-button" onClick={() => this.props.handleSteps(1)}>Back</button>
            )
        } else if (this.props.currentStep == 3) {
            return(
                <button className="usa-button" onClick={() => this.props.handleSteps(2)}>Back</button>
            )
        }
    }
}

export default BackButton
