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
          <strong>Form Pembayaran</strong>
        </div>
                    <b-row>
                        <b-col sm="12">
                            <b-card>
                              <b-row>
                                <b-col sm="2">
                                   <label for="ccnumber">Tanggal Aktif :
                                     <b class="text-danger"> *</b>
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="4">
                                    <date-picker v-model="debTransaction.TransDate" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                                    <!-- <b-form-input v-model="debTransaction.TransDate" type="date" required></b-form-input> -->
                                </b-col>
                                <!-- <b-col sm="4">
                                    <b-button type="button" size="md" variant="Light">Update</b-button>
                                </b-col> -->
                              </b-row>
                            </b-card>

                            <b-card>
                              <b-row style="margin-top:10px">
                                <b-col sm="2">
                                   <label for="ccnumber">No. Ref :
                                      <b class="text-danger"> *</b>
                                    </label>
                                </b-col>
                                <b-col sm="4">
                                    <b-form-input v-model="debitor.NoReference" type="text" required disabled></b-form-input>
                                </b-col>
                              </b-row>
                            </b-card>

                            <b-card>
                                <b-button v-b-toggle.collapse-1 variant="light">Input Data</b-button>
                                <b-collapse id="collapse-1" class="mt-2">
                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">No. Debitur :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <b-form-input v-model="debitor.DebCode" type="text" required disabled></b-form-input>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Nama :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <b-form-input v-model="debitor.FullName" type="text" required disabled></b-form-input>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Nama Usaha :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <b-form-input v-model="debitor.Instance" type="text" required disabled></b-form-input>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Kepada :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <b-form-input v-model="debTransaction.Receiver" type="text" required ></b-form-input>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Permintaan Bayar :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <b-form-input v-model="debTransaction.RequestToPay" type="text" required ></b-form-input>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Verifikasi :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <b-form-input v-model="debTransaction.Verification" type="text" required ></b-form-input>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Setuju Bayar :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <b-form-input v-model="debTransaction.Agreement" type="text" required ></b-form-input>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Jumlah Pembayaran :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="4">
                                          <!-- <b-form-input v-model="jml_pembayaraan" type="text" required></b-form-input> -->
                                          <money class="form-control" v-model="debTransaction.TransValue" v-bind="money" :disabled="isAktif"></money>
                                      </b-col>
                                    </b-row>

                                 <!--    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Pelunasan Dipercepat : -->
                                            <!-- <b class="text-danger"> *</b> -->
                                        <!--   </label>
                                      </b-col>
                                       <b-col sm="1">
                                          <b-form-radio v-model="pelunasan_cpt" name="persetujuan.Status" value="Tidak">Tidak</b-form-radio>
                                      </b-col>
                                      <b-col sm="1">
                                          <b-form-radio v-model="pelunasan_cpt" name="persetujuan.Status" value="Ya">Ya</b-form-radio>
                                      </b-col>
                                      <b-col sm="1" v-if="Cashback != 0">
                                          <label>(Diskon Jasa  : {{formatCurrency(Cashback)}})</label>
                                      </b-col>
                                    </b-row>
 -->
                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Debet :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="5">
                                           <!-- <b-form-select v-model="selected" :options="options_Debet"></b-form-select> -->
                                           <!-- <v-select v-model="debTransaction.BankCode" :options="BankItems" :reduce="Name => Name.Code" label="Name" size="5"></v-select> -->
                                           <v-select :options="BankItems" :reduce="name => name.code" label="name" required v-model="debTransaction.BankCode" />
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Kredit :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="6">
                                           <!-- <b-form-select v-model="selected2" :options="options_Kredit"></b-form-select> -->
                                           <!-- <v-select v-model="debTransaction.AccountSectCode" :options="accountSect" :reduce="Name => Name.Code" label="Name" size="5"></v-select> -->
                                           <!-- <input type="text" v-model="debTransaction.AccountSectName" class="form-control" disabled> -->
                                           <v-select :options="KreditItems" :reduce="name => name.code" label="name" required v-model="debTransaction.AccountSectName" />

                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                         <label for="ccnumber">Catatan :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="9">
                                        <b-form-textarea
                                         id="textarea"
                                         v-model="debTransaction.Description"
                                         placeholder="Catatan..."
                                         rows="3"
                                         max-rows="6" ></b-form-textarea>
                                      </b-col>
                                    </b-row>

                                    <b-row>
                                      <b-col sm="2" style="margin-top:20px">
                                         <label for="ccnumber">Bukti Pembayaran :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="3">
                                        <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
                                      </b-col>
                                      <b-col sm="3" style="margin-top:20px;color:grey;">
                                        <p>Max Size File Upload 2MB</p>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:30px">
                                      <b-col sm="6">
                                        <div class="form-group form-actions">
                                          <b-button type="submit" size="md" variant="primary" @click="savePembayaran()">Simpan</b-button>
                                          <b-button type="submit" size="md" variant="light">Batal</b-button>
                                        </div>
                                      </b-col>
                                    </b-row>
                                </b-collapse>
                            </b-card>

                            <b-card>
                                <b-button v-b-toggle.collapse-2 variant="light">Lihat Kartu Piutang</b-button><!-- <excel
                                  :items="itemsExcel"
                                  :header="headerExcel"
                                  sheetName="Kartu Piutang"
                                  filename="Kartu Piutang"> </excel> -->
                                <b-collapse id="collapse-2" class="mt-2">
                                  <b-table :items="DataArray" :fields="fields" class="table-responsive">
                                    <template slot="thead-top" slot-scope="data">
                                      <tr>
                                        <th class="text-center" colspan="5">Kewajiban</th>
                                        <th class="text-center" colspan="6">Pembayaran</th>
                                        <th class="text-center" colspan="4">Sisa Pembayaran</th>
                                      </tr>
                                    </template>
                                    <template slot="aksi" slot-scope="data">
                                      <b-button @click="showModalKoreksi(data.item)" variant="secondary" size="sm">
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
                                </b-collapse>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
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
 import moment from 'moment';
