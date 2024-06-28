
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
          <strong>Jurnal Accrual</strong>
        </div>

      <!--   <b-row>
          <b-col sm="2" offset-sm="11">
            <div class="form-group form-actions">
              <router-link :to="{ name: 'Jurnal Kas Bank Form' }">
                <b-button size="md" variant="primary">Tambah</b-button>
              </router-link>
            </div>
          </b-col>
        </b-row> -->

        <b-row>
            <b-col sm="2">
                <label for="ccnumber">No. Bukti (Oprasional):
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                 <b-form-input v-model="filter" placeholder=""></b-form-input>
            </b-col>
            <b-col sm="3">
                <label for="ccnumber">Dari: &nbsp;&nbsp;&nbsp;
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                  <date-picker v-model="dari" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                <!-- <b-form-input v-model="dari" type="date" required></b-form-input> -->
            </b-col>
            <b-col sm="3">
                <label for="ccnumber">Hingga:
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                  <date-picker v-model="hingga" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                <!-- <b-form-input v-model="hingga" type="date" required></b-form-input> -->
            </b-col>
             <b-col sm="2">
              <label for="inputEmail4">Cabang</label>
              <b-form-select v-model="filterCabang" :options="options_cabang"></b-form-select>
            </b-col>
            <b-col sm="2">
                <label for="ccnumber">Program:
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                <b-form-select v-model="JournalTypeId" :options="options_Program"></b-form-select>
            </b-col>
            <!-- <b-col sm="3">
                <label for="ccnumber">Program:
                   <b class="text-danger"> *</b>
                 </label>
                <b-form-select v-model="selected" :options="options_Program"></b-form-select>
            </b-col> -->
        </b-row><br>
     	<b-tabs>
            <b-tab active>
              <template slot="title">
                {{tabs[0]}}
              </template>
              <b-row>
                <b-col md="6" class="my-1">
                  <btnExcel :items="itemsExcelBA" :settingExcel="setExcelBA" :header="headerExcel" style="float:left;" sheetName="Jurnal Accrual (Belum Accrual)" filename="Jurnal Accrual (Belum Accrual)"></btnExcel>
                </b-col>
              </b-row>
               <b-row style="padding-top:10px;">
		          <b-col sm="12">
		            <b-table
		            :fields="fields"
		            caption=""
                :sort-compare="sortDateTable"
		            :per-page="perPage"
		            :current-page="currentPage"
		            :items="items"
		            :filter="filter"
		             @filtered="onFiltered">
		              <template slot="action" slot-scope="data">
		                 <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->

		                 <router-link :to="{ name: 'Jurnal Accrual Form', params: { status: 'detail',id: data.item.Jrn_ID } }">
		                   <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
		                 </router-link>
		                 <i v-if="data.item.IsRevert == 0" @click="showModalKoreksi(data.item,'SPAKJurnalAccrualBelumKoreksi')" class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Koreksi Jurnal"></i>
		                  <router-link :to="{ name: 'Proses Jurnal Accrual', params: { idAcc: data.item.JrnAccrualID, type: data.item.JournalTypeId }}">
		                 	<i class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Bayar Accrual"></i>
		                 </router-link>
                      <router-link :to="{ name: 'Jurnal Accrual Form', params: { status: 'edit', id: data.item.Jrn_ID} }">
                         <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                       </router-link>
		                 <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID, name : 'Bukti Kas Bank' } }">
		                   <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Jurnal"></i>
		                 </router-link>
		              </template>
		            </b-table>
		            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="tambah_tidaksetujuPK"></b-pagination>
		          </b-col>
		        </b-row>
          	</b-tab>
          	<b-tab>
              <template slot="title">
                {{tabs[1]}}
              </template>
              <b-row>
                <b-col md="6" class="my-1">
                  <btnExcel :items="itemsExcelSK" :settingExcel="setExcelSK" :header="headerExcel" style="float:left;" sheetName="Jurnal Accrual (Sudah Koreksi)" filename="Jurnal Accrual (Sudah Koreksi)"></btnExcel>
                </b-col>
              </b-row>
              <b-row style="padding-top:10px;">
		          <b-col sm="12">
		            <b-table
		            :fields="fields"
		            caption=""
                :sort-compare="sortDateTable"
		            :per-page="perPageSudahKoreksi"
		            :current-page="currentPageSudahKoreksi"
		            :items="itemsSudahKoreksi"
		            :filter="filter"
		             @filtered="onFiltered">
		              <template slot="action" slot-scope="data">
		                 <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->

		                 <router-link :to="{ name: 'Jurnal Accrual Form', params: { status: 'detail',id: data.item.Jrn_ID } }">
		                   <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
		                 </router-link>
                      <router-link :to="{ name: 'Jurnal Accrual Form', params: { status: 'edit', id: data.item.Jrn_ID} }">
                         <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                       </router-link>
		                 <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID, name : 'Bukti Kas Bank' } }">
		                   <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Jurnal"></i>
		                 </router-link>
		              </template>
		            </b-table>
		            <b-pagination v-model="currentPageSudahKoreksi" :total-rows="rowsSudahKoreksi" :per-page="perPageSudahKoreksi" aria-controls="tambah_tidaksetujuPK"></b-pagination>
		          </b-col>
		        </b-row>
          	</b-tab>
          	<b-tab>
              <template slot="title">
                {{tabs[2]}}
              </template>
              <b-row>
                <b-col md="6" class="my-1">
                  <btnExcel :items="itemsExcelHA" :settingExcel="setExcelHA" :header="headerExcel" style="float:left;" sheetName="Jurnal Accrual (Hasil Accrual)" filename="Jurnal Accrual (Hasil Accrual)"></btnExcel>
                </b-col>
              </b-row>
              <b-row style="padding-top:10px;">
		          <b-col sm="12">
		            <b-table
		            :fields="fields"
		            caption=""
                :sort-compare="sortDateTable"
		            :per-page="perPageSudahAccrual"
		            :current-page="currentPageSudahAccrual"
		            :items="itemsSudahAccrual"
		            :filter="filter"
		             @filtered="onFiltered">
		              <template slot="action" slot-scope="data">
		                 <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->

		                 <router-link :to="{ name: 'Jurnal Accrual Form', params: { status: 'detail', id: data.item.PaymentJrn_ID } }">
		                   <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
		                 </router-link>
                     <i v-if="data.item.IsRevert == 0" @click="showModalKoreksi(data.item,'SPAKJurnalAccrualHasilKoreksi')" class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Koreksi Jurnal"></i>
                      <router-link :to="{ name: 'Jurnal Accrual Form', params: { status: 'edit', id: data.item.PaymentJrn_ID} }">
                         <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                       </router-link>
		                 <router-link :to="{ name: 'Print Bukti', params: { id: data.item.PaymentJrn_ID, name : 'Bukti Kas Bank' } }">
		                   <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Jurnal"></i>
		                 </router-link>
		              </template>
		            </b-table>
		            <b-pagination v-model="currentPageSudahAccrual" :total-rows="rowsSudahAccrual" :per-page="perPageSudahAccrual" aria-controls="tambah_tidaksetujuPK"></b-pagination>
		          </b-col>
		        </b-row>
          	</b-tab>
      	</b-tabs>
        <!-- <b-row style="padding-top:10px;">
          <b-col sm="12">
            <c-table :table-data="items" :fields="fields" caption="" custom="newSlot">
              <template slot-scope="{ action }">
                <router-link :to="{ name: 'Jurnal Kas Bank Form', params: { id: action.Jrn_ID } }">
                  <i class="fa fa-eye fa-md text-default button-icon"></i>
                </router-link>
                <router-link :to="{ name: 'Jurnal Kas Bank Form', params: { id: action.Jrn_ID } }">
                  <i class="fa fa-pencil fa-md text-default button-icon"></i>
                </router-link>
              </template>
            </c-table>
          </b-col>
        </b-row> -->
      </b-card>
    </b-col>
  </b-row>
     <!-- Modal Component -->
     <b-modal id="modal-koreksi" title="Koreksi" hide-footer>

       <p>Anda yakin ingin mengkoreksi jurnal Dengan <br>
         Nomor : {{ koreksi.JournalNumber }} {{ koreksi.Jrn_ID }}<br>
         Deskripsi : {{ koreksi.Description }} <br><br><br></p>
         <form @submit.prevent="Koreksi(koreksi.Jrn_ID)">

           <b-row>
             <b-col><label class="mr-sm-2" for="#">Tanggal Koreksi</label></b-col>
             <b-col>
               <date-picker v-model="koreksi.TanggalKoreksi" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
               <!-- <b-input class="mb-2 mb-sm-0" v-model="koreksi.TanggalKoreksi" type="date" id="#" placeholder="" required/> -->
             </b-col>
           </b-row>
           <br>
           <b-row>
             <b-col><label class="mr-sm-2" for="#">Kepada</label></b-col>
             <b-col><b-input class="mb-2 mb-sm-0" v-model="koreksi.Receiver" type="text" id="#"  required/></b-col>
           </b-row>
           <br>

           <b-row>
             <b-col><label class="mr-sm-2" for="#">Jenis Pembayaran</label></b-col>
             <b-col><v-select :options="options_PaymentType" required v-model="koreksi.PaymentType" /></b-col>
           </b-row>
           <br>

           <b-row>
             <b-col><label class="mr-sm-2" for="#">Permintaan Bayar</label></b-col>
             <b-col><b-input class="mb-2 mb-sm-0" v-model="koreksi.RequestToPay" type="text" id="#"  required/></b-col>
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
  shuffleArray
} from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import apiAccount from '@/api/AKAccountApiService';
import apiJournal from '@/api/AKJournalApiService';
import apiJournalAccrual from '@/api/AKJournalAccrualApiService';
import apiJournalItem from '@/api/AKJournalItemApiService';
  import moment from '../../../../node_modules/moment/moment'
