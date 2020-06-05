import React from "react"
import { ErrorMessage, Field } from "formik"

const WrappedField = props => {
  const { label, children, required, ...rest } = props
  const choices = rest.choices || []
  const type = rest.type || "string"
  return (
    <div className="m-4 mt-gutter">
      <span className="block text-gray-600  mb-2">
        {label}
        {required && <span className="text-red-600 text-900 text-xl">*</span>}
      </span>
      {
        {
          string: (
            <Field
              className="w-3/4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...rest}
            />
          ),
          select: (
            <Field {...rest} component="select">
              <option key={0}>Choose one</option>
              {choices.map((choice, i) => (
                <option value={choice} key={i + 1}>
                  {choice}
                </option>
              ))}
            </Field>
          )
        }[type]
      }
      <ErrorMessage className="text-red-600" {...rest} component="div" />
      {children}
    </div>
  )
}

export default WrappedField