import excel from '../../components/BtnExcel';
import apiDebitor from '@/api/PK/DebitorApiService';
import apiDebitAccount from '@/api/PK/DebitAccountApiService';
import apiDebitorVenture from '@/api/PK/DebitorVentureApiService';
import apiDebTransaction from '@/api/PK/DebTransactionApiService';
import apiInstSchedule from '@/api/PK/InstScheduleApiService';
import apiPKSector from '@/api/PK/PKSectorApiService'
import apiAccount from '@/api/AKAccountApiService';
import apiAccountMapping from '@/api/AK/AccountMappingApiService';
export default {
  components: {
     excel
  },
  data() {
    return {
      cabangKP : 9900,
      loading:false,
      isAktif:false,
      configConfirm:null,
      textConfirm:null,
      cabang:null,
      Cashback : 0,
      DataArray : [],
      headerExcel:["Ke","Kewajiban Pokok","Kewajiban Jasa","Kewajiban Total","Jatuh Tempo","No Bukti","Tgl Bayar","Pembayaran Pokok","Pembayaran Jasa","Pembayaran Total","Adv Pay","Sisa Pembayaran Pokok","Sisa Pembayaran Jasa","Sisa Pembayaran Total"],
      itemsExcel:[],
      persetujuan:{
        Status: null
      },
      coba: {
        noBukti: "BUKTI01",
        InstSeq : 1,
        tglBayar: "2019-01-01",
        pokokBayar: 3000000,
        jasaBayar: 20000,
        payment: 0,
        totalbayar: 3200000
      },
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
        {
          key: 'aksi',
          label: 'Aksi'
        },
      ],
      file2:null,
      selected: null,
      debTransaction: {
        TransDate:null
      },
      debitor: {},
      selected2: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp. ',
        suffix: '',
        precision: 2,
        masked: false
      },
      pelunasan_cpt:null,
      BankItems: [],
      KreditItems: [],
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
        console.log("TTLSettValue",c.TTLSettValue)
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
  },
   watch:{
    // 'pelunasan_cpt': async function () {
    // console.log("DATA debTransaction",this.debTransaction.TransDate)
    //   var debTransaction = {}
    //   if(this.debTransaction.TransDate == null){
    //       this.pelunasan_cpt = "Tidak"
    //       alert("Harap isi tanggal pembayaran")
    //   }else{
    //     if(this.pelunasan_cpt == "Tidak"){
    //         this.debTransaction.TransValue = this.$route.params.Value
    //         this.isAktif = false
    //     }else{
    //        debTransaction.DACode = this.$route.params.DACode
    //           debTransaction.TransDate = this.debTransaction.TransDate
    //          this.savePembayaranDipercepat(debTransaction)
    //         this.isAktif = true
    //     }
    //   }
    //   console.log("Pelunasan Dipercepat",this.pelunasan_cpt)
    // },
   },
  async created() {
    this.loading = true
    this.cabang = localStorage.cabang
    this.koreksi.Verification = await this.getConfig("JOURNAL_PENYETUJU")
    this.koreksi.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
    console.log('cabang bro', this.cabang);
    console.log(this.$route.params.DACode);
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    var debitAccount = await apiDebitAccount.getOne(this.$route.params.DACode)
    var debitor = await apiDebitor.getOne(debitAccount.Data[0].DebCode)
    var debitorVenture = await apiDebitorVenture.getByDEBCode(debitAccount.Data[0].DebCode)
    var PKSector = await apiPKSector.getOne(debitorVenture.Data[0].BusinessSector)
    this.debTransaction.Verification = await this.getConfig("JOURNAL_PENYETUJU")
    this.debTransaction.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
    console.log("PKSector",PKSector);
    // var getBank = await apiAccount.getByTypeAndWorkareaISnull(6,this.getSession('cabang'))
    // for (var i = 0; i < getBank.length; i++) {
    //   this.BankItems.push({ code: getBank[i].Code, name:getBank[i].Code +" - "+ getBank[i].Name })
    //   console.log('akun',this.BankItems);
    // }

    var coaacrual = await this.getConfig("COA_ACCRUAL")
    var namaacrual = await this.getConfig("COA_ACCRUAL_NAME")
    var coanoname = await this.getConfig("COA_NO_NAME")
    var namanoname = await this.getConfig("COA_NONAME_NAME")
    if ((debitorVenture.Data[0].DistributionPattern == "Avalis") && (this.cabang == this.cabangKP )) {
      var getBank = await apiAccount.getByTypeWorkareaAndFlag('29,30',this.cabang)
      console.log('COA BANK ALVALIS',getBank);
      var avalis = await apiAccountMapping.getAccountByChnlCode(debitorVenture.Data[0].SynergyChannelId)
      console.log('ALVALIS',avalis);
      for (var i = 0; i < getBank.length; i++) {
        this.BankItems.push({ code: getBank[i].Code, name:getBank[i].Code +" - "+ getBank[i].Name })
      }
      this.BankItems.push({ code: avalis[0].Code, name:avalis[0].Code +" - "+ avalis[0].Name })
      this.BankItems.push({ code: coaacrual, name: coaacrual +" - "+ namaacrual })
      this.BankItems.push({ code: coanoname, name: coanoname +" - "+ namanoname })

      var getCredit = await apiAccount.getByTypeWorkareaAndFlag(29,this.cabang)
      console.log('COA CREDIT ALVALIS',getCredit);
      for (var i = 0; i < getCredit.length; i++) {
        this.KreditItems.push({ code: getCredit[i].Code, name:getCredit[i].Code +" - "+ getCredit[i].Name })
      }
      this.KreditItems.push({ code: avalis[0].Code, name:avalis[0].Code +" - "+ avalis[0].Name })
    }else {
      var getBank = await apiAccount.getByTypeWorkareaAndFlag('29,30',this.cabang)
      console.log('COA BANK PERSORANGAN',getBank);
      var persorangan = await apiAccount.getCodeOnly('11.36'+PKSector[0].SectorCode+PKSector[0].SectorCode)
      console.log('PERSORANGAN',persorangan);
      for (var i = 0; i < getBank.length; i++) {
        this.BankItems.push({ code: getBank[i].Code, name:getBank[i].Code +" - "+ getBank[i].Name })
      }
      this.BankItems.push({ code: persorangan[0].Code, name:persorangan[0].Code +" - "+ persorangan[0].Name })
      this.BankItems.push({ code: coaacrual, name: coaacrual +" - "+ namaacrual })
      this.BankItems.push({ code: coanoname, name: coanoname +" - "+ namanoname })

      var getCredit = await apiAccount.getByTypeWorkareaAndFlag(29,this.cabang)
      console.log('COA CREDIT PERSORANGAN',getCredit);
      for (var i = 0; i < getCredit.length; i++) {
        this.KreditItems.push({ code: getCredit[i].Code, name:getCredit[i].Code +" - "+ getCredit[i].Name })
      }
      this.KreditItems.push({ code: persorangan[0].Code, name:persorangan[0].Code +" - "+ persorangan[0].Name })
    }

    // var getAccount = await apiAccount.getCodeOnly('11.36'+PKSector[0].SectorCode+PKSector[0].SectorCode)
    var getAccount;
    if (debitorVenture.Data[0].DistributionPattern == "Avalis") {
        getAccount = await apiAccountMapping.getAccountByChnlCode(debitorVenture.Data[0].SynergyChannelId)
    } else {
        getAccount = await apiAccount.getCodeOnly('11.36'+PKSector[0].SectorCode+PKSector[0].SectorCode)
    }

    this.debitor = debitor.Data[0]
    if(debitAccount.Data[0].DANumber){
      this.debitor.DebCode = debitAccount.Data[0].DANumber
    }
    if(debitor.Data[0].FullName){
      this.debTransaction.Receiver = debitor.Data[0].FullName
    }
    // this.BankItems = getBank
    this.accountSect = getAccount

    this.debTransaction.AccountSectCode = getAccount[0].Code
    console.log(this.debTransaction.AccountSectCode);
    this.debTransaction.AccountSectName = getAccount[0].Name
    this.debTransaction.Description = "Pembayaran Atas Nama "+ debitor.Data[0].FullName +
    " Dengan Nomor Mitra Binaan "+ debitAccount.Data[0].DANumber
    this.debTransaction.TransValue = this.$route.params.Value
    this.debTransaction.SectorCode = PKSector[0].SectorCode

    await this.kartuPiutang()
    this.loading = false
    // this.id = this.$route.params.id;
    // if (this.id != null) {
    //   this.data = await api.getOne(this.id)
    //   this.model = this.data[0]
    //   this.preview()
    // }

  },
  methods: {
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

      var response = { Status:data.Status, Message: data.Message }
      this.showNotif(response, 'Jurnal')
      this.buttonKoreksi = true

      if (data.Status) {
        this.$router.push('pk/pembayaran/'+this.$route.params.DACode+'/'+this.$route.params.value)
      }
    },

    async savePembayaran() {
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
         .then(async (value) => {
            if(value){
               this.loading = true
              this.debTransaction.DACode = this.$route.params.DACode
              // let SPPKDiskon = 0;
              // if(this.pelunasan_cpt == "Ya"){
              //   SPPKDiskon = await apiInstSchedule.getSPPKDiskon(this.debTransaction)
              // }
              // console.log("DISKON JASA",this.debTransaction);
              // if(this.pelunasan_cpt  == "Ya"){
              //   if(SPPKDiskon.Data > 0){
              //       var response = await apiDebTransaction.createPembayaran(this.debTransaction)
              //      this.$router.push('/accounting/general-journal-form/'+SPPKDiskon.Data)
              //      console.log("DATASPPKDiskon",SPPKDiskon)
              //       this.showNotif(SPPKDiskon,'data')
              //     }else{
              //       this.showNotifFailed()
              //       this.$router.push('/monitor/inst-schedule')
              //       console.log(response);
              //     }
              // }else{
                  var response = await apiDebTransaction.createPembayaran(this.debTransaction)
                  console.log("RESPONSE PESANAN",response.Data)
                  this.loading = false
                  if(response.Data == -1){
                    this.showNotifFailed()
                  }else if(response.Data == -2){
                    this.showNotifWarning("Data Sedang Diproses")
                  }else{
                    this.showNotifSuccess()
                  }
                  // this.showNotif(response, 'Pembayaran')
                  this.$router.push('/monitor/inst-schedule')
                  console.log(response);
              // }
            }
         })
         .catch(err => {
          // An error occurred
         })

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

            this.DataArray.push(loopData[i])
             CurtSequence = loopData[i].Sequence
         }
         this.loading = false
    },
  }
}
</script>
