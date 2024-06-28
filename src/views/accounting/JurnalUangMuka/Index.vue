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
          <strong>Jurnal Uang Muka</strong>
        </div>

        <b-row>
          <b-col sm="2" offset-sm="11">
            <div class="form-group form-actions">
              <router-link :to="{ name: 'Jurnal Uang Muka Form' }">
                <b-button size="md" variant="primary">Tambah</b-button>
              </router-link>
            </div>
          </b-col>
        </b-row>

        <b-row>
            <b-col sm="2">
                <label for="ccnumber">No. Bukti (Oprasional):
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                 <b-form-input v-model="filter" placeholder=""></b-form-input>
            </b-col>
            <b-col sm="3">
                <label for="ccnumber">Dari:
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
              <br><br><br><br>

            <!-- <b-col sm="3">
                <label for="ccnumber">Program:
                   <b class="text-danger"> *</b>
                 </label>
                <b-form-select v-model="selected" :options="options_Program"></b-form-select>
            </b-col> -->
        </b-row>
          <b-tabs>
            <b-tab active>
              <template slot="title">
                {{tabs[0]}}
              </template>
              <b-row>
                <b-col md="6" class="my-1">
                  <btnExcel :items="itemsExcelBUMK" :settingExcel="setExcelBUMK" :header="headerExcel" style="float:left;" sheetName="Jurnal Uang Muka (Belum Dipertanggungjawabkan)" filename="Jurnal Uang Muka (Belum Dipertanggungjawabkan)"></btnExcel>
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
                       <router-link :to="{ name: 'Jurnal Uang Muka Form', params: { status: 'detail', id: data.item.Jrn_ID,DACode:data.item.DACode } }">
                         <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
                       </router-link>
                        <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID, name: 'Bukti Kas Uang Muka' } }" >
                         <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Bukti UMK"></i>
                       </router-link>
                       <router-link  v-if="data.item.IsRevert == 0" :to="{ name: 'Jurnal Panjar Form', params: { DebCode: data.item.DebCode,Jrn_ID: data.item.Jrn_ID,JrnUM: data.item.JrnUM,AccountCode: data.item.AccountCode,DACode: data.item.DACode,DANumber: data.item.DANumber,Type:data.item.JournalTypeId } }">
                        <!-- <i class="fas fa-clipboard-check"></i> -->
                         <i class="fa  fa-clipboard fa-md text-default button-icon" v-b-tooltip.hover title="Buat Pertanggungjawaban Uang Muka"></i>
                       </router-link>
                       <router-link :to="{ name: 'Jurnal Uang Muka Form', params: { status: 'edit', id: data.item.Jrn_ID,DACode:data.item.DACode } }">
                         <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                       </router-link>
                       <i v-if="data.item.IsRevert == 0" @click="showModalKoreksi(data.item,0)" class="fa fa-pencil fa-md text-default button-icon"  v-b-tooltip.hover title="Koreksi Jurnal"></i>
                       <!-- <i @click="Koreksi(data.item.Jrn_ID)" class="fa fa-pencil fa-md text-default button-icon"></i> -->

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
                  <btnExcel :items="itemsExcelSUMK" :settingExcel="setExcelSUMK" :header="headerExcel" style="float:left;" sheetName="Jurnal Uang Muka (Sudah Dipertanggungjawabkan)" filename="Jurnal Uang Muka (Sudah Dipertanggungjawabkan)"></btnExcel>
                </b-col>
              </b-row>
              <b-row style="padding-top:10px;">
                <b-col sm="12">
                  <b-table
                  :fields="fields"
                  caption=""
                  :sort-compare="sortDateTable"
                  :per-page="perPageSudah"
                  :current-page="currentPageSudah"
                  :items="itemsSudah"
                  :filter="filter"
                   @filtered="onFiltered">
                    <template slot="action" slot-scope="data">
                       <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->
                       <router-link :to="{ name: 'Jurnal Uang Muka Form', params: { status: 'detail',id: data.item.Jrn_ID,DACode:data.item.DACode } }">
                         <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
                       </router-link>
                        <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID, name: 'Bukti Uang Muka' } }" >
                         <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Bukti UMK"></i>
                       </router-link>
                       <router-link :to="{ name: 'Jurnal Uang Muka Form', params: { status: 'edit', id: data.item.Jrn_ID,DACode:data.item.DACode } }">
                         <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                       </router-link>
                       <!-- <i @click="showModalKoreksi(data.item)" class="fa fa-pencil fa-md text-default button-icon"></i> -->
                      <!--  <i v-if="data.item.IsRevert == 0" @click="showModalKoreksi(data.item,1)" class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Koreksi Jurnal"></i> -->

                    </template>
                  </b-table>
                  <b-pagination v-model="currentPageSudah" :total-rows="rowsSudah" :per-page="perPageSudah" aria-controls="tambah_tidaksetujuPK"></b-pagination>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab>
              <template slot="title">
                {{tabs[2]}}
              </template>
              <b-row>
                <b-col md="6" class="my-1">
                  <btnExcel :items="itemsExcelHUMK" :settingExcel="setExcelHUMK" :header="headerExcel" style="float:left;" sheetName="Jurnal Uang Muka (Hasil Dipertanggungjawabkan)" filename="Jurnal Uang Muka (Hasil Dipertanggungjawabkan)"></btnExcel>
                </b-col>
              </b-row>
              <b-row style="padding-top:10px;">
                <b-col sm="12">
                  <b-table
                  :fields="fields"
                  caption=""
                  :sort-compare="sortDateTable"
                  :per-page="perPageSelesai"
                  :current-page="currentPageSelesai"
                  :items="itemsSelesai"
                  :filter="filter"
                   @filtered="onFiltered">
                    <template slot="action" slot-scope="data">
                       <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->
                       <router-link :to="{ name: 'Jurnal Panjar', params: { status: 'detail', id: data.item.Jrn_ID } }">
                         <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
                       </router-link>
                        <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID, name: 'Bukti Uang Muka' } }" >
                         <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Bukti UMK"></i>
                       </router-link>
                       <!-- <i @click="showModalKoreksi(data.item)" class="fa fa-pencil fa-md text-default button-icon"></i> -->
                        <router-link :to="{  name: 'Jurnal Panjar', params: { status: 'edit', id: data.item.Jrn_ID }}">
                         <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                       </router-link>
                      <i v-if="data.item.IsRevert == 0" @click="showModalKoreksi(data.item,2)" class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Koreksi Jurnal"></i>

                    </template>
                  </b-table>
                  <b-pagination v-model="currentPageSelesai" :total-rows="rowsSelesai" :per-page="perPageSelesai" aria-controls="tambah_tidaksetujuPK"></b-pagination>
                </b-col>
              </b-row>

            </b-tab>
          </b-tabs>

        <!-- <b-row style="padding-top:10px;">
          <b-col sm="12">
            <c-table :table-data="items" :fields="fields" caption="" custom="newSlot">
              <template slot-scope="{ action }">
                <router-link :to="{ name: 'Jurnal Uang Muka Form', params: { id: action.Jrn_ID } }">
                  <i class="fa fa-eye fa-md text-default button-icon"></i>
                </router-link>
                <router-link :to="{ name: 'Jurnal Uang Muka Form', params: { id: action.Jrn_ID } }">
                  <i class="fa fa-pencil fa-md text-default button-icon"></i>
                </router-link>
              </template>
            </c-table>
          </b-col>
        </b-row> -->
      </b-card>
    </b-col>
  </b-row>
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
      <b-button :disabled="buttonKoreksi" type="submit" variant="primary" class="float-right" style="margin-left:20px;">
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
  import moment from '../../../../node_modules/moment/moment'
