import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/CommitteeMembers'

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
    var data = this.execute('get', '/')
    return data
  },
  getByBussProcID(id) {
    return this.execute('get', `/getByBussProcID/${id}`)
  },
  create(bpID,data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      data[i].BP_ID = bpID
      this.execute('post', '/Insert', data[i])
    }
  },
  update(bpID,data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      if (data[i].Step_ID != null) {
        this.execute('put', `/Update/${data[i].Step_ID}`, data[i])
      }else {
        data[i].BP_ID = bpID
        this.execute('post', '/Insert', data[i])
      }

    }
  },
  delete(id) {
    return this.execute('delete', `Delete/${id}`)
  }
}
