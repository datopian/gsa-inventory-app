import React, { Component } from 'react'

export class Navigation extends Component {
    
    render() {
        return (
            <div className="app_navigation" id="app_navigation">
      
                <div className={`navsec ${this.props.currentStep==1 ? 'active' : ''}`} onClick={() => this.props.handleSteps(1)} >
                    <label>Required Metadata</label>
                </div>
                <div className={`navsec ${this.props.currentStep==2 ? 'active' : ''}`} onClick={() => { 
                    this.props.formCount >= 1 ?
                    this.props.handleSteps(2) :
                    console.log("")
                    }
                } >
                    <label>Additional Metadata</label>
                </div>
                <div className={`navsec ${this.props.currentStep==3 ? 'active' : ''}`} onClick={() => {
                    this.props.formCount >= 2 ? 
                    this.props.handleSteps(3) :
                    console.log("")
                    }
                } >
                    <label>Resource Upload</label>
                </div>
            </div>
        )
    }
}

export default Navigation
