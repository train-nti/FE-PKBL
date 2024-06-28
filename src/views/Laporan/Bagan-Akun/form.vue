<template>
<div class="animated fadeIn">
  <b-row >
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Bagan Akun</strong>
        </div>
        <b-card-group deck>
          <b-card>
            <b-card-text>
              <b-row>
                <b-col>
                  <b-form-group label-cols-sm="2" label="Filter" class="mb-0">
                    <b-input-group size="sm">
                      <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Cari"></b-form-input>
                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Bersihkan Filter</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label-cols-sm="2" label="Cabang" class="mb-0">
                    <b-input-group size="sm">
                      <b-form-select v-model="Cabang" :options="options_cabang"></b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row><br>
              <b-row>
                <b-col lg="7">
                  <b-form-group label-cols-sm="2" label="Filter Tanggal" class="mb-0">
                    <b-input-group size="sm">
                      <date-picker v-model="date1" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                      <!-- <b-form-input v-model="date1" type="date" ></b-form-input> -->
                      &nbsp;&nbsp;&nbsp;
                      <b-input-group-append>
                        <label sm="1"> Sampai </label>
                      </b-input-group-append>
                      &nbsp;&nbsp;&nbsp;
                       <date-picker v-model="date2" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                       <!-- <b-form-input v-model="date2" type="date" ></b-form-input> -->
                      <b-input-group-append>
                         <b-button @click="ClearData">Bersih</b-button>
                      </b-input-group-append>
                    </b-input-group>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-button variant="primary"  @click="filterDate">Cari</b-button>
                </b-col>
              </b-row><br>
              <b-row>
                &nbsp;&nbsp;
                <excel
                  :items="itemsExcel"
                  :header="headerExcel"
                  :settingExcel="setExcel"
                  sheetName="Bagan Akun"
                  filename="Bagan Akun"
                  @click="logg()"></excel>
                <!-- {{items}} -->
              </b-row><br>
              <b-table striped hover responsive
              :items="items"
              :fields="fields"
              :filter="filter"
              @filtered="onFiltered"
              :busy="isBusy"
              :sort-direction="sortDirection"
              :sort-by.sync="sortBy"
              :tbody-tr-class="rowClass">
                <template slot="action" slot-scope="data" v-if="data.item.Status != 'Head'">
                  <b-button @click="accountJournal(data.item.Code,data.item.Name)"  variant="primary" v-b-tooltip.hover title="Lihat Detail Bagan Akun">
                      <i class="fa fa-book"></i>
                  </b-button>
                </template>
                <template slot="Name" slot-scope="data">
                  <span v-html='data.item.Name'></span>
                </template>
                <template slot="Category" slot-scope="data">
                  <span v-html='data.item.Category'></span>
                </template>
                 <template slot="bottom-row" slot-scope="data">
                    <td colspan="3">Total Keseluruhan</td>
                    <td class="positionRight">{{totalInitialBalance}}</td>
                    <td class="positionRight">{{totalDebit}}</td>
                    <td class="positionRight">{{totalCredit}}</td>
                    <td class="positionRight">{{totalMutasi}}</td>
                    <td class="positionRight">{{totalBalance}}</td>
                    <td colspan="5"></td>
                  </template>
                  <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading...</strong>
                    </div>
                  </template>
              </b-table>
               <!-- <b-pagination
               v-model="currentPage"
               :total-rows="totalRows"
               :per-page="perPage"
               aria-controls="tambah"></b-pagination> -->
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-card>
    </b-col>
  </b-row>
  <b-modal id="modal-journal" :title="modalJournalTitle" size="xl" hide-footer>
    <b-table id="tambah_permohonan"
    :fields="fieldsJournal"
    caption=""
    :per-page="perPageJrn"
    :current-page="currentPageJrn"
    :items="itemsJournal">
      <template slot="JournalNumber" slot-scope="data">
        <router-link :to="{ name: 'Jurnal Kas Bank Form', params: { id: data.item.Jrn_ID } }">
          {{ data.item.JournalNumber }}
        </router-link>
      </template>
    </b-table>
    <b-pagination v-model="currentPageJrn" :total-rows="totalRowsJournal" :per-page="perPageJrn" aria-controls="tambah_tidaksetujuPK"></b-pagination>
  </b-modal>
