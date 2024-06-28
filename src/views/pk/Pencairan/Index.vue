<template>
<div class="animated fadeIn">
  <div class="card">
    <div class="card-body">


      <b-tabs class="full-widths" v-model="tabIndex[0]">
        <b-tab>
          <template slot="title">
            <i class="fa fa-file-o"></i> {{tabs[0]}}
          </template>
          <br>

          <cTables :isBusy="loading" :items="belumCair" :fields="fieldsSudahPerjanjian">
            <template slot-scope="{ row }">
              <b-button pill variant="primary" size="md" @click="editBelumCair(row)" v-b-tooltip.hover title="Proses Pencairan">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>
        </b-tab>

        <b-tab>
          <template slot="title">
            <i class="fa fa-bars"></i> {{tabs[1]}}
          </template>
          <br>

          <cTables :isBusy="loading" :items="sudahCair" :fields="fieldsSudahPerjanjian">
            <template slot-scope="{ row }">
              <!-- <b-button pill variant="primary" size="md" @click="editBelumCair(row)" v-b-tooltip.hover title="Proses Pencairan">
                <i class="fa fa-pencil-square-o"></i>
              </b-button> -->
               <b-button pill variant="primary" size="md" v-b-tooltip.hover title="Ubah Pencairan">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>
        </b-tab>

      </b-tabs>

      <b-modal :id="editModalPencairan[0].id" :title="editModalPencairan[0].title" size="lg" hide-footer ok-only>
        <b-form @submit="savePencairan">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Mitra Binaan</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.DANumber" disabled class="form-control" id="" placeholder="example">
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Perjanjian</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.ContractNum" value="debTransaction.ContractNum" disabled class="form-control" id="" placeholder="example">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Nama Mitra Binaan</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.FullName" disabled class="form-control" id="" placeholder="example">
          </div>
        </div>
         <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Kepada</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.Receiver"  class="form-control" id="" >
          </div>
        </div>
         <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Permintaan Bayar</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.RequestToPay" class="form-control"  >
          </div>
        </div>
         <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Verifikasi</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.Verification" class="form-control" >
          </div>
        </div>
         <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Penyetujui</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.Agreement" class="form-control" >
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Pencairan
            <b class="text-danger">*</b>
          </label>
          <div class="col-sm-10">
            <!-- <input type="date" v-model="debTransaction.TransDate" @input="tglPerhitungan" required class="form-control" id="" placeholder="example"> -->
            <date-picker value-type="YYYY-MM-DD" v-model="debTransaction.TransDate":input-attr="{ required: true }" format="DD/MMM/YYYY" :disabled-date="getClosingDate ? disabledDate : ''" lang="id" ></date-picker>
          </div>
        </div>
         <div class="form-group row">
           <label for="inputPassword" class="col-sm-2 col-form-label">Siklus Angsuran</label>
           <div class="col-sm-5">
             <b-form-group>
                 <b-form-radio-group required v-model.number="debTransaction.InstallmentCycle" @input="tglPerhitungan" :options="options" name="radio-inline"></b-form-radio-group>
             </b-form-group>

           </div>
           <div class="col-sm-5" v-if="debTransaction.InstallmentCycle == 3">
             <input type="text" required v-model.number="debTransaction.InstallmentCycleYarnen" min="0" max="36" @input="tglPerhitungan" class="form-control" id="" placeholder="">

           </div>
         </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Jatuh Tempo / bulan</label>
            <div class="col-sm-10">
                <input type="number" disabled v-model="TanggalPerhitungan.Tagihan" class="form-control" id="" placeholder="">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Jatuh Tempo</label>
            <div class="col-sm-10">
                <!-- <date-picker v-model="TanggalPerhitungan.JatuhTempo":input-attr="{ required: true }"   format="DD/MMM/YYYY" lang="id" ></date-picker> -->
                <input type="text" :value="formatDateDMY(TanggalPerhitungan.JatuhTempo)" disabled class="form-control" id="" placeholder="">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Mulai Bayar</label>
            <div class="col-sm-10">
                <!-- <date-picker :value="formatDateDMY(TanggalPerhitungan.MulaiBayar)" :input-attr="{ required: true }"   format="DD/MMM/YYYY" lang="id" ></date-picker> -->
                <input type="text" disabled  :value="formatDateDMY(TanggalPerhitungan.MulaiBayar)" class="form-control" id="" placeholder="">
            </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pencairan</label>
          <div class="col-sm-10">
            <input type="text" v-model="debTransaction.DebValueNum" disabled class="form-control" id="" placeholder="example">
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Rekening pada Bank</label>
          <div class="col-sm-10">
            <!-- <v-select v-model="debTransaction.BankCode" :options="BankItems" :reduce="Name => Name.Code" label="Name" size="5"></v-select> -->
            <v-select :options="BankItems" :reduce="name => name.code" label="name" required v-model="debTransaction.BankCode" />
            <!-- <p v-model="BankItems"></p> -->
          </div>

        </div>


        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Akun Penyaluran</label>
          <div class="col-sm-10">
            <!-- <v-select v-model="debTransaction.AccountSectCode" :options="accountSect" :reduce="Name => Name.Code" label="Name" size="5"></v-select> -->
            <input type="text" v-model="debTransaction.AccountSectName" class="form-control" disabled>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-2">
          </div>
          <div class="col-sm-4">
            <b-button variant="info" :disabled="activeBtnSave" type="submit">Proses</b-button>
          </div>
        </div>
      </b-form>
      </b-modal>


    </div>
  </div>
