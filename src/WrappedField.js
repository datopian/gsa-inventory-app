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
      <ErrorMessage className="error-msg" {...rest} component="div" />
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
     
      {children}
    </div>
  )
}

export default WrappedField
