import App from '../src/App'

const collection = {
  extras: {master: true}
}

export default {
  component: App,
  props: {collection, debug: true, apiUrl:"http://localhost:5000/api/3/action/", addDocsUrl: "http://localhost:5000/dataset/resources/"}
}
