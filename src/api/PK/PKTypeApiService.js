import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/PKType'

const client = axios.create({
  baseURL: url,
  json: true
})

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
    }).then(req => {
      console.log(req.data);
      if (method != 'get') {
        return req.data
      }
      return req.data.Data
    })
  },
  getAllCombobox() {
    return this.execute('get', '/comboBox')
  },

  getOne(PkTypeId) {
    return this.execute('get', `/${PkTypeId}`)
  },
  getAll() {
    return this.execute('get', '/')
  },
  create(payload) {
    return this.execute('post', '/', payload)
  },
  update(id, payload) {
  return this.execute('put', `/${id}`, payload)
},
}
