import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/channelPartner'

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
      // console.log(req.data);
      if (method != 'get') {
        return req.data
      }
      return req.data.Data
    })
  },
  getAll() {
    return this.execute('get', '/')
  },
  getAllById(id) {
    return this.execute('get', `/${id}`)
  },
  getCombobox() {
    return this.execute('get', '/combobox')
  },
  create(data) {
    return this.execute('post', '/Insert', data)
  },
  update(data) {
    return this.execute('put', `/Update`, data)
  },
  delete(id) {
    return this.execute('put', `Delete/${id}`)
  }
}
