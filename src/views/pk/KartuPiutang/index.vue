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
                          <strong>Kartu Piutang</strong>
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
                             <router-link :to="{ name: 'Kartu Piutang', params: {DACode:data.item.DACode}}">
                                <b-button pill variant="primary" size="md">
                                  KP
                                </b-button>
                              </router-link>
                               <router-link :to="{ name: 'Kartu Piutang Print', params: {DACode:data.item.DACode,Print:'print'}}">
                                <b-button pill variant="primary" size="md">
                                  Print KP
                                </b-button>
                              </router-link>
                               <!-- <button type="button" class="btn btn-primary" @click="data.toggleDetails" v-b-tooltip.hover title="Lihat Detail Customer">
                                  <i class="fa fa-eye"></i>
                              </button>
                              <button type="button" v-b-modal.modal-1 class="btn btn-success" @click="editCustomer(data.item.DebCode)" v-b-tooltip.hover title="Ubah Data Customer">
                                  <i class="fa fa-pencil "></i>
                              </button>
                              <button type="button" class="btn btn-danger" @click="deleteCustomer(data.item.DebCode)" v-b-tooltip.hover title="Hapus Data Customer">
                                  <i class="fa fa-trash"></i>
                              </button> -->
                          </template>
                        </b-table>
                      <b-pagination v-model="currentPage_debitor" :total-rows="rows_debitor" :per-page="perPage_debitor" aria-controls="tambah_debitor"></b-pagination>
                      </b-row>

                  </b-card>
                </b-col>
                </b-row>

            </div>
        </div>

    </div>
</template>

<script>

    import apiDebitor from '@/api/PK/DebitorApiService';

    export default {
        data() {
            return {
                cabang:null,
                filter: '',
                loading:false,
                tabIndex: [0, 0],
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
