import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/genereteDANumber'

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

  getDANumber(WaCode) {
    return this.execute('get', `/${WaCode}`)
  }
}
