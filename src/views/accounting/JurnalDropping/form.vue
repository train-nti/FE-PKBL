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
          <strong>Jurnal Transfer Dana Bank</strong>
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

            <!-- <b-row>
              <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="Kepada" type="text" id="#"  required/></b-col>
            </b-row>
            <br>

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Jenis Pembayaran</label></b-col>
              <b-col><b-form-select v-model="jenis"  :options="options_LastEducation"></b-form-select></b-col>
            </b-row>
            <br>

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Permintaan Bayar</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="Permintaan" type="text" id="#"  required/></b-col>
            </b-row>
            <br>

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Verifikasi</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="verifikasi.isi" type="text" id="#"  required/></b-col>
            </b-row>
            <br>

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Penyetujui</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="penyetuju.isi" type="text" id="#"  required/></b-col>
            </b-row>
            <br> -->

            <b-button v-b-toggle.collapse-1 variant="light">Pengirim</b-button>
              <b-collapse id="collapse-1" class="mt-2">
                <b-card>
                  <b-row>
                    <b-col><label class="mr-sm-2" for="#">Pengirim</label></b-col>
                    <b-col><v-select :options="options_WorkArea2" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " disabled v-model="JournalDropping.SenderWorkArea" /></b-col>
                  </b-row>
                  <br>

                  <!-- <b-row>
                    <b-col><label class="mr-sm-2" for="#">Jenis Pembayaran</label></b-col>
                    <b-col><v-select :options="options_PaymentType" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " required v-model="JournalCash.PaymentType" /></b-col>
                  </b-row>
                  <br> -->

                  <b-row>
                    <b-col><label class="mr-sm-2" for="#">Kode Akun Pengirim</label></b-col>
                    <!-- <b-col><b-form-select id="#" :options="account" required v-model="JournalItemModel.Account" /></b-col> -->
                    <b-col>  <v-select :options="options" :disabled="id != null" label="name" required v-model="JournalModel.JournalItem[0].SenderAcountCode" /></b-col>
                  </b-row>
                  <br>

                  <b-row>
                    <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
                    <b-col><v-select :options="options_WorkArea1" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalDropping.ReceiverWorkArea" /></b-col>
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
                </b-card>
              </b-collapse>
              <br>
              <br>

              <b-button v-b-toggle.collapse-2 variant="light">Penerima</b-button>
                <b-collapse id="collapse-2" class="mt-2">
                  <b-card>
                    <!-- <b-row>
                      <b-col><label class="mr-sm-2" for="#">Tanggal Kirim</label></b-col>
                      <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalDropping.SentDate" type="date" id="#" placeholder="" required/></b-col>
                    </b-row>
                    <br> -->

                    <b-row>
                      <b-col><label class="mr-sm-2" for="#">Kode Akun Penerima</label></b-col>
                      <!-- <b-col><b-form-select id="#" :options="account" required v-model="JournalItemModel.Account" /></b-col> -->
                      <b-col>  <v-select :options="options1" :disabled="id != null" label="name" required v-model="JournalModel.JournalItem[1].ReceiverAcountCode" /></b-col>
                    </b-row>
                    <br>

                    <b-row>
                      <b-col><label class="mr-sm-2" for="#">Jumlah </label></b-col>
                      <b-col><money class="form-control" :disabled="id != null" id="#" v-model="setVallue" v-bind="money"></money></b-col>
                      <!-- <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="Permintaan" type="text" id="#"  required/></b-col> -->
                    </b-row>
                    <br>

                    <b-row>
                      <b-col><label class="mr-sm-2" for="#">Keperluan</label></b-col>
                      <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalDropping.Necessity" type="text" id="#"  required/></b-col>
                    </b-row>
                    <br>
                  </b-card>
                  <b-row>
                    <b-col md="3" v-if="(id == null )">
                      <b-col><b-button @click="AddJournalItem()" variant="primary">Tambah Akun</b-button></b-col>
                    </b-col>
                  </b-row>
                </b-collapse>
            <big class="text-danger">&nbsp;&nbsp; {{ warning }} </big><br><br>


            <!-- <c-table :table-data="items" :fields="fields" caption="Journal Item" custom="newSlot" routeName="Jurnal Dropping Form">
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
                      <td>{{item.Account}}</td>
                      <td>{{item.Debit}}</td>
                      <td>{{item.Credit}}</td>
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

            <!-- <b-row v-if="idJournalItem == null">
              <b-col md="6" class="my-1">
                <b-button variant="primary" @click="showModal" ref="btnShow">Tambah Item</b-button>
              </b-col>
            </b-row> -->
            <!-- Posting Journal -->
            <!-- <b-row>
              <b-col md="6" class="my-1" v-if="JournalModel.IsPosting == 0">
                <b-button variant="primary" @click="updatePosting(JournalModel.Jrn_ID, 1)" ref="btnShow">Posting</b-button>
              </b-col>
            </b-row> -->


            <hr>
            <b-row >
                <b-col md="1" class="my-1" v-if="id != null">
                  <router-link :to="{ name: 'Jurnal Transfer Dana Bank', params: {} }"><b-col><b-button type="submit" variant="">Kembali</b-button></b-col></router-link>
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
          <!-- <br>
          <b-row v-if="(id != null )||(JournalModel.IsPosting == 0)">

            <b-col><b-button type="submit" variant="primary">Posting</b-button></b-col>
          </b-row> -->
        </form>
      </b-card>

    </b-col>
  </b-row>
  <!-- Modal Component -->
  <b-modal id="modal1" title="Journal Item" hide-footer>
    <b-row>
      <b-col><label class="mr-sm-2" for="#">Akun</label></b-col>
      <!-- <b-col><b-form-select id="#" :options="account" required v-model="JournalItemModel.Account" /></b-col> -->
      <b-col>  <v-select :options="options" :reduce="name => name.code" label="name" required v-model="JournalItemModel.AccountCode" /></b-col>
    </b-row>
    <br>

    <b-row>
      <b-col><label class="mr-sm-2" for="#">Tipe Item</label></b-col>
      <b-col>
        <b-form-radio-group id="basicRadios" style="font-size:14.5 !important"
          :plain="true"
          :options="[
            {text: 'Debet',value: true,style: 'margin-bottom:10px'},
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
      <b-col><money class="form-control" id="#" v-model="JournalItemModel.ItemValue" v-bind="money"></money></b-col>
      <!-- <b-col><b-input class="mb-2 mb-sm-0" type="number" id="#" placeholder="30.000.000" required v-model="JournalItemModel.ItemValue" /></b-col> -->
    </b-row>
    <br>

    <!-- <b-button variant="primary" block class="float-right" v-on:click="AddJournalItem()">Tambah Item</b-button> -->
  </b-modal>

