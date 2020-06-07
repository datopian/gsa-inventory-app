import React, { Component } from 'react'
import WrappedField from "../WrappedField"
import FieldInfo from "../FieldInfo"
import Notification from "../Notification"
import Checkbox from './Checkbox'
import Radio from './Radio'

export class AdditionalMetadata extends Component {
    render() {
        if (this.props.currentStep != 2) { // Prop: The current step
            return null
        }
        return (
            <div className="usa-form-custom">
                <section id="section-basic-mega-menu" className="site-component-section">
                    <h1 className="usite-page-title" id="basic-mega-menu">Additional Metadata</h1>
                    <p className="site-text-intro">Please note that the additional metadata that you upload will help public users better find and use this dataset.  Not all of these criteria will apply to each dataset, so feel free to only answer what applies.</p>
                </section>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Themes"
                            name="themes"
                            type="string"
                            placeholder=""
                            helptext="[Some copy describing themes, distinguishing them from tags] Start typing to add themes."
                            value={this.props.values.themes}
                            required="true"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Data Dictionary URL"
                            name="themes"
                            type="string"
                            placeholder=""
                            helptext=""
                            value={this.props.values.data_dict_url}
                            required="true"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Data Dictionary Type"
                            name="data_dictionary_type"
                            type="select"
                            choices={["Data 1 ", "Data 2", "Data 3", "Data 4"]}
                            required={true}
                            className=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Data Publishing Frequency"
                            name="data_publishing_frequency"
                            type="select"
                            choices={["Freq 1 ", "Freq 2", "Freq 3", "Freq 4"]}
                            className=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Dataset Landing Page URL"
                            name="landing_url"
                            type="string"
                            placeholder=""
                            helptext=""
                            value={this.props.values.landingUrl}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Language - Language Subtag"
                            name="data_language_subtag"
                            type="select"
                            choices={["Language 1 ", "Language 2", "Language 3"]}
                            className=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Language - Regional Subtag"
                            name="data_regional_subtag"
                            type="select"
                            choices={["Regional 1 ", "Regional 2", "Regional 3"]}
                            className=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Dataset’s IT Unique Investment Identifier"
                            name="dataset_id"
                            type="string"
                            placeholder=""
                            helptext=""
                            value={this.props.values.dataset_id}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Related Documents"
                            name="related_documents"
                            type="string"
                            placeholder=""
                            helptext=""
                            value={this.props.values.related_docs}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Release Date"
                            name="release_date"
                            type="string"
                            placeholder=""
                            helptext=""
                            value={this.props.values.release_date}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="System of Records"
                            name="system_of_records"
                            type="string"
                            placeholder=""
                            helptext=""
                            value={this.props.values.system_of_records}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label="Select Parent Dataset"
                            name="select_parent_dataset"
                            type="select"
                            choices={["Regional 1 ", "Regional 2", "Regional 3"]}
                            className=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <WrappedField
                            label=""
                            name="name_1"
                            type="string"
                            placeholder=""
                            helptext="If you selected “Other”, please specify the name of your License*"
                            value={this.props.values.name1}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default AdditionalMetadata
