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
                        <strong>Pengembalian Angsuran Mitra Binaan </strong>
                    </div>
                    <b-row>
                     <b-col md="6" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="Cari"></b-form-input>
                          <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Bersihkan</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="6" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                          <label>Tahun</label>
                           <b-form-select  v-model="search.Year" :options="options_Year" required></b-form-select>
                           <label>Cabang</label>
                            <b-form-select v-model="search.Cabang" :options="options_cabang"></b-form-select>
                          <b-input-group-append>
                           <b-button variant="primary" v-on:click="cariPengembalian()">Filter</b-button>
                            <b-button variant="primary" v-on:click="bersihPengembalian()">Bersihkan FIlter</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="my-1">
                        <btnExcel :items="itemsExcel" :settingExcel="setExcel" :header="headerExcel" style="float:left;" sheetName="Laporan Pengembalian Angsuran Mitra Binaan" filename="Laporan Pengembalian Angsuran Mitra Binaan"></btnExcel>
                    </b-col>
                    </b-row>
                      <b-row>
                        <br>
                         <excel
                          :items="itemsExcel"
                          :header="headerExcel"
                          sheetName="Pengembalian Angsuran"
                          filename="Pengembalian Angsuran"></excel>
                        <b-col sm="12">
                              <b-row >
                                <b-col sm="12">
                                  <b-table
                                  class="table-responsive"
                                  id="tambah"
                                  :fields="fields"
                                  caption=""
                                  :sort-compare="sortDateTable"
                                  :per-page="perPage"
                                  :current-page="currentPage"
                                  :items="items"
                                  :filter="filter"
                                   @filtered="onFiltered">
                                    <template slot="bottom-row" slot-scope="data">
                                      <td colspan="2">Total Keseluruhan</td>
                                      <td class="positionRight">{{totalDebValue}}</td>
                                      <td class="positionRight">{{totalLoanPaid}}</td>
                                      <td class="positionRight">{{totalInterestPaid}}</td>
                                      <td colspan="5"></td>
                                    </template>
                                  </b-table>
                                  <b-pagination
                                  v-model="currentPage"
                                  :total-rows="rows"
                                  :per-page="perPage"
                                  aria-controls="tambah"></b-pagination>
                                </b-col>
                              </b-row>
                        </b-col>
                      </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
  import excel from '../../../components/BtnExcel';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiWorkArea1 from '@/api/WorkArea1ApiService';
  import BtnExcel from '@/components/Excel'
 export default {
   components : {
     BtnExcel
   },
  data() {
    return {
      cabangKP : 9900,
      search:{
        Year:null,
        Cabang:null
      },
      headerExcel : ['No','Nomor Mitra','Nama','Nilai Pinjaman','Pengembalian Pokok','Pengembalian Jasa','Tanggal Pengembalian','Kriteria (Sinergi/Individu)','Jangka Waktu Pinjaman','Kualitas','Jatuh Tempo'],
      itemsExcel : [],
      setExcel : [
        {
          Cell : ['A','B','C','D','E','F','G','H','I','J','K']
        },
        {
          titles : []
        },
        {
          mergeTo : "C"
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
          ]
        }
      ],
      loading:false,
      filter: null,
      items: [],
      itemsExcel:[],
      fields:[
        {label: 'No', key: 'No'},
         {label: 'Nomor Mitra Binaan',key:'DANumber', sortable: true},
          {label: 'Nama',key: 'FullName', sortable: true},
          {label: 'Nilai Pinjaman',key: 'DebValue', sortable: true, tdClass: 'positionRight'},
          {label: 'Pengembalian Pokok',key: 'LoanPaid', sortable: true, tdClass: 'positionRight'},
          {label: 'Pengembalian Jasa',key: 'InterestPaid', sortable: true, tdClass: 'positionRight'},
          {label: 'Tanggal Pengembalian',key: 'LastPaidDate', sortable: true},
          {label: 'Kriteria (Sinergi/Individu)',key: 'DistributionPattern', sortable: true},
          {label: 'Jangka Waktu Pinjaman',key: 'Tenor', sortable: true},
          {label: 'Kualitas',key: 'Status', sortable: true},
          {label: 'Jatuh Tempo',key: 'NextDueDate', sortable: true},
      ],
        cabang:null,
       perPage: 10,
       currentPage: 1,
      options_Year:[],
      options_cabang:[],
    }
  },
   async created() {
    this.loading = true
    this.cabang = localStorage.cabang
     if(this.cabang == this.cabangKP){
        this.search.Cabang = null
      }else{
        this.search.Cabang = this.cabang
      }
      this. getCabang()
      this.getYear()
      // this.tampilData()
    this.loading = false
   },
  computed: {
    rows() {
      return this.items.length
    },
    totalDebValue: function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        // let val = (a + Number((c.DebValueNC) || 0) / 1).toFixed(2).replace('.', ',')
        //  let rupiah = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // return  rupiah ;
        return a + Number(c.DebValueNC  || 0);
      }, 0))
    },
     totalLoanPaid: function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        // let val = (a + Number((c.LoanPaidNC) || 0) / 1).toFixed(2).replace('.', ',')
        //  let rupiah = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // return  rupiah ;
        return  a + Number(c.LoanPaidNC  || 0);
      }, 0))
    },
     totalInterestPaid: function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        // let val = (a + Number((c.InterestPaidNC) || 0) / 1).toFixed(2).replace('.', ',')
        //  let rupiah = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // return  rupiah ;
        return  a + Number(c.InterestPaidNC  || 0) ;
      }, 0))
    }
  },
   mounted() {
    this.rows  = this.items.length
   },
  methods: {
    onFiltered(filteredItems) {
      this.rows  = filteredItems.length
      this.currentPage  = 1
    },
     async tampilData(){
        var dataTable = await apiDebitAccount.ListOfPengembalianAngsuran(this.search.Year,this.search.Cabang)
        console.log("DATATU",dataTable)
        this.items = []
         for (var i = 0; i < dataTable.Data.length; i++) {
          var data = dataTable.Data[i]
          data.No = i+1
          if(data.DebValue){
             data.DebValueNC = data.DebValue
              data.DebValue = this.formatCurrency(data.DebValue)
          }else{
            data.DebValueNC = 0
            data.DebValue = this.formatCurrency(0)
          }
          if(data.LoanPaid){
            data.LoanPaidNC = data.LoanPaid
              data.LoanPaid = this.formatCurrency(data.LoanPaid)
          }else{
             data.LoanPaidNC = 0
            data.LoanPaid = this.formatCurrency(0)
          }
          if(data.InterestPaid){
              data.InterestPaidNC = data.InterestPaid
              data.InterestPaid = this.formatCurrency(data.InterestPaid)
          }else{
            data.InterestPaidNC = 0
            data.InterestPaid = this.formatCurrency(0)
          }
            if(data.LastPaidDate){
              data.LastPaidDate = this.formatDateDMY(data.LastPaidDate)
            }
            if(data.NextDueDate){
              data.NextDueDate = this.formatDateDMY(data.NextDueDate)
            }

            this.itemsExcel.push({
              No : data.No,
              DANumber : data.DANumber,
              FullName : data.FullName,
              DebValue : this.CurrencyToNumber(data.DebValue),
              LoanPaid :this.CurrencyToNumber(data.LoanPaid),
              InterestPaid : this.CurrencyToNumber(data.InterestPaid),
              LastPaidDate : data.LastPaidDate,
              DistributionPattern :data.DistributionPattern,
              Tenor :data.Tenor,
              Status : data.Status,
              NextDueDate : data.NextDueDate,

            })
          this.items.push(data)
         }

         var workarea = await apiWorkArea1.getByCode(this.search.Cabang)
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
           name : 'Laporan Pengembalian Angsuran Mitra Binaan'
         },
         {
           cels : 'A2',
           name : 'Region ' + WAName
         },
         {
           cels : 'A3',
           name : "Periode "+ this.search.Year,
         },
         )

         this.itemsExcel.push({
           No : "Total Keseluruhan",
           DANumber : "",
           FullName : "",
           DebValue : this.CurrencyToNumber(this.totalDebValue),
           LoanPaid :this.CurrencyToNumber(this.totalLoanPaid),
           InterestPaid : this.CurrencyToNumber(this.totalInterestPaid),
           LastPaidDate : "",
           DistributionPattern :"",
           Tenor :"",
           Status : "",
           NextDueDate : "",

         })

     },
     async cariPengembalian(){
        this.loading = true
        this.tampilData()
        this.loading = false
     },
     async bersihPengembalian(){
       this.loading = true
       this.search.Year = null
       if(this.cabang == this.cabangKP){
          this.search.Cabang = null
        }else{
          this.search.Cabang = this.cabang
        }
        this.items = []
        // this.tampilData()
        this.loading = false
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
    },
    getYear(){
      this.options_Year = [{text:"--- Semua ---",value:null}]
      for (var i = new Date().getFullYear(); i >= 1990; i--) {
        this.options_Year.push(i)
      }
    },
  }
}
</script>
<style>
.positionRight {
  text-align:right;
}
</style>
