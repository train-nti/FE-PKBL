<template>
<div class="">
  <div class="card">
    <div class="card-body">

      <button type="button" v-b-modal.modal-1 class="btn btn-success">
          Input Baru
      </button>
      <table class="table table-striped table-bordered table-hover">

          <thead>
              <tr>
                <th class="text-center">No</th>
                <th class="text-center">Tahun Anggaran</th>
                <th class="text-center">Tanggal Pengesahan</th>
                <th class="text-center">Nilai Total</th>
                <th class="text-center">Biaya Operasional</th>
                <th class="text-center">Sumber Dana</th>
                <th class="text-center">Aksi</th>
                <!-- <th class="text-center">Example</th>
                  <th class="text-center">Example</th> -->
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <!-- <td></td> -->
              </tr>
          </thead>

          <tbody>

          </tbody>

      </table>

      <b-modal ref="modal-1" id="modal-1" title="Prosess Pencairan" size="lg" hide-footer ok-only>
        <!-- <h4><strong>Akad Kredit</strong></h4> -->

        <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Tahun Anggaran</label>
            <div class="col-sm-3">
                <input type="text" v-model="BudgetingItems.Year" class="form-control" id="" placeholder="">
            </div>
        </div>

        <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Tanggal Pengesahan</label>
            <div class="col-sm-10">
                <input type="date" v-model="BudgetingItems.ApproveDate"  class="form-control" id="" placeholder="">
            </div>
        </div>

        <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Nilai Total</label>
            <div class="col-sm-10">
                <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="BudgetingItems.TotalBudget"></vue-numeric>

            </div>
        </div>


        <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Biaya Operasional</label>
            <div class="col-sm-10">
                <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="BudgetingItems.Operasional"></vue-numeric>
            </div>
        </div>
        <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Keterangan</label>
            <div class="col-sm-10">
                <input type="text" v-model="BudgetingItems.Description"  class="form-control" id="" placeholder="">
            </div>
        </div>

        <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Dokumen Referensi</label>
            <div class="col-sm-10">
                <input type="text"  class="form-control" id="" placeholder="">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-2">
                <!-- <b-button variant="success">Button</b-button> -->
            </div>
            <div class="col-sm-4">
                <!-- <b-button variant="primary">Load BPM</b-button> -->
                <b-button variant="success" @click="save()">Simpan</b-button>
            </div>
        </div>
                    <b-tabs class="full-widths" v-model="tabIndex2[0]">
                      <b-tab active>
                        <template slot="title">
                          <i class="icon-calculator"></i> {{tabsInputPencarian[0]}}

                        </template>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Sumber Dana</label>
                            <div class="col-sm-10">
                                <!-- <v-select v-model=".DebCode" @input="gege()" :options="options" :reduce="name => name.code" label="name" size="5"></v-select>
                                <p v-model="options"></p> -->
                                <input type="text"  class="form-control" id="" placeholder="example">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Nilai Anggaran</label>
                            <div class="col-sm-10">
                                <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="PKBudget"></vue-numeric>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Biaya Operasional</label>
                            <div class="col-sm-10">
                              <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="PKOps"></vue-numeric>
                                <!-- <input type="text" v-model.number="PKOps" class="form-control" id="" placeholder="example"> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-2">
                                <!-- <b-button variant="success">Button</b-button> -->
                            </div>
                            <div class="col-sm-4">
                                <!-- <b-button variant="primary">Load BPM</b-button> -->
                                <b-button variant="success" @click="">Simpan</b-button>
                            </div>
                        </div>
                      </b-tab>
                      <b-tab active>
                        <template slot="title">
                          <i class="icon-calculator"></i> {{tabsInputPencarian[1]}}

                        </template>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Sumber Dana</label>
                            <div class="col-sm-10">
                                <!-- <v-select v-model=".DebCode" @input="gege()" :options="options" :reduce="name => name.code" label="name" size="5"></v-select>
                                <p v-model="options"></p> -->
                                <input type="text"  class="form-control" id="" placeholder="example">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Nilai Anggaran</label>
                            <div class="col-sm-10">
                                <!-- <v-select v-model=".DebCode" @input="gege()" :options="options" :reduce="name => name.code" label="name" size="5"></v-select>
                                <p v-model="options"></p> -->
                                <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="BLBudget"></vue-numeric>
                                <!-- <input type="text"  v-model.number="BLBudget" class="form-control" id="" placeholder="example"> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Biaya Operasional</label>
                            <div class="col-sm-10">
                                <!-- <v-select v-model=".DebCode" @input="gege()" :options="options" :reduce="name => name.code" label="name" size="5"></v-select>
                                <p v-model="options"></p> -->
                                <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="BLOps"></vue-numeric>
                                <!-- <input type="text"  v-model.number="BLBudget" class="form-control" id="" placeholder="example"> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-2">
                                <!-- <b-button variant="success">Button</b-button> -->
                            </div>
                            <div class="col-sm-4">
                                <!-- <b-button variant="primary">Load BPM</b-button> -->
                                <b-button variant="success" @click="">Simpan</b-button>
                            </div>
                        </div>
                      </b-tab>
                    </b-tabs>
        <!--<br>-->

      </b-modal>

    </div>
  </div>
</div>
</template>
<script>
// import budget from '@/api/BL/BudgetingApiService';
import VueNumeric from 'vue-numeric';
import editTables from '../../../components/EditTables'
export default {
  name : '',
  components: { 'vue-numeric' : VueNumeric,
                'editTable' : editTables},
  data() {
    return {

      tabIndex2: [0, 0],

      tabsInputPencarian : [
        'Kemitraan',
        'Bina Lingkungan'
      ],
      BudgetingItems : {},
      PKBudget : 0,
      BLBudget : 0,
      BLOps : 0,
      PKOps: 0,
      TotalOps : 0,
    }
  },
  methods: {
    async save(){
      this.BudgetingItems.PKBudget = this.PKBudget
      this.BudgetingItems.BLBudget = this.BLBudget
      this.BudgetingItems.BLOps = this.BLOps
      this.BudgetingItems.PKOps = this.PKOps
      this.BudgetingItems.TotalOps = this.TotalOps
      var data = await budget.create(this.BudgetingItems)
      console.log(  this.BudgetingItems)
    }
  }

}
</script>
<style scoped>

    @import '../../../assets/css/TabsCenter.css';

</style>
