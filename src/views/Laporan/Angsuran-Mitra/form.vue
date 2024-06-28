<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Laporan Angsuran Mitra Per Bulan</strong>
          </div>
          <div class="form-group form-actions">
            <!-- <form> -->
              <div class="row">
                <div class="col">
                  <label for="inputEmail4">Mulai Tanggal</label>
                   <date-picker v-model="sortir.Mulai" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                  <!-- <input type="date" v-model="sortir.Mulai" class="form-control" placeholder=""> -->
                </div>
                <div class="col">
                  <label for="inputEmail4">Sampai Tanggal</label>
                   <date-picker v-model="sortir.Sampai" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                  <!-- <input type="date" v-model="sortir.Sampai" class="form-control" placeholder=""> -->
                </div>
                <div class="col">
                  <label for="inputEmail4">Cabang</label>
                  <b-form-select v-model="sortir.Cabang" :options="options_cabang"></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Bermasalah</label>
                   <b-form-select v-model="sortir.Bermasalah" :options="options_bermasalah"></b-form-select>
                </div>
               <!--  <div class="col">
                  <label for="inputEmail4">Jenis Jurnal</label>
                  <b-form-select v-model="sortir.JenisJurnal" :options="options_jenis_jurnal"></b-form-select>
                </div> -->
                <!-- <div class="col" style="padding-top: 27px;">
                  <label for="inputEmail4">Sumber Dana</label>
                  <v-select placeholder="-- Sumber --"  />
                </div> -->
                <div class="col" style="padding-top: 27px;">
                  <button class="btn btn-primary" v-on:click="cariAngsuran()">Cari</button>&nbsp;
                  <button class="btn btn-primary" v-on:click="bersihAngsuran()">Bersihkan Filter</button>
                </div>
              </div>
            <!-- </form> -->
          </div><hr>
          <b-row>
            <b-col sm="12">
                <KadekTable :items="items" :BtmRowitems="itemsTotal" :settingExcel="setExcel" :fields="fields" :striped="true" :itemsExcel="itemsExcel" :headerExcel="headerExcel" sheetName="Laporan Angsuran Mitra" filename="Laporan Angsuran Mitra"></KadekTable>
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
  import apiDebTransaction from '@/api/PK/DebTransactionApiService'
  import apiDebitAccount from '@/api/PK/DebitAccountApiService'
  import apiDebitor from '@/api/PK/DebitorApiService'
  import apiAccount from '@/api/AKAccountApiService'
  import apiWorkArea1 from '@/api/WorkArea1ApiService'

  // const someData = () => await api.getAll()

  export default {
    name: 'DocumentDesaigner',
    components: {
      cTable,
      KadekTable
    },
    data() { 
      return { 
        totalLoan: 0,
        totalInterest: 0,
        totalAdvPayment: 0,
        total : 0,
        itemsTotal:[],
        items: [],
        itemsExcel:[],
        setExcel : [
          {
            Cell : ['A','B','C','D','E','F','G','H','I','J','K','L']
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
                colums : 11,
                left : true
              },
              {
                colums : 12,
                left : true
              },
            ]
          }
        ],
        headerExcel:["No","No. Mitra","Nama Usaha","No. Bukti","Catatan","Tgl Bayar","Nilai Pokok","Nilai Jasa","Kelebihan Bayar","Total","Mitra Bermasalah","Ket"],
        itemsArray: null,
        sortir:{
          Mulai:null,
          Sampai:null,
          Bermasalah:null,
          JenisJurnal:null,
          Cabang:null
        },
        options_cabang:[],
        options_bermasalah:[
        {
          text:'--- Semua ---',
          value:null
        },
        {
          text:'Bermasalah',
          value:'Ya'
        },
        {
          text:'Tidak Bermasalah',
          value:'Tidak'
        }],
        options_jenis_jurnal:[
        {
          text:'--- Semua ---',
          value:null
        },
        {
          text:'Aktivitas',
          value:'Aktivitas'
        },
        {
          text:'Kas/Bank',
          value:'Kas'
        }],
        fields: [{
            label: 'No',
            key: 'No',
            sortable: true
          },
          {
            label: 'No. Mitra',
            key: 'DANumber',
            sortable: true
          },
          {
            label: 'Nama Usaha',
            key: 'Reference',
            sortable: true
          },
          {
            label: 'No. Bukti',
            key: 'TransNo',
            sortable: true
          },
          {
            label: 'Catatan',
            key: 'Description'
          },
          {
            label: 'Tgl Bayar',
            key: 'TransDate',
            sortable: true,
            tdClass: 'positionRight'
          },
          {
            label: 'Nilai Pokok',
            key: 'Loan',
            tdClass: 'positionRight'
          },
          {
            label: 'Nilai Jasa',
            key: 'Interest',
            tdClass: 'positionRight'
          },
          {
            label: 'Kelebihan Bayar',
            key: 'AdvPayment',
            tdClass: 'positionRight'
          },
          {
            label: 'Total',
            key: 'Total',
            tdClass: 'positionRight'
          },
          {
            label: 'Mitra Bermasalah',
            key: 'Status',
            sortable: true
          },
          {
            key: 'Ket.',
            key: 'Ket'
          }
        ],
      }
    },
    async created() {
      this.cabang = localStorage.cabang
      if(this.cabang == 9900){
          this.sortir.Cabang = null
        }else{
          this.sortir.Cabang = this.cabang
        }
      // var date = new Date(), y = date.getFullYear(), m = date.getMonth();
      // var firstDay = new Date(y, m, 1);
      // this.sortir.Mulai = this.formatDate(firstDay)
      // console.log("Tanggal",firstDay)
      // this.sortir.Sampai = this.formatDate(new Date())
      this.getCabang()
      // this.getAll()
    },
    methods: {
      async getAll() {
        this.loading = true
          this.items = []
          this.itemsExcel = []
          this.itemsTotal = []

        try {
          var dataTable = await apiDebTransaction.getAllDeb(this.sortir)
          var totalLoan = 0,totalInterest = 0,totalAdvPayment = 0,total = 0
          for (var i = 0; i < dataTable.Data.length; i++) {
                dataTable.Data[i].No = i + 1
                dataTable.Data[i].TransDate = this.formatDateDMY(dataTable.Data[i].TransDate)
                if (dataTable.Data[i].Reference) {
                  dataTable.Data[i].Reference =  dataTable.Data[i].Reference
                }else{
                   dataTable.Data[i].Reference =  dataTable.Data[i].FullName
                }
                var KetJurnal = dataTable.Data[i].JournalTypeId
                if(KetJurnal != 1 && KetJurnal != 6 && KetJurnal != 7 && KetJurnal != 8){
                    dataTable.Data[i].Ket = "Aktivitas"
                }else{
                   dataTable.Data[i].Ket = "Kas/Bank"
                }
                var JNStatus = dataTable.Data[i].Status
                if(JNStatus == "Macet" || JNStatus == "Kurang Lancar" || JNStatus == "Diragukan" ){
                  dataTable.Data[i].Status = "Ya"
                }else{
                  dataTable.Data[i].Status = "Tidak"
                }
                if (dataTable.Data[i].Loan) {
                  totalLoan += dataTable.Data[i].Loan
                  dataTable.Data[i].Loan = this.formatCurrency(dataTable.Data[i].Loan)
                }
                if (dataTable.Data[i].Interest) {
                  totalInterest += dataTable.Data[i].Interest
                  dataTable.Data[i].Interest = this.formatCurrency(dataTable.Data[i].Interest)
                }
                if (dataTable.Data[i].AdvPayment) {
                  totalAdvPayment += dataTable.Data[i].AdvPayment
                  dataTable.Data[i].AdvPayment = this.formatCurrency(dataTable.Data[i].AdvPayment)
                }
                if (dataTable.Data[i].Total) {
                  total += dataTable.Data[i].Total
                  dataTable.Data[i].Total = this.formatCurrency(dataTable.Data[i].Total)
                }
             this.itemsExcel.push({
                No : dataTable.Data[i].No,
                DANumber : dataTable.Data[i].DANumber,
                Reference : dataTable.Data[i].Reference,
                TransNo : dataTable.Data[i].TransNo,
                Description : dataTable.Data[i].Description,
                TransDate : dataTable.Data[i].TransDate,
                Loan : dataTable.Data[i].Loan ? this.CurrencyToNumber(dataTable.Data[i].Loan) : 0,
                Interest : dataTable.Data[i].Interest? this.CurrencyToNumber(dataTable.Data[i].Interest) : 0,
                AdvPayment : dataTable.Data[i].AdvPayment? this.CurrencyToNumber(dataTable.Data[i].AdvPayment) : 0,
                Total : dataTable.Data[i].Total? this.CurrencyToNumber(dataTable.Data[i].Total) : 0,
                Status : dataTable.Data[i].Status,
                Ket : dataTable.Data[i].Ket
              })
          }
          this.itemsTotal.push({
            cols : 6,
            value : "Total Keseluruhan"
          },
          {
            cols : 0,
            value : this.formatCurrency(totalLoan)
          },
          {
            cols : 0,
            value : this.formatCurrency(totalInterest)
          },
          {
            cols : 0,
            value :  this.formatCurrency(totalAdvPayment)
          },
          {
            cols : 3,
            value : this.formatCurrency(total)
          })

          var workarea = await apiWorkArea1.getByCode(this.sortir.Cabang)
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
            name : 'Laporan Angsuran Mitra Per Bulan'
          },
          {
            cels : 'A2',
            name : 'Region ' + WAName
          },
          {
            cels : 'A3',
            name : "Periode "+ this.formatDateDMY(this.sortir.Mulai) + " sampai " + this.formatDateDMY(this.sortir.Sampai),
          },
          )

          this.itemsExcel.push({
                No : "Total Keseluruhan",
                DANumber : "",
                Reference : "",
                TransNo : "",
                Description : "",
                TransDate : "",
                Loan :  totalLoan,
                Interest :  totalInterest ,
                AdvPayment :  totalAdvPayment ,
                Total :  total ,
                Status : "",
                Ket : ""
              })
          // dataTable.Data.push({
          //    DANumber : "Total",
          //    Loan : this.formatCurrency(totalLoan),
          //    Interest : this.formatCurrency(totalInterest),
          //    AdvPayment : this.formatCurrency(totalAdvPayment),
          //    Total : this.formatCurrency(total)
          //  })

          this.items = dataTable.Data
          this.itemsArray = () => this.items
          console.log(this.items)
        } finally {
          this.loading = false
        }
      },
      async cariAngsuran(){
        this.getAll()
      },
      async bersihAngsuran(){
         this.sortir.Mulai = null
          this.sortir.Sampai = null
          this.sortir.Bermasalah = null
          this.sortir.JenisJurnal = null
          if(this.cabang == 9900){
            this.sortir.Cabang = null
          }else{
            this.sortir.Cabang = this.cabang
          }
          this.items = []
          this.itemsExcel = []
        // this.getAll()
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
      async getCabang(){
        var workarea = null
        if(this.cabang != 9900){
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
