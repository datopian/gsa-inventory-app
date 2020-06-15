import React, { useState } from "react"
import Debug from "../Debug"
import WrappedField from "../WrappedField"
import FieldInfo from "../FieldInfo"
import Notification from "../Notification"
import PropTypes from "prop-types"
import Api from '../Api.js'
import { Formik, Form, Field, FieldArray } from "formik"
import AutocompleteFetch from "../AutocompleteFetch"
import "react-autocomplete-input/dist/bundle.css"
import RequiredMetadata from "./RequiredMetadata"
import Checkbox from './Checkbox'
import Navigation from './Navigation'
import AdditionalMetadata from "./AdditionalMetadata"
import ResourceMetadata from "./ResourceMetadata"
import BackButton from "./BackButton"
import SubmitButtons from "./SubmitButtons"
import $ from 'jquery';

const DatasetFrom = ({
  collection,
  updateUser,
  cancel,
  debug,
  apiUrl,
  ...props
}) => {

  //State hooks for Steps
  let [step, setStep] = useState('1');
  
  const handleSteps = nextstep => {
    setStep(nextstep);
    $(window).scrollTop(0);
  }

 
  // Fetch Collections from API and return as array of names
  const fetchCollectionsOpts = async (part, values, setOpts) => {
    let names = []
    names = values.groups ? values.groups.map(row => row.name) : []
    const res = await Api.fetchCollectionsAutocompleteOpts(part, apiUrl)
    // don't show autcomplete options if already in values.packages
    const matches = res.filter(val => !names.includes(val))
    console.log("collecitons opts", values, names, res, matches)
    setOpts(matches)
  }

  // Fetch Datasets from API and return as array of names
  const fetchDatasetsOpts = async (part, values, setOpts) => {
    let names = []
    names = values.packages ? values.packages.map(row => row.name) : []
    const res = await Api.fetchDatasetsAutocompleteOpts(part, apiUrl)
    const matches = res.filter(val => !names.includes(val))
    console.log("dataset opts", values, names, res, matches)
    setOpts(matches)
  }

  const createCollection = (values, actions) => {
    Api.createCollection(values, apiUrl)
      .then(res => {
        actions.setSubmitting(false)
        actions.setValues(res.data.result)
        const name = res.data.result.name
        actions.setStatus({
          msg: `Group ${name} successfully created`,
          type: "success"
        })
      })
      .catch(e => {
        console.warn(e)
        actions.setStatus({
          msg: `Error creating collection: ${e.message}`,
          type: "fail"
        })
      })
  }

  const updateCollection = (values, actions) => {
    Api.updateCollection(values, apiUrl)
      .then(res => {
        actions.setSubmitting(false)
        actions.setValues(res.data.result)
        const name = res.data.result.name
        actions.setStatus({
          msg: `Group ${name} successfully updated`,
          type: "success"
        })
      })
      .catch(e => {
        console.warn(e)
        actions.setStatus({
          msg: `Error updating collection: ${e.message}`,
          type: "fail"
        })
      })
  }

  const deleteCollection = (values, resetForm, setStatus) => {
    Api.deleteCollection({ id: values.id }, apiUrl).then(res => {
      resetForm({})
      setStatus({ msg: "Group was successfully deleted", type: "success" })
    })
  }

  const defaultValues = {
    title: "",
    description: "",
    publisher: "",
    subagency: "",
    accessLevel: "",
    dataQuality: "",
    license: "",
    license_others: "",
    rights_desc: "",
    spatial_location: "",
    temporal_start_date: "",
    temporal_end_desc: "",
    contactName: "",
    contactEmail: "",
    uniqueID: "",
    rights: ""
  }

  const validate = values => {
    const errors = {};
    //let errors = { extras: {} }


    if (!values.title || values.title.length < 3) {
      errors.title = "Title is required"
    }

    if (!values.contactName) {
      errors.contactName = "Contact Name is required"
    }

    if (!values.uniqueID) {
      errors.uniqueID = "Unique ID is required"
    }

    if (!values.contactEmail) {
      errors.contactEmail = "Contact Email is required"
    }

    if (!values.description) {
      errors.description = "Description field is required"
    }
    
    if (
      values.contactEmail &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        values.contactEmail
      )
    ) {
      errors.contactEmail = "Please enter a valid email address"
    }

    if (!values.publisher) {
      errors.publisher = "Please select a publisher"
    }

    if (!values.subagency) {
      errors.subagency = "Please select a subagency"
    }

    if (!values.accessLevel) {
      errors.accessLevel = "Please select Public Access Level"
    }

    if (!values.dataQuality) {
      errors.dataQuality = "Please select data quality"
    }

    if (!values.rights_desc) {
      errors.rights_desc = "Field cannot be empty"
    }
    
    if (!values.spatial_location) {
      errors.spatial_location = "Field cannot be empty"
    }

    if (!values.license_others) {
      errors.license_others = "Field cannot be empty"
    }

    /*
    if (!values.temporal_start_date) {
      errors.temporal_start_date = "Field cannot be empty"
    }

    if (!values.temporal_end_date) {
      errors.temporal_end_date = "Field cannot be empty"
    }
    */
    

    if (JSON.stringify(errors) === JSON.stringify({ extras: {} })) return {}
    return errors
  }

  const printValues = () => {
    alert('hi');
  }


  return (
    <Formik
      initialValues={Object.assign({}, defaultValues, collection)}
      onSubmit={(values, actions) => {
        console.log("SUBMIT", values)
        handleSteps(2)
        /*
        // if this is an existing record, update
        if (values.id) {
          updateCollection(values, actions)
          // otherwise create
        } else {
          createCollection(values, actions)
        }*/
      }}
      validate={validate}
      render={({
        values,
        errors,
        actions,
        touched,
        status,
        resetForm,
        handleSubmit,
        setValues,
        setStatus,
        isSubmitting,
        isValid,
        dirty
      }) => (
        <div className="container">

            <Navigation handleSteps={handleSteps} currentStep={step}/>
            
            <Form onSubmit={handleSubmit}>
            {status && <Notification {...status} />}

            <RequiredMetadata values={values} currentStep={step} fetchDatasetsOpts={fetchDatasetsOpts} isValid={isValid}/>
            <AdditionalMetadata values={values} currentStep={step}/>
            <ResourceMetadata values={values} currentStep={step}/>
            

            <div className="row">
              <div className="col-sm-12">
                <br/><br/>
              </div>
              <div className="col-sm-4">
                <BackButton currentStep={step} handleSteps={handleSteps}/>
              </div>
              <div className="col-sm-8 text-right">
                <SubmitButtons currentStep={step}  handleSteps={handleSteps}/>
              </div>
            </div>
            
            </Form>
        </div>
      )}
    />
  )
}

DatasetFrom.propTypes = {
  name: PropTypes.string
}

WrappedField.propTypes = {
  name: PropTypes.string
}

export default DatasetFrom
