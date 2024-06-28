import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/PKSurvey'

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
    getByDaCode(DACode) {
        return this.execute('get', `/DaCode/${DACode}`)
    },
    create(data) {
        // console.log("data ", data)
        return this.execute('post', '/', data)
    },
    updateByDEBCode(DACode, data) {

        return this.execute('put', `/update/DaCode/${DACode}`, data)
    },
    updateByIdPKSurvey(IdPKSurvey, data) {

        return this.execute('put', `/update/${IdPKSurvey}`, data)
    },
    // delete(id) {
    //     return this.execute('put', `/delete/${id}`)
    // }
}
