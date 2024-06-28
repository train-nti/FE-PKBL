<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Laporan Keuangan</strong>
        </div>
        <b-tabs>
          <b-tab>
            <template slot="title">
              {{tabs[0]}}
            </template><br>

            <form>
              <div class="row">
                <div class="col">
                  <label for="inputEmail4">Tahun</label>
                  <b-form-select
                    id="input-3"
                    v-model="sortir.Year"
                    :options="optionYear"
                    required
                  ></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Bulan</label>
                  <b-form-select
                    id="input-3"
                    v-model="sortir.Month"
                    :options="optionMonth"
                    required
                  ></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Cabang</label>
                  <b-form-select v-model="sortir.Cabang" :options="options_cabang"></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Posting Jurnal</label>
                  <b-form-select v-model="sortir.posting" :options="optionPosting"></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Sumber Dana</label>
                  <b-form-select v-model="sortir.sumberdana" :options="optionDana"></b-form-select>
                </div>
              </div>
            </form>

            <div class="form-group">
              <button class="btn btn-primary" @click="getAll()">Filter</button>
              <button class="btn btn-danger"  @click="Kosongkan()">Kosongkan</button>
            </div>

            <b-row style="margin-left:0px;">
              <excel
                :items="itemsExcel"
                :header="headerExcel"
                :settingExcel="setExcel"
                sheetName="Posisi Keuangan"
                filename="Posisi Keuangan"></excel>
            </b-row><br>

            <b-row>
              <b-col>
                <div slot="header">
                  <!-- <strong>Aset</strong> -->
                </div>
                <b-table :items="items" :fields="fields" responsive="sm">
                  <template slot="GroupName" slot-scope="data">
                    <span v-html='data.item.GroupName'></span>
                  </template>
                </b-table>
              </b-col>
            </b-row>

          </b-tab>
          <b-tab>
            <template slot="title">
              {{tabs[1]}}
            </template><br>

            <form>
              <div class="row">
                <div class="col">
                  <label for="inputEmail4">Tahun</label>
                  <b-form-select
                    id="input-3"
                    v-model="sortir.Year"
                    :options="optionYear"
                    required
                  ></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Bulan</label>
                  <b-form-select
                    id="input-3"
                    v-model="sortir.Month"
                    :options="optionMonth"
                    required
                  ></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Cabang</label>
                  <b-form-select v-model="sortir.Cabang" :options="options_cabang"></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Posting Jurnal</label>
                  <b-form-select v-model="sortir.posting" :options="optionPosting"></b-form-select>
                </div>
                <div class="col">
                  <label for="inputEmail4">Sumber Dana</label>
                  <b-form-select v-model="sortir.sumberdana" :options="optionDana"></b-form-select>
                </div>
              </div>
            </form>

            <div class="form-group">
              <button class="btn btn-primary" @click="getAll()">Filter</button>
              <button class="btn btn-danger" @click="Kosongkan()">Kosongkan</button>
            </div>

            <b-row style="margin-left:0px;">
              <excel
                :items="itemsExcel2"
                :header="headerExcel"
                  :settingExcel="setExcel"
                sheetName="Laporan Aktifitas"
                filename="Laporan Aktifitas"></excel>
            </b-row><br>

            <b-row>
              <b-col>
                <div slot="header">
                  <!-- <strong>Aset</strong> -->
                </div>
                <b-table :items="items2" :fields="fields" responsive="sm">
                  <template slot="GroupName" slot-scope="data">
                    <span v-html='data.item.GroupName'></span>
                  </template>
                </b-table>
              </b-col>
            </b-row>

          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</div>
</template>

