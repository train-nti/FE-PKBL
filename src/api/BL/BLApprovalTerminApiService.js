import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/PKBLBLApprovalTermin'

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
      //console.log(req.data.Data);
      return req.data
    })
  },
  getAll() {
    return this.execute('get', '/')
  },
    create(data) {

    return this.execute('post', '/', data)
  },
    update(id, data) {

    return this.execute('put', `/update/${id}`, data)
  },
  delete(id) {
    return this.execute('put', `delete/${id}`)
    },
    getOne(id) {
        return this.execute('get', `/${id}`)
    },
     getOneByDaCode(id) {
        return this.execute('get', `/DaCode/${id}`)
    }

}
