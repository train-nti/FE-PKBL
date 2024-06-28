import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/'



export default {
  async execute(method, resource, data) {
    const client = axios.create({
      baseURL: url,
      json: true
    })

    return client({
      method,
      url: resource,
      data,
    }).then(req => {
      // console.log(req.data);
      if (method != 'get') {
        console.log(req.data);
        return req.data
      }
      return req.data.Data
    })
  },
  getCount(model) {
    return this.execute('get', model)
  },
  getCountByTransBL(model) {
    return this.execute('get', model)
  },
  create(model,data) {
    return this.execute('post', model, data)
  }
}