<script>
import moment from '../../../../node_modules/moment/moment';
import cTable from '@/views/base/Table.vue'
import excel from '../../../components/ExcelLK'
import KadekTable from '@/components/Tables.vue'
import BtnExcel from '@/components/BtnExcel.vue'
import apiAccountSummary from '@/api/AK/AccountSummaryApiService'
import apiConfiq from '@/api/PK/ConfiqApiService'
import apiWorkArea1 from '@/api/WorkArea1ApiService'

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {
    cTable,
    KadekTable,
    BtnExcel,
    excel
  },
  data() {
    return {
      cabangKP : 9900,
      setExcel : [
        {
          Cell : ['A','B','C','D']
        },
        {
          titles : []
        },
        {
          mergeTo : "B"
        },
        {
          origin : "A6"
        }
      ],
      setExcel2 : [
        {
          Cell : ['A','B','C','D']
        },
        {
          titles : []
        },
        {
          mergeTo : "B"
        },
        {
          origin : "A6"
        }
      ],
      itemsAccCategory1: [],
      itemsAccCategory2: [],
      itemsAccCategory3: [],
      itemsAccCategory4: [],
      items: [] ,
      items2: [] ,
      itemsExcel: [] ,
      itemsExcel2: [] ,
      headerExcel:["Perkiraan","Catatan", ],
      filter: null,
      fieldsColspan: [{
          key: 'id',
          label: 'Keterangan'
        },
        {
          key: 'note',
          label: 'Catatan'
        },
        {
          key: 'id2',
          label: 'BeforeMonth'
        },
        {
          key: 'id3',
          label: 'AfterMonth'
        },
        {
          key: 'type1',
          label: 'Amount'
        },
        {
          key: 'type2a',
          label: '%'
        },
      ],
      fields: [
        {
            key: 'no',
            label: 'No'
          },
        {
          key: 'GroupName',
          label: 'Perkiraan'
        },
        {
          key: 'note',
          label: 'Catatan'
        },
        {
          key: 'BalanceYear',
          label: 'BeforeMonth',
          tdClass: 'positionRight'
        },
        {
          key: 'BalancePrevYear',
          label: 'AfterMonth',
          tdClass: 'positionRight'
        },
      ],
      tabIndex: [0, 0],
      tabs: [
        'Laporan Posisi Keuangan',
        'Laporan Aktifitas',
      ],
      sortir: {
        // Year:2019,
        // Month:10,
        Year:null,
        Month:null,
        Cabang:null,
        posting:null,
        sumberdana:null
      },
      GrpType : [
        {name:'Aset',Type:'10',Code:'10.0000.0000'},
        {name:'Liabilitas',Type:'20',Code:'10.0000.0000'},
        // {name:'Pendapatan',Type:'40'},
        // {name:'Beban',Type:'50'},
      ],
      GrpType2 : [
        // {name:'Aset',Type:'10',Code:'10.0000.0000'},
        // {name:'Liabilitas',Type:'20',Code:'10.0000.0000'},
        {name:'Pendapatan',Type:'40'},
        {name:'Beban',Type:'50'},
      ],
      options_cabang:[],
      optionYear: [],
      optionMonth: [],
      cabang:null,
      optionPosting: [{text:'--Semua--', value:null}],
      optionDana: [{text:'--Semua--', value:null}],
    }
  },
  async created() {
    this.cabang = localStorage.cabang
    if(this.cabang == this.cabangKP){
      this.sortir.Cabang = null
    }else{
      this.sortir.Cabang = this.cabang
    }
    this.getYear()
    this.getMonth()
    this.getCabang()
    // this.sortir.Year = new Date().getFullYear()
    // console.log(new Date().getMonth()+1);
    // this.sortir.Month = new Date().getMonth()+1
    // this.getAll()


  },
  computed: {
    totalRows: function() {
      return this.getRowCount()
    },
  },
  methods: {
    async Kosongkan(){
      console.log("MASUK")
        this.sortir.Year = null
        this.sortir.Month = null
        if(this.cabang == this.cabangKP){
          this.sortir.Cabang = null
        }else{
          this.sortir.Cabang = this.cabang
        }
        this.sortir.posting = null
        this.sortir.sumberdana = null
        this.itemsAccCategory1 =  []
        this.itemsAccCategory2=  []
        this.itemsAccCategory3=  []
        this.itemsAccCategory4=  []
        this.items=  []
        this.items2=  []
        this.itemsExcel=  []
        this.itemsExcel2=  []
        this.fields[3].label = 'BeforeMonth'
        this.fields[4].label = 'AfterMonth'
    },
    async getAll() {
      this.loading = true
      try {
        var item2 = []
        var itemExcel = []
        var itemExcel2 = []
        console.log(this.fields);
        console.log(this.sortir.Year);
        this.fields[3].label = ''+(this.sortir.Year-1)
        this.fields[4].label = ''+this.sortir.Year
        this.headerExcel[2] = ''+(this.sortir.Year-1)
        this.headerExcel[3] = ''+this.sortir.Year
        var ResponseConfig = await apiConfiq.getByCode('Laporan_Keuangan')
        // var Response = await apiAccountSummary.getLaporanKeuangan(this.GrpType[0].Type,this.sortir.Year - 1,this.sortir.Month,this.sortir.Cabang)
        var Response = await apiAccountSummary.getLaporanKeuangan(this.sortir.Year - 1,this.sortir.Month,this.sortir.Cabang)

        console.log(ResponseConfig.Data[0]);
        var DataConfig = JSON.parse(ResponseConfig.Data[0].Value)
        var PosisiKeuangan = DataConfig.Data[0]
        var Aktivitas = DataConfig.Data[1]
        console.log(Response);
        var item = this.templateItem(PosisiKeuangan,Response)
        var item2 = this.templateItem(Aktivitas,Response,'Aktivitas')

        console.log("items excel", this.itemsExcel);
        console.log("header excel", this.headerExcel);
        this.itemsExcel = item.Excel
          console.log(" excel", this.itemsExcel);
        this.itemsExcel2 = item2.Excel
        this.items = item.Table
        this.items2 = item2.Table

        console.log(this.items)
      } finally {
        this.loading = false
      }
    },
    templateItem(Data,Response,Status){

      var item = {Table:[],Excel:[]}
      var item2 = {Table:[],Excel:[]}
      var TotalYear = 0,TotalPrevYear = 0;
      this.setExcel2[1].titles = []
      this.setExcel[1].titles = []

      for (var i = 0; i < Data.Type.length; i++) {

        item.Excel.push({GroupName : Data.Type[i].Name, Status:"Head"})
        item2.Excel.push({GroupName : Data.Type[i].Name, Status:"Head"})
        item.Table.push({GroupName : '<b>'+Data.Type[i].Name+'</b>'})
        var SubType = Data.Type[i].SubType
        var SubTotalYear;
        var SubTotalPrevYear;

        if (SubType) {
          for (var j = 0; j < SubType.length; j++) {
            item.Excel.push({GroupName : SubType[j].Name, Status:"Head"})
            item2.Excel.push({GroupName : SubType[j].Name, Status:"Head"})
            item.Table.push({GroupName : '&nbsp;<b>'+SubType[j].Name+'</b>'})
            var Item = SubType[j].Item
            var ItemExcel = SubType[j].Item
            console.log(Item);

            if (SubType[j].SubTotal.IsCount) {
              SubTotalYear = 0
              SubTotalPrevYear = 0
            }

            if (Item) {
              for (var k = 0; k < Item.length; k++) {
                console.log(Item[k]);
                var Setting = Item[k].Setting
                console.log(Setting,k)
                var arr = Setting.split('||')
                var result = [];
                var itemBalanceYear = [];
                var itemBalancePrevYear = [];

                console.log(arr);
                // console.log(Response);
                for (var l = 0; l < arr.length; l++) {
                    if ((arr[l] != '+') && (arr[l] != '-') && (arr[l] != ',')) {
                      var accountSummary = Response.find(obj => {
                       // console.log(obj);
                       return obj.GrpCode.replace(/\s/g, '') == arr[l]
                      })
                      if (accountSummary) {
                        itemBalanceYear[l] = accountSummary.BalanceYear
                        itemBalancePrevYear[l] = accountSummary.BalancePrevYear
                      }else {
                        itemBalanceYear[l] = 0
                        itemBalancePrevYear[l] = 0
                      }
                      console.log(arr[l]);
                      console.log(accountSummary);
                    }else {
                      itemBalanceYear[l] = arr[l]
                      itemBalancePrevYear[l] = arr[l]
                    }
                }
                var BalanceYear = eval(itemBalanceYear.join(' '))
                var BalancePrevYear = eval(itemBalancePrevYear.join(' '))
                SubTotalYear += BalanceYear
                SubTotalPrevYear += BalancePrevYear

                item.Excel.push({
                  GroupName : Item[k].Name,
                  note : '',
                  BalanceYear: eval(itemBalanceYear.join(' ')),
                  BalancePrevYear: eval(itemBalancePrevYear.join(' ')),
                  Status:""
                })

                item2.Excel.push({
                  GroupName : Item[k].Name,
                  note : '',
                  BalanceYear: eval(itemBalanceYear.join(' ')),
                  BalancePrevYear: eval(itemBalancePrevYear.join(' ')),
                  Status:""
                })

                item.Table.push({
                  GroupName : '&nbsp;'+Item[k].Name,
                  note : '',
                  BalanceYear: this.formatCurrency(BalanceYear),
                  BalancePrevYear: this.formatCurrency(BalancePrevYear)
                })

              }
            }

            if (SubType[j].SubTotal.IsCount) {
              item.Table.push({
                GroupName : '<b>'+SubType[j].SubTotal.Name+'</b>',
                note : '',
                BalanceYear: this.formatCurrency(SubTotalYear),
                BalancePrevYear: this.formatCurrency(SubTotalPrevYear),
                Status:"Head"
              })
              item.Table.push({})
              TotalYear += SubTotalYear
              TotalPrevYear += SubTotalPrevYear
              item.Excel.push({
                GroupName : SubType[j].SubTotal.Name,
                note : '',
                BalanceYear: this.formatCurrency(SubTotalYear),
                BalancePrevYear: this.formatCurrency(SubTotalPrevYear),
                Status:"Head"
              })
              // item.Excel.push({})

              item2.Excel.push({
                GroupName : SubType[j].SubTotal.Name,
                note : '',
                BalanceYear: this.formatCurrency(SubTotalYear),
                BalancePrevYear: this.formatCurrency(SubTotalPrevYear),
                Status:"Head"
              })
              // item2.Excel.push({})
            }
          }
        }
      }
      this.setExcel[1].titles.push(
      {
        cels : 'A1',
        name : 'PKBL PT. Pertamina (Persero)'
      },
      {
        cels : 'A2',
        name : 'Statements of Financial Position'
      },
      {
        cels : 'A3',
        name : moment().month("December").endOf("month").format('MMMM DD') + ", " + (this.sortir.Year-1) + " and " + moment(this.sortir.Month, "M").endOf("month").format("MMMM DD, YYYY"),
      },
      )

      item.Excel.push({
        GroupName : 'Total',
        note : '',
        BalanceYear: this.formatCurrency(TotalYear),
        BalancePrevYear: this.formatCurrency(TotalPrevYear),
        Status:"Head"
      })
      // item.Excel.push({})

      this.setExcel2[1].titles.push(
      {
        cels : 'A1',
        name : 'PKBL PT. Pertamina (Persero)'
      },
      {
        cels : 'A2',
        name : 'Statements of Financial Position'
      },
      {
        cels : 'A3',
        name : moment().month("December").endOf("month").format('MMMM DD') + ", " + (this.sortir.Year-1) + " and " + moment(this.sortir.Month, "M").endOf("month").format("MMMM DD, YYYY"),
      },
      )
      item2.Excel.push({
        GroupName : 'Total',
        note : '',
        BalanceYear: this.formatCurrency(TotalYear),
        BalancePrevYear: this.formatCurrency(TotalPrevYear),
        Status:"Head"
      })
      item.Table.push({
        GroupName : '<b>Total</b>',
        note : '',
        BalanceYear: this.formatCurrency(TotalYear),
        BalancePrevYear: this.formatCurrency(TotalPrevYear)
      })



      return item
    },
    getYear(){
      this.optionYear = [{text:"--- Semua ---",value:null}]
      for (var i = new Date().getFullYear(); i >= 1990; i--) {
        this.optionYear.push(i)
      }
    },
  getMonth(){
    this.optionMonth = [{text:"--- Semua ---",value:null}]
    var bulan = ['January','February','March','April','May','June','July','August','September','October','November','Desember']
    for (var i = 0; i < bulan.length; i++) {
    console.log(i+1)
      this.optionMonth.push({text: bulan[i],value:i+1})
    }
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
  },
    // addNo(array){
    //
    //   for (var i = 0; i < array.length; i++) {
    //     array[i].No = i + 1
    //     array[i].Mutasi = this.formatCurrency((array[i].Debet) - (array[i].Credit))
    //     array[i].Debet = this.formatCurrency(array[i].Debet)
    //     array[i].Credit = this.formatCurrency(array[i].Credit)
    //   }
    //   return array
    // },
    getRowCount: function() {
      return this.itemsAccCategory1.length
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
.positionRight {
  text-align:right;
}
</style>
