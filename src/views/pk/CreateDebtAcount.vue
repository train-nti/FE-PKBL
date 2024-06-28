<template>
    <div class="animated fadeIn">
        <div class="card">
            <div class="card-body">
                <div class="card-body">
                    <h4><strong>Akad Kredit</strong></h4>

                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nama Mitra Binaan</label>
                        <div class="col-sm-6">
                            <v-select v-model="debitAccount.DebCode" :options="options" :reduce="name => name.code" label="name" size="5"></v-select>
                            <p v-model="options"></p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Pinjaman ke</label>
                        <div class="col-sm-6">
                            <input type="number"  v-model="debitAccount.ChnlCode"  class="form-control" id="" placeholder="1">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Nomor surat perjanjian</label>
                        <div class="col-sm-6">
                            <input type="text" v-model="debitAccount.ContractNum" class="form-control" id="" placeholder="">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pinjaman</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" id="" placeholder="" v-model.number="debitAccount.DebValue">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Jasa Administrasi</label>
                        <div class="col-sm-6">
                            6%
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Tenor / Jangka Waktu Pinjaman</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" id="" placeholder="2 Bulan" v-model.number="debitAccount.Tenor">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Siklus Angsuran</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" id="" placeholder="3 Bulan" v-model.number="debitAccount.StlmCycle">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Cicilan Total per Siklus</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" id="" placeholder="4 Bulan">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Uraian Agunan</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="" placeholder="">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Taksiran Nilai Agunan</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" id="" placeholder="1.500.000">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Penandaan pihak PKBL</label>
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
                            <b-button variant="success" @click="save()">Save</b-button>
                        </div>
                    </div>
                    <!--<br>-->



                </div>




                <p></p>
                <b-card v-if="active">
                    <table class="table table-striped table-bordered table-hover">

                        <thead>
                            <tr>
                                <th @click="sort('DebCode')" class="text-center">Periode</th>
                                <th @click="sort('FullName')" class="text-center">Angsuran Bunga</th>
                                <th @click="sort('IDNumber')" class="text-center">Angsuran Pokok</th>
                                <th @click="sort('PlaceofBirth')" class="text-center">Total Angsuran</th>
                                <th class="text-center">Sisa pinjaman</th>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-for="data in flatCount">
                                <tr>
                                    <td v-html="data.Periode"></td>
                                    <td v-html="data.angsuranBunga"></td>
                                    <td v-html="data.angsuranPokok"></td>
                                    <td v-html="data.total"></td>
                                    <td v-html="data.sisa"></td>
                                </tr>
                            </template>
                        </tbody>

                    </table>
                    <!--<div v-for="data in coba2">
                        <span v-html="data"></span>

                    </div>-->
                </b-card>

            </div>
        </div>
    </div>
</template>

<script>
    import apiDebitor from '@/api/PK/DebitorApiService';
    import apiDebitAccount from '@/api/PK/DebitAccountApiService';
    import apiPKSurvey from '@/api/PK/PKSurveyApiService';
    import apiPKBussIncome from '@/api/PK/PKBussIncomeApiService';
    import vSelect from '../../../node_modules/vue-select/dist/vue-select'
    import '../../../node_modules/vue-select/dist/vue-select.css';
    import "../../../node_modules/vue-select/src/scss/vue-select.scss";
    import moment from '../../../node_modules/moment/moment'
    export default {
        name: '',
        components: { 'v-select': vSelect, },
        data() {
            return {
                debitorItems: {},
                debitAccount: {},
                                                                                                                                                                                                                                                                                                                                                                                                                                                         //test: {},
                //coba2: [],
                active: false,
                options: [],
                //f: {},
                flatCount:[],


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
                    this.debitorItems = await apiDebitor.getAll()

                    //this.itemsArray = () => this.items

                } finally {
                    this.loading = false
                }
            },
            async save() {
                var result
                var getPKSurvey = await apiPKSurvey.getByDaCode(this.debTransaction.DACode)
                var getPKBussIncome = await apiPKBussIncome.getByIdPKSurveyCode(getPKSurvey.Data[0].IdPKSurvey)
                if(getPKBussIncome.Data[0]){
                    var PKBussIncome = getPKBussIncome.Data[0]
                }
                this.active = true

                this.debitAccount.ContractDate = "2019/01/01"
                this.debitAccount.DACode = "A98"
                this.debitAccount.Refference = "tes"
                this.debitAccount.InterestRate = 6
                this.debitAccount.StlmBillvalue = 1
                this.debitAccount.SignOfficerName = "deno"
                this.debitAccount.OutstandingBal = 1
                this.debitAccount.Collateral = "A"
                this.debitAccount.CollEstValue = 1
                this.debitAccount.Arrears = 1
                this.debitAccount.LateFromDue = 1
                this.debitAccount.Collectability = 1
                this.debitAccount.IsCompleted = true
                this.debitAccount.CompleteDate = "2019/01/01"
                console.log("model", this.debitAccount)
               // result = await apiDebitAccount.create(this.debitAccount)
                //console.log("result ", result)
                var dataFlat = []
                var feeType = this.debTransaction.FeeType
                dataFlat  = this.perhitunganJasa(this.debTransaction.Tenor, this.debTransaction.DebValue
                                  , this.debTransaction.Interest, this.debTransaction.TransDate, this.debTransaction.DACode
                                  , this.debTransaction.StlmCycle,PKBussIncome.GracePeriod,feeType)
                console.log(dataFlat[0].Periode)
            },
            flat() {
                var getDateNow = [];
                var data
                var angsuranPokok, angsuranBunga, totalAngsuran, sisa;

                this.flatCount = [];

                for (var i = 1; i <= this.debitAccount.Tenor; i++) {
                    getDateNow = moment().add(i, 'M').format('MMMM YYYY')
                    angsuranBunga = this.debitAccount.DebValue * 6 / 100 / this.debitAccount.Tenor
                    angsuranPokok = this.debitAccount.DebValue / this.debitAccount.Tenor
                    totalAngsuran = angsuranBunga + angsuranPokok
                    sisa = this.debitAccount.DebValue - (i * angsuranPokok)
                    data = this.flatCount.push({ Periode: getDateNow, angsuranPokok: angsuranPokok, angsuranBunga: angsuranBunga, total: totalAngsuran, sisa: sisa })

                }
                return this.flatCount
            }
        }
    }


</script>

<style scoped>
    @import '../../assets/css/TabsCenter.css';

</style>
