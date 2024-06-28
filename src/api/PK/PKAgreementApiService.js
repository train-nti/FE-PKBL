import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/PKAgreement'

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
    getByPKAgreeId(PKAgreeId) {
        return this.execute('get', `/${PKAgreeId}`)
    },
    create(data) {
        // console.log("data ", data)
        return this.execute('post', '/', data)
    },

    update(PKAgreeId, data) {

        return this.execute('put', `/update/${PKAgreeId}`, data)
    },
    // delete(id) {
    //     return this.execute('put', `/delete/${id}`)
    // }
}
