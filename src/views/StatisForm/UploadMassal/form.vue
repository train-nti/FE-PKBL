<style type="text/css">
  tr th{
      /*width:1%;*/
      white-space:nowrap;
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
        <b-row v-if="!loading">
            <b-col sm="12">
                <b-card>
                    <div slot="header">
                        <strong>Data Upload </strong>
                    </div>
                    <b-row>
                     <b-col md="6" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="Cari"></b-form-input>
                          <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Bersihkan Filter</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="6" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                            <b-form-select v-model="formAdd.fase" :options="options" required></b-form-select>
                           <b-form-file v-model="formAdd.file"></b-form-file>
                          <b-input-group-append>
                           <b-button variant="primary" v-on:click="saveUpload()">Unggah</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    </b-row>
                    <b-row>
                     <b-col md="8" class="my-1">
                    </b-col>
                    <b-col md="4" class="my-1">
                      <b-form-group class="mb-0">
                        <b-input-group>
                          <a :href="globalEnv.server == 'pertamina' ? 'pkbl_online/static/template/ImportPencairan.xlsx' : 'static/template/ImportPencairan.xlsx'"  class="btn btn-primary" download>Template Pencairan</a>
                          <a :href="globalEnv.server == 'pertamina' ? 'pkbl_online/static/template/ImportPembayaran.xlsx' : 'static/template/ImportPembayaran.xlsx'"  class="btn btn-primary" download>Template Pembayaran</a>
                          <!-- <a href="https://drive.google.com/uc?export=view&id=1guFa5ZsdwCY3gYz5XKR9HH6UNTp-8pAH" class="btn btn-primary" download>Template Pencairan</a>
                          <a href="https://drive.google.com/uc?export=view&id=12Lty__yziJN9v3d3XfjbJYfjDd43QLZO" class="btn btn-primary" download>Template Pembayaran</a>  -->
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    </b-row>
                      <b-row>
                        <br>
                        <b-col sm="12">
                                  <b-table
                                  id="tambah"
                                  :fields="fields"
                                  caption=""
                                  :per-page="perPage"
                                  :current-page="currentPage"
                                  :items="items"
                                  :filter="filter"
                                   @filtered="onFiltered">
                                    <template slot="aksi" slot-scope="data">
                                      <!--  <router-link class="btn btn-primary" :to="{ name: 'Form Workflow Initialization', params: {DebCode:data.item.DebCode,DACode:data.item.DACode} }"> -->
                                        <!-- <i class="icon-check"></i> Download  -->
                                      <!-- </router-link>    -->
                                    </template>
                                  </b-table>
                                  <b-pagination
                                  v-model="currentPage"
                                  :total-rows="rows"
                                  :per-page="perPage"
                                  aria-controls="tambah_permohonan"></b-pagination>
                        </b-col>
                      </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
  import apiBulkImport from '@/api/PK/BulkImportApiService';
    export default {
         data() {
            return {
              loading: false,
              configConfirm:null,
              textConfirm:null,
              formAdd:{
                fase:null,
                file:null
              },
              options:[
                {text:"Pencairan", value: 5},
                {text:"Pembayaran", value: 6},
              ],
              filter: null,
              items: [],
              fields: [
                {label: 'No',key:'No', sortable: true},
                {label: 'Nama File',key: 'Name', sortable: true},
                {label: 'Total Row',key: 'RowTotal', sortable: true},
                {label: 'Proses',key: 'RowProcessed', sortable: true},
                {label: 'Fase',key: 'Fase', sortable: true},
                {label: 'Pesan',key: 'ErrorMessage', sortable: true},
                // {key:'aksi'}
              ],
                perPage: 10,
                currentPage: 1,
            }
        },
        async created() {
          this.loading = true
          this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
          this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
          await this.getDataImport()
          this.loading = false
        },
        computed: {
          rows() {
            return this.items.length
          }

        },
        mounted() {
          // Set the initial number of items
          this.rows = this.items.length
        },
         methods: {
          async getDataImport(){
            this.items = []
            var dataImport = await apiBulkImport.getAll();
            console.log("DATA",dataImport)
            for (var i = 0; i < dataImport.Data.length; i++) {
              var hasil = dataImport.Data[i]
              hasil.No = i + 1
              if(dataImport.Data[i].Fase == 5){
                hasil.Fase = "Pencairan"
              }else{
                hasil.Fase = "Pembayaran"
              }
              this.items.push(hasil)
            }
          },
           async saveUpload(){
            if(!this.formAdd.fase){
                      alert("Harap Pilih Fase Upload");
            }else if(!this.formAdd.file){
                      alert("File Belum Dipilih");
            }else{
               this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
               .then(async (value) => {
                  if(value){

                    this.loading = true
                     let formData = new FormData();
                    formData.append('file', this.formAdd.file);
                    formData.append('Fase', this.formAdd.fase);
                    var dataImport = await apiBulkImport.createImport(formData);
                    this.getDataImport()
                    this.showNotif(dataImport,'Upload')
                    this.loading = false
                  }
               })
               .catch(err => {
                // An error occurred
               })
             }
          },
          onFiltered(filteredItems) {
            this.rows = filteredItems.length
            this.currentPage = 1
          },

         }
    }
</script>
