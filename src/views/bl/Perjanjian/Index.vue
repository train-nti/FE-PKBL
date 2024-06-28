<style media="screen">
tr th{
    /*width:1%;*/
    white-space:nowrap;
}
.positionRight {
 text-align:right;
}
</style>
<template>
<div class="">
  <div class="card">
    <div class="card-body">
      <b-tabs class="full-widths" v-model="tabIndex[0]">
        <b-tab active>
          <template slot="title">
            {{tabs[0]}} <i class="fa fa-check-circle "></i>
          </template>
          <br>
          <cTables :isBusy="isBusy" :infoModal="infoModalPersetujuan" :items="ListBelumAkad" :fields="fieldsPersetujuan">
            <template slot-scope="{ row }">
              <b-button pill variant="primary" size="md" @click="edit(row)" v-if="editModal[0].id !== ''" v-b-tooltip.hover title="Proses SP3">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>
          <b-modal :id="editModal[0].id" :title="editModal[0].title" size="lg" hide-footer ok-only>
            <b-form @submit="savePerjanjian">
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nomor SP3
                <b class="text-danger">*</b>
              </label>
              <div class="col-sm-10">
                <input type="text" v-model="dataPerjanjian.ContractNum" class="form-control" id="input-1" placeholder="Nomor SP3" required>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nama Instansi
              </label>
              <div class="col-sm-10">
                <input type="text" v-model="dataPerjanjian.Instance" class="form-control" id="input-1" placeholder="Nama Instansi" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nama Pemohon</label>
              <div class="col-sm-10">
                <input type="text" v-model="dataPerjanjian.FullName" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal SP3</label>
              <div class="col-sm-10">
                <!-- <input type="date" v-model="dataPerjanjian.ContractDate" class="form-control" id="" placeholder="example"> -->
                <date-picker value-type="YYYY-MM-DD" :disabled-date="getClosingDate ? disabledDate : ''" v-model="dataPerjanjian.ContractDate" :input-attr="{ required: true }" format="DD/MMM/YYYY" lang="id" ></date-picker>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Termin</label>
              <div class="col-sm-10">
                <input type="text" v-model="dataPerjanjian.Tenor" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <hr>
            </hr>
            <cFiles v-if="IsParent  " labels="Surat Perjanjian" :url="baseURL+'/api/attached'" :items="dataPerjanjian.DebCode"></cFiles>
            <cFiles v-if="IsParent  " labels="Surat Persetujuan" :url="baseURL+'/api/attached'" :items="dataPerjanjian.DebCode"></cFiles>
            <cFiles  labels="Surat SP3" :url="baseURL+'/api/attached'" :items="dataPerjanjian.DebCode"></cFiles>
            <div class="form-group row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-4">
                <b-button variant="info" :disabled="activeBtnSave" type="submit">Process</b-button>
              </div>
            </div>
          </b-form>
          </b-modal>
        </b-tab>

        <b-tab>
          <template slot="title">
            <i class="fa fa-bars "></i> {{tabs[1]}}
          </template>
          <br>
          <cTables :isBusy="loading" :infoModal="infoModalSudahPerjanjian" :items="ListOfSudahPersetujuan" :fields="fields" :itemsExcel="dataExcelSudahPersetujuan">
            <template slot-scope="{ row }">
              <b-button pill variant="danger" @click="modalBatal(row)" size="md" v-b-tooltip.hover title="Batal SP3">
                <i class="fa fa-trash"></i>
              </b-button>
              <b-button pill variant="warning" @click="koreksi(row)" size="md" v-b-tooltip.hover title="Edit">
                <i class="fa fa-pencil-square-o"></i>
              </b-button>
            </template>
          </cTables>
          <b-modal :id="koreksiModal[0].id" :title="koreksiModal[0].title" size="lg" hide-footer ok-only>
            <b-form @submit="saveKoreksi">
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nomor SP3
              </label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.ContractNum" disabled class="form-control" id="input-1" placeholder="Nomor SP3" required>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nama Instansi
              </label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.Instance" class="form-control" id="input-1" placeholder="Nama Instansi" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Nama Pemohon</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.FullName" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal SP3</label>
              <div class="col-sm-10">
                <!-- <input type="date" v-model="koreksiItems.ContractDate" class="form-control" id="" placeholder="example"> -->
                <date-picker value-type="YYYY-MM-DD" :disabled-date="getClosingDate ? disabledDate : ''" v-model="koreksiItems.ContractDate" :input-attr="{ required: true }" :format="momentFormat" lang="id"></date-picker>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Termin</label>
              <div class="col-sm-10">
                <input type="text" v-model="koreksiItems.Tenor" disabled class="form-control" id="" placeholder="example">
              </div>
            </div>
            <hr>
            </hr>

            <div class="form-group row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-4">
                <b-button variant="info" :disabled="activeBtnSave" type="submit">Simpan</b-button>
              </div>
            </div>
          </b-form>
          </b-modal>

          <!-- modal batal -->
          <b-modal :id="batalModal.id" :title="batalModal.title" :size="batalModal.size">
            <p>Anda yakin ingin membatalkan SP3 ? <br>
            </p>
            <template v-slot:modal-footer>
                <div class="w-100">
                  <b-button  variant="danger" @click="$bvModal.hide(batalModal.id)" class="float-right">
                      Tidak
                  </b-button>
                  <b-button  variant="primary" :disabled="activeBtnSave" @click="batalSP3(batalItems)" class="float-right" style="margin-right:20px;">
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
import  config  from "../../../../setting"
import apiDebitAccount from '@/api/PK/DebitAccountApiService';
import apiDebitor from '@/api/PK/DebitorApiService';
import VueNumeric from 'vue-numeric';
import inputFile from '@/components/Upload';
import cTables from '@/components/Tables';
import excel from '@/components/BtnExcel';

