﻿import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/attached'

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
            console.log(req.headers);
            return req.data
        })
    },
     async executeDownload(method, resource, data, options,ResponseType) {
        return client({
            method,
            url: resource,
            data,
            headers: options,
            responseType: ResponseType,
        }).then(req => {
            console.log(req);
            return req
        })
    },
    getAll() {
        return this.execute('get', '/')
    },
    getOne(id) {
         var option = { 'Content-Type': 'multipart/form-data' }
        return this.execute('get', `/${id}`, option)
    },
    getOneId(id) {
        return this.execute('get', `/ID/${id}`)
    },
     getOneByDaCode(DebCode) {
        return this.execute('get', `/${DebCode}`)
    },
    create(data) {
        //console.log("data ", data)
        var option = { 'Content-Type': 'multipart/form-data' }
        return this.execute('post', '/', data, option)
    },
    download(data) {
        //console.log("data ", data)
        var option = { 'Content-Type': 'multipart/form-data' }
        var Response = 'arraybuffer'
        return this.executeDownload('post', '/download', data, option,Response)
    },
    update(id, data) {

        return this.execute('put', `/update/${id}`, data)
    },
    delete(id) {
        return this.execute('post', `/delete/${id}`)
    },
}