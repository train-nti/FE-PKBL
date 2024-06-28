import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/import'

const client = axios.create({
    baseURL: url,
    json: true
})

export default {
    async execute(method, resource, data, options) {
        return client({
            method,
            url: resource,
            data,
            headers: options,
        }).then(req => {
            console.log(req.data);
            return req.data
        })
    },
    create(data) {
        //console.log("data ", data)
        var option = { 'Content-Type': 'multipart/form-data' }
        return this.execute('post', '/persetujuan', data, option)
    },
}
