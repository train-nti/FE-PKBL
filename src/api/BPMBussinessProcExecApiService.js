import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/BussProExec'

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
      console.log(data);
      if (method != 'get') {
        console.log(req.data);
        return req.data
      }
      return req.data.Data
    })
  },
  getAll() {
    var data = this.execute('get', '/')
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].BP_ID
    }
    return data
  },
  getLast() {
    return this.execute('get', `/Last`)
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
