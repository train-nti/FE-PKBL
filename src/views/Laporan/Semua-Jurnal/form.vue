<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Laporan Detail Jurnal </strong>
          </div>
          <b-row>
            <b-col sm="12">
              <div class="form-group form-actions">
                  <!-- <form> -->
                    <div class="row">
                      <div class="col">
                        <label for="inputEmail4">Mulai Tanggal</label>
                        <date-picker v-model="cari.Mulai" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                        <!-- <input type="date" v-model="cari.Mulai"  class="form-control" placeholder=""> -->
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Sampai Tanggal</label>
                        <date-picker v-model="cari.Sampai" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                        <!-- <input type="date" v-model="cari.Sampai" class="form-control" placeholder=""> -->
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Pilih Cabang</label>
                        <b-form-select v-model="cari.Cabang" :options="options_cabang"></b-form-select>
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Posting Jurnal</label>
                        <b-form-select placeholder="Jurnal"  v-model="cari.Posting"  :options="options_posting" ></b-form-select>
                      </div>
                     <!--  <div class="col">
                        <label for="inputEmail4">Sumber Dana</label>
                        <v-select placeholder="Dana"  :options="options" />
                      </div> -->
                      <div class="col" style="padding-top: 27px;">
                        <button class="btn btn-primary" v-on:click="cariJurnal()" >Cari</button>&nbsp;
                        <button class="btn btn-primary"  v-on:click="bersihJurnal()">Bersihkan Filter</button>
                      </div>
                    </div>
                  <!-- </form> -->
              </div><hr>

            </b-col>
            <b-col sm="12">
               <KadekTable :items="items" :BtmRowitems="itemsTotal" :settingExcel="setExcel" :fields="fields" :striped="true" :itemsExcel="itemsExcel" :headerExcel="headerExcel" sheetName="Laporan Semua Jurnal" filename="Laporan Semua Jurnal"></KadekTable>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
  import moment from 'moment';
