import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/KotaKab'

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
  getAllComboboxByKodeProv(id) {
    return this.execute('get', `/ComboBox/${id}`)
  },
  getAllCombobox() {
    return this.execute('get', '/ComboBox')
  },
  getAll() {
    return this.execute('get', '/')
  },
  getOne(id) {
    return this.execute('get', `/${id}`)
  },
  create(payload) {
    return this.execute('post', '/', payload)
  },
  update(id, payload) {
    return this.execute('put', `/Update/${id}`, payload)
  },
}
