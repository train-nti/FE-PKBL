<template>
<div class="">
  <div class="card">
    <div class="card-body">
      <b-tabs class="full-widths" v-model="tabIndex[0]">


        <b-tab active>
          <template slot="title">
            <i class="fa fa-file-o"></i> {{tabs[0]}}
          </template>
          <br>

          <cTables :isBusy="isBusy" :infoModal="infoModalBelumPencairan" :items="ListBelumPencairan" :fields="fieldsBelumPencairan">
            <template slot-scope="{ row }">
              <b-button pill variant="primary" size="md" @click="editPencairan(row)" v-if="editModalBelumPencairan[0].id !== ''" v-b-tooltip.hover title="Proses Pencairan">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>
          <b-modal :id="editModalBelumPencairan[0].id" :title="editModalBelumPencairan[0].title" size="lg" hide-footer ok-only>
            <b-form @submit="savePencairan">
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nomor SP3
                <!-- <b class="text-danger">*</b> -->
              </label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.ContractNum" disabled class="form-control" id="" placeholder="No SP3">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Pencairan
                <b class="text-danger">*</b>
              </label>
              <div class="col-sm-10">
                <date-picker  value-type="YYYY-MM-DD" :disabled-date="getClosingDate ? disabledDate : ''" v-model="BLTransaction.TransDate" :input-attr="{ required: true }"  format="DD/MMM/YYYY" lang="id"></date-picker>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nama Pemohon</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.FullName" value="BLTransaction.DebCode" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
             <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Kepada</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.Receiver"  class="form-control" id="" >
              </div>
            </div>
             <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Permintaan Bayar</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.RequestToPay" class="form-control"  >
              </div>
            </div>
             <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Verifikasi</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.Verification" class="form-control" >
              </div>
            </div>
             <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Penyetujui</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.Agreement" class="form-control" >
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Bina Lingkungan</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.BLType" value="BLTransaction.BLType" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal SP3</label>
              <div class="col-sm-10">
                <input type="text" v-model="datePen" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Termin</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.Tenor" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pencairan</label>
              <div class="col-sm-10">
                <input type="text" v-model="BLTransaction.DebValue" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Rekening pada Bank</label>
              <div class="col-sm-10">
                <!-- <v-select v-model="BLTransaction.BankCode" :options="BankItems" :reduce="Name => Name.Code" label="Name" size="5"></v-select> -->
                <v-select :options="BankItems" :reduce="name => name.code" label="name" required v-model="BLTransaction.BankCode" />
                <!-- <p v-model="BankItems"></p> -->
              </div>

            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Akun Penyaluran</label>
              <div class="col-sm-10">
                <v-select v-model="BLTransaction.AccountSectCode" :options="accountSect" :reduce="Name => Name.Code" label="Name" size="5"></v-select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-2">
                <!-- <b-button variant="success">Button</b-button> -->
              </div>
              <div class="col-sm-4">
                <!-- <b-button variant="primary">Load BPM</b-button> -->
                <b-button variant="info" :disabled="activeBtnSave" type="submit">Proses</b-button>
              </div>
            </div>
          </b-form>
          </b-modal>
        </b-tab>


        <b-tab >
          <template slot="title">
            <i class="fa fa-bars"></i> {{tabs[1]}}
          </template>
          <br>

          <cTables :isBusy="loading" :infoModal="infoModalSudahPencairan" :items="ListSudahPencairan" :fields="fieldsSudahPencairan" :journal="statusJournal">

          </cTables>

        </b-tab>


      </b-tabs>
    </div>
  </div>