export default {
  components: {
    'vue-numeric': VueNumeric,
    'cFiles': inputFile,
    'cTables': cTables,
    'excel': excel
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
      //Btn disabled
      activeBtnSave : false,
      configConfirm:null,
      textConfirm:null,
      dataExcelSudahPersetujuan : [

      ],
      batalModal : {
        id: 'batalModal',
        title: 'Batal SP3',
        size: 'md'
      },
      batalItems:{},
      koreksiModal:[{
        id: 'koreksiModal',
        title: 'Koreksi SP3'
      }],
      koreksiItems:{},
      baseURL:`${config.url}`+`${config.port}`,
      status: true,
      tabIndex: [0, 0],
      tabs: [
        'Sudah Disetujui',
        'List SP3',
      ],
      loading : false,
      isBusy : false,
      editModal: [{
        id: 'editperjanjian',
        title: 'Proses SP3'
      }],
      infoModalPersetujuan: [{
        id: 'persetujuan',
        title: 'Persetujuan'
      }],
      infoModalSudahPerjanjian: [{
        id: 'sudahperjanjian',
        title: 'Perjanjian'
      }],
      ListBelumAkad: [],
      ListOfSudahPersetujuan: [],
      dataPerjanjian: {},
      IsParent:null,
      fields: [{
          key: 'No',
          label: 'No',
          sortable: true
        },
        {
          key: 'ContractNum',
          label: 'No Persetujuan',
          sortable: true
        },
        {
          key: 'FullName',
          label: 'Nama Pemohon',
          sortable: true
        },
        {
          key: 'Tenor',
          label: 'Termin',
          sortDirection: 'asc',
          sortable: true
        },
        {
          key: 'Reference',
          label: 'Referensi',
          sortable: true
        },
        {
          key: 'Instance',
          label: 'Nama Instansi',
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
      fieldsPersetujuan: [{
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
          key: 'Tenor',
          label: 'Termin',
          sortDirection: 'asc',
          sortable: true
        },
        {
          key: 'Reference',
          label: 'Referensi',
          sortDirection: 'asc',
          sortable: true
        },
        {
          key: 'Instance',
          label: 'Nama Instansi',
          sortDirection: 'asc',
          sortable: true
        },
        {
          key: 'Address',
          label: 'Alamat',
          sortable: true
        },
        {
          key: 'subTotal',
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
      return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
    },
    async getAll() {
      let region = this.getSession('cabang');
        this.getAllBelumAkad(region)
        this.getAllSudahAkad(region)
    },
    edit(item, index, button) {
      this.activeBtnSave = false
      if (item.Tenor > 1) {
        this.IsParent = false
      }else {
        this.IsParent = true
      }


      this.dataPerjanjian = item
      this.dataPerjanjian.ContractDate = moment(item.ContractDate).format('YYYY-MM-DD'),

      this.$root.$emit('bv::show::modal', this.editModal[0].id, button)
    },
    koreksi(item){
      this.activeBtnSave = false
      this.koreksiItems = item
      this.koreksiItems.ContractDate = this.formatDateDMY(item.ContractDate)
      this.$root.$emit('bv::show::modal', this.koreksiModal[0].id)
    },
    async saveKoreksi(evt){
        evt.preventDefault()
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
         .then(async (value) => {
            if(value  ){
                this.activeBtnSave = true
                var response = await apiDebitAccount.setPerjanjianBL(this.koreksiItems.DACode, this.koreksiItems)
                this.showNotif(response, 'Koreksi SP3')
                this.$bvModal.hide('koreksiModal')
                this.getAll()

            }
         })
         .catch(err => {
          // An error occurred
         })
    },
    modalBatal(item){
      this.activeBtnSave = false
      this.batalItems = item
      this.$root.$emit('bv::show::modal', this.batalModal.id)
    },
    async batalSP3(item){
      this.activeBtnSave = true
      let data = {
        ContractNum : null,
        ContractDate : item.ContractDate
      }
      var response = await apiDebitAccount.setPerjanjianBL(item.DACode, data)
      this.showNotif(response, 'Batal SP3')
      this.$root.$emit('bv::hide::modal', this.batalModal.id)
      this.getAll()
    },
    async getAllBelumAkad(region) {
      this.isBusy = true
      let belumAkad = await apiDebitAccount.belumAkadBL(region);
      this.ListBelumAkad = []
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
        belumAkad.Data[i].Address = Alamat+", "+Kelurahan+", "+Kecamatan+", "+Kabupaten+",  "+Provinsi
        belumAkad.Data[i].Reference = belumAkad.Data[i].Debitor.Reference
        belumAkad.Data[i].subTotal = this.formatCurrency(belumAkad.Data[i].subTotal)
        this.ListBelumAkad.push(belumAkad.Data[i])
      }
      this.isBusy = false


    },
    async getAllSudahAkad(region){
      this.loading = true
      let list = await apiDebitAccount.ListOfPersetujuanBL(region);
      for (var i = 0; i < list.Data.length; i++) {
        var Alamat = ""
        var Provinsi = ""
        var Kabupaten = ""
        var Kecamatan = ""
        var Kelurahan = ""
         if(list.Data[i].Debitor.Address){
          Alamat = list.Data[i].Debitor.Address
        }
        if(list.Data[i].Debitor.Prov_code){
          Provinsi = list.Data[i].Debitor.Prov_code
        }
        if(list.Data[i].Debitor.Dist_code){
          Kabupaten = list.Data[i].Debitor.Dist_code
        }
        if(list.Data[i].Debitor.Subdis_code){
          Kecamatan = list.Data[i].Debitor.Subdis_code
        }
        if(list.Data[i].Debitor.Village_code){
          Kelurahan = list.Data[i].Debitor.Village_code
        }
        list.Data[i].No = i + 1
        list.Data[i].FullName = list.Data[i].Debitor.FullName
        list.Data[i].Instance = list.Data[i].Debitor.Instance
        list.Data[i].Address = Alamat+", "+Kelurahan+", "+Kecamatan+", "+Kabupaten+"  "+list.Data[i].Debitor.Prov_code
        list.Data[i].Reference = list.Data[i].Debitor.Reference
        list.Data[i].DebValueNum = list.Data[i].DebValue
        list.Data[i].DebValue = this.formatCurrency(list.Data[i].DebValue)
      }
      this.ListOfSudahPersetujuan = list.Data
      this.loading = false

      for (var i = 0; i < this.list.length; i++) {

        this.dataExcelSudahPersetujuan.push({
          No : this.list[i].No,
          NamaPemohn : this.list[i].FullName,
          Usaha : this.list[i].Instance,
          Alamat : this.list[i].Address,
          NilaiDisetujui : this.list[i].DebValueNum
        })
      }


    },
    async savePerjanjian(evt) {
        evt.preventDefault()
        this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value  ){
            this.activeBtnSave = true
            var response = await apiDebitAccount.setPerjanjianBL(this.dataPerjanjian.DACode, this.dataPerjanjian)
            this.showNotif(response, 'Persetujuan')
            this.$bvModal.hide('editperjanjian')

            this.getAll()
          }
       })
       .catch(err => {
        // An error occurred
       })
    }
  },



}
</script>
<style>
@import '../../../assets/css/TabsCenter.css';
.positionRight {
 text-align:right;
}
</style>
