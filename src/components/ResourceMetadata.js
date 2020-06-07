import React, { Component } from 'react'

export class ResourceMetadata extends Component {
    render() {
        if (this.props.currentStep != 3) { // Prop: The current step
            return null
        }
        return (
            <div>
                <h1>Resource Metadata</h1>
            </div>
        )
    }
}

export default ResourceMetadata
