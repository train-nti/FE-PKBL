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
          <strong>Jurnal Uang Muka</strong>
        </div>
        <form @submit.prevent="SaveJournal">
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Program</label></b-col>
            <b-col><b-form-select :disabled="id != null" v-model="JournalModel.JournalTypeId" :options="options_Program"></b-form-select></b-col>
          </b-row>
          <br>

          <div v-show="JournalModel.JournalTypeId">
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nomor Jurnal</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalModel.JournalNumber" type="text" id="#" readonly required/></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Tanggal Jurnal</label></b-col>
            <b-col>
               <date-picker  style="width: 100%;" :disabled="(id != null )&&(status == 'detail')&&(JournalModel.IsPosting != 0) " v-model="JournalModel.JournalDate" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
              <!-- <b-input class="mb-2 mb-sm-0" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalModel.JournalDate" type="date" id="#" placeholder="" required/> -->
            </b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Deskripsi</label></b-col>
            <b-col><textarea id="#" rows="5" :disabled="(id != null )&&(status == 'detail')&&(JournalModel.IsPosting != 0) " class="form-control" v-model="JournalModel.Description" placeholder="Pencairan dana tunai dari rekening giro" required></textarea></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Provinsi</label></b-col>
            <b-col><v-select :options="options_Prov_code" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " required v-model="debitor.Prov_code" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kabupaten/Kota</label></b-col>
            <b-col><v-select :options="options_Dist_code" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " required v-model="debitor.Dist_code" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kecamatan</label></b-col>
            <b-col><v-select :options="options_Subdis_code" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " required v-model="debitor.Subdis_code" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Lembaga</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="debitor.Instance" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nomor Pegawai</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="debitor.IDNumber" type="number" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalCash.Receiver" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">No. Hp</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="debitor.Hp1" type="number" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Jenis Pembayaran</label></b-col>
            <b-col><v-select :options="options_PaymentType" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " required v-model="JournalCash.PaymentType" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Permintaan Bayar</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalCash.RequestToPay" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Verifikasi</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalCash.Verification" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Penyetujui</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalCash.Agreement" type="text" id="#"  required/></b-col>
          </b-row>
          <br>
          <big class="text-danger">&nbsp;&nbsp; {{ warning }} </big><br><br>


          <!-- <c-table :table-data="items" :fields="fields" caption="Journal Item" custom="newSlot" routeName="Jurnal Uang Muka Form">
            <template slot-scope="{action}">
              <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.idItem)"></i>
            </template>
          </c-table> -->

          <b-row>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Akun</th>
                  <th scope="col">Nama Akun</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items">
                  <td>{{item.AccountCode}}</td>
                  <td>{{item.Account.Name}}</td>
                  <td>{{item.debet}}</td>
                  <td>{{item.credit}}</td>
                  <td><button type="button" class="btn btn-danger" :disabled="id != null" @click='deleteItem(index,item.credit)' >Delete</button></td>
                </tr>
              </tbody>
              <tr>
                <td colspan="2" style="font-weight:bold; text-align:center">Total</td>
                <td>{{TotalDebet}}</td>
                <td>{{TotalCredit}}</td>
              </tr>
            </table>
          </b-row>

          <!-- <b-table show-empty stacked="md" striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
            <template slot="action" slot-scope="data">
              <a href="#"><i class="fa fa-trash fa-md text-danger"></i></a>
            </template>
          </b-table>
          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
          </b-row> -->

          <b-row v-if="idJournalItem == null">
            <b-col md="6" class="my-1">
              <b-button variant="primary" @click="showModal" ref="btnShow">Tambah Item</b-button>
            </b-col>
          </b-row>
          <!-- Posting Journal -->
          <!-- <b-row>
            <b-col md="6" class="my-1" v-if="JournalModel.IsPosting == 0">
              <b-button variant="primary" @click="updatePosting(JournalModel.Jrn_ID, 1)" ref="btnShow">Posting</b-button>
            </b-col>
          </b-row> -->


          <hr>
          <b-row >
              <b-col md="1" class="my-1" v-if="id != null">
                <router-link :to="{ name: 'Jurnal Uang Muka', params: {} }"><b-col><b-button type="submit" variant="">Kembali</b-button></b-col></router-link>
              </b-col>
              <span style="margin-left:20px;"></span>
              <b-col md="1" class="my-1" v-if="(id == null )">
                <b-col><b-button type="submit" variant="primary">Simpan</b-button></b-col>
              </b-col>
              <b-col md="2" class="my-1" v-else-if="(id != null)&&(status == 'edit')">
                <b-col><b-button type="submit" variant="primary">Simpan Edit</b-button></b-col>
              </b-col>
          </b-row>
          <!-- <br>
          <b-row v-if="(id != null )||(JournalModel.IsPosting == 0)">

            <b-col><b-button type="submit" variant="primary">Posting</b-button></b-col>
          </b-row> -->
        </div>
        </form>
      </b-card>

    </b-col>
  </b-row>
  <!-- Modal Component -->
  <b-modal id="modal1" size="xl" title="Journal Item" hide-footer>
    <b-row>
      <b-col><label class="mr-sm-2" for="#">Akun</label></b-col>
      <!-- <b-col><b-form-select id="#" :options="account" required v-model="JournalItemModel.Account" /></b-col> -->
      <b-col sm="10">  <v-select :options="options" :reduce="name => name.code" label="name" required v-model="JournalItemModel.AccountCode" /></b-col>
    </b-row>
    <br>

    <b-row>
      <b-col><label class="mr-sm-2" for="#">Tipe Item</label></b-col>
      <b-col sm="10">
        <b-form-radio-group id="basicRadios" style="font-size:14.5 !important"
          :plain="true"
          :options="[
            {text: 'Debet',value: true,active: true,style: 'margin-bottom:10px'},
            {text: 'Credit',value: false,style: 'margin-bottom:10px'}
          ]"
          :checked="this.JournalItemModel.IsDebet"
          stacked
          v-model="JournalItemModel.IsDebet"
          >
        </b-form-radio-group>
      </b-col>
    </b-row>
    <br>

    <b-row>
      <b-col><label class="mr-sm-2" for="#">Nilai Item</label></b-col>
      <b-col sm="10"><money class="form-control" id="#" v-model="JournalItemModel.ItemValue" v-bind="money"></money></b-col>
      <!-- <b-col><b-input class="mb-2 mb-sm-0" type="number" id="#" placeholder="30.000.000" required v-model="JournalItemModel.ItemValue" /></b-col> -->
    </b-row>
    <br>

    <b-button variant="primary" block class="float-right" v-on:click="AddJournalItem()">Tambah Item</b-button>
  </b-modal>

