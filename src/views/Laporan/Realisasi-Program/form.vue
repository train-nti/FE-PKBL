<style type="text/css">
  tr th{
      /*width:1%;*/
      white-space:nowrap;
  }
</style>
<template>
  <div class="animated fadeIn">
     <b-row v-if="loading">
            <b-col sm="12">
                <b-card>
                     <b-spinner label="Spinning"></b-spinner>
                     Loading
                </b-card>
              </b-col>
        </b-row>
    <b-row v-if="!loading">
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Laporan Realisasi Program Kemitraan</strong>
          </div>
          <div class="form-group form-actions">
                  <!-- <form> -->
                    <div class="row">
                       <div class="col">
                        <label for="inputEmail4">Mulai</label>
                        <date-picker v-model="cari.Mulai" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                        <!-- <input type="date"  v-model="cari.Mulai" class="form-control" placeholder=""> -->
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Sampai</label>
                         <date-picker v-model="cari.Sampai" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                        <!-- <input type="date" v-model="cari.Sampai" class="form-control" placeholder=""> -->
                      </div>
                     <!--  <div class="col">
                        <label for="inputEmail4">Tahun</label>
                        <b-form-select  v-model="cari.Year" :options="options_Year"></b-form-select> -->
                        <!-- <v-select placeholder="Pilih Tahun" :options="options"/> -->
                      <!-- </div> -->
                      <!-- <div class="col">
                        <label for="inputEmail4">Bulan</label>
                        <b-form-select  v-model="cari.Month" :options="options_Month"></b-form-select> -->
                        <!-- <v-select placeholder="Pilih Bulan" :options="options"/> -->
                      <!-- </div> -->
                      <div class="col">
                        <label for="inputEmail4">Cabang</label>
                        <b-form-select v-model="cari.Cabang" :options="options_cabang"></b-form-select>
                      </div>
                      <!-- <div class="col" >
                        <label for="inputEmail4">Posting Jurnal</label>
                        <v-select placeholder="--SEMUA--" :options="options"/>
                      </div> -->
                      <!-- <div class="col" >
                        <label for="inputEmail4">Sumber Dana</label>
                        <v-select placeholder="--SEMUA--" :options="options"/>
                      </div> -->
                      <div class="col" style="padding-top: 27px;">
                        <button class="btn btn-primary" v-on:click="cariRealisasi()">Filter</button>&nbsp;
                        <button class="btn btn-primary" v-on:click="bersihRealisasi()">Bersihkan Filter</button>
                      </div>
                    </div>
                  <!-- </form> -->
              </div><hr>
          <b-row>
            <b-col sm="12">
               <KadekTable :items="items" :BtmRowitems="itemsTotal" :settingExcel="setExcel" :fields="fields" :striped="true" :itemsExcel="itemsExcel" :headerExcel="headerExcel" sheetName="Laporan Realisasi PK" filename="Laporan Realisasi PK"></KadekTable>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import moment from 'moment';
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import KadekTable from '@/components/Tables.vue'
import apiDebitAccount from '@/api/PK/DebitAccountApiService'
import apiDebitor from '@/api/PK/DebitorApiService';
import apiDebTransaction from '@/api/PK/DebTransactionApiService'
import apiDebVenture from '@/api/PK/DebitorVentureApiService'
import apiPKSurvey from '@/api/PK/PKSurveyApiService'
import apiPKSektor from '@/api/PK/PKSectorApiService'
import apiWorkArea1 from '@/api/WorkArea1ApiService'

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable, KadekTable},
  data () {
    return {
      cabangKP : 9900,
      loading:false,
      cari:{
        Year:null,
        Month:null,
        Cabang:null,
        flag:1
      },
      setExcel : [
        {
          Cell : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O']
        },
        {
          titles : []
        },
        {
          mergeTo : "N"
        },
        {
          origin : "A5"
        },
        {
          position : [
            {
              colums : 1,
              left : true
            },
            {
              colums : 2,
              left : true
            },
            {
              colums : 3,
              left : true
            },
            {
              colums : 4,
              left : true
            },
            {
              colums : 5,
              left : true
            },
            {
              colums : 6,
              left : true
            },
            {
              colums : 7,
              left : true
            },
            {
              colums : 8,
              left : true
            },
            {
              colums : 9,
              left : true
            },
            {
              colums : 10,
              left : true
            },
            {
              colums : 11,
              left : true
            },
            {
              colums : 12,
              left : true
            },
            {
              colums : 13,
              left : true
            },
            {
              colums : 14,
              left : true
            }
          ]
        }
      ],
      itemsTotal: [],
      items: [],
      itemsExcel:[],
      itemsArray: null,
      headerExcel:["No","No. Mitra","Nama Mitra Binaan","Nama Usaha","Alamat Tempat Tinggal","Kota/Kabupaten","Provinsi","Region","Tanggal Lahir","Gender","Pola Penyaluran","JSU" ,"Tanggal Realisasi","Tanggal Jatuh Tempo","Nilai Realisasi"],
      fields: [
        {label: 'No', key: 'No'},
        {label: 'No. Mitra', key: 'DANumber'},
        {label: 'Nama Mitra Binaan',key: 'FullName', sortable: true},
        {label: 'Nama Usaha',key: 'BusinessName', sortable: true},
        {label: 'Alamat Tempat Tinggal', key : 'Address', sortable: true},
        {label: 'Kota/Kabupaten',key: 'Dist_code', sortable: true},
        {label: 'Provinsi',key: 'Prov_code', sortable: true},
        {label: 'Region',key: 'WACode', sortable: true},
        {label: 'Tanggal Lahir', key: 'DateofBirth', sortable: true},
        {label: 'Gender', key: 'Gender', sortable: true},
        {label: 'Pola Penyaluran', key:'DistributionPattern', sortable: true},
        {label: 'JSU', key:'SectorName', sortable: true},
        {label: 'Bidang Usaha', key: 'SectorName', sortable: true},
        {label: 'Tanggal Realisasi', key: 'TransDate', sortable: true},
        {label: 'Tanggal Jatuh Tempo', key:'FinalDueDate'},
        {label: 'Nilai Realisasi', key:'TransValue', sortable: true, tdClass: 'positionRight'},
      ],

      itemsModal: [],
      itemsArrayModal: null,
      fieldsModal: [
        {label: 'No',key: 'Nama', sortable: true},
        {key: 'No Permohoman'},
        {key: 'Tgl MoU'},
        {key: 'Nama Instansi'},
        {key: 'Nama Pemohon'},
        {key: 'Nilai Penyaluran'},
        {key:'Aksi'}
      ],
      cabang:null,
      financialItem:{Account:[],Category:{}},
      options:[],
      options_Month:[],
      options_Year:[],
      options_cabang:[],
      optionsPosition:['1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010'],
      optionsPositions:['Sumbagsel','SUMBU','SUMBS','JBB','BALNUS','KALIM','MALPA','SULWS','','JBTT','JKK'],
    }
  },
  async created() {
    this.loading = true
    this.cabang = localStorage.cabang
    if(this.cabang == this.cabangKP){
      this.cari.Cabang = null
    }else{
      this.cari.Cabang = this.cabang
    }
    this.getYear()
    this.getMonth()
    this.getCabang()
    // this.getAll()
    this.loading = false
  },
  methods: {
      async getAll() {

          var DA = await apiDebitAccount.getAllByDebt(this.cari)
          console.log("DebitAkun", DA)
          this.items = []
          this.itemsExcel = []
          this.itemsTotal = []
          var total = 0

          for (var i = 0; i < DA.Data.length; i++) {
            var LoopDebitAcount = DA.Data[i]
            total += DA.Data[i].TransValue
            if(DA.Data[i].ContractDate){
              LoopDebitAcount.ContractDate = this.formatDate(DA.Data[i].ContractDate)
            }
             var Alamat = ""
              var Provinsi = ""
              var Kabupaten = ""
              var Kecamatan = ""
              var Kelurahan = ""
              if(LoopDebitAcount.Address){
                Alamat = LoopDebitAcount.Address
              }
              if(LoopDebitAcount.Prov_code){
                Provinsi = LoopDebitAcount.Prov_code
              }
              if(LoopDebitAcount.Dist_code){
                Kabupaten = LoopDebitAcount.Dist_code
              }
              if(LoopDebitAcount.Subdis_code){
                Kecamatan = LoopDebitAcount.Subdis_code
              }
              if(LoopDebitAcount.Village_code){
                Kelurahan = LoopDebitAcount.Village_code
              }
              LoopDebitAcount.No = i+1
              LoopDebitAcount.Address = Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi
            if (DA.Data[i].Gender) {
              LoopDebitAcount.Gender = "Pria"
             }else{
              LoopDebitAcount.Gender = "Wanita"
             }

              if (DA.Data[i].FinalDueDate ) {
                LoopDebitAcount.FinalDueDate = this.formatDateDMY(DA.Data[i].FinalDueDate)
              }

            if(DA.Data[i].DateofBirth){
              LoopDebitAcount.DateofBirth = this.formatDateDMY(DA.Data[i].DateofBirth)
            }
              if(DA.Data[i].TransDate){
                LoopDebitAcount.TransDate = this.formatDateDMY(DA.Data[i].TransDate)
              }
            if(DA.Data[i].TransValue){
              if( DA.Data[i].IsRevert == 2){
                  LoopDebitAcount.TransValue = this.formatCurrency(this.ConvertMinus(DA.Data[i].TransValue))
               }else{
                  LoopDebitAcount.TransValue = this.formatCurrency(DA.Data[i].TransValue)
               }
              // LoopDebitAcount.TransValue = this.formatCurrency(DA.Data[i].TransValue)
            }

            LoopDebitAcount.WACode = DA.Data[i].WAName

              this.itemsExcel.push({
                No : LoopDebitAcount.No,
                DANumber : LoopDebitAcount.DANumber,
                FullName : LoopDebitAcount.FullName,
                BusinessName : LoopDebitAcount.BusinessName,
                Address : Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi ,
                Dist_code : LoopDebitAcount.Dist_code,
                Prov_code : LoopDebitAcount.Prov_code,
                WACode : LoopDebitAcount.WACode,
                DateofBirth : LoopDebitAcount.DateofBirth,
                Gender : LoopDebitAcount.Gender,
                ContractDate : LoopDebitAcount.DistributionPattern,
                SectorName : LoopDebitAcount.SectorName,
                TransDate : LoopDebitAcount.TransDate,
                FinalDueDate : LoopDebitAcount.FinalDueDate,
                TransValue : this.CurrencyToNumber(LoopDebitAcount.TransValue)
              })
              this.items.push(LoopDebitAcount)

          }
          this.itemsTotal.push({
            cols : 14,
            value : "Total Keseluruhan"
          },
          {
            cols : 0,
            value : this.formatCurrency(total)
          })

          var workarea = await apiWorkArea1.getByCode(this.cari.Cabang)
          var WAName = "Semua"
          if(workarea[0]){
            if(workarea[0].Name){
              WAName = workarea[0].Name
            }
          }
          this.setExcel[1].titles = []
          this.setExcel[1].titles.push(
          {
            cels : 'A1',
            name : 'Laporan Realisasi Program Kemitraan'
          },
          {
            cels : 'A2',
            name : 'Region ' + WAName
          },
          {
            cels : 'A3',
            name : "Periode "+ this.formatDateDMY(this.cari.Mulai) + " sampai " + this.formatDateDMY(this.cari.Sampai),
          },
          )
           this.itemsExcel.push({
                No : "Total Keseluruhan",
                DANumber : "",
                FullName : "",
                BusinessName : "",
                Address : "" ,
                Dist_code : "",
                Prov_code : "",
                WACode : "",
                DateofBirth : "",
                Gender : "",
                ContractDate : "",
                SectorName : "",
                TransDate : "",
                FinalDueDate : "",
                TransValue : total
              })
      },
      async cariRealisasi(){
        this.loading = true
        this.getAll()
        this.loading = false
      },
      async bersihRealisasi(){
        this.loading = true
        this.cari.Year = null
        this.cari.Month = null
        if(this.cabang == this.cabangKP){
          this.cari.Cabang = null
        }else{
          this.cari.Cabang = this.cabang
        }
        this.cari.flag = 1
          this.items = []
          this.itemsExcel = []
        // this.getAll()
        this.loading = false
      },
      async saveFinancial(){
        try {
          this.financialItem.Account = []
          if (this.financialItem.AccountItem != null) {

            for (var i = 0; i < this.financialItem.AccountItem.length; i++) {
              this.financialItem.Account.push({Code : this.financialItem.AccountItem[i].value})
            }

          }
          apiAccountCategory.create(this.financialItem)
          console.log(this.financialItem);
        }
        finally {

        }
      },
      deleteItem: async function(id) {
        if (confirm('Are you sure you want to delete this record?')) {
          console.log(id);
          // await api.delete(DocCode)
          // await this.getAll()
        }
      },
      async showModal() {
        this.$root.$emit('bv::show::modal','modal-financial', '#btnShow')
      },
      getYear(){
        this.options_Year = [{text:"--- Semua ---",value:null}]
        for (var i = new Date().getFullYear(); i >= 1990; i--) {
          this.options_Year.push(i)
        }
      },
    getMonth(){
      this.options_Month = [{text:"--- Semua ---",value:null}]
      var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
      for (var i = 0; i < bulan.length; i++) {
      console.log(i+1)
        this.options_Month.push({text: bulan[i],value:i+1})
      }
    },
    async getCabang(){
      var workarea = null
      if(this.cabang != this.cabangKP){
       workarea = await apiWorkArea1.getByCode(this.cabang)
       console.log("CABANG",workarea)
       this.options_cabang = [{text: workarea[0].Name,value:workarea[0].Code}]
       // this.options_cabang.push({text: workarea[0].Name,value:workarea[0].Code})
      }else{
        var workarea = await apiWorkArea1.getComboBoxAll()
        this.options_cabang = [{text:"--- Semua ---",value:null}]
        for (var i = 0; i < workarea.length; i++) {
          var data =  workarea[i]
          this.options_cabang.push({text: data.Name,value:data.Code})
        }
      }
      console.log("cabang",workarea)
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.positionRight {
  text-align:right;
}
</style>
