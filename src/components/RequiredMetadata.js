import React, { Component } from 'react'
import WrappedField from "../WrappedField"
import FieldInfo from "../FieldInfo"
import Notification from "../Notification"
import Checkbox from './Checkbox'
import Radio from './Radio'

export class RequiredMetadata extends Component {
    
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Title"
                            name="title"
                            type="string"
                            placeholder=""
                            helptext="Use everyday language to make the dataset easy to find and understand."
                            value={this.props.values.title}
                            required="true"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Description"
                            name="description"
                            type="string"
                            component="textarea"
                            rows="6"
                            helptext="Write a description (like an abstract) with enough detail to help a user quickly decide if the asset is of interest.  You can use Markdown Formatting here. "
                            value={this.props.values.description}
                            required={true}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Tags"
                            name="tags"
                            type="string"
                            placeholder=""
                            helptext="Use both technical and non-technical terms to help users find your dataset.  Start typing to add tags."
                            value={this.props.values.title}
                            required="true"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Publisher"
                            name="publisher"
                            type="select"
                            choices={["Publisher 1 ", "Publisher 2", "Publisher 3", "Publisher 4"]}
                            required={true}
                            className=""
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Sub Agency"
                            name="subagency"
                            type="select"
                            choices={["Sub Agency 1 ", "Sub Agency 2", "Sub Agency 3", "Sub-Agency 4"]}
                            className=""
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Contact Name"
                            name="extras.contactName"
                            type="string"
                            required={true}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Contact Email"
                            name="extras.contactEmail"
                            type="string"
                            required={true}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Unique ID"
                            name="extras.uniqueID"
                            type="string"
                            required={true}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Public Access level"
                            name="publicaccesslevel"
                            type="select"
                            choices={["Private", "Public"]}
                            className=""
                            required={true}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="Meets Agency Data Quality"
                            name="meets_agency_data_quality"
                            type="select"
                            choices={["Yes", "No"]}
                            className=""
                            required={true}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <WrappedField
                            label="License"
                            name="license"
                            type="select"
                            choices={["MIT", "Open Source License","Others"]}
                            className=""
                            required={true}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                    <label className="usa-label">Rights*</label> <br/>
                        <Radio
                            label='My dataset is public'
                            name="op1"
                            value="Option 1"
                            onChange={this.handleRadio}
                            id="option1"
                        />
                        <Radio
                            label='My dataset is not public'
                            name="op1"
                            value="Option 2"
                            onChange={this.handleRadio}
                            id="option2"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                    <label className="usa-label">Relevant Location*</label> <br/>
                        <Radio
                            label='My dataset does not have a spatial component'
                            name="op2"
                            value="Option 3"
                            onChange={this.handleRadio}
                            id="option3"
                        />
                        <Radio
                            label='My dataset does have a spatial component'
                            name="op2"
                            value="Option 4"
                            onChange={this.handleRadio}
                            id="option4"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                    <label className="usa-label">Temporal*</label> <br/>
                        <Radio
                            label='My dataset does not have a start and end date for the applicability of data'
                            name="op3"
                            value="Option 5"
                            onChange={this.handleRadio}
                            id="option5"
                        />
                        <Radio
                            label='My dataset does have a start and end date for the applicability of data'
                            name="op3"
                            value="Option 6"
                            onChange={this.handleRadio}
                            id="option6"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default RequiredMetadata
