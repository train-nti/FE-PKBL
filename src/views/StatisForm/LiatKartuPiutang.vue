<style media="screen">
.leader{
   content: "";
   /*background: url(/static/logo.png);*/
   background-size: 100% 100%;
   padding-top:5px;
   width: 100px;
   height: 30px;
   /*margin-bottom:50px;*/
}
.leader-text{
  font-size: 20px;
  width: 100%;
  text-align: center;
}

</style>
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
  <b-row id="print_data" v-if="!loading" >
    <b-col sm="12">
      <b-card>
        <div slot="header" v-if="Print == 'print'">
          <b-row>
              <div>
                  <img class="leader" :src="globalEnv == 'pertamina' ? 'pkbl_online/static/logo.png' : '/static/logo.png'">
              </div>
              <div class="leader-text">
                Kartu Piutang
              </div>
          </b-row>

          <hr>
        </div>
        <div slot="header" v-else="">
          <strong>Kartu Piutang</strong>
        </div>
                    <b-row>
                        <b-col sm="12">
                          <b-card>
                            <table class="data_table" width="100%"  id="TableKP">
                              <tr>
                                <td width="15%">Kode Mitra Binaan </td>
                                <td  width="35%">: {{debitAccount.DANumber}}</td>
                                <td width="15%"> Grace Period</td>
                                <td  width="15%">: {{PKBussIncome.GracePeriod}}</td>
                              </tr>
                              <tr>
                                <td>Nama Mitra Binaan </td>
                                <td>: {{debitor.FullName}}</td>
                                <td>Status Pinjaman </td>
                                <td>: {{debitAccountSummary.Status}}</td>
                              </tr>
                              <tr>
                                <td>Alamat Mitra Binaan </td>
                                <td>: {{debitor.Address}} </td>
                                <td>Jasa Administrasi </td>
                                <td>: {{PKSurvey.AdministrationFee}} %</td>
                              </tr>
                               <tr>
                                <td>Detail Jatuh Tempo</td>
                                <td v-if="debitAccount.StlmCycle > 1">: Yarnen/Lainnya  {{debitAccount.StlmCycle}} Bulan</td>
                                 <td v-else>: Bulanan</td>
                                <td>Tanggal Realisasi </td>
                                <td>: {{debitAccountSummary.FinalPaymentDate}}</td>
                              </tr>
                               <tr>
                                <td>Jumlah Pinjaman </td>
                                <td v-if="debitAccount.DebValue">: {{formatCurrency(debitAccount.DebValue,'Rp.')}}</td>
                                <td v-else="debitAccount.DebValue">: Rp. 0</td>
                                <td>Tanggal Jatuh Tempo</td>
                                 <td>: {{debitAccountSummary.FinalDueDate}}</td>
                              </tr>
                              <tr>
                                <td>Periode Pinjaman </td>
                                <td>: {{debitAccount.Tenor}}</td>
                                <td></td>
                                <td></td>
                              </tr>
                            </table>
                          </b-card>
                            <b-card>
                                <excelKP v-if="Print != 'print'"
                                  :items="itemsExcel"
                                  :header="headerExcel"
                                  :settingExcel="setExcel"
                                  sheetName="Kartu Piutang"
                                  filename="Kartu Piutang"> </excelKP>
                                  <br>
                                  <b-table border="1" :items="DataArray" :fields="fields" class="table-responsive">
                                    <template slot="thead-top" slot-scope="data">
                                      <tr>
                                        <th class="text-center" colspan="5">Kewajiban</th>
                                        <th class="text-center" colspan="6">Pembayaran</th>
                                         <th class="text-center" colspan="5">Sisa Pembayaran</th>
                                      </tr>
                                    </template>

                                    <template v-if="Print == 'Koreksi'" slot="Aksi" slot-scope="data">

                                      <b-button @click="showModalKoreksi(data.item)" variant="secondary"
                                      size="sm">
                                        Koreksi
                                      </b-button>
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
                            </b-card>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <textarea id="printing-css" style="display:none;">html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}body{font:normal normal .8125em/1.4 Arial,Sans-Serif;background-color:white;color:#333}strong,b{font-weight:bold}cite,em,i{font-style:italic}a{text-decoration:none}a:hover{text-decoration:underline}a img{border:none}abbr,acronym{border-bottom:1px dotted;cursor:help}sup,sub{vertical-align:baseline;position:relative;top:-.4em;font-size:86%}sub{top:.4em}small{font-size:86%}kbd{font-size:80%;border:1px solid #999;padding:2px 5px;border-bottom-width:2px;border-radius:3px}mark{background-color:#ffce00;color:black}p,blockquote,pre,table,figure,hr,form,ol,ul,dl{margin:1.5em 0}hr{height:1px;border:none;background-color:#666}h1,h2,h3,h4,h5,h6{font-weight:bold;line-height:normal;margin:1.5em 0 0}h1{font-size:200%}h2{font-size:180%}h3{font-size:160%}h4{font-size:140%}h5{font-size:120%}h6{font-size:100%}ol,ul,dl{margin-left:3em}ol{list-style:decimal outside}ul{list-style:disc outside}li{margin:.5em 0}dt{font-weight:bold}dd{margin:0 0 .5em 2em}input,button,select,textarea{font:inherit;font-size:100%;line-height:normal;vertical-align:baseline}textarea{display:block;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}pre,code{font-family:"Courier New",Courier,Monospace;color:inherit}pre{white-space:pre;word-wrap:normal;overflow:auto}blockquote{margin-left:2em;margin-right:2em;border-left:4px solid #ccc;padding-left:1em;font-style:italic}table[border="1"] th,table[border="1"] td,table[border="1"] caption{border:1px solid;padding:.5em 1em;text-align:left;vertical-align:top}th{font-weight:bold}table[border="1"] caption{border:none;font-style:italic}.no-print{display:none}.leader{ content: "";  background-size: 100% 100%; padding-top:5px; width: 100px; height: 30px; }.leader-text{  font-size: 30px; width: 100%; text-align: center; }.data_table{ font-size: 20px; }</textarea>
        <iframe id="printing-frame" name="print_frame" src="about:blank" style="display:none;"></iframe>
      <b-modal ref="my-modal" hide-footer title="Pilih Bulan Diskon" >
        <div class="d-block text-center">
          <b-form-select v-model="bulanDiskon" :options="options_bulanDiskon"></b-form-select>
        </div>
        <b-button class="mt-2" variant="success" block @click="simpanDiskon">Simpan</b-button>
      </b-modal>

      <b-modal id="modal-koreksi" title="Koreksi" hide-footer>

        <p>Anda yakin ingin mengkoreksi Pembayaran Dengan <br><br>
          Nomor Transaksi : {{ koreksi.TransNo }} <br>
          Description : {{ koreksi.Description }} <br>
          Nilai Pinjaman : {{ koreksi.TransSettValue }} <br>
          Jasa : {{ koreksi.Interest }} <br><br><br>
        </p>
          <form @submit.prevent="koreksiPembayaran()">

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Tanggal Koreksi</label></b-col>
              <b-col>
                <date-picker v-model="koreksi.TransDate" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
              </b-col>
            </b-row>
            <br>
            <b-row>
              <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" v-model="koreksi.Receiver" type="text" id="#"  required/></b-col>
            </b-row>
            <br>

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Permintaan Bayar</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" v-model="koreksi.RequestToPay" type="text" id="#"  required/></b-col>
            </b-row>
            </b-row>
            <br>

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Verifikasi</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" v-model="koreksi.Verification" type="text" id="#"  required/></b-col>
            </b-row>
            <br>

            <b-row>
              <b-col><label class="mr-sm-2" for="#">Penyetujui</label></b-col>
              <b-col><b-input class="mb-2 mb-sm-0" v-model="koreksi.Agreement" type="text" id="#"  required/></b-col>
            </b-row>
            <br>
            <br>
          <b-button :disabled="buttonKoreksi != true" type="submit" variant="primary" class="float-right" style="margin-left:20px;">
              Koreksi
          </b-button>
        </form>
      </b-modal>
    </div>
</template>
<script>
import {
  Money
} from 'v-money'
import excelKP from '../../components/excelKP';
import excel from '../../components/BtnExcel';
import apiDebitor from '@/api/PK/DebitorApiService';
import apiDebitAccount from '@/api/PK/DebitAccountApiService';
import apiDebitorVenture from '@/api/PK/DebitorVentureApiService';
import apiDebTransaction from '@/api/PK/DebTransactionApiService';
import apiInstSchedule from '@/api/PK/InstScheduleApiService';
import apiPKBussIncome from '@/api/PK/PKBussIncomeApiService';
import apiPKSector from '@/api/PK/PKSectorApiService';
import apiPKSurvey from '@/api/PK/PKSurveyApiService';
import apiDebitAccountSummary from '@/api/PK/DebitAccountSummaryApiService';
import account from '@/api/AKAccountApiService';
import moment from 'moment';
export default {
  components: {
     excel,excelKP
  },
  data() { 
    return { 
      loading:false,
      bulanDiskon:null,
      DataArray : [],
      headerExcel:["Ke","Pokok","Jasa","Total","Jatuh Tempo","No Bukti","Tgl Bayar","Pokok","Jasa","Adv Pay","Total","Pokok","Jasa","Total"],
       // headerExcel1:[],
       // headerExcel2:[],
       // headerExcel3:[],
       // headerExcel4:[],
       // headerExcel5:[],
       // headerExcel6:[],
       // headerExcel7:[],
       setExcel : [
         {
           Cell : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N']
         },
         {
           titles : []
         },
         {
           mergeTo : "A"
         },
         {
           origin : "A8"
         },
        {
            position : [
              {
                colums : 1,
                left : true
              },
              {
                colums : 5,
                left : true
              },
              {
                colums : 6,
                left : true
              },
              {
                colums : 7,
                left : true
              }
            ]
          }
       ],
       totalPokokSisa:null,
       totalTotalSisa:null,
       totalJasaSisa:null,
      itemsExcel:[],
      Print : null,
      coba: {
        noBukti: "BUKTI01",
        InstSeq : 1,
        tglBayar: "2019-01-01",
        pokokBayar: 3000000,
        jasaBayar: 20000,
        payment: 0,
        totalbayar: 3200000
      },
      options_bulanDiskon:[],
      items: [{
        No: 1,
        pokok: 300000,
        jasa: 20000,
        total: 3020000,
        jatuhTempo: "2019-01-01",
        noBukti: "BUKTI01",
        tglBayar: "2019-01-01",
        pokokBayar: 3000000,
        jasaBayar: 20000,
        payment: 0,
        totalbayar: 3200000
      }, ],
      fields: [{
          key: 'Sequence',
          label: 'Ke'
        },
        {
          key: 'SettValue',
          label: 'Pokok'
        },
        {
          key: 'InterestVal',
          label: 'Jasa'
        },
        {
          key: 'TotalBill',
          label: 'Total'
        },
        {
          key: 'DueDate',
          label: 'Jatuh Tempo'
        },
        {
          key: 'TransNo',
          label: 'No Bukti'
        },
        {
          key: 'TransDate',
          label: 'Tgl Bayar'
        },
        {
          key: 'TransSettValue',
          label: 'Pokok'
        },
        {
          key: 'Interest',
          label: 'Jasa'
        },
        {
          key: 'advPay',
          label: 'Adv Pay'
        },
        {
          key: 'TransValue',
          label: 'Total'
        },
        {
          key: 'PokokSisa',
          label: 'Pokok'
        },
        {
          key: 'JasaSisa',
          label: 'Jasa'
        },
        {
          key: 'TotalSisa',
          label: 'Total'
        },
      ],
      selected: null,
      debTransaction: {},
      debitor: {},
      debitorVenture:{},
      debitAccount:{},
      PKSurvey:{},
      PKBussIncome:{},
      TanggalPerhitungan:{},
      debitAccountSummary:{},
      selected2: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp. ',
        suffix: '',
        precision: 2,
        masked: false
      },
      BankItems: [],
      belumAkad: [],
      belumCair: [],
      accountSect: [],
      accountSectItem: {},
      buttonKoreksi: true,
      options_PaymentType: [],
      koreksi:{
        TransNo:"",
        Description:""
      }

    }
  },
  computed: {
    totalSettValue: function() {
      return this.formatCurrency(this.DataArray.reduce(function(a, c){
        // console.log("TTLSettValue",c.TTLSettValue)
        return a + Number(c.TTLSettValue  || 0);
      }, 0))
    },
     totalInterestVal: function() {
      return this.formatCurrency(this.DataArray.reduce(function(a, c){
        return  a + Number(c.TTLInterestVal  || 0);
      }, 0))
    },
     totalTotalBill: function() {
      return this.formatCurrency(this.DataArray.reduce(function(a, c){
        return  a + Number(c.TTLTotalBill  || 0) ;
      }, 0))
    },
     totalTransSettValue: function() {
      return this.formatCurrency(this.DataArray.reduce(function(a, c){
        return  a + Number(c.TTLTransSettValue  || 0) ;
      }, 0))
    },
     totalInterest: function() {
      return this.formatCurrency(this.DataArray.reduce(function(a, c){
        return  a + Number(c.TTLInterest  || 0) ;
      }, 0))
    },
     totalTransValue: function() {
      return this.formatCurrency(this.DataArray.reduce(function(a, c){
        return  a + Number(c.TTLTransValue  || 0) ;
      }, 0))
    },
     totaladvPay: function() {
      return this.formatCurrency(this.DataArray.reduce(function(a, c){
        return  a + Number(c.TTLadvPay  || 0) ;
      }, 0))
    },
    //  totalPokokSisa: function() {
    //   return this.formatCurrency(this.DataArray.reduce(function(a, c){
    //     return  a + Number(c.TTLPokokSisa  || 0) ;
    //   }, 0))
    // },
    //  totalJasaSisa: function() {
    //   return this.formatCurrency(this.DataArray.reduce(function(a, c){
    //     return  a + Number(c.TTLJasaSisa  || 0) ;
    //   }, 0))
    // },
    //  totalTotalSisa: function() {
    //   return this.formatCurrency(this.DataArray.reduce(function(a, c){
    //     return  a + Number(c.TTLTotalSisa  || 0) ;
    //   }, 0))
    // },
  },
  async created() {
    this.loading = true
    console.log(this.$route.params.DACode);
    this.Print = this.$route.params.Print
    if (this.Print == 'Koreksi') {
      this.fields.push({key: 'Aksi',label: 'Aksi'})
    }
    this.koreksi.Verification = await this.getConfig("JOURNAL_PENYETUJU")
    this.koreksi.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
    this.kartuPiutang()

       var getDebitAccountSummary = await apiDebitAccountSummary.getByCode(this.$route.params.DACode)
       if(getDebitAccountSummary.Data[0]){
          this.debitAccountSummary = getDebitAccountSummary.Data[0]
          if(getDebitAccountSummary.Data[0]){
            if(getDebitAccountSummary.Data[0].Status){
              this.debitAccountSummary.Status = getDebitAccountSummary.Data[0].Status
            }
            if(this.debitAccountSummary.FinalPaymentDate){
              this.debitAccountSummary.FinalPaymentDate = this.formatDateDMY(this.debitAccountSummary.FinalPaymentDate)
            }
            if(this.debitAccountSummary.FinalDueDate){
                this.debitAccountSummary.FinalDueDate = this.formatDateDMY(this.debitAccountSummary.FinalDueDate)
            }
          }
       }

    var getBank = await account.getCode('11.121', '6')
    var getAccount = await account.getCode('11.36', '5')
    var debitAccount = await apiDebitAccount.getOne(this.$route.params.DACode)
    if(debitAccount.Data[0]){
      this.debitAccount = debitAccount.Data[0]
      if(debitAccount.Data[0].DebCode){
         var debitor = await apiDebitor.getOne(debitAccount.Data[0].DebCode)
            console.log("DEBITUR",debitor.Data[0])
          if(debitor.Data[0]){
            var Alamat = ""
            var Provinsi = ""
            var Kabupaten = ""
            var Kecamatan = ""
            var Kelurahan = ""
            if(debitor.Data[0].Address){
              Alamat = debitor.Data[0].Address
            }
            if(debitor.Data[0].Prov_code){
              Provinsi = debitor.Data[0].Prov_code
            }
            if(debitor.Data[0].Dist_code){
              Kabupaten = debitor.Data[0].Dist_code
            }
            if(debitor.Data[0].Subdis_code){
              Kecamatan = debitor.Data[0].Subdis_code
            }
            if(debitor.Data[0].Village_code){
              Kelurahan = debitor.Data[0].Village_code
            }
            this.debitor = debitor.Data[0]
            this.debitor.Address = Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi
          }
            var getPKSurvey = await apiPKSurvey.getByDaCode(this.$route.params.DACode)
          if(getPKSurvey.Data[0]){
              this.PKSurvey = getPKSurvey.Data[0]
              if(getPKSurvey.Data[0].IdPKSurvey){
              var getPKBussIncome = await apiPKBussIncome.getByIdPKSurveyCode(getPKSurvey.Data[0].IdPKSurvey)
                if(getPKBussIncome.Data[0]){
                    this.PKBussIncome = getPKBussIncome.Data[0]
                }
              }
          }

          var debitorVenture = await apiDebitorVenture.getByDEBCode(debitAccount.Data[0].DebCode)
          if(debitorVenture.Data[0]){
            this.debitorVenture = debitorVenture.Data[0]
            if(debitorVenture.Data[0].BusinessSector){
                var dataPKSector = await apiPKSector.getOne(debitorVenture.Data[0].BusinessSector)
                if(dataPKSector[0]){
                  this.debitorVenture.BusinessSector = dataPKSector[0].SectorName
                }
             }
          }
      }


    }

     // let tgl = this.datesCalculate(this.debitAccount.Tenor , this.debitAccount.ContractDate)
     //  this.TanggalPerhitungan = tgl[0]
      // console.log("TanggalPerhitungan",tgl[0])
    for (var i = 1; i <= 12; i++) {
        this.options_bulanDiskon.push({text: i,value:i})
    }

      console.log("TanggalPerhitungan",this.TanggalPerhitungan)
    console.log("DATADEBITACCOUN",debitAccount)
    this.BankItems = getBank
    this.accountSect = getAccount
    this.debTransaction.TransValue = this.$route.params.Value

    this.setHeaderExport()
    // console.log("header5",this.headerExcel5)
    // console.log("header6",this.headerExcel6)

    if(this.$route.params.Print == 'print'){
      if(this.loading != true){
          // window.print()
         this.printDiv()
      }
    }


  },
  methods: {
    borderPrint(){
      if(this.Print == 'print'){
        return 1
      }else{
        return 0
      }
    },
     printDiv() {
        var a = document.getElementById('printing-css').value;
        var b = document.getElementById('print_data').innerHTML;
        console.log(b)
        window.frames["print_frame"].document.title = document.title;
        window.frames["print_frame"].document.body.innerHTML = '<style>' + a + '</style>' + b;
        window.frames["print_frame"].window.focus();
        window.frames["print_frame"].window.print();
    },
    async setHeaderExport(){
        // this.headerExcel1 = [
        //   "Kode Mitra Binaan ",
        //   this.debitAccount.DANumber ? ": " + this.debitAccount.DANumber : ": ",
        //   "Grace Period ",
        //    this.PKBussIncome.GracePeriod  ? ": " + this.PKBussIncome.GracePeriod : ": 0"
        // ]
        // this.headerExcel2 = [
        //   "Nama Mitra Binaan ",
        //   this.debitor.FullName ? ": " + this.debitor.FullName : ": ",
        //   "Status Pinjaman ",
        //   this.debitAccountSummary.Status  ? ": " + this.debitAccountSummary.Status : ": "
        // ]
        // this.headerExcel3 = [
        //   "Alamat Mitra Binaan ",
        //   this.debitor.Address ? ": " + this.debitor.Address : ": ",
        //   "Jasa Administrasi ",
        //   this.PKSurvey.AdministrationFee  ? ": " + this.PKSurvey.AdministrationFee : ": "
        // ]
        var detailBulanan = 0 + " Bulan"
        if(this.debitAccount.StlmCycle > 1){
         detailBulanan = "Yarnen/Lainnya " + this.debitAccount.StlmCycle + " Bulan"
        }else{
           detailBulanan = "Bulanan"
        }
        // this.headerExcel4 = [
        //   "Detail Jatuh Tempo ",
        //   detailBulanan,
        //   "Tanggal Realisasi  ",
        //   this.debitAccountSummary.FinalPaymentDate  ? ": " + this.debitAccountSummary.FinalPaymentDate : ": "
        // ]
        // this.headerExcel5 = [
        //   "Jumlah Pinjaman ",
        //   this.debitAccount.DebValue  ? ": " + this.formatCurrency(this.debitAccount.DebValue,'Rp.') : "Rp. 0",
        //   "Tanggal Jatuh Tempo ",
        //   this.debitAccountSummary.FinalPaymentDate  ? ": " + this.debitAccountSummary.FinalPaymentDate : ": "
        // ]
        // this.headerExcel6 = [
        //   "Periode Pinjaman ",
        //   this.debitAccount.Tenor ? ": " + this.debitAccount.Tenor : ": ",
        //   "",
        //   ""
        // ]
        // this.headerExcel7 = [
        //   "Kewajiban","","","","","Pembayaran","","","","","","Sisa Pembayaran","",""
        // ]

        this.setExcel[1].titles.push(
        {
          cels : 'B1',
          name : 'Kode Mitra Binaan',
          // mergeTo : 'B1',
          values : {
            cels : 'C1',
            name : this.debitAccount.DANumber ? "" + this.debitAccount.DANumber : ""
          }

        },
        {
          cels : 'B2',
          name : 'Nama Mitra Binaan',
          values : {
            cels : 'C2',
            name : this.debitor.FullName ? "" + this.debitor.FullName : ""
          }
        },
        {
          cels : 'B3',
          name : 'Alamat Mitra Binaan',
          values : {
            cels : 'C3',
            name : this.debitor.Address ? "" + this.debitor.Address : ""
          }
        },
        {
          cels : 'B4',
          name : 'Detail Jatuh Tempo',
          values : {
            cels : 'C4',
            name : detailBulanan
          }
        },
        {
          cels : 'B5',
          name : 'Jumlah Pinjaman',
          values : {
            cels : 'C5',
            name : this.debitAccount.DebValue  ? "" + this.formatCurrency(this.debitAccount.DebValue,'Rp.') : "Rp. 0"
          }
        },
        {
          cels : 'B6',
          name : 'Periode Pinjaman',
          values : {
            cels : 'C6',
            name : this.debitAccount.Tenor ? "" + this.debitAccount.Tenor : ": "
          }
        },
        // end row 1
        {
          cels : 'D1',
          name : 'Grace Period',
          values : {
            cels : 'E1',
            name : this.PKBussIncome.GracePeriod  ? "" + this.PKBussIncome.GracePeriod : "0"
          }
        },
        {
          cels : 'D2',
          name : 'Status Pinjaman',
          values : {
            cels : 'E2',
            name : this.debitAccountSummary.Status  ? "" + this.debitAccountSummary.Status : ""
          }
        },
        {
          cels : 'D3',
          name : 'Jasa Administrasi',
          values : {
            cels : 'E3',
            name : this.PKSurvey.AdministrationFee  ? "" + this.PKSurvey.AdministrationFee : ""
          }
        },
        {
          cels : 'D4',
          name : 'Tanggal Realisasi',
          values : {
            cels : 'E4',
            name : this.debitAccountSummary.FinalPaymentDate  ? "" + this.debitAccountSummary.FinalPaymentDate : ""
          }
        },
        {
          cels : 'D5',
          name : 'Tanggal Jatuh Tempo',
          values : {
            cels : 'E5',
            name : this.debitAccountSummary.FinalPaymentDate  ? "" + this.debitAccountSummary.FinalPaymentDate : ""
          }
        },
      )
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
                    advPay : this.CurrencyToNumber(loopData[i].advPay) ,
                    TransValue : this.CurrencyToNumber(loopData[i].TransValue) ,
                    PokokSisa : this.CurrencyToNumber(loopData[i].PokokSisa) ,
                    JasaSisa : this.CurrencyToNumber(loopData[i].JasaSisa) ,
                    TotalSisa : this.CurrencyToNumber(loopData[i].TotalSisa)
                  })

            this.DataArray.push(loopData[i])
             CurtSequence = loopData[i].Sequence
         }
          this.itemsExcel.push({
              Sequence : "Total",
              SettValue : this.CurrencyToNumber(this.totalSettValue) ,
              InterestVal : this.CurrencyToNumber(this.totalInterestVal),
              TotalBill : this.CurrencyToNumber(this.totalTotalBill),
              DueDate : "",
              TransNo : "",
              TransDate : "",
              TransSettValue : this.CurrencyToNumber(this.totalTransSettValue) ,
              Interest : this.CurrencyToNumber(this.totalInterest) ,
              advPay : this.CurrencyToNumber(this.totaladvPay) ,
              TransValue : this.CurrencyToNumber(this.totalTransValue) ,
              PokokSisa : "",
              JasaSisa : "",
              TotalSisa : ""
            })
         this.loading = false
    },
     showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
    async Diskon(){
      this.showModal()
    },
    async showModalKoreksi(data){
      console.log(data);
      if (data.TransNo != null) {
        this.koreksi.TransNo = data.TransNo
        this.koreksi.Description = data.Description
        this.koreksi.TransSettValue = data.TransSettValue
        this.koreksi.Interest = data.Interest

        console.log(this.koreksi);
        this.$root.$emit('bv::show::modal','modal-koreksi', '#btnShow')
      }else {
        alert('Pembayaran Tidak Bisa Di Koreksi')
      }
    },
    async koreksiPembayaran(){
      // this.buttonKoreksi = false
      console.log(this.buttonKoreksi);
      console.log(this.koreksi)
      // return
      var data =  await apiDebitAccount.koreksiPembayaran(this.koreksi)
      // var data =  {Status : true}
      if (data.Status) {
        var response = { Status:data.Status , Message: 'Operation success' }
        this.showNotif(response, 'Jurnal')
        this.kartuPiutang()
        this.$bvModal.hide('modal-koreksi')
        // this.$router.push('/pk/kartupiutang/'+this.$route.params.DACode+'/'+this.$route.params.Print)
        this.buttonKoreksi = true
      }else {
        var response = { Status:false , Message: 'Operation failed' }
        this.showNotif(response, 'Jurnal')
        this.buttonKoreksi = true
      }
    },
   async simpanDiskon(){
    var DACode = this.$route.params.DACode
     let SPPKDiskon = await apiInstSchedule.getSPPKDiskon(DACode.trim(),this.bulanDiskon)
      this.$router.push('/accounting/general-journal-form/'+SPPKDiskon.Data)
     console.log("DATASPPKDiskon",SPPKDiskon)
      this.showNotif(SPPKDiskon,'data')
     this.hideModal()
   }
  }
}
</script>
