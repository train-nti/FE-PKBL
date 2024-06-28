<template>
    <div class="animated fadeIn">
        <div class="card">
            <div class="card-body">

              <b-row>
                  <b-col md="4"><b-button @click="showModal" variant="primary">Add Pencairan</b-button></b-col>
                  <b-col md="4" offset-md="4">
                      <div class="input-group">
                          <input placeholder="Filter by No Persetujuan" icon="search" v-model="filter">
                          <span class="input-group-btn">
                              <button class="btn btn-outline-success bg-success" type="submit" style="height:35px"><i class="fa fa-search"></i></button>
                          </span>
                      </div>
                  </b-col>

              </b-row>
              <br>

              <b-modal ref="modal-1" id="modal-1" title="DebtAccount" size="xl" hide-footer ok-only>
        <div class="form-group row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Perjanjian</label>
      <div class="col-sm-6">
          <input type="text" class="form-control" id="" placeholder="example">
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
          <input type="text" class="form-control" id="" placeholder="example">
      </div>
  </div>
  <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Rekening</label>
      <div class="col-sm-6">
          <input type="text" class="form-control" id="" placeholder="example">
      </div>
  </div>
  <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Nama Pemilik Rekening</label>
      <div class="col-sm-6">
          <input type="text" class="form-control" id="" placeholder="example">
      </div>
  </div>
  <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Rekening Sumber Dana</label>
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
                  </b-modal>
              <table class="table table-striped table-bordered table-hover">

                  <thead>
                      <tr>
                          <th @click="sort('DebCode')" class="text-center">No</th>
                          <th @click="sort('FullName')" class="text-center">No Persetujuan</th>
                          <th @click="sort('IDNumber')" class="text-center">Tgl Persetujuan</th>
                          <th @click="sort('PlaceofBirth')" class="text-center">Nama Pemohon</th>
                          <th class="text-center">Aksi</th>
                      </tr>
                  </thead>

                  <tbody>
                      <template v-for="(data, index) in filterData" v-bind:value="index">
                          <tr>
                              <td>{{ index+1 }}</td>
                              <td>{{ data.ContractNum }}</td>
                              <td>{{ formatDate(data.ContractDate) }}</td>
                              <td>{{ data.DebName }}</td>
                              <td class="text-center">
                                  <button type="button" class="btn btn-primary" @click="">
                                      <i class="fa fa-eye"></i>
                                  </button>
                                  <button type="button" v-b-modal.modal-1 class="btn btn-success" @click="">
                                      <i class="fa fa-pencil "></i>
                                  </button>
                                  <button type="button" class="btn btn-danger" @click="">
                                      <i class="fa fa-trash"></i>
                                  </button>

                              </td>

                          </tr>


                      </template>
                  </tbody>

              </table>

              <b-button @click="prevPage" variant="primary">Previous</b-button>
              <b-button disabled variant="outline-primary">{{currentPage}}</b-button>
              <b-button @click="nextPage" variant="primary">Next</b-button>


            </div>
            </div>
        </div>
</template>

