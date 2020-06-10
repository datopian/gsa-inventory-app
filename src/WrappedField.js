import React from "react"
import { ErrorMessage, Field } from "formik"

const WrappedField = props => {
  const { label, children, helptext, required, id, disabled, infoText, ...rest } = props
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

        {/* Tooltip */}
        {infoText && <div className="tooltip">
          <img className="fa" src={require("./img/info.svg")} />
          <span className="tooltiptext">
              <span className="close">
                  <a >&times;</a>
              </span>
              <h3>{ label }</h3>
              <p>{ infoText }</p>
          </span>
        </div>} 
      </label>

      <p className={`usa-helptext ${ disabledClass }`}>{ helptext }</p>
      <ErrorMessage className="error-msg" {...rest} component="div" />
      {
        {
          string: (
            <Field
              className={`usa-input ${ disabledClass }`}
              disabled={disabled}
              {...rest}
            />
          ),
          select: (
            <Field {...rest} className={`usa-select ${ disabledClass }`} component="select">
              <option value="" disabled selected>-Select-</option>
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
