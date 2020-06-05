import React, { useState } from "react"
import { FieldArray, Field } from "formik"
import Autocomplete from "react-autocomplete-input"

const addEntity = (val, push) => {
  if (val) {
    const dataset = {
      name: val,
      id: val
    }

    push(dataset)
  }
}

const AutocompleteForm = ({ values, getOptions, apiUrl, name, titleField }) => {
  const [opts, setopts] = useState()

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div className="mt-gutter m-4">
          <Autocomplete
            className="shadow appearance-none border-rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="collections-autocomplete"
            Component="input"
            trigger=""
            spacer=""
            matchAny={true}
            onRequestOptions={e => getOptions(e, values, setopts)}
            options={opts}
            placeholder="Start typing to search..."
          />
          <span
            className="cursor-pointer hover:text-blue-600 text-blue-900 border-2 border-solid border-blue-600 ml-4 p-2"
            onClick={() => {
              // little hacky - grab autocomplete input value
              const el = document.getElementById("collections-autocomplete")
              const val = el.value
              addEntity(val, arrayHelpers.push)
              setopts([])
            }}
          >
            Add
          </span>
          <div className="bg-gray-100 border-solid rounded mt-gutter">
            {values[name] &&
              values[name].map((col, index) => (
                <div key={index} className="bg-gray-100 p-2 m-2">
                  <Field
                    name={`${name}${index}`}
                    value={values[name][index][titleField]}
                    className="bg-gray-100"
                  />
                  <button
                    className="text-red-600 font-extrabold"
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    />
  )
}

export default AutocompleteForm
