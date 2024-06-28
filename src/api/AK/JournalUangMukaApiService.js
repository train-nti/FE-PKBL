import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/JournalUangMuka'

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
    getTable(type,flag,WorkArea,dari=null,hingga=null) {
        return this.execute('get', `/table/${type}/${flag}/${WorkArea}/${dari}/${hingga}`)
    },
    getTableSelesai(type,WorkArea,dari=null,hingga=null) {
        return this.execute('get', `/table/selesai/${type}/${WorkArea}/${dari}/${hingga}`)
    },
    getByCode(JrnUM) {
        return this.execute('get', `/${JrnUM}`)
    },
    cekJurnalUMK(IDNumber) {
        return this.execute('get', `/CekStatusUMK/${IDNumber}`)
    },
    create(data) {
        // console.log("data ", data)
        return this.execute('post', '/Insert', data)
    },
    update(Id, data) {

        return this.execute('put', `/update/${Id}`, data)
    },
    delete(id) {
        return this.execute('put', `/delete/${id}`)
    }
}
