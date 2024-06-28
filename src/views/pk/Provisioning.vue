<template>
  <div class="animated fadeIn">
      <div class="card">
          <div class="card-body">
            <h4><strong>Pencairan Pinjaman</strong></h4>

              <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Perjanjian</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Nama Mitra Binaan</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="example" value="Aman Sulaeman" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pencairan</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="example" value="25.000.000" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Cara Pencairan</label>
                  <div class="col-sm-6">
                    <b-form-radio-group id="basicInlineRadios"

                      :options="[
                        {text: 'Tunai / Cash ',value: 'a'},
                        {text: 'Transfer ',value: 'b'},

                      ]"
                      :checked="c">
                    </b-form-radio-group>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Rekening pada Bank</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Rekening</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Nama Pemilik Rekening</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Rekening Sumber Dana</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="">
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
              <!--<br>-->



          </div>
      </div>
  </div>
</template>

<script>


    export default {
        name: '',
        // components: {  'b-table' : BTable, },
        data() {
            return {
            }
        }

    }


</script>

<style scoped>
    /* @import '../../assets/css/TabsCenter.css'; */
</style>
