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
          <strong>PertanggungJawaban Uang Muka</strong>
        </div>
        <form @submit.prevent="SaveUangMuka">

          <div>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Tanggal</label></b-col>
            <b-col>
              <date-picker v-model="JournalModel.DateUM" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
              <!-- <b-input class="mb-2 mb-sm-0" v-model="JournalModel.DateUM" type="date" id="#" placeholder="" required/> -->
            </b-col>
             <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">No. Ref. Persekot</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0"  v-model="Journal.JournalNumber" type="text" id="#" readonly required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Lembaga</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="Debitor.Instance" type="text" id="#" readonly required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

           <b-row>
            <b-col><label class="mr-sm-2" for="#">Nama</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="Debitor.FullName" type="text" id="#" readonly required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">No.Hp/ NIPP</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="Debitor.Hp1" type="text" id="#" readonly required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

           <b-row>
            <b-col><label class="mr-sm-2" for="#">Kota</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="Debitor.Dist_code" type="text" id="#" readonly required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

         <b-row>
            <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="JournalCash.Receiver" type="text" id="#" required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

         <b-row>
            <b-col><label class="mr-sm-2" for="#">Permintaan Bayar</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="JournalCash.RequestToPay" type="text" id="#" required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

         <b-row>
            <b-col><label class="mr-sm-2" for="#">Verifikasi</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="JournalCash.Verification" type="text" id="#" required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

         <b-row>
            <b-col><label class="mr-sm-2" for="#">Penyetujui</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="JournalCash.Agreement" type="text" id="#" required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nilai Uang Muka</label></b-col>
            <b-col>
               <money class="form-control" v-model="JournalModel.ValueAdvances" v-bind="money" readonly></money>
            </b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>
<!--
           <b-row>
            <b-col><label class="mr-sm-2" for="#">Sisa Uang Muka</label></b-col>
            <b-col>
                  <money class="form-control" v-model="JournalModel.RemainingAdvances" v-bind="money" readonly></money>
            </b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br> -->

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nilai Penyaluran</label></b-col>
            <b-col>
             <!--  <b-input class="mb-1 mb-sm-0"   v-model="JournalModel.NilaiPenyaluran" type="text" id="#" required/> -->
               <money class="form-control" v-model="JournalModel.DistributionValue" v-bind="money"></money>
            </b-col>
            <b-col> <v-select class="mb-1 mb-sm-0"   v-model="JournalModel.COANilaiPenyaluran" :options="options_penyaluran"></v-select></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nilai Operasional</label></b-col>
            <b-col>
              <!-- <b-input class="mb-1 mb-sm-0"  v-model="JournalModel.NilaiOperasional" type="text" id="#" required/> -->
               <money class="form-control" v-model="JournalModel.OperationalValue" v-bind="money"></money>
            </b-col>
             <b-col><v-select class="mb-1 mb-sm-0"  v-model="JournalModel.COANilaiOperasional" :options="options_operasional"></v-select></b-col>
          </b-row>
          <br>

           <b-row>
            <b-col><label class="mr-sm-2" for="#">Total Nilai Penyaluran Dan Nilai Operasional</label></b-col>
            <b-col>
                  <money class="form-control" v-model="JournalModel.TotalNPNO" v-bind="money" readonly></money>
            </b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Selisih Nilai Penyaluran Dan Nilai Operasional</label></b-col>
            <b-col>
                  <money class="form-control" v-model="JournalModel.SelisihNPNO" v-bind="money" readonly></money>
            </b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

           <b-row>
            <b-col v-if="IsReturn == 0"><label class="mr-sm-2" for="#">Nilai Pengembalian</label></b-col>
            <b-col v-if="IsReturn == 1"><label class="mr-sm-2" for="#">Nilai Kelebihan</label></b-col>
            <b-col>
            <!--   <b-input class="mb-1 mb-sm-0"   v-model="JournalModel.NilaiPengembalian" type="text" id="#" required/> -->
               <money class="form-control" v-model="JournalModel.ReturnValue" v-bind="money"></money>
            </b-col>
            <b-col> <v-select class="mb-1 mb-sm-0"  v-model="JournalModel.COANilaiPengembalian" :options="options_pengembalian"></v-select></b-col>
          </b-row>
          <br>

            <b-row>
            <b-col><label class="mr-sm-2" for="#">Keterangan</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0"  v-model="JournalModel.Description" type="text" id="#" required/></b-col>
            <b-col class="mb-1 mb-sm-0" ></b-col>
          </b-row>
          <br>

          <big class="text-danger">&nbsp;&nbsp; {{ warning }} </big><br><br>
          <br>
          <b-row>

            <b-col><b-button type="submit" variant="primary">Simpan</b-button></b-col>
          </b-row>
        </div>
        </form>
      </b-card>

    </b-col>
  </b-row>
