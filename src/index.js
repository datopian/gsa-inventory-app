import React from "react"
import ReactDOM from "react-dom"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css';
import "./css/uswds.min.css";
import App from "./App"
import API from "./Api"
import * as serviceWorker from "./serviceWorker"

console.log("v0.4.6")
const el = document.getElementById("dep-of-ed-admin-ui")
let config = {}

// Parse config from environment
try {
  const parsed = JSON.parse(el.getAttribute("data-config"))
  if (parsed) config = parsed // exclude falsey values
} catch (e) {
  console.log("Failed parsing Admin opts", e)
}

console.log(config)

// If collectionId provided, fetch then render
if (config.collectionId) {
  API.getCollection({ name: config.collectionId }, config.apiUrl)
    .then(async res => {
      const collection = res.data.result
      ReactDOM.render(
        <App collection={collection} {...config} />,
        document.getElementById("dep-of-ed-admin-ui")
      )
    })
    .catch(console.log)
  // if no collectionId provided, render new collection form
} else {
  const { isMaster, ...rest } = config
  ReactDOM.render(
    <App collection={{ extras: { master: isMaster } }} {...rest} />,
    document.getElementById("dep-of-ed-admin-ui")
  )
}

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
