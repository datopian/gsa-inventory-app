import React from "react"
import "./App.css"
import CollectionsForm from "./CollectionsForm"
import PropTypes from "prop-types"
import DatasetFrom from "./components/DatasetForm"

const App = props => {
  console.log("col", props.collection)
  return (
    <div className="App">
      <DatasetFrom />
    </div>
  )
}

App.propTypes = {
  collection: PropTypes.object
}

export default App
