<template>
  <div class="animated fadeIn">
      <div class="card">
          <div class="card-body">
              <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Metode Pembayaran</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="cash" value="Bank Transfer" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Akun Bank</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="" value="BNI 3216549870" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Bank Referensi</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="BCA">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Total Pendapatan</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="1.500.000">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Kustomer</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label"></label>
                  <div class="col-sm-6">
                      <b-form-checkbox-group v-model="selected" name="flavour1a" :options="options" />
                  </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-2">
                    <!-- <b-button variant="success">Button</b-button> -->
                </div>
                  <div class="col-sm-4">
                      <!-- <b-button variant="primary">Load BPM</b-button> -->
                      <b-button variant="primary">Calculate</b-button>
                      <b-button variant="primary">Save Unidentified</b-button>
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

              <b-row>
                  <b-col md="6" class="my-1">
                      <b-pagination :total-rows="totalRows"
                                    :per-page="perPage"
                                    v-model="currentPage"
                                    class="my-0" />
                  </b-col>
              </b-row>
  <b-button variant="primary">Save</b-button>
          </div>
      </div>
  </div>
</template>

<script>


    const items = [
        { seq: '14', date: '07/02/2019', installmentVal:'525.000', interest:'75.000',total:'650.000', action: '', _rowVariant: 'success' },
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
                    { key: 'seq', label: 'Seq', sortable: true },
                    { key: 'date', label: 'Due Date'},
                    { key: 'installmentVal', label: 'Installment Val'},
                    { key: 'interest', label: 'Interest'},
                    { key: 'total', label: 'Total'},
                    { key: 'action', label: 'Action' },


                ],
                selected: ['1'], // Must be an array reference!
        options: [
          { text: 'Unidentified', value: '1' },

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
