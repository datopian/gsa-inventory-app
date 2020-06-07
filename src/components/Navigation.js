import React, { Component } from 'react'

export class Navigation extends Component {
    
    render() {
        return (
            <div className="app_navigation">
                <div className="navsec active" onClick={() => this.props.handleSteps(1)} >
                    <label>Required Metadata</label>
                </div>
                <div className="navsec" onClick={() => this.props.handleSteps(2)} >
                    <label>Additional Metadata</label>
                </div>
                <div className="navsec" onClick={() => this.props.handleSteps(3)} >
                    <label>Resource Upload</label>
                </div>
            </div>
        )
    }
}

export default Navigation
