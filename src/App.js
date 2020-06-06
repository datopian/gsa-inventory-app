import React from "react"
import "./App.css"
import CollectionsForm from "./CollectionsForm"
import PropTypes from "prop-types"

const App = props => {
  console.log("col", props.collection)
  return (
    <div className="App">
      <h1 className="jumbotron">Hello Testing BS</h1>
      <h2 className="text-3xl my-gutter ml-4">
        {props.collection.extras && props.collection.extras.master
          ? "Required Metadata"
          : "Collection information"}
      </h2>
        
      <h1 id="card" class="site-page-title">Card</h1>
      <div class="usa-alert usa-alert--info">
  <div class="usa-alert__body">
    <h3 class="usa-alert__heading">Informative status</h3>
    <p class="usa-alert__text">Lorem ipsum dolor sit amet, <a href="javascript:void(0);">consectetur adipiscing</a> elit, sed do eiusmod.</p>
  </div>
</div>
      <button class="usa-button ">Default</button>
      <CollectionsForm {...props} />
      <hr />
    </div>
  )
}

App.propTypes = {
  collection: PropTypes.object
}

export default App