</div>
</template>

<script>
  import dynamicCode from '@/api/DynamicApiService';
  import cTable from '@/views/base/Table.vue'
  import apiJournalUangMuka from '@/api/AK/JournalUangMukaApiService';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiDebitAccountSummary from '@/api/PK/DebitAccountSummaryApiService';
  import apiDebTransaction from '@/api/PK/DebTransactionApiService';
  import apiJournal from '@/api/AKJournalApiService';
  import apiAccountMapping from '@/api/AK/AccountMappingApiService';
  import vSelect from '../../../../node_modules/vue-select/dist/vue-select'
  import '../../../../node_modules/vue-select/dist/vue-select.css';
  import moment from '../../../../node_modules/moment/moment'
  import { required, email, minLength } from "vuelidate/lib/validators";
  import {Money} from 'v-money'

export default {
  components:{'v-select': vSelect, cTable},
  data() { 
    return { 
      username:null,
      loading:false,
      saveData:false,
      cabang:null,
      configConfirm:null,
      textConfirm:null,
      warning:'',
      id:null,
      type :0,
      dataTableJournal: {
        Colum: "JournalNumber",
        Table: "Journal",
        Start: 0,
        Search: null
      },
      Debitor:{},
      JournalCash:{

      },
      JournalModel: {
        Status:null
      },
      Journal:{},
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'Rp. ',
          suffix: '',
          precision: 2,
          masked: false
        },
      journal_pengembalian:{
        DACode:null,
        DANumber:null,
        JournalNumber:null,
        JournalDate:null,
        Description:"Journal Pengembalian Uang Muka",
        JournalItem:[]
      },
      journal_penyaluran:{
        DACode:null,
        DANumber:null,
        JournalNumber:null,
        JournalDate:null,
        Description:"Journal Penyaluran Uang Muka",
        JournalItem:[]

      },
      journal_operasional:{
        DACode:null,
        DANumber:null,
        JournalNumber:null,
        JournalDate:null,
        Description:"Journal Operasional Uang Muka",
        JournalItem:[]
      },
      options: [],
      options_PaymentType: [],
      options_pengembalian:[],
      options_penyaluran:[],
      options_operasional:[],
      JournalItemModel: {IsDebet: null},
      account: [],
      show: true,
      selected: [], // Must be an array reference!
      show: true,
      AccountCode: null,
      DebCode:null,
      Jrn_ID:null,
      JrnUM:null,
      DACode:null,
      DANumber:null,
      AccountCode:null,
      IsReturn:0,
      DistributionValue: 0,
      OperationalValue: 0,
      ReturnValue: 0,
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
    this.username = localStorage.username
    this.cabang = localStorage.cabang
    this.DebCode = this.$route.params.DebCode;
    this.Jrn_ID = this.$route.params.Jrn_ID;
    this.JrnUM = this.$route.params.JrnUM;
    this.DACode = this.$route.params.DACode;
    this.DANumber = this.$route.params.DANumber;
    this.AccountCode = this.$route.params.AccountCode;
    if(this.$route.params.Type == 14){
      this.type = 2
    }else if(this.$route.params.Type == 12){
      this.type = 1
    }else{
      this.type = 0
    }
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.JournalCash.Verification = await this.getConfig("JOURNAL_PENYETUJU")
    this.JournalCash.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
    console.log("MASUK",this.type)
    if(this.Jrn_ID){
      var dataJournal = await apiJournal.getByJrnID(this.Jrn_ID)
      if(dataJournal[0]){
        this.Journal = dataJournal[0]
      }
    }

    if(this.JrnUM){
      var dataJournalUangMuka = await apiJournalUangMuka.getByCode(this.JrnUM)
      console.log("Journal",dataJournalUangMuka)
      if(dataJournalUangMuka.Data[0]){
          this.JournalModel = dataJournalUangMuka.Data[0]
          if(dataJournalUangMuka.Data[0].DistributionValue){
           this.DistributionValue = dataJournalUangMuka.Data[0].DistributionValue
          }else{
            this.DistributionValue = 0
          }
          if(dataJournalUangMuka.Data[0].OperationalValue){
           this.OperationalValue = dataJournalUangMuka.Data[0].OperationalValue
          }else{
            this.OperationalValue = 0
          }
          if(dataJournalUangMuka.Data[0].ReturnValue){
           this.ReturnValue  = dataJournalUangMuka.Data[0].ReturnValue
          }else{
            this.ReturnValue = 0
          }
          if(this.JournalModel.DateUM){
            this.JournalModel.DateUM = this.formatDate(this.JournalModel.DateUM)
          }
           // this.JournalModel.DistributionValue = 0
           // this.JournalModel.OperationalValue = 0
           // this.JournalModel.ReturnValue  = 0
      }
    }

    if(this.DebCode){
      var dataDebitor = await apiDebitor.getOne(this.DebCode)
      if(dataDebitor.Data[0]){
          this.Debitor = dataDebitor.Data[0]
      }
    }

   await this.AkunPengembalian()
   await this.AkunPenyaluran()
   await this.AkunOperasional()

    this.loading = false
  },
  watch:{
    'JournalModel.DistributionValue': async function () {
      // var total = this.JournalModel.DistributionValue + this.JournalModel.OperationalValue + this.JournalModel.ReturnValue
      // if(this.saveData == false){
      //     if(total > this.JournalModel.RemainingAdvances){
      //       alert("Nilai Pertanggung Jawaban Melebihi Sisa Uang Muka")
      //       this.JournalModel.DistributionValue = 0
      //     }
      // }

      var total = this.JournalModel.DistributionValue + this.JournalModel.OperationalValue
       this.JournalModel.TotalNPNO = total
       this.JournalModel.SelisihNPNO = this.JournalModel.ValueAdvances - total
       if(this.JournalModel.SelisihNPNO > 0){
        this.IsReturn = 1
       }else{
        this.IsReturn = 0
       }
       this.JournalModel.ReturnValue = Math.abs(this.JournalModel.SelisihNPNO)
   },
    'JournalModel.OperationalValue': async function () {
      // var total = this.JournalModel.DistributionValue + this.JournalModel.OperationalValue + this.JournalModel.ReturnValue
      // if(this.saveData == false){
      //   if(total > this.JournalModel.RemainingAdvances){
      //     alert("Nilai Pertanggung Jawaban Melebihi Sisa Uang Muka")
      //     this.JournalModel.OperationalValue = 0
      //   }
      // }
     var total = this.JournalModel.DistributionValue + this.JournalModel.OperationalValue
       this.JournalModel.TotalNPNO = total
       this.JournalModel.SelisihNPNO = this.JournalModel.ValueAdvances - total
       if(this.JournalModel.SelisihNPNO > 0){
        this.IsReturn = 1
       }else{
        this.IsReturn = 0
       }
       this.JournalModel.ReturnValue = Math.abs(this.JournalModel.SelisihNPNO)
   },
    // 'JournalModel.ReturnValue': async function () {
      // var total = this.JournalModel.DistributionValue + this.JournalModel.OperationalValue + this.JournalModel.ReturnValue
      // if(this.saveData == false){
      //   if(total > this.JournalModel.RemainingAdvances){
      //     alert("Nilai Pertanggung Jawaban Melebihi Sisa Uang Muka")
      //     this.JournalModel.ReturnValue = 0
      //   }
      // }
   // },
 },
  methods: {
    async AkunPengembalian(){
      if(this.type == 0 || this.type == 1){
         var AccountMapping = await apiAccountMapping.getAccountByFlagWAAccMapingCategory(this.type, 30,this.cabang);
         console.log("DATA ACCOUNT",AccountMapping.length)
         this.options_pengembalian= []
          for (var i = 0; i < AccountMapping.length; i++) {
            var data = AccountMapping[i]
            this.options_pengembalian.push({label: data.Code +" - "+ data.Name, value: data.Code})
          }
      }else{
        var AccountMapping = await apiAccountMapping.getAccountByFlagWAAccMapingCategory(0, 30,this.cabang);
         console.log("DATA ACCOUNT",AccountMapping.length)
         this.options_pengembalian= []
          for (var i = 0; i < AccountMapping.length; i++) {
            var data = AccountMapping[i]
            this.options_pengembalian.push({label: data.Code +" - "+ data.Name, value: data.Code})
          }
           var AccountMapping = await apiAccountMapping.getAccountByFlagWAAccMapingCategory(1, 30,this.cabang);
          for (var i = 0; i < AccountMapping.length; i++) {
            var data = AccountMapping[i]
            this.options_pengembalian.push({label: data.Code +" - "+ data.Name, value: data.Code})
          }
      }
      },
       async AkunPenyaluran(){
        if(this.type == 0){
           var AccountMapping = await apiAccountMapping.getAccountByAccMapingCategory(2);
           console.log("DATA ACCOUNT 2",AccountMapping.length)
           this.options_penyaluran= []
            for (var i = 0; i < AccountMapping.length; i++) {
              var data = AccountMapping[i]
              this.options_penyaluran.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }

        }else if(this.type == 1){
            var AccountMapping = await apiAccountMapping.getAccountByAccMapingCategory(3);
           console.log("DATA ACCOUNT 2",AccountMapping.length)
           this.options_penyaluran= []
            for (var i = 0; i < AccountMapping.length; i++) {
              var data = AccountMapping[i]
              this.options_penyaluran.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }
        }else{
           var AccountMapping = await apiAccountMapping.getAccountByAccMapingCategory(2);
           console.log("DATA ACCOUNT 2",AccountMapping.length)
           this.options_penyaluran= []
            for (var i = 0; i < AccountMapping.length; i++) {
              var data = AccountMapping[i]
              this.options_penyaluran.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }
           var AccountMapping1 = await apiAccountMapping.getAccountByAccMapingCategory(3);
            for (var i = 0; i < AccountMapping1.length; i++) {
              var data = AccountMapping1[i]
              this.options_penyaluran.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }
        }
      },
       async AkunOperasional(){
        if(this.type == 0){
           var AccountMapping = await apiAccountMapping.getAccountByAccMapingCategory(31);
           console.log("DATA ACCOUNT 2",AccountMapping.length)
           this.options_operasional= []
            for (var i = 0; i < AccountMapping.length; i++) {
              var data = AccountMapping[i]
              this.options_operasional.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }
        }else if(this.type == 1){
          var AccountMapping = await apiAccountMapping.getAccountByAccMapingCategory(32);
           console.log("DATA ACCOUNT 2",AccountMapping.length)
           this.options_operasional= []
            for (var i = 0; i < AccountMapping.length; i++) {
              var data = AccountMapping[i]
              this.options_operasional.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }
        }else{
          var AccountMapping = await apiAccountMapping.getAccountByAccMapingCategory(31);
           console.log("DATA ACCOUNT 2",AccountMapping.length)
           this.options_operasional= []
            for (var i = 0; i < AccountMapping.length; i++) {
              var data = AccountMapping[i]
              this.options_operasional.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }
            var AccountMapping = await apiAccountMapping.getAccountByAccMapingCategory(32);
            for (var i = 0; i < AccountMapping.length; i++) {
              var data = AccountMapping[i]
              this.options_operasional.push({label: data.Code +" - "+ data.Name, value: data.Code})
            }

        }
      },

      async SaveUangMuka(){
         this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
         .then(async (value) => {
            if(value){
                this.loading = true
                this.saveData = true
                 // await this.saveJournalPengembalian()
                 // await this.saveJournalPenyaluran()
                 // await this.saveJournalOperasional()
                 await this.saveJournal()
                  var total = this.JournalModel.DistributionValue + this.JournalModel.OperationalValue + this.JournalModel.ReturnValue
                if(total < this.JournalModel.RemainingAdvances){
                  this.JournalModel.Status = false
                }else{
                    this.JournalModel.Status = true
                }
                var hasilRemainingAdvances = this.JournalModel.RemainingAdvances - total
                if(hasilRemainingAdvances >= 0){
                  this.JournalModel.RemainingAdvances = hasilRemainingAdvances
                }else{
                   this.JournalModel.RemainingAdvances = 0
                }
                var TotalDistributionValue =  this.JournalModel.DistributionValue + this.DistributionValue
                 var TotalOperationalValue = this.JournalModel.OperationalValue + this.OperationalValue
                  var TotalReturnValue = this.JournalModel.ReturnValue + this.ReturnValue
                this.JournalModel.DistributionValue = TotalDistributionValue
                this.JournalModel.OperationalValue = TotalOperationalValue
                this.JournalModel.ReturnValue  = TotalReturnValue
                console.log("HASIL JOURNAL",this.JournalModel)
                this.JournalModel.UpdatedBy = this.username
               var JournalUangMuka = await apiJournalUangMuka.update(this.JrnUM,this.JournalModel);
              var initSummary = {}
              initSummary.DACode = this.DACode
              initSummary.JournalDate = this.JournalModel.DateUM
               var InsertDebitAccount = await apiDebitAccountSummary.insertDebitSummary(initSummary);
                   console.log("InsertDebitAccount",InsertDebitAccount)
                this.loading = false
                 this.showNotif(JournalUangMuka,'Uang Muka')
                this.$router.push('/accounting/jurnal-uang-muka')
            }
         })
         .catch(err => {
          // An error occurred
         })

      },
       async saveJournal(){
        this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.UM.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
        this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
        var journalNumber = await this.getCount(this.dataTableJournal)
        var description = ""
        if(this.JournalModel.Description){
          description = this.JournalModel.Description
        }
        this.journal_pengembalian.DACode = this.DACode
          this.journal_pengembalian.DANumber = this.DANumber
          this.journal_pengembalian.JournalNumber = journalNumber
          this.journal_pengembalian.JournalDate = this.JournalModel.DateUM
          this.journal_pengembalian.JournalTypeId = this.Journal.JournalTypeId
          this.journal_pengembalian.CreatedBy = this.username
          this.journal_pengembalian.Description = "Pertanggung Jawaban Panjar /n " + this.Debitor.FullName + " " + description
          this.journal_pengembalian.IsPosting = 0
          this.journal_pengembalian.WorkArea = this.cabang
          this.journal_pengembalian.JournalItem = []
          this.journal_pengembalian.JournalCash = []
          this.journal_pengembalian.JournalCash.push(this.JournalCash)
          var DistributionValue = {}
          var OperationalValue = {}
          var ReturnValue = {}
          if(this.JournalModel.DistributionValue > 0){
            DistributionValue = {
              AccountCode:this.JournalModel.COANilaiPenyaluran.value,
              IsDebet:1,
              ItemValue:this.JournalModel.DistributionValue
            }
            this.journal_pengembalian.JournalItem.push(DistributionValue)

            var debTransaction = {}
            debTransaction.DACode = this.DACode
            debTransaction.TransNo = journalNumber
            debTransaction.TransDate  = this.JournalModel.DateUM
            debTransaction.InstSeq  = 0
            debTransaction.IsDebet  = false
            debTransaction.Loan = this.JournalModel.DistributionValue
            debTransaction.Interest = 0
            debTransaction.AdvPayment = 0
            debTransaction.TransValue = this.JournalModel.DistributionValue
            debTransaction.Description = this.journal_pengembalian.Description
            debTransaction.WorkArea = this.cabang
            debTransaction.CreatedBy = this.username
            var response1 = await apiDebTransaction.create(debTransaction);
           console.log("debTransaction",response1)
          }
          if(this.JournalModel.OperationalValue > 0){
            OperationalValue = {
              AccountCode:this.JournalModel.COANilaiOperasional.value,
              IsDebet:1,
              ItemValue:this.JournalModel.OperationalValue
            }
            this.journal_pengembalian.JournalItem.push(OperationalValue)
          }
          if(this.JournalModel.ReturnValue > 0 && this.IsReturn == 0){
            ReturnValue =  {
              AccountCode:this.JournalModel.COANilaiPengembalian.value,
              IsDebet:0,
              ItemValue:this.JournalModel.ReturnValue
            }
            this.journal_pengembalian.JournalItem.push(ReturnValue)
          }
          if(this.JournalModel.ReturnValue > 0 && this.IsReturn == 1){
            ReturnValue =  {
              AccountCode:this.JournalModel.COANilaiPengembalian.value,
              IsDebet:1,
              ItemValue:this.JournalModel.ReturnValue
            }
            this.journal_pengembalian.JournalItem.push(ReturnValue)
          }
          this.journal_pengembalian.JournalItem.push({
            AccountCode:this.AccountCode,
            IsDebet:0,
            ItemValue:this.JournalModel.ValueAdvances
          })
           var response = await apiJournal.create(this.journal_pengembalian);
      },
      async saveJournalPengembalian(){
        this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.UM.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
        this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
        var journalNumber = await this.getCount(this.dataTableJournal)

        this.journal_pengembalian.DACode = this.DACode
          this.journal_pengembalian.DANumber = this.DANumber
          this.journal_pengembalian.JournalNumber = journalNumber
          this.journal_pengembalian.JournalDate = this.JournalModel.DateUM
          this.journal_pengembalian.JournalTypeId = this.Journal.JournalTypeId
          this.journal_pengembalian.Description = "Journal Pengembalian Uang Muka a/n " + this.Debitor.FullName
          this.journal_pengembalian.IsPosting = 0
          this.journal_pengembalian.WorkArea = this.cabang
          this.journal_pengembalian.JournalItem = []
          this.journal_pengembalian.JournalItem.push(
          {
            AccountCode:this.AccountCode,
            IsDebet:0,
            ItemValue:this.JournalModel.ReturnValue
          },
          {
            AccountCode:this.JournalModel.COANilaiPengembalian.value,
            IsDebet:1,
            ItemValue:this.JournalModel.ReturnValue
          },
          )
           var response = await apiJournal.createNoCash(this.journal_pengembalian);
           console.log("JournalPengembalian",this.journal_pengembalian.JournalItem)
      },
       async saveJournalPenyaluran(){
         this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.UM.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
        this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
        var journalNumber = await this.getCount(this.dataTableJournal)

        this.journal_penyaluran.DACode = this.DACode
          this.journal_penyaluran.DANumber = this.DANumber
          this.journal_penyaluran.JournalNumber = journalNumber
          this.journal_penyaluran.JournalDate = this.JournalModel.DateUM
          this.journal_penyaluran.Description = "Journal Penyaluran Uang Muka a/n " + this.Debitor.FullName
          this.journal_penyaluran.JournalTypeId = this.Journal.JournalTypeId
          this.journal_penyaluran.IsPosting = 0
          this.journal_penyaluran.WorkArea = this.cabang
          this.journal_penyaluran.JournalItem = []
          this.journal_penyaluran.JournalItem.push(
          {
            AccountCode:this.AccountCode,
            IsDebet:0,
            ItemValue:this.JournalModel.DistributionValue
          },
          {
            AccountCode:this.JournalModel.COANilaiPenyaluran.value,
            IsDebet:1,
            ItemValue:this.JournalModel.DistributionValue
          },
          )
           var response = await apiJournal.createNoCash(this.journal_penyaluran);
           console.log("JournalPenyaluran",response)
      },
       async saveJournalOperasional(){
        this.dataTableJournal.Search = this.cabang + '.'+  new Date().getFullYear() +'.UM.'+ this.formatRomawi(new Date().getMonth() + 1) +'.'
        this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
        var journalNumber = await this.getCount(this.dataTableJournal)

        this.journal_operasional.DACode = this.DACode
          this.journal_operasional.DANumber = this.DANumber
          this.journal_operasional.JournalNumber = journalNumber
          this.journal_operasional.JournalDate = this.JournalModel.DateUM
          this.journal_operasional.Description = "Journal Operasional Uang Muka a/n " + this.Debitor.FullName
          this.journal_operasional.JournalTypeId = this.Journal.JournalTypeId
          this.journal_operasional.IsPosting = 0
          this.journal_operasional.WorkArea = this.cabang
          this.journal_operasional.JournalItem = []
          this.journal_operasional.JournalItem.push(
          {
            AccountCode:this.AccountCode,
            IsDebet:0,
            ItemValue:this.JournalModel.OperationalValue
          },
          {
            AccountCode:this.JournalModel.COANilaiOperasional.value,
            IsDebet:1,
            ItemValue:this.JournalModel.OperationalValue
          },
          )
           var response = await apiJournal.createNoCash(this.journal_operasional);
           console.log("JournalOperasional",response)
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
