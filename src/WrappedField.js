import React from "react"
import { ErrorMessage, Field } from "formik"

const WrappedField = props => {
  const { label, children, helptext, required, id, ...rest } = props
  const choices = rest.choices || []
  const type = rest.type || "string"
  return (
    <div>
      <label className="usa-label">
        {label}
        {required && <span>*</span>}
      </label>
      <p className='usa-helptext'>{ helptext }</p>
      {
        {
          string: (
            <Field
              className="usa-input"
              {...rest}
            />
          ),
          select: (
            <Field {...rest} className="usa-select" component="select">
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
              <Field {...rest} className="usa-usa-radio__input" component="radio" id={id}/>
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
