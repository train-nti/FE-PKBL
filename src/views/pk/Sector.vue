<template>
  <div class="animated fadeIn">
      <div class="card">
          <div class="card-body">
              <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">RKA Tahun</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Pengesahan</label>
                  <div class="col-sm-6">
                      <input type="date" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Total Anggaran</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="1.500.000">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Keterangan</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Lampiran Dokumen</label>
                  <div class="col-sm-6">
                      <input type="file" id="" style="">
                  </div>
              </div>
              <!--<br>-->

              <b-tabs class="full-widths" v-model="tabIndex[0]">
                  <b-tab active>
                      <template slot="title">
                          <i class="icon-calculator"></i> {{tabs[0]}}
                      </template>
                      <br>
                      <b-table show-empty
                               stacked="md"
                               :items="items"
                               :bordered="bordered"
                               :fields="fields"
                               :current-page="currentPage1"
                               :per-page="perPage1">
                          <template slot="action" slot-scope="data">
                              <!-- <b-button @click="removeRow(data.item.index);">Remove</b-button>-->
                              <b-button variant="success" class="fa fa-check"></b-button>
                              <b-button variant="danger" class="fa fa-close"></b-button>

                          </template>

                      </b-table>

                      <b-row>
                          <b-col md="6" class="my-1">
                              <b-pagination :total-rows="totalRows"
                                            :per-page="perPage1"
                                            v-model="currentPage1"
                                            class="my-0" />
                          </b-col>
                      </b-row>
                        <b-button variant="primary">Save</b-button>
                  </b-tab>
                  <b-tab>
                      <template slot="title">
                          <i class="icon-basket-loaded"></i> {{tabs[1]}}
                      </template>
                      <br>
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
                        <b-button variant="primary">Save</b-button>
                  </b-tab>
                  <b-tab>
                      <template slot="title">
                          <i class="icon-pie-chart"></i> {{tabs[2]}}
                      </template>
                      <br>3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                  </b-tab>
                  <b-tab>
                      <template slot="title">
                          <i class="icon-pie-chart"></i> {{tabs[3]}}
                      </template>
                      <br>4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                  </b-tab>
              </b-tabs>

          </div>
      </div>
  </div>
</template>

<script>


    const items = [
        { name: 'Pertanian', amount: '2.500.000.000', action: '',  _rowVariant: 'success' },
        { name: 'Pertanian', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
        { name: 'Pertanian', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
        { name: 'Pertanian', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
        { name: 'Pertanian', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
        { name: 'Pertanian', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
        { name: 'Lala', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
    ]
    const Data = [
        { name: 'Test', amount: '500.000.000', action: '', _rowVariant: 'success', },
        { name: 'Test', amount: '500.000.000', action: '', _rowVariant: 'success' },
        { name: 'Test', amount: '500.000.000', action: '', _rowVariant: 'success' },
        { name: 'Test', amount: '500.000.000', action: '', _rowVariant: 'success' },


    ]

    export default {
        name: '',
        data() {
            return {
                tabIndex: [0, 0],
                tabs: [
                    'Penyaluran PK',
                    'Biaya Operasional PK',
                    'Penyaluran BL',
                    'Biaya Operasional BL'
                ],
                items: items,
                DataBiayaOperasional : Data,
                fields: [
                    { key: 'name', label: 'Sektor Usaha', sortable: true },
                    { key: 'amount', label: 'Anggaran'},
                    { key: 'action', label: 'Action' },
                ],
                BiayaOperasional :  [
                    { key: 'name', label: 'Sektor Usaha', sortable: true },
                    { key: 'amount', label: 'Anggaran'},
                    { key: 'action', label: 'Action' },

                ],
                currentPage: 1,
                perPage: 5,
                currentPage1: 1,
                perPage1: 5,
                rowDataBiaya : Data.length,
                totalRows: items.length,
                pageOptions: [5, 10, 15],
                bordered: true,



            }
        }

    }


</script>

<style scoped>
    @import '../../assets/css/TabsCenter.css';
</style>
