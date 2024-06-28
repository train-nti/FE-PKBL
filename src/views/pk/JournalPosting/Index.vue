<template>
    <div class="animated fadeIn">
        <div class="card">
            <div class="card-body">



                      <b-row>

                          <b-col md="4" offset-md="8">
                              <div class="input-group">
                                  <input placeholder="Filter by Nama" icon="search" v-model="filter">
                                  <span class="input-group-btn">
                                      <button class="btn btn-outline-success bg-success" type="submit" style="height:35px"><i class="fa fa-search"></i></button>
                                  </span>
                              </div>
                          </b-col>

                      </b-row>
                      <br>
                      <table class="table table-striped table-bordered table-hover">

                          <thead>
                              <tr>
                                <th @click="sort('DebCode')" class="text-center">Nomor Mitra Binaan</th>
                                <th @click="sort('FullName')" class="text-center">Nama Lengkap</th>
                                <th @click="sort('IDNumber')" class="text-center">Nomor KTP</th>
                                <th @click="sort('PlaceofBirth')" class="text-center">Tempat Lahir</th>
                                <th @click="sort('PlaceofBirth')" class="text-center">Status</th>
                                  <th class="text-center">Aksi</th>
                              </tr>
                          </thead>

                          <tbody>
                              <template v-for="(data, index) in filterData" v-bind:value="index">
                                  <tr>
                                    <td>{{ data.DebCode }}</td>
                                    <td>{{ data.FullName }}</td>
                                    <td>{{ data.IDNumber }}</td>
                                    <td>{{ data.PlaceofBirth }}</td>
                                    <td>Approved</td>
                                      <td class="text-center">
                                          <!-- <button type="button" class="btn btn-primary" @click="">
                                              <i class="fa fa-eye"></i>
                                          </button> -->
                                          <button type="button" v-b-modal.modal-1 class="btn btn-success" @click="editBelumAkad(data.DebCode)">
                                              <i class="fa fa-pencil "></i>
                                          </button>
                                          <!-- <button type="button" class="btn btn-danger" @click="">
                                              <i class="fa fa-trash"></i>
                                          </button> -->
                                      </td>
                                  </tr>
                              </template>
                          </tbody>

                      </table>

                      <b-button @click="prevPage" variant="primary">Previous</b-button>
                      <b-button disabled variant="outline-primary">{{currentPage}}</b-button>
                      <b-button @click="nextPage" variant="primary">Next</b-button>








              <!-- <b-row>
                  <b-col md="4"><b-button @click="showModal" variant="primary">Add DebtAccount</b-button></b-col>
                  <b-col md="4" offset-md="4">
                      <div class="input-group">
                          <input placeholder="Filter by No Persetujuan" icon="search" v-model="filter">
                          <span class="input-group-btn">
                              <button class="btn btn-outline-success bg-success" type="submit" style="height:35px"><i class="fa fa-search"></i></button>
                          </span>
                      </div>
                  </b-col>

              </b-row>
              <br> -->





              <b-modal ref="modal-1" id="modal-1" title="Akad" size="lg" hide-footer ok-only>
                <!-- <h4><strong>Akad Kredit</strong></h4> -->

                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Nama Mitra Binaan</label>
                    <div class="col-sm-10">
                        <!-- <v-select v-model="debitAccount.DebCode" @input="gege()" :options="options" :reduce="name => name.code" label="name" size="5"></v-select>
                        <p v-model="options"></p> -->
                        <input type="text"  v-model="debitAccount.FullName" disabled value="debitAccount.DebCode" class="form-control" id="" placeholder="example">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Pinjaman ke</label>
                    <div class="col-sm-10">
                        <input type="text"  v-model="debitAccount.ChnlCode"  class="form-control" id="" placeholder="example">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Nomor surat perjanjian</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="debitAccount.ContractNum" class="form-control" id="" placeholder="example">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Refference</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="debitAccount.Refference" class="form-control" id="" placeholder="example">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal surat perjanjian</label>
                    <div class="col-sm-10">
                        <input type="date" v-model="myDate" class="form-control" id="" placeholder="example">
                    </div>

                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pinjaman</label>
                    <div class="col-sm-10">
                        <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="debitAccount.DebValue"></vue-numeric>
                    </div>
                    <!-- <vue-numeric currency="" separator="." v-bind:precision="2" v-model="debitAccount.DebValue"></vue-numeric> -->
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Jasa Administrasi</label>
                    <div class="col-sm-10">
                        6%
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Tenor / Jangka Waktu Pinjaman</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" id="" placeholder="example" v-model.number="debitAccount.Tenor">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Siklus Angsuran</label>
                    <div class="col-sm-10">
                        <!-- <input type="number" class="form-control" id="" placeholder="example" v-model.number="debitAccount.StlmCycle"> -->
                        <b-form-select v-model.number="debitAccount.StlmCycle" :options="optionsStlmCycle"></b-form-select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Cicilan Total per Siklus</label>
                    <div class="col-sm-10">
                        <!-- <input type="text" class="form-control" id="" placeholder="example"> -->
                        <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="debitAccount.StlmBillvalue"></vue-numeric>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Uraian Agunan</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="" placeholder="example">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Taksiran Nilai Agunan</label>
                    <div class="col-sm-10">
                        <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="debitAccount.CollEstValue"></vue-numeric>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Penanda tangan pihak PKBL</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"  v-model="debitAccount.SignOfficerName" id="" placeholder="example">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-2">
                        <!-- <b-button variant="success">Button</b-button> -->
                    </div>
                    <div class="col-sm-4">
                        <!-- <b-button variant="primary">Load BPM</b-button> -->
                        <b-button variant="success" @click="save()">Save</b-button>
                    </div>
                </div>
                <!--<br>-->
                <b-card v-if="active">
                    <table class="table table-striped table-bordered table-hover">

                        <thead>
                            <tr>
                                <th  class="text-center">Periode</th>
                                <th  class="text-center">Angsuran Bunga</th>
                                <th  class="text-center">Angsuran Pokok</th>
                                <th  class="text-center">Total Angsuran</th>
                                <th class="text-center">Sisa pinjaman</th>
                                <th class="text-center">Sisa pinjaman</th>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-for="data in flatCount">
                                <tr>
                                    <td v-html="data.Periode"></td>
                                    <td v-html="formatCurrency(data.InterestVal)"></td>
                                    <td v-html="formatCurrency(data.SettValue)"></td>
                                    <td v-html="formatCurrency(data.TotalBill)"></td>
                                    <td v-html="formatCurrency(data.sisa)"></td>
                                    <td v-html="data.Sequence"></td>
                                </tr>
                            </template>
                        </tbody>

                    </table>
                    <!--<div v-for="data in coba2">
                        <span v-html="data"></span>

                    </div>-->
                </b-card>
              </b-modal>


              <b-modal ref="modal-multi-2" id="modal-multi-2" title="Pencairan" size="lg" hide-footer ok-only>
    <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Perjanjian</label>
        <div class="col-sm-10">
            <input type="text" v-model="debTransaction.ContractNum" value="debTransaction.ContractNum" disabled class="form-control" id="" placeholder="example">
        </div>
    </div>
    <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Nama Mitra Binaan</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="debTransaction.FullName"  disabled class="form-control" id="" placeholder="example">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pencairan</label>
                    <div class="col-sm-10">
                        <input type="text"  v-model="debTransaction.DebValue" disabled class="form-control" id="" placeholder="example">
                    </div>
                </div>

                <!-- <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Cara Pencairan</label>
                    <div class="col-sm-10">
                      <b-form-radio-group id="basicInlineRadios"

                        :options="[
                          {text: 'Tunai / Cash ',value: 'a'},
                          {text: 'Transfer ', value: 'b'}

                        ]"
                        >
                      </b-form-radio-group>
                    </div>
                </div> -->

                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Rekening pada Bank</label>
                    <div class="col-sm-10">
                      <v-select  v-model="debTransaction.BankCode" :options="BankItems" :reduce="Name => Name.Code" label="Name" size="5"></v-select>
                      <!-- <p v-model="BankItems"></p> -->
                    </div>

                </div>

                <!-- <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Rekening</label>
                    <div class="col-sm-10">
                      <input type="text"  class="form-control" id="" placeholder="example">
                    </div>
                    </div>

                    <div class="form-group row">
                   <label for="inputPassword" class="col-sm-2 col-form-label">Nama Pemilik Rekening</label>
                   <div class="col-sm-10">
                       <input type="text"  class="form-control" id="" placeholder="example">
                   </div>
               </div> -->

               <div class="form-group row">
                   <label for="inputPassword" class="col-sm-2 col-form-label">Akun Penyaluran</label>
                   <div class="col-sm-10">
                       <v-select  v-model="debTransaction.AccountSectCode" :options="accountSect" :reduce="Name => Name.Code" label="Name" size="5"></v-select>
                   </div>
               </div>

               <div class="form-group row">
                    <div class="col-sm-2">
                        <!-- <b-button variant="success">Button</b-button> -->
                    </div>
                    <div class="col-sm-4">
                        <!-- <b-button variant="primary">Load BPM</b-button> -->
                        <b-button variant="success" @click="savePencairan()">Save</b-button>
                    </div>
              </div>
  </b-modal>

                <!-- <table class="table table-striped table-bordered table-hover">

                    <thead>
                        <tr>
                          <th @click="sort('DebCode')" class="text-center">Nomor Mitra Binaan</th>
                          <th @click="sort('FullName')" class="text-center">Nama Lengkap</th>
                          <th @click="sort('IDNumber')" class="text-center">Nomor KTP</th>
                          <th @click="sort('PlaceofBirth')" class="text-center">Tempat Lahir</th>
                          <th @click="sort('PlaceofBirth')" class="text-center">Status</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-for="(data, index) in filterData" v-bind:value="index">
                            <tr>
                              <td>{{ data.DebCode }}</td>
                              <td>{{ data.FullName }}</td>
                              <td>{{ data.IDNumber }}</td>
                              <td>{{ data.PlaceofBirth }}</td>
                              <td>Approved</td>
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
                <b-button @click="nextPage" variant="primary">Next</b-button> -->



            </div>
            </div>
        </div>
