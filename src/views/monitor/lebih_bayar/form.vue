<template>
  	<div class="animated fadeIn">
	    <b-col sm="12" v-if="loading">
	        <b-card>
	             <b-spinner label="Spinning"></b-spinner>
	             Loading
	        </b-card>
	      </b-col>
	 	<b-col sm="12" v-if="!loading">
	      	<b-card>
		        <div slot="header">
		          <strong v-if="this.Status == 'kelebihan'">Pengembalian Kembalian</strong>
		           <strong v-if="this.Status == 'penerimaan'">Penerimaan Kelebihan</strong>
		        </div>
		        <b-row>
                    <b-col sm="12">
                      <b-card>
                      	 <b-col sm="12">
                      		<b-table :items="itemsCOA" :fields="fieldsCOA" >
          					</b-table>
                      	 </b-col>
                      </b-card>
                  	</b-col>
              	</b-row>
              	<b-row>
                    <b-col sm="12">
                      <b-card>
                      	<b-col sm="12">
                      		<b-row>
	                      		<b-col sm="2">
	                      			Tanggal :
	                      		</b-col>
	                      		<b-col sm="10">
                                <date-picker  style="width: 100%;" v-model="lebihBayar.Tanggal" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
	                      			 <!-- <b-form-input v-model="lebihBayar.Tanggal"  type="date" required></b-form-input> -->
	                      		</b-col>
                      		</b-row>
	                      		<br>
                      		<b-row>
	                      		<b-col sm="2">
	                      			No. Ref :
	                      		</b-col>
	                      		<b-col sm="10">
	                      			 <b-form-input v-model="lebihBayar.NoRef"  type="text" disabled required></b-form-input>
	                      		</b-col>
                      		</b-row>
	                      		<br>
                      		<b-row>
	                      		<b-col sm="2">
	                      			No Debitur :
	                      		</b-col>
	                      		<b-col sm="10">
	                      			 <b-form-input v-model="debitAccount.DANumber"  type="text" disabled required></b-form-input>
	                      		</b-col>
                      		</b-row>
	                      		<br>
                      		<b-row>
	                      		<b-col sm="2">
	                      			Nama:
	                      		</b-col>
	                      		<b-col sm="10">
	                      			 <b-form-input v-model="debitor.FullName"  type="text" disabled required></b-form-input>
	                      		</b-col>
                      		</b-row>
	                      		<br>
                          <b-row>
                            <b-col sm="2">
                              Kepada:
                            </b-col>
                            <b-col sm="10">
                               <b-form-input v-model="lebihBayar.Receiver"  type="text" required></b-form-input>
                            </b-col>
                          </b-row>
                            <br>
                          <b-row>
                            <b-col sm="2">
                              Permintaan Bayar:
                            </b-col>
                            <b-col sm="10">
                               <b-form-input v-model="lebihBayar.RequestToPay"  type="text" required></b-form-input>
                            </b-col>
                          </b-row>
                            <br>
                          <b-row>
                            <b-col sm="2">
                              Verifikasi:
                            </b-col>
                            <b-col sm="10">
                               <b-form-input v-model="lebihBayar.Verification"  type="text" required></b-form-input>
                            </b-col>
                          </b-row>
                           <br>
                          <b-row>
                            <b-col sm="2">
                              Penyetujui:
                            </b-col>
                            <b-col sm="10">
                               <b-form-input v-model="lebihBayar.Agreement"  type="text" required></b-form-input>
                            </b-col>
                          </b-row>
                            <br>

						             <b-row>
	                      		<b-col sm="2">
	                      			Kelebihan Pembayaran:
	                      		</b-col>
	                      		<b-col sm="10">
	                      			 <money class="form-control" v-model="lebihBayar.KelebihanPembayaran" v-bind="money"></money>
	                      		</b-col>
                      		</b-row>
	                      		<br>
                      		<b-row>
	                      		<b-col sm="2">
	                      			Total:
	                      		</b-col>
	                      		<b-col sm="10">
	                      			<money class="form-control" v-model="lebihBayar.Total" disabled v-bind="money"></money>
	                      		</b-col>
                      		</b-row>
	                      		<br>
                      		<b-row>
	                      		<b-col sm="2">
                      				Catatan:
                      			</b-col>
                      			<b-col sm="10">
	                      			 <b-form-input v-model="lebihBayar.Catatan"  type="text" required></b-form-input>
	                      		</b-col>
                      		</b-row>
	                      		<br>
                      		<b-row v-if="this.Status == 'kelebihan'">
	                      		<b-col sm="2">
                      				Debet:
	                      		</b-col>
	                      		<b-col sm="10">
	                      			 <b-form-select v-model="lebihBayar.Debet" :options="select_Debet"></b-form-select>
	                      		</b-col>
                      		</b-row>
	                      		<br>
                      		<b-row  v-if="this.Status == 'kelebihan'">
	                      		<b-col sm="2">
                      				Kredit:
	                      		</b-col>
	                      		<b-col sm="10">
	                      			<v-select v-model="lebihBayar.Kredit" :options="select_Kredit" :reduce="name => name.code" label="name"></v-select>
	                      		</b-col>
                      		</b-row>
                      		<br>
                      		<b-row  v-if="this.Status == 'penerimaan'">
	                      		<b-col sm="2">
                      				Akun Kas/Bank2:
	                      		</b-col>
	                      		<b-col sm="10">
	                      			<v-select v-model="lebihBayar.kasBank" :options="select_kasBank" :reduce="name => name.code" label="name"></v-select>
	                      		</b-col>
                      		</b-row>
                      		<b-row>
	                      		<b-col sm="2">
                      				 <b-button class="mt-2" variant="primary" block @click="simpan">Simpan</b-button>
	                      		</b-col>
                      		</b-row>
                      	</b-col>
                      </b-card>
                  	</b-col>
              	</b-row>
              	<b-row>
                    <b-col sm="12">
                      <b-card>
                            <!--  <excel
                                  :items="itemsExcel"
                                  :header="headerExcel"
                                  sheetName="Kartu Piutang"
                                  filename="Kartu Piutang"> </excel>
                                  <br> -->
                      	 <b-col sm="12">
                  		 	<b-table :items="itemsKP" :fields="fieldsKP" class="table-responsive">
                                <template slot="thead-top" slot-scope="data">
                                  <tr>
                                    <th class="text-center" colspan="5">Kewajiban</th>
                                    <th class="text-center" colspan="6">Pembayaran</th>
                                     <th class="text-center" colspan="3">Sisa Pembayaran</th>
                                  </tr>
                                </template>
                                <template slot="bottom-row" slot-scope="data">
                                  <td>Total</td>
                                  <td>{{totalSettValue}}</td>
                                  <td>{{totalInterestVal}}</td>
                                  <td>{{totalTotalBill}}</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>{{totalTransSettValue}}</td>
                                  <td>{{totalInterest}}</td>
                                  <td>{{totaladvPay}}</td>
                                  <td>{{totalTransValue}}</td>
                                  <td>{{totalPokokSisa}}</td>
                                  <td>{{totalJasaSisa}}</td>
                                  <td>{{totalTotalSisa}}</td>
                                </template>
                            </b-table>
                      	 </b-col>
                      </b-card>
                  	</b-col>
              	</b-row>
	    	</b-card>
		</b-col>
	</div>