</div>
</template>

<script>
// import XLSX from 'xlsx';
  import moment from 'moment';
import excel from '../../../components/ExcelBaganAkun';
import cTable from '@/views/base/Table.vue'
import apiAccount from '@/api/AKAccountApiService';
import apiAccountGroup from '@/api/AKAccountGroupApiService';
import apiJournal from '@/api/AKJournalApiService';
import apiWorkArea1 from '@/api/WorkArea1ApiService';
import '../../../../node_modules/vue-select/dist/vue-select.css';

export default {

  components: {
    cTable, excel
  },
  data() { 
    return {
      cabangKP : 9900,
      setExcel : [
        {
          Cell : ['A','B','C','D','E','F','G','H']
        },
        {
          titles : []
        },
        {
          mergeTo : "C"
        },
        {
          origin : "A5"
        },
        {
          position : [
            {
              colums : 2,
              left : true
            },
            {
              colums : 3,
              left : true
            },
          ]
        }
      ],
      isBusy: false,  
      items: [],
      Total:{

      },
      sortDirection: 'asc',
           sortBy: 'Code',
      perPage: 10,
      currentPage: 1,
      // totalRows: 1,
      currentPageJrn: 1,
      loading: false,
      perPageJrn: 10,
      filter: null,
      date1:null,
      date2:null,
      Cabang:null,
      itemsExcel:[],
      headerExcel:["Kode","Nama","Grup","Saldo Awal","Debet","Kredit","Mutasi","Saldo Akhir"],
      fields: [{
          key: 'Code',
          label: 'Kode',
          sortable: true,
          sortDirection: 'asc'
        },
        {
          key: 'Name',
          label: 'Nama',
          sortable: true
        },
        {
          key: 'Category',
          label: 'Grup',
          sortable: true
        },
        {
          key: 'InitialBalance',
          label: 'Saldo Awal',
          tdClass: 'positionRight'
        },
        {
          key: 'Debit',
          label: 'Debet',
          tdClass: 'positionRight'
        },
        {
          key: 'Credit',
          label: 'Kredit',
          tdClass: 'positionRight'
        },
        {
          key: 'Mutasi',
          label: 'Mutasi',
          tdClass: 'positionRight'
        },
        {
          key: 'Balance',
          label: 'Saldo Akhir',
          tdClass: 'positionRight'
        },
        {
          key: 'action',
          label: 'Aksi'
        }

      ],
      fieldsJournal: [
        {key: 'JournalNumber', label: 'Journal Number', sortable: true},
        {key: 'Description', label: 'Deskripsi', sortable: true},
        {key: 'Date', label: 'Tanggal', sortable: true},
        {key: 'Code', label: 'Kode', sortable: true, sortDirection: 'asc'},
        // {key: 'Name', label: 'Nama', sortable: true},
        {key: 'Debit', label: 'Debit'},
        {key: 'Kredit', label: 'Kredit'},
      ],
      itemsJournal:[],
      modalJournalTitle:"",
      options_cabang:[]
    }
  },
  async created() {
    this.cabang = localStorage.cabang
    if(this.cabang == this.cabangKP){
        this.Cabang = null
    }else{
      this.Cabang = this.cabang
    }
    this.getCabang()
  },
  computed: {
      sortOptions() {
        console.log(this.items);
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
      totalRowsJournal() {
        return this.itemsJournal.length
      },
      'totalDebit': function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        return a + Number(c.totalDebit  || 0);
      }, 0))
    },
    'totalCredit': function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        return a + Number(c.totalCredit  || 0);
      }, 0))
    },
    'totalMutasi': function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        return a + Number(c.totalMutasi  || 0);
      }, 0))
    },
    'totalBalance': function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        return a + Number(c.totalBalance  || 0);
      }, 0))
    },
    'totalInitialBalance': function() {
      return this.formatCurrency(this.items.reduce(function(a, c){
        return a + Number(c.totalInitialBalance  || 0);
      }, 0))
    },
    },
    mounted() {
      // Set the initial number of items
      // this.totalRows = this.items.length
      console.log(this.items);
      this.totalRowsJournal = this.itemsJournal.length

    },
  methods: {
    logg(){
      // this.itemsExcel = this.items
      this.itemsExcel = this.itemsExcel.sort((a,b) => (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0));
      console.log(this.itemsExcel)
    },
    async ClearData(){
      this.loading = true
        this.date1 = null
        this.date2 = null
         this.items = []
        this.itemsExcel = []
      this.loading = false
    },
    rowClass(item, type) {
        if (!item) return
        if (item.Status === 'Head') return 'table-warning'
    },
    async filterDate(){
      this.isBusy = true
      this.items = []
      try {
         this.items = []
         this.itemsExcel = []
         console.log("TANGGAL1",this.date1)
         console.log("TANGGAL2",this.date2)
         var dataTable = await apiAccountGroup.getDateFrom(this.date1,this.date2,this.Cabang)
         console.log("AKUNGRUP", dataTable);

        for (var i = 0; i < dataTable.length; i++) {
          var LoopAcc = dataTable[i]
          var Key = this.items.findIndex((element) => element.Code == LoopAcc.GrpCode)
          if (Key != -1) {
            console.log(Key);
            this.items.splice(Key, 1)
            this.itemsExcel.splice(Key, 1)
          }
          this.items.push({
            Code : LoopAcc.GrpCode,
            Name : '<b>'+LoopAcc.GroupName+'</b>',
            Category : '<b>'+LoopAcc.Category+'</b>',
            Status: 'Head'
          })
          this.itemsExcel.push({
            Code : LoopAcc.GrpCode,
            Name : LoopAcc.GroupName,
            Grup : LoopAcc.Category,
            InitialBalance : "",
            Debit : "",
            Credit : "",
            Mutasi : "",
            Balance : "",
            Status: 'Head'
          })
          // console.log(LoopAcc.GroupName,LoopAcc.Account);
          if (LoopAcc.Account[0] != null) {
            for (var o = 0; o < LoopAcc.Account.length; o++) {
              var Loop2 = LoopAcc.Account[o]
              if(Loop2){
                Loop2.totalDebit = Loop2.Debit
                Loop2.totalCredit = Loop2.Credit
                Loop2.totalInitialBalance = Loop2.InitialBalance
                Loop2.InitialBalance = this.formatCurrency(Loop2.InitialBalance)
                Loop2.Mutasi2 = (Loop2.Debit) - (Loop2.Credit)
                // Loop2.Name = Loop2.Name
                Loop2.Mutasi = this.formatCurrency(Loop2.Mutasi)
                Loop2.totalMutasi = Loop2.Mutasi2
                Loop2.Debit = this.formatCurrency(Loop2.Debit)
                Loop2.Credit = this.formatCurrency(Loop2.Credit)
                Loop2.Category = LoopAcc.Category

                if (Loop2.Balance != null) {
                   Loop2.totalBalance = Loop2.Balance
                  Loop2.Balance = this.formatCurrency(Loop2.Balance)
                } else {
                  Loop2.Balance = "0"
                }

                 this.itemsExcel.push({
                    Code : Loop2.Code,
                    Name : Loop2.Name,
                    Grup : Loop2.Category,
                    InitialBalance : this.CurrencyToNumber(Loop2.InitialBalance),
                    Debit : this.CurrencyToNumber(Loop2.Debit),
                    Credit : this.CurrencyToNumber(Loop2.Credit),
                    Mutasi : this.CurrencyToNumber(Loop2.Mutasi),
                    Balance : this.CurrencyToNumber(Loop2.Balance)
                  })

                this.items.push(Loop2)
              }
            }
          }
        }
        this.itemsExcel.push({
            Code : "Total Keseluruhan",
            Name : "",
            GroupName : "",
            InitialBalance : this.CurrencyToNumber(this.totalInitialBalance),
            Debit : this.CurrencyToNumber(this.totalDebit),
            Credit : this.CurrencyToNumber(this.totalCredit),
            Mutasi : this.CurrencyToNumber(this.totalMutasi),
            Balance : this.CurrencyToNumber(this.totalBalance)
        })

        var workarea = await apiWorkArea1.getByCode(this.Cabang)
        var WAName = "Semua"
        if(workarea[0]){
          if(workarea[0].Name){
            WAName = workarea[0].Name
          }
        }
        this.setExcel[1].titles = []
        this.setExcel[1].titles.push(
        {
          cels : 'A1',
          name : 'Laporan Bagan Akun'
        },
        {
          cels : 'A2',
          name : 'Region ' + WAName
        },
        {
          cels : 'A3',
          name : "Periode "+ this.formatDateDMY(this.date1) + " sampai " + this.formatDateDMY(this.date2),
        },
        )

      console.log(this.itemsExcel);

      } finally {
        this.isBusy = false
      }
    },
    async accountJournal(id,Nama){
      console.log(id)
      var dataJournal = await apiJournal.getByAccount(id.replace(/ /g,''));
      var dataTable = [];
      var debet,credit;
      // console.log(dataJournal.length);
      this.$root.$emit('bv::show::modal','modal-journal', '#btnShow')
      this.modalJournalTitle = Nama
      for (var i = 0; i < dataJournal.length; i++) {
        debet = null
        credit = null
        var dataJournalItem = dataJournal[i].JournalItem;
        // console.log(dataJournalItem[0].IsDebet);
        // console.log(i);
        // var Account = await apiAccount.getOne(dataJournalItem[0].AccountCode.replace(/ /g,''));
          if (dataJournalItem[0].IsDebet) {
            debet = this.formatCurrency(dataJournalItem[0].ItemValue)
          }else{
            credit = this.formatCurrency(dataJournalItem[0].ItemValue)
          }
          this.itemsJournal.push({
            Jrn_ID: dataJournal[i].Jrn_ID,
            JournalNumber : dataJournal[i].JournalNumber,
            Date : this.formatDateDMY(dataJournal[i].JournalDate),
            Code : dataJournalItem[0].AccountCode,
            // Name : Account[0].Name,
            Debit : debet,
            Kredit : credit,
            Description: dataJournal[i].Description
          })

      }

      //this.itemsJournal = dataTable
      this.itemsArrayJournal = () => this.itemsJournal

    },
    async getCabang(){
      var workarea = null
      if(this.cabang != this.cabangKP){
       workarea = await apiWorkArea1.getByCode(this.cabang)
       console.log("CABANG",workarea)
       this.options_cabang = [{text: workarea[0].Name,value:workarea[0].Code}]
       // this.options_cabang.push({text: workarea[0].Name,value:workarea[0].Code})
      }else{
        var workarea = await apiWorkArea1.getComboBoxAll()
        this.options_cabang = [{text:"--- Semua ---",value:null}]
        for (var i = 0; i < workarea.length; i++) {
          var data =  workarea[i]
          this.options_cabang.push({text: data.Name,value:data.Code})
        }
      }
      console.log("cabang",workarea)
    },
    onFiltered(filteredItems) {
      this.rows = filteredItems.length
      this.currentPage = 1
    },
    exportToExcel: function(json, nameOfSheet, nameFile) {

      var ws = XLSX.utils.aoa_to_sheet(this.header);
      XLSX.utils.sheet_add_json(ws, json, {
      skipHeader:true,
      origin:-1
      });

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nameOfSheet);
      XLSX.writeFile(wb, nameFile + '.xlsx')

    },

}
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.full-width .card-header-tabs {
  margin-right: -21px;
  margin-left: -21px;
}

.full-width .nav-tabs .nav-item {
  margin-bottom: -1px;
  flex-grow: 1;
  text-align: center;
}

.siul {
  list-style-type: none;
}

.siul .judul {
  margin-left: 0px;
}

.siul .sub-judul-1 {
  margin-left: 15px;
}

.siul .sub-judul-2 {
  margin-left: 30px;
}

.siul .sub-judul-3 {
  margin-left: 45px;
}

.scroll {
  background-color: #f1f1f1;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  border-radius: 10px;
}
.positionRight {
  text-align:right;
}
</style>