</div>
</template>

<script>
import dynamicCode from '@/api/DynamicApiService';
import apiDebTransaction from '@/api/PK/DebTransactionApiService';
import apiAccount from '@/api/AKAccountApiService';
import apiAccountMapping from '@/api/AK/AccountMappingApiService';
import apijournal from '@/api/AKJournalApiService';
import apijournalItems from '@/api/AKJournalItemApiService';
import apiDebitor from '@/api/PK/DebitorApiService';
import apiDebitAccount from '@/api/PK/DebitAccountApiService';
import apiDebitAccountSummary from '@/api/PK/DebitAccountSummaryApiService';
import apiInstSchedule from '@/api/PK/InstScheduleApiService';
import apiPKSurvey from '@/api/PK/PKSurveyApiService';
import apiPKBussIncome from '@/api/PK/PKBussIncomeApiService';
import apiDebitorVenture from '@/api/PK/DebitorVentureApiService';
import apiPKSector from '@/api/PK/PKSectorApiService'
import moment from '../../../../node_modules/moment/moment';
import VueNumeric from 'vue-numeric';
import vSelect from '../../../../node_modules/vue-select/dist/vue-select';
import '../../../../node_modules/vue-select/dist/vue-select.css';
import "../../../../node_modules/vue-select/src/scss/vue-select.scss";
//
import cTables from '@/components/Tables';

