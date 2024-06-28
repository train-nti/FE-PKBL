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
              <b-col sm="12">
                <!-- <form> -->
                  <b-card>
                      <div slot="header">
                          <strong>Inisialisasi Alur Kerja </strong>
                      </div>
                        <b-row style="margin-bottom:20px">
                          <b-col sm="12">
                            <h5> Formulir BL </h5>
                          </b-col>

                          <b-col sm="12">
                              Formulir Pengajuan Bina Lingkungan
                          </b-col>
                        </b-row>
                        <form >
                        <b-row>
                          <b-col sm="12">
                              <b-tabs class="full-widths" v-model="tabIndex[0]">
                                <b-tab active>
                                 <template slot="title">
                                    <i class="icon-calculator"></i> {{tabs[0]}}
                                </template>
                                 <b-form-group>
                                      <label for="ccnumber">No. Referensi
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                      <b-form-input type="text" v-model="permohonan.NoReference"  required disabled></b-form-input>
                                 </b-form-group>
                                <!-- <b-form-group> -->
                                      <b-form-group>
                                          <label for="ccnumber">Tanggal Proposal
                                            <b class="text-danger"> *</b>
                                          </label>
                                           <date-picker style="width: 100%;" v-model="permohonan.DateProposal" :input-attr="{ required: true }" 
                                           :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD"  format="DD/MMM/YYYY" lang="id"  :class="{'is-invalid': $v.permohonan.DateProposal.$error}"></date-picker>
                                      <!--     <b-form-input type="date" v-model="permohonan.DateProposal" required :class="{'is-invalid': $v.permohonan.DateProposal.$error}"></b-form-input> -->
                                          <div class="text-danger" v-if="$v.permohonan.DateProposal.$error">Tanggal Proposal harus diisi</div>
                                      </b-form-group>
                                     <b-form-group>
                                          <label for="ccnumber">Tanggal Daftar
                                            <b class="text-danger"> *</b>
                                          </label>
                                           <date-picker style="width: 100%;" v-model="permohonan.DateRegistration" :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD"  format="DD/MMM/YYYY" lang="id"  :class="{'is-invalid': $v.permohonan.DateRegistration.$error}"></date-picker>
                                         <!--  <b-form-input type="date" v-model="permohonan.DateRegistration" required :class="{'is-invalid': $v.permohonan.DateRegistration.$error}"></b-form-input> -->
                                          <div class="text-danger" v-if="$v.permohonan.DateRegistration.$error">Tanggal Daftar harus diisi</div>
                                     </b-form-group>
                               <!-- </b-form-group> -->
                                  <b-form-group>
                                      <label for="ccnumber">No Proposal
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <b-form-input type="text" v-model="permohonan.NoProposal" required :class="{'is-invalid': $v.permohonan.NoProposal.$error}"></b-form-input>
                                       <div class="text-danger" v-if="$v.permohonan.NoProposal.$error">No Proposal harus diisi</div>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">No KTP/SIM
                                      </label>
                                      <b-form-input type="text" v-model="permohonan.IDNumber"></b-form-input>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Referensi
                                        <b class="text-danger"> *</b>
                                      </label>
                                       <b-form-radio-group v-model="permohonan.ReferenceSH" name="permohonan.ReferenceSH" :options="options_Reference">
                                      </b-form-radio-group>
                                 </b-form-group>
                                <!--   <b-form-group>
                                      <b-form-select  v-show="permohonan.Reference === 'Stakeholder'" v-model="permohonan.ReferenceSH" :options="options_ReferenceSH" required></b-form-select>
                                 </b-form-group> -->
                                  <b-row  v-show="permohonan.ReferenceSH === 'Stakeholder'">
                                      <!-- <b-col sm="12"> -->
                                        <b-col sm="2">
                                        <b-form-radio v-model="permohonan.Reference" name="Reference"  value="Kom VI">Kom VI</b-form-radio>
                                      </b-col>
                                      <b-col sm="2">
                                        <b-form-radio v-model="permohonan.Reference" name="Reference" value="Kom VII">Kom VII</b-form-radio>
                                      </b-col>
                                      <b-col sm="3">
                                        <b-form-radio v-model="permohonan.Reference" name="Reference" value="lain">Stakeholder Lainnya</b-form-radio>
                                        <input type="hidden" v-model="permohonan.ReferenceSHL">
                                      </b-col>
                                        <b-col sm="5"  v-if="permohonan.Reference != 'Kom VI' && permohonan.Reference != 'Kom VII'">
                                         <b-form-input v-model="permohonan.ReferenceSHL" type="text" required :class="{'is-invalid': $v.permohonan.Reference.$error}"></b-form-input>
                                       </b-col>
                                        <div class="text-danger" v-if="$v.permohonan.Reference.$error">Stakeholder harus diisi</div>
                                      <!-- </b-col> -->
                                 </b-row>
                                  <b-form-group  v-show="permohonan.ReferenceSH === 'Non Stakeholder'">
                                      <b-form-input type="text" v-model="permohonan.ReferenceNSH" disabled></b-form-input>
                                 </b-form-group>
                                  <b-form-group>
                                      <label for="ccnumber">Instansi/Lembaga
                                        <b class="text-danger"> *</b>
                                      </label>

                                      <b-form-input  type="text" v-model="permohonan.Instance" required :class="{'is-invalid': $v.permohonan.Instance.$error}"></b-form-input>
                                      <div class="text-danger" v-if="$v.permohonan.Instance.$error">Instansi/Lembaga harus diisi</div>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Nama Pemohon
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <b-form-input type="text" v-model="permohonan.FullName" required :class="{'is-invalid': $v.permohonan.FullName.$error}"></b-form-input>
                                       <div class="text-danger" v-if="$v.permohonan.FullName.$error">Nama Pemohon harus diisi</div>
                                 </b-form-group>
                                  <b-form-group>
                                      <label for="ccnumber">Provinsi
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <v-select v-model="permohonan.Prov_code" :options="options_Prov_code" :class="{'is-invalid': $v.permohonan.Prov_code.$error}"></v-select>
                                       <div class="text-danger" v-if="$v.permohonan.Prov_code.$error">Provinsi harus diisi</div>
                                 </b-form-group>
                                  <b-form-group>
                                      <label for="ccnumber">Kota/Kabupaten
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <v-select v-model="permohonan.Dist_code" :options="options_Dist_code" :class="{'is-invalid': $v.permohonan.Dist_code.$error}"></v-select>
                                      <div class="text-danger" v-if="$v.permohonan.Dist_code.$error">Kota/Kabupaten harus diisi</div>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Kecamatan
                                        <b class="text-danger"> *</b>
                                      </label>
                                       <v-select v-model="permohonan.Subdis_code" :options="options_Subdis_code" :class="{'is-invalid': $v.permohonan.Subdis_code.$error}"></v-select>
                                        <div class="text-danger" v-if="$v.permohonan.Subdis_code.$error">Kecamatan harus diisi</div>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Kelurahan
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                      <b-form-input type="text" v-model="permohonan.Village_code"></b-form-input>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Alamat
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <b-form-textarea  id="textarea"  v-model="permohonan.Address" required :class="{'is-invalid': $v.permohonan.Address.$error}"></b-form-textarea>
                                        <div class="text-danger" v-if="$v.permohonan.Address.$error">Alamat harus diisi</div>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Nomor Telepon
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <b-form-input type="number" v-model="permohonan.Phone" required :class="{'is-invalid': $v.permohonan.Phone.$error}"></b-form-input>
                                      <div class="text-danger" v-if="$v.permohonan.Phone.$error">Nomor Telepon harus diisi</div>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Email
                                      </label>
                                      <b-form-input type="text" v-model="permohonan.eMail"></b-form-input>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Jenis Bina Lingkungan
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <select class="form-control" v-model="permohonan.BLType" :class="{'is-invalid': $v.permohonan.BLType.$error}">
                                        <option v-for="option in options_BLType" v-bind:value="option.label">
                                          {{ option.label }}
                                        </option>
                                      </select>
                                       <div class="text-danger" v-if="$v.permohonan.BLType.$error">Jenis Bina Lingkungan harus diisi</div>
                                    <!--   <v-select v-model="permohonan.BLType" :options="options_BLType"></v-select> -->
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Bentuk Kegiatan
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <b-form-input type="text" v-model="permohonan.Activity" required  :class="{'is-invalid': $v.permohonan.Activity.$error}"></b-form-input>
                                       <div class="text-danger" v-if="$v.permohonan.Activity.$error">Bentuk Kegiatan harus diisi</div>
                                 </b-form-group>
                                 <b-form-group>
                                      <label for="ccnumber">Nilai Pengajuan
                                        <b class="text-danger"> *</b>
                                      </label>
                                      <money class="form-control" v-model="permohonan.Amount" v-bind="money" required :class="{'is-invalid': $v.permohonan.Amount.$error}"></money>
                                      <div class="text-danger" v-if="$v.permohonan.Amount.$error">Nilai Pengajuan harus diisi</div>
                                     <!--  <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="permohonan.Amount"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric> -->
                                 </b-form-group>
                                </b-tab>
                            </b-tabs>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col sm="12">
                            <label for="ccnumber">
                              <b class="text-danger"> *</b> Wajib diisi
                            </label>
                          </b-col>
                        </b-row>
                        <b-row style="margin-top:100px" v-if="status != 'Ubah' && statusPencairan == null">
                          <b-col sm="12">
                            <div class="form-group form-actions">
                              <b-button type="button" size="md" variant="info" v-on:click="saveDebiturDraft()">Simpan Draft</b-button>
                              <b-button type="button" size="md" variant="primary" v-on:click="saveDebitur()" :disabled="insert">Submit Process</b-button>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row style="margin-top:100px" v-if="status == 'Ubah' && statusPencairan == null">
                          <b-col sm="12">
                            <div class="form-group form-actions">
                              <b-button type="button" size="md" variant="info" v-on:click="saveDebiturDraft()">Ubah</b-button>
                            </div>
                          </b-col>
                        </b-row>
                        </form>
                  </b-card>
                </form>
              </b-col>
            </b-col>
        </b-row>
    </div>