import cTable from '@/views/base/Table.vue'
import apiAccount from '@/api/AKAccountApiService';
import apiJournal from '@/api/AKJournalApiService';
import apiJournalUangMuka from '@/api/AK/JournalUangMukaApiService';
import apiJournalItem from '@/api/AKJournalItemApiService';
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
      buttonKoreksi: false,
      cabang:null,
      filter:null,
       headerExcel : ['No','Nomor Jurnal','Nama','Tanggal Jurnal','Deskripsi','Nilai Realisasi'],
      itemsExcelBUMK : [],
      itemsExcelSUMK : [],
      itemsExcelHUMK : [],
      setExcelBUMK : [
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
      setExcelSUMK : [
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
      setExcelHUMK : [
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
      itemsSudah: [],
      itemsSelesai:[],
      options_cabang:[],
      itemsArrayBUMK: null,
      itemsArraySUMK: null,
      itemsArrayHUMK: null,
      fields: [{
          key: 'JournalNumber',
          label: 'Nomor Jurnal',
          sortable: true
        },
        {
          key: 'Pic',
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
      // fieldsSelesai: [{
      //     key: 'JournalNumber',
      //     label: 'Nomor Jurnal',
      //     sortable: true
      //   },
      //   {
      //     key: 'Pic',
      //     label: 'Nama',
      //   },
      //   {
      //     key: 'JournalDate',
      //     label: 'Tanggal Jurnal',
      //   },
      //   {
      //     key: 'Description',
      //     label: 'Deskripsi',
      //   },
      //   {
      //     key: 'action',
      //     label: 'aksi'
      //   }
      // ],
      rows: null,
      rowsSudah: null,
      rowsSelesai: null,
      dari:null,
      hingga:null,
      filterCabang:null,
      perPage: 10,
      currentPage: 1,
      perPageSudah: 10,
      currentPageSudah: 1,
      perPageSelesai: 10,
      currentPageSelesai: 1,
      koreksi:{
        JournalNumber:"",
        Description:"",
        Verification: null,
        Agreement: null,
        Type: null,
        DACode: null
      },
      tabIndex: [0, 0],
      tabs: [
        'Belum Dipertanggungjawabkan',
        'Sudah Dipertanggungjawabkan',
        'Hasil Pertanggungjawaban',
      ],
      options_Program: [
        { text: 'Program PK', value: '12' },
        { text: 'Program BL', value: '13' },
        { text: 'Program PKBL', value: '14,13,12' }
      ],
      JournalTypeId:'',
      options_PaymentType: []
    }
  },
  async created() {
    this.cabang = localStorage.cabang
    // this.filterCabang = this.cabang
    this.getCabang()
    // this.getAll()
    // this.getAllSelesai()
  },
  watch:{
   'dari': async function () {
     // console.log(this.dari);
     this.getAll(this.dari)
     this.getAllSelesai(this.dari)
   },
   'hingga': async function (){
     this.getAll(this.dari,this.hingga)
     this.getAllSelesai(this.dari,this.hingga)
   },
  'filterCabang': async function (){
     this.getAll(this.dari,this.hingga)
     this.getAllSelesai(this.dari,this.hingga)
   },
   'JournalTypeId': async function (){
     this.getAll(this.dari,this.hingga)
     this.getAllSelesai(this.dari,this.hingga)
   }
  },
  methods: {
    // async getAll(dari = null, hingga = null) {
    //   this.loading = true
    //   console.log(dari,hingga);
    //   try {
    //     var dataTable = await apiJournal.getAllByType(this.JournalTypeId,dari,hingga)

    //     for (var i = 0; i < dataTable.length; i++) {
    //       dataTable[i].id = dataTable[i].Jrn_ID
    //       var GetDetail = await apiJournal.getJurnalGabungan(dataTable[i].id)
    //       console.log(GetDetail);
    //       dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
    //       dataTable[i].ItemValue = dataTable[i].JournalItem[0].ItemValue
    //       dataTable[i].Pic = GetDetail.Receiver
    //     }

    //     this.items = dataTable
    //     this.rows = this.items.length
    //     this.itemsArray = () => this.items
    //     console.log(this.items)
    //   } finally {
    //     this.loading = false
    //   }
    // },
    async getAll(dari = null, hingga = null){
      this.loading = true
      console.log(dari,hingga);
      try {
         var workarea = await apiWorkArea1.getByCode(this.filterCabang)
         var WAName = "Semua"
         if(workarea[0]){
           if(workarea[0].Name){
             WAName = workarea[0].Name
           }
         }
        var dataTable = await apiJournalUangMuka.getTable(this.JournalTypeId,0,this.filterCabang,dari,hingga)
        console.log('isi',dataTable);
        this.items = []
        this.itemsExcelBUMK =[]
        this.setExcelBUMK[1].titles = []
        var totalBUMK = 0
         for (var i = 0; i < dataTable.Data.length; i++) {
           var data = dataTable.Data[i]
           data.No = i+1
           data.Pic = data.FullName
           data.JournalDate = this.formatDateDMY(data.JournalDate)
           if(data.IsRevert == 2){
              totalBUMK += this.ConvertMinus(data.ValueAdvances)
              data.ItemValue = this.formatCurrency(this.ConvertMinus(data.ValueAdvances))
           }else{
               totalBUMK += data.ValueAdvances
              data.ItemValue = this.formatCurrency(data.ValueAdvances)
           }

           this.itemsExcelBUMK.push({
              No : data.No,
              JournalNumber : data.JournalNumber,
              Pic : data.Pic,
              JournalDate : data.JournalDate,
              Description : data.Description,
              ItemValue : this.CurrencyToNumber(data.ItemValue),
            })
           this.items.push(data)
           this.rows = this.items.length
            this.itemsArrayBUMK = () => this.items
         }
         this.setExcelBUMK[1].titles.push(
         {
           cels : 'A1',
           name : 'Jurnal Uang Muka (Belum Dipertanggungjawabkan)'
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
         this.itemsExcelBUMK.push({
              No : "Total Keseluruhan",
              JournalNumber : "",
              Pic : "",
              JournalDate : "",
              Description : "",
              ItemValue : this.CurrencyToNumber(totalBUMK),
            })

         var dataTableSudah = await apiJournalUangMuka.getTable(this.JournalTypeId,1,this.filterCabang,dari,hingga)
        console.log('isi',dataTableSudah);
        this.itemsSudah = []
        this.itemsExcelSUMK = []
        this.setExcelSUMK[1].titles = []
         var totalSUMK = 0
         for (var i = 0; i < dataTableSudah.Data.length; i++) {
           var dataSudah = dataTableSudah.Data[i]
           dataSudah.No = i+1
           dataSudah.Pic = dataSudah.FullName
           // totalSUMK += dataSudah.ValueAdvances
           dataSudah.JournalDate = this.formatDateDMY(dataSudah.JournalDate)
           if(dataSudah.IsRevert == 2){
              totalSUMK += this.ConvertMinus(dataSudah.ValueAdvances)
              dataSudah.ItemValue = this.formatCurrency(this.ConvertMinus(dataSudah.ValueAdvances))
           }else{
               totalSUMK += dataSudah.ValueAdvances
              dataSudah.ItemValue = this.formatCurrency(dataSudah.ValueAdvances)
           }
           // dataSudah.ItemValue = this.formatCurrency(dataSudah.ValueAdvances)
           this.itemsExcelSUMK.push({
              No : dataSudah.No,
              JournalNumber : dataSudah.JournalNumber,
              Pic : dataSudah.Pic,
              JournalDate : dataSudah.JournalDate,
              Description : dataSudah.Description,
              ItemValue : this.CurrencyToNumber(dataSudah.ItemValue),
            })
           this.itemsSudah.push(dataSudah)
           this.rowsSudah = this.itemsSudah.length
            this.itemsArraySUMK = () => this.itemsSudah
         }
         this.setExcelSUMK[1].titles.push(
         {
           cels : 'A1',
           name : 'Jurnal Uang Muka (Sudah Dipertanggungjawabkan)'
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
         this.itemsExcelSUMK.push({
              No : "Total Keseluruhan",
              JournalNumber : "",
              Pic : "",
              JournalDate : "",
              Description : "",
              ItemValue : this.CurrencyToNumber(totalSUMK),
            })
         this.koreksi.Verification = await this.getConfig("JOURNAL_PENYETUJU")
         this.koreksi.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
         this.PaymentType = await apiPaymentType.getComboBoxAll()
         this.options_PaymentType = [];
      } finally {
        this.loading = false
      }
    },
     async getAllSelesai(dari = null, hingga = null){
      this.loading = true
      try {
         var workarea = await apiWorkArea1.getByCode(this.filterCabang)
         var WAName = "Semua"
         if(workarea[0]){
           if(workarea[0].Name){
             WAName = workarea[0].Name
           }
         }
        var dataTable = await apiJournalUangMuka.getTableSelesai(this.JournalTypeId,this.filterCabang,dari,hingga)
        console.log('isi',dataTable);
        var totalHUMK = 0
        this.itemsSelesai = []
        this.itemsExcelHUMK = []
        this.setExcelHUMK[1].titles = []
         for (var i = 0; i < dataTable.Data.length; i++) {
           var data = dataTable.Data[i]
           data.No = i+1
           data.Pic = data.FullName
           // totalHUMK += data.ItemValue
           data.JournalDate = this.formatDateDMY(data.JournalDate)
           if(data.IsRevert == 2){
              totalHUMK += this.ConvertMinus(data.ItemValue)
              data.ItemValue = this.formatCurrency(this.ConvertMinus(data.ItemValue))
           }else{
               totalHUMK += data.ItemValue
              data.ItemValue = this.formatCurrency(data.ItemValue)
           }
           // data.ItemValue = this.formatCurrency(data.ItemValue)
           this.itemsExcelHUMK.push({
              No : data.No,
              JournalNumber : data.JournalNumber,
              Pic : data.Pic,
              JournalDate : data.JournalDate,
              Description : data.Description,
              ItemValue : this.CurrencyToNumber(data.ItemValue),
            })
           this.itemsSelesai.push(data)
           this.rowsSelesai = this.itemsSelesai.length
            this.itemsArrayHUMK = () => this.itemsSelesai
         }
         this.setExcelHUMK[1].titles.push(
         {
           cels : 'A1',
           name : 'Jurnal Uang Muka (Hasil Dipertanggungjawabkan)'
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
          this.itemsExcelHUMK.push({
              No : "Total Keseluruhan",
              JournalNumber : "",
              Pic : "",
              JournalDate : "",
              Description : "",
              ItemValue : this.CurrencyToNumber(totalHUMK),
            })
      } finally {
        this.loading = false
      }
      // if (this.JournalTypeId  == '14') {
      //   this.JournalTypeId += ',12,13'
      // }

    },
    async showModalKoreksi(data,type){
      console.log(data);
      this.options_PaymentType = []
      if (data.IsRevert == 0) {
        if (data.JournalTypeId == 12) {
          for (var i = 0; i < this.PaymentType.length; i++) {
            if ((this.PaymentType[i].Jprog == 1) || (this.PaymentType[i].Jprog == 0)) {
              this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
            }
          }
        }else if (data.JournalTypeId == 13) {
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
        this.koreksi.Jrn_ID = data.Jrn_ID
        this.koreksi.JournalNumber = data.JournalNumber
        this.koreksi.Description = data.Description
        this.koreksi.Type = type
        this.koreksi.DACode = data.DACode
        this.$root.$emit('bv::show::modal','modal-koreksi', '#btnShow')
      }else {
        alert('Jurnal Tidak Bisa Di Koreksi')
      }
    },
    async Koreksi(JrnID){
      console.log(JrnID);
      this.buttonKoreksi = false
       console.log(JrnID);
       this.koreksi.PaymentTypeId = this.koreksi.PaymentType.value

       if(this.koreksi.Type == 0){
          var data =  await apiJournal.insertKoreksiBelumUMK(JrnID,this.koreksi.TanggalKoreksi,this.koreksi)
       }else if(this.koreksi.Type == 1){
          var data =  await apiJournal.insertKoreksi(JrnID,this.koreksi.TanggalKoreksi,this.koreksi)
       }
       else if(this.koreksi.Type == 2){
          var data =  await apiJournal.insertKoreksiHasilUMK(JrnID,this.koreksi.TanggalKoreksi,this.koreksi.DACode,this.koreksi)
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


    },
    async getCabang(){
      var workarea = null
      if(this.cabang != 9900){
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

      this.rowsSudah = filteredItems.length
      this.currentPageSudah = 1

      this.rowsSelesai = filteredItems.length
      this.currentPageSelesai = 1
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.positionRight {
  text-align:right;
}
</style>
