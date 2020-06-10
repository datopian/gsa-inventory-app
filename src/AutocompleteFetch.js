import React, { useState } from "react"
import { FieldArray, Field } from "formik"
import Autocomplete from "react-autocomplete-input"
import $ from 'jquery'

let tags = []
let errorClass = "hidden"
const addEntity = (val, push) => {
  if (val) {
    const dataset = {
      name: val,
      id: val
    }

    push(dataset)

    tags.push(dataset)
  }
}

const checkTags = () => {
  if(tags.length == 0){ 
    $('#tags-error').addClass('error-msg')
    $('#tags-error').removeClass('hidden')
  } else {
    $('#tags-error').removeClass('error-msg')
    $('#tags-error').addClass('hidden')
  }

  console.log(tags)
}

const AutocompleteForm = ({ values, getOptions, apiUrl, name, titleField }) => {
  const [opts, setopts] = useState()
  const [tagText, setTagText] = useState("")

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div className="mt-gutter m-4">
          <div id="tags-error" className={`error-msg hidden`} type="string" placeholder="" value="">Tags are required</div>
          <Autocomplete
            className="usa-input"
            id="collections-autocomplete"
            Component="input"
            trigger=""
            spacer=""
            matchAny={true}
            onRequestOptions={e => getOptions(e, values, setopts)}
            options={opts}
            value={tagText}
            onBlur={checkTags}
            onChange={setTagText}
            onKeyPress={(event) => {
              // little hacky - grab autocomplete input value
              if(event.key == 'Enter'){
                const el = document.getElementById("collections-autocomplete")
                const val = el.value
                addEntity(val, arrayHelpers.push)
                setopts([])
                setTagText("")
                checkTags()
                event.preventDefault()
              }
            }}
            placeholder="Start typing to search..."
          />
          <div className="tags_container">
            {values[name] &&
              values[name].map((col, index) => (
                <div key={index} className="custom_tag">
                  <Field
                    name={`${name}${index}`}
                    value={values[name][index][titleField]}
                    className="bg-gray-100"
                  />
                  <button
                    className="text-red-600 font-extrabold"
                    type="button"
                    onClick={() => {arrayHelpers.remove(index); tags.pop(index)}}
                  >
                    <img className="close" src={require("./img/close.svg")} />
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
