<style type="text/css">
  tr th{
      /*width:1%;*/
      white-space:nowrap;
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
                        <strong>Permohonan </strong>
                    </div>
                    <b-row>
                     <b-col md="6" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="Ketik untuk mencari"></b-form-input>
                          <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Bersih</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                   <!--  <b-col md="6" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                           <b-form-file v-model="upload"></b-form-file>
                          <b-input-group-append>
                           <b-button variant="primary" v-on:click="saveUpload()">Upload</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col> -->
                    </b-row>
                    <div style="text-align: right;" v-if="IsRole('BL.Permohonan.Add')">
                   <!--    <router-link class="btn btn-primary" to="/bussiness-process-desaigner/workflow-initialization-formpk2"> <i class="icon-plus"></i>  Pengajuan PK  </router-link>  -->
                      <b-button type="button" size="md" variant="primary" v-on:click="addPengajuan()" :disabled="klik ">Pengajuan</b-button>
                     <!--  <router-link class="btn btn-primary" to="/bussiness-process-desaigner/workflow-initialization-form2"> <i class="icon-plus"></i>  Pengajuan  </router-link> -->
                    </div>
                      <b-row>
                        <br>
                        <b-col sm="12">
                            <b-tabs class="full-widths" v-model="tabIndex[0]">

                              <b-tab active >
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[0]}}
                              </template>
                              <b-row >

                                <b-col sm="12">
                                  <b-table
                                  class="table-responsive"
                                  id="tambah_permohonan"
                                  :fields="fields"
                                  caption=""
                                  :sort-compare="sortDateTable"
                                  :per-page="perPage_tambah_permohonan"
                                  :current-page="currentPage_tambah_permohonan"
                                  :items="items_permohonan"
                                  :filter="filter"
                                   @filtered="onFiltered">
                                    <template slot="aksi" slot-scope="data">
                                       <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }" v-if="IsRole('BL.Permohonan.Edit')"> <i class="icon-check"></i> Permohonan </router-link>

                                      <!--   <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization Ubah', params: {Mode:'Ubah',DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-pencil"></i> Permohonan </router-link>  -->

                                    </template>
                                  </b-table>
                                  <b-pagination
                                  v-model="currentPage_tambah_permohonan"
                                  :total-rows="rows_tambah_permohonan"
                                  :per-page="perPage_tambah_permohonan"
                                  aria-controls="tambah_permohonan"></b-pagination>
                                </b-col>
                              </b-row>
                              </b-tab>

                              <!-- <b-tab>
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[1]}}
                              </template>
                              <b-row >
                                <b-col sm="12">
                                  <b-table
                                  class="table-responsive"
                                  id="tambah_permohonanPK"
                                  :fields="fields"
                                  caption=""
                                  :per-page="perPage_tambah_permohonanPK"
                                  :current-page="currentPage_tambah_permohonanPK"
                                  :items="items_permohonanPK"
                                  :filter="filter"
                                   @filtered="onFiltered">
                                    <template slot="aksi" slot-scope="data">
                                       <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-pencil"></i> </router-link>
                                    </template>
                                  </b-table>
                                  <b-pagination
                                  v-model="currentPage_tambah_permohonanPK"
                                  :total-rows="rows_tambah_permohonanPK"
                                  :per-page="perPage_tambah_permohonanPK"
                                  aria-controls="tambah_permohonanPK"></b-pagination>
                                </b-col>
                              </b-row>
                              </b-tab> -->

                               <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[1]}}
                                  </template>
                                  <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_penilaian"
                                      :fields="fields"
                                      :sort-compare="sortDateTable"
                                      caption=""
                                      :per-page="perPage_tambah_penilaian"
                                      :current-page="currentPage_tambah_penilaian"
                                      :items="items_penilaian"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                           <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }" v-if="IsRole('BL.Penilaian.Edit')"><i class="icon-check"></i><br> Penilaian </router-link>

                                             <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization Ubah', params: {Mode:'Ubah',DebCode:data.item.DebCode,DACode:data.item.DACode} }" v-if="IsRole('BL.Permohonan.Edit')"> <i class="icon-pencil"></i> Permohonan </router-link>

                                            <!--   <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-pencil"></i><br> Penilaian </router-link> -->

                                        </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_penilaian" :total-rows="rows_tambah_penilaian" :per-page="perPage_tambah_penilaian" aria-controls="tambah_penilaian"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab>

                             <!--  <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[3]}}
                                  </template>
                                  <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_penilaianPK"
                                      :fields="fields"
                                      caption=""
                                      :per-page="perPage_tambah_penilaianPK"
                                      :current-page="currentPage_tambah_penilaianPK"
                                      :items="items_penilaianPK"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                           <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link>
                                        </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_penilaianPK" :total-rows="rows_tambah_penilaianPK" :per-page="perPage_tambah_penilaianPK" aria-controls="tambah_penilaianPK"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab> -->

                              <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[2]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_persetujuan"
                                      :fields="fields_approval"
                                      caption=""
                                      :sort-compare="sortDateTable"
                                      :per-page="perPage_tambah_persetujuan"
                                      :current-page="currentPage_tambah_persetujuan"
                                      :items="items_persetujuan"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                       <template slot="aksi" slot-scope="data">

                                               <router-link  class="btn btn-primary" :to="{ name: 'Form Workflow Initialization Ubah', params: {Mode:'Ubah',DebCode:data.item.DebCode,DACode:data.item.DACode} }" v-if="IsRole('BL.Permohonan.Edit')"> <i class="icon-pencil" ></i> Permohonan </router-link>

                                                <router-link  class="btn btn-primary" :to="{ name: 'Form Review And Approval Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'Ubah'} }" v-if="IsRole('BL.Penilaian.Edit') "><i class="icon-pencil"></i><br> Penilaian </router-link>


                                        <!--   </template>
                                        <template slot="aksi" slot-scope="data"> -->
                                              <router-link  class="btn btn-primary" :to="{ name: 'Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"  v-if="IsRole('BL.Persetujuan.Edit')"><i class="icon-check"></i> Persetujuan </router-link>

                                              <!--  <router-link   class="btn btn-primary" :to="{ name: 'Approval Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'Ubah'} }"><i class="icon-pencil"></i> Persetujuan </router-link> -->


                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_persetujuan" :total-rows="rows_tambah_persetujuan" :per-page="perPage_tambah_persetujuan" aria-controls="tambah_persetujuan"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab>

                             <!--  <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[5]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_persetujuanPK"
                                      :fields="fields_approvalPK"
                                      caption=""
                                      :per-page="perPage_tambah_persetujuanPK"
                                      :current-page="currentPage_tambah_persetujuanPK"
                                      :items="items_persetujuanPK"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                              <router-link class="btn btn-primary" :to="{ name: 'Approval PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link>
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_persetujuanPK" :total-rows="rows_tambah_persetujuanPK" :per-page="perPage_tambah_persetujuanPK" aria-controls="tambah_persetujuanPK"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab> -->

                               <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[3]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_sudahpersetujuan"
                                      :fields="fields_selesaiapproval"
                                      caption=""
                                      :sort-compare="sortDateTable"
                                      :per-page="perPage_tambah_sudahpersetujuan"
                                      :current-page="currentPage_tambah_sudahpersetujuan"
                                      :items="items_sudahpersetujuan"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                             <!--  <router-link class="btn btn-primary" :to="{ name: 'Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link> -->
                                             <router-link  class="btn btn-primary" :to="{ name: 'Form Workflow Initialization Ubah', params: {Mode:'Ubah',DebCode:data.item.DebCode,DACode:data.item.DACode} }" v-if="IsRole('BL.Permohonan.Edit')"> <i class="icon-pencil"></i> Permohonan </router-link>

                                             <router-link  class="btn btn-primary" :to="{ name: 'Form Review And Approval Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'UbahApp'} }"  v-if="IsRole('BL.Penilaian.Edit')"><i class="icon-pencil"></i><br> Penilaian </router-link>
                                        <!--   </template>
                                        <template slot="aksi" slot-scope="data"> -->

                                             <router-link class="btn btn-primary" :to="{ name: 'Approval Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'UbahApp'} }"   v-if="IsRole('BL.Persetujuan.Edit')"><i class="icon-pencil"></i> Persetujuan </router-link>
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_sudahpersetujuan" :total-rows="rows_tambah_sudahpersetujuan" :per-page="perPage_tambah_sudahpersetujuan" aria-controls="tambah_sudahpersetujuan"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab>

                              <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[4]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_tidaksetuju"
                                      :fields="fields_tidaksetuju"
                                      caption=""
                                      :sort-compare="sortDateTable"
                                      :per-page="perPage_tambah_tidaksetuju"
                                      :current-page="currentPage_tambah_tidaksetuju"
                                      :items="items_tidaksetuju"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_tidaksetuju" :total-rows="rows_tambah_tidaksetuju" :per-page="perPage_tambah_tidaksetuju" aria-controls="tambah_tidaksetuju"></b-pagination>
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
  import apiDebitorJoinDebitAccountDebitor from '@/api/PK/DebitAccountApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiImport from '@/api/PK/ImportApiService';
  import dynamic from '@/api/DynamicApiService';
    export default {
         data() {
            return {
              loading: false,
              cabang:null,
              username: null,
              klik: false,
              dataTableDeb: {
                Colum: "DebCode",
                Table: "Debitor",
                Start: 0,
                Search: null
              },
               dataTableDA: {
                Colum: "DACode",
                Table: "DebitAccount",
                Start: 0,
                Search: null
              },
              dataTableReference: {
                Colum: "NoReference",
                Table: "Debitor",
                Start: 0,
                Search: null
              },
              permohonan:{
                  DebCode: null,
                  Flag: 0,
                  ReferenceSH:'Stakeholder',
                  Reference: 'Kom VI',
                  ActiveUntil: new Date()
              },
              debitAccountState:{
                DACode:null,
                CreatedDate: new Date(),
                CreatedValue: 0
              },
              debitAccount:{
                DACode: null,
                DebCode:null,
                InterestRate:3,
                Tenor:0,
                StlmCycle:0,
                StlmBillvalue:0,
                OutstandingBal:0,
                Arrears:0,
                LateFromDue:0,
                Collectability:0,
                IsCompleted:false,
                DebValue:0
              },
              upload:null,
              username:localStorage.username,
              filter: null,
              items_penilaian: [],
              // items_penilaianPK: [],
              items_persetujuan: [],
              // items_persetujuanPK: [],
               items_sudahpersetujuan: [],
              // items_sudahpersetujuanPK: [],
              items_permohonan: [],
              // items_permohonanPK: [],
              items_tidaksetuju: [],
              fields: [
                {label: 'No',key:'No', sortable: true},
                {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
                {label: 'No Permohonan',key: 'NoReference', sortable: true},
                {label: 'Nama Pemohon',key: 'FullName', sortable: true},
                {label: 'Referensi',key: 'Reference', sortable: true},
                {label: 'Instansi',key: 'Instance', sortable: true},
                {label: 'Kegiatan',key: 'Activity', sortable: true},
                {label: 'Kota',key: 'Dist_code', sortable: true},
                {label: 'Nilai Pengajuan',key: 'Amount', sortable: true,tdClass: 'positionRight'},
                // {key:'aksi'}
              ],
              fields_selesaiapproval:[
                 {label: 'No',key:'No', sortable: true},
                  {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
                  {label: 'No Permohonan',key: 'NoReference', sortable: true},
                  {label: 'Nama Pemohon',key: 'FullName', sortable: true},
                  {label: 'Referensi',key: 'Reference', sortable: true},
                  {label: 'Instansi',key: 'Instance', sortable: true},
                  {label: 'Kegiatan',key: 'Activity', sortable: true},
                  {label: 'Kota',key: 'Dist_code', sortable: true},
                  {label: 'Nilai yang disetujui',key: 'RecomendationValue', sortable: true,tdClass: 'positionRight'},
                  // {key:'aksi'}
              ],
              fields_tidaksetuju:[
                 {label: 'No',key:'No', sortable: true},
                  {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
                  {label: 'No Permohonan',key: 'NoReference', sortable: true},
                  {label: 'Nama Pemohon',key: 'FullName', sortable: true},
                  {label: 'Referensi',key: 'Reference', sortable: true},
                  {label: 'Instansi',key: 'Instance', sortable: true},
                  {label: 'Tahap',key: 'Tahap', sortable: true},
                  {label: 'Kota',key: 'Dist_code', sortable: true},
                  {label: 'Nilai yang tidak disetujui',key: 'Value', sortable: true,tdClass: 'positionRight'},
                  // {key:'aksi'}
              ],
              fields_approval: [
                {label: 'No',key:'No', sortable: true},
                {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
                {label: 'No Permohonan',key: 'NoReference', sortable: true},
                {label: 'Nama Pemohon',key: 'FullName', sortable: true},
                {label: 'Referensi',key: 'Reference', sortable: true},
                {label: 'Instansi',key: 'Instance', sortable: true},
                {label: 'Kegiatan',key: 'Activity', sortable: true},
                {label: 'Kota',key: 'Dist_code', sortable: true},
                {label: 'Nilai Rekomendasi',key: 'Value', sortable: true,tdClass: 'positionRight'},
                // {key:'aksi'}
              ],
              // fields_approvalPK: [
              //   {label: 'No',key:'No', sortable: true},
              //   {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
              //   {label: 'No Permohonan',key: 'NoReference', sortable: true},
              //   {label: 'Nama Pemohon',key: 'FullName', sortable: true},
              //   {label: 'Referensi',key: 'Reference', sortable: true},
              //   {label: 'Nama Usaha',key: 'Instance', sortable: true},
              //   // {label: 'Kegiatan',key: 'Activity', sortable: true},
              //   {label: 'Kota',key: 'Dist_code', sortable: true},
              //   {label: 'Nilai Rekomendasi',key: 'Value', sortable: true,thStyle: { textAlign : 'right'}},
              //   // {key:'aksi'}
              // ],
                tabIndex: [0, 0],
                tabs: [
                    'Daftar Permohonan',
                    // 'Daftar Permohonan PK',
                    'Daftar Penilaian ',
                    // 'Daftar Penilaian PK',
                    'Daftar Persetujuan',
                    // 'Daftar Persetujuan PK',
                    'Daftar Sudah Disetujui',

                    'Daftar Tidak Disetujui',
                    // 'Daftar Sudah Disetujui PK',
                ],
                perPage_tambah_permohonan: 10,
                currentPage_tambah_permohonan: 1,
                perPage_tambah_permohonanPK: 10,
                currentPage_tambah_permohonanPK: 1,

                perPage_tambah_penilaian: 10,
                currentPage_tambah_penilaian: 1,
                perPage_tambah_penilaianPK: 10,
                currentPage_tambah_penilaianPK: 1,

                perPage_tambah_persetujuan: 10,
                currentPage_tambah_persetujuan: 1,
                perPage_tambah_persetujuanPK: 10,
                currentPage_tambah_persetujuanPK: 1,

                perPage_tambah_sudahpersetujuan: 10,
                currentPage_tambah_sudahpersetujuan: 1,
                perPage_tambah_sudahpersetujuanPK: 10,
                currentPage_tambah_sudahpersetujuanPK: 1,

                 perPage_tambah_tidaksetuju: 10,
                currentPage_tambah_tidaksetuju: 1,
            }
        },
        async created() {
          var hasil = this.IsRole('BL.Permohonan.Add')
          console.log("IsRole", hasil)
          this.username = localStorage.username
          this.cabang = localStorage.cabang
          console.log("Cabang",this.cabang)
          console.log(localStorage.username)
          this.getAllDebitorBL()
          // this.getAllDebitorPK()
             this.getAllDebitorApprove("Kepala Cabang")
              // this.getAllDebitorApprovePK("Kepala Cabang")
              this.getAllDebitorJoinDebitAccountTidakSetuju()
            this.getAllDebitorJoinDebitAccountDebitor("Staff Pusat")
             this.getAllDebitorJoinDebitAccountDebitor("Kepala Cabang")

          if(this.IsRole('BL.Permohonan.Edit')){
            this.fields.push({key:'aksi'})
          }
          if(this.IsRole('BL.Permohonan.Edit') || this.IsRole('BL.Penilaian.Edit')  || this.IsRole('BL.Persetujuan.Edit') ){
             this.fields_selesaiapproval.push({key:'aksi'})
             this.fields_approval.push({key:'aksi'})
          }
          // if(localStorage.username == "Staff Pusat"){
          //   // this.getAllDebitorJoinDebitAccountDebitor("Staff Pusat")
          //   //  this.getAllDebitorJoinDebitAccountDebitor("Kepala Cabang")
          //   // this.getAllDebitorJoinDebitAccountDebitorPK("Staff Pusat")
          //   // this.getAllDebitorJoinDebitAccountDebitorPK("Kepala Cabang")
          //    // this.getAllDebitorJoinDebitAccountDebitorApprove("Staff Pusat")
          //    //  this.getAllDebitorJoinDebitAccountDebitorApprovePK("Staff Pusat")
          //   this.fields.push({key:'aksi'})
          //    this.fields_approval.push({key:'aksiSp'})
          //    // this.fields_approvalPK.push({key:'aksiSp'})
          //    this.fields_selesaiapproval.push({key:'aksiSp'})
          // }else{
          //   // this.getAllDebitorJoinDebitAccountDebitor("Staff Pusat")
          //   // this.getAllDebitorJoinDebitAccountDebitorPK("Staff Pusat")
          //    // this.getAllDebitorJoinDebitAccountDebitor("Kepala Cabang")
          //   // this.getAllDebitorJoinDebitAccountDebitorPK("Kepala Cabang")
          //    this.fields_approval.push({key:'aksi'})
          //    // this.fields_approvalPK.push({key:'aksi'})
          //    this.fields_selesaiapproval.push({key:'aksi'})
          // }
        },
        computed: {
          rows_tambah_permohonan() {
            return this.items_permohonan.length
          },
          //  rows_tambah_permohonanPK() {
          //   return this.items_permohonanPK.length
          // },

          rows_tambah_penilaian() {
            return this.items_penilaian.length
          },
          // rows_tambah_penilaianPK() {
          //   return this.items_penilaianPK.length
          // },

         rows_tambah_persetujuan() {
            return this.items_persetujuan.length
          },
          // rows_tambah_persetujuanPK() {
          //   return this.items_persetujuanPK.length
          // },

         rows_tambah_sudahpersetujuan() {
            return this.items_sudahpersetujuan.length
          },
          // rows_tambah_sudahpersetujuanPK() {
          //   return this.items_sudahpersetujuanPK.length
          // },

           rows_tambah_tidaksetuju() {
            return this.items_tidaksetuju.length
          }

        },
        mounted() {
          // Set the initial number of items
          this.rows_tambah_permohonan = this.items_permohonan.length
          // this.rows_tambah_permohonanPK = this.items_permohonanPK.length

          this.rows_tambah_penilaian = this.items_penilaian.length
          // this.rows_tambah_penilaianPK = this.items_penilaianPK.length

          this.rows_tambah_persetujuan = this.items_persetujuan.length
          // this.rows_tambah_persetujuanPK = this.items_persetujuanPK.length

          this.rows_tambah_sudahpersetujuan = this.items_sudahpersetujuan.length
          // this.rows_tambah_sudahpersetujuanPK = this.items_sudahpersetujuanPK.length

          this.rows_tambah_tidaksetuju = this.items_tidaksetuju.length
        },
         methods: {
           async saveUpload(){
            let formData = new FormData();
            formData.append('file', this.upload);
            formData.append('CreatedBy', this.username);
             let saveFile = await apiImport.create(formData)
             console.log(saveFile)
             alert("Berhasil Upload")
           },
          async getAllDebitorJoinDebitAccountDebitor(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitor(posisi,this.cabang)

                   console.log(dataTable)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
                  }
                  if(dataTable.Data[i].Value){
                    dataTable.Data[i].Value = this.formatCurrency(dataTable.Data[i].Value,"Rp.")
                  }
                   if(dataTable.Data[i].Amount){
                      dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
                    }
               }
                if(posisi == "Staff Pusat"){
                  this.items_penilaian = dataTable.Data
                }else{
                  this.items_persetujuan = dataTable.Data
                }

          },
          // async getAllDebitorJoinDebitAccountDebitorPK(posisi) {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorPK(posisi)

          //          console.log(dataTable)
          //      for (var i = 0; i < dataTable.Data.length; i++) {
          //         dataTable.Data[i].No = i + 1
          //         if(dataTable.Data[i].DateProposal){
          //           dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
          //         }
          //         if(dataTable.Data[i].Value){
          //           dataTable.Data[i].Value = this.formatCurrency(dataTable.Data[i].Value,"Rp.")
          //         }
          //          if(dataTable.Data[i].Amount){
          //             dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
          //           }
          //      }
          //      if(posisi == "Staff Pusat"){
          //         // this.items_penilaianPK = dataTable.Data
          //       }else{
          //        // this.items_persetujuanPK = dataTable.Data
          //       }

          // },
           async getAllDebitorJoinDebitAccountDebitorApprove(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorApprove(posisi,this.cabang)

                   console.log(dataTable)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
                  }
                  if(dataTable.Data[i].Value){
                    dataTable.Data[i].Value = this.formatCurrency(dataTable.Data[i].Value,"Rp.")
                  }
                   if(dataTable.Data[i].Amount){
                      dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
                    }
               }
                if(posisi == "Staff Pusat"){
                  this.items_persetujuan = dataTable.Data
                }else{
                  this.items_penilaian = dataTable.Data
                }

          },
          // async getAllDebitorJoinDebitAccountDebitorApprovePK(posisi) {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorPKApprove(posisi)

          //          console.log(dataTable)
          //      for (var i = 0; i < dataTable.Data.length; i++) {
          //         dataTable.Data[i].No = i + 1
          //         if(dataTable.Data[i].DateProposal){
          //           dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
          //         }
          //         if(dataTable.Data[i].Value){
          //           dataTable.Data[i].Value = this.formatCurrency(dataTable.Data[i].Value,"Rp.")
          //         }
          //          if(dataTable.Data[i].Amount){
          //             dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
          //           }
          //      }
          //      if(posisi == "Staff Pusat"){
          //        this.items_persetujuanPK = dataTable.Data
          //       }else{
          //         this.items_penilaianPK = dataTable.Data
          //       }

          // },
          async getAllDebitorApprove(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorApprove(posisi,this.cabang)

                   console.log(dataTable)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
                  }
                  if(dataTable.Data[i].RecomendationValue){
                    dataTable.Data[i].RecomendationValue = this.formatCurrency(dataTable.Data[i].RecomendationValue,"Rp.")
                  }
               }
                this.items_sudahpersetujuan = dataTable.Data
          },
          // async getAllDebitorApprovePK(posisi) {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorPKApprove(posisi)

          //          console.log(dataTable)
          //      for (var i = 0; i < dataTable.Data.length; i++) {
          //         dataTable.Data[i].No = i + 1
          //         if(dataTable.Data[i].DateProposal){
          //           dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
          //         }
          //         if(dataTable.Data[i].RecomendationValue){
          //           dataTable.Data[i].RecomendationValue = this.formatCurrency(dataTable.Data[i].RecomendationValue,"Rp.")
          //         }
          //      }
          //         this.items_sudahpersetujuanPK = dataTable.Data
          //       console.log(dataTable.Data)

          // },
          async getAllDebitorBL() {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorPermohonan(0,this.cabang)
               if(dataTable != null){
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
               }
          },
          // async getAllDebitorPK() {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorPermohonan(1)
          //      if(dataTable != null){
          //      for (var i = 0; i < dataTable.Data.length; i++) {
          //         dataTable.Data[i].No = i + 1
          //         if(dataTable.Data[i].DateProposal){
          //           dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
          //         }
          //         if(dataTable.Data[i].Amount){
          //           dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
          //         }
          //      }
          //       this.items_permohonanPK = dataTable.Data
          //       console.log(dataTable)
          //     }
          // },

           async getAllDebitorJoinDebitAccountTidakSetuju(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountTidakSetuju(this.cabang)

                   console.log("TIDAK Disetujui",dataTable)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].DateProposal){
                    dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
                  }
                  // if(dataTable.Data[i].RecomendationValue){
                  //   dataTable.Data[i].RecomendationValue = this.formatCurrency(dataTable.Data[i].Value,"Rp.")
                  // }
                   if(dataTable.Data[i].Value){
                      dataTable.Data[i].Value = this.formatCurrency(dataTable.Data[i].Value,"Rp.")
                    }
                    if(dataTable.Data[i].Pos_Name == 'Staff Pusat'){
                      dataTable.Data[i].Tahap = "Peninjauan"
                    }
                    if (dataTable.Data[i].Pos_Name == 'Kepala Cabang') {
                         dataTable.Data[i].Tahap = "Persetujuan"
                    }
               }

                  this.items_tidaksetuju = dataTable.Data

          },
          async addPengajuan() {
            this.klik = true
              this.loading = true
              this.dataTableDeb.Search = this.cabang
              this.dataTableDA.Search = 'BL' + this.cabang
              this.dataTableReference.Search = 'BL.'+new Date().getFullYear()+'/KPT.'

              this.dataTableDeb.Start =  this.dataTableDeb.Search.length + 1
              this.dataTableDA.Start =  this.dataTableDA.Search.length + 1
              this.dataTableReference.Start = this.dataTableReference.Search.length + 1
              // var codeDebCode = {}
              // this.getCount(this.dataTableDeb).then(out =>{
              //   codeDebCode['number'] = out
              // })
             var codeDebCode = await this.getCount(this.dataTableDeb)
              var codeDACode = await this.getCount(this.dataTableDA)
              var codeReference =  await this.getCount(this.dataTableReference)
              // this.permohonan.DebCode = 'BL'+autoincDebitor.Total
              this.permohonan.DebCode = codeDebCode
               this.debitAccount.DACode = codeDACode
                this.debitAccount.DebCode =  this.permohonan.DebCode
                 this.debitAccount.CreatedBy =  this.username
                this.debitAccountState.DACode = this.debitAccount.DACode
                 this.debitAccountState.CreatedBy = this.username
              this.permohonan.WACode = this.cabang
              this.permohonan.CreatedBy = this.username
              // var autoincDebitor = await dynamic.getCount('debitor/CountByDebcCode')
              // this.permohonan.NoReference = 'BL.'+new Date().getFullYear()+'/KPT.'+autoincDebitor.Total
              this.permohonan.NoReference = codeReference
              console.log("Data Reference",this.permohonan)

              let data = await apiDebitor.create(this.permohonan)
              let dataDebAccount = await apiDebitAccount.create(this.debitAccount)
              let dataDebitAccountState = await apiDebitAccountState.create(this.debitAccountState)
              this.loading = false
              this.showNotif(dataDebitAccountState,'Permohonan')
              this.$router.push('/bussiness-process-desaigner/workflow-initialization-form2/'+this.permohonan.DebCode)
          },

          onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.rows_tambah_permohonan = filteredItems.length
            this.currentPage_tambah_permohonan = 1

            // this.rows_tambah_permohonanPK = filteredItems.length
            // this.currentPage_tambah_permohonanPK = 1

            this.rows_tambah_penilaian = filteredItems.length
            this.currentPage_tambah_penilaian = 1

            // this.rows_tambah_penilaianPK = filteredItems.length
            // this.currentPage_tambah_penilaianPK = 1

            this.rows_tambah_persetujuan = filteredItems.length
            this.currentPage_tambah_persetujuan = 1

            // this.rows_tambah_persetujuanPK = filteredItems.length
            // this.currentPage_tambah_persetujuanPK = 1

             this.rows_tambah_tidaksetuju = filteredItems.length
            this.currentPage_tambah_tidaksetuju = 1
          },

         }
    }
</script>