</div>
</template>

<script>
  import dynamicCode from '@/api/DynamicApiService';
  import cTable from '@/views/base/Table.vue'
  import apiAccount from '@/api/AKAccountApiService';
  import apiJournal from '@/api/AKJournalApiService';
  import apiWorkArea1 from '@/api/WorkArea1ApiService';
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
      warning:'',
      cabang:null,
      setVallue:0,
      idItem: -1,
      id:null,
      status: '',
      idJournalItem: null,
      JournalModel: {
        JournalNumber: "",
        JournalDate: "",
        Description: "",
        WorkArea: "",
        JournalItem:[{},{}]
      },
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'Rp. ',
          suffix: '',
          precision: 2,
          masked: false
        },
        // verifikasi:{
        //     isi : 'Vetty'
        // },
        // penyetuju:{
        //   isi:'Agus Sugiarso'
        // },
        PaymentType:{
          Description:[]
        },
        JournalDropping:{},
        JournalCash:{

        },
        dataTableJournal: {
         Colum: "JournalNumber",
         Table: "Journal",
         Start: 0,
         Search: null
       },
        options_Program: [
          { text: 'Program PK', value: 15 },
          { text: 'Program BL', value: 16 },
          { text: 'Program PKBL', value: 17 }
        ],
      IsDebet:null,
      options: [],
      options1: [],
      options_PaymentType: [],
      options_WorkArea1: [],
      options_WorkArea2: [],
      JournalItemModel: {},
      account: [],
      show: true,
      selected: [], // Must be an array reference!
      show: true,
      tabIndex: [0, 0],
      items: [],
      fields: [
        {key: 'AccountCode', label: 'Akun', sortable: true},
        {key: 'Account', label: 'Nama Akun', sortable: true},
        {key: 'Debit', label: 'Debet'},
        {key: 'Credit', label: 'Credit'},
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
    // let getCode = await dynamicCode.getCountByTransBL('/debTransaction/countByTrasacBL')
    // let counter = getCode.Jrn_ID + 1
    // let generateCode = this.cabang + '.2019.DR.' + counter
    // this.JournalModel.JournalNumber = generateCode

    // let pengirim =
    // this.JournalDropping.SenderWorkArea = pengirim

    var id = this.$route.params.id;
    this.id = id
    var status = this.$route.params.status;
    this.status = status
    console.log('status bro',this.status);
    if (this.id != null) {
      this.fields.splice(this.fields.length - 1,1)
    }
    // var getall = await apiAccount.getAll()
    // // console.log(getall);
    // // this.loading = true
    // this.options = [];
    // for (var i = 0; i < getall.length; i++) {
    //   this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
    // }

    this.JournalCash.Verification = await this.getConfig("JOURNAL_PENYETUJU")
    this.JournalCash.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")

    this.PaymentType = await apiPaymentType.getComboBoxAll()
    this.options_PaymentType = [];

    var getall = await apiWorkArea1.getComboBoxByCodeLogin(this.cabang)
    this.options_WorkArea1 = [];
    for (var i = 0; i < getall.length; i++) {
      this.options_WorkArea1.push({ label:getall[i].Code +" - "+ getall[i].Name,value: getall[i].Code  })
    }

    var getMor = await apiWorkArea1.getByCode(this.cabang)
    console.log('mornya', getMor);
    this.options_WorkArea2 = [];
    for (var i = 0; i < getMor.length; i++) {
      this.options_WorkArea2.push({ label:getMor[i].Code +" - "+ getMor[i].Name,value: getMor[i].Code  })
    }
    this.JournalDropping.SenderWorkArea = { label:getMor[0].Code +" - "+ getMor[0].Name,value: getMor[0].Code  }

    console.log(getall,'combo');

    if (id != null) {

      var GetDetail = await apiJournal.getJurnalGabungan(id)
      console.log('detail',GetDetail);
      var GetSenderWorkArea = await apiWorkArea1.getByCode(GetDetail.SenderWorkArea)
      console.log('wa',GetDetail.SenderWorkArea);
      var JournalItem = await apiJournalItem.getByJrnID(GetDetail.Jrn_ID)
      console.log('item',JournalItem);
      this.JournalModel.JournalTypeId = 15
      this.JournalModel.JournalNumber = GetDetail.JournalNumber
      this.JournalModel.JournalDate = this.formatDate(GetDetail.JournalDate)
      this.JournalModel.Description = GetDetail.Description
      this.JournalDropping.SenderWorkArea = GetDetail.SenderWorkArea
      this.JournalCash.PaymentType = GetDetail.PaymentDesc
      this.JournalModel.JournalItem[0].SenderAcountCode = JournalItem[0].AccountCode + ' - ' + JournalItem[0].Account.Name
      this.JournalDropping.ReceiverWorkArea = GetDetail.ReceiverWorkArea
      this.JournalCash.RequestToPay = GetDetail.RequestToPay
      this.JournalCash.Verification = GetDetail.Verification
      this.JournalCash.Agreement = GetDetail.Agreement
      this.JournalDropping.SentDate = this.formatDate(GetDetail.SentDate)
      this.JournalModel.JournalItem[1].ReceiverAcountCode = JournalItem[1].AccountCode + ' - ' + JournalItem[1].Account.Name
      this.setVallue = GetDetail.ItemValue
      this.JournalDropping.Necessity = GetDetail.Necessity

      var totalDebit = 0
      var totalCredit = 0
      var JurnalItem = await apiJournalItem.getByJrnID(GetDetail.Jrn_ID)
      for (var i = 0; i < JurnalItem.length; i++) {
        JurnalItem[i]
        var data = JurnalItem[i]
        data.Account = data.Account.Name
        data.Credit = 0
        data.Debit = 0
        if (data.IsDebet) {
          data.TotalDebet = data.ItemValue
          data.Debit = this.formatCurrency(data.ItemValue)
        }else {
          data.TotalCredit = data.ItemValue
          data.Credit = this.formatCurrency(data.ItemValue)
        }
        this.items.push(data)
      }
      // this.items.push({AccountCode : "",Account : "Total",Credit : this.formatCurrency(totalCredit),Debit : this.formatCurrency(totalDebit)})
    }else{
        this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.DR.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
        this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
        var journalNumber = await this.getCount(this.dataTableJournal)
        this.JournalModel.JournalNumber = journalNumber
    }
    this.loading = false

  },
  watch:{
    'JournalModel.JournalTypeId': async function (){
      this.options_PaymentType = []
      if (this.JournalModel.JournalTypeId == 15) {
        for (var i = 0; i < this.PaymentType.length; i++) {
          if ((this.PaymentType[i].Jprog == 1) || (this.PaymentType[i].Jprog == 0)) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
          }
        }

        if (this.cabang == 9900) {
          var getall = await apiAccount.getByTypeAndWorkarea(this.cabang,23)
          this.options = [];
              for (var i = 0; i < getall.length; i++) {
                this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
          }
        }else {
          var getall = await apiAccount.getByTypeAndWorkarea(this.cabang,25)
          this.options = [];
              for (var i = 0; i < getall.length; i++) {
                this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
          }
        }

      }else if (this.JournalModel.JournalTypeId == 16) {
        for (var i = 0; i < this.PaymentType.length; i++) {
          if ((this.PaymentType[i].Jprog == 2) || (this.PaymentType[i].Jprog == 0)) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
          }
        }

        if (this.cabang == 9900) {
          var getall = await apiAccount.getByTypeAndWorkarea(this.cabang,24)
          this.options = [];
              for (var i = 0; i < getall.length; i++) {
                this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
              }
        }else {
          var getall = await apiAccount.getByTypeAndWorkarea(this.cabang,26)
          this.options = [];
              for (var i = 0; i < getall.length; i++) {
                this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
              }
        }


      }else {
        for (var i = 0; i < this.PaymentType.length; i++) {
            this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
        }

        if (this.cabang == 9900) {
            var getall = await apiAccount.getByTypeAndWorkarea(this.cabang,'23,24')
            this.options = [];
            for (var i = 0; i < getall.length; i++) {
            this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
          }
        }else {
          var getall = await apiAccount.getByTypeAndWorkarea(this.cabang,'25,26')
          this.options = [];
          for (var i = 0; i < getall.length; i++) {
            this.options.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
          }
        }

      }
    },

    'JournalDropping.ReceiverWorkArea': async function (){
      if (this.JournalModel.JournalTypeId == 15) {
        console.log('kepada',this.JournalDropping.ReceiverWorkArea);
        if (this.cabang == 9900) {
          var getall = await apiAccount.getByTypeAndLikeWorkarea(this.JournalDropping.ReceiverWorkArea.value,25)
              this.options1 = [];
                  for (var i = 0; i < getall.length; i++) {
                    this.options1.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
                  }
        }else {
          var getall = await apiAccount.getByTypeAndLikeWorkarea(this.JournalDropping.ReceiverWorkArea.value,23)
              this.options1 = [];
                  for (var i = 0; i < getall.length; i++) {
                    this.options1.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
                  }
        }

      }else if (this.JournalModel.JournalTypeId == 16) {
        if (this.cabang == 9900) {
          var getall = await apiAccount.getByTypeAndLikeWorkarea(this.JournalDropping.ReceiverWorkArea.value,26)
              this.options1 = [];
                  for (var i = 0; i < getall.length; i++) {
                    this.options1.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
                  }
        }else {
          var getall = await apiAccount.getByTypeAndLikeWorkarea(this.JournalDropping.ReceiverWorkArea.value,24)
              this.options1 = [];
                  for (var i = 0; i < getall.length; i++) {
                    this.options1.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
                  }
        }
      }else {

        if (this.cabang == 9900) {
          var getall = await apiAccount.getByTypeAndLikeWorkarea(this.JournalDropping.ReceiverWorkArea.value,'25,26')
              this.options1 = [];
                  for (var i = 0; i < getall.length; i++) {
                    this.options1.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
                  }
        }else {
          var getall = await apiAccount.getByTypeAndLikeWorkarea(this.JournalDropping.ReceiverWorkArea.value,'23,24')
              this.options1 = [];
                  for (var i = 0; i < getall.length; i++) {
                    this.options1.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
                  }
        }

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
    async SaveJournal(){
      if (this.items.length == 0) {
        alert('Harap Tambah Akun Jurnal !')
      }else {
            this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
            .then(async (value) => {
              if(value){
                this.loading = true
                const isUpdate = !!this.$route.params.id;

                if (isUpdate) {
                  this.JournalModel.IsPosting = 1
                  this.JournalModel.UpdatedBy = this.username

                  var journal = await apiJournal.update(this.$route.params.id, this.JournalModel);
                  console.log('save edit',journal);
                  this.loading = false
                  this.showNotif(journal,'Posting')
                  this.$router.push('/accounting/jurnal-dropping')
                }else {
                  if (this.items.length > 0) {
                    this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.DR.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
                    this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
                    var journalNumber = await this.getCount(this.dataTableJournal)
                    this.JournalModel.JournalNumber = journalNumber

                    this.JournalModel.WorkArea = this.cabang
                    this.JournalModel.CreatedBy = this.username
                    this.JournalModel.IsPosting = 0
                    this.JournalModel.JournalCash = []
                    // this.JournalCash.PaymentTypeId = this.JournalCash.PaymentType.value
                    this.JournalModel.JournalDropping = this.JournalDropping
                    this.JournalDropping.ReceiverWorkArea = this.JournalDropping.ReceiverWorkArea.value
                    this.JournalDropping.SenderWorkArea = this.cabang
                    this.JournalModel.JournalCash.push(this.JournalCash)

                    console.log('coba',this.items);
                    this.JournalModel.JournalItem = this.items

                    console.log(this.JournalModel,'save');
                    var response = await apiJournal.createDropping(this.JournalModel);
                    this.loading = false
                    this.showNotif(response,'Journal Item')
                    this.$router.push('/accounting/jurnal-dropping')
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
      var pengirim = await apiAccount.getByTypeAndLikeWorkarea(this.JournalDropping.ReceiverWorkArea.value,27)
      console.log('prantara region',pengirim);


      var penerima = await apiAccount.getByTypeAndLikeCode(this.cabang,28)
      console.log('prantara Pusat',penerima);

      var debet = 0
      var credit = 0
      var x = await apiAccount.getOne(this.JournalModel.JournalItem[0].SenderAcountCode.code.replace(/\s/g, ''))
      console.log('woii',x[0]);
      this.JournalModel.JournalItem[0].Account = x[0].Name
      var x = await apiAccount.getOne(this.JournalModel.JournalItem[1].ReceiverAcountCode.code.replace(/\s/g, ''))
      this.JournalModel.JournalItem[1].Account = x[0].Name

      this.JournalModel.JournalItem[2] = pengirim[0]
      this.JournalModel.JournalItem[3] = penerima[0]

      this.JournalModel.JournalItem[0].AccountCode = this.JournalModel.JournalItem[0].SenderAcountCode.code
      this.JournalModel.JournalItem[1].AccountCode = this.JournalModel.JournalItem[1].ReceiverAcountCode.code
      this.JournalModel.JournalItem[2].AccountCode = pengirim[0].Code
      this.JournalModel.JournalItem[3].AccountCode = penerima[0].Code
      this.JournalModel.JournalItem[2].Account = pengirim[0].Name
      this.JournalModel.JournalItem[3].Account = penerima[0].Name
      this.JournalModel.JournalItem[0].IsDebet = false
      this.JournalModel.JournalItem[1].IsDebet = true
      this.JournalModel.JournalItem[2].IsDebet = true
      this.JournalModel.JournalItem[3].IsDebet = false
      this.JournalModel.JournalItem[0].TotalCredit = this.setVallue
      this.JournalModel.JournalItem[1].TotalDebet = this.setVallue
      this.JournalModel.JournalItem[2].TotalDebet = this.setVallue
      this.JournalModel.JournalItem[3].TotalCredit = this.setVallue
      this.JournalModel.JournalItem[0].Credit = this.formatCurrency(this.setVallue)
      this.JournalModel.JournalItem[1].Debit = this.formatCurrency(this.setVallue)
      this.JournalModel.JournalItem[2].Debit = this.formatCurrency(this.setVallue)
      this.JournalModel.JournalItem[3].Credit = this.formatCurrency(this.setVallue)
      this.JournalModel.JournalItem[0].Debit = debet
      this.JournalModel.JournalItem[1].Credit = credit
      this.JournalModel.JournalItem[3].Debit = debet
      this.JournalModel.JournalItem[2].Credit = credit
      this.JournalModel.JournalItem[0].ItemValue =  this.setVallue
      this.JournalModel.JournalItem[1].ItemValue =  this.setVallue
      this.JournalModel.JournalItem[2].ItemValue = this.setVallue
      this.JournalModel.JournalItem[3].ItemValue = this.setVallue
      // this.JournalModel.JournalItem[0].SenderAcountCode = []
      // this.JournalModel.JournalItem[1].ReceiverAcountCode = []
      // this.JournalModel.JournalItem[2].SenderAcountCode = []
      // this.JournalModel.JournalItem[3].ReceiverAcountCode = []
      this.items = this.JournalModel.JournalItem

      // this.itemsArray = () => this.items
      // var response = { Status:true , Message: 'Operation success' }
      // this.showNotif(response,'Journal Item')
      console.log("itemss ", this.items);

    },
    async updatePosting(id,isPosting){
      try {
        const isUpdate = !!this.$route.params.id;
        console.log("he ", isUpdate)
        var Journal = { IsPosting:isPosting }
        var response = await apiJournal.updatePosting(id,Journal)
        this.showNotif(response,'Journal')
        this.$router.push('/accounting/jurnal-dropping')
        // this.getAll()
      }
      finally {

      }
    },
    formatDate(value) {
        return moment(String(value)).format('YYYY-MM-DD')
    },
    test(){


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
      console.log(index);
      console.log(this.items);
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