</div>
</template>
<script>
// import Tables from '../../../components/CustomTables'
import VueNumeric from 'vue-numeric';
import dynamicCode from '@/api/DynamicApiService';
import apiDebitor from '@/api/PK/DebitorApiService';
import apiDebitAccount from '@/api/PK/DebitAccountApiService';
import account from '@/api/AKAccountApiService';
import vSelect from '../../../../node_modules/vue-select/dist/vue-select';
import '../../../../node_modules/vue-select/dist/vue-select.css';
import "../../../../node_modules/vue-select/src/scss/vue-select.scss";
import apiDebTransaction from '@/api/PK/DebTransactionApiService';
import apijournal from '@/api/AKJournalApiService';
import apiJournalAccual from '@/api/AKJournalAccrualApiService';
import apijournalItems from '@/api/AKJournalItemApiService';
import cTables from '@/components/Tables';
import moment from '../../../../node_modules/moment/moment';
export default {
  name: 'pencairan',
  components: {
    'vue-numeric': VueNumeric,
    'cTables': cTables,
    'v-select': vSelect,
  },
  data() {
    return {
      //Btn disabled
      activeBtnSave : false,
      statusJournal : true,
      configConfirm:null,
      textConfirm:null,
      BankItems: [],
      accountSect: [],
      dataBLTranscation: {},
      tabIndex: [0, 0],
      BLTransaction: { },
      dataJournal: {},
      JournalAccrual:{
        PaymentJrn_ID:null,
        RevertDate:null
      },
      isBusy : false,
      loading : false,
      tabs: [
        'Belum Pencairan',
        'Sudah Pencairan',
      ],
      datePen: '',
      dateSudahPen: '',
      Jrn_ID: '',
      username:null,
      nilaiDisetujuiSudahPen: 0,
      titleOfSudahPencairan: ['No', 'No Ref', 'Nama Pemohon', 'Termin', 'Tanggal Pencairan', 'Nilai Disetujui', 'Options'],
      ListOfSudahCair: [],
      sudahCairItem: {},
      // Data Belum Cair
      ListBelumPencairan: [],
      infoModalBelumPencairan: [{
        id: 'infoPencairan',
        title: 'Show Pencairan'
      }],
      editModalBelumPencairan: [{
        id: 'modal-1',
        title: 'Proses Pencairan'
      }],
      fieldsBelumPencairan: [{
          key: 'No',
          label: 'No',
          sortable: true
        },
        {
          key: 'FullName',
          label: 'Nama Pemohon',
          sortable: true
        },
        {
          key: 'Instance',
          label: 'Nama Instansi',
          sortable: true
        },
        {
          key: 'Tenor',
          label: 'Termin',
          sortDirection: 'asc',
          sortable: true
        },
        {
          key: 'ContractNum',
          label: 'Nomor SP3',
          sortable: true
        },
        {
          key: 'DebValue',
          label: 'Nilai SP3',
          sortable: true,
          tdClass: 'positionRight'
        },
        {
          key: 'actions',
          label: 'Aksi'
        },
      ],

      // Data Sudah Cair
      ListSudahPencairan: [],
      infoModalSudahPencairan: [{
        id: 'infosudahPencairan',
        title: 'Show Pencairan'
      }],
      fieldsSudahPencairan: [{
          key: 'No',
          label: 'No',
          sortable: true
        },
        {
            key: 'TransNo',
            label: 'No Ref',
            sortable: true
          },
        {
          key: 'FullName',
          label: 'Nama Pemohon',
          sortable: true
        },
        {
          key: 'Tenor',
          label: 'Termin',
          sortDirection: 'asc',
          sortable: true
        },
        {
          key: 'TransDate',
          label: 'Tanggal Pencairan',
          sortable: true
        },
        {
          key: 'TransValue',
          label: 'Nilai Disetujui',
          sortable: true,
          tdClass: 'positionRight'
        },
        {
          key: 'actions',
          label: 'Aksi'
        },
      ],
      BLTypeCode:0,
    }

  },
  async created() {
    moment.locale('id')
    this.username = localStorage.username
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.getAll()
  },
  methods: {
    disabledDate(date) {
      return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
    },
    async getAll() {
      try {
        let region = this.getSession('cabang');
        this.belumPencairan(region)
        this.sudahPencairan(region)

      } catch (e) {

      }
    },
    async sudahPencairan(region){
      this.loading = true
      let sudahCair = await apiDebTransaction.getAllPencBL(region)
      for (var i = 0; i < sudahCair.Data.length; i++) {
        sudahCair.Data[i].No = i + 1
        sudahCair.Data[i].TransDate = this.formatDateDMY(sudahCair.Data[i].TransDate)
        sudahCair.Data[i].TransValue = this.formatCurrency(sudahCair.Data[i].TransValue)
      }
      this.ListSudahPencairan = sudahCair.Data
      this.loading = false
      // this.ListSudahPencairan.TransDate = this.formatDate(this.ListSudahPencairan.TransDate)

    },
    async belumPencairan(region) {
      this.isBusy = true
      let ListOfSudahPersetujuan = await apiDebitAccount.ListOfPersetujuanBL(region);
      for (var i = 0; i < ListOfSudahPersetujuan.Data.length; i++) {

        ListOfSudahPersetujuan.Data[i].No = i + 1
        ListOfSudahPersetujuan.Data[i].FullName = ListOfSudahPersetujuan.Data[i].Debitor.FullName
        ListOfSudahPersetujuan.Data[i].Instance = ListOfSudahPersetujuan.Data[i].Debitor.Instance
        ListOfSudahPersetujuan.Data[i].Activity = ListOfSudahPersetujuan.Data[i].Debitor.Activity
        ListOfSudahPersetujuan.Data[i].Address = ListOfSudahPersetujuan.Data[i].Debitor.Address
        ListOfSudahPersetujuan.Data[i].BLType = ListOfSudahPersetujuan.Data[i].Debitor.BLType
        ListOfSudahPersetujuan.Data[i].DebValueNum = ListOfSudahPersetujuan.Data[i].DebValue
        ListOfSudahPersetujuan.Data[i].DebValue = this.formatCurrency(ListOfSudahPersetujuan.Data[i].DebValue)

      }

      this.ListBelumPencairan = ListOfSudahPersetujuan.Data
      this.isBusy = false
    },
    async savePencairan(evt) {
      evt.preventDefault()
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value  ){
            this.activeBtnSave = true
              let getCode = await dynamicCode.getCountByTransBL('/debTransaction/countByTrasacBL')
              let counter = getCode.Jrn_ID + 1
              let generateCode = new Date().getFullYear() + '.PCR.' + counter

              let Desc = "Penyaluran Bina Lingkungan "+ this.BLTransaction.BLType +" Untuk "+this.BLTransaction.Activity+" "+ this.BLTransaction.Instance +" Termin " + this.BLTransaction.Tenor + " No Bukti " + generateCode


              this.dataBLTranscation.DACode = this.BLTransaction.DACode
              this.dataBLTranscation.IsDebet = 0
              this.dataBLTranscation.TransDate = this.BLTransaction.TransDate
              this.dataBLTranscation.TransValue = this.BLTransaction.DebValueNum
              this.dataBLTranscation.TransNo = generateCode
              this.dataBLTranscation.InstSeq = 0
              this.dataBLTranscation.Interest = this.BLTransaction.InterestRate
              this.dataBLTranscation.Description = Desc

              //
              //
              //
              this.dataJournal.JournalNumber = generateCode
              this.dataJournal.Description = Desc
              this.dataJournal.CreatedBy = this.username
              this.dataJournal.JournalDate = moment()
              this.dataJournal.JournalTypeId = 7
              let region = this.getSession('cabang');
              this.dataJournal.WorkArea = region
              this.dataJournal.JournalCash = [
                {
                  Receiver:this.BLTransaction.Receiver,
                  PaymentTypeId: this.BLTransaction.PaymentTypeId,
                  RequestToPay:this.BLTransaction.RequestToPay,
                  Verification:this.BLTransaction.Verification,
                  Agreement:this.BLTransaction.Agreement
                }
              ]
              this.dataJournal.JournalItem = []
              this.dataJournal.JournalItem.push({
                AccountCode: this.BLTransaction.AccountSectCode,
                IsDebet: 1,
                ItemValue: this.BLTransaction.DebValueNum
              })
              this.dataJournal.JournalItem.push({
                AccountCode: this.BLTransaction.BankCode,
                IsDebet: 0,
                ItemValue: this.BLTransaction.DebValueNum
              })

              var insertDebTransaction = await apiDebTransaction.create(this.dataBLTranscation)

              // console.log("input ", insertDebTransaction , "and ", this.dataBLTranscation)
              if (insertDebTransaction.Status) {

                var coa = await this.getConfig("COA_ACCRUAL")
                var journal = await apijournal.create(this.dataJournal)
                if(this.BLTransaction.BankCode == coa){
                    this.JournalAccrual.Jrn_ID = journal.Data
                    this.JournalAccrual.CreatedBy = this.username
                    let responseDataAccrual = await apiJournalAccual.create(this.JournalAccrual)

                }
                // console.log("journal a ", journal)
                if (journal.Status) {
                    this.showNotif(journal, 'Perjanjian')
                  var balanceBank = await account.countBalanceBank(this.BLTransaction.BankCode.replace(/\s/g, ''), this.BLTransaction.DebValueNum)
                  var balanceAccSect = await account.countBalanceSect(this.BLTransaction.AccountSectCode.replace(/\s/g, ''), this.BLTransaction.DebValueNum)
                }
              }
              //
              this.$bvModal.hide('modal-1')
              this.getAll();
              // this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
              // this.$bvModal.hide('modal-multi-2')
              // console.log('lala ', this.dataBLTranscation)
          }
       })
       .catch(err => {
        // An error occurred
       })

    },
    async editPencairan(item, index, button) {
      this.activeBtnSave = false
      // var getBank = await account.getCode('11.122', '6')
      var coa = await this.getConfig("COA_ACCRUAL")
      var nama = await this.getConfig("COA_ACCRUAL_NAME")
      var getall = await account.getByTypeAndWorkarea(this.getSession('cabang'),34)
      for (var i = 0; i < getall.length; i++) {
        this.BankItems.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
      }
      this.BankItems.push({ code: coa, name: coa +" - "+ nama })

      var getAccount = await account.getCode('51.21'+item.BLTypeCode, '6')

      // for (var i = 0; i < getBank.length; i++) {
      //   getBank[i].Name = getBank[i].Code + " - " + getBank[i].Name
      // }
      for (var i = 0; i < getAccount.length; i++) {
        getAccount[i].Name = getAccount[i].Code + " - " + getAccount[i].Name
      }

      // this.BankItems = getBank
      this.accountSect = getAccount
      this.BLTransaction = {}
      this.BLTransaction = item
      this.BLTransaction.PaymentTypeId = 9
      this.BLTransaction.Verification = await this.getConfig("JOURNAL_PENYETUJU")
      this.BLTransaction.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
      this.datePen = this.formatDateDMY(item.ContractDate)

      this.$root.$emit('bv::show::modal', this.editModalBelumPencairan[0].id, button)

    },



  },


}
</script>
<style>
@import '../../../assets/css/TabsCenter.css';
.positionRight {
 text-align:right;
}

</style>
