import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/Runnable'

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
    getSPClosingMonthly(date,Month,Year) {
        return this.execute('post', `/SPClosingMonthly/${date}/${Month}/${Year}`)
    },
     getSPClosingCollectability(date,Month,Year) {
        return this.execute('post', `/SPClosingCollectability/${date}/${Month}/${Year}`)
    },
    getClosingCollectibility(date) {
        return this.execute('post', `/SPClosingCollectibility/${date}`)
    },
    getClosingYearly(date,year) {
        return this.execute('post', `/SPClosingYearly/${date}/${year}`)
    },
    getClosingDaily(date) {
        return this.execute('post', `/SPClosingDaily/${date}`)
    },
}
