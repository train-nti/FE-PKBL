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
          <cTables :isBusy="loading" :items="ListOfSudahPersetujuan" :fields="fieldsSudahPerjanjian">
            <template slot-scope="{ row }">
              <b-button pill variant="primary" size="md" @click="edit(row)" v-b-tooltip.hover title="Lihat Jadwal Pembayaran">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>

          <b-modal :id="editModalPerjanjian[0].id" :title="editModalPerjanjian[0].title" size="xl" hide-footer ok-only>
            <!-- <h4><strong>Akad Kredit</strong></h4> -->
            <b-form @submit="savePerjanjian">
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Mitra Binaan</label>
                <div class="col-sm-10">
                    <input type="text"  v-model="ItemBelumAkad.DANumber" disabled value="ItemBelumAkad.DebCode" class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Nama Mitra Binaan</label>
                <div class="col-sm-10">
                    <input type="text"  v-model="ItemBelumAkad.FullName" disabled value="ItemBelumAkad.DebCode" class="form-control" id="" placeholder="">
                </div>
            </div>

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Alamat</label>
                <div class="col-sm-10">
                    <input type="text"  v-model="ItemBelumAkad.Address" disabled class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Perjanjian</label>
                <div class="col-sm-10">
                    <input type="text" v-model="ItemBelumAkad.ContractDateFormat" disabled class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Rencana Tanggal Pencairan</label>
                <div class="col-sm-10">
                    <!-- <input type="date" v-model="ItemBelumAkad.DateRealisasi" required @input="tglPerhitungan" class="form-control" id="" placeholder=""> -->
                    <date-picker v-model="ItemBelumAkad.DateRealisasi":input-attr="{ required: true }"  format="DD/MMM/YYYY" lang="id" ></date-picker>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Tagihan Setiap</label>
                <div class="col-sm-10">
                  <input type="number"  v-model.number="ItemBelumAkad.StlmCycle" required @input="tglPerhitungan" class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Jatuh Tempo / bulan</label>
                <div class="col-sm-10">
                    <input type="number" disabled v-model="TanggalPerhitungan.Tagihan" class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Jatuh Tempo</label>
                <div class="col-sm-10">
                    <input type="text" v-model="TanggalPerhitungan.JatuhTempo" disabled class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Mulai Bayar</label>
                <div class="col-sm-10">
                    <input type="text" disabled v-model="TanggalPerhitungan.MulaiBayar" class="form-control" id="" placeholder="">
                </div>
            </div>

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pinjaman</label>
                <div class="col-sm-10">
                    <input type="text" v-model="ItemBelumAkad.DebValueNum" disabled class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword"  class="col-sm-2 col-form-label">Jangka Waktu</label>
                <div class="col-sm-10">
                    <input type="text" disabled v-model="ItemBelumAkad.Tenor +' ' + '(dalam bulan)'" class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword"  class="col-sm-2 col-form-label">Persentase Jasa (%)</label>
                <div class="col-sm-10">
                    <input type="text" disabled v-model="ItemBelumAkad.InterestRate" class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Tagihan Jasa</label>
                <div class="col-sm-10">
                  <input type="text" disabled v-model="ItemBelumAkad.FeeType" class="form-control" id="" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Grace</label>
                <div class="col-sm-10">
                    <input type="number" disabled v-model="ItemBelumAkad.Grace" class="form-control" id="" placeholder="">
                </div>
            </div>



            <div class="form-group row">
                <div class="col-sm-2">
                </div>
                <div class="col-sm-4">
                    <b-button type="submit"  variant="info" >Generate</b-button>
                </div>
            </div>
            </b-form>
            <!--<br>-->
            <b-card v-if="active">
              <div class="table-responsive">
                <table id="basic-table" class="table table-striped table-hover">

                    <thead>
                        <tr>
                            <th  class="text-center">Angsuran Ke</th>
                            <th  class="text-center">Tanggal Tagihan</th>
                            <th  class="text-center">Hutang Pokok (a)</th>
                            <th class="text-center">Jasa Admin (b)</th>
                            <th class="text-center">Total Angsuran (a+b)</th>
                            <!-- <th  class="text-center">Jumlah Hutang Pokok</th>
                            <th class="text-center">Jumlah Jasa Admin</th>
                            <th class="text-center">Jumlah Total Angsuran</th> -->
                            <th  class="text-center">Sisa Pokok</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td class="positionRight">{{formatCurrency(ItemBelumAkad.DebValue)}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>

                        <template v-for="data in Calculate">
                            <tr>
                              <td v-html="data.Sequence"></td>
                              <td v-html="formatDateDMY(data.Periode)"></td>
                              <td v-html="formatCurrency(data.SettValue)" class="positionRight"></td>
                              <td v-html="formatCurrency(data.InterestVal)" class="positionRight"></td>
                              <td v-html="formatCurrency(data.TotalBill)" class="positionRight"></td>
                              <td v-html="formatCurrency(data.sisaPokok)" class="positionRight"></td>
                            </tr>
                        </template>
                        <tr>
                          <td></td>
                          <td>Total</td>
                          <td v-html="formatCurrency(Calculate[(Calculate.length-1)].sumAngsuranPokok)" class="positionRight"></td>
                          <td v-html="formatCurrency(Calculate[(Calculate.length-1)].sumAngsuranBunga)" class="positionRight"></td>
                          <td v-html="formatCurrency(Calculate[(Calculate.length-1)].sumAngsuranTotal)" class="positionRight"></td>
                          <td></td>
                        </tr>

                    </tbody>

                </table>
              </div>
                <button class="btn btn-outline-danger my-2 my-sm-0" @click="exportPDF()">
                  <i style="margin-right: 5px;" class="fa fa-file-pdf-o"></i>
                  Print Pdf</button>
            </b-card>
          </b-modal>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</div>
</template>

<script>
  import moment from '../../../../node_modules/moment/moment';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiPKSurvey from '@/api/PK/PKSurveyApiService';
  import apiPKBussIncome from '@/api/PK/PKBussIncomeApiService';
  import VueNumeric from 'vue-numeric';
  import cTables from '@/components/Tables';
  import jsPDF from 'jspdf'
  import 'jspdf-autotable';
export default {
  name: 'perjanjian',
  components: { 'vue-numeric' : VueNumeric,
                  'cTables': cTables},
  data() {
    return {
      tabIndex: [0, 0],
      tabs: [
        'Daftar Jadwal Pembayaran'
      ],
      optionsStlmCycle: [
         { value: 1, text: 'Bulanan' },
         // { value: 2, text: 'Dua Bulan' },
         // { value: 3, text: 'Triwulan' },
            ],
      active: false,
      ItemBelumAkad:{
        Grace : 0,
        InterestRate : 0,
        StlmCycle : 0,
        FeeType : ''
      },
      ListOfSudahPersetujuan : [],
      myDate : moment().format('DD-MM-YYYY'),
      sisaPokokRealisasi : '',
      Calculate : [],
      //
      TanggalPerhitungan : {},
      editModalPerjanjian: [{
        id: 'perjanjian',
        title: 'Jadwal Pembayaran'
      }],
      fieldsSudahPerjanjian: [{
          key: 'No',
          label: 'No',
          sortable: true
        },
        {
          key: 'FullName',
          label: 'Nama Mitra Binaan',
          sortable: true
        },
        {
          key: 'DANumber',
          label: 'Nomor Mitra Binaan',
          sortable: true
        },
        {
          key: 'ContractDateFormat',
          label: 'Tanggal Perjanjian',
          sortable: true
        },
        {
          key: 'Instance',
          label: 'Nama Usaha',
          sortable: true
        },
        {
          key: 'InterestRateCalculate',
          label: 'Persentase Jasa (%)',
          sortable: true
        },
        {
          key: 'Tenor',
          label: 'JK Waktu',
          sortable: true
        },
        {
          key: 'DebValueNum',
          label: 'Nilai Disetujui',
          sortable: true,
          tdClass: 'positionRight'
        },
        {
          key: 'actions',
          label: 'Buat Jadwal'
        },
      ],

    }
  },
  async created() {
      // moment.locale('id')
      this.getAll()

  },
  watch: {
   'ItemBelumAkad.DateRealisasi' : function (val, oldVal) { //watcher on data updated
     this.tglPerhitungan()
   }
},
  methods: {
    async getAll(){
      this.loading = true
      let region = this.getSession('cabang');
      let ListOfSudahPersetujuan = await apiDebitAccount.ListOfPersetujuan(region,0);
      for (var i = 0; i < ListOfSudahPersetujuan.Data.length; i++) {
        ListOfSudahPersetujuan.Data[i].No = i + 1
        ListOfSudahPersetujuan.Data[i].FullName = ListOfSudahPersetujuan.Data[i].Debitor.FullName
        ListOfSudahPersetujuan.Data[i].Instance = ListOfSudahPersetujuan.Data[i].Debitor.Instance
        ListOfSudahPersetujuan.Data[i].Address = ListOfSudahPersetujuan.Data[i].Debitor.Address
        ListOfSudahPersetujuan.Data[i].InterestRateCalculate = (ListOfSudahPersetujuan.Data[i].FeeType) ?  ListOfSudahPersetujuan.Data[i].InterestRate + " " + ListOfSudahPersetujuan.Data[i].FeeType : ListOfSudahPersetujuan.Data[i].InterestRate + ""
        ListOfSudahPersetujuan.Data[i].ContractDate = this.formatDate(ListOfSudahPersetujuan.Data[i].ContractDate)
        ListOfSudahPersetujuan.Data[i].ContractDateFormat = this.formatDateDMY(ListOfSudahPersetujuan.Data[i].ContractDate)
        ListOfSudahPersetujuan.Data[i].DebValueNum = this.formatCurrency(ListOfSudahPersetujuan.Data[i].DebValue)


      }

      this.ListOfSudahPersetujuan = ListOfSudahPersetujuan.Data
      this.loading = false

    },
    async edit(data){
      var getPKSurvey = await apiPKSurvey.getByDaCode(data.DACode)
      console.log(getPKSurvey)

      var getPKBussIncome = await apiPKBussIncome.getByIdPKSurveyCode(getPKSurvey.Data[0].IdPKSurvey)
      if(getPKBussIncome.Data[0]){
          var PKBussIncome = getPKBussIncome.Data[0]
          console.log(PKBussIncome);

          data.Grace = parseInt(PKBussIncome.GracePeriod)

      }
      else {
        data.Grace = 0
      }
      console.log(data,"data");
      if (data.StlmCycle == 0 || !data.StlmCycle) {
        data.StlmCycle = 1
      }
      this.active = false
      this.ItemBelumAkad = data
      this.TanggalPerhitungan = {}
      // let tgl = this.datesCalculate(data.Tenor, data.ContractDate)

      this.$root.$emit('bv::show::modal', this.editModalPerjanjian[0].id)

    },
    savePerjanjian(evt){
      evt.preventDefault()
      this.debTransaction = this.ItemBelumAkad

      // console.log(data.IdPKSurvey);
      // this.Calculate = this.slidingRate(data.Tenor, data.DebValue, data.InterestRate, data.ContractDate, data.DACode, data.StlmCycle)
      if (this.debTransaction.StlmCycle == 0) {
        this.showNotifWarning('Tagihan Setiap Tidak Boleh 0')
      } else {
        this.Calculate = []
        var feeType = this.debTransaction.FeeType
        this.Calculate  = this.perhitunganJasa(this.debTransaction.Tenor, this.debTransaction.DebValue
                          , this.debTransaction.InterestRate, this.debTransaction.DateRealisasi, this.debTransaction.DACode
                          , this.debTransaction.StlmCycle,this.debTransaction.Grace,feeType)
        this.active = true
      }


    },
    tglPerhitungan(){
      let tgl = this.datesCalculate(this.ItemBelumAkad.Tenor, this.ItemBelumAkad.DateRealisasi,this.ItemBelumAkad.StlmCycle,this.ItemBelumAkad.Grace,this.ItemBelumAkad.FeeType)
      tgl[0].Tagihan = parseInt(tgl[0].Tagihan)
      console.log("tgl",tgl);
      this.TanggalPerhitungan = tgl[0]
      this.TanggalPerhitungan.JatuhTempo = this.formatDateDMY(this.TanggalPerhitungan.JatuhTempo)
      this.TanggalPerhitungan.MulaiBayar = this.formatDateDMY(this.TanggalPerhitungan.MulaiBayar)

    },
    exportPDF() {
        var doc = new jsPDF('p', 'pt');
        var elem = document.getElementById('basic-table');
        let pageNumber = doc.internal.getNumberOfPages();

doc.autoTable({
  startY: 30,
  body: [
    ["Nomor Mitra Binaan", this.ItemBelumAkad.DANumber],
    ["Nama", this.ItemBelumAkad.FullName],
    ["Jumlah Pinjaman", this.ItemBelumAkad.DebValueNum],
    ["Persentase Jasa", this.ItemBelumAkad.InterestRate + ' %'],
    ["Jangka Waktu", this.ItemBelumAkad.Tenor],
    ["Jenis Bunga", this.ItemBelumAkad.FeeType],
    ["Detail Jatuh Tempo", this.ItemBelumAkad.StlmCycle > 1 ? 'Yarnen/Lainnya ' + this.ItemBelumAkad.StlmCycle + ' Bulan' : this.ItemBelumAkad.StlmCycle + ' Bulan']
  ],

  bodyStyles: { valign: "top" },
  styles: { overflow: "hidden", cellWidth: "wrap" },
  columnStyles: { text: { cellWidth: "auto" } },
  margin: { right: 107 },
  theme: "plain"
});

doc.setPage(pageNumber);

        const header = function(data) {
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.setFontStyle('normal');
          doc.text('Simulasi Jadwal Pembayaran', data.settings.margin.left , 50);
        };
        const options = {
        // beforePageContent: header,
        margin: {
          top: 80
        },
        styles: {
            halign: 'right'
        },
      };
        var res = doc.autoTableHtmlToJson(elem);
        doc.autoTable(res.columns, res.data, options);

        doc.save("jadwal_pembayaran_nomor_mitra_binaan_"+this.ItemBelumAkad.DANumber+".pdf");
}


  },
  // computed : {
  //
  // }



}
</script>

<style>
@import '../../../assets/css/TabsCenter.css';
.positionRight {
 text-align:right;
}
</style>
