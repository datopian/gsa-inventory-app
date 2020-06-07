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
    extras: {
      dataLevel: "",
      contactName: "",
      contactEmail: "",
      uniqueID: "",
      rights: ""
    }
  }

  const validate = values => {
    let errors = { extras: {} }

    if (!values.title || values.title.length < 3) {
      errors.title = "Title is required"
    }

    if (!values.extras.contactName) {
      errors.extras.contactName = "Contact Name is required"
    }

    if (!values.extras.uniqueID) {
      errors.extras.uniqueID = "Unique ID is required"
    }

    if (!values.extras.contactEmail) {
      errors.extras.contactEmail = "Contact Email is required"
    }

    if (!values.description) {
      errors.description = "Description field is required"
    }

    if (
      values.extras.contactEmail &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        values.extras.contactEmail
      )
    ) {
      errors.extras.contactEmail = "Please enter a valid email address"
    }

    if (
      values.homePageUrl &&
      !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        values.homePageUrl
      )
    ) {
      errors.homePageUrl = "Please enter a valid URL"
    }

    if (!values.extras.dataLevel) {
      errors.extras.dataLevel = "Data Level is required"
    }

    if (!values.publisher) {
      errors.extras.publisher = "Publisher is required"
    }

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
        // if this is an existing record, update
        if (values.id) {
          updateCollection(values, actions)
          // otherwise create
        } else {
          createCollection(values, actions)
        }
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
        dirty
      }) => (
        <div className="container">

            <Navigation handleSteps={handleSteps} currentStep={step}/>
            
            
            <Form onSubmit={handleSubmit}>
            {status && <Notification {...status} />}

            
            <RequiredMetadata values={values} currentStep={step}/>
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

            <div
                className="mt-gutter bg-yellow-300 p-4 m-4 border-dotted border-4"
                hidden={!debug}
            >
                <Field
                className="mr-4"
                name="extras.master"
                type="checkbox"
                checked={values.extras && values.extras.master}
                />{" "}
                <span className="mt-1">Master Collection</span>
            </div>
            {values.extras && values.extras.summary_dataset && (
                <a
                className="m-4 text-teal-500 hover:text-teal-800 text-sm"
                href={`/dataset/docs/${values.extras.summary_dataset}`}
                target="_blank"
                >
                Add documentation to Collection
                </a>
            )}
            
            
            {values.id && (
                <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
                onClick={e => {
                    e.preventDefault()
                    deleteCollection(values, resetForm, setStatus)
                }}
                type="button"
                disabled={isSubmitting}
                >
                Delete
                </button>
            )}
            {debug && (
                <Debug
                vals={{ dirty, values, errors, touched, isSubmitting, status }}
                />
            )}
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