</template>
<script>
  import moment from 'moment';
  import excel from '../../../components/BtnExcel';
	import apiDebitor from '@/api/PK/DebitorApiService';
	import apiInstSchedule from '@/api/PK/InstScheduleApiService';
	import apiAKAccount from '@/api/AKAccountApiService';
	import apiAccountMapping from '@/api/AK/AccountMappingApiService';
	import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiDebTransaction from '@/api/PK/DebTransactionApiService';
  import apiDebitorVenture from '@/api/PK/DebitorVentureApiService';
  	import {Money} from 'v-money'
  	import dynamic from '@/api/DynamicApiService';
	export default {
    components: {
       excel
    },
  	data () { 
    return { 
        	loading:false,
         	cabang:null,
         	DACode:null,
          // ChnlPatner:null,
         	Status:null,
         	Sektor:null,
          totalPokokSisa:null,
          totalJasaSisa:null,
          totalTotalSisa:null,
          configConfirm:null,
          textConfirm:null,
         	MappingCategoryKelebihan:22,
	    	lebihBayar:{
	    		Tanggal: this.formatDate(new Date),
	    		NoRef:null
	    	},
        headerExcel:["Ke","Kewajiban Pokok","Kewajiban Jasa","Kewajiban Total","Jatuh Tempo","No Bukti","Tgl Bayar","Pembayaran Pokok","Pembayaran Jasa","Pembayaran Total","Adv Pay","Sisa Pembayaran Pokok","Sisa Pembayaran Jasa","Sisa Pembayaran Total"],
        itemsExcel:[],
	    	select:[],
	    	select_Debet:[],
	    	select_Kredit:[],
	    	select_kasBank:[],
	    	dataTableJournal: {
	            Colum: "JournalNumber",
	            Table: "Journal",
	            Start: 0,
	            Search: null
          	},
	    	debitor:{},
	    	debitAccount:{},
	    	itemsCOA:[],
	    	fieldsCOA:[
    		 	{key: 'Code', label: 'No Akun', sortable: true},
		        {key: 'Name', label: 'Descripsi', sortable: true},
		        {key: 'Balance', label: 'Saldo', sortable: true},
	    	],
     		itemsKP : [],
	    	fieldsKP: [
		    	{ key: 'Sequence', label: 'Ke' },
		        { key: 'SettValue', label: 'Pokok' },
		        { key: 'InterestVal', label: 'Jasa' },
		        { key: 'TotalBill', label: 'Total' },
		        { key: 'DueDate', label: 'Jatuh Tempo' },
		        { key: 'TransNo', label: 'No Bukti' },
		        { key: 'TransDate', label: 'Tgl Bayar' },
		        { key: 'TransSettValue', label: 'Pokok' },
		        { key: 'Interest', label: 'Jasa' },
            { key: 'advPay', label: 'Adv Pay' },
		        { key: 'TransValue', label: 'Total' },
		        { key: 'PokokSisa', label: 'Pokok' },
		        { key: 'JasaSisa', label: 'Jasa' },
		        { key: 'TotalSisa', label: 'Total' },
	      	],
    	 	money: {
	            decimal: ',',
	            thousands: '.',
	            prefix: 'Rp. ',
	            suffix: '',
	            precision: 2,
	            masked: false
          	},
	    }
	},
  computed: {
    totalSettValue: function() {
      return this.formatCurrency(this.itemsKP.reduce(function(a, c){
        console.log("TTLSettValue",c.TTLSettValue)
        return a + Number(c.TTLSettValue  || 0);
      }, 0))
    },
     totalInterestVal: function() {
      return this.formatCurrency(this.itemsKP.reduce(function(a, c){
        return  a + Number(c.TTLInterestVal  || 0);
      }, 0))
    },
     totalTotalBill: function() {
      return this.formatCurrency(this.itemsKP.reduce(function(a, c){
        return  a + Number(c.TTLTotalBill  || 0) ;
      }, 0))
    },
     totalTransSettValue: function() {
      return this.formatCurrency(this.itemsKP.reduce(function(a, c){
        return  a + Number(c.TTLTransSettValue  || 0) ;
      }, 0))
    },
     totalInterest: function() {
      return this.formatCurrency(this.itemsKP.reduce(function(a, c){
        return  a + Number(c.TTLInterest  || 0) ;
      }, 0))
    },
     totalTransValue: function() {
      return this.formatCurrency(this.itemsKP.reduce(function(a, c){
        return  a + Number(c.TTLTransValue  || 0) ;
      }, 0))
    },
     totaladvPay: function() {
      return this.formatCurrency(this.itemsKP.reduce(function(a, c){
        return  a + Number(c.TTLadvPay  || 0) ;
      }, 0))
    },
  },
	watch:{
		'lebihBayar.KelebihanPembayaran': async function () {
         	this.lebihBayar.Total = this.lebihBayar.KelebihanPembayaran
       },
	},
	  async created() {
	  	this.loading = true
          this.cabang = localStorage.cabang
          this.DACode = this.$route.params.DACode
          this.Status = this.$route.params.Status
          this.Sektor = this.$route.params.Sektor
          console.log("DATA SEKTOR",this.Sektor)
          this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
          this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
           this.kartuPiutang()
           this.showKreditOrKasBank()

           this.lebihBayar.Verification = await this.getConfig("JOURNAL_PENYETUJU")
           this.lebihBayar.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
           var debitAccount = await apiDebitAccount.getOne(this.DACode)
           var ChnlPatner = {}
           this.debitAccount = debitAccount.Data[0]
           if(debitAccount.Data[0]){
            var debitor = await apiDebitor.getOne(debitAccount.Data[0].DebCode)
            var debitorVenture = await apiDebitorVenture.getByDEBCode(debitAccount.Data[0].DebCode);
            ChnlPatner = {

              ChnlCode : debitorVenture.Data[0].SynergyChannelId,
              Type : debitorVenture.Data[0].DistributionPattern
            }
            this.debitor = debitor.Data[0]
           }
           this.showDebit(ChnlPatner)
          if(this.Status == 'kelebihan'){
          	this.dataCOA()
            this.lebihBayar.KelebihanPembayaran  = parseInt(this.$route.params.Value)
          	if(this.debitAccount.DANumber){
	           	this.lebihBayar.NoRef = "PB-"+ this.debitAccount.DANumber + "-" + this.formatDateYmdhis(new Date)
	           	 this.lebihBayar.Catatan = "Pengembalian Kelebihan a.n. " + this.debitor.FullName + ": " + this.debitor.FullName + " No " + this.debitAccount.DANumber
           	}else{
	           	this.lebihBayar.NoRef =  "PB-"+ 0 + "-" + this.formatDateYmdhis(new Date)
	           	this.lebihBayar.Catatan = "Pengembalian Kelebihan a.n. " + this.debitor.FullName + ": " + this.debitor.FullName + " No " + 0
           	}
          }
          if(this.Status == 'penerimaan'){
          	this.DataAccountBySectorAndMappingCategoryId()
          	 this.dataTableJournal.Search =  this.cabang +"."+ new Date().getFullYear()+".KB."+this.formatRomawi(new Date().getMonth() + 1)+"."
  			  this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
  			  var codeJournalNumber = await this.getCountNoRef(this.dataTableJournal)
  				this.lebihBayar.NoRef = codeJournalNumber
  				this.lebihBayar.Catatan = "Kelebihan Pembayaran Ke-"+this.debitAccount.Tenor+" a.n. " + this.debitor.FullName + ": " + this.debitor.FullName + " No " + this.debitAccount.DANumber
  			  console.log("JournalNumber",this.lebihBayar.NoRef)
          }
	  	this.loading = false
      },
	methods: {
		async showKreditOrKasBank(){
			 var getBank = await apiAKAccount.getByTypeAndWorkarea(this.cabang,35)
            for (var i = 0; i < getBank.length; i++) {
            	var dataBank  = getBank[i]
              console.log('coa',dataBank);
            	this.select_Kredit.push({ code: dataBank.Code, name:dataBank.Code +" - "+ dataBank.Name })
            	this.select_kasBank.push({ code: dataBank.Code, name:dataBank.Code +" - "+ dataBank.Name })
	 	  	}
            // if(getBank[0]){
            // 	console.log("DATA BARANG",getBank[0].Code)
            // 	this.lebihBayar.Kredit = getBank[0].Code
            // 	this.lebihBayar.kasBank = getBank[0].Code
            // }
            // this.select_Debet = getBank
		},
		async showDebit(ChnlPatner){

			 console.log("Alvalis",ChnlPatner)
       var getBank;
       if (ChnlPatner && ChnlPatner.Type == 'Avalis') {
           getBank = await apiAccountMapping.getAccountByChnlCode(ChnlPatner.ChnlCode)
       } else {
           getBank = await apiAccountMapping.getAccountBySectorAndMappingCategoryId(this.Sektor,this.MappingCategoryKelebihan)
       }
       console.log("getBank ",getBank);
			 // var getBank = await await apiAccountMapping.getAccountBySectorAndMappingCategoryId(this.Sektor,this.MappingCategoryKelebihan)
            for (var i = 0; i < getBank.length; i++) {
            	var dataBank  = getBank[i]
            	this.select_Debet.push({text: dataBank.Code +" - "+dataBank.Name,value:dataBank.Code})
	 	  	}
            // console.log("DATA BARANG 2",getBank[0].Code)
            if(getBank[0]){
            	this.lebihBayar.Debet = getBank[0].Code
            }
            // this.select_Debet = getBank
		},
		async dataCOA(){
		 	let dataAccount = await apiAKAccount.getCodeAndWaCode('11.121', '6',this.cabang)
		 	console.log("DATA ACCOUNT",dataAccount.length)
	 	  	for (var i = 0; i < dataAccount.length; i++) {
	 	  		var data = dataAccount[i]
	 	  		data.Balance = this.formatCurrency(dataAccount[i].Balance)
		 		this.itemsCOA.push(data)
	 	  	}
		},
		async DataAccountBySectorAndMappingCategoryId(){
		 	let dataAccountMapping = await apiAccountMapping.getAccountBySectorAndMappingCategoryId(this.Sektor,this.MappingCategoryKelebihan)
		 	console.log("MAPPING CATEGORY",dataAccountMapping)
		 	console.log("DATA ACCOUNT",dataAccountMapping.length)
	 	  	for (var i = 0; i < dataAccountMapping.length; i++) {
	 	  		var data = dataAccountMapping[i]
	 	  		data.Balance = this.formatCurrency(dataAccountMapping[i].Balance)
		 		this.itemsCOA.push(data)
	 	  	}
		},
	    async kartuPiutang(){
	      let instSchedule = await apiInstSchedule.getKartuPiutang(this.$route.params.DACode)
       let instScheduleTotal = await apiInstSchedule.getTotal(this.$route.params.DACode)

         var PokokKe = instScheduleTotal.Data.SettValue
        var JasaKe = instScheduleTotal.Data.InterestVal
        var TotalKe = instScheduleTotal.Data.TotalBill

         var PokokKewa = 0
        var JasaKewa = 0
        var TotalKewa = 0
        var CurtSequence = 0
        this.itemsExcel= []
         for (var i = 0; i < instSchedule.Data.length; i++) {
             var loopData = instSchedule.Data
             if(CurtSequence !=  loopData[i].Sequence ){
               loopData[i].Sequence = loopData[i].Sequence
                loopData[i].TTLSettValue = loopData[i].SettValue
                loopData[i].SettValue = this.formatCurrency(loopData[i].SettValue)
                loopData[i].TTLInterestVal = loopData[i].InterestVal
                loopData[i].InterestVal = this.formatCurrency(loopData[i].InterestVal)
                loopData[i].TTLTotalBill = loopData[i].TotalBill
                loopData[i].TotalBill = this.formatCurrency(loopData[i].TotalBill)
                if(loopData[i].DueDate){
                  loopData[i].DueDate = this.formatDateDMY(loopData[i].DueDate)
                }
              }else{
                loopData[i].Sequence = ""
                loopData[i].SettValue = ""
                loopData[i].InterestVal = ""
                loopData[i].TotalBill = ""
                loopData[i].DueDate = ""
              }

            loopData[i].TransNo = loopData[i].TransNo
            if(loopData[i].TransDate){
              loopData[i].TransDate = this.formatDateDMY(loopData[i].TransDate )
            }
            loopData[i].TTLadvPay = loopData[i].AdvPayment
            loopData[i].advPay = this.formatCurrency(loopData[i].AdvPayment)

            if(i == 0){
                PokokKewa =  PokokKe - loopData[i].Loan
                JasaKewa = JasaKe - loopData[i].Interest
                TotalKewa =  TotalKe - loopData[i].TransValue
              }else{
                PokokKewa = PokokKewa - loopData[i].Loan
                JasaKewa = JasaKewa - loopData[i].Interest
                TotalKewa = TotalKewa - loopData[i].TransValue
              }

            loopData[i].TTLTransSettValue = loopData[i].Loan
            loopData[i].TTLInterest = loopData[i].Interest
            loopData[i].TTLTransValue = loopData[i].TransValue

            loopData[i].TransSettValue = this.formatCurrency(loopData[i].Loan)
            loopData[i].Interest = this.formatCurrency(loopData[i].Interest)
            loopData[i].TransValue = this.formatCurrency(loopData[i].TransValue)

              loopData[i].TTLPokokSisa =  PokokKewa
              loopData[i].TTLJasaSisa =  JasaKewa
              loopData[i].TTLTotalSisa =  TotalKewa

              loopData[i].PokokSisa = this.formatCurrency(PokokKewa)
              loopData[i].JasaSisa = this.formatCurrency(JasaKewa)
              loopData[i].TotalSisa = this.formatCurrency(TotalKewa)

              // console.log("KARTU PIUTANG",loopData[i])

               this.itemsExcel.push({
                    Sequence : loopData[i].Sequence,
                    SettValue : this.CurrencyToNumber(loopData[i].SettValue) ,
                    InterestVal : this.CurrencyToNumber(loopData[i].InterestVal),
                    TotalBill : this.CurrencyToNumber(loopData[i].TotalBill),
                    DueDate : loopData[i].DueDate,
                    TransNo : loopData[i].TransNo,
                    TransDate : loopData[i].TransDate,
                    TransSettValue : this.CurrencyToNumber(loopData[i].TransSettValue) ,
                    Interest : this.CurrencyToNumber(loopData[i].Interest) ,
                    TransValue : this.CurrencyToNumber(loopData[i].TransValue) ,
                    advPay : this.CurrencyToNumber(loopData[i].advPay) ,
                    PokokSisa : this.CurrencyToNumber(loopData[i].PokokSisa) ,
                    JasaSisa : this.CurrencyToNumber(loopData[i].JasaSisa) ,
                    TotalSisa : this.CurrencyToNumber(loopData[i].TotalSisa)
                  })
	            this.itemsKP.push(loopData[i])
	             CurtSequence = loopData[i].Sequence
	         }
	    },
	    async simpan(){
         this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
         .then(async (value) => {
            if(value){
              this.loading = true
              if(this.Status == 'kelebihan'){
                  this.lebihBayar.DACode = this.DACode
                  this.lebihBayar.TransDate = this.lebihBayar.Tanggal
                  this.lebihBayar.TransValue = this.lebihBayar.KelebihanPembayaran
                  this.lebihBayar.AccountSectCode = this.lebihBayar.Kredit
                  this.lebihBayar.Description = this.lebihBayar.Catatan
                  console.log(this.lebihBayar);

                  var response = await apiDebTransaction.createPengembalian(this.lebihBayar)
                this.loading = false
                  this.showNotif(response,'Pengembalian')
                  this.$router.push('/monitor/inst-schedule/')
              }
              if(this.Status == 'penerimaan'){
                 this.dataTableJournal.Search =  this.cabang +"."+ new Date().getFullYear()+".KB."+this.formatRomawi(new Date().getMonth() + 1)+"."
                this.dataTableJournal.Start =  this.dataTableJournal.Search.length + 1
                var codeJournalNumber = await this.getCount(this.dataTableJournal)
                 this.lebihBayar.DACode = this.DACode.replace(/\s/g, '')
                  this.lebihBayar.TransDate = this.lebihBayar.Tanggal
                  this.lebihBayar.TransValue = this.lebihBayar.KelebihanPembayaran
                  this.lebihBayar.BankCode = this.lebihBayar.kasBank.replace(/\s/g, '')
                  this.lebihBayar.TransNo = codeJournalNumber
                  this.lebihBayar.Description = this.lebihBayar.Catatan
                  console.log(this.lebihBayar);
                  console.log("NOMOR REF",codeJournalNumber);

                  var response = await apiDebTransaction.createPenerimaanKelebihan(this.lebihBayar)
                  console.log("PENERIMAAN",response);

                  if(response.Data > 0){
                  this.$router.push('/accounting/general-journal-form/'+response.Data)
                    this.showNotif(response, 'Pengembalian')
                  }else{
                    this.$router.push('/accounting/general-journal-form/'+response.Data)
                  this.loading = false
                    this.showNotifFailed()
                    this.$router.push('/monitor/inst-schedule/')
                  }
              }
            }
         })
         .catch(err => {
          // An error occurred
         })
    }

	}
}
</script>
