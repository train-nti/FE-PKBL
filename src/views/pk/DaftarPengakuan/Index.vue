<style>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
.positionRight {
 text-align:right;
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
                      <strong>Mitra Lunas</strong>
                    </div>

                    <b-row>
                      <b-col sm="4">
                          <label for="ccnumber">Cari
                             <!-- <b class="text-danger"> *</b> -->
                           </label>
                          <b-form-input v-model="filter" type="text" required></b-form-input>
                      </b-col>

                      <b-col sm="4">
                          <label for="ccnumber">Closing
                             <!-- <b class="text-danger"> *</b> -->
                           </label>
                          <b-form-select v-model="mitraLunas.Closing" :options="optionsClosing"></b-form-select>
                      </b-col>

                      <b-col sm="4">
                          <label for="ccnumber">Bulan
                             <!-- <b class="text-danger"> *</b> -->
                           </label>
                          <b-form-select v-model="mitraLunas.Bulan" :options="optionsBulan"></b-form-select>
                      </b-col>

                      <b-col sm="4">
                          <label for="ccnumber">Cabang
                             <!-- <b class="text-danger"> *</b> -->
                           </label>
                          <b-form-select v-model="mitraLunas.Cabang" :options="optionsCabang"></b-form-select>
                      </b-col>

                      <b-col sm="4">
                          <label for="ccnumber">Jumlah Baris
                             <!-- <b class="text-danger"> *</b> -->
                           </label>
                          <b-form-select v-model="Baris" :options="optionsBaris"></b-form-select>
                      </b-col>

                      <!-- <b-col sm="4">
                          <label for="ccnumber">Bermasalah -->
                             <!-- <b class="text-danger"> *</b> -->
                         <!--   </label>
                          <b-form-select v-model="selected2" :options="options_Program4"></b-form-select>
                      </b-col> -->
                    </b-row>

                    <b-row style="padding-top:10px;">
                      <b-col sm="1">
                          <b-button v-on:click="filterMitraBelumLunas()" variant="light">Filter</b-button>
                      </b-col>

                      <b-col sm="1">
                          <b-button  v-on:click="clearMitraBelumLunas()"  variant="light">Clear</b-button>
                      </b-col>
                    </b-row>

                    <b-row style="padding-top:10px;">
                      <b-col sm="12">
                        <!--   <p>Report Mitra Lunas</p>
                          <p>Closing terakhir perkembangan tahun : 2019, bulan : 04 </p> -->
                      </b-col>
                    </b-row>
                  <b-tabs class="full-widths" v-model="tabIndex[0]">

                      <b-tab active >
                       <template slot="title">
                          <i class="icon-calculator"></i> {{tabs[0]}}
                      </template>
                        <b-row>
                        <b-col sm="12">
                          <b-table
                          class="table-responsive"
                          :fields="fields"
                          caption=""
                          :sort-compare="sortDateTable"
                          :per-page="perPage"
                          :current-page="currentPage"
                          :items="items"
                          :filter="filter"
                           @filtered="onFiltered">





                            <template slot="bottom-row" slot-scope="data">
                              <td colspan="5">Total Keseluruhan</td>
                              <td class="positionRight">{{DebValueBL}}</td>
                              <td colspan="2"></td>
                              <td class="positionRight">{{LoanPaidBL}}</td>
                              <td class="positionRight">{{InterestPaidBL}}</td>
                              <td class="positionRight">{{SisaPokokBL}}</td>
                              <td class="positionRight">{{SisaJasaBL}}</td>
                              <td></td>
                            </template>
                            <!-- <template slot="Action" slot-scope="data">
                                <button class="icon-pencil"  v-on:click="ubahMitraLunas(data.item.DACode,0)"> </button>
                            </template> -->
                          </b-table>
                          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="tambah_tidaksetujuPK"></b-pagination>
                        </b-col>
                      </b-row>
                    </b-tab>

                    <b-tab >
                       <template slot="title">
                          <i class="icon-calculator"></i> {{tabs[1]}}
                      </template>
                        <b-row>
                        <b-col sm="12">
                          <b-table
                          class="table-responsive"
                          :fields="fields"
                          caption=""
                          :sort-compare="sortDateTable"
                          :per-page="perPage_lunas"
                          :current-page="currentPage_lunas"
                          :items="items_lunas"
                          :filter="filter"
                           @filtered="onFiltered">
                            <template slot="bottom-row" slot-scope="data">
                              <td colspan="5">Total Keseluruhan</td>
                              <td class="positionRight">{{DebValueL}}</td>
                              <td colspan="2"></td>
                              <td class="positionRight">{{LoanPaidL}}</td>
                              <td class="positionRight">{{InterestPaidL}}</td>
                              <td class="positionRight">{{SisaPokokL}}</td>
                              <td class="positionRight">{{SisaJasaL}}</td>
                              <td></td>
                            </template>
                            <!-- <template slot="Action" slot-scope="data">
                                <button class="icon-pencil"  v-on:click="ubahMitraLunas(data.item.DACode,1)"> </button>
                            </template> -->
                          </b-table>
                          <b-pagination v-model="currentPage_lunas" :total-rows="rows_lunas" :per-page="perPage_lunas" aria-controls="tambah_tidaksetujuPK"></b-pagination>
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>


                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import {Money} from 'v-money'
import apiDebitAccountSummary from '@/api/PK/DebitAccountSummaryApiService';
import apiDebitAccount from '@/api/PK/DebitAccountApiService';
import apiWorkArea from '@/api/WorkArea1ApiService';
  export default {
    data() {
      return {
        cabangKP : 9900,
        loading: false,
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'Rp. ',
            suffix: '',
            precision: 2,
            masked: false
          },
          mitraLunas:{
            type:0,
            Closing:null,
            Cabang:null,
            Bulan:null,
          },
          tabIndex: [0, 0],
          tabs: [
              'Mitra Belum Lunas ',
              'Mitra Lunas',
          ],
          filter: null,
          items:[],
          items_lunas:[],
          fields: [{
              key: 'No',
              label: '#',
            },
            {
              key: 'DANumber',
              label: 'Kode'
            },
            {
              key: 'FullName',
              label: 'Nama'
            },
            {
              key: 'Instance',
              label: 'Nama Usaha'
            },
            {
              key: 'FinalPaymentDate',
              label: 'Realisasi',
              sortable: true

            },
            {
              key: 'DebValue',
              label: 'Plafond',
              tdClass: 'positionRight'
            },
            {
              key: 'InitialPaymentDate',
              label: 'Jadwal',
              sortable: true
            },
            {
              key: 'FinalDueDate',
              label: 'Terakhir',
              sortable: true
            },
            {
              key: 'LoanPaid',
              label: 'Bayar Pokok',
              tdClass: 'positionRight'
            },
            {
              key: 'InterestPaid',
              label: 'Bayar Jasa',
              tdClass: 'positionRight'
            },
            {
              key: 'SisaPokok',
              label: 'Sisa Pokok',
              tdClass: 'positionRight'
            },
            {
              key: 'SisaJasa',
              label: 'Sisa Jasa',
              tdClass: 'positionRight'
            },
            // {
            //   key: 'Action',
            //   label: 'Aksi'
            // },
            {
              key: 'WAName',
              label: 'Region'
            },
          ],
          cabang:null,
          perPage: 10,
          perPage_lunas: 10,
          currentPage: 1,
          currentPage_lunas: 1,
          optionsClosing:[],
          optionsBulan:[],
          optionsCabang:[],
          optionsBaris:[],
          Baris:null,
      }
    },
    async created() {
      this.loading = true
      this.cabang = localStorage.cabang
      if(this.cabang == this.cabangKP){
          this.mitraLunas.Cabang = null
        }else{
          this.mitraLunas.Cabang = this.cabang
        }
      // this.mitraLunas.Cabang = localStorage.cabang
     await this.comboboxClosing()
     await this.comboboxBulan()
     await this.comboboxCabang()
     await this.comboboxBaris()
     // await this.ListMitraBelumLunas()
     // await this.ListMitraLunas()
      this.loading = false
    },
    computed: {
      rows() {
        return this.items.length
      },
      rows_lunas() {
        return this.items_lunas.length
      },
      DebValueBL: function() {
        return this.formatCurrency(this.items.reduce(function(a, c){
          return a + Number(c.DebValueBL  || 0);
        }, 0))
      },
      LoanPaidBL: function() {
        return this.formatCurrency(this.items.reduce(function(a, c){
          return a + Number(c.LoanPaidBL  || 0);
        }, 0))
      },

      InterestPaidBL: function() {
        return this.formatCurrency(this.items.reduce(function(a, c){
          return a + Number(c.InterestPaidBL  || 0);
        }, 0))
      },

      SisaPokokBL: function() {
        return this.formatCurrency(this.items.reduce(function(a, c){
          return a + Number(c.SisaPokokBL  || 0);
        }, 0))
      },
      SisaJasaBL: function() {
        return this.formatCurrency(this.items.reduce(function(a, c){
          return a + Number(c.SisaJasaBL  || 0);
        }, 0))
      },
      DebValueL: function() {
        return this.formatCurrency(this.items_lunas.reduce(function(a, c){
          return a + Number(c.DebValueL  || 0);
        }, 0))
      },
      LoanPaidL: function() {
        return this.formatCurrency(this.items_lunas.reduce(function(a, c){
          return a + Number(c.LoanPaidL  || 0);
        }, 0))
      },

      InterestPaidL: function() {
        return this.formatCurrency(this.items_lunas.reduce(function(a, c){
          return a + Number(c.InterestPaidL  || 0);
        }, 0))
      },

      SisaPokokL: function() {
        return this.formatCurrency(this.items_lunas.reduce(function(a, c){
          return a + Number(c.SisaPokokL  || 0);
        }, 0))
      },
      SisaJasaL: function() {
        return this.formatCurrency(this.items_lunas.reduce(function(a, c){
          return a + Number(c.SisaJasaL  || 0);
        }, 0))
      },

    },
    mounted() {
      // Set the initial number of items
      this.rows= this.items.length
      this.rows_lunas= this.items_lunas.length
    },
     methods: {
        async comboboxClosing(){
            this.optionsClosing = []
            var tahun = new Date().getFullYear()
            for (var i = 1990 ; i <= tahun; i++) {
                this.optionsClosing.push({text:i,value:i})
            }
        },
        async comboboxBulan(){
          this.optionsBulan = []
            var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
             for (var i = 0; i < 12; i++) {
               this.optionsBulan.push({text:bulan[i],value:i+1})
             }
        },
        async comboboxCabang(){
            var workarea = null
            if(this.cabang != this.cabangKP){
             workarea = await apiWorkArea.getByCode(this.cabang)
             // console.log("CABANG",workarea)
             this.optionsCabang = [{text: workarea[0].Name,value:workarea[0].Code}]
             // this.options_cabang.push({text: workarea[0].Name,value:workarea[0].Code})
            }else{
              var workarea = await apiWorkArea.getComboBoxAll()
              this.optionsCabang = [{text:"--- Semua ---",value:null}]
              for (var i = 0; i < workarea.length; i++) {
                var data =  workarea[i]
                this.optionsCabang.push({text: data.Name,value:data.Code})
              }
            }
            // console.log("cabang",workarea)

            //  var cabang = await apiWorkArea.getComboBoxAll()
            //  this.optionsCabang = []
            //  for (var i = 0; i < cabang.length; i++) {
            //    var data = cabang[i]
            //    this.optionsCabang.push({text:data.Name,value:data.Code})
            //  }
        },
        async comboboxBaris(){
           this.optionsBaris = []
            var baris = [10,25,50,100,250]
             for (var i = 0; i < 5; i++) {
               this.optionsBaris.push({text:baris[i],value:baris[i]})
             }
             this.Baris = 10
        },
        async filterMitraBelumLunas(){
            this.loading = true
            this.perPage = this.Baris
            this.perPage_lunas = this.Baris
            await this.ListMitraBelumLunas()
            await this.ListMitraLunas()
            this.loading = false
        },
         async clearMitraBelumLunas(){
            this.loading = true
            this.mitraLunas.type = 0
            this.mitraLunas.Closing = null
             if(this.cabang == this.cabangKP){
                this.mitraLunas.Cabang = null
              }else{
                this.mitraLunas.Cabang = this.cabang
              }
            this.mitraLunas.Bulan = null
            this.perPage = 10
             this.items = []
             this.items_lunas = []
            // await this.ListMitraBelumLunas()
            // await  this.ListMitraLunas()
            this.loading = false
        },
        async ListMitraBelumLunas(){
          console.log("DATA MITRA",this.mitraLunas)
          this.mitraLunas.type = 0
            var mitraBelumLunas = await apiDebitAccount.ListOfMitraLunas(this.mitraLunas)
            console.log(mitraBelumLunas)
             this.items = []
            for (var i = 0; i < mitraBelumLunas.Data.length; i++) {
              var data = mitraBelumLunas.Data[i]
              data.FinalPaymentDate = this.formatDateDMY(mitraBelumLunas.Data[i].FinalPaymentDate)
               data.InitialPaymentDate = this.formatDateDMY(mitraBelumLunas.Data[i].InitialPaymentDate)
                data.FinalDueDate = this.formatDateDMY(mitraBelumLunas.Data[i].FinalDueDate)

                  data.DebValueBL = mitraBelumLunas.Data[i].DebValue
                 data.LoanPaidBL = mitraBelumLunas.Data[i].LoanPaid
                 data.InterestPaidBL = mitraBelumLunas.Data[i].InterestPaid
                  data.SisaPokokBL = mitraBelumLunas.Data[i].SisaPokok
                   data.SisaJasaBL = mitraBelumLunas.Data[i].SisaJasa

                 data.DebValue = this.formatCurrency(mitraBelumLunas.Data[i].DebValue)
                 data.LoanPaid = this.formatCurrency(mitraBelumLunas.Data[i].LoanPaid)
                 data.InterestPaid = this.formatCurrency(mitraBelumLunas.Data[i].InterestPaid)
                  data.SisaPokok = this.formatCurrency(mitraBelumLunas.Data[i].SisaPokok)
                   data.SisaJasa = this.formatCurrency(mitraBelumLunas.Data[i].SisaJasa)
                   // if(mitraBelumLunas.Data[i].WACode){
                   //    var cabang = await apiWorkArea.getByCode(mitraBelumLunas.Data[i].WACode)
                   //    data.WACode = cabang[0].Name
                   // }
              this.items.push(data)
            }
        },
        async ListMitraLunas(){
          console.log("DATA MITRA",this.mitraLunas)
          this.mitraLunas.type = 1
            var mitraBelumLunas = await apiDebitAccount.ListOfMitraLunas(this.mitraLunas)
            console.log(mitraBelumLunas)
             this.items_lunas = []
            for (var i = 0; i < mitraBelumLunas.Data.length; i++) {
              var data = mitraBelumLunas.Data[i]
              data.FinalPaymentDate = this.formatDateDMY(mitraBelumLunas.Data[i].FinalPaymentDate)
               data.InitialPaymentDate = this.formatDateDMY(mitraBelumLunas.Data[i].InitialPaymentDate)
                data.FinalDueDate = this.formatDateDMY(mitraBelumLunas.Data[i].FinalDueDate)

                   data.DebValueL = mitraBelumLunas.Data[i].DebValue
                 data.LoanPaidL = mitraBelumLunas.Data[i].LoanPaid
                 data.InterestPaidL = mitraBelumLunas.Data[i].InterestPaid
                  data.SisaPokokL = mitraBelumLunas.Data[i].SisaPokok
                   data.SisaJasaL = mitraBelumLunas.Data[i].SisaJasa

                 data.DebValue = this.formatCurrency(mitraBelumLunas.Data[i].DebValue)
                 data.LoanPaid = this.formatCurrency(mitraBelumLunas.Data[i].LoanPaid)
                 data.InterestPaid = this.formatCurrency(mitraBelumLunas.Data[i].InterestPaid)
                  data.SisaPokok = this.formatCurrency(mitraBelumLunas.Data[i].SisaPokok)
                   data.SisaJasa = this.formatCurrency(mitraBelumLunas.Data[i].SisaJasa)
                   // if(mitraBelumLunas.Data[i].WACode){
                   //    var cabang = await apiWorkArea.getByCode(mitraBelumLunas.Data[i].WACode)
                   //    data.WACode = cabang[0].Name
                   // }
              this.items_lunas.push(data)
            }
        },
        async ubahMitraLunas(data,type){
          this.loading = true
          var debitAccount = {}
          var debitAccountSummary = {}
          console.log("DACODE",data)
          var r = null
          if(type == 0){
            r =  confirm("Apakah Mitra Sudah Lunas!");
            debitAccount.IsCompleted = 1
            debitAccount.CompleteDate = new Date()
            debitAccountSummary.ClosingDate = new Date()
          }else{
            r =  confirm("Apakah Mitra Belum Lunas!");
            debitAccount.IsCompleted = 0
            debitAccount.CompleteDate = null
            debitAccountSummary.ClosingDate = null
          }
          if (r) {
            var mitraBelumLunas1 = await apiDebitAccount.updateMitraLunas(data,debitAccount)
           var mitraBelumLunas2 = await apiDebitAccountSummary.updateClosingDate(data,debitAccountSummary)
           await this.ListMitraBelumLunas()
           await this.ListMitraLunas()
          this.showNotif(mitraBelumLunas2,'Permohonan')
          } else {
          }
          this.loading = false

        },
          onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.rows = filteredItems.length
            this.currentPage = 1

            this.rows_lunas = filteredItems.length
            this.currentPage_lunas = 1
          },
     }
  }
</script>
