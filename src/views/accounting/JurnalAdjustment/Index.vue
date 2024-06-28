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
          <strong>Jurnal Adjustment</strong>
        </div>

        <b-row>
          <b-col sm="2" offset-sm="11">
            <div class="form-group form-actions" v-if="(monthNow == 12)||(monthNow == 1)">
              <router-link :to="{ name: 'Jurnal Adjustment Form' }">
                <b-button size="md" variant="primary">Tambah</b-button>
              </router-link>
            </div>
          </b-col>
        </b-row>

        <b-row>
          &nbsp;&nbsp;<p class="text-danger">* Tambah jurnal adjustment hanya bisa dilakukan bulan desember dan januari</p>
        </b-row>

        <b-row>
            <b-col sm="3">
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
            <b-col sm="3">
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

                 <router-link :to="{ name: 'Jurnal Adjustment Form', params: { status: 'detail', id: data.item.Jrn_ID } }">
                   <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
                 </router-link>
                 <i v-if="data.item.IsRevert == 0" @click="showModalKoreksi(data.item)" class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Koreksi Jurnal"></i>
                 <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID, name: 'Bukti Adjustment' } }">
                   <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Jurnal"></i>
                 </router-link>
                 <router-link :to="{ name: 'Jurnal Adjustment Form', params: { status : 'edit', id: data.item.Jrn_ID } }">
                   <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                 </router-link>
              </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="tambah_tidaksetujuPK"></b-pagination>
          </b-col>
        </b-row>
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
      <b-button :disabled="buttonKoreksi != true" type="submit" variant="primary" class="float-right" style="margin-left:20px;">
          Koreksi
      </b-button>
    </form>
  </b-modal>
</div>
</template>

<script>
import cTable from '@/views/base/Table.vue'
import apiAccount from '@/api/AKAccountApiService';
import apiJournal from '@/api/AKJournalApiService';
import apiJournalItem from '@/api/AKJournalItemApiService';
import moment from '../../../../node_modules/moment/moment'
import apiPaymentType from '@/api/PaymentTypeApiService';

// const someData = () => await api.getAll()

export default {
  name: 'GeneralJournal',
  components: {
    cTable
  },
  data() { 
    return { 
      loading:false,
      cabang:null,
      filter:null,
      items: [],
      itemsArray: null,
      buttonKoreksi: true,
      fields: [{
          key: 'JournalNumber',
          label: 'Nomor Jurnal',
          sortable: true
        },
        {
          key: 'Receiver',
          label: 'Nama',
          sortable: true
        },
        {
          key: 'JournalDate',
          label: 'Tanggal Jurnal',
          sortable: true
        },
        {
          key: 'Description',
          label: 'Deskripsi',
          sortable: true
        },
        {
          key: 'Nilai',
          label: 'Nilai'
        },
        {
          key: 'action',
          label: 'aksi'
        }
      ],
      rows: null,
      dari:null,
      hingga:null,
      perPage: 10,
      currentPage: 1,
      koreksi:{
        JournalNumber:"",
        Description:""
      },
      options_Program: [
        { text: 'Program PK', value: '18' },
        { text: 'Program BL', value: '19' },
        { text: 'Program PKBL', value: '20,19,18' }
      ],
      JournalTypeId:'',
      options_PaymentType: []
    }
  },
  async created() {
    this.cabang = localStorage.cabang
    this.monthNow = (moment().month()+1)
    console.log(this.monthNow);
    // this.getAll()
  },
  watch:{
   'dari': async function () {
     // console.log(this.dari);
     this.getAll(this.dari)
   },
   'hingga': async function (){
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
        var dataTable = await apiJournal.getAllByType(this.JournalTypeId,this.cabang,dari,hingga)

        for (var i = 0; i < dataTable.length; i++) {
          console.log('oi',this.dataTable);
          dataTable[i].id = dataTable[i].Jrn_ID
          dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
          if (dataTable[i].Receiver == null) {
            dataTable[i].Receiver = dataTable[i].FullName
          }

          var TotalNilai = 0
            for (var j = 0; j < dataTable[i].JournalItem.length; j++) {
            if (dataTable[i].JournalItem[j].IsDebet) {
              TotalNilai += dataTable[i].JournalItem[j].ItemValue
            }
          }
          if( dataTable[i].IsRevert == 2){
            dataTable[i].Nilai = this.formatCurrency(this.ConvertMinus(TotalNilai))
         }else{
            dataTable[i].Nilai = this.formatCurrency(TotalNilai)
         }
        }

        this.items = dataTable
        this.rows = this.items.length
        this.itemsArray = () => this.items
        this.PaymentType = await apiPaymentType.getComboBoxAll()
        this.options_PaymentType = [];
        console.log(this.items)
        this.koreksi.Verification = await this.getConfig("JOURNAL_PENYETUJU")
        this.koreksi.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
      } finally {
        this.loading = false
      }
    },
    async showModalKoreksi(data){
      console.log(data);
      if (data.IsRevert == 0) {
        this.options_PaymentType = []
        if (data.JournalTypeId == 18) {
          for (var i = 0; i < this.PaymentType.length; i++) {
            if ((this.PaymentType[i].Jprog == 1) || (this.PaymentType[i].Jprog == 0)) {
              this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
            }
          }
        }else if (data.JournalTypeId == 19) {
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
        this.koreksi.Jrn_ID = data.Jrn_ID
        this.koreksi.JournalNumber = data.JournalNumber
        this.koreksi.Description = data.Description

        console.log(this.koreksi);
        this.$root.$emit('bv::show::modal','modal-koreksi', '#btnShow')
      }else {
        alert('Jurnal Tidak Bisa Di Koreksi')
      }
    },
    async Koreksi(JrnID){
      this.buttonKoreksi = false
      console.log(JrnID,this.koreksi.TanggalKoreksi);
      console.log(this.buttonKoreksi);
      this.koreksi.PaymentTypeId = this.koreksi.PaymentType.value
      console.log(this.koreksi)
      // return
      var data =  await apiJournal.insertKoreksi(JrnID,this.koreksi.TanggalKoreksi,this.koreksi)
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
