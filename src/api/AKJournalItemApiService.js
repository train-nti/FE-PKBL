import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/JournalItem'

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
  getOne(id) {
    return this.execute('get', `/${id}`)
  },
  getByJrnID(id) {
    return this.execute('get', `/getByJrnID/${id}`)
  },
  create(data, JrnID) {
    console.log(data);
    // console.log(JrnID);
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i]);
      data[i].Jrn_ID = JrnID

      if (data[i].debet != null) {
        data[i].IsDebet = true
        data[i].ItemValue = parseInt(data[i].debet)
      }else{
        data[i].IsDebet = false
        data[i].ItemValue = parseInt(data[i].credit)
      }

      this.execute('post', '/Insert', data[i])
    }
  },
  update(id, data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      data[i].Jrn_ID = id
      if (data[i].Item_ID != null) {

        if (data[i].debet != null) {
          data[i].IsDebet = true
          data[i].ItemValue = parseInt(data[i].debet)
        }else{
          data[i].IsDebet = false
          data[i].ItemValue = parseInt(data[i].credit)
        }

        this.execute('put', `/Update/${id}`, data[i])
      }else{
        var dataArray = [data[i]]
        this.create(dataArray, id)
      }

    }
  },
  delete(id) {
    return this.execute('put', `Delete/${id}`)
  }
}
