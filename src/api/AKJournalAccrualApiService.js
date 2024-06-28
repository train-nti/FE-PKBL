import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/JournalAccrual'

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
      return req.data.Data
    })
  },
  getAll() {
    return this.execute('get', '/')
  },
  getAllTable(type,status,WorkArea,StartDate,EndDate) {
    return this.execute('get', `/table/${type}/${status}/${WorkArea}/${StartDate}/${EndDate}`)
  },
  getOne(id) {
    return this.execute('get', `/${id}`)
  }, 
  create(data, JrnID) { 
      this.execute('post', '/Insert', data) 
  },
  update(id, data) { 
      this.execute('put', `/Update/${id}`, data) 
  },
  delete(id) {
    return this.execute('put', `Delete/${id}`)
  }
}
