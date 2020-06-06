import React, { Component } from 'react'
import WrappedField from "../WrappedField"
import FieldInfo from "../FieldInfo"
import Notification from "../Notification"

export class RequiredMetadata extends Component {
    render() {
        return (
            <div class="row">
                <div class="col-md-12">
                    <WrappedField
                        label="Title"
                        name="title"
                        type="string"
                        placeholder="A title for your collection"
                        helptext="Use everyday language to make the dataset easy to find and understand."
                        value={this.props.values.title}
                        required="true"
                    />
                </div>
            </div>
        )
    }
}

export default RequiredMetadata
