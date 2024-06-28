import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/debitor'

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
      return req.data
    })
  },
  getAll() {
    return this.execute('get', '/')
  },
  getAllByWACode(cabang) {
    return this.execute('get', `/WACode/${cabang}`)
  },
  getListKartuPiutang(cabang) {
    return this.execute('get', `/kartuPiutang/${cabang}`)
  },
  getAllFlag(flag) {
    return this.execute('get', `/flag/${flag}`)
  },
  getOne(id) {
    return this.execute('get', `/${id}`)
  },
   getAllOne(id) {
    return this.execute('get', `/all/${id}`)
  },
    create(data) {

    return this.execute('post', '/', data)
  },
    update(id, data) {

    return this.execute('put', `/update/${id}`, data)
  },
  delete(id) {
    return this.execute('put', `/delete/${id}`)
  },
  getAllBelumCair() {
    return this.execute('get', '/BelumCair')
  },
  getAllPerjanjian() {
    return this.execute('get', '/Perjanjian')
  },
  // getAllPerjanjianParent() {
  //   return this.execute('get', '/Perjanjian/ParentDACode/')
  // },
  sudahCair() {
    return this.execute('get', '/SudahPencairanBL')
  },
  SavePermohonanToPersetujuan(daCode, data){
    return this.execute('post', `/SaveAllCode/${daCode}`, data)
  }
}