<script>
    import debitor from '@/api/PK/DebitorApiService';
    import apiDebitor from '@/api/PK/DebitorApiService';
    import apiDebitAccount from '@/api/PK/DebitAccountApiService';
    import apiInstSchedule from '@/api/PK/InstScheduleApiService';
    import vSelect from '../../../../node_modules/vue-select/dist/vue-select';
    import '../../../../node_modules/vue-select/dist/vue-select.css';
    import "../../../../node_modules/vue-select/src/scss/vue-select.scss";
    import moment from '../../../../node_modules/moment/moment';
    import VueNumeric from 'vue-numeric';
    export default {
        name: '',
        components: { 'v-select': vSelect,
                      'vue-numeric' : VueNumeric  },
        data() {
            return {
              debitorItems: [],
              debitAccount: {},
              //test: {},
              filter: '',
              //coba2: [],
              pageSize: 10,
              currentPage: 1,
              active: false,
              options: [],
              //f: {},
              currentSort: 'ContractNum',
              currentSortDir: 'asc',
              flatCount:[],
              test : '',
              price: '',
              optionsStlmCycle: [
         { value: 1, text: 'Bulanan' },
         { value: 2, text: 'Dua Bulan' },
         { value: 3, text: 'Triwulan' },

       ],
              myDate : moment().format('YYYY-MM-DD'),
            };
        },
        async created() {
            moment.locale('id');
            this.getAll()


        },
        methods: {
          async getAll() {
              var c = await apiDebitor.getAll()
              //console.log(c);

              this.loading = true
              this.options = [];
              for (var i = 0; i < c.Data.length; i++) {

                  this.options.push({ code: c.Data[i].DebCode, name: c.Data[i].FullName });

              }
              //console.log(this.options);
              try {
                var debitorData = await apiDebitAccount.getAll()
                console.log(debitorData);
                for (var i = 0; i < debitorData.Data.length; i++) {
                  var debitor = await apiDebitor.getOne(debitorData.Data[i].DebCode);
                  console.log(debitor);
                  debitorData.Data[i].DebName = debitor.Data[0].FullName
                }

                this.debitorItems = debitorData.Data
                  // console.log("test ", debitorData);
                  //this.itemsArray = () => this.items

              } finally {
                  this.loading = false
              }
          },
          gege(){
            this.debitAccount.DebValue = 25000000;
          },
          showModal() {
              this.$refs['modal-1'].show();
              this.setActive = false;
              this.customers = {};
              this.emerg = {};
              this.EmergItems = {};
              this.id = null;

          },
          nextPage: function () {
              if ((this.currentPage * this.pageSize) < this.debitorItems.length) this.currentPage++;
          },
          prevPage: function () {
              if (this.currentPage > 1) this.currentPage--;
          },

          sort: function (s) {
              //if s == current sort, reverse
              if (s === this.currentSort) {
                  this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
              }
              this.currentSort = s;
          },
          rndStr(len) {
    	       let text = " "
    	       let chars = "abcdefghijklmnopqrstuvwxyz0123456789"

             for( let i=0; i < len; i++ ) {
				     text += chars.charAt(Math.floor(Math.random() * chars.length))}
			       return text
		         },
             formatCurrency(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatDate(value) {
        return moment(String(value)).format('YYYY-MM-DD')
    },
          async save() {
            // var result = await apiDebitAccount.getAll()
              var result
              this.active = true

              this.debitAccount.ContractDate = "2000-04-19 00:00:00.000"
              this.debitAccount.DACode = this.rndStr(5)
              // this.debitAccount.ChnlCode = Null,
              // this.debitAccount.DebCode = this.rndStr(7)
              // this.debitAccount.Refference = "tes"
              this.debitAccount.InterestRate = 6
              // this.debitAccount.StlmBillvalue = 1
              this.debitAccount.SignOfficerName = "deno"
              this.debitAccount.OutstandingBal = 1
              this.debitAccount.Collateral = "A"
              // this.debitAccount.CollEstValue = 1
              this.debitAccount.Arrears = 1
              this.debitAccount.LateFromDue = 1
              this.debitAccount.Collectability = 1
              this.debitAccount.IsCompleted = true
              // this.debitAccount.CompleteDate = "2019/01/01"
              // console.log("coba data ", this.price)
              // console.log("model", this.debitAccount)
             // result = await apiDebitAccount.create(this.debitAccount)
              // console.log("results ", );
              var insertDebitAccount = await apiDebitAccount.create(this.debitAccount)
              console.log("debit ", this.debitAccount)
              var dataFlat = this.calculate(this.debitAccount.Tenor, this.debitAccount.DebValue, this.debitAccount.InterestRate,this.debitAccount.DACode)

              var insertInsSchedule = await apiInstSchedule.create(dataFlat)
              console.log("inst ", insertInsSchedule)
          },
          calculate(tenor, nilai, sukuBunga, DACode) {
              var getDateNow = [];
              var data
              var angsuranPokok, angsuranBunga, totalAngsuran, sisa, sequence;

              this.flatCount = [];

              for (var i = 1; i <= tenor; i++) {
                  getDateNow = moment().add(i, 'M').format('MMMM YYYY')
                  sequence = parseInt(moment().add(i, 'M').format('M'), 10)
                  angsuranBunga = nilai * sukuBunga / 100 / tenor
                  angsuranPokok = nilai / tenor
                  totalAngsuran = angsuranBunga + angsuranPokok
                  sisa = nilai - (i * angsuranPokok)
                  data = this.flatCount.push({ Periode: getDateNow, SettValue: angsuranPokok, InterestVal: angsuranBunga, TotalBill: totalAngsuran, sisa: sisa, Sequence : i, DACode: DACode  })

              }
              // console.log("coba ", this.flatCount)
              return this.flatCount
          }

        },
        computed: {
          filterData: function () {
              return this.debitorItems.sort((a, b) => {
                  let modifier = 1;
                  if (this.currentSortDir === 'desc') modifier = -1;
                  if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                  if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                  return 0;
              }).filter((row, index) => {
                  let start = (this.currentPage - 1) * this.pageSize;
                  let end = this.currentPage * this.pageSize;
                  if (index >= start && index < end) return true;
                  }).filter((item) => {

                     // console.log(item)
                      return item.ContractNum.toLowerCase().includes(this.filter.toLowerCase());

                  //var search = this.search;
                  //if (!search) {
                  //    return data;
                  //}

                  //search = search.trim().toLowerCase();
              });
          }
        },
//         watch: {
//     debitAccount.DebCode: function () {
//         this.debitAccount.DebValue = 25000000;
//     }
// }

    }


</script>

<style scoped>
    /* @import '../../assets/css/TabsCenter.css'; */
</style>
