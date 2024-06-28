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
            <strong>Laporan Realisasi Bina Lingkungan</strong>
          </div>
          <b-row>
            <b-col sm="12">
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
                      <div class="col">
                        <label for="inputEmail4">Cabang</label>
                        <b-form-select v-model="cari.Cabang" :options="options_cabang"></b-form-select>
                      </div>
                     <!--  <div class="col">
                        <label for="inputEmail4">wilayah</label>
                        <v-select placeholder="--SEMUA--"  :options="options" />
                      </div> -->
                      <div class="col" style="padding-top: 27px;">
                        <button class="btn btn-primary"  v-on:click="cariRealisasi()">Filter</button>
                        <button class="btn btn-primary"  v-on:click="bersihRealisasi()">Bersihkan Filter</button>
                      </div>
                    </div>
                  <!-- </form> -->
              </div><hr>
            </b-col>
            <b-col sm="12">
              <!-- <c-table :table-data="items" :fields="fields" caption="" custom="newSlot" routeName="Form Document Desaigner">
              </c-table> -->
              <KadekTable :items="items" :BtmRowitems="itemsTotal" :settingExcel="setExcel"  :fields="fields" :striped="true" :itemsExcel="itemsExcel" :headerExcel="headerExcel" sheetName="Laporan Realisasi BL" filename="Laporan Realisasi BL">
              </KadekTable>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {
    shuffleArray
  } from '@/shared/utils'
  import moment from 'moment';
  import cTable from '@/views/base/Table.vue'
  import KadekTable from '@/components/Tables.vue'
  import apiDebitAccount from '@/api/PK/DebitAccountApiService'
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiDebTransaction from '@/api/PK/DebTransactionApiService'
  import apiWorkArea1 from '@/api/WorkArea1ApiService'

  // const someData = () => await api.getAll()

  export default {
    name: 'DocumentDesaigner',
    components: {
      cTable, KadekTable
    },
    data() {
    return {
      cabangKP : 9900,
      loading:false,
        cari:{
          Mulai:null,
          Sampai:null,
          Cabang:null,
          flag:0
        },
        setExcel : [
          {
            Cell : ['A','B','C','D','E','F','G','H','I','J','K']
          },
          {
            titles : []
          },
          {
            mergeTo : "F"
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
            ]
          }
        ],
        itemsTotal:[],
        items: [],
        itemsArray: null,
        headerExcel : ["No",'No. Bukti','Keterangan','JBL','Tanggal Penyaluran','Instansi','Nilai Penyaluran','Referensi','Provinsi','Kota/Kabupaten','Region'], // array
        itemsExcel : [],
        fields: [
          {key: 'No', label: 'No', sortable: true},
          {key: 'JournalNumber', label: 'No. Bukti', sortable: true},
          {key: 'Description', label: 'Keterangan', sortable: true},
          {key: 'BLType', label: 'JBL', sortable: true},
          {key: 'TransDate', label: 'Tanggal Penyaluran', sortable: true},
          {key: 'Instance', label: 'Instansi', sortable: true},
          {key: 'TransValue', label: 'Nilai Penyaluran', sortable: true, tdClass: 'positionRight'},
          {key: 'Reference', label: 'Referensi', sortable: true},
          {key: 'Prov_code', label: 'Provinsi', sortable: true},
          {key: 'Dist_code', label: 'Kota/Kabupaten', sortable: true},
          {key: 'WACode', label: 'Region', sortable: true},
        ],

        itemsModal: [],
        itemsArrayModal: null,
        fieldsModal: [{
            label: 'No',
            key: 'Nama',
            sortable: true
          },
          {
            key: 'No Permohoman'
          },
          {
            key: 'Tgl MoU'
          },
          {
            key: 'Nama Instansi'
          },
          {
            key: 'Nama Pemohon'
          },
          {
            key: 'Nilai Penyaluran'
          },
          {
            key: 'Aksi'
          }
        ],
        financialItem: {
          Account: [],
          Category: {}
        },
        cabang:null,
        options: [],
        options_cabang:[],
        options_Month:[],
        options_Year:[],
        optionsPosition: ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
        optionsPositions: ['Sumbagsel', 'SUMBU', 'SUMBS', 'JBB', 'BALNUS', 'KALIM', 'MALPA', 'SULWS', '', 'JBTT', 'JKK'],
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
      this. getCabang()
      // this.getAll()
    this.loading = false
    },
    methods: {
      async getAll() {
          this.cari.Mulai = this.cari.Mulai == null ? '1971-01-01' : this.cari.Mulai
          this.cari.Sampai = this.cari.Sampai == null ? '2100-12-31' : this.cari.Sampai
          var DA = await apiDebitAccount.getAllByDebt(this.cari)
          console.log("DebitAkun", DA)
          this.items = []
          this.itemsExcel = []
          this.itemsTotal = []
          var total = 0
          for (var i = 0; i < DA.Data.length; i++) {
            var LoopDebitAcount = DA.Data[i]
          LoopDebitAcount.No = i+1
          LoopDebitAcount.WACode = DA.Data[i].WAName
          if(DA.Data[i].TransDate){
           LoopDebitAcount.TransDate = this.formatDateDMY(DA.Data[i].TransDate)
          }
          if(DA.Data[i].TransValue){
            if( DA.Data[i].IsRevert == 2){
                LoopDebitAcount.TransValueNum = this.ConvertMinus(DA.Data[i].TransValue)
                LoopDebitAcount.TransValue = this.formatCurrency(this.ConvertMinus(DA.Data[i].TransValue))
             }else{
                 LoopDebitAcount.TransValueNum = DA.Data[i].TransValue
                LoopDebitAcount.TransValue = this.formatCurrency(DA.Data[i].TransValue)
             }
            // LoopDebitAcount.TransValueNum = DA.Data[i].TransValue
            // LoopDebitAcount.TransValue = this.formatCurrency(DA.Data[i].TransValue)
          }
          // console.log(i)
          this.itemsExcel.push({
            No : LoopDebitAcount.No,
            JournalNumber : LoopDebitAcount.JournalNumber,
            Description : LoopDebitAcount.Description,
            BLType : LoopDebitAcount.BLType,
            TransDate : LoopDebitAcount.TransDate,
            Instance : LoopDebitAcount.Instance,
            TransValue : LoopDebitAcount.TransValueNum,
            Reference : LoopDebitAcount.Reference,
            Prov_code : LoopDebitAcount.Prov_code,
            Dist_code : LoopDebitAcount.Dist_code,
            WACode : LoopDebitAcount.WACode
          })
          total += LoopDebitAcount.TransValueNum
          this.items.push(LoopDebitAcount)


        }

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
          name : "Laporan Realisasi Bina Lingkungan"
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
            JournalNumber : "",
            Description : "",
            BLType : "",
            TransDate : "",
            Instance : "",
            TransValue : total,
            Reference : "",
            Prov_code : "",
            Dist_code : "",
            WACode : ""
          })
          this.itemsTotal.push({
            cols : 6,
            value : "Total Keseluruhan"
          },
          {
            cols : 5,
            value : this.formatCurrency(total)
          })
          // this.itemsArray = () => this.items
          console.log("data",this.items)

      },
       async cariRealisasi(){
        this.loading = true
        this.getAll()
        this.loading = false
      },
      async bersihRealisasi(){
        this.loading = true
        this.cari.Mulai = null
        this.cari.Sampai = null
        if(this.cabang == this.cabangKP){
          this.cari.Cabang = null
        }else{
          this.cari.Cabang = this.cabang
        }
        this.cari.flag = 0
        this.getAll()
          this.items = []
          this.itemsExcel = []
        this.loading = false
      },
      async saveFinancial() {
        try {
          this.financialItem.Account = []
          if (this.financialItem.AccountItem != null) {

            for (var i = 0; i < this.financialItem.AccountItem.length; i++) {
              this.financialItem.Account.push({
                Code: this.financialItem.AccountItem[i].value
              })
            }

          }
          apiAccountCategory.create(this.financialItem)
          console.log(this.financialItem);
        } finally {

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
        this.$root.$emit('bv::show::modal', 'modal-financial', '#btnShow')
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
