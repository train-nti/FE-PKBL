import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/AppRequest'

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
    var data = this.execute('get', '/')
    return data
  },
  getByBussProcID(id) {
    return this.execute('get', `/getByBussProcID/${id}`)
  },
  getOne(id) {
    return this.execute('get', `/${id}`)
  },
  getbyPosition(id) {
    return this.execute('get', `/ByPosition/${id}`)
  },
  getByBussProcExecID(id) {
    return this.execute('get', `/ByBussProExec/${id}`)
  },
  create(startDate,bpeID,data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      data[i].BPE_ID = bpeID
      data[i].Pos_ID = data[i].PosTmp_ID
      data[i].ReqDate = startDate
      data[i].ReqType = data[i].ApprType
      data[i].AppDate = startDate
      data[i].AppStatus = "Pending"
      this.execute('post', '/Insert', data[i])
    }
  },
  update(data) {
        this.execute('put', `/Update/${data.Appreq_ID}`, data)
  },
  delete(id) {
    return this.execute('delete', `Delete/${id}`)
  }
}
