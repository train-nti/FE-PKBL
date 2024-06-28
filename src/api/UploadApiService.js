import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/Account'

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
    return this.execute('get', '/')
  },
  getOne(id) {
    return this.execute('get', `/${id}/`)
  },
  getMany(id) {
    return this.execute('get', `/Many/${id}/`)
  },
  getBalance(id) {
    return this.execute('get', `/GetBalanceByGroup/${id}/`)
  },
  create(data) {
    return this.execute('post', '/Insert', data)
  },
  update(data) {
    return this.execute('put', `/Update`, data)
  },
  delete(id) {
    return this.execute('put', `Delete/${id}`)
  },
  getCode(code) {
    return this.execute('get', `getByCode/${code}/`)
  },
  getByCodeAccount() {
    return this.execute('get', `getByCode/Account/`)
  },
  countBalanceBank(code, data){
    return this.execute('put', `/countBalanceBank/${code}/${data}/`)
  }
  ,
  countBalanceSect(code, data){
    return this.execute('put', `/countBalanceSect/${code}/${data}/`)
  }
}
