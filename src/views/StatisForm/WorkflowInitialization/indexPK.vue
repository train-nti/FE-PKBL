<style type="text/css">
  tr th{
      /*width:1%;*/
      white-space:nowrap;
  }
  .custom-file-input:lang(en) ~ .custom-file-label::after {
    content: 'Pilih';
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
                    <b-col md="6" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                           <b-form-file   placeholder="Pilih file..." v-model="upload"></b-form-file>
                          <b-input-group-append>
                           <b-button variant="primary" v-on:click="saveUpload()">Unggah</b-button>
                           <!-- <a :href="item.loc" download target="_blank" v-if="item.loc" >Download Hasil</a> -->
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    </b-row>
                    <div style="text-align: right;">
                      <a :href="globalEnv.server == 'pertamina' ? 'pkbl_online/static/template/ImportPencairan.xlsx' : 'static/template/ImportPencairan.xlsx'"  class="btn btn-primary" download>Template Pencairan</a>
                       <!-- <a href="https://drive.google.com/uc?export=view&id=1guFa5ZsdwCY3gYz5XKR9HH6UNTp-8pAH" class="btn btn-primary" download>Template Pencairan</a> -->
                       <!--  <a href="https://drive.google.com/uc?export=view&id=12Lty__yziJN9v3d3XfjbJYfjDd43QLZO" class="btn btn-primary" download>Template Pembayaran</a>  -->
                    </div>
                    <div style="text-align: right;" v-if="IsRole('PK.Penerimaan.Add')">
                       <b-button type="button" size="md" variant="primary" v-on:click="addPengajuan()" :disabled="klik">Pengajuan</b-button>
                    <!--   <router-link class="btn btn-primary" to="/bussiness-process-desaigner/workflow-initialization-formpk2"> <i class="icon-plus"></i>  Pengajuan  </router-link>  -->
                    <!--   <router-link class="btn btn-primary" to="/bussiness-process-desaigner/workflow-initialization-form2"> <i class="icon-plus"></i>  Pengajuan BL  </router-link>  -->
                    </div>
                      <b-row>
                        <br>
                        <b-col sm="12">
                            <b-tabs class="full-widths" v-model="tabIndex[0]">

                             <!--  <b-tab active >
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
                                  :per-page="perPage_tambah_permohonan"
                                  :current-page="currentPage_tambah_permohonan"
                                  :items="items_permohonan"
                                  :filter="filter"
                                   @filtered="onFiltered">
                                    <template slot="aksi" slot-scope="data">
                                       <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-pencil"></i> </router-link>
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
 -->
                              <b-tab>
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[0]}}
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
                                       <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }" v-if="IsRole('PK.Penerimaan.Edit')"> <i class="icon-check"></i> Permohonan</router-link>

                                       <!--  <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,Mode:'Ubah'} }"> <i class="icon-pencil"></i> Permohonan</router-link>  -->
                                    </template>
                                  </b-table>
                                  <b-pagination
                                  v-model="currentPage_tambah_permohonanPK"
                                  :total-rows="rows_tambah_permohonanPK"
                                  :per-page="perPage_tambah_permohonanPK"
                                  aria-controls="tambah_permohonanPK"></b-pagination>
                                </b-col>
                              </b-row>
                              </b-tab>

                              <!--  <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[2]}}
                                  </template>
                                  <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_penilaian"
                                      :fields="fields"
                                      caption=""
                                      :per-page="perPage_tambah_penilaian"
                                      :current-page="currentPage_tambah_penilaian"
                                      :items="items_penilaian"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                           <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link>
                                        </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_penilaian" :total-rows="rows_tambah_penilaian" :per-page="perPage_tambah_penilaian" aria-controls="tambah_penilaian"></b-pagination>
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
                                      id="tambah_penilaianPK"
                                      :fields="fields"
                                      caption=""
                                      :per-page="perPage_tambah_penilaianPK"
                                      :current-page="currentPage_tambah_penilaianPK"
                                      :items="items_penilaianPK"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                           <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }" v-if="IsRole('PK.Penilaian.Edit')"><i class="icon-check"></i> Penilaian</router-link>

                                          <!--  <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'Ubah'} }"><i class="icon-pencil"></i> Penilaian</router-link> -->

                                           <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,Mode:'Ubah'} }" v-if="IsRole('PK.Penerimaan.Edit')"> <i class="icon-pencil"></i> Permohonan</router-link>
                                        </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_penilaianPK" :total-rows="rows_tambah_penilaianPK" :per-page="perPage_tambah_penilaianPK" aria-controls="tambah_penilaianPK"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab>

                            <!--   <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[4]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_persetujuan"
                                      :fields="fields_approval"
                                      caption=""
                                      :per-page="perPage_tambah_persetujuan"
                                      :current-page="currentPage_tambah_persetujuan"
                                      :items="items_persetujuan"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                              <router-link class="btn btn-primary" :to="{ name: 'Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link>
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_persetujuan" :total-rows="rows_tambah_persetujuan" :per-page="perPage_tambah_persetujuan" aria-controls="tambah_persetujuan"></b-pagination>
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
                                      id="tambah_persetujuanPK"
                                      :fields="fields_approvalPK"
                                      caption=""
                                      :sort-compare="sortDateTable"
                                      :per-page="perPage_tambah_persetujuanPK"
                                      :current-page="currentPage_tambah_persetujuanPK"
                                      :items="items_persetujuanPK"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                              <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,Mode:'Ubah'} }" v-if="IsRole('PK.Penerimaan.Edit')  "> <i class="icon-pencil" ></i> Permohonan</router-link>

                                               <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'UbahPn'} }" v-if="IsRole('PK.Penilaian.Edit')  "><i class="icon-pencil"></i> Penilaian</router-link>
                                         <!--  </template>
                                        <template slot="aksi" slot-scope="data"> -->
                                              <router-link class="btn btn-primary" :to="{ name: 'Approval PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }" v-if="IsRole('PK.Persetujuan.Edit')  "><i class="icon-check"></i> Persetujuan</router-link>

                                               <!-- router-link class="btn btn-primary" :to="{ name: 'Approval PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'Ubah'} }"><i class="icon-pencil"></i> Persetujuan</router-link> -->
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_persetujuanPK" :total-rows="rows_tambah_persetujuanPK" :per-page="perPage_tambah_persetujuanPK" aria-controls="tambah_persetujuanPK"></b-pagination>
                                    </b-col>
                                  </b-row>
                              </b-tab>

                              <!--  <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[6]}}
                                  </template>
                                <b-row>
                                    <b-col sm="12">
                                      <b-table
                                      class="table-responsive"
                                      id="tambah_sudahpersetujuan"
                                      :fields="fields_selesaiapproval"
                                      caption=""
                                      :per-page="perPage_tambah_sudahpersetujuan"
                                      :current-page="currentPage_tambah_sudahpersetujuan"
                                      :items="items_sudahpersetujuan"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                              <router-link class="btn btn-primary" :to="{ name: 'Approval', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID} }"><i class="icon-check"></i></router-link>
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_sudahpersetujuan" :total-rows="rows_tambah_sudahpersetujuan" :per-page="perPage_tambah_sudahpersetujuan" aria-controls="tambah_sudahpersetujuan"></b-pagination>
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
                                      id="tambah_sudahpersetujuanPK"
                                      :fields="fields_selesaiapproval"
                                      caption=""
                                      :sort-compare="sortDateTable"
                                      :per-page="perPage_tambah_sudahpersetujuanPK"
                                      :current-page="currentPage_tambah_sudahpersetujuanPK"
                                      :items="items_sudahpersetujuanPK"
                                      :filter="filter"
                                       @filtered="onFiltered">
                                        <template slot="aksi" slot-scope="data">
                                              <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,Mode:'Ubah'} }" v-if="IsRole('PK.Penerimaan.Edit')  "> <i class="icon-pencil"></i> Permohonan</router-link>

                                               <router-link class="btn btn-primary" :to="{ name: 'Form Review And Approval PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'UbahPn'} }" v-if="IsRole('PK.Penilaian.Edit')  "><i class="icon-pencil"></i> Penilaian</router-link>
                                         <!--  </template>
                                        <template slot="aksi" slot-scope="data"> -->
                                           <router-link class="btn btn-primary" :to="{ name: 'Approval PK Ubah', params: {DebCode:data.item.DebCode,DACode:data.item.DACode,AppWorkCode:data.item.AppWorkflow_ID,Mode:'UbahApp'} }" v-if="IsRole('PK.Persetujuan.Edit')  "><i class="icon-pencil"></i> Persetujuan</router-link>
                                          </template>
                                      </b-table>
                                      <b-pagination v-model="currentPage_tambah_sudahpersetujuanPK" :total-rows="rows_tambah_sudahpersetujuanPK" :per-page="perPage_tambah_sudahpersetujuanPK" aria-controls="tambah_sudahpersetujuanPK"></b-pagination>
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
                                        id="tambah_tidaksetujuPK"
                                        :fields="fields_tidaksetuju"
                                        caption=""
                                        :sort-compare="sortDateTable"
                                        :per-page="perPage_tambah_tidaksetujuPK"
                                        :current-page="currentPage_tambah_tidaksetujuPK"
                                        :items="items_tidaksetujuPK"
                                        :filter="filter"
                                         @filtered="onFiltered">
                                        </b-table>
                                        <b-pagination v-model="currentPage_tambah_tidaksetujuPK" :total-rows="rows_tambah_tidaksetujuPK" :per-page="perPage_tambah_tidaksetujuPK" aria-controls="tambah_tidaksetujuPK"></b-pagination>
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
  import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
  import apiDebitor from '@/api/PK/DebitorApiService'
  import apiImport from '@/api/PK/ImportApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiApprovalWorkflow from '@/api/BL/ApprovalWorkflowApiService';
  import apiDebitorCollaterall from '@/api/PK/DebitorCollaterallApiService';
  import apiDebGuarantor from '@/api/PK/DebGuarantorApiService';
  import apiDebitorEmerg from '@/api/PK/DebitorEmergApiService';
  import apiDebitorVenture from '@/api/PK/DebitorVentureApiService';
  import apiDebProfession from '@/api/PK/DebProfessionApiService';
  import apiPKSector from '@/api/PK/PKSectorApiService';
  import apiIncomeData from '@/api/PK/IncomeDataApiService';
  import apiAppBankData from '@/api/PK/AppBankDataApiService';
    export default {
         data() {
            return {
              loading:false,
              klik:false,
              cabang:null,
              item:{
                loc: null
              },
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
              debitAccountState:{
                CreatedDate: new Date(),
                CreatedValue: 0
              },
              dataTableReference: {
                Colum: "NoReference",
                Table: "Debitor",
                Start: 0,
                Search: null
              },
              AppBankData:{
                 DebCode: null
               },
              IncomeData:{
                 DebCode: null
               },
              debProfession1:{
                 DebCode: null,
                 DebProfessionID:null,
              },
              debProfession2:{
                 DebCode: null,
                 DebProfessionID:null,
              },
              debitorEmerg1:{
                DebCode: null,
                Job:'Karyawan',
                isAddressDeb:true,
                DateofBirth: this.formatDate(new Date()),
              },
              debitorEmerg2:{
                 DebCode: null,
                isAddressDeb:false,
              },
              debitor:{
                Prov_code: null,
                Dist_code: null,
                Subdis_code: null,
                KTPProv_code: null,
                KTPDist_code: null,
                KTPSubdis_code: null,
                DebCode: null,
                DateRegistration:new Date(),
                DateProposal:new Date(),
                Flag:1,
                Gender:true,
                MaritalStatus:1,
                TypeOfWork:'Karyawan',
                HomeOwnStatus:'Milik sendiri',
                DateofBirth: this.formatDate(new Date()),
                ActiveUntil: new Date()
              },
              debitorVenture:{
                 DebCode: null,
                DistributionPattern: 'Perseorangan',
                LoanPrinciple: 'Konvensional',
              },
              debGuarantor:{
                 DebCode: null,
              },
              debitorCollaterall:{
                 DebCode: null,
                SHMStatus: 'Hak Milik',
                CollateralStatus:'milik sendiri',
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
              username:null,
              filter: null,
              // items_penilaian: [],
              items_penilaianPK: [],
              // items_persetujuan: [],
              items_persetujuanPK: [],
               // items_sudahpersetujuan: [],
              items_sudahpersetujuanPK: [],
              // items_permohonan: [],
              items_permohonanPK: [],
              items_tidaksetujuPK: [],
              fields: [
                {label: 'No',key:'No', sortable: true},
                // {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
                {label: 'No Permohonan',key: 'NoReference', sortable: true},
                {label: 'Nama Pemohon',key: 'FullName', sortable: true},
                {label: 'Referensi',key: 'Reference', sortable: true},
                {label: 'Instansi',key: 'Instance', sortable: true},
                {label: 'Sektor Usaha',key: 'SectorName', sortable: true},
                {label: 'Kota',key: 'District', sortable: true},
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
                  {label: 'Sektor Usaha',key: 'SectorName', sortable: true},
                  {label: 'Kota',key: 'District', sortable: true},
                  {label: 'Nilai yang disetujui',key: 'RecomendationValue', sortable: true,tdClass: 'positionRight'},
              ],
              // fields_approval: [
              //   {label: 'No',key:'No', sortable: true},
              //   {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
              //   {label: 'No Permohonan',key: 'NoReference', sortable: true},
              //   {label: 'Nama Pemohon',key: 'FullName', sortable: true},
              //   {label: 'Referensi',key: 'Reference', sortable: true},
              //   {label: 'Instansi',key: 'Instance', sortable: true},
              //   {label: 'Sektor Usaha',key: 'Activity', sortable: true},
              //   {label: 'Kota',key: 'Dist_code', sortable: true},
              //   {label: 'Nilai Rekomendasi',key: 'Value', sortable: true,thStyle: { textAlign : 'right'}},
              //   // {key:'aksi'}
              // ],
              fields_approvalPK: [
                {label: 'No',key:'No', sortable: true},
                {label: 'Tanggal Permohonan',key: 'DateProposal', sortable: true},
                {label: 'No Permohonan',key: 'NoReference', sortable: true},
                {label: 'Nama Pemohon',key: 'FullName', sortable: true},
                {label: 'Referensi',key: 'Reference', sortable: true},
                {label: 'Nama Usaha',key: 'Instance', sortable: true},
                {label: 'Sektor Usaha',key: 'SectorName', sortable: true},
                {label: 'Kota',key: 'District', sortable: true},
                {label: 'Nilai Rekomendasi',key: 'Value', sortable: true,tdClass: 'positionRight'},
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
                  {label: 'Kota',key: 'District', sortable: true},
                  {label: 'Nilai yang tidak disetujui',key: 'Value', sortable: true,tdClass: 'positionRight'},
                  // {key:'aksi'}
              ],
                tabIndex: [0, 0],
                tabs: [
                    // 'Daftar Permohonan BL',
                    'Daftar Permohonan ',
                    // 'Daftar Penilaian BL',
                    'Daftar Penilaian',
                    // 'Daftar Persetujuan BL',
                    'Daftar Persetujuan',
                    // 'Daftar Sudah Disetujui BL',
                    'Daftar Sudah Disetujui',

                    'Daftar Tidak Disetujui',
                ],
                // perPage_tambah_permohonan: 10,
                // currentPage_tambah_permohonan: 1,
                perPage_tambah_permohonanPK: 10,
                currentPage_tambah_permohonanPK: 1,

                // perPage_tambah_penilaian: 10,
                // currentPage_tambah_penilaian: 1,
                perPage_tambah_penilaianPK: 10,
                currentPage_tambah_penilaianPK: 1,

                // perPage_tambah_persetujuan: 10,
                // currentPage_tambah_persetujuan: 1,
                perPage_tambah_persetujuanPK: 10,
                currentPage_tambah_persetujuanPK: 1,

                // perPage_tambah_sudahpersetujuan: 10,
                // currentPage_tambah_sudahpersetujuan: 1,
                perPage_tambah_sudahpersetujuanPK: 10,
                currentPage_tambah_sudahpersetujuanPK: 1,

                 perPage_tambah_tidaksetujuPK: 10,
                currentPage_tambah_tidaksetujuPK: 1,
            }
        },
        async created() {
          console.log(localStorage.username)
           this.username = localStorage.username
          this.cabang = localStorage.cabang
          // this.getAllDebitorBL()
          this.getAllDebitorPK()
             // this.getAllDebitorApprove("Kepala Cabang")
              this.getAllDebitorApprovePK("Kepala Cabang")
              this.getAllDebitorJoinDebitAccountTidakSetujuPK()
            this.getAllDebitorJoinDebitAccountDebitorPK("Kepala Cabang")
            this.getAllDebitorJoinDebitAccountDebitorPK("Staff Pusat")
          if(this.IsRole('PK.Penerimaan.Edit')  ){
            this.fields.push({key:'aksi'})
          }
          if(this.IsRole('PK.Penerimaan.Edit') || this.IsRole('PK.Penilaian.Edit')  || this.IsRole('PK.Persetujuan.Edit') ){
             this.fields_selesaiapproval.push({key:'aksi'})
             this.fields_approvalPK.push({key:'aksi'})
          }

          // if(localStorage.username == "Staff Pusat"){
          //   // this.getAllDebitorJoinDebitAccountDebitor("Staff Pusat")
          //    // this.getAllDebitorJoinDebitAccountDebitor("Kepala Cabang")
          //    // this.getAllDebitorJoinDebitAccountDebitorApprove("Staff Pusat")
          //    //  this.getAllDebitorJoinDebitAccountDebitorApprovePK("Staff Pusat")
          //   this.fields.push({key:'aksi'})
          //    this.fields_approvalPK.push({key:'aksiSp'})
          //    this.fields_selesaiapproval.push({key:'aksiSp'})
          // }else{
          //   // this.getAllDebitorJoinDebitAccountDebitor("Staff Pusat")
          //   // this.getAllDebitorJoinDebitAccountDebitorPK("Staff Pusat")
          //    // this.getAllDebitorJoinDebitAccountDebitor("Kepala Cabang")
          //   // this.getAllDebitorJoinDebitAccountDebitorPK("Kepala Cabang")
          //    // this.fields_approval.push({key:'aksi'})
          //    this.fields_approvalPK.push({key:'aksi'})
          //    this.fields_selesaiapproval.push({key:'aksi'})
          // }
        },
        // watch:{
        //   currentPage_tambah_permohonanPK(){
        //     console.log(this.currentPage_tambah_permohonanPK);
        //     this.getAllDebitorPK()
        //
        //   }
        // },
        computed: {
          // rows_tambah_permohonan() {
          //   return this.items_permohonan.length
          // },
           rows_tambah_permohonanPK() {
            return 226
          },

          // rows_tambah_penilaian() {
          //   return this.items_penilaian.length
          // },
          rows_tambah_penilaianPK() {
            return this.items_penilaianPK.length
          },

         // rows_tambah_persetujuan() {
         //    return this.items_persetujuan.length
         //  },
          rows_tambah_persetujuanPK() {
            return this.items_persetujuanPK.length
          },

         // rows_tambah_sudahpersetujuan() {
         //    return this.items_sudahpersetujuan.length
         //  },
          rows_tambah_sudahpersetujuanPK() {
            return this.items_sudahpersetujuanPK.length
          },

           rows_tambah_tidaksetujuPK() {
            return this.items_tidaksetujuPK.length
          }

        },
        mounted() {
          // Set the initial number of items
          // this.rows_tambah_permohonan = this.items_permohonan.length
          this.rows_tambah_permohonanPK = this.items_permohonanPK.length

          // this.rows_tambah_penilaian = this.items_penilaian.length
          this.rows_tambah_penilaianPK = this.items_penilaianPK.length

          // this.rows_tambah_persetujuan = this.items_persetujuan.length
          this.rows_tambah_persetujuanPK = this.items_persetujuanPK.length

          // this.rows_tambah_sudahpersetujuan = this.items_sudahpersetujuan.length
          this.rows_tambah_sudahpersetujuanPK = this.items_sudahpersetujuanPK.length

          this.rows_tambah_tidaksetujuPK = this.items_tidaksetujuPK.length
        },
         methods: {
           async saveUpload(){
             this.loading = true
            let formData = new FormData();
            formData.append('file', this.upload);
            formData.append('CreatedBy', this.username);
             let saveFile = await apiImport.create(formData)
             this.loading = false
             this.item.loc = String(saveFile)
              // window.open(String(saveFile), "_blank")
             console.log(saveFile)
              this.$notify({
                group: 'notif-response',
                title: 'Operation Success',
                text:  ' Data Successfully Processed',
                type: 'success'
              });
             // alert("Berhasil Upload")
           },
          // async getAllDebitorJoinDebitAccountDebitor(posisi) {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitor(posisi)

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
          //       if(posisi == "Staff Pusat"){
          //         this.items_penilaian = dataTable.Data
          //       }else{
          //         this.items_persetujuan = dataTable.Data
          //       }

          // },
          async getAllDebitorJoinDebitAccountDebitorPK(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorPK(posisi,this.cabang)

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
                  this.items_penilaianPK = dataTable.Data
                }else{
                 this.items_persetujuanPK = dataTable.Data
                }

          },
          //  async getAllDebitorJoinDebitAccountDebitorApprove(posisi) {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorApprove(posisi)

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
          //       if(posisi == "Staff Pusat"){
          //         this.items_persetujuan = dataTable.Data
          //       }else{
          //         this.items_penilaian = dataTable.Data
          //       }

          // },
          async getAllDebitorJoinDebitAccountDebitorApprovePK(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorPKApprove(posisi,this.cabang)

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
                 this.items_persetujuanPK = dataTable.Data
                }else{
                  this.items_penilaianPK = dataTable.Data
                }

          },
          // async getAllDebitorApprove(posisi) {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorApprove(posisi)

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
          //       this.items_sudahpersetujuan = dataTable.Data
          // },
          async getAllDebitorApprovePK(posisi) {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountDebitorPKApprove(posisi,this.cabang)

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
                  this.items_sudahpersetujuanPK = dataTable.Data
                console.log(dataTable.Data)

          },
          // async getAllDebitorBL() {
          //      var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorPermohonan(0)
          //      if(dataTable != null){
          //          for (var i = 0; i < dataTable.Data.length; i++) {
          //             dataTable.Data[i].No = i + 1
          //             if(dataTable.Data[i].DateProposal){
          //               dataTable.Data[i].DateProposal = this.formatDateDMY(dataTable.Data[i].DateProposal)
          //             }
          //             if(dataTable.Data[i].Amount){
          //               dataTable.Data[i].Amount = this.formatCurrency(dataTable.Data[i].Amount,"Rp.")
          //             }
          //          }
          //         this.items_permohonan = dataTable.Data
          //         console.log(dataTable)
          //      }
          // },
          async getAllDebitorPK() {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorPermohonan(
                                1,this.cabang,'get',this.currentPage_tambah_permohonanPK,this.perPage_tambah_permohonanPK)
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
               // this.items_permohonanPKOld = this.items_permohonanPK
                this.items_permohonanPK = dataTable.Data
                // Object.assign(this.items_permohonanPK,dataTable.Data)
                console.log(dataTable.Data);
                console.log(typeof this.items_permohonanPK)
              }
          },

          async getAllDebitorJoinDebitAccountTidakSetujuPK() {
               var dataTable = await apiDebitorJoinDebitAccountDebitor.getAllDebitorJoinDebitAccountTidakSetujuPK(this.cabang)

                   console.log("TIDAK DI SETUJUI",dataTable)
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
                  console.log("DATA TIDAK SETUJU",dataTable.Data)
                  this.items_tidaksetujuPK = dataTable.Data

          },

           async addPengajuan() {
            this.loading = true
            this.klik = true
             this.dataTableDeb.Search = this.cabang
              this.dataTableDA.Search = 'PK' + this.cabang
              this.dataTableReference.Search = new Date().getFullYear()+'.'+new Date().getMonth()+'.PK-KPO.'

              this.dataTableDeb.Start =  this.dataTableDeb.Search.length + 1
              this.dataTableDA.Start =  this.dataTableDA.Search.length + 1
              this.dataTableReference.Start = this.dataTableReference.Search.length + 1
              var codeDebCode = await this.getCount(this.dataTableDeb)
              var codeDACode = await this.getCount(this.dataTableDA)
              var codeReference =  await this.getCount(this.dataTableReference)
              console.log("Panjang Code DEB",this.dataTableDeb)
              console.log("Panjang Code DA",this.dataTableDeb)

              this.debitor.DebCode = codeDebCode
               this.debitor.WACode = this.cabang
               this.debitAccount.DACode = codeDACode
               this.debitor.NoReference = codeReference
                this.debitAccountState.DACode = this.debitAccount.DACode
              this.debitor.WACode = this.cabang
               this.debitor.CreatedBy = this.username

              this.PassingDebCode(this.debitor.DebCode)
              let data = await apiDebitor.create(this.debitor)
              this.debitorVenture.CreatedBy = this.username
            let dataDebitorVenture = await apiDebitorVenture.create(this.debitorVenture)
            this.debitAccount.CreatedBy = this.username
            let dataDebAccount = await apiDebitAccount.create(this.debitAccount)
            this.debitAccountState.CreatedBy = this.username
              let dataDebitAccountState = await apiDebitAccountState.create(this.debitAccountState)
               this.debitorCollaterall.CreatedBy = this.username
            let dataDebitorCollaterall = await apiDebitorCollaterall.create(this.debitorCollaterall)

               this.debGuarantor.CreatedBy = this.username
            let dataDebGuarantor = await apiDebGuarantor.create(this.debGuarantor)

               this.debitorEmerg1.CreatedBy = this.username
            let datadebitorEmerg1 = await apiDebitorEmerg.create(this.debitorEmerg1)

               this.debitorEmerg2.CreatedBy = this.username
            let datadebitorEmerg2 = await apiDebitorEmerg.create(this.debitorEmerg2)

               this.debProfession1.CreatedBy = this.username
            let datadebProfession1 = await apiDebProfession.create(this.debProfession1)

             // let datadebProfession2 = await apiDebProfession.create(this.debProfession2)

               this.IncomeData.CreatedBy = this.username
              let dataIncomeData = await apiIncomeData.create(this.IncomeData)

               this.AppBankData.CreatedBy = this.username
              let dataAppBankData = await apiAppBankData.create(this.AppBankData)
              this.loading = false
              this.showNotif(data,'Permohonan')
              this.$router.push('/bussiness-process-desaigner/workflow-initialization-formpk2/'+this.debitor.DebCode)
          },
           PassingDebCode(debcode){
              this.debitAccount.DebCode = debcode
              this.debProfession1.DebCode = debcode
              // this.debProfession2.DebCode = debcode
              this.debitorEmerg1.DebCode = debcode
              this.debitorEmerg2.DebCode = debcode
              this.debitorVenture.DebCode = debcode
              this.debGuarantor.DebCode = debcode
              this.debitorCollaterall.DebCode = debcode
              this.IncomeData.DebCode = debcode
              this.AppBankData.DebCode = debcode
          },

          onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            // this.rows_tambah_permohonan = filteredItems.length
            // this.currentPage_tambah_permohonan = 1

            this.rows_tambah_permohonanPK = filteredItems.length
            this.currentPage_tambah_permohonanPK = 1

            // this.rows_tambah_penilaian = filteredItems.length
            // this.currentPage_tambah_penilaian = 1

            this.rows_tambah_penilaianPK = filteredItems.length
            this.currentPage_tambah_penilaianPK = 1

            // this.rows_tambah_persetujuan = filteredItems.length
            // this.currentPage_tambah_persetujuan = 1

            this.rows_tambah_persetujuanPK = filteredItems.length
            this.currentPage_tambah_persetujuanPK = 1

            this.rows_tambah_tidaksetujuPK = filteredItems.length
            this.currentPage_tambah_tidaksetujuPK = 1
          }

         }
    }
</script>
