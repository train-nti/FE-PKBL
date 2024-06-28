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

          <cTables :isBusy="isBusy" :infoModal="infoModalBelumPerjanjian" :items="ListBelumAkad" :fields="fieldsPerjanjian">
            <template slot-scope="{ row }">
              <b-button pill variant="primary" size="md" @click="editBelumAkad(row)" v-b-tooltip.hover title="Proses Perjanjian">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>

          <b-modal :id="editModalPerjanjian[0].id" :title="editModalPerjanjian[0].title" size="lg" hide-footer ok-only>
            <b-form @submit="savePerjanjian">
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Mitra Binaan *</label>
              <div class="col-sm-10">
                <input type="text" v-model="ItemBelumAkad.DANumber" disabled value="ItemBelumAkad.DebCode" class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nama Mitra Binaan *</label>
              <div class="col-sm-10">
                <input type="text" v-model="ItemBelumAkad.FullName" disabled value="ItemBelumAkad.DebCode" class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Pinjaman ke</label>
              <div class="col-sm-10">
                <input type="number" v-model="ItemBelumAkad.DebSequence" class="form-control" id="" placeholder="Pinjaman ke">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nomor surat perjanjian *</label>
              <div class="col-sm-10">
                <input type="text" v-model="ItemBelumAkad.ContractNum" class="form-control" id="" placeholder="Nomor Surat Perjanjian" required>
              </div>
            </div>
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Refference</label>
                <div class="col-sm-10">
                    <input type="text" v-model="ItemBelumAkad.Refference" class="form-control" id="" placeholder="example">
                </div>
            </div> -->
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal surat perjanjian *</label>
              <div class="col-sm-10">
                <!-- <input type="date" v-model="myDate" class="form-control" id="" placeholder="Tanggal"> -->
                <date-picker value-type="YYYY-MM-DD" v-model="myDate"  :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" format="DD/MMM/YYYY" lang="id" ></date-picker>
                {{myDate}}
              </div>

            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pinjaman *</label>
              <div class="col-sm-10">
                <input type="text" v-model="ItemBelumAkad.DebValue" class="form-control" id="" placeholder="" disabled>
              </div>

            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Jasa Administrasi</label>
              <div class="col-sm-10">
                <input type="text" v-model="ItemBelumAkad.InterestRate + '%'" class="form-control" id="" placeholder="" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tenor / Jangka Waktu Pinjaman *</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" id="" placeholder="example" v-model.number="ItemBelumAkad.Tenor" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Perhitungan Jasa</label>
              <div class="col-sm-10">
                <input type="text" v-model="ItemBelumAkad.FeeType" class="form-control" id="" placeholder="" disabled>
              </div>
            </div>
            <!-- <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Siklus Angsuran</label>
              <div class="col-sm-10">
                <input type="text" v-model="ItemBelumAkad.StlmCycle + ' (dalam bulan)'" class="form-control" id="" placeholder="" disabled>

              </div>
            </div> -->
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Lokasi Penyimpanan Jaminan</label>
              <div class="col-sm-5">
                <b-form-group>
                    <b-form-radio-group style="padding: 0.375rem 0.75rem; text-align: center;" v-model="ItemBelumAkad.Location" :options="options" name="radio-inline"></b-form-radio-group>
                </b-form-group>

              </div>
              <div class="col-sm-5" v-if="ItemBelumAkad.Location == 'other'">
                <input type="text" v-model="ItemBelumAkad.AnotherLocation" class="form-control" id="" placeholder="">

              </div>
            </div>
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Cicilan Total per Siklus</label>
                <div class="col-sm-10">
                    <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="ItemBelumAkad.StlmBillvalue" disabled></vue-numeric>
                </div>
            </div> -->
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Uraian Agunan</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="" placeholder="example">
                </div>
            </div> -->
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Taksiran Nilai Agunan</label>
                <div class="col-sm-10">
                    <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="ItemBelumAkad.CollEstValue"></vue-numeric>
                </div>
            </div> -->
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Penanda tangan pihak PKBL</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="ItemBelumAkad.SignOfficerName" id="" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-4">
                <b-button variant="info" :disabled="activeBtnSave" type="submit">Proses</b-button>
              </div>
            </div>
          </b-form>
          </b-modal>





        </b-tab>

        <b-tab>
          <template slot="title">
            <i class="icon-basket-loaded"></i> {{tabs[1]}}
          </template>
          <br>
          <br>
          <cTables :isBusy="loading" :items="ListOfSudahPersetujuan" :fields="fieldsSudahPerjanjian">
            <template slot-scope="{ row }">
              <b-button pill variant="danger" @click="modalBatal(row)" size="md" v-b-tooltip.hover title="Batal Perjanjian PK">
                <i class="fa fa-trash"></i>
              </b-button>
              <b-button pill variant="primary" size="md" @click="koreksi(row)" v-b-tooltip.hover title="Edit">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>

          <b-modal :id="koreksiModal[0].id" :title="koreksiModal[0].title" size="lg" hide-footer ok-only>
            <b-form @submit="saveKoreksi">
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Mitra Binaan *</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.DANumber" disabled value="koreksiItems.DebCode" class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nama Mitra Binaan *</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.FullName" disabled value="koreksiItems.DebCode" class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Pinjaman ke</label>
              <div class="col-sm-10">
                <input type="number" v-model="koreksiItems.DebSequence" disabled class="form-control" id="" placeholder="Pinjaman ke">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nomor surat perjanjian *</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.ContractNum" disabled class="form-control" id="" placeholder="Nomor Surat Perjanjian" required>
              </div>
            </div>
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Refference</label>
                <div class="col-sm-10">
                    <input type="text" v-model="koreksiItems.Refference" class="form-control" id="" placeholder="example">
                </div>
            </div> -->
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal surat perjanjian *</label>
              <div class="col-sm-10">
                <!-- <input type="date" v-model="myDate" class="form-control" id="" placeholder="Tanggal"> -->
                <date-picker value-type="YYYY-MM-DD" v-model="koreksiItems.ContractDate":input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" :format="momentFormat" lang="id" ></date-picker>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nilai Pinjaman *</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.DebValue" class="form-control" id="" placeholder="" disabled>
              </div>

            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Jasa Administrasi</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.InterestRate + '%'" class="form-control" id="" placeholder="" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tenor / Jangka Waktu Pinjaman *</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" id="" placeholder="example" v-model.number="koreksiItems.Tenor" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Perhitungan Jasa</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.FeeType" class="form-control" id="" placeholder="" disabled>
              </div>
            </div>
            <!-- <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Siklus Angsuran</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.StlmCycle + ' (dalam bulan)'" class="form-control" id="" placeholder="" disabled>

              </div>
            </div> -->
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Lokasi Penyimpanan Jaminan</label>
              <div class="col-sm-5">
                <b-form-group>
                    <b-form-radio-group style="padding: 0.375rem 0.75rem; text-align: center;" disabled v-model="koreksiItems.LoanStorage" :options="options" name="radio-inline"></b-form-radio-group>
                </b-form-group>

              </div>
              <div class="col-sm-5" v-if="koreksiItems.LoanStorage !== 'bank' && koreksiItems.LoanStorage !== 'office'">;

                <input type="text" v-model="koreksiItems.AnotherLoanStorage" class="form-control" id="" placeholder="" disabled>

              </div>
            </div>
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Cicilan Total per Siklus</label>
                <div class="col-sm-10">
                    <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="ItemBelumAkad.StlmBillvalue" disabled></vue-numeric>
                </div>
            </div> -->
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Uraian Agunan</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="" placeholder="example">
                </div>
            </div> -->
            <!-- <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Taksiran Nilai Agunan</label>
                <div class="col-sm-10">
                    <vue-numeric currency="" class="form-control" output-type="Number" separator="." :empty-value="0" v-bind:precision="0" v-model="ItemBelumAkad.CollEstValue"></vue-numeric>
                </div>
            </div> -->
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Penanda tangan pihak PKBL</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" disabled v-model="koreksiItems.SignOfficerName" id="" placeholder="">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-4">
                <b-button variant="info" :disabled="activeBtnSave" type="submit">Update</b-button>
              </div>
            </div>
          </b-form>
          </b-modal>

          <!-- modal batal -->
          <b-modal :id="batalModal.id" :title="batalModal.title" :size="batalModal.size">
            <p>Anda yakin ingin membatalkan Perjanjian PK ? <br>
            </p>
            <template v-slot:modal-footer>
                <div class="w-100">
                  <b-button  variant="danger" @click="$bvModal.hide(batalModal.id)" class="float-right">
                      Tidak
                  </b-button>
                  <b-button  variant="primary" :disabled="activeBtnSave" @click="batalPerjanjianPK(batalItems)" class="float-right" style="margin-right:20px;">
                      Ya
                  </b-button>
                </div>
              </template>
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
import VueNumeric from 'vue-numeric';
import cTables from '@/components/Tables';

