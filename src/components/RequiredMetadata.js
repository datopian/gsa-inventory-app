import React, { Component } from 'react'
import WrappedField from "../WrappedField"
import FieldInfo from "../FieldInfo"
import Notification from "../Notification"

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
                            className="block appearance-none w-36 my-4 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default RequiredMetadata
