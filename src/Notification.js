import React from "react"
import PropTypes from "prop-types"

const FieldInfo = props => {
  console.log("Notification", props)
  switch (props.type) {
    case "notice":
      return <p className="bg-yellow-300 p-4 m-4">{props.msg}</p>
    case "warn":
      return <p className="bg-yellow-300 p-4 m-4">{props.msg}</p>
    case "success":
      return <p className="bg-green-300 p-4 m-4">{props.msg}</p>
    case "fail":
      return <p className="bg-red-300 p-4 m-4">{props.msg}</p>
    default:
      return <p className="bg-yellow-300 p-4 m-4">{props.msg}</p>
  }
}

FieldInfo.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string
}
export default FieldInfo