export default {
  name: 'perjanjian',
  components: {
    'vue-numeric': VueNumeric,
    'cTables': cTables
  },
  data() {
    return {
      momentFormat: {
     // Date to String
     stringify: (date) => {
       return date ? moment(date).format('DD/MMM/YYYY') : ''
     },
     // String to Date
     parse: (value) => {
       return value ? moment(value, 'DD/MMM/YYYY').toDate() : null
     }
   },
      koreksiItems : {},
      koreksiModal:[{
        id: 'koreksiModal',
        title: 'Koreksi Perjanjian PK'
      }],
      batalItems:{},
      batalModal : {
        id: 'batalModal',
        title: 'Batal Perjanjian PK',
        size: 'md'
      },
      //Btn disabled
      activeBtnSave : false,
      configConfirm:null,
      textConfirm:null,
      selected : 0,
      tabIndex: [0, 0],
      tabs: [
        'Perjanjian',
        'List Perjanjian'
      ],
      isBusy: false,
      loading : false,
      options: [
          { text: 'Kantor', value: 'office' },
          { text: 'Bank', value: 'bank' },
          { text: 'Lainnya', value: 'other' },
        ],
      ItemBelumAkad: {},
      ListBelumAkad: [],
      ListOfSudahPersetujuan: [],
      itemPerjanjian: {},
      myDate: null,
      titleOfPersetujuan: ['No', 'Nama Mitra Binaan', 'Nama Perusahaan', 'Alamat', 'Nilai Pengajuan', ' Buat Pengajuan'],
      titleOfListPersetujuan: ['No', 'No Persetujuan', 'Tanggal Persetujuan', 'Nama Mitra Binaan', 'Nama Perusahaan', 'Alamat', 'Nilai Pengajuan', ' Aksi'],

      //Belum Akad/Perjanjian
      infoModalBelumPerjanjian: [{
        id: 'belumPersetujuan',
        title: 'Perjanjian'
      }],
      editModalPerjanjian: [{
        id: 'perjanjian',
        title: 'Proses Perjanjian'
      }],
      fieldsPerjanjian: [{
          key: 'No',
          label: 'No',
          sortable: true
        },
        {
          key: 'FullName',
          label: 'Nama Pemohon',
          sortable: true
        },
        {
          key: 'DANumber',
          label: 'Nomor Mitra Binaan',
          sortable: true
        },
        {
          key: 'Instance',
          label: 'Nama Usaha',
          sortable: true
        },
        {
          key: 'Address',
          label: 'Alamat',
          sortable: true
        },
        {
          key: 'DebValue',
          label: 'Nilai Disetujui',
          sortable: true,
          tdClass: 'positionRight'
        },
        {
          key: 'StatusApprove',
          label: 'Status'
        },
        {
          key: 'actions',
          label: 'Aksi'
        },
      ],

      //Sudah akad
      fieldsSudahPerjanjian: [{
          key: 'No',
          label: 'No',
          sortable: true
        },
        {
          key: 'FullName',
          label: 'Nama Pemohon',
          sortable: true
        },
        {
          key: 'DANumber',
          label: 'Nomor Mitra Binaan',
          sortable: true
        },
        {
          key: 'ContractDate',
          label: 'Tanggal Perjanjian',
          sortable: true
        },
        {
          key: 'Instance',
          label: 'Nama Usaha',
          sortable: true
        },
        {
          key: 'Address',
          label: 'Alamat',
          sortable: true
        },
        {
          key: 'DebValue',
          label: 'Nilai Disetujui',
          sortable: true,
          tdClass: 'positionRight'
        },
        {
          key: 'actions',
          label: 'Aksi'
        },
      ],

    }
  },
  async created() {
    moment.locale('id')
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.getAll()

  },
  methods: {
    disabledDate(date) {
     return date >= this.getClosingDate().startDate && date <= this.getClosingDate().endDate
   },
    async getAll() {

      try {
        let region = localStorage.cabang
        this.getAllBelumPerjanjian(region)
        this.getAllSudahPerjanjian(region)
     }finally {

      }
    },
    async getAllSudahPerjanjian(region){
      this.loading = true

      let ListOfSudahPersetujuan = await apiDebitAccount.ListOfPersetujuan(region,0);
      for (var i = 0; i < ListOfSudahPersetujuan.Data.length; i++) {
        var Alamat = ""
        var Provinsi = ""
        var Kabupaten = ""
        var Kecamatan = ""
        var Kelurahan = ""
        if(ListOfSudahPersetujuan.Data[i].Debitor.Address){
          Alamat = ListOfSudahPersetujuan.Data[i].Debitor.Address
        }
        if(ListOfSudahPersetujuan.Data[i].Debitor.Prov_code){
          Provinsi = ListOfSudahPersetujuan.Data[i].Debitor.Prov_code
        }
        if(ListOfSudahPersetujuan.Data[i].Debitor.Dist_code){
          Kabupaten = ListOfSudahPersetujuan.Data[i].Debitor.Dist_code
        }
        if(ListOfSudahPersetujuan.Data[i].Debitor.Subdis_code){
          Kecamatan = ListOfSudahPersetujuan.Data[i].Debitor.Subdis_code
        }
        if(ListOfSudahPersetujuan.Data[i].Debitor.Village_code){
          Kelurahan = ListOfSudahPersetujuan.Data[i].Debitor.Village_code
        }
        ListOfSudahPersetujuan.Data[i].No = i + 1
        ListOfSudahPersetujuan.Data[i].FullName = ListOfSudahPersetujuan.Data[i].Debitor.FullName
        ListOfSudahPersetujuan.Data[i].Instance = ListOfSudahPersetujuan.Data[i].Debitor.Instance
        ListOfSudahPersetujuan.Data[i].Address = Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi
        ListOfSudahPersetujuan.Data[i].ContractDate = this.formatDateDMY(ListOfSudahPersetujuan.Data[i].ContractDate)
        ListOfSudahPersetujuan.Data[i].DebValue = this.formatCurrency(ListOfSudahPersetujuan.Data[i].DebValue)
      }

      this.ListOfSudahPersetujuan = ListOfSudahPersetujuan.Data
      this.loading = false
    },
    async getAllBelumPerjanjian(region) {
      this.isBusy = true
      let belumAkad = await apiDebitAccount.belumAkad(region);
      for (var i = 0; i < belumAkad.Data.length; i++) {
        var Alamat = ""
        var Provinsi = ""
        var Kabupaten = ""
        var Kecamatan = ""
        var Kelurahan = ""
         if(belumAkad.Data[i].Debitor.Address){
          Alamat = belumAkad.Data[i].Debitor.Address
        }
        if(belumAkad.Data[i].Debitor.Prov_code){
          Provinsi = belumAkad.Data[i].Debitor.Prov_code
        }
        if(belumAkad.Data[i].Debitor.Dist_code){
          Kabupaten = belumAkad.Data[i].Debitor.Dist_code
        }
        if(belumAkad.Data[i].Debitor.Subdis_code){
          Kecamatan = belumAkad.Data[i].Debitor.Subdis_code
        }
        if(belumAkad.Data[i].Debitor.Village_code){
          Kelurahan = belumAkad.Data[i].Debitor.Village_code
        }
        belumAkad.Data[i].No = i + 1
        belumAkad.Data[i].FullName = belumAkad.Data[i].Debitor.FullName
        belumAkad.Data[i].Instance = belumAkad.Data[i].Debitor.Instance
        belumAkad.Data[i].Address = Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi
        belumAkad.Data[i].DebValue = this.formatCurrency(belumAkad.Data[i].DebValue)
      }
      console.log("new",belumAkad);
      this.ListBelumAkad = belumAkad.Data
      this.isBusy = false
    },
    async savePerjanjian(evt) {
      evt.preventDefault()
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value){
            this.activeBtnSave = true
            this.itemPerjanjian.ContractDate = this.myDate
            this.itemPerjanjian.ContractNum = this.ItemBelumAkad.ContractNum
             this.itemPerjanjian.DebSequence = this.ItemBelumAkad.DebSequence
            if (this.ItemBelumAkad.Location == 'other') {
              this.itemPerjanjian.LoanStorage = this.ItemBelumAkad.AnotherLocation
            }else {
              this.itemPerjanjian.LoanStorage = this.ItemBelumAkad.Location
            }

            let perjanjian = await apiDebitAccount.setPerjanjianPK(this.ItemBelumAkad.DACode, this.itemPerjanjian)
            this.showNotif(perjanjian, 'Perjanjian')
            this.$bvModal.hide('perjanjian')
            this.getAll()
          }
       })
       .catch(err => {
        // An error occurred
       })

    },
    koreksi(data){
      this.activeBtnSave = false
      this.koreksiItems = data
      // this.koreksiItems.ContractDate = moment(data.ContractDate, "DD/MMM/YYYY").toDate()
      // this.koreksiItems.LoanStorage = 'Yoyo'
      if (this.koreksiItems.LoanStorage !== 'bank' && this.koreksiItems.LoanStorage !== 'office') {
        this.koreksiItems.AnotherLoanStorage = this.koreksiItems.LoanStorage
        this.koreksiItems.LoanStorage = 'other'
      }
      console.log(this.koreksiItems);
      this.$root.$emit('bv::show::modal', this.koreksiModal[0].id)
    },
    async saveKoreksi(evt){
        evt.preventDefault()
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
         .then(async (value) => {
            if(value){
                this.activeBtnSave = true
                var response = await apiDebitAccount.setPerjanjianPK(this.koreksiItems.DACode, this.koreksiItems)
                this.showNotif(response, 'Koreksi Perjanjian PK')
                this.$bvModal.hide('koreksiModal')
                this.getAll()

            }
         })
         .catch(err => {
          // An error occurred
         })
    },
    editBelumAkad(item) {
      this.activeBtnSave = false
      this.ItemBelumAkad = item
      if (item.FeeType = 'Sliding Rate') {
        this.ItemBelumAkad.FeeType = 'Jasa Administrasi Saldo Menurun'
      }else{
        this.ItemBelumAkad.FeeType = 'Jasa Administrasi Tetap'
      }
      this.$root.$emit('bv::show::modal', this.editModalPerjanjian[0].id)
    },
    modalBatal(item){
      this.activeBtnSave = false
      this.batalItems = item
      this.$root.$emit('bv::show::modal', this.batalModal.id)
    },
    async batalPerjanjianPK(item){
      this.activeBtnSave = true
      let data = {
        ContractNum : null,
        ContractDate : null,
        LoanStorage : item.LoanStorage,
        DebSequence : item.DebSequence
      }
      var response = await apiDebitAccount.setPerjanjianPK(item.DACode, data)
      this.showNotif(response, 'Batal Perjanjian PK')
      this.$root.$emit('bv::hide::modal', this.batalModal.id)
      this.getAll()
    },

  },


}
</script>
<style>
@import '../../../assets/css/TabsCenter.css';
.positionRight {
 text-align:right;
}
</style>