</template>

<script>
  import debitor from '@/api/PK/DebitorApiService';
  import apiDebTransaction from '@/api/PK/DebTransactionApiService';
  import account from '@/api/AKAccountApiService';
  import apijournal from '@/api/AKJournalApiService';
  import apijournalItems from '@/api/AKJournalItemApiService';
    import apiDebitor from '@/api/PK/DebitorApiService';
    import apiDebitAccount from '@/api/PK/DebitAccountApiService';
    import apiInstSchedule from '@/api/PK/InstScheduleApiService';
    import moment from '../../../../node_modules/moment/moment';
    import VueNumeric from 'vue-numeric';
    import vSelect from '../../../../node_modules/vue-select/dist/vue-select';
    import '../../../../node_modules/vue-select/dist/vue-select.css';
    import "../../../../node_modules/vue-select/src/scss/vue-select.scss";

    export default {
        name: '',
        components: { 'v-select': vSelect,
                      'vue-numeric' : VueNumeric  },
        data() {
            return {
              BankItems : [],
              belumAkad: [],
              belumCair: [],
              accountSect:[],
              accountSectItem:{},
              debitAccount: {},
              debitAccountItems:{},
              debTransaction: {},
              filter: '',
              pageSize: 10,
              currentPage: 1,
              active: false,
              options: [],
              currentSort: 'ContractNum',
              currentSortDir: 'asc',
              flatCount:[],
              dataJournal:{},
              dataJournalItem:{},
              test : '',
              price: '',

              optionsStlmCycle: [
                 { value: 1, text: 'Bulanan' },
                 { value: 2, text: 'Dua Bulan' },
                 { value: 3, text: 'Triwulan' },
                    ],
               tabIndex: [0, 0],
               tabs: [
                 'Belum Akad',
                 'Sudah Akad dan Belum Pencairan',
               ],
              myDate : moment().format('YYYY-MM-DD'),
            };
        },
        async created() {
            moment.locale('id')
            this.getAll()

        },
        methods: {
          async getAll() {

              this.loading = true

              try {

                var getBank = await account.getCode('1.112')
                var getAccount = await account.getCode('1.136')
                var belumAkad = await apiDebitAccount.belumAkad()
                var belumCair = await apiDebitAccount.belumCair()

                for (var i = 0; i < belumCair.Data.length; i++) {
                  var debitor = await apiDebitor.getOne(belumCair.Data[i].DebCode);
                  belumCair.Data[i].FullName = debitor.Data[0].FullName
                }

                this.BankItems = getBank
                this.accountSect = getAccount
                this.belumAkad = belumAkad.Data
                this.belumCair = belumCair.Data
                console.log("data", belumAkad.Data[0])

              } finally {
                  this.loading = false
              }
          },


          nextPage: function () {
              if ((this.currentPage * this.pageSize) < this.belumAkad.length) this.currentPage++;
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
              async editBelumCair(data){
              this.debTransaction = {}
              this.debTransaction.ContractNum = data.ContractNum
              this.debTransaction.DebValue = data.DebValue
              this.debTransaction.FullName = data.FullName
              this.debTransaction.DACode = data.DACode
              this.debTransaction.InstSeq = data.Tenor
              this.debTransaction.Interest = data.InterestRate
              },
            async editBelumAkad(data){
              var result = await apiDebitor.getOne(data)
              this.debitAccount = {}
              this.debitAccount.FullName = result.Data[0].FullName
              this.debitAccount.DebCode = result.Data[0].DebCode
            },
             async savePencairan(){

              this.accountSectItem.DACode = this.debTransaction.DACode
              this.accountSectItem.IsDebet = 0
              this.accountSectItem.TransValue = this.debTransaction.DebValue
              this.accountSectItem.InstSeq = 0
              this.accountSectItem.Interest = this.debTransaction.Interest
              this.accountSectItem.Description = ""

              this.dataJournal.JournalNumber = this.rndStr(5)
              this.dataJournal.Description = "Piutang dari pencairan"
              this.dataJournal.JournalDate = moment()
              this.dataJournal.JournalItems = []
              this.dataJournal.JournalItems.push({
                AccountCode : this.debTransaction.AccountSectCode,
                IsDebet : 1,
                ItemValue : this.debTransaction.DebValue
              })
              this.dataJournal.JournalItems.push({
                AccountCode : this.debTransaction.BankCode,
                IsDebet : 0,
                ItemValue : this.debTransaction.DebValue
              })



              var insertDebTransaction = await apiDebTransaction.create(this.accountSectItem)
              if (insertDebTransaction.Status) {
                var journal = await apijournal.create(this.dataJournal)
                console.log("journal a ", journal)
                if (journal.Status) {
                  var balanceBank = await account.countBalanceBank(this.debTransaction.BankCode, this.debTransaction.DebValue)
                  var balanceAccSect = await account.countBalanceSect(this.debTransaction.AccountSectCode, this.debTransaction.DebValue)
                }
              }


              this.getAll()
              // this.$refs['modal-multi-2'].hide()
            },
          async save() {
            console.log("lala",this.myDate )
            this.debitAccountItems = {}
            this.debitAccountItems.DACode =  this.rndStr(5)
            this.debitAccountItems.DebCode = this.debitAccount.DebCode
            this.debitAccountItems.ChnlCode = this.debitAccount.ChnlCode
            this.debitAccountItems.ContractNum = this.debitAccount.ContractNum
            this.debitAccountItems.ContractDate = this.myDate
            this.debitAccountItems.DebValue = this.debitAccount.DebValue
            this.debitAccountItems.Refference = this.debitAccount.Refference
            this.debitAccountItems.Tenor = this.debitAccount.Tenor
            this.debitAccountItems.InterestRate = 6
            this.debitAccountItems.StlmCycle = this.debitAccount.StlmCycle
            this.debitAccountItems.StlmBillvalue = this.debitAccount.StlmBillvalue
            this.debitAccountItems.SignOfficerName = this.debitAccount.SignOfficerName
            this.debitAccountItems.OutstandingBal = 0
            this.debitAccountItems.CollEstValue = this.debitAccount.CollEstValue
            this.debitAccountItems.Arrears = 0
            this.debitAccountItems.LateFromDue = 0
            this.debitAccountItems.Collectability = 0
            this.debitAccountItems.IsCompleted = 0

            var insertDebitAccount = await apiDebitAccount.create(this.debitAccountItems)
            var dataFlat = this.calculate(this.debitAccount.Tenor, this.debitAccount.DebValue, this.debitAccount.InterestRate,this.debitAccountItems.DACode)

            var insertInsSchedule = await apiInstSchedule.create(dataFlat)

            this.getAll()
            this.$refs['modal-1'].hide()

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
              return this.belumAkad.sort((a, b) => {
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
                      return item.FullName.toLowerCase().includes(this.filter.toLowerCase());

                  //var search = this.search;
                  //if (!search) {
                  //    return data;
                  //}

                  //search = search.trim().toLowerCase();
              });
          },
          filterDataBelumCair: function () {
              return this.belumCair.sort((a, b) => {
                  let modifier = 1;
                  if (this.currentSortDir === 'desc') modifier = -1;
                  // if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                  // if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                  return 0;
              }).filter((row, index) => {
                  let start = (this.currentPage - 1) * this.pageSize;
                  let end = this.currentPage * this.pageSize;
                  if (index >= start && index < end) return true;
                  }).filter((item) => {

                     // console.log(item)
                      return item.DebCode.toLowerCase().includes(this.filter.toLowerCase());

                  //var search = this.search;
                  //if (!search) {
                  //    return data;
                  //}

                  //search = search.trim().toLowerCase();
              });
          },

        },
//         watch: {
//     debitAccount.DebCode: function () {
//         this.debitAccount.DebValue = 25000000;
//     }
// }

    }


</script>

<style scoped>

    @import '../../../assets/css/TabsCenter.css';

</style>
