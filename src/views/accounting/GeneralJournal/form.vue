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
          <strong>Jurnal Posting</strong>
        </div>
        <form @submit.prevent="SaveJournal">
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nomor Jurnal</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalModel.JournalNumber" type="text" id="#" placeholder="JKM01001" required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Tanggal Jurnal</label></b-col>
            <b-col>
                <date-picker  style="width: 100%;" v-model="JournalModel.JournalDate" :input-attr="{ required: true }"  :disabled="(id != null )&&(JournalModel.IsPosting != 0) "  valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                <!-- <b-input class="mb-2 mb-sm-0" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalModel.JournalDate" type="date" id="#" placeholder="" required/> -->
            </b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Deskripsi</label></b-col>
            <b-col><textarea id="#" rows="5" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " class="form-control" v-model="JournalModel.Description" placeholder="Pencairan dana tunai dari rekening giro" required></textarea></b-col>
          </b-row>
          <br>

        <!-- <template v-if="JrnCashID ">
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalCash.Receiver" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Jenis Pembayaran</label></b-col>
            <b-col><v-select :options="options_PaymentType" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " required v-model="JournalCash.PaymentType" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Permintaan Bayar</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalCash.RequestToPay" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Verifikasi</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalCash.Verification" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Penyetujui</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="(id != null )&&(JournalModel.IsPosting != 0) " v-model="JournalCash.Agreement" type="text" id="#"  required/></b-col>
          </b-row>
          <br>
        </template> -->
          <br>
          <big class="text-danger">&nbsp;&nbsp; {{ warning }} </big><br><br>


          <c-table :table-data="items" :fields="fields" caption="Journal Item" custom="newSlot" routeName="General Journal Form">
            <template slot-scope="{action}">
              <i class="fa fa-trash fa-md text-danger button-icon">wwww</i>
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
                <router-link :to="{ name: 'General Journal', params: {} }"><b-col><b-button type="submit" variant="danger">Kembali</b-button></b-col></router-link>
              </b-col>
              <span style="margin-left:20px;"></span>
              <b-col md="1" class="my-1" v-if="(id != null )&&(JournalModel.IsPosting == 0)">
                <b-col><b-button type="submit" :disabled="activeBtnSave" variant="primary">Posting</b-button></b-col>
              </b-col>
              <b-col md="1" class="my-1" v-else>
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
            {text: 'Debet',value: '1',style: 'margin-bottom:10px'},
            {text: 'Credit',value: '2',style: 'margin-bottom:10px'}
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

    <b-button variant="primary" block class="float-right" v-on:click="AddJournalItem()">Tambah Item</b-button>
  </b-modal>

</div>
</template>

