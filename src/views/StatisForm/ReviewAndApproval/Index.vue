<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <div slot="header">
                        <strong>Penilaian </strong>
                    </div>
                      <b-row>
                        <b-col sm="12">
                            <b-tabs class="full-widths" v-model="tabIndex[0]">
                              <b-tab active>
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[0]}}
                              </template>
                              <b-row>
                                <b-col sm="12">
                                  <b-table id="tambah_permohonan" :per-page="perPage_tambah_permohonan" :current-page="currentPage_tambah_permohonan" :items="items_tambah_permohonan">
                                    <template slot="aksi" slot-scope="data">
                                           <b-button variant="info" style="color: white">Proses</b-button>
                                      </template>
                                  </b-table>
                                  <b-pagination v-model="currentPage_tambah_permohonan" :total-rows="rows_tambah_permohonan" :per-page="perPage_tambah_permohonan" aria-controls="tambah_permohonan"></b-pagination>
                                </b-col>
                              </b-row>
                              </b-tab>
                               <b-tab>
                                  <template slot="title">
                                      <i class="icon-calculator"></i> {{tabs[1]}}
                                  </template>
                                 
                              </b-tab>
                          </b-tabs>
                        </b-col>
                      </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    export default {
         data() {
            return {
                tabIndex: [0, 0],
                tabs: [
                    'Tambah Permohonan',
                    'Daftar Permohonan'
                ],
                perPage_tambah_permohonan: 5,
                currentPage_tambah_permohonan: 1,
                items_tambah_permohonan:[
                    { nama_proses: 'Formulir PK',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP01', aksi: '' },
                    { nama_proses: 'Formulir PK',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP01', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir PK',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP01', aksi: '' },
                    { nama_proses: 'Formulir PK',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP01', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir PK',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP01', aksi: '' },
                    { nama_proses: 'Formulir PK',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP01', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' },
                    { nama_proses: 'Formulir BL',diberitahu_jika_berhasil: 'juan@gmail.com',kode_dokumen:'BP02', aksi: '' }
                ]
            }
        },
         computed: {
          rows_tambah_permohonan() {
            return this.items_tambah_permohonan.length
          }
        },
         methods: {
         }
    }
</script>