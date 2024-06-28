<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Jurnal Kas Bank-PKBL</strong>
        </div>

        <b-row>
          <b-col sm="2" offset-sm="11">
            <div class="form-group form-actions">
              <router-link :to="{ name: 'Jurnal Kas Bank-PKBL Form' }">
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
                 <b-form-input v-model="filter" placeholder=""></b-form-input>
            </b-col>
            <b-col sm="3">
                <label for="ccnumber">Dari:
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                <b-form-input v-model="dari" type="date" required></b-form-input>
            </b-col>
            <b-col sm="3">
                <label for="ccnumber">Hingga:
                   <!-- <b class="text-danger"> *</b> -->
                 </label>
                <b-form-input v-model="hingga" type="date" required></b-form-input>
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
            :per-page="perPage"
            :current-page="currentPage"
            :items="items"
            :filter="filter"
             @filtered="onFiltered">
              <template slot="action" slot-scope="data">
                 <!-- <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization PK', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> <i class="icon-check"></i> Permohonan</router-link> -->

                 <router-link :to="{ name: 'Jurnal Kas Bank-PKBL Form', params: { id: data.item.Jrn_ID } }">
                   <i class="fa fa-eye fa-md text-default button-icon"></i>
                 </router-link>
                 <i @click="showModalKoreksi(data.item)" class="fa fa-pencil fa-md text-default button-icon"></i>
                 <router-link :to="{ name: 'Report Bukti Kas Bank', params: { id: data.item.Jrn_ID } }">
                   <i class="fa fa-print fa-md text-default button-icon"></i>
                 </router-link>
              </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="tambah_tidaksetujuPK"></b-pagination>
          </b-col>
        </b-row>
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
  <b-modal id="modal-koreksi" title="Koreksi">
    <p>Anda yakin ingin mengkoreksi jurnal Dengan <br>
      Nomor : {{ koreksi.JournalNumber }} {{ koreksi.Jrn_ID }}<br>
      Deskripsi : {{ koreksi.Description }} <br><br><br></p>


    <template v-slot:modal-footer>
        <div class="w-100">
          <b-button @click="Koreksi(koreksi.Jrn_ID)" variant="primary" href="" class="float-right" style="margin-left:20px;">
              Ya
          </b-button>
          <b-button @click="$bvModal.hide('bv-modal-koreksi')" variant="danger" href="" class="float-right">
              Tidak
          </b-button>
        </div>
      </template>
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

// const someData = () => await api.getAll()

export default {
  name: 'GeneralJournal',
  components: {
    cTable
  },
  data() {
    return {
      filter:null,
      items: [],
      itemsArray: null,
      fields: [{
          key: 'JournalNumber',
          label: 'Nomor Jurnal',
          sortable: true
        },
        // {
        //   key: 'AccountCode',
        //   label: 'Kode Akun',
        // },
        // {
        //   key: 'NameCode',
        //   label: 'Nama Akun',
        // },
        {
          key: 'JournalDate',
          label: 'Tanggal Jurnal',
        },
        {
          key: 'Description',
          label: 'Deskripsi',
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
      }
    }
  },
  async created() {
    this.getAll()
  },
  watch:{
   'dari': async function () {
     // console.log(this.dari);
     this.getAll(this.dari)
   },
   'hingga': async function (){
     this.getAll(this.dari,this.hingga)
   }
  },
  methods: {
    async getAll(dari = null, hingga = null) {
      this.loading = true
      console.log(dari,hingga);
      try {
        var dataTable = await apiJournal.getAllByType(8,dari,hingga)

        for (var i = 0; i < dataTable.length; i++) {
          dataTable[i].id = dataTable[i].Jrn_ID
          dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
        }

        this.items = dataTable
        this.rows = this.items.length
        this.itemsArray = () => this.items
        console.log(this.items)
      } finally {
        this.loading = false
      }
    },
    showModalKoreksi(data){
      console.log(data);
      this.koreksi = {}
      this.koreksi.Jrn_ID = data.Jrn_ID
      this.koreksi.JournalNumber = data.JournalNumber
      this.koreksi.Description = data.Description
      this.$root.$emit('bv::show::modal','modal-koreksi', '#btnShow')
    },
    async Koreksi(JrnID){
      console.log(JrnID);
      var data =  await apiJournal.insertKoreksi(JrnID)
      if (data) {
        var response = { Status:true , Message: 'Operation success' }
        this.showNotif(response, 'Jurnal')
        this.$router.push('/accounting/jurnal-kas-bank/'+data.Data)
      }else {
        var response = { Status:false , Message: 'Operation failed' }
        this.showNotif(response, 'Jurnal')
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
