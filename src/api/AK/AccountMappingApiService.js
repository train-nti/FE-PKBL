import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/AccountMapping'

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
      if (method != 'get') {
        return req.data
      }
      return req.data.Data
    })
  },
  getAccountBySectorAndMappingCategoryId(Sector,MappingCategory) {
    return this.execute('get', `/Sector/${Sector}/${MappingCategory}`)
  },
  getAccountByChnlCode(ChnlCode) {
    return this.execute('get', `/ChannelPartner/${ChnlCode}`)
  },
   getAccountByFlagWAAccMapingCategory(flag,categoryId,WA) {
    return this.execute('get', `/Flag/MapingCategory/WA/${flag}/${categoryId}/${WA}`)
  },
   getAccountByAccMapingCategory(categoryId) {
    return this.execute('get', `/MapingCategory/${categoryId}`)
  },
}
