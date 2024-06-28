<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">

      <b-card>
        <div slot="header">
          <strong>Jurnal Kas Bank-BL</strong>
        </div>
        <form @submit.prevent="SaveJournal">
          <!-- <b-row>
            <b-col><label class="mr-sm-2" for="#">Program</label></b-col>
            <b-col><b-form-select v-model="Filter_Program" :options="options_Program"></b-form-select></b-col>
          </b-row> -->

          <b-row style="padding-top:20px">
            <b-col><label class="mr-sm-2" for="#">Nomor Jurnal</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalModel.JournalNumber" type="text" id="#" readonly required/></b-col>
          </b-row>

          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Tanggal Jurnal</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalModel.JournalDate" type="date" id="#" placeholder="" required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Deskripsi</label></b-col>
            <b-col><textarea id="#" rows="5" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " class="form-control" v-model="JournalModel.Description" placeholder="Pencairan dana tunai dari rekening giro" required></textarea></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalCash.Receiver" type="text" id="#"  required/></b-col>
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


          <c-table :table-data="items" :fields="fields" caption="Journal Item" custom="newSlot" routeName="Jurnal Kas Bank Form">
            <template slot-scope="{action}">
              <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.idItem)"></i>
            </template>
          </c-table>
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
                <router-link :to="{ name: 'Jurnal Kas Bank-BL', params: {} }"><b-col><b-button type="submit" variant="danger">Kembali</b-button></b-col></router-link>
              </b-col>
              <span style="margin-left:20px;"></span>
              <b-col md="1" class="my-1" v-if="(id == null )">
                <b-col><b-button type="submit" variant="primary">Simpan</b-button></b-col>

              </b-col>
          </b-row>
          <!-- <br>
          <b-row v-if="(id != null )||(JournalModel.IsPosting == 0)">

            <b-col><b-button type="submit" variant="primary">Posting</b-button></b-col>
          </b-row> -->
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
          checked="1"
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
      cabang:null,
      warning:'',
      idItem: -1,
      id:null,
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
        PaymentType:{
          Description:[]
        },
        JournalCash:{
          Verification: 'Fetty',
          Agreement: 'Agus'
        },
      options: [],
      options_PaymentType: [],
      Filter_Program : {},
      options_Program: [
        { text: 'PK', value: '1' },
        { text: 'BL', value: '0' },
        { text: 'PKBL', value: '3' }
      ],
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
        {key: 'Description', label: 'Deskripsi', sortable: true},
        {key: 'debet', label: 'Debet'},
        {key: 'credit', label: 'Credit'},
        {key: 'action', label: '',},
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
    this.cabang = localStorage.cabang
    let getCode = await dynamicCode.getCountByTransBL('/debTransaction/countByTrasacBL')
    let counter = getCode.Jrn_ID + 1
    let generateCode = this.cabang + '.2019.KB.IX.' + counter
    this.JournalModel.JournalNumber = generateCode

    var id = this.$route.params.id;
    this.id = id
    this.JournalItemModel.IsDebet = true
    if (this.id != null) {
      this.fields.splice(this.fields.length - 1,1)
    }



    var getall = await apiPaymentType.getComboBoxAll()
    // console.log("apake",getall);
    // this.loading = true
    this.options_PaymentType = [];
    for (var i = 0; i < getall.length; i++) {
      if (getall[i].Jprog == 2) {
        this.options_PaymentType.push({ label: getall[i].PrmrekId +" - "+ getall[i].Description,value: getall[i].PrmrekId  })
      }
    }



    if (id != null) {

      var Journal = await apiJournal.getOne(id)
      this.JournalModel = Journal[0]
      this.JournalCash = Journal[0].JournalCash[0]
      this.JournalCash.PaymentType = this.JournalCash.Description

      var date = this.JournalModel.JournalDate = this.formatDate(this.JournalModel.JournalDate)

      var totalDebit = 0
      var totalCredit = 0

      var JournalItem = await apiJournalItem.getByJrnID(Journal[0].Jrn_ID)
      for (var i = 0; i < JournalItem.length; i++) {
        JournalItem[i].idItem = i;
        if (JournalItem[i].IsDebet != 1) {
          totalCredit += JournalItem[i].ItemValue

          JournalItem[i].credit = this.formatCurrency(JournalItem[i].ItemValue)
        }else{
          totalDebit += JournalItem[i].ItemValue

          JournalItem[i].debet = this.formatCurrency(JournalItem[i].ItemValue)
        }

        JournalItem[i].Description = Journal[0].Description
      }
      console.log('debit',totalDebit);
      console.log('credit',totalCredit);
      JournalItem.push({AccountCode : "",Account : {Name:"Total"},credit : this.formatCurrency(totalCredit),debet : this.formatCurrency(totalDebit)})



      this.items = JournalItem
      this.idJournalItem = JournalItem[0].Jrn_ID

      this.itemsArray = () => this.items

      console.log(this.items, "e",Journal  );
      // console.log(this.id);
    }
  },
  watch:{
   'JournalItemModel.IsDebet': async function () {
     console.log(this.JournalItemModel.IsDebet);
     if(this.JournalItemModel.IsDebet){
       var getall = await apiAccount.getByType(5)
       console.log("debit",getall);
       // this.loading = true
       this.options = [];
       for (var i = 0; i < getall.length; i++) {
         this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
       }
     }else {
       var getall1 = await apiAccount.getByType(5)
       console.log("credit",getall1);
       // this.loading = true
       this.options = [];
       for (var i = 0; i < getall1.length; i++) {
         this.options.push({ code: getall1[i].Code, name:getall1[i].Code +" - "+ getall1[i].Name })
       }
     }
   }
 },
  methods: {
    async SaveJournal(){
      const isUpdate = !!this.$route.params.id;
      var totalDebet = 0
      var totalCredit = 0

      for (var i = 0; i < this.items.length; i++) {
        this.items[i]
        if (this.items[i].debet != null) {
          totalDebet += parseInt(this.items[i].debet)
        }else if (this.items[i].credit != null) {
          totalCredit += parseInt(this.items[i].credit)
        }
      }
        // console.log(this.JournalCash.PaymentTypeId.Code)
        // console.log(this.JournalModel)
        //
        // let dataJournal = await apiJournal.create(this.JournalModel)
        //
        // this.JournalCash.Jrn_ID = dataJournal.Data.Jrn_ID
        // this.JournalCash.PaymentTypeId = this.JournalCash.PaymentTypeId.Code
        //
        // let dataJournalCash = await apiJournal.createJournalCash(this.JournalCash)


      if (totalDebet != totalCredit) {
        this.warning = 'Debet dan Credit harus seimbang'
        return
      }

      if (isUpdate) {
        this.JournalModel.IsPosting = 1

        var journal = await apiJournal.update(this.$route.params.id, this.JournalModel);
        this.showNotif(journal,'Posting')
        this.$router.push('/accounting/jurnal-kas-bank')
        //
        // await apiJournalItem.update(this.$route.params.id, this.items);


      } else {
          if (this.items.length > 0) {
            this.JournalModel.IsPosting = 0
            this.JournalModel.JournalTypeId = 7
            this.JournalModel.JournalItem = this.items
            this.JournalModel.JournalCash = []
            this.JournalCash.PaymentTypeId = this.JournalCash.PaymentType.value
            this.JournalModel.JournalCash.push(this.JournalCash)
            // console.log("JOURNAL",this.JournalModel, 'AND', this.JournalCash);
             var response = await apiJournal.create(this.JournalModel);
            this.showNotif(response,'Journal Item')
            this.$router.push('/accounting/jurnal-kas-bank-bl')

          }
      }

    },
    async AddJournalItem(){
      var x = await apiAccount.getOne(this.JournalItemModel.AccountCode.replace(/\s/g, ''))
      if (this.JournalItemModel.IsDebet) {
        var debet = this.formatCurrency(this.JournalItemModel.ItemValue)
      }else{
        var credit = this.formatCurrency(this.JournalItemModel.ItemValue)
      }
      this.items.push({Account:x[0],AccountCode:x[0].Code,IsDebet:this.JournalItemModel.IsDebet,ItemValue: this.JournalItemModel.ItemValue, debet: debet, credit: credit, action:'1'})
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
    deleteItem(id){
      console.log(id);
      this.items.splice(id,1)

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
