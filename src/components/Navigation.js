import React, { Component } from 'react'

export class Navigation extends Component {

    navigate(clickId){
        alert(`Click on ${clickId}`);
    }

    render() {
        return (
            <div className="app_navigation">
                <div className="navsec active" onClick={() => this.navigate(1)}>
                    <label>Required Metadata</label>
                </div>
                <div className="navsec"  onClick={() => this.navigate(2)}>
                    <label>Additional Metadata</label>
                </div>
                <div className="navsec" onClick={() => this.navigate(3)}>
                    <label>Resource Upload</label>
                </div>
            </div>
        )
    }
}

export default Navigation
