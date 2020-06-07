import React, { Component } from 'react'
import WrappedField from "../WrappedField"
import FieldInfo from "../FieldInfo"
import Notification from "../Notification"
import Checkbox from './Checkbox'
import Radio from './Radio'

export class ResourceMetadata extends Component {
    render() {
        if (this.props.currentStep != 3) { // Prop: The current step
            return null
        }
        return (
            <div className="usa-form-custom">
                <section id="section-basic-mega-menu" className="site-component-section">
                    <h1 className="usite-page-title" id="basic-mega-menu">Resource Upload</h1>
                    <p className="site-text-intro">Introductory text if needed. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
                </section>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Name"
                            name="name"
                            type="string"
                            placeholder=""
                            helptext=""
                            value={this.props.values.name}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label className="usa-label">Data</label>
                        <br/>
                        <input type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
                        <button className="usa-button" onClick={this.fileUploadAction}>
                            Upload
                        </button>

                        <input type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
                        <button className="usa-button" onClick={this.fileUploadAction}>
                            Link
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Description"
                            name="resource_description"
                            type="string"
                            component="textarea"
                            rows="6"
                            helptext="You can use Markdown Formatting here."
                            value={this.props.values.resource_description}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Media Type"
                            name="media_type"
                            type="select"
                            choices={["Type 1 ", "Type 2", "Type 3", "Type 4"]}
                            required={true}
                            className=""
                        />
                    </div>
                </div>
        </div>
        )
    }
}

export default ResourceMetadata
