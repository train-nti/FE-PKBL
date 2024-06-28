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
          <strong>Jurnal Accrual</strong>
        </div>
        <form @submit.prevent="SaveJournal">
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Program</label></b-col>
            <b-col><b-form-select :disabled="(typeJRN != null) || (id != null)" v-model="JournalModel.JournalTypeId" :options="options_Program"></b-form-select></b-col>
          </b-row>

          <div v-show="JournalModel.JournalTypeId">
            <b-row style="padding-top:20px">
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
              <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalCash.Receiver" type="text" id="#"  required/></b-col>
            </b-row>
            <br>

           <!--  <b-row>
              <b-col><label class="mr-sm-2" for="#">Jenis Pembayaran</label></b-col>
              <b-col><v-select :options="options_PaymentType" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " required v-model="JournalCash.PaymentType" /></b-col>
            </b-row>
            <br> -->

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


            <!-- <c-table :table-data="items" :fields="fields" caption="Journal Item" custom="newSlot" routeName="Jurnal Kas Bank Form">
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
                    <td><button type="button" class="btn btn-danger" :disabled="id != null" @click='deleteItem(index)' >Delete</button></td>
                  </tr>
                </tbody>
                <tr>
                  <td colspan="2" style="font-weight:bold; text-align:center">Total</td>
                  <td>{{TotalDebet}}</td>
                  <td>{{TotalCredit}}</td>
                </tr>
              </table>
            </b-row>

            <b-row v-if="idJournalItem == null">
              <b-col md="6" class="my-1">
                <b-button variant="primary" @click="showModal" ref="btnShow">Tambah Item</b-button>
              </b-col>
            </b-row>

            <hr>
            <b-row >
                <b-col md="1" class="my-1" v-if="id != null">
                  <router-link :to="{ name: 'Jurnal Accrual', params: {} }"><b-col><b-button type="submit" variant="">Kembali</b-button></b-col></router-link>
                </b-col>
                <span style="margin-left:20px;"></span>
                <b-col md="1" class="my-1" v-if="(id == null )">
                  <b-col><b-button type="submit" variant="primary">Simpan</b-button></b-col>

                </b-col>
                <b-col md="2" class="my-1" v-else-if="(id != null)&&(status == 'edit')">
                <b-col><b-button type="submit" variant="primary">Simpan Edit</b-button></b-col>
              </b-col>
            </b-row>
          </div>
        </form>
      </b-card>

    </b-col>
  </b-row>
  <!-- Modal Component -->
  <b-modal id="modal1" size='xl' title="Journal Item" hide-footer>
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
          :checked="JournalItemModel.IsDebet"
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
  import cTable from '@/views/base/Table.vue'
  import apiAccount from '@/api/AKAccountApiService';
  import apiJournal from '@/api/AKJournalApiService';
  import apiJournalAccual from '@/api/AKJournalAccrualApiService';
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
      typeJRN:null,
      JrnAccrual:null,
      idJournalItem: null,
      JournalModel: {
        JournalNumber: "",
        JournalDate: "",
        Description: "",
        JournalTypeId:null
      },
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'Rp. ',
          suffix: '',
          precision: 2,
          masked: false
        },
        PaymentType:{
          Description:[]
        },
        JournalCash:{

        },
        dataTableJournal: {
         Colum: "JournalNumber",
         Table: "Journal",
         Start: 0,
         Search: null
       },
      options: [],
      options_PaymentType: [],
      Filter_Program : {},
      JournalAccrual:{},
      options_Program: [
        { text: 'Program PK', value: 6 },
        { text: 'Program BL', value: 7 },
        { text: 'Program PKBL', value: 8 }
      ],
      JournalItemModel: {IsDebet: null},
      account: [],
      show: true,
      selected: [], // Must be an array reference!
      show: true,
      tabIndex: [0, 0],
      COAAccrualCode: null,
      COAAccrualName:null,
      items: [],
      fields: [
        {key: 'AccountCode', label: 'Kode Akun', sortable: true},
        {key: 'Account.Name', label: 'Nama Akun', sortable: true},
        // {key: 'Description', label: 'Deskripsi', sortable: true},
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
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.COAAccrualCode  = await this.getConfig("COA_ACCRUAL")
    this.COAAccrualName  = await this.getConfig("COA_ACCRUAL_NAME")
    // let getCode = await dynamicCode.getCountByTransBL('/debTransaction/countByTrasacBL')
    // let counter = getCode.Jrn_ID + 1
    // let generateCode = this.cabang + '.2019.KB.IX.' + counter
    // this.JournalModel.JournalNumber = generateCode

    this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.KB.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
    this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
    var journalNumber = await this.getCount(this.dataTableJournal)
    this.JournalModel.JournalNumber = journalNumber

    var id = this.$route.params.id;
    this.id = id
    var status = this.$route.params.status;
    this.status = status
    this.JournalItemModel.IsDebet = true
    if (this.id != null) {
      this.fields.splice(this.fields.length - 1,1)
    }

    this.JournalCash.Verification = await this.getConfig("JOURNAL_PENYETUJU")
    this.JournalCash.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")

    this.PaymentType = await apiPaymentType.getComboBoxAll()
    this.options_PaymentType = [];


    if (id != null) {

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
          if (JournalItem[i].IsDebet != 1) {
            JournalItem[i].TotalCredit = JournalItem[i].ItemValue
            JournalItem[i].credit = this.formatCurrency(JournalItem[i].ItemValue)
          }else{
            JournalItem[i].TotalDebet = JournalItem[i].ItemValue
            JournalItem[i].debet = this.formatCurrency(JournalItem[i].ItemValue)
          }

          JournalItem[i].Description = Journal[0].Description
        }
        console.log('debit',totalDebit);
        console.log('credit',totalCredit);
        // JournalItem.push({AccountCode : "",Account : {Name:"Total"},credit : this.formatCurrency(totalCredit),debet : this.formatCurrency(totalDebit)})

        this.items = JournalItem
        this.idJournalItem = JournalItem[0].Jrn_ID

        this.itemsArray = () => this.items

        console.log(this.items, "e",Journal  );

      }
    }
    if(this.$route.params.idAcc){
      this.JrnAccrual = this.$route.params.idAcc
     var dataAccrual = await apiJournalAccual.getOne(this.JrnAccrual)
     console.log("Data Accrual",dataAccrual)
     this.JournalAccrual = dataAccrual[0]
    }
    if(this.$route.params.type){
      this.typeJRN = this.$route.params.type
      this.JournalModel.JournalTypeId = this.typeJRN
      this.getPaymentAndCOA()
    }

    console.log("STATUS",this.status + this.JournalModel.IsPosting);
    this.loading = false
  },
  watch:{
    'JournalModel.JournalTypeId': async function (){
      this.getPaymentAndCOA()
    },
    'JournalItemModel.IsDebet': async function () {
     console.log(this.JournalItemModel.IsDebet);
       if(this.JournalItemModel.IsDebet){
         this.options = [];
         this.options.push({ code: this.COAAccrualCode, name:this.COAAccrualCode +" - "+ this.COAAccrualName })
       }else {
        var Type = null
        if(this.JournalModel.JournalTypeId == 6){
          Type = 6
        }else if(this.JournalModel.JournalTypeId == 7){
          Type = 5
        }else{
          Type = '5,6'
        }
        console.log("JOURNAL TYPE",this.JournalModel.JournalTypeId)
         var getall1 = await apiAccount.getByTypeAndWorkareaISnull(Type,this.cabang)
         this.options = [];
         for (var i = 0; i < getall1.length; i++) {
           this.options.push({ code: getall1[i].Code, name:getall1[i].Code +" - "+ getall1[i].Name })
         }
       }
   },
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
    async getPaymentAndCOA(){
     this.options_PaymentType = []
      if (this.JournalModel.JournalTypeId == 6) {
        for (var i = 0; i < this.PaymentType.length; i++) {
          if ((this.PaymentType[i].Jprog == 1) || (this.PaymentType[i].Jprog == 0)) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
          }
        }
      }else if (this.JournalModel.JournalTypeId == 7) {
        for (var i = 0; i < this.PaymentType.length; i++) {
          if ((this.PaymentType[i].Jprog == 2) || (this.PaymentType[i].Jprog == 0)) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
          }
        }
      }else {
        for (var i = 0; i < this.PaymentType.length; i++) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
        }
      }
    },
    async SaveJournal(){
      if (this.items.length == 0) {
        alert('Harap Tambah Item Jurnal !')
      }else {
        this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
          .then(async (value) => {
             if(value){
                 this.loading = true
                 const isUpdate = !!this.$route.params.id;
                 if (isUpdate) {
                   this.JournalModel.UpdatedBy = this.username

                   var journal = await apiJournal.update(this.$route.params.id, this.JournalModel);
                    this.loading = false
                   this.showNotif(journal,'Posting')
                   this.$router.push('/accounting/jurnal-accrual')
                   //
                   // await apiJournalItem.update(this.$route.params.id, this.items);


                 } else {

                   var totalDebet = 0
                   var totalCredit = 0
                    console.log('isUpdate',isUpdate);
                   for (var i = 0; i < this.items.length; i++) {
                     this.items[i]
                     console.log('baba',this.items[i]);
                     // if (this.items[i].debet != null) {
                       totalDebet += this.CurrencyToNumber(this.items[i].debet)
                     // }else if (this.items[i].credit != null) {
                       totalCredit += this.CurrencyToNumber(this.items[i].credit)
                       console.log('bibi',totalCredit);
                     // }
                   }

                   console.log('totaldbt',totalDebet);
                   console.log('totalcrdt',totalCredit);

                   if (totalDebet != totalCredit) {
                     this.warning = 'Debet dan Credit harus seimbang'
                     this.loading = false
                     return
                   }

                   this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.KB.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
                   this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
                   var journalNumber = await this.getCount(this.dataTableJournal)
                   this.JournalModel.JournalNumber = journalNumber

                     if (this.items.length > 0) {
                       this.JournalModel.WorkArea = this.cabang
                       this.JournalModel.CreatedBy = this.username
                       this.JournalModel.JournalNumber = journalNumber
                       this.JournalModel.IsPosting = 0
                       this.JournalModel.JournalItem = this.items
                       this.JournalModel.JournalCash = []
                       if(this.JournalCash.PaymentType){
                          if(this.JournalCash.PaymentType.value ){
                            this.JournalCash.PaymentTypeId = this.JournalCash.PaymentType.value
                          }
                       }
                       this.JournalModel.JournalCash.push(this.JournalCash)
                       // console.log("JOURNAL",this.JournalModel, 'AND', this.JournalCash);
                        var response = await apiJournal.create(this.JournalModel);
                        this.JournalAccrual.PaymentJrn_ID = response.Data
                        this.JournalAccrual.RevertDate = new Date()
                        this.JournalAccrual.UpdatedBy = this.username
                        let responseDataAccrual = await apiJournalAccual.update(this.JrnAccrual,this.JournalAccrual)
                        this.loading = false
                        console.log("Accrual",response)
                       this.showNotif(response,'Journal Accrual')
                       this.$router.push('/accounting/jurnal-accrual')

                     }
                 }
             }
          })
          .catch(err => {
            console.log("ERROR",err)
             // this.$router.push('/accounting/jurnal-kas-bank')
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
      if (this.JournalItemModel.IsDebet) {
         TotalDebet = this.JournalItemModel.ItemValue
         debet = this.formatCurrency(this.JournalItemModel.ItemValue)
      }else{
         TotalCredit = this.JournalItemModel.ItemValue
         credit = this.formatCurrency(this.JournalItemModel.ItemValue)
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
        this.$router.push('/accounting/jurnal-kas-bank')
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
      deleteItem: function(index){
        // console.log(id);
        // this.items.splice(id,1)
        this.items.splice(index, 1);
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
</style>
