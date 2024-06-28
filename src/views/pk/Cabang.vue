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
                      <input type="date" class="form-control" id="" placeholder="example">
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

              <b-table show-empty
                       stacked="md"
                       :items="items"
                       :bordered="bordered"
                       :fields="fields"
                       :current-page="currentPage"
                       :per-page="perPage">
                  <template slot="action" slot-scope="data">
                      <!-- <b-button @click="removeRow(data.item.index);">Remove</b-button>-->
                      <b-button variant="success" class="fa fa-check"></b-button>
                      <b-button variant="danger" class="fa fa-close"></b-button>

                  </template>

              </b-table>
              <b-button variant="primary">Save</b-button>
              <b-row>
                  <b-col md="6" class="my-1">
                      <b-pagination :total-rows="totalRows"
                                    :per-page="perPage"
                                    v-model="currentPage"
                                    class="my-0" />
                  </b-col>
              </b-row>

          </div>
      </div>
  </div>
</template>

<script>


    const items = [
        { name: 'Pertanian', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
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
                fields: [
                    { key: 'name', label: 'Sektor Usaha', sortable: true },
                    { key: 'amount', label: 'Anggaran'},
                    { key: 'action', label: 'Action' },


                ],
                currentPage: 1,
                perPage: 5,
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
