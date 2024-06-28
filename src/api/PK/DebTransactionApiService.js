import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/debTransaction'

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
      //console.log(req.data);
      return req.data
    })
  },
  getAll() {
    return this.execute('get', '/')
  },
  getAllStatusDone() {
    return this.execute('get', '/')
  },

  getOneDACode(DACode){
    return this.execute('get', `/${DACode}`)
  },

  getAllDeb(data) {
    return this.execute('post', '/Report',data)
  },
  getOne(id) {
    return this.execute('get', `/${id}`)
  },
  hasBeenPaid(DACode){
    return this.execute('get', `/HasBeenPaid/${DACode}`)
  },

    create(data) {

    return this.execute('post', '/', data)
  },
    createPembayaran(data) {

    return this.execute('post', '/Pembayaran', data)
  },
    createPembayaranDipercepat(data) {

    return this.execute('post', '/Pembayaran/Dipercepat', data)
  },
    createPengembalian(data) {

    return this.execute('post', '/Pengembalian', data)
  },
    createPenerimaanKelebihan(data) {

    return this.execute('post', '/PenerimaanKelebihan', data)
  },
    update(id, data) {

    return this.execute('put', `/update/${id}`, data)
  },
  koreksiPembayaran(data) {
    return this.execute('post', `/koreksiPembayaran`, data)
  },
  delete(id) {
    return this.execute('put', `/delete/${id}`)
  },
  getAllPencBL(WACode) {
    return this.execute('get', `/BL/All/Pencairan/${WACode}`)
  }
}
