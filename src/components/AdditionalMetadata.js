import React, { Component } from 'react'

export class AdditionalMetadata extends Component {
    render() {
        if (this.props.currentStep != 2) { // Prop: The current step
            return null
        }
        return (
            <div>
                <h1>Additional MetaData</h1>
            </div>
        )
    }
}

export default AdditionalMetadata
