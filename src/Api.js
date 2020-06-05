import axios from "axios"

const API_KEY = "9c576d2d-51bd-464f-845c-594578719964"
const EXTRAS = [
  "category",
  "programCode",
  "organization",
  "dataLevel",
  "spatial",
  "frequency",
  "contactName",
  "contactEmail",
  "references",
  "summary_dataset",
  "master",
  "homePage"
]
const headers = { Authorization: API_KEY }
const reqOpts = { headers }

const safeName = name =>
  name
    .split(" ")
    .join("_")
    .replace(/\W/g, "")
    .toLowerCase()

/**
 * Encode extras for CKAN 2.8.2 Groups format
 **/
const encodeExtras = opts => {
  if (opts) {
    const extras = EXTRAS.map(key => {
      return { key: key, value: opts[key] || "" }
    })
    return extras
  }
  return [{}]
}

/**
 * Decode extras from CKAN 2.8.2 Groups format
 **/
const decodeExtras = opts => {
  const extras = EXTRAS.reduce((acc, key) => {
    const row = opts.find(r => r.key === key)
    const val = (row && row.value) || ""
    acc[key] = val
    return acc
  }, {})

  return extras
}

const normalizeRes = res => {
  try {
    const result = JSON.parse(JSON.stringify(res.data.result)) // dereference
    result.extras = decodeExtras(result.extras)
    res.data.result = result
    return res
  } catch (e) {
    console.warn(e)
    return res
  }
}

const createDataset = (opts, apiUrl) => {
  const cheapRand = Math.random()
    .toString(36)
    .slice(2) // psuedo-random string
  const safe = safeName(opts.title)
  const summary_dataset = `${safe}_dataset_${cheapRand}`
  const datasetOpts = {
    name: summary_dataset,
    contact_name: opts.extras.contactName,
    contact_email: opts.extras.contactEmail,
    level_of_data: opts.extras.dataLevel,
    notes: opts.description,
    title: `Documentation for ${opts.title}`,
    private: false,
    approval_state: ""
  }
  const url = apiUrl + "package_create"
  console.log("create", opts, datasetOpts)
  return axios.post(url, datasetOpts, reqOpts)
}

export default {
  getCollection: async (opts, apiUrl) => {
    try {
      const url = apiUrl + `group_show?id=${opts.name}&include_datasets=true`
      const res = await axios.get(url, reqOpts)
      return normalizeRes(res)
    } catch (e) {
      return Promise.reject("Error getting collection", e)
    }
  },
  createCollection: async (opts, apiUrl) => {
    let url

    // TODO from props

    try {
      if (opts.extras.master) {
        url = `${apiUrl}group_create?type=master_collection`
        opts.extras.group_type = "master_collection"
        opts.type = "master_collection"
      } else {
        url = `${apiUrl}group_create?type=collection`
        opts.extras.group_type = "collection"
        const summary_dataset = await createDataset(opts, apiUrl)
        opts.extras.summary_dataset = summary_dataset.data.result.id
        opts.type = "collection"
      }
      opts.name = safeName(opts.title)
      opts.extras = encodeExtras(opts.extras)
      const res = await axios.post(url, opts, reqOpts)
      return normalizeRes(res)
    } catch (e) {
      return Promise.reject("Error creating collection", e)
    }
  },
  updateCollection: async (opts, apiUrl) => {
    try {
      const url = apiUrl + `group_update`
      opts.extras = encodeExtras(opts.extras)
      const res = await axios.post(url, opts, reqOpts)
      return normalizeRes(res)
    } catch (e) {
      return Promise.reject("Error updating collection", e)
    }
  },
  deleteCollection: async (opts, apiUrl) => {
    try {
      const url = apiUrl + `group_delete`
      const body = { id: opts.id }
      const res = await axios.post(url, body, reqOpts)
      return normalizeRes(res)
    } catch (e) {
      return Promise.reject("Error deleting collection", e)
    }
  },
  fetchCollectionsAutocompleteOpts: async (str, apiUrl) => {
    try {
      const url = apiUrl + `group_autocomplete?q=${str}&type=collection`
      const res = await axios.get(url, reqOpts)
      console.log(res)
      return res.data.result.map(row => row.name)
    } catch (e) {
      return Promise.reject("Error fetching results", e)
    }
  },
  fetchDatasetsAutocompleteOpts: async (str, apiUrl) => {
    try {
      const url = apiUrl + `package_search?q=${str}`
      const res = await axios.get(url, reqOpts)
      return res.data.result.results.map(row => row.name)
    } catch (e) {
      return Promise.reject("Error fetching results", e)
    }
  }
}
