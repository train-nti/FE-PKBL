<template>
  <div class="animated fadeIn">
      <div class="card">
          <div class="card-body">
              <b-tabs class="full-widths" v-model="tabIndex[0]">
                  <b-tab active>
                      <template slot="title">
                          <i class="icon-calculator"></i> {{tabs[0]}}
                      </template>
                      <br>
                      <div class="form-group row">
                          <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Mitra Binaan</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Nomor KTP</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Nama Lengkap</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Tempat</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                          <div class="col-sm-6">
                            <b-form-radio-group v-model="selected" :options="options" />
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Alamat</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Provinsi</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Kota / Kabupaten</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Kecamatan</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Status Kepemilikan rumah</label>
                          <div class="col-sm-6">
                            <b-form-radio-group v-model="statusKR" :options="optionsKR"/>
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Telepon / Hp</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">e-mail</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Status Pernikahan</label>
                          <div class="col-sm-6">
                            <b-form-radio-group id="basicInlineRadios"

                              :options="[
                                {text: 'Blm nikah ',value: 'a'},
                                {text: 'Nikah ',value: 'b'},
                                {text: 'Janda / Duda ',value: 'c'}
                              ]"
                              :checked="c">
                            </b-form-radio-group>
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Nama Istri / Suami (jika menikah)</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Nama asli ibu kandung</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-2">
                            <!-- <b-button variant="success">Button</b-button> -->
                        </div>
                          <div class="col-sm-4">
                              <b-button variant="primary">Load BPM</b-button>
                              <b-button variant="success">Save</b-button>
                          </div>
                      </div>
                  </b-tab>
                  <b-tab>
                      <template slot="title">
                          <i class="icon-basket-loaded"></i> {{tabs[1]}}
                      </template>
                      <p>Nama-nama keluarga atau relasi yang dapat dihubungi pada situasi darurat</p>
                      <!-- <br> -->
                      <b-table show-empty
                               stacked="md"
                               :items="DataBiayaOperasional"
                               :bordered="bordered"
                               :fields="BiayaOperasional"
                               :current-page="currentPage"
                               :per-page="perPage">
                          <template slot="action" slot-scope="data">
                              <!-- <b-button @click="removeRow(data.item.index);">Remove</b-button>-->
                              <b-button variant="success" class="fa fa-check"></b-button>
                              <b-button variant="danger" class="fa fa-close"></b-button>

                          </template>

                      </b-table>

                      <b-row>
                          <b-col md="6" class="my-1">
                              <b-pagination :total-rows="rowDataBiaya"
                                            :per-page="perPage"
                                            v-model="currentPage"
                                            class="my-0" />
                          </b-col>
                      </b-row>
                      <b-button variant="success">Add New</b-button>
                  </b-tab>
                  <b-tab>
                      <template slot="title">
                          <i class="icon-pie-chart"></i> {{tabs[2]}}
                      </template>
                      <br>
                  </b-tab>
                  <b-tab>
                      <template slot="title">
                          <i class="icon-pie-chart"></i> {{tabs[3]}}
                      </template>
                      <br>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Nama Usaha</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Bentuk Badan Hukum</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Sector Usaha</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Mulai Sejak Tanggal</label>
                          <div class="col-sm-6">
                              <input type="date" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label">Alamat</label>
                          <div class="col-sm-6">
                              <b-form-checkbox-group v-model="selectedAddress" name="alamat" :options="optionsAddress" />
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="inputPassword" class="col-sm-2 col-form-label"></label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="" placeholder="example">
                          </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-2">
                            <!-- <b-button variant="success">Button</b-button> -->
                        </div>
                          <div class="col-sm-4">
                              <!-- <b-button variant="primary">Load BPM</b-button> -->
                              <b-button variant="success">Save</b-button>
                          </div>
                      </div>
                  </b-tab>
              </b-tabs>

          </div>
      </div>
  </div>
</template>

<script>



    const Data = [
        { name: 'Deno', relationship: 'Kakak Kandung', address: 'Jl Tytd',  _rowVariant: 'success', },
        { name: 'Joni', relationship: 'Ayah Kandung', address: 'Jl Makmur',  _rowVariant: 'success' },
        { name: 'La', relationship: 'Ibu Kandung', address: 'Jl Udin',  _rowVariant: 'success' },
        { name: 'Jojo', relationship: 'Teman', address: 'Jl No 1',  _rowVariant: 'success' },
        { name: 'Arep', relationship: 'Kakek', address: 'Jl Jr',  _rowVariant: 'success' },
        { name: 'Genos', relationship: 'Paman', address: 'Jl Cs',  _rowVariant: 'success' },

    ]

    export default {
        name: '',
        
        data() {
            return {
                tabIndex: [0, 0],
                tabs: [
                    'Data Pribadi',
                    'Kontak Darurat',
                    'Dok. Identitas',
                    'Data Usaha'
                ],
                DataBiayaOperasional : Data,
                BiayaOperasional :  [
                    { key: 'name', label: 'Nama', sortable: true },
                    { key: 'relationship', label: 'Hubungan'},
                    { key: 'address', label: 'Alamat'},
                    { key: 'action', label: 'Action' },

                ],
                currentPage: 1,
                perPage: 5,
                rowDataBiaya : Data.length,
                pageOptions: [5, 10, 15],
                bordered: true,
                selected: 'lk',
                options: [
                    { text: 'Laki-laki', value: 'lk' },
                    { text: 'Perempuan', value: 'pr' },
                ],
                statusKR: '3',
                optionsKR: [
                  {text: 'Sendiri ',value: '1'},
                  {text: 'Keluarga ',value: '2'},
                  {text: 'Sewa ',value: '3'}
                ],
                selectedAddress: '1',
                optionsAddress: [
                  {text: 'Sama dengan rumah',value: '1'},
                ],

            }
        }

    }


</script>

<style scoped>
    @import '../../assets/css/TabsCenter.css';
</style>
