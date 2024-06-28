<template>
<div class="">
  <div class="card">
    <div class="card-body">
      <b-form @submit="save">
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Usulan Kredit (Rp)</label>
          <div class="col-sm-10">
            <!-- <input type="text" v-model="item.DebValue" class="form-control" id="" placeholder=""> -->
            <money required class="form-control" v-model="item.DebValue" v-bind="money"></money>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Persentase Jasa (%)</label>
          <div class="col-sm-10">
            <input type="text" required v-model.number="item.InterestRate" class="form-control" id="" placeholder="">
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Jangka Waktu</label>
          <div class="col-sm-10">
            <input required type="text" v-model.number="item.Tenor" class="form-control" id="" placeholder="">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Sistem Jasa</label>
          <div class="col-sm-10">
            <b-form-select required v-model.number="item.FeeType" :options="optionsStlmCycle"></b-form-select>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Tanggal Perkiraan Pencairan</label>
          <div class="col-sm-10">
            <date-picker v-model="item.EstimateDate" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
            <!-- <input required type="date" v-model="item.EstimateDate" class="form-control" id="" placeholder=""> -->
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Tagihan Setiap</label>
          <div class="col-sm-10">
            <input required type="text" v-model.number="item.StlmCycle" class="form-control" id="" placeholder="dalam bulan">

          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Grace Periode</label>
          <div class="col-sm-10">
            <input required type="text" v-model.number="item.Grace" class="form-control" id="" placeholder="">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-2">
          </div>
          <div class="col-sm-4">
            <b-button type="submit" variant="primary">Generate</b-button>
            <b-button variant="danger" @click="reset">Reset</b-button>
          </div>
        </div>
      </b-form>
      <b-card v-if="active">
        <table class="table table-striped table-bordered table-hover">

          <thead>
            <tr>
              <th class="text-center">Angsuran Ke</th>
              <th class="text-center">Tanggal Tagihan</th>
              <th class="text-center">Hutang Pokok (a)</th>
              <th class="text-center">Jasa Admin (b)</th>
              <th class="text-center">Total Angsuran (a+b)</th>
              <!-- <th  class="text-center">Jumlah Hutang Pokok</th>
                        <th class="text-center">Jumlah Jasa Admin</th>
                        <th class="text-center">Jumlah Total Angsuran</th> -->
              <th class="text-center">Sisa Pokok</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>{{formatCurrency(item.DebValue)}}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <template v-for="data in Calculate">
              <tr>
                <td v-html="data.Sequence"></td>
                <td v-html="formatDateDMY(data.Periode)"></td>
                <td  style="text-align: right;"  v-html="formatCurrency(data.SettValue)"></td>
                <td  style="text-align: right;"  v-html="formatCurrency(data.InterestVal)"></td>
                <td  style="text-align: right;"  v-html="formatCurrency(data.TotalBill)"></td>
                <td  style="text-align: right;"  v-html="formatCurrency(data.sisaPokok)"></td>
              </tr>
            </template>
            <tr>
              <td colspan="2">Total</td>
              <td  style="text-align: right;"  v-html="formatCurrency(Calculate[(Calculate.length-1)].sumAngsuranPokok)"></td>
              <td  style="text-align: right;"  v-html="formatCurrency(Calculate[(Calculate.length-1)].sumAngsuranBunga)"></td>
              <td  style="text-align: right;"  v-html="formatCurrency(Calculate[(Calculate.length-1)].sumAngsuranTotal)"></td>
              <td></td>
            </tr>

          </tbody>

        </table>
      </b-card>
    </div>
  </div>
</div>
</template>

<script>
import moment from '../../../node_modules/moment/moment';
export default {
  data() { 
    return { 
      optionsStlmCycle: [{
        value: "Sliding Rate",
        text: 'Sliding Rate'
      },
      {
        value: "Flat Rate",
        text: 'Flat Rate'
      }, ],
      item: {},
      active: false,
      Calculate: [],
      item: {
        Tenor: 0,
        DebValue: 0,
        InterestRate: 0,
        StlmCycle: 0,
        Grace: 0
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    }
  },
  async created() {
    moment.locale('id')
    this.fetch()
  },
  methods: {
    async fetch(){
      this.item.InterestRate = await this.getSukuBunga();
    },
    save(evt) {
      evt.preventDefault()
      let tgl = this.formatDateDMY(this.item.EstimateDate)
      this.Calculate = []
      var feeType = this.item.FeeType
      this.Calculate = this.perhitunganJasa(this.item.Tenor, this.item.DebValue, this.item.InterestRate, this.item.EstimateDate, "SIMULASI", this.item.StlmCycle, this.item.Grace, feeType)
      this.active = true
    },
    reset() {
      this.active = false
    },
  },
  // mounted(){
  //   this.InterestRate = this.setSukuBunga
  // }
}
</script>

<style lang="css" scoped>
</style>
