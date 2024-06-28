import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/document'

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
  getAll() {
    var data = this.execute('get', '/')
    return data
  },
  getAllName() {
    return this.execute('get', '/ComboBox')
  },
  getOne(id) {
    return this.execute('get', `/${id}`)
  },
  create(data) {
    return this.execute('post', '/Insert', data)
  },
  update(id, data) {
    return this.execute('put', `/Update/${id}`, data)
  },
  delete(id) {
    return this.execute('delete', `Delete/${id}`)
  }
}
