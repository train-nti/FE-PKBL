import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/instSchedule'

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
            return req.data
        })
    },
    getAll() {
        return this.execute('get', '/')
    },
    getByTagihan(id,cabang) {
        return this.execute('get', `/ByTagihan/${id}/${cabang}`)
    },
    getByTagihanLunas(cabang) {
        return this.execute('get', `/ByTagihanLunas/${cabang}`)
    },
    getTagihanByDaCode(id) {
        return this.execute('get', `/Tagihan/By/${id}`)
    },
    getOne(id) {
        return this.execute('get', `/${id}`)
    },
    getKartuPiutang(id) {
        return this.execute('get', `/KartuPiutang/${id}`)
    },
     getLebihBayar(cabang) {
        return this.execute('get', `/LebihBayar/${cabang}`)
    },
    getSPPKDiskon(Data) {
        return this.execute('post', `/SPPKDiskon`,Data)
    },
    getTotal(id) {
        return this.execute('get', `/Total/${id}`)
    },
    async create(data) {
        console.log("data inst ", data)
        for (var i = 0; i < data.length; i++) {
          await this.execute('post', '/', data[i])
        }
         // return this.execute('post', '/', data)
    },
    async createMany(data) {
      console.log("insert many ", data)
      await this.execute('post', '/insertMany', data)
    },
    update(id, data) {

        return this.execute('put', `/update/${id}`, data)
    },
    delete(id) {
        return this.execute('put', `/delete/${id}`)
    }
}
