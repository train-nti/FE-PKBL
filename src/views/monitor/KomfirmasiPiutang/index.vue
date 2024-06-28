<template>
    <div class="animated fadeIn">
        <div class="card">
            <div class="card-body">
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
                          <strong>Surat Konfirmasi Piutang</strong>
                      </div>
                      <b-row>
                          <b-col md="9" class="my-1">
                          </b-col>
                          <b-col md="3" class="my-1">
                            <b-form-group class="mb-0">
                              <b-input-group>
                                <b-form-input v-model="filter" placeholder="Ketik untuk mencari"></b-form-input>
                                <b-input-group-append>
                                  <b-button :disabled="!filter" @click="filter = ''">Bersih</b-button>
                                </b-input-group-append>
                              </b-input-group>
                            </b-form-group>
                          </b-col>
                      <!-- Table Customers -->
                       <b-table
                        :fields="fields"
                        caption=""
                        :per-page="perPage_debitor"
                        :current-page="currentPage_debitor"
                        :items="items"
                        :filter="filter"
                         @filtered="onFiltered">
                          <template slot="Action" slot-scope="data">
                               <!-- <router-link :to="{ name: 'Konfirmasi Piutang', params: {}}"> -->
                                <b-button @click="showModalKonfirmasi(data.item)" pill variant="primary" size="md">
                                  SKP
                                </b-button>
                              <!-- </router-link>  -->
                          </template>
                        </b-table>
                      <b-pagination v-model="currentPage_debitor" :total-rows="rows_debitor" :per-page="perPage_debitor" aria-controls="tambah_debitor"></b-pagination>
                      </b-row>

                  </b-card>
                </b-col>
                </b-row>

            </div>
        </div>
          <!-- Modal Component -->
    <b-modal id="modal-konfirmasi" title="Pengaturan Surat Konfirmasi Piutang" hide-footer>
        <form @submit.prevent="KonfirmasiData(Konfirmasi.Jrn_ID)">

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nomor Surat</label></b-col>
            <b-col>
              <b-input class="mb-2 mb-sm-0" v-model="Konfirmasi.Nomor" type="text" id="#"  required/>
              <!-- <b-input class="mb-2 mb-sm-0" v-model="koreksi.TanggalKoreksi" type="date" id="#" placeholder="" required/> -->
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Region</label></b-col>
            <b-col><b-form-select :options="options_cabang" required v-model="Konfirmasi.Cabang" /></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Tanggal Closing</label></b-col>
            <b-col>
              <date-picker v-model="Konfirmasi.TanggalClosing" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
              <!-- <b-input class="mb-2 mb-sm-0" v-model="Konfirmasi.Receiver" type="date" id="#"  required/> -->
            </b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Alamat Pengirim</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="Konfirmasi.Alamat" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Jabatan Tertinggi dari CSR&amp;SMEPP MOR/RU/KP</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="Konfirmasi.Jabatan" type="text" id="#"  required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nama Pejabat</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" v-model="Konfirmasi.NamaPejabat" type="text" id="#"  required/></b-col>
          </b-row>
          <br>
          <br>
        <b-button :disabled="buttonKoreksi != true" type="submit" variant="primary" class="float-right" style="margin-left:20px;">
            Cetak
        </b-button>
      </form>
    </b-modal>
    </div>
</template>

<script>
    import moment from '../../../../node_modules/moment/moment'
    import apiDebitor from '@/api/PK/DebitorApiService';
    import apiWorkArea1 from '@/api/WorkArea1ApiService'

    export default {
        data() { 
            return { 
                buttonKoreksi: true,
                cabang:null,
                filter: '',
                loading:false,
                tabIndex: [0, 0],
                Konfirmasi:{
                  DACode:null,
                  Cabang:'Semua'
                },
                options_cabang:[],
                items:[],
                fields: [
                {
                  key: 'DANumber',
                  label: 'Nomor Debitur',
                  sortable: true
                },
                {
                  key: 'FullName',
                  label: 'Nama',
                  sortable: true
                },
                {
                  key: 'Address',
                  label: 'Alamat',
                  sortable: true
                },
                {
                  key: 'District',
                  label: 'Kota',
                  sortable: true
                },
                {
                  key: 'FinalPaymentDate',
                  label: 'Tgl.Realisasi',
                  sortable: true
                },
                {
                  key: 'DebValue',
                  label: 'Realisasi',
                  sortable: true
                },
                {
                  key: 'SectorName',
                  label: 'Jenis Sektor Usaha',
                  sortable: true
                },
                {
                  key: 'Action',
                  label: 'Aksi'
                },
              ],
                  perPage_debitor: 10,
                  currentPage_debitor: 1,
            };
        },

        async created() {
            this.loading = true
            this.cabang = localStorage.cabang
            this.getAll()
            this.getCabang()
            this.loading = false

        },
        methods: {
          onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.rows_debitor = filteredItems.length
            this.currentPage_debitor = 1
          },
            async getAll() {
                try {
                    var debitorData = await apiDebitor.getListKartuPiutang(this.cabang)
                     for (var i = 0; i < debitorData.Data.length; i++) {
                        var data = debitorData.Data[i]
                        data.FinalPaymentDate = this.formatDateDMY(data.FinalPaymentDate)
                        data.DebValue = this.formatCurrency(data.DebValue)
                        this.items.push(data)
                     }
                } finally {
                }
            },
            async getCabang(){
              // var workarea = null
              // if(this.cabang != 9900){
              //  workarea = await apiWorkArea1.getByCode(this.cabang)
              //  console.log("CABANG",workarea)
              //  this.options_cabang = [{text: workarea[0].Name,value:workarea[0].Code}]
              //  // this.options_cabang.push({text: workarea[0].Name,value:workarea[0].Code})
              // }else{
                var workarea = await apiWorkArea1.getComboBoxAll()
                this.options_cabang = [{text:"--- Semua ---",value:'Semua'}]
                for (var i = 0; i < workarea.length; i++) {
                  var data =  workarea[i]
                  this.options_cabang.push({text: data.Name,value:data.Name})
                }
              // }
              console.log("cabang",workarea)
            },
           async showModalKonfirmasi(data){
              console.log("DATA KU",data)
                this.Konfirmasi.DACode = data.DACode
                this.$root.$emit('bv::show::modal','modal-konfirmasi', '#btnShow')
            },
            async KonfirmasiData(DaCode){
                 this.$router.push({ name: 'Konfirmasi Piutang', query: { konfirmasi: this.Konfirmasi } })
            },
        },
        computed: {
          rows_debitor() {
            return this.items.length
          },
        },
        mounted() {
          // Set the initial number of items
          this.rows_debitor= this.items.length
        },
    }
</script>
