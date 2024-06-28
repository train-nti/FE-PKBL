import Vue from 'vue'
import axios from 'axios'
import config from "../../setting"

const baseURL = `${config.url}`+`${config.port}`;
const url = baseURL+'/api/Journal'

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
      if (method != 'get') {
        console.log(req.data);
        return req.data
      }
      return req.data.Data
    })
  },
  getAll() {
    return this.execute('get', '/')
  },
  getLapJournal(data) {
    return this.execute('post', '/Lap',data)
  },
  getAllByType(type,WorkArea,dari=null,hingga=null) {
    return this.execute('get', `/ByType/${type}/${WorkArea}/${dari}/${hingga}`)
  },
  ListJournalDroppingMasuk(type,flag,WorkArea,dari=null,hingga=null) {
    return this.execute('get', `/JournalDroppingMasuk/${type}/${flag}/${WorkArea}/${dari}/${hingga}`)
  },
  insertKoreksi(Jrn_ID,TanggalKoreksi,koreksi) {
    return this.execute('post', `/Koreksi/${Jrn_ID}/${TanggalKoreksi}`,koreksi)
  },
  insertKoreksiBelumUMK(Jrn_ID,TanggalKoreksi,koreksi) {
    return this.execute('post', `/Koreksi/BelumUMK/${Jrn_ID}/${TanggalKoreksi}`,koreksi)
  },
  insertKoreksiHasilUMK(Jrn_ID,TanggalKoreksi,DACode,koreksi) {
    return this.execute('post', `/Koreksi/HasilUMK/${Jrn_ID}/${TanggalKoreksi}/${DACode}`,koreksi)
  },
  insertKoreksiAccrual(Jrn_ID,TanggalKoreksi,SpName,koreksi) {
    return this.execute('post', `/Koreksi/BelumAccrual/${Jrn_ID}/${TanggalKoreksi}/${SpName}`,koreksi)
  },
  insertKoreksiDropping(Jrn_ID,TanggalKoreksi,koreksi) {
    return this.execute('post', `/KoreksiDropping/${Jrn_ID}/${TanggalKoreksi}`,koreksi)
  },
  getUnPosting(WorkArea,StartDate,EndDate) {
    return this.execute('get', `/UnPosting/${WorkArea}/${StartDate}/${EndDate}`)
  },
  getLast() {
    return this.execute('get', '/Lastest')
  },
  getOne(id) {
    return this.execute('get', `/${id}`)
  },
  getByJrnID(id) {
    return this.execute('get', `/ID/${id}`)
  },
  getJurnalGabungan(id) {
    return this.execute('get', `/GetDetail/${id}`)
  },
  getAllMitra(){
    return this.execute('get', '/')
  },
  getByAccountGroup(GrpCode) {
    return this.execute('get', `/ByGroupCode/${GrpCode}/`)
  },
  getByAccount(Code) {
    return this.execute('get', `/ByCode/${Code}/`)
  },
  getByJournalNumber(JournalNumber) {
    return this.execute('get', `/ByJournalNumber/${JournalNumber}/`)
  },
  getByFinancialItem(AccCode) {
    return this.execute('get', `/ByFinancialItem/${AccCode}/`)
  },
  create(data) {
    return this.execute('post', '/Insert', data)
  },
  createNoCash(data) {
    return this.execute('post', '/Insert/NoCash', data)
  },
  createDropping(data) {
    return this.execute('post', '/InsertDroping', data)
  },
  createJournalCash(data) {
    return this.execute('post', 'Cash/Insert', data)
  },
  update(id, data) {
    return this.execute('put', `/Update/${id}`, data)
  },
  updatePosting(id, data) {
    return this.execute('put', `/UpdatePosting/${id}`, data)
  },
  delete(id) {
    return this.execute('put', `Delete/${id}`)
  }
}
