import React from "react"
import infoImage from "./img/info.png"
import PropTypes from "prop-types"

const FieldInfo = props => {
  return (
    <div>
      <img src={infoImage} alt="info" className="h-4 mr-2 mt-1 float-left" />
      <span className="text-gray-600">{props.text}</span>
    </div>
  )
}

FieldInfo.propTypes = {
  text: PropTypes.string
}
export default FieldInfo