<script>
  import cTable from '@/views/base/Table.vue'
  import apiPaymentType from '@/api/PaymentTypeApiService';
  import apiAccount from '@/api/AKAccountApiService';
  import apiJournal from '@/api/AKJournalApiService';
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
      //Btn disabled
      configConfirm:null,
      textConfirm:null,
      loading:false,
      activeBtnSave : false,
      warning:'',
      JrnCashID : null,
      idItem: -1,
      id:null,
      idJournalItem: null,
      JournalCash:{},
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
      options: [],
      options_PaymentType: [],
      JournalItemModel: {},
      account: [],
      show: true,
      selected: [], // Must be an array reference!
      show: true,
      tabIndex: [0, 0],
      items: [],
      fields: [
        {key: 'Code', label: 'Kode Akun', sortable: true},
        {key: 'Name', label: 'Nama Akun', sortable: true},
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
    this.loading = true
    this.cabang = localStorage.cabang
    console.log('cabang',this.cabang);
    this.username = localStorage.username
    console.log('username',this.username);
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    var id = this.$route.params.id;
    this.id = id
    if (this.id != null) {
      this.fields.splice(this.fields.length - 1,1)
    }
    var getall = await apiAccount.getAll()
    // console.log(getall);
    // this.loading = true
    this.options = [];
    for (var i = 0; i < getall.length; i++) {
      this.options.push({ code: getall[i].Code, name: getall[i].Name })
    }

    this.PaymentType = await apiPaymentType.getComboBoxAll()
    this.options_PaymentType = [];
    for (var i = 0; i < this.PaymentType.length; i++) {
        this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
    }
    console.log(this.PaymentType,'wo');

    if (id != null) {
      var Journal = await apiJournal.getOne(id)
      this.JournalModel = Journal[0]
      this.JournalCash = Journal[0].JournalCash[0]
      if (this.JournalCash) {
        this.JournalCash.PaymentType = this.JournalCash.Description
        this.JrnCashID =  Journal[0].JournalCash[0].JrnCashID
      }

      var date = this.JournalModel.JournalDate = this.formatDate(this.JournalModel.JournalDate)
      console.log("ini journal", this.JournalCash);
      var totalDebit = 0
      var totalCredit = 0

      var JournalItem = await apiJournalItem.getByJrnID(Journal[0].Jrn_ID)
      for (var i = 0; i < JournalItem.length; i++) {
        JournalItem[i].idItem = i;
        JournalItem[i].Code = JournalItem[i].AccountCode
        JournalItem[i].Name = JournalItem[i].Account.Name
        JournalItem[i].credit = 0
        JournalItem[i].debet = 0
        if (JournalItem[i].IsDebet != 1) {
          totalCredit += JournalItem[i].ItemValue

          JournalItem[i].credit = this.formatCurrency(JournalItem[i].ItemValue)
        }else{
          totalDebit += JournalItem[i].ItemValue

          JournalItem[i].debet = this.formatCurrency(JournalItem[i].ItemValue)
        }
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
    this.loading = false
  },
  methods: {
    async SaveJournal(){
      this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
      .then(async (value) => {
            if(value){
              this.loading = true
              this.activeBtnSave = true
              const isUpdate = !!this.$route.params.id;
              var totalDebet = 0
              var totalCredit = 0

              for (var i = 0; i < (this.items.length - 1); i++) {
                this.items[i]
                // if (this.items[i].debet != null) {
                  totalDebet += this.CurrencyToNumber(this.items[i].debet)
                // }else if (this.items[i].credit != null) {
                  totalCredit += this.CurrencyToNumber(this.items[i].credit)
                // }
              }
              console.log(totalDebet,totalCredit);
              if (totalDebet != totalCredit) {
                this.warning = 'Debet dan Credit harus seimbang'
                this.loading = false
                return
              }

              if (isUpdate) {
                this.JournalModel.IsPosting = 1
                this.JournalModel.UpdatedBy = this.username
                var journal = await apiJournal.update(this.$route.params.id, this.JournalModel);
                this.showNotif(journal,'Posting')
                this.$router.push('/accounting/jurnal-pos')
                //
                // await apiJournalItem.update(this.$route.params.id, this.items);


              } else {
                  if (this.items.length > 0) {
                    this.JournalModel.IsPosting = 1
                    // this.JournalModel.UpdatedBy = this.username
                    await apiJournal.create(this.JournalModel);
                    var JrnID = await apiJournal.getLast();
                    await apiJournalItem.create(this.items, JrnID[0].Jrn_ID);
                    this.loading = false
                    this.showNotif(response,'Journal Item')
                    this.$router.push('/accounting/general-journal')
                  }
              }
            }
        })
        .catch(err => {
        // An error occurred
        })

    },
    async AddJournalItem(){
      var x = await apiAccount.getOne(this.JournalItemModel.AccountCode.replace(/\s/g, ''))
      if (this.JournalItemModel.IsDebet == "1") {
        var debet = this.JournalItemModel.ItemValue
      }else{
        var credit = this.JournalItemModel.ItemValue
      }
      this.items.push({Account:x[0], debet: debet, credit: credit, action:'1'})
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
        this.$router.push('/accounting/general-journal')
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
