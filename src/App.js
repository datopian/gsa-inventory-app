import React from "react"
import "./App.css"
import CollectionsForm from "./CollectionsForm"
import PropTypes from "prop-types"

const App = props => {
  console.log("col", props.collection)
  return (
    <div className="App">
      <h2 className="text-3xl my-gutter ml-4">
        {props.collection.extras && props.collection.extras.master
          ? "Master Collection information"
          : "Collection information"}
      </h2>
      <CollectionsForm {...props} />
      <hr />
    </div>
  )
}

App.propTypes = {
  collection: PropTypes.object
}

export default App
