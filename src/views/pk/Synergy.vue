<template>
  <div class="animated fadeIn">
      <div class="card">
          <div class="card-body">
              <form @submit.prevent="saveData">
                  <div class="form-group row">
                      <label for="staticEmail" class="col-sm-2 col-form-label">Kode Channel</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="">
                          <b-form-input type="text" v-model="model.name"></b-form-input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Nama Organisasi</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Alamat</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="Blok AA no 10">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Telepon</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="081xxxxxxx">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Nama</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">e-mail</label>
                      <div class="col-sm-6">
                          <input type="email" class="form-control" id="" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Nomor MoU</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal MoU</label>
                      <div class="col-sm-6">
                          <input type="date" class="form-control" id="" placeholder="example">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Validasi MoU Hingga</label>
                      <div class="col-sm-6">
                          <input type="date" class="form-control" id="" placeholder="example">
                      </div>
                  </div>

                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Minat</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Keterangan</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="" placeholder="">
                      </div>
                  </div>

                  <!--<br>-->
                  <b-button variant="primary">Save</b-button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>


    export default {
        name: '',

        data() {
            return {

                records: [],
                model: {}
            };
        },

    }


</script>

<style scoped>
    @import '../../assets/css/TabsCenter.css';
</style>
