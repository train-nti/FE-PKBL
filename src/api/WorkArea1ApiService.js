import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/WorkArea1'

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
  getComboBoxAll() {
    return this.execute('get', '/')
  },
  getComboBoxByCodeLogin(code) {
    return this.execute('get', `/Not/${code}`)
  },
   getByCode(code) {
    return this.execute('get', `/${code}`)
  }
}
