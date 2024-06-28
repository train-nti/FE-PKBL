import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/PKSurveyFinance'

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
    getByIdPKSurveyCode(IdPKSurvey) {
        return this.execute('get', `/PKSurvey/${IdPKSurvey}`)
    },
    create(data) {
        // console.log("data ", data)
        return this.execute('post', '/', data)
    },
    updateByIdPKSurveyCode(IdPKSurvey, data) {

        return this.execute('put', `/update/PKSurvey/${IdPKSurvey}`, data)
    },
    // delete(id) {
    //     return this.execute('put', `/delete/${id}`)
    // }
}
