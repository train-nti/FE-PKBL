import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/debitorCollaterall'

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
    getByDEBCode(DebCode) {
        return this.execute('get', `/DEBCode/${DebCode}`)
    },
    create(data) {
        // console.log("data ", data)
        return this.execute('post', '/', data)
    },
    updateByDEBCode(DebCode, data) {

        return this.execute('put', `/update/DEBCode/${DebCode}`, data)
    },
    // delete(id) {
    //     return this.execute('put', `/delete/${id}`)
    // }
}
