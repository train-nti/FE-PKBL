<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Chart Of Account </strong>
        </div>
        <b-tabs class="full-width" v-model="tabIndex[0]">
            <!-- <b-button variant="primary">Save</b-button> -->
          </b-tab>
          <b-tab>
            <template slot="title">
              {{tabs[0]}}
            </template>
            <b-card-group deck>
              <b-card header="AKTIVA" header-tag="header" footer-tag="footer">
                <b-card-text>
                  <c-table :table-data="itemsAG1" :fields="fields" caption="" routeName="Chart Of Account Form"
                           :isCoaDetail='true' :coaDetail="accountGroupDetail" fieldId="GrpCode" :editField="editAcccountGroup"></c-table>
                </b-card-text>
              </b-card>

              <b-card header="PASSIVA" header-tag="header" footer-tag="footer">
                <b-card-text>
                  <c-table :table-data="itemsAG2" :fields="fields" caption="" routeName="Chart Of Account Form"
                  :isCoaDetail='true' :coaDetail="accountGroupDetail" fieldId="GrpCode" :editField="editAcccountGroup"></c-table>
                </b-card-text>
              </b-card>
            </b-card-group>
          </b-tab>
          <b-tab>
            <template slot="title">
              {{tabs[1]}}
            </template>
            <b-card-group deck>
              <b-card header="PENDAPATAN OPERASIONAL" header-tag="header" footer-tag="footer">
                <b-card-text>
                  <c-table :table-data="itemsAG3" :fields="fields" caption="" routeName="Chart Of Account Form"
                             fieldId="GrpCode" :isCoaDetail='true' :coaDetail="accountGroupDetail" :editField="editAcccountGroup">
                  </c-table>
                </b-card-text>
              </b-card>

              <b-card header="BIAYA OPERASIONAL" header-tag="header" footer-tag="footer">
                <b-card-text>
                  <c-table :table-data="itemsAG4" :fields="fields" caption="" routeName="Chart Of Account Form"
                  :isCoaDetail='true' :coaDetail="accountGroupDetail" fieldId="GrpCode" :editField="editAcccountGroup"></c-table>
                </b-card-text>
              </b-card>
            </b-card-group>
            <br>
            <b-card-group deck>
              <b-card header="PENDAPATAN NON OPERASIONAL" header-tag="header" footer-tag="footer">
                <b-card-text>
                  <c-table :table-data="itemsAG5" :fields="fields" caption="" routeName="Chart Of Account Form"
                  :isCoaDetail='true' :coaDetail="accountGroupDetail" :editField="editAcccountGroup"></c-table>
                </b-card-text>
                <!-- <div slot="footer">
                    <b-button href="#" @click="showModal2" variant="primary">New Group</b-button>
                    <b-button href="#" @click="showModal" variant="primary">New Account</b-button>
                </div> -->
              </b-card>

              <b-card header="BIAYA NON OPERASIONAL" header-tag="header" footer-tag="footer">
                <b-card-text>
                  <!-- <ul class="siul">
                    <li class="judul"><b>Biaya Operasional Penyaluran PK</b></li>
                    <li class="sub-judul-1">Biaya transportasi survey</li>

                    <li class="judul"><b>Biaya Pembinaan UKM</b></li>
                    <li class="sub-judul-1">Biaya Pelatihan</li>
                    <li class="sub-judul-1">Biaya Pameran</li>
                  </ul> -->
                  <c-table :table-data="itemsAG6" :fields="fields" caption=""
                  :isCoaDetail='true' :coaDetail="accountGroupDetail" routeName="Chart Of Account Form" fieldId="GrpCode" :editField="editAcccountGroup"></c-table>
                </b-card-text>
                <!-- <div slot="footer">
                    <b-button href="#" @click="showModal2" variant="primary">New Group</b-button>
                </div> -->
              </b-card>
            </b-card-group>
          </b-tab>
        </b-tabs>
        <br>
        <b-button href="#" @click="showModal('modal-account-group')" variant="primary">Grup baru</b-button>
        <b-button href="#" @click="showModal('modal-account')" variant="primary">Akun baru</b-button>
        <b-modal id="modal-account" :title="(this.isEditAccount ? 'Edit Account ' + this.accountId : 'New Account')" hide-footer>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kode</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" type="text" id="#" placeholder="A001" required v-model="accountModel.Code" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nama</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" type="text" id="#" placeholder="Pinjaman dari PKBL lain" required v-model="accountModel.Name" /></b-col>
          </b-row>
          <br>

          <b-row v-if="accountModel.GrpCode == null">
            <b-col><label class="mr-sm-2" for="#">Akun grup</label></b-col>
            <b-col>  <v-select :options="options" required v-model="accountModel.GrpCode" /></b-col>
          </b-row>
          <br>

          <b-button variant="primary" block class="float-right" v-on:click="SaveAccount()">Simpan</b-button>
        </b-modal>

        <b-modal id="modal-account-group" :title="(this.isEditAccountGroup ? 'Edit Account Group ' + this.accountGroupId : 'New Account Group')" size="lg" hide-footer>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kode grup</label></b-col>
            <b-col><b-form-input class="mb-2 mb-sm-0" type="text" id="#" placeholder="1.000.000.000" required v-model="accountGroupModel.GrpCode"></b-form-input></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nama grup</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" type="text" id="#" placeholder="Kas dan setara kas" required v-model="accountGroupModel.GroupName" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Balance Sheet</label></b-col>
            <b-col>
              <b-form-radio-group id="basicRadios" style="font-size:14.5 !important"
                :plain="true"
                :options="[
                  {text: 'Yes',value: '1',style: 'margin-bottom:10px'},
                  {text: 'No',value: '0',style: 'margin-bottom:10px'}
                ]"
                v-model="accountGroupModel.IsBalanceSheet"
                >
              </b-form-radio-group>
            </b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Jenis Grup</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" type="number" id="#" placeholder="1" required v-model="accountGroupModel.GroupType" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kode Induk</label></b-col>
            <b-col>
              <v-select :options="options" required  v-model="accountGroupModel.Prnt_Code"/>
              </b-col>

          </b-row>
          <br>

          <c-table :table-data="itemsAcc" :fields="fieldsAcc" caption="Account" routeName="Chart Of Account Form" fieldId="Code" :editField="editAcccount"></c-table>


          <b-button variant="primary" v-on:click="saveAccountGroup()">Simpan Grup Akun</b-button>
          <b-button href="#" @click="showModal('modal-account','edit')" variant="primary">Tambah Akun</b-button>

        </b-modal>
        <b-modal id="modal-journal" title="Journal" size="lg" hide-footer>
          <c-table :table-data="itemsJournal" :fields="fieldsJournal" caption="" routeName="Chart Of Account Form" fieldId="Code" :editField="editAcccount"></c-table>
        </b-modal>
      </b-card>
    </b-col>
  </b-row>

