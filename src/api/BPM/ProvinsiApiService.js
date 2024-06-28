import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/Provinsi'

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
  getAllCombobox() {
    return this.execute('get', '/ComboBox')
  },
  getAllComboboxWACode(WACode) {
    return this.execute('get', `/ComboBox/${WACode}`)
  },
  getOne(Kode) {
    return this.execute('get', `/${Kode}`)
  },
  getAll(){
    return this.execute('get', '/')
  },
  create(payload) {
    return this.execute('post', '/Insert', payload)
  },
  update(id, payload) {
    return this.execute('put', `/Update/${id}`, payload)
  },
}
