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
          <strong>Jurnal Transfer Dana Bank</strong>
        </div>

        <b-row>
          <b-col sm="2" offset-sm="11">
            <div class="form-group form-actions">
              <router-link :to="{ name: 'Jurnal Transfer Dana Bank Form' }">
                <b-button size="md" variant="primary">Tambah</b-button>
              </router-link>
            </div>
          </b-col>
        </b-row>

        <b-row>
            <b-col sm="3">
                <label for="ccnumber">No. Bukti (Oprasional):
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                <b-form-input v-model="nobukti" type="text" required></b-form-input>
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

        <b-tabs content-class="mt-3" style="padding-top:10px;">
          <b-tab title="Masuk" active>
            <b-row style="padding-top:10px;">
              <b-col sm="12">
                <b-table
                :fields="fields"
                caption=""
                :sort-compare="sortDateTable"
                :per-page="perPage"
                :current-page="currentPage"
                :items="itemsmasuk"
                :filter="filter"
                 @filtered="onFiltered">
                  <template slot="action" slot-scope="data">
                     <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->

                     <router-link :to="{ name: 'Jurnal Transfer Dana Bank Form', params: { id: data.item.Jrn_ID } }">
                       <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
                     </router-link>
                     <!-- <i @click="showModalKoreksi(data.item)" class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Koreksi Jurnal"></i>
                     <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID , name: 'Bukti Transfer Dana Bank'} }">
                       <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Jurnal"></i>
                     </router-link> -->
                  </template>
                </b-table>
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="tambah_tidaksetujuPK"></b-pagination>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Keluar">
            <b-row style="padding-top:10px;">
              <b-col sm="12">
                <b-table
                :fields="fieldskeluar"
                caption=""
                :sort-compare="sortDateTable"
                :per-page="perPage"
                :current-page="currentPage"
                :items="itemskeluar"
                :filter="filter"
                 @filtered="onFiltered">
                  <template slot="action" slot-scope="data">
                     <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->

                     <router-link :to="{ name: 'Jurnal Transfer Dana Bank Form', params: { status: 'detail', id: data.item.Jrn_ID } }">
                       <i class="fa fa-eye fa-md text-default button-icon" v-b-tooltip.hover title="Lihat Detail Jurnal"></i>
                     </router-link>
                     <i v-if="data.item.IsRevert == 0" @click="showModalKoreksi(data.item)" class="fa fa-pencil fa-md text-default button-icon" v-b-tooltip.hover title="Koreksi Jurnal"></i>
                     <router-link :to="{ name: 'Print Bukti', params: { id: data.item.Jrn_ID , name: 'Bukti Transfer Dana Bank'} }">
                       <i class="fa fa-print fa-md text-default button-icon" v-b-tooltip.hover title="Print Jurnal"></i>
                     </router-link>
                     <router-link :to="{ name: 'Jurnal Transfer Dana Bank Form', params: { status: 'edit', id: data.item.Jrn_ID } }">
                       <i class="fa fa-pencil-square-o fa-md text-default button-icon" v-b-tooltip.hover title="Edit Jurnal"></i>
                     </router-link>
                  </template>
                </b-table>
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="tambah_tidaksetujuPK"></b-pagination>
              </b-col>
            </b-row>
          </b-tab>

        </b-tabs>
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
          <b-col><b-input class="mb-2 mb-sm-0" v-model="koreksi.Receiver" type="text" id="#" disabled required/></b-col>
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
import cTable from '@/views/base/Table.vue'
import apiAccount from '@/api/AKAccountApiService';
import apiJournal from '@/api/AKJournalApiService';
import apiJournalItem from '@/api/AKJournalItemApiService';
import apiPaymentType from '@/api/PaymentTypeApiService';

  import moment from '../../../../node_modules/moment/moment'

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
      items: [],
      itemsmasuk: [],
      itemskeluar: [],
      itemsArray: null,
      dari:null,
      hingga:null,
      nobukti:null,
      filter:null,
      finalReceiver: null,
      fields: [{
          key: 'JournalNumber',
          label: 'Nomor Jurnal',
          sortable: true
        },
        {
          key: 'masuk',
          label: 'Menerima Dari',
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
      fieldskeluar: [{
          key: 'JournalNumber',
          label: 'Nomor Jurnal',
          sortable: true
        },
        {
          key: 'keluar',
          label: 'Mengirim Dari',
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
        { text: 'Program PK', value: '15' },
        { text: 'Program BL', value: '16' },
        { text: 'Program PKBL', value: '17,16,15' }
      ],
      JournalTypeId:'',
      options_PaymentType: [],
      buttonKoreksi: false


    }
  },
  async created() {
    this.cabang = localStorage.cabang

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
        // if (this.JournalTypeId  == '17') {
        //   this.JournalTypeId += ',15,16'
        // }
        var dataTable = await apiJournal.ListJournalDroppingMasuk(this.JournalTypeId,0,this.cabang,dari,hingga)
        console.log('oi',dataTable);
        this.itemsmasuk = []
        for (var i = 0; i < dataTable.length; i++) {
          console.log('ko',dataTable[i]);
          dataTable[i].id = dataTable[i].Jrn_ID
          dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
          dataTable[i].masuk = dataTable[i].SenderWorkArea +" - "+ dataTable[i].WANameKeluar
          // if (dataTable[i].Receiver == null) {
          //   dataTable[i].Receiver = "Region" + " - " + dataTable[i].SenderWorkArea
          // }
          if( dataTable[i].IsRevert == 2){
            dataTable[i].Nilai = this.formatCurrency(this.ConvertMinus(dataTable[i].JournalItem[0].ItemValue))
         }else{
            dataTable[i].Nilai = this.formatCurrency(dataTable[i].JournalItem[0].ItemValue)
         }

          this.itemsmasuk = dataTable
          this.rows = this.itemsmasuk.length
          this.itemsArray = () => this.itemsmasuk
          console.log(this.itemsmasuk)
        }

        var dataTable1 = await apiJournal.ListJournalDroppingMasuk(this.JournalTypeId,1,this.cabang,dari,hingga)
        console.log('oi',dataTable1);
        this.itemskeluar = []
        for (var i = 0; i < dataTable1.length; i++) {
          dataTable1[i].id = dataTable1[i].Jrn_ID
          dataTable1[i].JournalDate = this.formatDateDMY(dataTable1[i].JournalDate)
          dataTable1[i].keluar = dataTable1[i].SenderWorkArea +" - "+ dataTable1[i].WANameKeluar
          // if (dataTable1[i].Receiver == null) {
          //   dataTable1[i].Receiver = "Region" + " - " + dataTable1[i].ReceiverWorkArea
          // }
          if( dataTable1[i].IsRevert == 2){
            dataTable1[i].Nilai = this.formatCurrency(this.ConvertMinus(dataTable1[i].JournalItem[0].ItemValue))
         }else{
            dataTable1[i].Nilai = this.formatCurrency(dataTable1[i].JournalItem[0].ItemValue)
         }

          this.itemskeluar = dataTable1
          this.rows = this.itemskeluar.length
          this.itemsArray = () => this.itemskeluar
          console.log(this.items)
        }
        this.koreksi.Verification = await this.getConfig("JOURNAL_PENYETUJU")
        this.koreksi.Agreement = await this.getConfig("JOURNAL_VERIFIKASI")
        this.PaymentType = await apiPaymentType.getComboBoxAll()
        this.options_PaymentType = [];
      }finally{
        this.loading = false
      }
    },
    async showModalKoreksi(data){
      console.log('ini dia',data);
      this.options_PaymentType = []
      if (data.IsRevert == 0) {
        this.options_PaymentType = []
        if (data.JournalTypeId == 15) {
          for (var i = 0; i < this.PaymentType.length; i++) {
            if ((this.PaymentType[i].Jprog == 1) || (this.PaymentType[i].Jprog == 0)) {
              this.options_PaymentType.push({ label: this.PaymentType[i].PrmrekId +" - "+ this.PaymentType[i].Description,value: this.PaymentType[i].PrmrekId  })
            }
          }
        }else if (data.JournalTypeId == 16) {
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
        this.koreksi.Receiver = data.ReceiverWorkArea +" - "+ data.WANameMasuk
        this.finalReceiver = this.koreksi.Receiver

        this.$root.$emit('bv::show::modal','modal-koreksi', '#btnShow')
      }else {
        alert('Jurnal Tidak Bisa Di Koreksi')
      }
    },
    async Koreksi(JrnID){
      console.log(JrnID);
      this.buttonKoreksi = false
      this.koreksi.PaymentTypeId = this.koreksi.PaymentType.value
       console.log(JrnID);
       console.log('output',this.koreksi);
       // return
      var data =  await apiJournal.insertKoreksiDropping(JrnID,this.koreksi.TanggalKoreksi,this.koreksi)
      console.log('koreksi dropping',data);

      var response = { Status:data.Status , Message: data.Message }
      this.showNotif(response, 'Jurnal')
      this.buttonKoreksi = true

      if (data.Status) this.$router.push('/accounting/general-journal-form/'+data.Data)


    },
    deleteJournal: async function(Jrn_ID) {
      if (confirm('Are you sure you want to delete this record?')) {
        await apiJournal.delete(Jrn_ID)
        await this.getAll()
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
