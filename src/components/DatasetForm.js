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

const DatasetFrom = ({
  collection,
  updateUser,
  cancel,
  debug,
  apiUrl,
  ...props
}) => {

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
    extras: {
      dataLevel: "",
      contactName: "",
      contactEmail: ""
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

    if (JSON.stringify(errors) === JSON.stringify({ extras: {} })) return {}
    return errors
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
        <div className="contianer">
            <h1>Heading</h1>
            <Form onSubmit={handleSubmit}>
            {status && <Notification {...status} />}
            <WrappedField
                label="Title"
                name="title"
                type="string"
                placeholder="A title for your collection"
                value={values.title}
                required="true"
            />
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
            <WrappedField
                label="Description"
                name="description"
                type="string"
                component="textarea"
                rows="6"
                value={values.description}
                required={true}
            >
                <FieldInfo text="You can use Markdown formatting here" />
            </WrappedField>
            <WrappedField label="Category" name="extras.category" type="string" />
            <WrappedField
                label="Program Code"
                name="extras.programCode"
                type="string"
            />
            <WrappedField
                label="Data level"
                name="extras.dataLevel"
                type="select"
                choices={["federal", "state", "district", "school"]}
                required={true}
                className="block appearance-none w-36 my-4 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                <FieldInfo text="Choices: public (data is or could be made available to all without restrictions), restricted public (data is available under certain use restrictions), or non-public (data asset is not available to members of the public)" />
            </WrappedField>
            <WrappedField
                label="Organization"
                name="extras.organization"
                type="string"
            />
            <WrappedField
                label="Spatial/Temporal"
                name="extras.spatial"
                type="string"
                placeholder="eg. Lincoln, Nebraska"
            >
                <FieldInfo text="The states represented in this data" />
            </WrappedField>
            <WrappedField
                label="Frequency"
                name="extras.frequency"
                type="string"
            />
            <WrappedField
                label="Contact Name"
                name="extras.contactName"
                type="string"
                required={true}
            />
            <WrappedField
                label="Contact Email"
                name="extras.contactEmail"
                type="string"
                required={true}
            />
            <WrappedField
                label="Home Page"
                name="extras.homePageUrl"
                type="string"
            />
            <WrappedField
                label="References"
                name="extras.references"
                type="string"
            />
            {values.extras && values.extras.master && (
                <div>
                <h3 className="block text-gray-600 mt-gutter mb-2 ml-4">
                    Add to Master Collection
                </h3>
                <AutocompleteFetch
                    values={values}
                    apiUrl={apiUrl}
                    name="groups"
                    titleField="name"
                    getOptions={fetchCollectionsOpts}
                />
                </div>
            )}
            {(!values.extras || !values.extras.master) && (
                <div>
                <h3 className="block text-gray-600 mt-gutter mb-2 ml-4">
                    Add Data Profiles
                </h3>
                <AutocompleteFetch
                    values={values}
                    apiUrl={apiUrl}
                    name="packages"
                    titleField="name"
                    getOptions={fetchDatasetsOpts}
                />
                </div>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
                type="submit"
            >
                {values.id ? "Update" : "Create"}
            </button>
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