</div>
</template>

<script>
import cTable from '@/views/base/Table.vue'
import apiAccount from '@/api/AKAccountAPIService';
import apiAccountGroup from '@/api/AKAccountGroupAPIService';
import apiJournal from '@/api/AKJournalAPIService';
import BTable from '../../../../node_modules/bootstrap-vue/es/components/table/table'
import '../../../../node_modules/vue-select/dist/vue-select.css';

export default {
  components:{ cTable},
  name: 'ChartOfAccount',
  data() {
    return {
      itemsAG1: [],
      itemsAG2: [],
      itemsAG3: [],
      itemsAG4: [],
      itemsAG5: [],
      itemsAG6: [],
      itemsAcc: [],
      itemsJournal:[],
      selected: [], // Must be an array reference!
      show: true,
      isEditAccount: false,
      isEditAccountGroup: false,
      accountId: '',
      accountGroupId:'',
      accountModel: {},
      accountGroupModel: {},
      options: [],
      // items: items,
      itemsArrayAG1: null,
      itemsArrayAG2: null,
      itemsArrayAG3: null,
      itemsArrayAG4: null,
      itemsArrayAG5: null,
      itemsArrayAG6: null,
      itemsArrayAcc: null,
      itemsArrayJournal: null,

      fields: [
        {key: 'GrpCode', label: 'Kode Grup', sortable: true},
        {key: 'GroupName', label: 'Nama Grup', sortable: true},
        // {key: 'Prnt_Code', label: 'Balance'},
        // {key: 'GrpCode', label: 'GrpCode'},
        {key: 'action', label: 'Aksi'},
      ],
      fieldsAcc: [
        {key: 'Code', label: 'Kode', sortable: true},
        {key: 'Name', label: 'Nama', sortable: true},
        {key: 'Balance', label: 'Balance'},
        {key: 'action', label: 'Action'},
      ],
      fieldsJournal: [
        {key: 'JournalNumber', label: 'Journal Number', sortable: true},
        {key: 'Date', label: 'Tanggal', sortable: true},
        {key: 'Code', label: 'Kode', sortable: true},
        {key: 'Name', label: 'Nama', sortable: true},
        {key: 'Debit', label: 'Debit'},
        {key: 'Kredit', label: 'Kredit'},
      ],
      tabIndex: [0, 0],
      tabs: [
        'Balance Sheet',
        'Income Statement'
      ],
    }
  },
  async created(){
    var id = this.$route.params.id;
    this.getAll()
  },
  methods: {
    async SaveAccount(){
      var response = {};
      const isUpdate = !!this.isEditAccount;

      console.log(this.accountModel);
      if (this.accountModel.GrpCode != null) {
        this.accountModel.GrpCode = this.accountModel.GrpCode.value;
      }
      this.accountModel.GrpCode = this.accountGroupId
      console.log(this.accountModel);
      if (isUpdate) {
        response = await apiAccount.update(this.accountId.replace(/ /g,''),this.accountModel);
      }else{
        response = await apiAccount.create(this.accountModel);
      }
      var accountGroup = await apiAccountGroup.getOne(this.accountGroupId.replace(/ /g,''));
      this.getAll()
      this.accountId = null

      this.accountTable(accountGroup[0].Account)

      this.$root.$emit('bv::hide::modal','modal-account')
      this.showNotif(response,'Account')
    },
    async saveAccountGroup(){
      var response = {};
      const isUpdate = !!this.isEditAccountGroup;
      console.log(this.isEditAccountGroup);
      if (this.accountGroupModel.Prnt_Code != null) {
        this.accountGroupModel.Prnt_Code = this.accountGroupModel.Prnt_Code.value;
      }
      console.log(this.accountGroupModel);

      if (isUpdate) {
        response = await apiAccountGroup.update(this.accountGroupId.replace(/ /g,''),this.accountGroupModel);
      }else {
        response = await apiAccountGroup.create(this.accountGroupModel);
      }
      this.getAll()
      this.accountGroupId = null
      this.accountGroupModel = {}
      this.$root.$emit('bv::hide::modal','modal-account-group')
      this.showNotif(response,'Account Group')
    },
    editAcccountGroup: async function(id){
      var accountGroup = await apiAccountGroup.getOne(id.replace(/ /g,''));
      this.isEditAccountGroup = true;
      this.accountGroupId = accountGroup[0].GrpCode
      this.accountGroupModel = accountGroup[0];
      if(accountGroup[0].IsBalancesheet) { this.accountGroupModel.IsBalanceSheet =  1}
      else{ this.accountGroupModel.IsBalanceSheet =  0 }
      if (accountGroup[0].Prnt_Code != null) {
        var prntAccount = await apiAccountGroup.getOne(accountGroup[0].Prnt_Code.replace(/ /g,''));
        this.accountGroupModel.Prnt_Code = {label: prntAccount[0].GroupName,value:accountGroup[0].Prnt_Code}
      }
      this.accountTable(this.accountGroupModel.Account)
      console.log(this.accountGroupModel);
      this.showModal('modal-account-group','edit')
    },
    editAcccount: async function(id){
      var account = await apiAccount.getOne(id.replace(/ /g,''));
      console.log(account);
      this.isEditAccount = true;
      this.accountModel = account[0];
      this.accountId = account[0].Code

      if (account[0].GrpCode != null) {
        var grpAccount = await apiAccountGroup.getOne(account[0].GrpCode.replace(/ /g,''));
        this.accountModel.GrpCode = {label: grpAccount[0].GroupName,value:account[0].GrpCode}
      }

      this.showModal('modal-account','editFromTable')
    },
    async accountTable(account){
      console.log(account);
      var item = [];
      for (var i = 0; i < account.length; i++) {
        if (account[i] != null) {
          item.push(account[i])
        }
      }

      this.itemsAcc = item;
      this.itemsArrayAcc = () => this.itemsAcc
    },
    async accountGroupDetail(id){
      console.log(id)
      var dataJournal = await apiJournal.getByAccountGroup(id.replace(/ /g,''));
      var dataTable = [];
      var debet,credit;
      console.log(dataJournal.length);
      for (var i = 0; i < dataJournal.length; i++) {
        debet = null
        credit = null
        var dataJournalItem = dataJournal[i].JournalItem;
        console.log(dataJournalItem[0].IsDebet);
        console.log(i);
        var Account = await apiAccount.getOne(dataJournalItem[0].AccountCode.replace(/ /g,''));
          if (dataJournalItem[0].IsDebet) {
            debet = dataJournalItem[0].ItemValue
          }else{
            credit = dataJournalItem[0].ItemValue
          }
          dataTable.push({
            JournalNumber : dataJournal[i].JournalNumber,
            Date : dataJournal[i].JournalDate,
            Code : dataJournalItem[0].AccountCode,
            Name : Account[0].Name,
            Debit : debet,
            Kredit : credit,
          })

      }
      this.itemsJournal = dataTable
      this.itemsArrayJournal = () => this.itemsJournal

      this.$root.$emit('bv::show::modal','modal-journal', '#btnShow')
    },
    async getAll() {
      this.loading = true

      try {
        var dataTable = await apiAccount.getAll()

        for (var i = 0; i < dataTable.length; i++) {
          dataTable[i].id = dataTable[i].Code
        }

        this.items = dataTable
        this.itemsArray = () => this.items

        this.itemsAG1 = await apiAccountGroup.getAll1()
        this.itemsArrayAG1 = () => this.itemsAG1

        this.itemsAG2 = await apiAccountGroup.getAll2()
        this.itemsArrayAG2 = () => this.itemsAG2

        this.itemsAG3 = await apiAccountGroup.getAll3()
        this.itemsArrayAG3 = () => this.itemsAG3

        this.itemsAG4 = await apiAccountGroup.getAll4()
        this.itemsArrayAG4 = () => this.itemsAG4

        this.itemsAG5 = await apiAccountGroup.getAll5()
        this.itemsArrayAG5 = () => this.itemsAG5

        this.itemsAG6 = await apiAccountGroup.getAll6()
        this.itemsArrayAG6 = () => this.itemsAG6

        var getall = await apiAccountGroup.getAll()
        this.options = [];
        for (var i = 0; i < getall.length; i++) {
          this.options.push({ label: getall[i].GroupName,value: getall[i].GrpCode })
        }
        console.log(this.items)
      } finally {
        this.loading = false
      }
    },
    showModal (modal,type=null) {
      if (modal == 'modal-account-group') {
        if (type != 'edit') { this.isEditAccountGroup = false; this.accountGroupModel = {};  }
        else { this.isEditAccountGroup = true }
      }else if (modal == 'modal-account') {
        if (type == 'edit') {
          this.accountModel = {}
          this.isEditAccount = false
          console.log(this.accountGroupModel.GrpCode);
          console.log(this.accountModel);
        }else if (type == 'editFromTable') {

        }else {
          this.accountModel = {}
          this.isEditAccount = false
        }
      }

      this.$root.$emit('bv::show::modal',modal, '#btnShow')
    },
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

.siul {
  list-style-type: none;
}

.siul .judul {
  margin-left: 0px;
}

.siul .sub-judul-1 {
  margin-left: 15px;
}

.siul .sub-judul-2 {
  margin-left: 30px;
}

.siul .sub-judul-3 {
  margin-left: 45px;
}

.scroll {
  background-color: #f1f1f1;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  border-radius: 10px;
}
</style>
