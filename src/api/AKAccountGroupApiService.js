import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/AccountGroup'

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
      if (method != 'get') {
        console.log(req.data);
        return req.data
      }
      return req.data.Data
    })
  },
  getAll() {
    return this.execute('get', '/')
  },
  getDateFrom(date1,date2,cabang) {
    console.log("TANGGAL API",date1)
    return this.execute('get', `/${date1}/${date2}/${cabang}`)
  },
  getFilter(dariMonth,
            dariYear,
            sampaiMonth,
            sampaiYear,
            cabang
            ) {
    return this.execute('get', `/ByType/${dariMonth}/${dariYear}/${sampaiMonth}/${sampaiYear}/${cabang}/`)
  },
  getOne(id) {
    return this.execute('get', `/${id}/`)
  },
  getByCategoryID(id) {
    return this.execute('get', `/Neraca/${id}/`)
  },
  create(data) {
    return this.execute('post', '/Insert', data)
  },
  update(id, data) {
    return this.execute('put', `/Update/${id}/`, data)
  },
  delete(id) {
    return this.execute('put', `Delete/${id}`)
  }
}
