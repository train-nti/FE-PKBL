<template>
  <div class="animated fadeIn">
      <div class="card">
          <div class="card-body">
            <h4><strong>Bank Account Reconciliation</strong></h4>
              <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Akun Bank</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="BCA">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Periode</label>
                  <div class="col-sm-2">
                      <input type="date" class="form-control" id="" placeholder="" value="03/03/2019">
                  </div>
                  <div class="col-sm-1">
                    <center><span>Sampai Dengan</span></center>
                  </div>
                  <div class="col-sm-2">
                      <input type="date" class="form-control" id="" placeholder="" value="10/03/2019">
                  </div>
                  <div class="col-sm-1">
                    <b-button variant="primary">Load</b-button>
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
              <div class="form-group row">
                  <div class="col-sm-4">
                    <b-button variant="primary">Insert General</b-button>
                    <b-button variant="primary">Insert Installment</b-button>
                  </div>

              </div>

          </div>
      </div>
  </div>
</template>

<script>


    const items = [
        { date: '05/03/2019', description: 'Previous Balance', bankReff:'', debet:'', credit:'', balance:'', action: '', _rowVariant: 'success' },
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
                    { key: 'date', label: 'Date', sortable: true },
                    { key: 'description', label: 'Description'},
                    { key: 'bankReff', label: 'Bank Reff'},
                    { key: 'debet', label: 'Debet'},
                    { key: 'credit', label: 'Credit'},
                    { key: 'balance', label: 'Balance'},
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
