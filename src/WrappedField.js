import React from "react"
import { ErrorMessage, Field } from "formik"

const WrappedField = props => {
  const { label, children, helptext, required, id, disabled, ...rest } = props
  const choices = rest.choices || []
  const type = rest.type || "string"


  let disabledClass = "";
  if(disabled){
    disabledClass = "disabled"; 
  } else {
    disabledClass = ""; 
  }
  return (
    <div>
      <label className="usa-label">
        {label}
        {required && <span>*</span>}
      </label>
      <p className={`usa-helptext ${ disabledClass }`}>{ helptext }</p>
      {
        {
          string: (
            <Field
              className={`usa-input ${ disabledClass }`}
              {...rest}
            />
          ),
          select: (
            <Field {...rest} className={`usa-select ${ disabledClass }`} component="select">
              <option key={0}>-Select-</option>
              {choices.map((choice, i) => (
                <option value={choice} key={i + 1}>
                  {choice}
                </option>
              ))}
            </Field>
          ),
          radio: (
            <div>
              <Field {...rest} className="usa-radio__input" component="radio" id={id}/>
              <label className="usa-radio__label" htmlFor={id}>
                  {label}
              </label>
            </div>
          )
        }[type]
      }
      <ErrorMessage className="text-red-600" {...rest} component="div" />
      {children}
    </div>
  )
}

export default WrappedField