import cTable from '@/views/base/Table.vue'
import KadekTable from '@/components/Tables.vue'
import apiAccountCategory from '@/api/AK/AccountCategoryApiService'
import apiAccount from '@/api/AKAccountApiService';
import apiJournal from '@/api/AKJournalApiService';
import apiWorkArea1 from '@/api/WorkArea1ApiService'

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable, KadekTable},
  data () { 
    return { 
      cabangKP : 9900,
      cari:{
        Mulai:null,
        Sampai:null,
        Cabang:null,
        Posting:null
      },
      itemsTotal:[],
      items: [],
      itemsArray: null,
      itemsExcel:[],
      setExcel : [
        {
          Cell : ['A','B','C','D','E','F','G','H']
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
          ]
        }
      ],
      headerExcel:["No","No. Bukti","Tanggal","Kode Akun","Nama Akun","Keterangan","Debit","Kredit"],
      fields: [
        {key: 'no', label: 'No'},
        {key: 'JournalNumber', label: 'No. Bukti', sortable: true},
        {key: 'JournalDate', label: 'Tanggal', sortable: true},
        {key: 'AccountCode', label: 'Kode Akun', sortable: true},
        {key: 'Name', label: 'Nama Akun', sortable: true},
        {key: 'Description', label: 'Keterangan', sortable: true},
        {key: 'Debit', label: 'Debit',tdClass: 'positionRight' },
        {key: 'Credit', label: 'Kredit',tdClass: 'positionRight'},
        // {key: 'action', label: 'Aksi'},
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
      financialItem:{Account:[],Category:{}},
      options:[],
      options_cabang:[],
      options_posting:[
        {
          text:"--- Semua ---",
          value:null
        },
        {
          text:"Sudah Posting",
          value:"Sudah"
        },
        {
          text:"Belum Posting",
          value:"Belum"
        },
      ],
      cabang:null,
      optionsPosition:['1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010'],
      optionsPositions:['Sumbagsel','SUMBU','SUMBS','JBB','BALNUS','KALIM','MALPA','SULWS','','JBTT','JKK'],
    }
  },
  async created() {
    this.cabang = localStorage.cabang
   if(this.cabang == this.cabangKP){
      this.cari.Cabang = null
    }else{
      this.cari.Cabang = this.cabang
    }
    this.getCabang()
    // this.getAll()
  },
  methods: {
      async getAll() {
        this.loading = true

        var Journal = await apiJournal.getLapJournal(this.cari)
        console.log("DATA Journal",Journal)
        var counter = 1
        this.items = []
        this.itemsTotal = []
        var totalDebit = 0,totalCredit = 0
        this.itemsExcel = []
        for (var i = 0; i < Journal.Data.length; i++) {
          var LoopJournal = Journal.Data[i]
          // for (var o = 0; o < LoopJournal.JournalItem.length; o++) {
            // var LoopJournalItem = LoopJournal.JournalItem[o]
            // var LoopAccount = await apiAccount.getOne(LoopJournalItem.AccountCode.replace(/ /g,''))
            // console.log("LoopJournal", LoopJournal);
            // LoopJournalItem.no = LoopJournal.no
            if(LoopJournal.Name){
              LoopJournal.Name = LoopJournal.Name
            }
            LoopJournal.JournalNumber = LoopJournal.JournalNumber
            LoopJournal.Description = LoopJournal.Description
            LoopJournal.JournalDate = this.formatDateDMY(LoopJournal.JournalDate)
            if(Journal.Data[i - 1]){
              if(Journal.Data[i - 1].Jrn_ID !=  LoopJournal.Jrn_ID){
                LoopJournal.no = counter++
              }
            }else{
                LoopJournal.no = counter++
            }

            if (LoopJournal.IsDebet != true) {
              LoopJournal.Credit = this.formatCurrency(LoopJournal.ItemValue)
              totalCredit += LoopJournal.ItemValue
              LoopJournal.Debit = "0"
               this.itemsExcel.push({
                  no : LoopJournal.no,
                  JournalNumber : LoopJournal.JournalNumber,
                  JournalDate : LoopJournal.JournalDate,
                  AccountCode : LoopJournal.AccountCode,
                  Name : LoopJournal.Name,
                  Description : LoopJournal.Description,
                  Debit : this.CurrencyToNumber(LoopJournal.Debit),
                  Credit : this.CurrencyToNumber(LoopJournal.Credit)
                })
              this.items.push(LoopJournal)
            }else{
              LoopJournal.Debit = this.formatCurrency(LoopJournal.ItemValue)
              totalDebit += LoopJournal.ItemValue
                LoopJournal.Credit = "0"
                 this.itemsExcel.push({
                  no : LoopJournal.no,
                  JournalNumber : LoopJournal.JournalNumber,
                  JournalDate : LoopJournal.JournalDate,
                  AccountCode : LoopJournal.AccountCode,
                  Name : LoopJournal.Name,
                  Description : LoopJournal.Description,
                  Debit : this.CurrencyToNumber(LoopJournal.Debit),
                  Credit : this.CurrencyToNumber(LoopJournal.Credit)
                })
              this.items.push(LoopJournal)
            }
        }
        this.itemsTotal.push({
            cols : 6,
            value : "Total Keseluruhan"
          },
          {
            cols : 0,
            value : this.formatCurrency(totalDebit)
          },
          {
            cols : 0,
            value : this.formatCurrency(totalCredit)
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
            name : 'Laporan Detail Jurnal'
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
            no : "Total Keseluruhan",
            JournalNumber : "",
            JournalDate : "",
            AccountCode : "",
            Name : "",
            Description : "",
            Debit : totalDebit,
            Credit : totalCredit
          })
        // this.items.push({
        //   JournalNumber : "Total",
        //   Debit : this.formatCurrency(totalDebit),
        //   Credit : this.formatCurrency(totalCredit)
        // })
      },
      async cariJurnal(){
        this.getAll()
      },
      async bersihJurnal(){
        this.cari.Mulai = null
        this.cari.Sampai = null
        if(this.cabang == this.cabangKP){
          this.cari.Cabang = null
        }else{
          this.cari.Cabang = this.cabang
        }
        this.cari.Posting = null
          this.items = []
          this.itemsExcel = []
        // this.getAll()
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
.number{
  text-align: right;
}
.positionRight {
  text-align:right;
}
</style>