import apiWorkArea1 from '@/api/WorkArea1ApiService'
import apiPaymentType from '@/api/PaymentTypeApiService';
import BtnExcel from '@/components/Excel'

// const someData = () => await api.getAll()

export default {
  name: 'GeneralJournal',
  components: {
    cTable,BtnExcel
  },
  data() {
    return {
      loading:false,
      buttonKoreksi: true,
      cabangKP:9900,
      cabang:null,
      filter:null,
      configConfirm:null,
      textConfirm:null,
      buttonKoreksi: true,
      filterCabang:null,
      options_cabang:[],
       headerExcel : ['No','Nomor Jurnal','Nama','Tanggal Jurnal','Deskripsi','Nilai Realisasi'],
      itemsExcelBA : [],
      itemsExcelSK : [],
      itemsExcelHA : [],
      setExcelBA : [
        {
          Cell : ['A','B','C','D','E','F']
        },
        {
          titles : []
        },
        {
          mergeTo : "E"
        },
        {
          origin : "A6"
        }
      ],
      setExcelSK : [
        {
          Cell : ['A','B','C','D','E','F']
        },
        {
          titles : []
        },
        {
          mergeTo : "E"
        },
        {
          origin : "A6"
        }
      ],
      setExcelHA : [
        {
          Cell : ['A','B','C','D','E','F']
        },
        {
          titles : []
        },
        {
          mergeTo : "E"
        },
        {
          origin : "A6"
        }
      ],
      items: [],
      itemsSudahAccrual: [],
      itemsSudahKoreksi: [],
      itemsArrayBA: null,
      itemsArraySK: null,
      itemsArrayHA: null,
      tabIndex: [0, 0],
      tabs: [
        'Belum Accrual',
        'Sudah Koreksi',
        'Hasil Accrual',
      ],
      fields: [{
          key: 'JournalNumber',
          label: 'Nomor Jurnal',
          sortable: true
        },
        {
          key: 'Receiver',
          label: 'Nama',
        },
        {
          key: 'JournalDate',
          label: 'Tanggal Jurnal',
          sortable: true
        },
        {
          key: 'Description',
          label: 'Deskripsi',
        },
        {
          key: 'ItemValue',
          label: 'Nilai Realisasi',
          tdClass: 'positionRight'
        },
        {
          key: 'action',
          label: 'aksi'
        }
      ],
      rows: null,
      rowsSudahKoreksi: null,
      rowsSudahAccrual: null,
      dari:null,
      hingga:null,
      perPage: 10,
      currentPage: 1,
      perPageSudahAccrual: 10,
      currentPageSudahAccrual: 1,
      perPageSudahKoreksi: 10,
      currentPageSudahKoreksi: 1,
      koreksi:{
        JournalNumber:"",
        Description:"",
        Verification: null,
        Agreement: null,
        Type: null
      },
      options_Program: [
        { text: 'Program PK', value: 6 },
        { text: 'Program BL', value: 7 },
        { text: 'Program PKBL', value: '6,7,8' }
      ],
      JournalTypeId:'',
      options_PaymentType: [],

    }
  },
  async created() {
  	this.loading = true
    this.cabang = localStorage.cabang
    // this.filterCabang = this.cabang
    //  this.JournalTypeId = '6,7,8'
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.getCabang()
    // this.getAll()
    this.loading = false
  },
  watch:{
   'dari': async function () {
     // console.log(this.dari);
     this.getAll(this.dari)
   },
   'hingga': async function (){
     this.getAll(this.dari,this.hingga)
   },
  'filterCabang': async function (){
     this.getAll(this.dari,this.hingga)
   },
   'JournalTypeId': async function (){
     this.getAll(this.dari,this.hingga)
   }
  },
  methods: {
    async getAll(dari = null, hingga = null) {
      this.loading = true
      console.log(dari,hingga);
      try {
       await this.getBelumAccrual(dari, hingga)
       await this.getSudahKoreksi(dari, hingga)
       await this.getSudahAccrual(dari, hingga)
      } finally {
        this.loading = false
      }
    },
    async getBelumAccrual(dari = null, hingga = null){
    	// if (this.JournalTypeId  == '8') {
     //      this.JournalTypeId += ',6,7'
     //    }
      var workarea = await apiWorkArea1.getByCode(this.filterCabang)
         var WAName = "Semua"
         if(workarea[0]){
           if(workarea[0].Name){
             WAName = workarea[0].Name
           }
         }
        var dataTable = await apiJournalAccrual.getAllTable(this.JournalTypeId,0,this.filterCabang,dari,hingga)
        if (dataTable) {
          this.itemsExcelBA = []
          this.setExcelBA[1].titles = []
          var totalBA = 0
          for (var i = 0; i < dataTable.length; i++) {
            dataTable[i].No = i+1
            dataTable[i].id = dataTable[i].Jrn_ID
            // totalBA += dataTable[i].ItemValue
            dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
           if( dataTable[i].IsRevert == 2){
              totalBA += this.ConvertMinus(dataTable[i].ItemValue)
              dataTable[i].ItemValue = this.formatCurrency(this.ConvertMinus(dataTable[i].ItemValue))
           }else{
               totalBA += dataTable[i].ItemValue
              dataTable[i].ItemValue = this.formatCurrency(dataTable[i].ItemValue)
           }
            // dataTable[i].ItemValue = this.formatCurrency( dataTable[i].ItemValue)
            this.itemsExcelBA.push({
              No : dataTable[i].No,
              JournalNumber : dataTable[i].JournalNumber,
              Pic : dataTable[i].Receiver,
              JournalDate : dataTable[i].JournalDate,
              Description : dataTable[i].Description,
              ItemValue : this.CurrencyToNumber(dataTable[i].ItemValue),
            })
          }
        }

        this.items = dataTable
        this.setExcelBA[1].titles.push(
         {
           cels : 'A1',
           name : 'Jurnal Accrual (Belum Accrual)'
         },
         {
           cels : 'A2',
           name : 'Region ' + WAName
         },
         {
           cels : 'A3',
           name : "Periode "+ this.formatDateDMY(this.dari) + " Sampai " + this.formatDateDMY(this.hingga),
         },
         )
         this.itemsExcelBA.push({
              No : "Total Keseluruhan",
              JournalNumber : "",
              Pic : "",
              JournalDate : "",
              Description : "",
              ItemValue : this.CurrencyToNumber(totalBA),
            })

        this.rows = this.items.length
        this.itemsArrayBA = () => this.items
        console.log(this.items)
        this.koreksi.Verification = await this.getConfig("JOURNAL_PENYETUJU")
        this.koreksi.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
    },
    async getSudahKoreksi(dari = null, hingga = null){
    	// if (this.JournalTypeId  == '8') {
     //      this.JournalTypeId += ',6,7'
     //    }
      var workarea = await apiWorkArea1.getByCode(this.filterCabang)
         var WAName = "Semua"
         if(workarea[0]){
           if(workarea[0].Name){
             WAName = workarea[0].Name
           }
         }
        var dataTable = await apiJournalAccrual.getAllTable(this.JournalTypeId,1,this.filterCabang,dari,hingga)
        if (dataTable) {
          this.itemsExcelSK = []
          this.setExcelSK[1].titles = []
          var totalSK = 0
          for (var i = 0; i < dataTable.length; i++) {
            dataTable[i].No = i+1
            dataTable[i].id = dataTable[i].Jrn_ID
            // totalSK += dataTable[i].ItemValue
            dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
            if( dataTable[i].IsRevert == 2){
              totalSK += this.ConvertMinus(dataTable[i].ItemValue)
              dataTable[i].ItemValue = this.formatCurrency(this.ConvertMinus(dataTable[i].ItemValue))
           }else{
               totalSK += dataTable[i].ItemValue
              dataTable[i].ItemValue = this.formatCurrency(dataTable[i].ItemValue)
           }
            // dataTable[i].ItemValue = this.formatCurrency( dataTable[i].ItemValue)
            this.itemsExcelSK.push({
              No : dataTable[i].No,
              JournalNumber : dataTable[i].JournalNumber,
              Pic : dataTable[i].Receiver,
              JournalDate : dataTable[i].JournalDate,
              Description : dataTable[i].Description,
              ItemValue : this.CurrencyToNumber(dataTable[i].ItemValue),
            })
          }
        }

        this.itemsSudahKoreksi = dataTable
        this.setExcelSK[1].titles.push(
         {
           cels : 'A1',
           name : 'Jurnal Accrual (Sudah Koreksi)'
         },
         {
           cels : 'A2',
           name : 'Region ' + WAName
         },
         {
           cels : 'A3',
           name : "Periode "+ this.formatDateDMY(this.dari) + " Sampai " + this.formatDateDMY(this.hingga),
         },
         )
         this.itemsExcelSK.push({
              No : "Total Keseluruhan",
              JournalNumber : "",
              Pic : "",
              JournalDate : "",
              Description : "",
              ItemValue : this.CurrencyToNumber(totalSK),
            })
        this.rowsSudahKoreksi = this.itemsSudahKoreksi.length
        this.itemsArraySK = () => this.itemsSudahAccrual
        console.log(this.itemsSudahAccrual)
    },
    async getSudahAccrual(dari = null, hingga = null){
    	// if (this.JournalTypeId  == '8') {
     //      this.JournalTypeId += ',6,7'
     //    }
      var workarea = await apiWorkArea1.getByCode(this.filterCabang)
         var WAName = "Semua"
         if(workarea[0]){
           if(workarea[0].Name){
             WAName = workarea[0].Name
           }
         }
        var dataTable = await apiJournalAccrual.getAllTable(this.JournalTypeId,2,this.filterCabang,dari,hingga)
        if (dataTable) {
          this.itemsExcelHA = []
          this.setExcelHA[1].titles = []
          var totalHA = 0
          for (var i = 0; i < dataTable.length; i++) {
            dataTable[i].No = i+1
            dataTable[i].id = dataTable[i].Jrn_ID
            // totalHA += dataTable[i].ItemValue
            dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
            if(dataTable[i].IsRevert == 2){
              totalHA += this.ConvertMinus(dataTable[i].ItemValue)
              dataTable[i].ItemValue = this.formatCurrency(this.ConvertMinus(dataTable[i].ItemValue))
           }else{
               totalHA += dataTable[i].ItemValue
              dataTable[i].ItemValue = this.formatCurrency(dataTable[i].ItemValue)
           }
            // dataTable[i].ItemValue = this.formatCurrency( dataTable[i].ItemValue)
            this.itemsExcelHA.push({
              No : dataTable[i].No,
              JournalNumber : dataTable[i].JournalNumber,
              Pic : dataTable[i].Receiver,
              JournalDate : dataTable[i].JournalDate,
              Description : dataTable[i].Description,
              ItemValue : this.CurrencyToNumber(dataTable[i].ItemValue),
            })
          }
        }

        this.itemsSudahAccrual = dataTable
        this.setExcelHA[1].titles.push(
         {
           cels : 'A1',
           name : 'Jurnal Accrual (Hasil Accrual)'
         },
         {
           cels : 'A2',
           name : 'Region ' + WAName
         },
         {
           cels : 'A3',
           name : "Periode "+ this.formatDateDMY(this.dari) + " Sampai " + this.formatDateDMY(this.hingga),
         },
         )
         this.itemsExcelHA.push({
              No : "Total Keseluruhan",
              JournalNumber : "",
              Pic : "",
              JournalDate : "",
              Description : "",
              ItemValue : this.CurrencyToNumber(totalHA),
            })
        this.rowsSudahAccrual = this.itemsSudahAccrual.length
        this.itemsArrayHA = () => this.itemsSudahAccrual
        console.log(this.itemsSudahAccrual)
        this.PaymentType = await apiPaymentType.getComboBoxAll()
        this.options_PaymentType = [];
    },
    async showModalKoreksi(data,Type){
      console.log(data);
      console.log(this.koreksi);
      if (data.IsRevert == 0) {
        this.options_PaymentType = []
        if (data.JournalTypeId == 6) {
          for (var i = 0; i < this.PaymentType.length; i++) {
            if ((this.PaymentType[i].Jprog == 1) || (this.PaymentType[i].Jprog == 0)) {
              console.log(this.PaymentType[i].Jprog);

              this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
            }
          }
        }else if (data.JournalTypeId == 7) {
          for (var i = 0; i < this.PaymentType.length; i++) {
            if ((this.PaymentType[i].Jprog == 2) || (this.PaymentType[i].Jprog == 0)) {
              this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
            }
          }
        }else {
          for (var i = 0; i < this.PaymentType.length; i++) {
              this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
          }
        }
        // this.koreksi = {}
         if(Type == 'SPAKJurnalAccrualBelumKoreksi'){
          this.koreksi.Jrn_ID = data.Jrn_ID
        }else if(Type == 'SPAKJurnalAccrualHasilKoreksi'){
          this.koreksi.Jrn_ID = data.PaymentJrn_ID
        }
        this.koreksi.JournalNumber = data.JournalNumber
        this.koreksi.Description = data.Description
        this.koreksi.Type = Type
        this.$root.$emit('bv::show::modal','modal-koreksi', '#btnShow')
      }else {
        alert('Jurnal Tidak Bisa Di Koreksi')
      }

    },
    async Koreksi(JrnID){
    	 this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
         .then(async (value) => {
            if(value){
              this.buttonKoreksi = false
              console.log(JrnID,this.koreksi.TanggalKoreksi);
              console.log(this.buttonKoreksi);
              this.koreksi.PaymentTypeId = this.koreksi.PaymentType.value
              console.log(this.koreksi)
              // return
              if(this.koreksi.Type == 'SPAKJurnalAccrualBelumKoreksi'){
                var data =  await apiJournal.insertKoreksiAccrual(JrnID,this.koreksi.TanggalKoreksi,this.koreksi.Type,this.koreksi)
              }else if(this.koreksi.Type == 'SPAKJurnalAccrualHasilKoreksi'){
                var data =  await apiJournal.insertKoreksiAccrual(JrnID,this.koreksi.TanggalKoreksi,this.koreksi.Type,this.koreksi)
              }
              if (data.Status) {
                var response = { Status:data.Status , Message: 'Operation success' }
                this.showNotif(response, 'Jurnal')
                this.$router.push('/accounting/general-journal-form/'+data.Data)
                this.buttonKoreksi = true
              }else {
                var response = { Status:false , Message: 'Operation failed' }
                this.showNotif(response, 'Jurnal')
                this.buttonKoreksi = true
              }
      		}
         })
         .catch(err => {
          // An error occurred
         })
    },
     async getCabang(){
      var workarea = null
      if(this.cabang != this.cabangKP){
       workarea = await apiWorkArea1.getByCode(this.cabang)
       console.log("CABANG",workarea)
       this.options_cabang = [{text: workarea[0].Name,value:workarea[0].Code}]
       // this.options_cabang.push({text: workarea[0].Name,value:workarea[0].Code})
      }else{
        var workarea = await apiWorkArea1.getComboBoxAll()
        this.options_cabang = [{text:"--- Semua ---",value:null}]
        for (var i = 0; i < workarea.length; i++) {
          var data =  workarea[i]
          this.options_cabang.push({text: data.Name,value:data.Code})
        }
      }
      console.log("cabang",workarea)
    },
    onFiltered(filteredItems) {
      this.rows = filteredItems.length
      this.currentPage = 1
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
</style>
