// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import Notifications from 'vue-notification'
import moment from '../node_modules/moment/moment';
import apiDynamic from '@/api/DynamicApiService';
import money from 'v-money'
import apiConfiq from '@/api/PK/ConfiqApiService';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import "@/assets/css/global.css"
const env = require('../config/remoteBuild')
Vue.component('v-select', vSelect)
Vue.component('date-picker', DatePicker)
// todo
// cssVars()

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.prototype.$http = axios
// Vue.use(UploadImage)


Vue.use(money, {
  precision: 4
})

Vue.mixin({
  data: function() {
  return {
    get globalEnv() {
      return env;
    }
  }
},
  methods: {
    showNotif: function(response, form) {
      if (response.Status) {
        this.$notify({
          group: 'notif-response',
          title: response.Message,
          text: form + ' Data Successfully Processed',
          type: 'success'
        });
      } else {
        this.$notify({
          group: 'notif-response',
          title: response.Message,
          text: form + ' Data Failed in Processed',
          type: 'error'
        });
      }
    },
    getUnique(arr, comp){ // function remove duplicate object from array
      const unique = arr.map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
      return unique;
    },
    getClosingDate(){
      return {
        // startDate : new Date('2014-1-10'),
        // endDate : new Date('2019-12-13')
        startDate : localStorage.getItem('StartDate') ? this.formatDate(localStorage.getItem('StartDate')) : '',
        endDate : localStorage.getItem('EndDate') ? this.formatDate(localStorage.getItem('EndDate')) : ''
      }
    },
    async getSukuBunga(){
      let data = await apiConfiq.getByCode('SUKU_BUNGA')
      return parseInt(data.Data[0].Value)
    },
    async getConfig(kode){
      let data = await apiConfiq.getByCode(kode)
      return data.Data[0].Value
    },
    IsRole(myRole){
      var role = localStorage.role
      var status = false
      role.split(",").forEach(function(value,index) {
        if (value === myRole) {
            // console.log("DATA ROLENYA :",value === myRole)
            // console.log("DATA ROLENYA value:",value)
            status = true
        }
      });
       return status;
    },
     showNotifSuccess: function() {
        this.$notify({
          group: 'notif-response',
          title: 'Operation Success',
          text: ' Data Successfully Processed',
          type: 'success'
        });
    },
    showNotifFailed: function() {
        this.$notify({
          group: 'notif-response',
          title: 'Operation Failed',
          text:  ' Data Failed in Processed',
          type: 'error'
        });
    },
    showNotifWarning: function(txt) {
        this.$notify({
          group: 'notif-response',
          title: 'Operation Failed',
          text:  txt,
          type: 'warn'
        });
    },
     sortDateTable(a, b, key) {
        let aDate = moment(a[key], 'DD/MMM/YYYY')
        let bDate = moment(b[key], 'DD/MMM/YYYY')

        if (aDate.isValid && bDate.isValid) {
          if (aDate < bDate) {
            return -1
          }
          else if (aDate > bDate) {
            return 1
          }
          else {
            return 0
          }
        }
        return null
      },
    setSession(key, item){
      return localStorage.setItem(key, item)
    },
    getSession(key){
      return localStorage.getItem(key)
    },

    CurrencyToNumber(value)
    {
        let val = value.toString().replace(/\./g,"");
        let rupiah = val.toString().replace(/,/g,'.')
        return Number(rupiah);
    },
    ConvertMinus(value)
    {
        let val = -value
        return Number(val);
    },
    async getCount(data) {
      //Contoh
      // var data = {
      //   Search : "BL.2019/KPT.",
      //   Colum: "DebCode",
      //   Table: "Debitor",
      //   Start: 13
      // }

      var url = `genereteNumber`
      var counter = 0
      var merge =''
      var date = new Date();


      const response = await apiDynamic.create(url, data)

      if (response.Data[0].Number > 0) {
        counter = response.Data[0].Number + 1
        merge = data.Search + counter
      } else {
        merge = data.Search + 1
      }

      return merge
    },

    async getCountNoRef(data) {
      var url = `genereteNumberRef`
      var counter = 0
      var merge =''
      var date = new Date();


      const response = await apiDynamic.create(url, data)

      if (response.Data[0].Number > 0) {
        counter = response.Data[0].Number + 1
        merge = data.Search + counter
      } else {
        merge = data.Search + 1
      }

      return merge
    },

    async getCountJournal(data) {
      var url = `genereteNumberJournal`
      var counter = 0
      var merge =''
      var date = new Date();


      const response = await apiDynamic.create(url, data)

      if (response.Data[0].Number > 0) {
        counter = response.Data[0].Number + 1
        merge = data.Search + counter
      } else {
        merge = data.Search + 1
      }

      return merge
    },

    downloadFile: function(data,contentType,filename) {
       try {
          var blob = new Blob([data], { type: contentType });

          //Check if user is using IE
          var ua = window.navigator.userAgent;
          var msie = ua.indexOf("MSIE ");

          if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
          {
              window.navigator.msSaveBlob(blob, filename);
          }
          else  // If another browser, return 0
          {
              //Create a url to the blob
              var url = window.URL.createObjectURL(blob);
              var linkElement = document.createElement('a');
              linkElement.setAttribute('href', url);
              linkElement.setAttribute("download", filename);

              //Force a download
              var clickEvent = new MouseEvent("click", {
                  "view": window,
                  "bubbles": true,
                  "cancelable": false
              });
              linkElement.dispatchEvent(clickEvent);
          }

      } catch (ex) {
          console.log(ex);
      }
    },
    formatDate: function(value) {
      if (value) {
        return moment(value, "YYYY-MM-DD").toDate()
      }
      return null;
    },
    formatDateDMY: function(value) {
      if (value) {
        return moment(String(value)).format('DD/MMM/YYYY')
      }
      return null;
    },
    formatDateYmdhis: function(value) {
      if (value) {
        return moment(String(value)).format('YmdHms')
      }
      return null;
    },
    formatCurrency: function(value, prefix) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        let rupiah = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return prefix == undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '');
    },
   formatRomawi: function (num) {
      if (isNaN(num))
          return NaN;
      var digits = String(+num).split(""),
          key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                 "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                 "","I","II","III","IV","V","VI","VII","VIII","IX"],
          roman = "",
          i = 3;
      while (i--)
          roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
  },
    datesCalculate: function(tenor, tgl,siklus,grace,isSliding ) { // Untuk Menghitung Tanggal Realisasi dan Jatuh Tempo
      var tglRealisasi = '',
        tglJatuhTempo = '',
        tglMulaiByr = '',
        tglTagihan = ''
      var data = []
      var lastItem = {}

      let getDate = this.perhitunganJasa(tenor, 0,0,tgl,'A',siklus,grace,isSliding)


      lastItem = getDate[getDate.length - 1]
      if (typeof(lastItem) == 'undefined') {
        lastItem.DueDate = ''
      }

      tglRealisasi = moment(String(tgl)).add(0, 'M').format('DD/MM/YYYY')
      tglJatuhTempo = lastItem.DueDate
      tglMulaiByr = getDate[0].DueDate
      tglTagihan = tglRealisasi.substring(0, 2)

      data.push({
        Realisasi: tglRealisasi,
        JatuhTempo: tglJatuhTempo,
        MulaiBayar :  tglMulaiByr,
        Tagihan: tglTagihan,
      })

      return data
    },
    flat: function(tenor, nilai, sukuBunga, tgl, dACode, siklus, grace) { // Untuk Menghitung Saldo Tetap

      var getDateNow = [];
      var angsuranPokok, angsuranBunga, totalAngsuran;
      var sisa = nilai,
        nilaiAwal = nilai;
      // var sumSisa = 0
      var nilaiBunga = Math.round(100 * nilaiAwal * sukuBunga / 100) / 100
      var flatCount = [];

      var sumAngsuran = 0,
        sumBunga = 0;

      angsuranPokok = Math.round(100 * nilaiAwal * siklus / tenor) / 100
      angsuranBunga = Math.round(100 * nilaiBunga * siklus / tenor) / 100

      for (var i = 1; i <= (tenor / siklus); i++) {
        getDateNow = moment(String(tgl)).add((i * siklus) + grace, 'M').format('YYYY-MM-DD')

        if (i == (tenor / siklus)) {
          angsuranPokok = Math.round(100 * (nilaiAwal - sumAngsuran)) / 100
          angsuranBunga = Math.round(100 * (nilaiBunga - sumBunga)) / 100
        }

        sisa = sisa - angsuranPokok

        totalAngsuran = angsuranBunga + angsuranPokok
        sumAngsuran += angsuranPokok
        sumBunga += angsuranBunga
        flatCount.push({
          Periode: getDateNow,
          DueDate: getDateNow,
          SettValue: angsuranPokok,
          InterestVal: angsuranBunga,
          TotalBill: totalAngsuran,
          sisa: Math.round(100 * sisa) / 100,
          Sequence: i,
          DACode: dACode
        })

      }
      return flatCount
    },
    slidingRate: function(tenor, pinjaman, sukuBunga, tgl, dACode, siklus, grace) { //Untuk Menghitung Saldo Turunan
      var jumlahAngsuran = tenor / siklus
    var angsuranPokok =  round2dec(  pinjaman / ( jumlahAngsuran - grace))

    var angsuranPokokBerjalan, angsuranBungaBerjalan , angsuranTotalBerjalan;
    var sumAngsuranPokok = 0, sumAngsuranBunga = 0 , sumAngsuranTotal = 0;
    var bulanBerjalan = 0;
    var sisaPokok = pinjaman;

    console.log("angsuran || sisa pokok || pokok || bunga || angsuran ")
    for(var i=1; i <= jumlahAngsuran; i++){

        //getDateNow = moment(String(tglPencairan)).add((i * siklus), 'M').format('YYYY-MM-DD')

        // perhitungan pokok
        if(i <= grace){  // skip if there is grace period
            angsuranPokokBerjalan = 0;
        } else if(i == jumlahAngsuran) { // pembulatan untuk angsuran terakhir
            angsuranPokokBerjalan =  round2dec (pinjaman - sumAngsuranPokok)
        } else {
            angsuranPokokBerjalan = angsuranPokok
        }

        // perhitungan bunga
        if(bulanBerjalan % 12== 0){

            if(isSliding) angsuranBungaBerjalan = Math.round (jasa* sisaPokok * siklus / 12 ) / 100
            else angsuranBungaBerjalan = Math.round (jasa * pinjaman * siklus / 12) / 100
        }


        angsuranTotalBerjalan = angsuranPokokBerjalan + angsuranBungaBerjalan;


        sumAngsuranPokok += angsuranPokokBerjalan
        sumAngsuranBunga += angsuranBungaBerjalan
        sumAngsuranTotal += angsuranTotalBerjalan

        bulanBerjalan += siklus
        sisaPokok -= angsuranPokokBerjalan

        console.log(i + "      || " + round2dec(sisaPokok) + " || " + angsuranPokokBerjalan +
            " ||  " + angsuranBungaBerjalan + " || " + round2dec(angsuranTotalBerjalan)  + " || " + round2dec( sumAngsuranPokok))

        slidingRate.push({
          Sequence: i,
          Periode: getDateNow,
          DueDate: getDateNow,
          sisaPokok: sisa,
          SettValue: angsuranPokok,
          InterestVal: angsuranBunga,
          TotalBill: totalAngsuran,
          DACode: dACode
        })

        // angsuran += angsuranAwal

      }

      return slidingRate
    },
    perhitunganJasa: function(tenor,pinjaman,jasa,tglPencairan,dACode,siklus,grace,isSliding ){
    console.log("Tenor || "+tenor+" nilai || "+pinjaman+" jasa || "+jasa+" tanggal || "+tglPencairan+" dacode || "+dACode+" siklus || "+siklus+
                " Grace || "+grace+" isSliding || "+isSliding);
    var jumlahAngsuran = tenor / siklus
    var angsuranPokok =  this.round2dec(  pinjaman / ( jumlahAngsuran - grace))
    console.log(angsuranPokok);

    var angsuranPokokBerjalan, angsuranBungaBerjalan , angsuranTotalBerjalan,data = [];
    var sumAngsuranPokok = 0, sumAngsuranBunga = 0 , sumAngsuranTotal = 0;
    var bulanBerjalan = 0;
    var sisaPokok = pinjaman;

    console.log("angsuran || sisa pokok || pokok || bunga || angsuran ")
    for(var i=1; i <= jumlahAngsuran; i++){

        var getDateNow = moment(String(tglPencairan)).add((i * siklus), 'M').format('YYYY-MM-DD')

        // perhitungan pokok
        if(i <= grace){  // skip if there is grace period
            angsuranPokokBerjalan = 0;
        } else if(i == jumlahAngsuran) { // pembulatan untuk angsuran terakhir
            angsuranPokokBerjalan =  this.round2dec (pinjaman - sumAngsuranPokok)
        } else {
            angsuranPokokBerjalan = angsuranPokok
        }

        // perhitungan bunga
        if(bulanBerjalan % 12== 0){

            if(isSliding == "Sliding Rate") angsuranBungaBerjalan = Math.round (jasa* sisaPokok * siklus / 12 ) / 100
            else angsuranBungaBerjalan = Math.round (jasa * pinjaman * siklus / 12) / 100
        }

        angsuranTotalBerjalan = angsuranPokokBerjalan + angsuranBungaBerjalan;

        sumAngsuranPokok += angsuranPokokBerjalan
        sumAngsuranBunga += angsuranBungaBerjalan
        sumAngsuranTotal += angsuranTotalBerjalan

        bulanBerjalan += siklus
        sisaPokok = sisaPokok - angsuranPokokBerjalan

        console.log(i + "      || " + this.round2dec(sisaPokok) + " || " + angsuranPokokBerjalan +
            " ||  " + angsuranBungaBerjalan + " || " + this.round2dec(angsuranTotalBerjalan)  + " || " + this.round2dec( sumAngsuranPokok))
        data.push({
              Sequence: i,
              Periode: getDateNow,
              DueDate: getDateNow,
              sisaPokok: this.round2dec(sisaPokok),
              SettValue: angsuranPokokBerjalan,
              sumAngsuranPokok: sumAngsuranPokok,
              InterestVal: angsuranBungaBerjalan,
              sumAngsuranBunga: sumAngsuranBunga,
              TotalBill: this.round2dec(angsuranTotalBerjalan),
              sumAngsuranTotal: this.round2dec(sumAngsuranTotal),
              DACode: dACode,
              CreatedBy: localStorage.username
            })

    }
    // jumlahAngsuran bukan bilangan bulat
    if(tenor % siklus != 0){
      var sisaBulan = tenor - bulanBerjalan;
      var getDateNow = moment(String(tglPencairan)).add((tenor), 'M').format('YYYY-MM-DD')

      angsuranPokokBerjalan =  this.round2dec (pinjaman - sumAngsuranPokok)

      // hitung ulang bunga jika akhir tahun
      if(Math.ceil(bulanBerjalan / 12) != Math.ceil(tenor / 12)  ) {
        if(isSliding == "Sliding Rate") angsuranBungaBerjalan = Math.round (jasa* sisaPokok * sisaBulan / 12 ) / 100
        else angsuranBungaBerjalan = Math.round (jasa * pinjaman * sisaBulan / 12) / 100
      } else {
        angsuranBungaBerjalan = angsuranBungaBerjalan * sisaBulan / siklus;
      }

      angsuranTotalBerjalan = angsuranPokokBerjalan + angsuranBungaBerjalan;

      sumAngsuranPokok += angsuranPokokBerjalan
      sumAngsuranBunga += angsuranBungaBerjalan
      sumAngsuranTotal += angsuranTotalBerjalan

      data.push({
        Sequence: Math.ceil( tenor / siklus),
        Periode: getDateNow,
        DueDate: getDateNow,
        sisaPokok: 0,
        SettValue: angsuranPokokBerjalan,
        sumAngsuranPokok: sumAngsuranPokok,
        InterestVal: angsuranBungaBerjalan,
        sumAngsuranBunga: sumAngsuranBunga,
        TotalBill: this.round2dec(angsuranTotalBerjalan),
        sumAngsuranTotal: this.round2dec(sumAngsuranTotal),
        DACode: dACode,
        CreatedBy: localStorage.username
      })
    }

    console.log(this.round2dec(sumAngsuranPokok) + "  || " + this.round2dec(sumAngsuranBunga) + " || " + this.round2dec( sumAngsuranTotal))
    return data
  },
  round2dec: function(num){
    return Math.round(num * 100) / 100;
  }

  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    'App': App
  }
})
