import Vue from 'vue'
import axios from 'axios'
import config from "../../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/debitAccount'

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

    getAllPerkembanganMitraBinaan(sortir) {
        return this.execute('post', `/getAll/PerkembanganMitraBinaan`,sortir)
    },
    getAllByDebt(data) {
        return this.execute('post', `/By/Debt`,data)
    },
    getAllDebitorJoinDebitAccountDebitor(posisi,cabang) {
        return this.execute('get', `/penilaian/persetujuan/${posisi}/${cabang}`)
    },
    getAllDebitorJoinDebitAccountDebitorPK(posisi,cabang) {
        return this.execute('get', `/penilaian/persetujuanPK/${posisi}/${cabang}`)
    },
     getAllDebitorJoinDebitAccountDebitorApprove(posisi,cabang) {
        return this.execute('get', `/penilaian/persetujuan/Approve/${posisi}/${cabang}`)
    },
    getAllDebitorJoinDebitAccountDebitorPKApprove(posisi,cabang) {
        return this.execute('get', `/penilaian/persetujuanPK/Approve/${posisi}/${cabang}`)
    },
     getAllDebitorJoinDebitAccountTidakSetuju(cabang) {
        return this.execute('get', `/penilaian/persetujuan/TidakSetuju/${cabang}`)
    },
    getAllDebitorJoinDebitAccountTidakSetujuPK(cabang) {
        return this.execute('get', `/penilaian/persetujuanPK/TidakSetuju/${cabang}`)
    },
    getAllDebitorPermohonan(flag,cabang,type,offset,limit) {
        return this.execute('get', `/permohonan/${flag}/${cabang}/${type}/${offset}/${limit}`)
    },
    getOne(DACode) {
        return this.execute('get', `/${DACode}`)
    },
     getByDEBCode(DebCode) {
        return this.execute('get', `/DEBCode/${DebCode}`)
    },
    create(data) {
        // console.log("data ", data)
        return this.execute('post', '/', data)
    },
    update(DACode, data) {

        return this.execute('put', `/update/${DACode}`, data)
    },
    updateStlmCycle(DACode, data){
      return this.execute('put', `/updateStlmCycle/${DACode}`, data)
    },
     updateByDebCode(DebCode, data) {

        return this.execute('put', `/update/DEBCode/${DebCode}`, data)
    },
    updateMitraLunas(DebCode, data) {

        return this.execute('put', `/ubahMitraLunas/${DebCode}`, data)
    },
    koreksiPembayaran(data) {
      return this.execute('post', `/koreksiPembayaran`, data)
    },
    delete(id) {
        return this.execute('put', `/delete/${id}`)
    },

    //PK
    belumAkad(WACode){
      return this.execute('get', `/belumAkad/${WACode}`)
    },
    ListOfPersetujuan(WACode,flag){
      return this.execute('get', `/ListOfPersetujuan/${WACode}/${flag}`)
    },
    setPerjanjianPK(id, data){
      return this.execute('put', `/perjanjianPK/${id}`, data)
    },
    ListOfPembayaranLunas(cabang){
      return this.execute('get', `/lunas/${cabang}`)
    },
    ListOfPengembalianAngsuran(Tahun,Cabang){
      return this.execute('get', `/PengembalianAngsuran/${Tahun}/${Cabang}`)
    },
    ListOfMitraLunas(data){
      return this.execute('post', `/ListOfMitraLunas`, data)
    },
    //BL
    belumAkadBL(WACode){
      return this.execute('get', `/belumAkadBL/${WACode}`)
    },
    ListOfPersetujuanBL(WACode){
      return this.execute('get', `/ListOfPersetujuanBL/${WACode}`)
    },
    setPerjanjianBL(id, data){
      return this.execute('put', `/perjanjianBL/${id}`, data)
    },

    CanOpenAccount(ChnlGroup){
      return this.execute('get', `/CanOpenAccount/${ChnlGroup}`)
    }
}