</div>
</template>

<script>
  import dynamicCode from '@/api/DynamicApiService';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import cTable from '@/views/base/Table.vue'
  import apiProvinsi from '@/api/BPM/ProvinsiApiService';
  import apiKotaKab from '@/api/BPM/KotaKabApiService';
  import apiKecamatan from '@/api/BPM/KecamatanApiService';
  import apiAccount from '@/api/AKAccountApiService';
  import apiJournalUangMuka from '@/api/AK/JournalUangMukaApiService';
  import apiJournal from '@/api/AKJournalApiService';
  import apiPaymentType from '@/api/PaymentTypeApiService';
  import apiJournalItem from '@/api/AKJournalItemApiService';
  import vSelect from '../../../../node_modules/vue-select/dist/vue-select'
  import '../../../../node_modules/vue-select/dist/vue-select.css';
  import moment from '../../../../node_modules/moment/moment'
  import { required, email, minLength } from "vuelidate/lib/validators";
  import {Money} from 'v-money'

export default {
  components:{'v-select': vSelect, cTable},
  data() { 
    return { 
      loading:false,
      configConfirm:null,
      textConfirm:null,
      cabang:null,
      warning:'',
      idItem: -1,
      id:null,
      status: '',
      AmountCredit:0,
      idJournalItem: null,
      JournalModel: {
        JournalNumber: "",
        JournalDate: "",
        Description: "",
      },
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'Rp. ',
          suffix: '',
          precision: 2,
          masked: false
        },
        verifikasi:{
            isi : 'Vetty'
        },
        penyetuju:{
          isi:'Agus Sugiarso'
        },
        PaymentType:{
          Description:[]
        },
        debitor: {},
        dataTableDeb: {
         Colum: "DebCode",
         Table: "Debitor",
         Start: 0,
         Search: null
       },
       dataTableJournal: {
        Colum: "JournalNumber",
        Table: "Journal",
        Start: 0,
        Search: null
      },
       dataTableDA: {
         Colum: "DACode",
         Table: "DebitAccount",
         Start: 0,
         Search: null
       },
        JournalCash:{

        },
        JournalUangMuka:{
        },
        options_Program: [
          { text: 'Program PK', value: 12 },
          { text: 'Program BL', value: 13 },
          { text: 'Program PKBL', value: 14 }
        ],
      options: [],
      options_PaymentType: [],
      options_Prov_code: [],
      options_Dist_code: [],
      options_Subdis_code: [],
      JournalItemModel: {IsDebet: null},
      account: [],
      show: true,
      selected: [], // Must be an array reference!
      show: true,
      tabIndex: [0, 0],
      items: [],
      fields: [
        {key: 'AccountCode', label: 'Kode Akun', sortable: true},
        {key: 'Account.Name', label: 'Nama Akun', sortable: true},
        {key: 'debet', label: 'Debet'},
        {key: 'credit', label: 'Credit'},
        {key: 'action', label: 'Aksi',},
      ],
      AccountCode: null,
    }
  },
  validations:{
    JournalModel: {
      JournalNumber: { required },
      JournalDate: { required },
      Description: { required }
    }
  },
  async created(){
    this.loading = true
    this.cabang = localStorage.cabang
    console.log('cabang',this.cabang);
    this.username = localStorage.username
    console.log('username',this.username);
    this.JournalItemModel.IsDebet = true
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    // let getCode = await dynamicCode.getCountByTransBL('/debTransaction/countByTrasacBL')
    // let counter = getCode.Jrn_ID + 1
    // let generateCode = this.cabang + '.2019.UM.IX.' + counter
    // this.JournalModel.JournalNumber = generateCode


    var id = this.$route.params.id;
    this.id = id
    var status = this.$route.params.status;
    this.status = status
    console.log('status bro',this.status);
    if (this.id != null) {
      this.fields.splice(this.fields.length - 1,1)
    }

    this.JournalCash.Verification = await this.getConfig("JOURNAL_PENYETUJU")
    this.JournalCash.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
    // var getall = await apiAccount.getAll()
    // // console.log(getall);
    // // this.loading = true
    // this.options = [];
    // for (var i = 0; i < getall.length; i++) {
    //   this.options.push({ code: getall[i].Code, name: getall[i].Name })
    // }

    this.PaymentType = await apiPaymentType.getComboBoxAll()
    this.options_PaymentType = [];

    this.dataTableDeb.Search = this.cabang
    this.dataTableDA.Search = 'PK' + this.cabang
    this.dataTableDeb.Start =  this.dataTableDeb.Search.length + 1
    this.dataTableDA.Start =  this.dataTableDA.Search.length + 1
    var codeDebCode = await this.getCount(this.dataTableDeb)
    var codeDACode = await this.getCount(this.dataTableDA)
    console.log('generateDebCode',codeDebCode);
    console.log('generateDACode',codeDACode);

    this.getAllComboboxProvinsi()

    if (id != null) {


      var DACode = this.$route.params.DACode;
      var debitAccount = await apiDebitAccount.getOne(DACode)
      if(debitAccount.Data[0]){
        if(debitAccount.Data[0].DebCode){
           var debitor = await apiDebitor.getOne(debitAccount.Data[0].DebCode)
           this.debitor = debitor.Data[0]
           if (debitor.Data[0].IDNumber) {
            console.log("NOMOR KTP",Number(debitor.Data[0].IDNumber))
            this.debitor.IDNumber = Number(debitor.Data[0].IDNumber)
           }
        }
      }
      var Journal = await apiJournal.getOne(id)
      if(Journal[0]){
        this.JournalModel = Journal[0]
        if(Journal[0].JournalCash[0]){
          this.JournalCash = Journal[0].JournalCash[0]
          this.JournalCash.PaymentType = this.JournalCash.Description
        }

        var date = this.JournalModel.JournalDate = this.formatDate(this.JournalModel.JournalDate)
        var totalDebit = 0
        var totalCredit = 0

        var JournalItem = await apiJournalItem.getByJrnID(Journal[0].Jrn_ID)
        for (var i = 0; i < JournalItem.length; i++) {
          JournalItem[i].idItem = i;
          JournalItem[i].credit = 0
          JournalItem[i].debet = 0
          if (JournalItem[i].IsDebet != 1) {
            // totalCredit += JournalItem[i].ItemValue
            JournalItem[i].TotalCredit = JournalItem[i].ItemValue
            JournalItem[i].credit = this.formatCurrency(JournalItem[i].ItemValue)
          }else{
            // totalDebit += JournalItem[i].ItemValue
            JournalItem[i].TotalDebet = JournalItem[i].ItemValue
            JournalItem[i].debet = this.formatCurrency(JournalItem[i].ItemValue)
          }
        }
        console.log('debit',totalDebit);
        console.log('credit',totalCredit);
        // JournalItem.push({AccountCode : "",Account : {Name:"Total"},credit : this.formatCurrency(totalCredit),debet : this.formatCurrency(totalDebit)})




        this.items = JournalItem
        this.idJournalItem = JournalItem[0].Jrn_ID

        this.itemsArray = () => this.items

        console.log(this.items, "e",Journal  );
      }

      // console.log(this.id);
    }else{
      this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.UM.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
      this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
      var journalNumber = await this.getCount(this.dataTableJournal)
      this.JournalModel.JournalNumber = journalNumber
    }
    this.loading = false
  },
  watch:{
    'JournalModel.JournalTypeId': async function (){
      console.log("TYPE JOURNAL",this.JournalModel.JournalTypeId)
      this.options_PaymentType = []
      if (this.JournalModel.JournalTypeId == 12) {
        for (var i = 0; i < this.PaymentType.length; i++) {
          if ((this.PaymentType[i].Jprog == 1) || (this.PaymentType[i].Jprog == 0)) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
          }
        }

        // var getall = await apiAccount.getByType('9.11')
        // this.options = [];
        //     for (var i = 0; i < getall.length; i++) {
        //       this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
        //     }
      }else if (this.JournalModel.JournalTypeId == 13) {
        for (var i = 0; i < this.PaymentType.length; i++) {
          if ((this.PaymentType[i].Jprog == 2) || (this.PaymentType[i].Jprog == 0)) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
          }
        }

          // var getall = await apiAccount.getByType('10,12')
          // this.options = [];
          //     for (var i = 0; i < getall.length; i++) {
          //       this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
          //     }
      }else {
        for (var i = 0; i < this.PaymentType.length; i++) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
        }
        // var getall = await apiAccount.getByType('9,11,10,12')
        // this.options = [];
        // for (var i = 0; i < getall.length; i++) {
        //   this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
        // }
      }
      this.getCOA()
    },
   'JournalItemModel.IsDebet': async function () {
      this.getCOA()
     // console.log(this.JournalItemModel.IsDebet);
     // if (this.JournalModel.JournalTypeId == 12) {
     //   if(this.JournalItemModel.IsDebet  ){
     //     var getall = await apiAccount.getByType(9)
     //     console.log("debit",getall);
     //     // this.loading = true
     //     this.options = [];
     //     for (var i = 0; i < getall.length; i++) {
     //       this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
     //     }
     //   }else {
     //     var getall1 = await apiAccount.getByTypeAndWorkareaISnull(11,this.cabang)
     //     console.log("credit",getall1);
     //     // this.loading = true
     //     this.options = [];
     //     for (var i = 0; i < getall1.length; i++) {
     //       this.options.push({ code: getall1[i].Code, name:getall1[i].Code +" - "+ getall1[i].Name })
     //     }
     //   }
     // }else if (this.JournalModel.JournalTypeId == 13) {
     //   if(this.JournalItemModel.IsDebet  ){
     //     var getall = await apiAccount.getByTypeAndWorkareaISnull(10,this.cabang)
     //     console.log("debit",getall);
     //     // this.loading = true
     //     this.options = [];
     //     for (var i = 0; i < getall.length; i++) {
     //       this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
     //     }
     //   }else {
     //     var getall1 = await apiAccount.getByTypeAndWorkareaISnull(12,this.cabang)
     //     console.log("credit",getall1);
     //     // this.loading = true
     //     this.options = [];
     //     for (var i = 0; i < getall1.length; i++) {
     //       this.options.push({ code: getall1[i].Code, name:getall1[i].Code +" - "+ getall1[i].Name })
     //     }
     //   }
     // }else {
     //   if(this.JournalItemModel.IsDebet  ){
     //     var getall = await apiAccount.getByType('9,10')
     //     console.log("debit",getall);
     //     // this.loading = true
     //     this.options = [];
     //     for (var i = 0; i < getall.length; i++) {
     //       this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
     //     }
     //   }else {
     //     var getall1 = await apiAccount.getByTypeAndWorkareaISnull('11,12',this.cabang)
     //     console.log("credit",getall1);
     //     // this.loading = true
     //     this.options = [];
     //     for (var i = 0; i < getall1.length; i++) {
     //       this.options.push({ code: getall1[i].Code, name:getall1[i].Code +" - "+ getall1[i].Name })
     //     }
     //   }
     // }
   },
   'debitor.Prov_code': async function () {
      if(this.debitor.Prov_code.value){
       this.getAllComboboxKotaKab(this.debitor.Prov_code.value)
      }
   },
   'debitor.Dist_code': async function(){
    if(this.debitor.Dist_code.value){
      this.getAllComboboxKecamatan(this.debitor.Dist_code.value)
    }
   }
 },
 computed: {
   TotalDebet : function (){
     return this.formatCurrency(this.items.reduce(function(a, c){
     return a + Number(c.TotalDebet  || 0);
     }, 0))
   },

   TotalCredit : function (){
     return this.formatCurrency(this.items.reduce(function(a, c){
     return a + Number(c.TotalCredit  || 0);
     }, 0))
   }
 },
  methods: {
    async getCOA(){
      var typeDebit = null
       var getall = null
       var getall1 = null
       console.log("DATA JRN",this.JournalModel.JournalTypeId)
      if(this.JournalModel.JournalTypeId == 12){
         getall = await apiAccount.getByType(9)
          getall1 = await apiAccount.getByTypeAndWorkareaISnull(11,this.cabang)
      }else if(this.JournalModel.JournalTypeId == 13){
          getall = await apiAccount.getByTypeAndWorkareaISnull(10,this.cabang)
          getall1 = await apiAccount.getByTypeAndWorkareaISnull(12,this.cabang)
      }else if(this.JournalModel.JournalTypeId == 14){
         getall = await apiAccount.getByTypeAndWorkareaISnull("9,10")
          getall1 = await apiAccount.getByTypeAndWorkareaISnull("11,12",this.cabang)
      }
      if(this.JournalItemModel.IsDebet  ){

           console.log("debit",getall);
           // this.loading = true
           this.options = [];
           for (var i = 0; i < getall.length; i++) {
             this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
           }
         }else {

           console.log("credit",getall1);
           // this.loading = true
           this.options = [];
           for (var i = 0; i < getall1.length; i++) {
             this.options.push({ code: getall1[i].Code, name:getall1[i].Code +" - "+ getall1[i].Name })
           }
         }
    },
    async SaveJournal(){
      if (this.items.length == 0) {
        alert('Harap Tambah Item Jurnal !')
      }else {
        this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
          .then(async (value) => {
            if(value  ){
                var cekUMK = await apiJournalUangMuka.cekJurnalUMK(this.debitor.IDNumber)
                if(cekUMK.Data == 0){
                  alert("Pegawai ybs belum selesai mempertanggungjawabkan uang muka sebelumnya")
                  this.$router.push('/accounting/jurnal-uang-muka')
                }else{
                  this.loading = true
                  const isUpdate = !!this.$route.params.id;
                  var totalDebet = 0
                  var totalCredit = 0

                  for (var i = 0; i < this.items.length; i++) {
                    this.items[i]
                    // if (this.items[i].debet != null) {
                      totalDebet +=  this.CurrencyToNumber(this.items[i].debet)
                    // }else if (this.items[i].credit != null) {
                      totalCredit +=  this.CurrencyToNumber(this.items[i].credit)
                    // }
                  }

                  console.log('totaldbt',totalDebet);
                  console.log('totalcrdt',totalCredit);

                  if (totalDebet != totalCredit) {
                    this.warning = 'Debet dan Credit harus seimbang'
                    this.loading = false
                    return
                  }

                  this.dataTableDeb.Search = this.cabang
                  this.dataTableDA.Search = 'PK' + this.cabang
                  this.dataTableDeb.Start =  this.dataTableDeb.Search.length + 1
                  this.dataTableDA.Start =  this.dataTableDA.Search.length + 1
                  var codeDebCode = await this.getCount(this.dataTableDeb)
                  var codeDACode = await this.getCount(this.dataTableDA)
                  console.log('generateDebCode',codeDebCode);
                  console.log('generateDACode',codeDACode);

                  this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.UM.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
                  this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
                  var journalNumber = await this.getCount(this.dataTableJournal)
                  this.JournalModel.JournalNumber = journalNumber

                  if (isUpdate) {
                    // this.JournalModel.IsPosting = 0
                    this.JournalModel.UpdatedBy = this.username

                    var journal = await apiJournal.update(this.$route.params.id, this.JournalModel);
                    this.loading = false
                    this.showNotif(journal,'Posting')
                    this.$router.push('/accounting/jurnal-uang-muka')
                    //
                    // await apiJournalItem.update(this.$route.params.id, this.items);
                  } else {
                      if (this.items.length > 0) {
                        this.JournalModel.WorkArea = this.cabang
                        this.JournalModel.CreatedBy = this.username
                        this.JournalModel.JournalNumber = journalNumber
                        this.JournalModel.IsPosting = 0
                        this.JournalModel.DACode = codeDACode
                        this.JournalModel.JournalItem = this.items
                        this.JournalModel.JournalCash = []
                        this.JournalCash.PaymentTypeId = this.JournalCash.PaymentType.value
                        this.JournalModel.JournalCash.push(this.JournalCash)
                        // console.log(this.JournalModel);

                        this.debitor.DebCode = codeDebCode
                        this.debitor.FullName = this.JournalCash.Receiver
                        this.debitor.WACode = this.cabang
                        if(this.debitor.Prov_code){
                          if(this.debitor.Prov_code.value){
                              this.debitor.ProvinceCode = this.debitor.Prov_code.value
                          }
                          if(this.debitor.Prov_code.label){
                            this.debitor.Prov_code = this.debitor.Prov_code.label
                          }
                        }
                        if(this.debitor.Dist_code){
                          if(this.debitor.Dist_code.value){
                            this.debitor.DistrictCode = this.debitor.Dist_code.value
                          }
                          if(this.debitor.Dist_code.label){
                            this.debitor.Dist_code = this.debitor.Dist_code.label
                          }
                        }
                        if(this.debitor.Subdis_code){
                          if(this.debitor.Subdis_code.value){
                            this.debitor.SubDistrictCode = this.debitor.Subdis_code.value
                          }
                          if(this.debitor.Subdis_code.label){
                            this.debitor.Subdis_code = this.debitor.Subdis_code.label
                          }
                        }


                        if (this.JournalModel.JournalTypeId == 12) {
                          this.debitor.Flag = 1
                        }else if (this.JournalModel.JournalTypeId == 13) {
                          this.debitor.Flag = 0
                        }else {

                        }
                        this.debitor.Amount = this.CurrencyToNumber(this.TotalCredit)
                        console.log('debitor',this.debitor);
                        console.log('isi',this.AmountCredit);
                        var save = await apiDebitor.SavePermohonanToPersetujuan(codeDACode, this.debitor)
                        var response = await apiJournal.create(this.JournalModel);
                        console.log('respon',response);
                        this.JournalUangMuka.Jrn_ID = response.Data
                        this.JournalUangMuka.ValueAdvances = this.CurrencyToNumber(this.TotalCredit)
                        this.JournalUangMuka.RemainingAdvances = this.CurrencyToNumber(this.TotalCredit)
                        this.JournalUangMuka.CreatedBy = this.username
                        var JournalUangMuka = await apiJournalUangMuka.create(this.JournalUangMuka)
                        this.loading = false
                        this.showNotif(JournalUangMuka,'Journal Item')
                        this.$router.push('/accounting/jurnal-uang-muka')
                      }
                  }
                }
            }
          })
          .catch(err => {
            // An error occurred
          })
      }

    },
    async AddJournalItem(){
      var x = await apiAccount.getOne(this.JournalItemModel.AccountCode.replace(/\s/g, ''))
      var debet = 0
      var credit = 0
      var TotalDebet = 0
      var TotalCredit = 0
      // console.log('add', x);
      if (this.JournalItemModel.IsDebet  ) {
         TotalDebet = this.JournalItemModel.ItemValue
         debet = this.formatCurrency(this.JournalItemModel.ItemValue)
      }else{
        console.log('credit',this.JournalItemModel.ItemValue);
         TotalCredit = this.JournalItemModel.ItemValue
         credit = this.formatCurrency(this.JournalItemModel.ItemValue)
        // this.AmountCredit = this.AmountCredit + this.JournalItemModel.ItemValue
      }
      this.items.push({Account:x[0],AccountCode:x[0].Code,IsDebet:this.JournalItemModel.IsDebet,ItemValue: this.JournalItemModel.ItemValue, debet: debet, credit: credit, TotalDebet: TotalDebet, TotalCredit: TotalCredit, action:'1'})
      this.itemsArray = () => this.items
      var response = { Status:true , Message: 'Operation success' }
      this.showNotif(response,'Journal Item')
      console.log(this.items);

    },
    async updatePosting(id,isPosting){
      try {
        const isUpdate = !!this.$route.params.id;
        console.log("he ", isUpdate)
        var Journal = { IsPosting:isPosting }
        var response = await apiJournal.updatePosting(id,Journal)
        this.showNotif(response,'Journal')
        this.$router.push('/accounting/jurnal-uang-muka')
        // this.getAll()
      }
      finally {

      }
    },
    formatDate(value) {
        return moment(String(value)).format('YYYY-MM-DD')
    },
    showModal () {
      this.$root.$emit('bv::show::modal','modal1', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal','modal1', '#btnShow')
    },
    onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      deleteItem: function(index,credit){
        // console.log(id);
        // this.items.splice(id,1)
        console.log(credit);
        this.AmountCredit = this.CurrencyToNumber(credit) - this.AmountCredit
        console.log('hapus item redit', this.AmountCredit);
        this.items.splice(index, 1);
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
   }

  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.full-width .card-header-tabs {
    margin-right: -21px;
    margin-left: -21px;
}

.full-width .nav-tabs .nav-item {
    margin-bottom: -1px;
    flex-grow: 1;
    text-align: center;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield;
}
</style>
