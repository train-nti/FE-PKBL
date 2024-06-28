<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <div slot="header">
                        <strong>Permohonan </strong>
                    </div>
                      <b-row>
                        <b-col sm="12">
                            <b-tabs class="full-widths" v-model="tabIndex[0]">

                              <b-tab active v-if="username == 'Staff Pusat'">
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[0]}}
                              </template>
                              <b-row >
                                <b-col sm="12">
                                  <b-table id="tambah_permohonan" :fields="fields" caption=""  :per-page="perPage_tambah_permohonan" :current-page="currentPage_tambah_permohonan" :items="items_permohonan">
                                    <template slot="aksi" slot-scope="data">
                                       <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-pencil"></i> </router-link> 
                                    </template>
                                  </b-table>
                                  <b-pagination v-model="currentPage_tambah_permohonan" :total-rows="rows_tambah_permohonan" :per-page="perPage_tambah_permohonan" aria-controls="tambah_permohonan"></b-pagination>
                                </b-col>
                              </b-row>
                              </b-tab>

                              <b-tab v-if="username == 'Staff Pusat'">
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[1]}}
                              </template>
                              <b-row >
                                <b-col sm="12">
                                  <b-table id="tambah_permohonanPK" :fields="fields" caption=""  :per-page="perPage_tambah_permohonanPK" :current-page="currentPage_tambah_permohonanPK" :items="items_permohonanPK">
                                    <template slot="aksi" slot-scope="data">
                                       <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-pencil"></i> </router-link> 
                                    </template>
                                  </b-table>
                                  <b-pagination v-model="currentPage_tambah_permohonanPK" :total-rows="rows_tambah_permohonanPK" :per-page="perPage_tambah_permohonanPK" aria-controls="tambah_permohonanPK"></b-pagination>
                                </b-col>
                              </b-row>
                              </b-tab>
                              
                              <b-tab  v-if="username == 'Kepala Cabang'">
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[4]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table id="tambah_penilaian" :fields="fields_approval" caption=""  :per-page="perPage_tambah_penilaian" :current-page="currentPage_tambah_penilaian" :items="items_penilaian">
                                        <template slot="aksi" slot-scope="data">
                                              <router-link class="btn btn-primary" :to="{ name: 'Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link>
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_penilaian" :total-rows="rows_tambah_penilaian" :per-page="perPage_tambah_penilaian" aria-controls="tambah_penilaian"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab>

                              <b-tab  v-if="username == 'Kepala Cabang'">
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[5]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table id="tambah_penilaianPK" :fields="fields_approval" caption=""  :per-page="perPage_tambah_penilaianPK" :current-page="currentPage_tambah_penilaianPK" :items="items_penilaianPK">
                                        <template slot="aksi" slot-scope="data">
                                              <router-link class="btn btn-primary" :to="{ name: 'Approval PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link>
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_penilaianPK" :total-rows="rows_tambah_penilaianPK" :per-page="perPage_tambah_penilaianPK" aria-controls="tambah_penilaianPK"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab>
                          </b-tabs>
                        </b-col>
                      </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
  import moment from 'moment'
  import apiDebitorJoinDebitAccountDebitor from '@/api/PK/DebitAccountApiService'
  import apiDebitor from '@/api/PK/DebitorApiService'
    export default {
         data() {
            return {
              username:localStorage.username,
              items_penilaian: [],
              items_penilaianPK: [],
              items_permohonan: [],
              items_permohonanPK: [],
              fields: [
                {label: 'No',key:'No'},
                {label: 'Tanggal Permohonan',key: 'DateProposal'},
                {label: 'No Permohonan',key: 'NoReference'},
                {label: 'Nama Pemohon',key: 'FullName'},
                {label: 'Instansi',key: 'Instance'},
                {label: 'Kegiatan',key: 'Activity'},
                {label: 'Kota',key: 'Dist_code'},
                {label: 'Nilai Pengajuan',key: 'Amount'},
                {key:'aksi'}
              ],
              fields_approval: [
                {label: 'No',key:'No'},
                {label: 'Tanggal Permohonan',key: 'DateProposal'},
                {label: 'No Permohonan',key: 'NoReference'},
                {label: 'Nama Pemohon',key: 'FullName'},
                {label: 'Instansi',key: 'Instance'},
                {label: 'Kegiatan',key: 'Activity'},
                {label: 'Kota',key: 'Dist_code'},
                {label: 'Nilai Rekomendasi',key: 'Amount'},
                {key:'aksi'}
              ],
                tabIndex: [0, 0],
                tabs: [
                    'Daftar Permohonan BL',
                    'Daftar Permohonan PK',
                ],
                perPage_tambah_permohonan: 10,
                currentPage_tambah_permohonan: 1,
                perPage_tambah_permohonanPK: 10,
                currentPage_tambah_permohonanPK: 1,
                perPage_tambah_penilaian: 10,
                currentPage_tambah_penilaian: 1,
                perPage_tambah_penilaianPK: 10,
                currentPage_tambah_penilaianPK: 1,
            }
        },
        async created() {
          console.log(localStorage.username)
          this.getAllDebitorJoinDebitAccountDebitor(localStorage.username)
          this.getAllDebitorJoinDebitAccountDebitorPK(localStorage.username)
          this.getAllDebitorBL()
          this.getAllDebitorPK()
        },
        computed: {
          rows_tambah_permohonan() {
            return this.items_permohonan.length
          },
           rows_tambah_permohonanPK() {
            return this.items_permohonanPK.length
          },
          rows_tambah_penilaian() {
            return this.items_penilaian.length
          },
          rows_tambah_penilaianPK() {
            return this.items_penilaianPK.length
          }
        },
         methods: {
          async getAllDebitorJoinDebitAccountDebitor(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitor(posisi)

                   console.log(dataTable)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal) 
                  }
                  if(dataTable.Data[i].Amount){
                    dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
                  }
               }
                this.items_penilaian = dataTable.Data
          },
          async getAllDebitorJoinDebitAccountDebitorPK(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorPK(posisi)

                   console.log(dataTable)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal) 
                  }
                  if(dataTable.Data[i].Amount){
                    dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
                  }
               }
                this.items_penilaianPK = dataTable.Data
          },
          async getAllDebitorBL() {
               var dataTable = await apiDebitor.getAllFlag(0)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal) 
                  }
                  if(dataTable.Data[i].Amount){
                    dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
                  }
               }
                this.items_permohonan = dataTable.Data
                console.log(dataTable)
          },
          async getAllDebitorPK() {
               var dataTable = await apiDebitor.getAllFlag(1)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal) 
                  }
                  if(dataTable.Data[i].Amount){
                    dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
                  }
               }
                this.items_permohonanPK = dataTable.Data
                console.log(dataTable)
          }

         }
    }
</script>
