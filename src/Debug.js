import React, { useState } from "react"

const Debug = ({ vals }) => {
  const [open, toggle] = useState(0)
  return (
    <div className="bg-yellow-300 p-4 m-4 border-dotted border-4">
      {open ? (
        <p className="mb-2">
          <a
            href="#"
            className="bg-white p-2 mb-2"
            onClick={e => {
              e.preventDefault()
              toggle(0)
            }}
          >
            close
          </a>
        </p>
      ) : (
        <p>
          <a
            href="#"
            className="bg-white p-2 mb-2"
            onClick={e => {
              e.preventDefault()
              toggle(1)
            }}
          >
            debug+
          </a>
        </p>
      )}
      {!!open &&
        Object.keys(vals).map((k, i) => {
          return (
            <pre key={i}>
              <span>{k}: </span>
              <span>{JSON.stringify(vals[k], null, 2)}</span>
            </pre>
          )
        })}
    </div>
  )
}

export default Debug
