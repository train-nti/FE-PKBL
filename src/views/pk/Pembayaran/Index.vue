<template>
<div class="">
  <div class="card">
    <div class="card-body">
      <b-tabs class="full-widths" v-model="tabIndex[0]">
        <b-tab active>
          <template slot="title">
            <i class="icon-calculator"></i> {{tabs[0]}}
          </template>
          <br>
          <table class="table table-striped table-bordered table-hover">

              <thead>
                  <tr>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Progress</th>
                    <!-- <th class="text-center">Example</th>
                      <th class="text-center">Example</th> -->
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <b-progress :max="max" height="2rem" variant="success" animated=true>
       <b-progress-bar :value="value">
         Bulan: <strong>{{ value.toFixed(0) }} / {{ max }}</strong>
       </b-progress-bar>
     </b-progress>
                    </td>
                    <!-- <td></td> -->
                  </tr>
              </thead>

              <tbody>

              </tbody>

          </table>
        </b-tab>

        <b-tab>
          <template slot="title">
            <i class="icon-basket-loaded"></i> {{tabs[1]}}
          </template>
          <br>
          <table class="table table-striped table-bordered table-hover">

              <thead>
                  <tr>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                      <th class="text-center">Example</th>
                  </tr>
              </thead>

              <tbody>

              </tbody>

          </table>
        </b-tab>

        <b-tab>
          <template slot="title">
            <i class="icon-basket-loaded"></i> {{tabs[2]}}
          </template>
          <br>
          <table class="table table-striped table-bordered table-hover">

              <thead>
                  <tr>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                    <th class="text-center">Example</th>
                      <th class="text-center">Example</th>
                  </tr>
              </thead>

              <tbody>

              </tbody>

          </table>
        </b-tab>

      </b-tabs>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      tabIndex: [0, 0],
      tabs: [
        'Sudah Lunas',
        'Belum',
        'Bermasalah'
      ],
      value: 3,
        max: 12
    }
  }

}
</script>
<style scoped>

    @import '../../../assets/css/TabsCenter.css';

</style>
