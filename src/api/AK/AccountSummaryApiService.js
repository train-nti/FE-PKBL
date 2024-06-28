import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/AccountSummary'

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
  // getLaporanKeuangan(type,year,month,cabang) {
  //   return this.execute('get', `LaporanKeuangan/${type}/${year}/${month}/${cabang}`)
  // },
  getLaporanKeuangan(year,month,cabang) {
    return this.execute('get', `LaporanKeuangan/${year}/${month}/${cabang}`)
  },
  getBaganAkun(dariMonth,
            dariYear,
            sampaiMonth,
            sampaiYear,
            cabang
            ) {
    return this.execute('get', `/BaganAkun/${dariMonth}/${dariYear}/${sampaiMonth}/${sampaiYear}/${cabang}/`)
  },
  getClosedDate(){
    return this.execute('get', `/ClosedDate`)
  }
}