</template>
<script>
  import moment from 'moment';
  import { required, minLength } from "vuelidate/lib/validators";
  import apiProvinsi from '@/api/BPM/ProvinsiApiService';
  import apiKotaKab from '@/api/BPM/KotaKabApiService';
  import apiKecamatan from '@/api/BPM/KecamatanApiService';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiBLType from '@/api/BL/BLTypeApiService';
  import apiApprovalWorkflow from '@/api/BL/ApprovalWorkflowApiService';
  import apiBLApproval from '@/api/BL/BLApprovalApiService';
  import apiBLApprovalWorkflow from '@/api/BL/BLApprovalWorkflowApiService';
  import apiDebitAccountWorkFlow from '@/api/PK/DebitAccountWorkFlowApiService';
  import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
  import dynamic from '@/api/DynamicApiService';
  import VueNumeric from 'vue-numeric';
  import {Money} from 'v-money'

    export default {
      components: { 'vue-numeric' : VueNumeric  },
         data() {
            return {
              loading:false,
              insert: false,
              status:'insert',
              cabang:null,
              username:null,
              statusPencairan:null,
              submitted: false,
              ReferenceSH:null,
              dataTableDA: {
                Colum: "DACode",
                Table: "DebitAccount",
                Start: 0,
                Search: null
              },
              configConfirm:null,
              textConfirm:null,
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
              money: {
                  decimal: ',',
                  thousands: '.',
                  prefix: 'Rp. ',
                  suffix: '',
                  precision: 2,
                  masked: false
                },
                DACode:null,
                DebCode:null,
                Approvalworkflow:{
                    Sequence:0,
                    Pos_Name:null,
                    ReqType:null
                },
                BLApprovalWorkflow:{
                    DACode:null,
                    Sequence:0,
                    Pos_Name:null,
                    ReqDate:null,
                    ReqType:null
                },
                BLApproval:{
                    DACode:null,
                    Value:0,
                    CurrentPosition:'Staf Pusat'
                },
                permohonan:{
                    Instance: null,
                    ReferenceSH: 'Stakeholder',
                    Prov_code: null,
                    Dist_code: null,
                    Subdis_code: null,
                    ProvinceCode: null,
                    DistrictCode: null,
                    SubDistrictCode: null,
                    BLType: null,
                    Reference:'Kom VI',
                    ReferenceNSH:'Reguler',
                    DebCode: null,
                    Amount: null,
                    Flag: 0

                },
                debitAccount:{
                    DACode: null,
                    DebCode:null,
                    DebValue:0,
                    InterestRate:3,
                    Tenor:0,
                    StlmCycle:0,
                    StlmBillvalue:0,
                    OutstandingBal:0,
                    Arrears:0,
                    LateFromDue:0,
                    Collectability:0,
                    IsCompleted:false
                },
                tabIndex: [0, 0],
                tabs: [
                    'Data Pemohon'
                ],
                options_Reference: [
                  { text: 'Stakeholder', value: 'Stakeholder' },
                  { text: 'Non Stakeholder', value: 'Non Stakeholder' }
                ],
                // options_ReferenceSH:[
                //     { text: 'Pilih', value: null },
                //     { text: 'Stakeholder 1', value: 'Stake Holder 1' },
                //     { text: 'Stakeholder 2', value: 'Stake Holder 2' },
                //     { text: 'Stakeholder 3', value: 'Stake Holder 3' }
                // ],
                options_Prov_code:[
                    { text: 'Pilih', value: null }
                ],
                options_Dist_code:[
                    { text: 'Pilih', value: null }
                ],
                options_Subdis_code:[
                    { text: 'Pilih', value: null }
                ],
                options_BLType:[
                    { text: 'Pilih', value: null }
                ]
            }
        },
        async created() {
            this.loading = true
          this.DebCode = this.$route.params.DebCode;
           this.DACode = this.$route.params.DACode;
          this.status =  this.$route.params.Mode;
          this.username = localStorage.username
          this.cabang = localStorage.cabang
          this.insert = false
          console.log("Status", this.DACode)
          // var autoincDebitor = await dynamic.getCount('debitor/CountByDebcCode')
          // var autoincDebitorAccount = await dynamic.getCount('debitAccount/CountByDACode')
          // this.permohonan.NoReference = 'BL.'+new Date().getFullYear()+'/KPT.'+autoincDebitor.Total
          // this.permohonan.DebCode = 'BL'+autoincDebitor.Total
          // this.debitAccount.DACode = 'DABL'+autoincDebitorAccount[0].Total
          // console.log(this.debitAccount.DACode);
          this.getAllComboboxBLType()
          this.getAllComboboxProvinsi()
          this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
          this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
          // console.log("TEXTCONFIRM",this.textConfirm)
          // console.log("TEXTCONFIRM",this.configConfirm)
          if(this.DebCode){
             var getDebitur = await apiDebitor.getAllOne(this.DebCode)
             console.log("Data", getDebitur.Data[0])
             if(getDebitur.Data.length > 0){
               this.permohonan = getDebitur.Data[0]
               // this.permohonan.NoReference2= 'BL.'+new Date().getFullYear()+'/KPT.'+autoincDebitor.Total
               if(getDebitur.Data[0].DateProposal){
                  this.permohonan.DateProposal =  getDebitur.Data[0].DateProposal
               }
               if(getDebitur.Data[0].DateRegistration){
                  this.permohonan.DateRegistration = getDebitur.Data[0].DateRegistration
               }
               if(getDebitur.Data[0].Reference){
                  this.permohonan.ReferenceSH = getDebitur.Data[0].ReferenceSH
                  this.permohonan.Reference = getDebitur.Data[0].Reference
                  this.ReferenceSH = getDebitur.Data[0].Reference
                 if(getDebitur.Data[0].Reference === 'Kom VI' || getDebitur.Data[0].Reference === 'Kom VII'){
                  this.permohonan.Reference = getDebitur.Data[0].Reference
                  this.permohonan.ReferenceSHL = null
                 }else{
                    this.permohonan.ReferenceSHL = getDebitur.Data[0].Reference
                   this.permohonan.Reference = 'lain'
                 }
               }
               this.permohonan.ReferenceNSH = "Reguler"
             }

             console.log("DataDEBITUR", this.permohonan)
             var getDebitAccount = await apiDebitAccount.getByDEBCode(this.DebCode)
             console.log("Data DebitAccount",getDebitAccount.Data[0])
             if(getDebitAccount.Data[0]){
                 this.debitAccount = getDebitAccount.Data[0]
                 if(getDebitAccount.Data[0].DACode){
                   let dataDebitAccountState = await apiDebitAccountState.getOneByDACode(getDebitAccount.Data[0].DACode)
                   if(dataDebitAccountState.Data[0]){
                      this.debitAccountState = dataDebitAccountState.Data[0]
                   }
                 }
                 console.log("DATA STATE", this.debitAccountState)
             }
          }
          if(this.DACode){
             var getDebitAccountWorkFlow = await apiDebitAccountWorkFlow.getOneByDACode(this.DACode)
             if(getDebitAccountWorkFlow.Data[0]){
                this.DebitAccountWorkFlow = getDebitAccountWorkFlow.Data[0]
                if(getDebitAccountWorkFlow.Data[0].TanggalPencairan){
                   this.statusPencairan = getDebitAccountWorkFlow.Data[0].TanggalPencairan
                }
                console.log("WorkFlow",this.DebitAccountWorkFlow)
             }
          }
          this.loading = false
        },
        watch:{

         'permohonan.Prov_code': async function () {
            if(this.permohonan.Prov_code.value){
              this.getAllComboboxKotaKab(this.permohonan.Prov_code.value)
            }
         },
         'permohonan.Dist_code': async function(){
            if(this.permohonan.Dist_code.value){
              this.getAllComboboxKecamatan(this.permohonan.Dist_code.value)
            }
         },
         // 'permohonan.Reference': async function(){
         //  console.log("Reference",this.permohonan.Reference)
         //    this.permohonan.ReferenceSHL = this.permohonan.Reference
         // },
        },
        validations: {
        permohonan: {
          DateProposal: { required },
          DateRegistration: { required },
          NoProposal: { required },
          Instance: { required },
          FullName: { required },
          Prov_code: { required },
          Dist_code: { required },
          Subdis_code: { required },
          Address: { required },
          Phone: { required },
          BLType: { required },
          Activity: { required },
          Reference: { required },
          Amount: { required, minLength: minLength(3) },
        }
      },
         methods: {
           disabledDate(date) {
             return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
           },
            async getAllComboboxBLType() {
               var getBLType = await apiBLType.getAllCombobox()
                  this.options_BLType = [];
                  for (var i = 0; i < getBLType.length; i++) {
                    this.options_BLType.push({ label: getBLType[i].text,value: getBLType[i].value })
                  }
             },
             async getAllComboboxProvinsi() {
               var getProvinsi = await apiProvinsi.getAllComboboxWACode(this.cabang)
                  this.options_Prov_code = [];
                  for (var i = 0; i < getProvinsi.length; i++) {
                    this.options_Prov_code.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
                  }
             },
             async getAllComboboxKotaKab(id) {
               var getKotaKab = await apiKotaKab.getAllComboboxByKodeProv(id)
                  this.options_Dist_code = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_Dist_code.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxKecamatan(id) {
               var getKecamatan = await apiKecamatan.getAllComboboxByKodeProv(id)
                  this.options_Subdis_code = [];
                  for (var i = 0; i < getKecamatan.length; i++) {
                    this.options_Subdis_code.push({ label: getKecamatan[i].text,value: getKecamatan[i].value })
                  }
             },
             async saveDebitur(){
              try {
                 this.$v.$touch()
                  if (!this.$v.$invalid) {
                      this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                         .then(async (value) => {
                            if(value){
                                this.loading = true
                                this.insert = true;
                                this.permohonan.ActiveUntil = '2111-12-30'

                                this.DebitAccountWorkFlow.TanggalPengajuan = this.permohonan.DateRegistration
                                this.DebitAccountWorkFlow.TanggalPenilaian = new Date()
                                this.BLApproval.Value = this.permohonan.Amount

                                 if(this.permohonan.ReferenceSH == 'Non Stakeholder'){
                                  this.permohonan.Reference = this.permohonan.ReferenceNSH
                                  }
                                  if (this.permohonan.Reference =='lain') {
                                    this.permohonan.Reference = this.permohonan.ReferenceSHL
                                  }

                                if(this.permohonan.Prov_code.value){
                                    this.permohonan.ProvinceCode =  this.permohonan.Prov_code.value
                                }
                                if(this.permohonan.Dist_code.value){
                                    this.permohonan.DistrictCode =  this.permohonan.Dist_code.value
                                }
                                if(this.permohonan.Subdis_code.value){
                                    this.permohonan.SubDistrictCode =  this.permohonan.Subdis_code.value
                                }
                                if(this.permohonan.Prov_code.label){
                                    this.permohonan.Prov_code =  this.permohonan.Prov_code.label
                                }
                                if(this.permohonan.Dist_code.label){
                                    this.permohonan.Dist_code =  this.permohonan.Dist_code.label
                                }
                                if(this.permohonan.Subdis_code.label){
                                    this.permohonan.Subdis_code =  this.permohonan.Subdis_code.label
                                }
                               // if(this.permohonan.BLType != null) this.permohonan.BLType =  this.permohonan.BLType.label
                              // if(this.DebCode == null){
                              //    let data = await apiDebitor.create(this.permohonan)
                              // }else{
                                this.permohonan.UpdatedBy = this.username
                                let data = await apiDebitor.update(this.DebCode,this.permohonan)
                              // }
                                if(this.debitAccount.DebCode){
                                  console.log("ADA DACODE")
                                  this.debitAccount.DebValue = this.permohonan.Amount
                                  this.DebitAccountWorkFlow.DACode = this.debitAccount.DACode
                                  this.BLApproval.DACode = this.debitAccount.DACode

                                  this.debitAccountState.SubmittedDate = new Date()
                                  this.debitAccountState.SubmittedValue = this.permohonan.Amount

                                  this.debitAccount.UpdatedBy = this.username
                                 let dataDebAccount = await apiDebitAccount.updateByDebCode(this.DebCode,this.debitAccount)

                                  this.debitAccountState.UpdatedBy = this.username
                                  let dataDebitAccountState = await apiDebitAccountState.update(this.debitAccount.DACode,this.debitAccountState)
                                }else{
                                  console.log("ADA TIDAK DACODE")
                                   this.dataTableDA.Search = 'BL'+this.cabang
                                    this.dataTableDA.Start =  this.dataTableDA.Search.length + 1
                                    var codeDACode = await this.getCount(this.dataTableDA)
                                    this.debitAccount.DACode = codeDACode
                                    this.debitAccount.DebCode = this.permohonan.DebCode
                                     this.debitAccount.DebValue = this.permohonan.Amount
                                     this.debitAccount.CreatedBy =  this.username
                                    this.DebitAccountWorkFlow.DACode = this.debitAccount.DACode
                                    this.BLApproval.DACode = this.debitAccount.DACode

                                    this.debitAccountState.DACode = this.debitAccount.DACode
                                    this.debitAccountState.CreatedDate = new Date()
                                    this.debitAccountState.CreatedValue = 0
                                    this.debitAccountState.SubmittedDate = new Date()
                                    this.debitAccountState.CreatedBy = this.username
                                    this.debitAccountState.SubmittedValue = this.permohonan.Amount

                                    let dataDebAccount = await apiDebitAccount.create(this.debitAccount)

                                     let dataDebitAccountState = await apiDebitAccountState.create(this.debitAccountState)
                                }

                                this.DebitAccountWorkFlow.CreatedBy = this.username
                                 let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.create(this.DebitAccountWorkFlow)
                                this.BLApproval.CreatedBy = this.username
                                let dataBLApproval = await apiBLApproval.create(this.BLApproval)
                                let getApprovalworkflow = await apiApprovalWorkflow.getAllApprovalWorkFlow()
                                var dataBLApprovalWorkflow = null
                                for (var i = 0; i < getApprovalworkflow.length; i++) {
                                  this.BLApprovalWorkflow.Sequence = getApprovalworkflow[i].Sequence
                                  this.BLApprovalWorkflow.Pos_Name = getApprovalworkflow[i].Pos_Name
                                  this.BLApprovalWorkflow.ReqType = getApprovalworkflow[i].ReqType
                                  this.BLApprovalWorkflow.DACode = this.debitAccount.DACode
                                    this.BLApprovalWorkflow.CreatedBy = this.username
                                  if(getApprovalworkflow[i].Sequence == 1){
                                   this.BLApprovalWorkflow.ReqDate = new Date()
                                  }else{
                                     this.BLApprovalWorkflow.ReqDate = null
                                  }
                                  dataBLApprovalWorkflow = await apiBLApprovalWorkflow.create(this.BLApprovalWorkflow)
                                }
                                console.log(this.BLApproval);
                                this.loading = false
                                this.showNotif(dataBLApprovalWorkflow,'Permohonan')
                                this.$router.push('/bussiness-process-desaigner/workflow-initialization2')

                               }
                         })
                         .catch(err => {
                          // An error occurred
                         })

                }else{
                  alert("Harap isi data yang wajib...!!")
                }
              }
              finally {

              }
            },
            async saveDebiturDraft(){
              try {
                this.$v.$touch() //it will validate all fields
                // console.log(this.$v.permohonan.Amount.$error)
                if (!this.$v.$invalid) { //invalid, becomes true when a validations return false
                         this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                         .then(async (value) => {
                           if(value){
                            this.loading = true
                            this.debitAccount.DebCode = this.permohonan.DebCode
                            this.permohonan.ActiveUntil = '2111-12-30'
                             if(this.permohonan.ReferenceSH == 'Non Stakeholder'){
                                this.permohonan.Reference = this.permohonan.ReferenceNSH
                                }
                               if (this.permohonan.Reference =='lain') {
                                  this.permohonan.Reference = this.permohonan.ReferenceSHL
                                }
                            console.log(this.permohonan.Reference)
                              console.log("PROVINSI",this.permohonan.Prov_code.label)
                            if(this.permohonan.Prov_code.value){
                                this.permohonan.ProvinceCode =  this.permohonan.Prov_code.value
                            }
                            if(this.permohonan.Dist_code.value){
                                this.permohonan.DistrictCode =  this.permohonan.Dist_code.value
                            }
                            if(this.permohonan.Subdis_code.value){
                                this.permohonan.SubDistrictCode =  this.permohonan.Subdis_code.value
                            }
                            if(this.permohonan.Prov_code.label){
                                this.permohonan.Prov_code =  this.permohonan.Prov_code.label
                            }
                            if(this.permohonan.Dist_code.label){
                                this.permohonan.Dist_code =  this.permohonan.Dist_code.label
                            }
                            if(this.permohonan.Subdis_code.label){
                                this.permohonan.Subdis_code =  this.permohonan.Subdis_code.label
                            }
                           // if(this.permohonan.BLType != null) this.permohonan.BLType =  this.permohonan.BLType.label
                            // if(this.DebCode == null){
                            //     let data = await apiDebitor.create(this.permohonan)
                            //     this.showNotif(data,'Permohonan')
                            //     this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                            // }else{
                              console.log("PERMOHONAN",this.permohonan.DateRegistration);
                                  // this.permohonan.DateProposal = this.convertDetailDate(this.permohonan.DateProposal)
                                  // this.permohonan.DateRegistration = this.convertDetailDate(this.permohonan.DateRegistration)
                                  this.permohonan.UpdatedBy = this.username
                               let data = await apiDebitor.update(this.DebCode,this.permohonan)
                               this.loading = false
                               this.showNotif(data,'Permohonan')
                                this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                            // }
                         }
                         })
                         .catch(err => {
                          // An error occurred
                         })
                }else{
                  alert("Harap isi data yang wajib...!!")
                }
              }
              finally {

              }
            },
            // handleSubmit(e) {
            //     this.submitted = true;

            //     // stop here if form is invalid
            //     this.$v.$touch();
            //     if (this.$v.$invalid) {
            //         return;
            //     }

            //     alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
            // }
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
