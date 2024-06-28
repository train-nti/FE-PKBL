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
                        <strong>Penilaian </strong>
                    </div>
                      <b-row style="margin-bottom:20px">
                        <b-col sm="12">
                          <h5> Formulir BL </h5>
                        </b-col>

                        <b-col sm="12">
                            Formulir Penilaian Bina Lingkungan
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col sm="12">
                            <b-tabs class="full-widths" v-model="tabIndex">
                              <b-tab active>
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[0]}}
                              </template>
                              <b-form-group>
                                    <label for="ccnumber">Tanggal Survey
                                      <b class="text-danger"> *</b>
                                    </label>
                                    <date-picker v-model="approvalWorkflow.AppDate" :input-attr="{ required: true }"  style="width: 100%;" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id" :class="{'is-invalid': $v.approvalWorkflow.AppDate.$error}"></date-picker>
                                    <!-- <b-form-input type="date" v-model="approvalWorkflow.AppDate" required  :class="{'is-invalid': $v.approvalWorkflow.AppDate.$error}"></b-form-input> -->
                                    <div class="text-danger" v-if="$v.approvalWorkflow.AppDate.$error">Tanggal Survey harus diisi</div>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Instansi/Lembaga
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                    <b-form-input type="text" v-model="permohonan.Instance" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Nama Pemohon
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                    <b-form-input type="text" v-model="permohonan.FullName" required disabled></b-form-input>
                               </b-form-group>
                                <b-form-group>
                                    <label for="ccnumber">Provinsi
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                    <b-form-input v-model="permohonan.Prov_code"  disabled></b-form-input>
                               </b-form-group>
                                <b-form-group>
                                    <label for="ccnumber">Kota/Kabupaten
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                    <b-form-input v-model="permohonan.Dist_code"  disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Nomor Telepon
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                    <b-form-input type="number" v-model="permohonan.Phone" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Jenis Bina Lingkungan
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                     <b-form-input type="text" v-model="permohonan.BLType" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Nilai Pengajuan
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                    <vue-numeric currency="RP." class="form-control" disabled output-type="Number" v-model="permohonan.Amount"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Nilai Rekomendasi
                                      <b class="text-danger"> *</b>
                                    </label>
                                    <money class="form-control" v-model="approvalWorkflow.RecomendationValue" v-bind="money"  :class="{'is-invalid': $v.approvalWorkflow.RecomendationValue.$error}"></money>  <div class="text-danger" v-if="$v.approvalWorkflow.RecomendationValue.$error">Nilai Rekomendasi harus diisi</div>
                                    <!--  <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="approvalWorkflow.RecomendationValue"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric> -->
                               </b-form-group>
                            <b-row>
                               <b-col sm="12">
                                <b-card>
                                    <div slot="header">
                                        <strong>Riwayat Penilaian </strong>
                                    </div>
                                    <b-row>
                                      <b-col sm="12">
                                         <b-table id="histori_persetujuan" :items="items_histori_persetujuan" :fields="fields_histori_persetujuan"></b-table>
                                       <!--  <b-table id="histori_persetujuan" :per-page="perPage_histori_persetujuan" :current-page="currentPage_histori_persetujuan" :items="items_histori_persetujuan" :fields="fields_histori_persetujuan"></b-table> -->
                                        <!-- <b-pagination v-model="currentPage_histori_persetujuan" :total-rows="rows_histori_persetujuan" :per-page="perPage_histori_persetujuan" aria-controls="histori_persetujuan"></b-pagination> -->
                                      </b-col>
                                    </b-row>
                                </b-card>
                               </b-col>
                            </b-row>
                            <b-row>
                            <b-col sm="12" v-if="status != 'Ubah'">
                                <b-form-group>
                                    <label for="ccnumber">Keputusan
                                      <b class="text-danger"> *</b>
                                    </label>
                                     <b-form-radio-group v-model="approvalWorkflow.Status" name="approvalWorkflow.Status" :options="options_Status" :class="{'is-invalid': $v.approvalWorkflow.Status.$error}">
                                    </b-form-radio-group>
                                    <div class="text-danger" v-if="$v.approvalWorkflow.Status.$error">Keputusan harus diisi</div>
                               </b-form-group>
                                 <b-form-group>
                                    <label for="ccnumber">Alasan Persetujuan
                                      <b class="text-danger"> *</b>
                                    </label>
                                     <b-form-textarea  id="textarea"  v-model="approvalWorkflow.Notes" rows="5" :class="{'is-invalid': $v.approvalWorkflow.Notes.$error}"></b-form-textarea>
                                      <div class="text-danger" v-if="$v.approvalWorkflow.Notes.$error">Alasan Persetujuan harus diisi</div>
                               </b-form-group>
                            </b-col>
                          </b-row>
                          <b-row style="margin-top:50px">
                            <b-col sm="12">
                              <div class="form-group form-actions">
                                 <b-button @click="tabIndex++"  size="md" variant="info">Selanjutnya</b-button>
                              </div>
                            </b-col>
                          </b-row>
                              </b-tab>
                               <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[1]}}
                                  </template>
                                  <b-row>
                                    <b-col sm="6">
                                      <label for="ccnumber">Proposal lengkap
                                        <b class="text-danger"> *</b>
                                      </label>
                                    </b-col>
                                    <b-col sm="6">
                                      <b-form-file  v-model="Attached.Proposal"></b-form-file>
                                    </b-col>
                                  </b-row>
                                  <br>
                                  <b-row>
                                    <b-col sm="6">
                                      <label for="ccnumber">Hasil survey
                                        <b class="text-danger"> *</b>
                                      </label>
                                    </b-col>
                                    <b-col sm="6">
                                     <b-form-file v-model="Attached.HasilSurvey"></b-form-file>
                                    </b-col>
                                  </b-row>
                                  <br>
                                  <b-row>
                                    <b-col sm="6">
                                      <b-form-checkbox value="pas_foto">Pas foto pemohon 4x6 berwarna (2 lembar) </b-form-checkbox>
                                    </b-col>
                                    <b-col sm="6">
                                      <b-form-file v-model="Attached.PasFoto"></b-form-file>
                                    </b-col>
                                  </b-row>
                                    <br>
                                  <b-row>
                                    <b-col sm="6">
                                      <b-form-checkbox value="pas_foto">Fotokopi KTP/SIM/Paspor</b-form-checkbox>
                                    </b-col>
                                    <b-col sm="6">
                                      <b-form-file v-model="Attached.FotoKopi"></b-form-file>
                                    </b-col>
                                  </b-row>
                                  <br>

                                  <b-row>
                                    <b-col sm="6">
                                      <b-form-checkbox value="pas_foto">Rencana Anggaran Biaya (Biaya)</b-form-checkbox>
                                    </b-col>
                                    <b-col sm="6">
                                      <b-form-file v-model="Attached.RencanaAnggaran"></b-form-file>
                                    </b-col>
                                  </b-row>
                                  <br>
                                  <b-row>
                                    <b-col sm="6">
                                      <b-form-checkbox value="pas_foto">Kepanitiaan (orang yang bertanggung jawab)</b-form-checkbox>
                                    </b-col>
                                    <b-col sm="6">
                                      <b-form-file v-model="Attached.Kepanitiaan"></b-form-file>
                                    </b-col>
                                  </b-row>
                                  <br>
                                  <b-row>
                                    <b-col sm="6">
                                       <b-form-checkbox value="pas_foto">Denah lokasi dan tempat tinggal</b-form-checkbox>
                                    </b-col>
                                    <b-col sm="6">
                                      <b-form-file v-model="Attached.DenahLokasi"></b-form-file>
                                    </b-col>
                                  </b-row>
                                  <br>
                                  <b-row>
                                    <b-col sm="6">
                                      <label for="ccnumber">* File berupa pdf, jpg
                                      </label>
                                    </b-col>
                                    <b-col sm="6">
                                    </b-col>
                                  </b-row>
                                  <b-row>
                                    <b-col sm="12">
                                      <label for="ccnumber">
                                        <b class="text-danger"> *</b> Wajib diisi
                                      </label>
                                    </b-col>
                                  </b-row>
                                  <hr class="my-4">
                                  <b-row>
                                      <b-col sm="12">
                                        <b-table id="histori_file" :items="items_histori_file" :fields="fields_histori_file">
                                           <template slot="aksi" slot-scope="data">
                                                 <!-- <b-button variant="default" class="fa fa-search"></b-button> -->
                                                <b-button variant="default" class="fa fa-cloud-download"  v-on:click="download(data.item.Id)"></b-button>
                                                <b-button variant="default" class="fa fa-times" style="color:red"  v-on:click="hapusFile(data.item.Id)"></b-button>
                                            </template>
                                        </b-table>
                                      </b-col>
                                    </b-row>
                                    <br><br>
                                   <b-row>
                                    <!-- <b-col sm="4" style="text-align: right;">
                                      <div class="form-group form-actions">
                                        <b-button type="submit" variant="info" v-on:click="saveDraft()">Simpan Draf</b-button>
                                      </div>
                                    </b-col> -->
                                    <b-col v-if="status != 'Ubah' && statusPencairan == null">
                                        <b-button type="submit" variant="info" v-on:click="saveSubmit()" :disabled="klik">Proses</b-button>
                                         <b-button type="submit"  class="btn btn-danger" v-on:click="saveCloseDraft()">Kembali</b-button>
                                    </b-col>
                                    <b-col  v-if="status == 'Ubah' && statusPencairan == null">
                                        <b-button type="submit" variant="info" v-on:click="saveDraft()">Ubah</b-button>
                                         <b-button type="submit"  class="btn btn-danger" v-on:click="saveCloseDraft()">Kembali</b-button>
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
  import { required, minLength } from "vuelidate/lib/validators";
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiApproval from '@/api/BL/BLApprovalApiService';
  import apiApprovalTermin from '@/api/BL/BLApprovalTerminApiService';
  import apiBLApprovalWorkflow from '@/api/BL/BLApprovalWorkflowApiService';
  import apiAttached from '@/api/PK/AttachedApiService';
  import apiDebitAccountWorkFlow from '@/api/PK/DebitAccountWorkFlowApiService';
  import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
  import VueNumeric from 'vue-numeric';
  import {Money} from 'v-money'
    export default {
      components: { 'vue-numeric' : VueNumeric  },
         data() {
            return {
              loading:false,
              klik:false,
              status:'insert',
              username:null,
              statusPencairan:null,
              money: {
                  decimal: ',',
                  thousands: '.',
                  prefix: 'Rp. ',
                  suffix: '',
                  precision: 2,
                  masked: false
                },
                debitAccountState:{},
              DebitAccountWorkFlow:{
                DACode: null,
                TanggalPengajuan: null,
                TanggalPenilaian: null,
                TanggalPersetujuan: null,
                TanggalPerjanjian: null,
                TanggalSP3: null,
                TanggalPencairan: null
              },
              Attached:{},
              approvalTermin:{
                Value:[0,0,0],
                TerminDate:[ this.formatDate(new Date()), this.formatDate(new Date()), this.formatDate(new Date())] ,
                Tenor:null,
                DACode:null,
                BLAppTerId:[]
              },
              approvalTerminsave:{
                Value:null,
                TerminDate:null ,
                Tenor:null,
                DACode:null
              },
                DebCode: null,
                DACode: null,
                AppWorkCode: null,
                approval:{

                },
                approvalWorkflow:{
                  AppDate: new Date(),
                  DACode:null,
                  ReqDate: new Date(),
                    // TahapanTermin: null
                },
                lampiran:{

                },
                configConfirm:null,
                textConfirm:null,
                permohonan:{
                },
                tabIndex: 1,
                tabs: [
                    'Data Pemohon',
                    'Lampiran'
                ],
               options_Status: [
                  { text: 'Layak', value: 'Layak' },
                  { text: 'Tidak Layak', value: 'Tidak Layak' },
                  { text: 'Tunda', value: 'Tunda' }
                ],
                //  options_TahapanTermin:[
                //     { text: 'Pilih', value: null },
                //     { text: '1 Termin', value: '1' },
                //     { text: '2 Termin', value: '2' },
                //     { text: '3 Termin', value: '3' }
                // ],
                // perPage_histori_persetujuan: 5,
                // currentPage_histori_persetujuan: 1,
                items_histori_persetujuan: [],
                fields_histori_persetujuan: [
                  {label: 'Level',key:'Sequence'},
                  {label: 'Nama Level',key: 'ReqType'},
                  {label: 'Nama User',key: 'Pos_Name'},
                  {label: 'Tanggal',key: 'AppDate'},
                  {label: 'Catatan',key: 'Notes'}
                ],
                fields_histori_file: [
                  {label: 'No',key:'No',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Keterangan',key: 'Tittle',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Nama File',key: 'Filename',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Size',key: 'SizeFile',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Tanggal Upload',key: 'CreatedAt',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Aksi',key: 'aksi',thStyle: { backgroundColor: '#cbced0'}}
                ],
                items_histori_file:[],
            }
        },
        validations: {
        approvalWorkflow: {
          AppDate: { required },
          RecomendationValue: { required, minLength: minLength(3) },
          Notes: { required },
          Status: { required },
        }
      },
        watch:{
         'Attached.PasFoto': async function () {
             this.getSaveFile("Pas foto pemohon",this.Attached.PasFoto)
             this.getAllAttach()
         },
         'Attached.FotoKopi': async function () {
             this.getSaveFile("Fotokopi KTP/SIM/Paspor",this.Attached.FotoKopi)
             this.getAllAttach()
         },
         'Attached.Proposal': async function () {
             this.getSaveFile("Proposal lengkap",this.Attached.Proposal)
             this.getAllAttach()
         },
         'Attached.RencanaAnggaran': async function () {
             this.getSaveFile("Rencana Anggaran Biaya",this.Attached.RencanaAnggaran)
             this.getAllAttach()
         },
         'Attached.Kepanitiaan': async function () {
             this.getSaveFile("Kepanitiaan",this.Attached.Kepanitiaan)
             this.getAllAttach()
         },
         'Attached.DenahLokasi': async function () {
             this.getSaveFile("Denah lokasi",this.Attached.DenahLokasi)
             this.getAllAttach()
         },
         'Attached.HasilSurvey': async function () {
             this.getSaveFile("Hasil survey",this.Attached.HasilSurvey)
             this.getAllAttach()
         },
        },
        async created() {
            this.loading = true
            this.DebCode = this.$route.params.DebCode;
            this.DACode = this.$route.params.DACode;
            this.status =  this.$route.params.Mode;
            this.username = localStorage.username
            this.AppWorkCode = this.$route.params.AppWorkCode;
            this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
            this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
             var getDebitur = await apiDebitor.getOne(this.DebCode)
             var getApproval = await apiApproval.getOneByDACode(this.DACode)
             // if( this.status != 'Ubah'){
               var getApprovalWorkflow = await apiBLApprovalWorkflow.getOne(this.AppWorkCode)
             // }

             if( this.status == 'Ubah'){
               var getApprovalWorkflow = await apiBLApprovalWorkflow.getOne(this.AppWorkCode - 1)
             }
             this.permohonan = getDebitur.Data[0]
             this.approval = getApproval.Data
             this.approvalWorkflow = getApprovalWorkflow.Data[0]
             if(getApprovalWorkflow.Data[0].AppDate != null){
                this.approvalWorkflow.AppDate = getApprovalWorkflow.Data[0].AppDate
             }

               var getDebitAccountWorkFlow = await apiDebitAccountWorkFlow.getOneByDACode(this.DACode)
               if(getDebitAccountWorkFlow.Data[0]){
                  this.DebitAccountWorkFlow = getDebitAccountWorkFlow.Data[0]
                  if(getDebitAccountWorkFlow.Data[0].TanggalPencairan){
                     this.statusPencairan = getDebitAccountWorkFlow.Data[0].TanggalPencairan
                  }
                  console.log("WorkFlow",this.DebitAccountWorkFlow)
               }

                let dataDebitAccountState = await apiDebitAccountState.getOneByDACode(this.DACode)
               if(dataDebitAccountState.Data[0]){
                  this.debitAccountState = dataDebitAccountState.Data[0]
               }
                 console.log("DATA STATE", this.debitAccountState)
             // this. getAllApprovalWorkflow()
             // var getApprovalTermin = await apiApprovalTermin.getOneByDaCode(this.DACode)

             //  for (var i = 0; i < getApprovalTermin.Data.length; i++) {
             //    this.approvalWorkflow.TahapanTermin = i + 1
             //    this.approvalTermin.Value[i] = getApprovalTermin.Data[i].Value
             //    this.approvalTermin.TerminDate[i] =  moment(String(getApprovalTermin.Data[i].TerminDate)).format('YYYY-MM-DD')
             //    this.approvalTermin.BLAppTerId[i] = getApprovalTermin.Data[i].BLAppTerId
             //  }
             this.getAllApprovalWorkflow()
             this.getAllAttach()
            console.log( this.approvalWorkflow.AppDate)
            this.loading = false
        },
        computed: {
          // rows_histori_persetujuan() {
          //   return this.items_histori_persetujuan.length
          // }
        },
         methods: {
           disabledDate(date) {
             return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
          },
            async saveDraft(){
               try {
                this.$v.$touch()
                  if (!this.$v.$invalid) {
                    console.log(this.$v)
                     this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                     .then(async (value) => {
                        if(value){
                          this.loading = true
                        // console.log(this.approvalWorkflow)
                        this.approvalWorkflow.DACode = this.DACode
                        this.DebitAccountWorkFlow.TanggalPenilaian = this.approvalWorkflow.AppDate

                          // if( this.status != 'Ubah'){
                              // let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)
                              // let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)

                          //      this.showNotif(dataApproval,'Penilaian')
                          //     this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                          // }

                            this.approval.Value = this.approvalWorkflow.RecomendationValue
                            this.approvalWorkflow.UpdatedBy = this.username
                            this.DebitAccountWorkFlow.UpdatedBy = this.username
                         if( this.status == 'Ubah'){
                              var WorkCode = this.AppWorkCode - 1
                             let data = await apiBLApprovalWorkflow.update(WorkCode,this.approvalWorkflow)
                         }else{ 
                           let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)
                         }
                         
                          let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)

                            this.approval.UpdatedBy = this.username
                             let dataApproval = await apiApproval.update(this.approval.BLAppId,this.approval)
                            this.loading = false
                             this.showNotif(dataApproval,'Penilaian')
                            this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                        // for (var i = 0; i < this.approvalTermin.Value.length; i++) {
                        //     this.approvalTerminsave.DACode = this.DACode
                        //       this.approvalTerminsave.Tenor = i + 1
                        //       this.approvalTerminsave.Value = this.approvalTermin.Value[i]
                        //       this.approvalTerminsave.TerminDate = this.approvalTermin.TerminDate[i]
                        //     if(this.approvalTermin.BLAppTerId[i] != null){
                        //         let dataTermin = await apiApprovalTermin.update(this.approvalTermin.BLAppTerId[i],this.approvalTerminsave)
                        //     }else{
                        //         let dataTermin = await apiApprovalTermin.create(this.approvalTerminsave)
                        //     }

                        //   }
                        }
                     })
                     .catch(err => {
                      // An error occurred
                     })
                  }else{
                     alert("Harap isi data yang wajib")
                  }

               }
               finally {

              }
            },
            async saveNextDraft(){
               try {
                    this.approvalWorkflow.DACode = this.DACode
                    this.DebitAccountWorkFlow.TanggalPenilaian = this.approvalWorkflow.AppDate
                    this.DebitAccountWorkFlow.UpdatedBy = this.username
                    let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)

                    this.approvalWorkflow.UpdatedBy = this.username

                    let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)
                     this.showNotif(data,'Penilaian')
               }
               finally {

              }
            },
            async saveCloseDraft(){
               try {
                  if(this.status == 'Ubah'){
                     this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                  }else{
                      this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                     .then(async (value) => {
                        if(value){
                           this.loading = true
                          this.approvalWorkflow.DACode = this.DACode
                           this.approvalWorkflow.AppDate = null
                            this.DebitAccountWorkFlow.TanggalPenilaian = new Date()

                        this.DebitAccountWorkFlow.UpdatedBy = this.username
                          let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)
                        this.approvalWorkflow.UpdatedBy = this.username
                          let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)
                          this.loading = false
                             this.showNotif(data,'Penilaian')
                            this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                        }
                     })
                     .catch(err => {
                      // An error occurred
                     })

                  }
               }
               finally {

              }
            },
             async saveSubmit(){
               try {
                 this.$v.$touch()
                  if (!this.$v.$invalid) {
                    // console.log(this.$v)
                       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                         .then(async (value) => {
                            if(value){
                                this.klik = true
                                this.loading = true
                             if(this.approvalWorkflow.Status == 'Layak'){
                                this.loading = true
                                this.approvalWorkflow.DACode = this.DACode
                                // this.approvalWorkflow.ReqDate = null
                                 this.DebitAccountWorkFlow.TanggalPenilaian = this.approvalWorkflow.AppDate
                                  this.DebitAccountWorkFlow.TanggalPersetujuan = new Date()

                                  this.debitAccountState.RecommendationDate = new Date()
                                  this.debitAccountState.RecommendationValue = this.approvalWorkflow.RecomendationValue

                                this.DebitAccountWorkFlow.UpdatedBy = this.username
                                let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update(this.DACode,this.DebitAccountWorkFlow)

                                this.debitAccountState.UpdatedBy = this.username
                                let dataDebitAccountState = await apiDebitAccountState.update(this.DACode,this.debitAccountState)

                                this.approvalWorkflow.UpdatedBy = this.username
                                let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)
                                 this.approval.Value = this.approvalWorkflow.RecomendationValue
                                this.approvalWorkflow = {}
                                 this.approvalWorkflow.DACode = this.DACode
                                this.approvalWorkflow.ReqDate = new Date()
                                var idAppWork = Number(this.AppWorkCode) + 1
                                this.approvalWorkflow.UpdatedBy = this.username
                                let data2 = await apiBLApprovalWorkflow.update(idAppWork,this.approvalWorkflow)

                                this.approval.CurrentPosition = 'Kepala Cabang'
                                this.approval.UpdatedBy = this.username
                                 let dataApproval = await apiApproval.update(this.approval.BLAppId,this.approval)
                                 // for (var i = 0; i < this.approvalTermin.Value.length; i++) {
                                 //      this.approvalTerminsave.DACode = this.DACode
                                 //        this.approvalTerminsave.Tenor = i + 1
                                 //        this.approvalTerminsave.Value = this.approvalTermin.Value[i]
                                 //        this.approvalTerminsave.TerminDate = this.approvalTermin.TerminDate[i]
                                 //      if(this.approvalTermin.BLAppTerId[i] != null){
                                 //          let dataTermin = await apiApprovalTermin.update(this.approvalTermin.BLAppTerId[i],this.approvalTerminsave)
                                 //      }else{
                                 //          let dataTermin = await apiApprovalTermin.create(this.approvalTerminsave)
                                 //      }

                                 //    }
                                 this.loading = false
                                 this.showNotif(dataApproval,'Penilaian')
                                this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                              }else if(this.approvalWorkflow.Status == 'Tidak Layak'){
                                this.klik = true
                                this.approvalWorkflow.DACode = this.DACode
                                // this.approvalWorkflow.ReqDate = null
                                this.DebitAccountWorkFlow.TanggalPenilaian = this.approvalWorkflow.AppDate
                                this.DebitAccountWorkFlow.UpdatedBy = this.username
                                let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update(this.DACode,this.DebitAccountWorkFlow)

                                this.approvalWorkflow.UpdatedBy = this.username
                                let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)

                                this.approvalWorkflow.UpdatedBy = this.username
                                let updateStatus = await apiBLApprovalWorkflow.updateStatus(this.DACode,this.approvalWorkflow)
                                // for (var i = 0; i < this.approvalTermin.Value.length; i++) {
                                //     this.approvalTerminsave.DACode = this.DACode
                                //       this.approvalTerminsave.Tenor = i + 1
                                //       this.approvalTerminsave.Value = this.approvalTermin.Value[i]
                                //       this.approvalTerminsave.TerminDate = this.approvalTermin.TerminDate[i]
                                //     if(this.approvalTermin.BLAppTerId[i] != null){
                                //         let dataTermin = await apiApprovalTermin.update(this.approvalTermin.BLAppTerId[i],this.approvalTerminsave)
                                //     }else{
                                //         let dataTermin = await apiApprovalTermin.create(this.approvalTerminsave)
                                //     }

                                //   }
                                this.klik = false
                                 this.showNotif(updateStatus,'Penilaian')
                                this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                              }else{
                                  this.klik = true
                                 this.approvalWorkflow.DACode = this.DACode
                                 this.approvalWorkflow.AppDate = null
                                  this.DebitAccountWorkFlow.TanggalPenilaian = new Date()

                                this.DebitAccountWorkFlow.UpdatedBy = this.username
                                let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update(this.DACode,this.DebitAccountWorkFlow)

                                this.approvalWorkflow.UpdatedBy = this.username
                                let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)
                                  // for (var i = 0; i < this.approvalTermin.Value.length; i++) {
                                  //   this.approvalTerminsave.DACode = this.DACode
                                  //     this.approvalTerminsave.Tenor = i + 1
                                  //     this.approvalTerminsave.Value = this.approvalTermin.Value[i]
                                  //     this.approvalTerminsave.TerminDate = this.approvalTermin.TerminDate[i]
                                  //   if(this.approvalTermin.BLAppTerId[i] != null){
                                  //       let dataTermin = await apiApprovalTermin.update(this.approvalTermin.BLAppTerId[i],this.approvalTerminsave)
                                  //   }else{
                                  //       let dataTermin = await apiApprovalTermin.create(this.approvalTerminsave)
                                  //   }

                                  // }
                                  this.klik = false
                                 this.showNotif(data,'Penilaian')
                                this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                              }
                            }
                         })
                         .catch(err => {
                          // An error occurred
                         })
                  }else{
                    alert("Harap isi data yang wajib")
                  }
               }
               finally {

              }
            },

            async getAllApprovalWorkflow() {
               var dataTable = await apiBLApprovalWorkflow.getOneByDaCode(this.DACode)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  if(dataTable.Data[i].AppDate){
                    dataTable.Data[i].AppDate = this.formatDateDMY(dataTable.Data[i].AppDate)
                  }
               }
                this.items_histori_persetujuan = dataTable.Data
                console.log(dataTable)
          },
           async getAllAttach() {
               var dataTable = await apiAttached.getOneByDaCode(this.DebCode)
               for (var i = 0; i < dataTable.Data.length; i++) {
                 dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].CreatedAt){
                    dataTable.Data[i].CreatedAt = this.formatDateDMY(dataTable.Data[i].CreatedAt)
                  }
               }
                this.items_histori_file = dataTable.Data
                console.log(dataTable)
          },
          async getSaveFile(title,file) {
               let formData = new FormData();
                formData.append('file', file);
                formData.append('Tittle', title);
                formData.append('DebCode', this.DebCode);
                formData.append('CreatedBy', this.username);
                 let saveFile = await apiAttached.create(formData)
                 this.showNotif(saveFile,'data')
          },
          async download(data){
            let formData = new FormData();
                formData.append('id', data);
                 let saveDataFile = await apiAttached.getOneId(data)
                 let saveFile = await apiAttached.download(formData)
                  var filename = saveDataFile.Filename;
                  var contentType = saveFile.headers['content-type'];
                  this.downloadFile(saveFile.data,contentType,filename)
              console.log("IDNYA", saveDataFile.Filename)
          },
          async hapusFile(data){
              var r = confirm("Apakah ingin menghapus file....?");
              if (r) {
                let hapus = await apiAttached.delete(data)
                this.showNotif(hapus,'data')
                this.getAllAttach()
              } else {
              }
          }
         }
    }
</script>
<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
</style>