export default {
  name: '',
  components: {
    'v-select': vSelect,
    'cTables': cTables,
    'vue-numeric': VueNumeric
  },
  data() {
    return {
      //Btn disabled
      activeBtnSave : false,
      username: null,
      TanggalPerhitungan : {},
      configConfirm:null,
      textConfirm:null,
      BankItems: [],
      sudahCair:[],
      belumCair: [],
      accountSect: [],
      accountSectItem: {},
      debitAccount: {},
      debitAccountItems: {},
      debTransaction: {},
      options: [
          { text: 'Bulanan', value: 1 },
          { text: 'Yarnen/Lainnya', value: 3 },
        ],
      dataJournal: {},
      dataJournalItem: {},
      loading : false,
      optionsStlmCycle: [{
          value: 1,
          text: 'Bulanan'
        },
        {
          value: 2,
          text: 'Dua Bulan'
        },
        {
          value: 3,
          text: 'Triwulan'
        },
      ],
      tabIndex: [0, 0],
      tabs: [
        'Belum Pencairan',
        'Sudah Pencairan',
      ],
      myDate: moment().format('YYYY-MM-DD'),
      //Sudah Akad Belum Cair
      fieldsSudahPerjanjian: [{
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
          key: 'DANumber',
          label: 'Nomor Mitra Binaan',
          sortable: true
        },
        {
          key: 'ContractDate',
          label: 'Tanggal Perjanjian',
          sortable: true
        },
        {
          key: 'Instance',
          label: 'Nama Usaha',
          sortable: true
        },
        {
          key: 'Address',
          label: 'Alamat',
          sortable: true
        },
        {
          key: 'DebValueNum',
          label: 'Nilai Disetujui',
          sortable: true,
          tdClass: 'positionRight'
        },
        {
          key: 'Tenor',
          label: 'JK Waktu',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Aksi'
        },
      ],
      editModalPencairan: [{
        id: 'pencairanPk',
        title: 'Proses Pencairan'
      }],
    };
  },
  async created() {
      this.loading = true
    moment.locale('id')
    this.username = localStorage.username
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    let region = this.getSession('cabang');
    var belumCair = await apiDebitAccount.ListOfPersetujuan(region,0)
    var SudahCair = await apiDebitAccount.ListOfPersetujuan(region,1)
    await this.getAll(belumCair,0)
    await this.getAll(SudahCair,1)
        this.loading = false
  },
  watch: {
   'debTransaction.TransDate' : function (val, oldVal) { //watcher on data updated
     this.tglPerhitungan()
   }
},
  methods: {
    disabledDate(date) {
     return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
   },
    tglPerhitungan(){

      if (this.debTransaction.InstallmentCycle == 3) {
        this.debTransaction.StlmCycle = this.debTransaction.InstallmentCycleYarnen
      }else {
        this.debTransaction.StlmCycle = this.debTransaction.InstallmentCycle
      }

      let tgl = this.datesCalculate(this.debTransaction.Tenor, this.debTransaction.TransDate,this.debTransaction.StlmCycle,0,this.debTransaction.FeeType)
      tgl[0].Tagihan = parseInt(tgl[0].Tagihan)

      this.TanggalPerhitungan = tgl[0]

    },
    async getAll(belumCair,flag) {

      try {

        for (var i = 0; i < belumCair.Data.length; i++) {
            var Alamat = ""
            var Provinsi = ""
            var Kabupaten = ""
            var Kecamatan = ""
            var Kelurahan = ""
            if(belumCair.Data[i].Debitor.Address){
              Alamat = belumCair.Data[i].Debitor.Address
            }
            if(belumCair.Data[i].Debitor.Prov_code){
              Provinsi = belumCair.Data[i].Debitor.Prov_code
            }
            if(belumCair.Data[i].Debitor.Dist_code){
              Kabupaten = belumCair.Data[i].Debitor.Dist_code
            }
            if(belumCair.Data[i].Debitor.Subdis_code){
              Kecamatan = belumCair.Data[i].Debitor.Subdis_code
            }
            if(belumCair.Data[i].Debitor.Village_code){
              Kelurahan = belumCair.Data[i].Debitor.Village_code
            }
          belumCair.Data[i].No = i + 1
          belumCair.Data[i].FullName = belumCair.Data[i].Debitor.FullName
          belumCair.Data[i].Instance = belumCair.Data[i].Debitor.Instance
          belumCair.Data[i].Address = Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi
          // belumCair.Data[i].DebValueNum = belumCair.Data[i].DebValue
          belumCair.Data[i].DebValueNum = this.formatCurrency(belumCair.Data[i].DebValue)
          belumCair.Data[i].ContractDate = this.formatDateDMY(belumCair.Data[i].ContractDate)
        }

        if(flag == 0){
          this.belumCair = belumCair.Data
        }else if(flag == 1){
           this.sudahCair = belumCair.Data
        }


      } finally {
      }
    },
    async editBelumCair(data) {
      this.activeBtnSave = false
      var debitorVenture = await apiDebitorVenture.getByDEBCode(data.DebCode)

      var PKSector = await apiPKSector.getOne(debitorVenture.Data[0].BusinessSector)

      var getAccount;
      if (debitorVenture.Data[0].DistributionPattern == "Avalis") {
          getAccount = await apiAccountMapping.getAccountByChnlCode(debitorVenture.Data[0].SynergyChannelId)
      } else {
          getAccount = await apiAccount.getCodeOnly('11.36'+PKSector[0].SectorCode+'0')
      }
      // var getBank = await apiAccount.getCode('11.121', '6')
      var getall = await apiAccount.getByTypeAndWorkarea(this.getSession('cabang'),35)
      for (var i = 0; i < getall.length; i++) {
        this.BankItems.push({ code: getall[i].Code, name:getall[i].Code +" - "+ getall[i].Name })
      }


      // for (var i = 0; i < getBank.length; i++) {
      //   getBank[i].Name = getBank[i].Code + " - " + getBank[i].Name
      // }
      // for (var i = 0; i < getAccount.length; i++) {
      //   getAccount[i].Name = getAccount[i].Code + " - " + getAccount[i].Name
      // }

      // this.BankItems = getBank
      var Verification = await this.getConfig("JOURNAL_PENYETUJU")
      var Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
      this.accountSect = getAccount;

      // console.log("acc", this.accountSect);


      this.debTransaction = {}
      this.debTransaction.AccountSectCode = getAccount[0].Code
      this.debTransaction.AccountSectName =  getAccount[0].Code +"- "+ getAccount[0].Name
      this.debTransaction.ContractNum = data.ContractNum
      this.debTransaction.ContractDate = data.ContractDate
      this.debTransaction.DebValue = data.DebValue
      this.debTransaction.FullName = data.FullName
      this.debTransaction.DACode = data.DACode
      this.debTransaction.InstSeq = 0
      this.debTransaction.Tenor = data.Tenor
      this.debTransaction.Interest = data.InterestRate
      this.debTransaction.FeeType = data.FeeType
      this.debTransaction.DebValueNum = data.DebValueNum
      this.debTransaction.StlmCycle = data.StlmCycle
      this.debTransaction.DANumber = data.DANumber
      this.debTransaction.Verification = Verification
      this.debTransaction.Agreement = Agreement
      this.debTransaction.PaymentTypeId = 1
      this.$root.$emit('bv::show::modal', this.editModalPencairan[0].id)
    },

    async savePencairan(evt) {
      evt.preventDefault()
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value){
              this.activeBtnSave = true
              //deklarasi
              let getCode = await dynamicCode.getCountByTransBL('/debTransaction/countByTrasacBL')
              let counter = getCode.Jrn_ID + 1
              let generateCode = new Date().getFullYear() + '.PCR.PK.' + counter
              let Desc = "Pencairan Kemitraan atas nama " + this.debTransaction.FullName + " dengan Nomor Mitra Binaan "+ this.debTransaction.DANumber + " dan No Bukti " + generateCode
              var getPKSurvey = await apiPKSurvey.getByDaCode(this.debTransaction.DACode)
              var getPKBussIncome = await apiPKBussIncome.getByIdPKSurveyCode(getPKSurvey.Data[0].IdPKSurvey)
              var PKBussIncome = {};
              if(getPKBussIncome.Data[0]){
                  PKBussIncome = getPKBussIncome.Data[0]
              } else {
                  PKBussIncome.GracePeriod = 0
              }

              this.accountSectItem.DACode = this.debTransaction.DACode
              this.accountSectItem.IsDebet = 0
              this.accountSectItem.TransValue = this.debTransaction.DebValue
              this.accountSectItem.InstSeq = 0
              this.accountSectItem.Interest = this.debTransaction.Interest
              this.accountSectItem.Description = Desc
              this.accountSectItem.TransDate = this.debTransaction.TransDate
              this.accountSectItem.TransNo = generateCode
              this.accountSectItem.CreatedBy = this.username

              this.dataJournal.JournalNumber = generateCode
              this.dataJournal.Description = Desc
              this.dataJournal.CreatedBy = this.username
              this.dataJournal.JournalTypeId = 6
              let region = this.getSession('cabang');
              this.dataJournal.WorkArea = region
              this.dataJournal.JournalDate = this.debTransaction.TransDate;
              this.dataJournal.JournalCash = [
                {
                  Receiver:this.debTransaction.Receiver,
                  PaymentTypeId: this.debTransaction.PaymentTypeId,
                  RequestToPay:this.debTransaction.RequestToPay,
                  Verification:this.debTransaction.Verification,
                  Agreement:this.debTransaction.Agreement
                }
              ]
              this.dataJournal.JournalItem = []
              this.dataJournal.JournalItem.push({
                AccountCode : this.debTransaction.AccountSectCode,
                IsDebet : 1,
                ItemValue : this.debTransaction.DebValue
              })
              this.dataJournal.JournalItem.push({
                AccountCode : this.debTransaction.BankCode,
                IsDebet : 0,
                ItemValue : this.debTransaction.DebValue
              })

              let dataExist = await apiDebTransaction.hasBeenPaid(this.accountSectItem.DACode)

              if (dataExist.Data && dataExist.Status) {
                this.$notify({
                  group: 'notif-response',
                  title: 'Operation Failed',
                  text:  ' Data sudah ada',
                  type: 'error'
                });
              }else {
                var insertDebTransaction = await apiDebTransaction.create(this.accountSectItem)
                if (insertDebTransaction.Status == true && insertDebTransaction.Message == "Operation success") {
                  var journal = await apijournal.create(this.dataJournal)
                  console.log("journal a ", journal)
                  if (journal.Status == true && journal.Message == "Operation success") {
                    var calculateTrans = []
                    var feeType = this.debTransaction.FeeType
                    calculateTrans  = this.perhitunganJasa(this.debTransaction.Tenor, this.debTransaction.DebValue
                                      , this.debTransaction.Interest, this.debTransaction.TransDate, this.debTransaction.DACode
                                      , this.debTransaction.StlmCycle,PKBussIncome.GracePeriod,feeType)

                    var balanceBank = await apiAccount.countBalanceBank(this.debTransaction.BankCode.replace(/\s/g, ''), this.debTransaction.DebValue)
                    var balanceAccSect = await apiAccount.countBalanceSect(this.debTransaction.AccountSectCode.replace(/\s/g, ''), this.debTransaction.DebValue)
                    console.log("DATA Trans",calculateTrans)
                    var insertInsSchedule = await apiInstSchedule.create(calculateTrans)
                    let debAcc = {
                      StlmCycle : this.debTransaction.StlmCycle
                    }
                    let updateStlmCycle = await apiDebitAccount.updateStlmCycle(this.debTransaction.DACode, debAcc)
                    if (updateStlmCycle.Status == true && journal.Message == "Operation success") {
                      var summary = {}
                      summary.DACode = this.debTransaction.DACode
                      summary.JournalDate = this.debTransaction.TransDate
                      console.log("DATA SUMMARY",summary);
                     let saveSummary = await apiDebitAccountSummary.insertDebitSummary(summary)
                      console.log("BG SUMMARY",saveSummary);
                      this.showNotif(updateStlmCycle, 'Pencairan')
                    }

                  }
                }
                this.getAll()
                this.$bvModal.hide('pencairanPk')
              }



          }
       })
       .catch(err => {
        // An error occurred
       })






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
