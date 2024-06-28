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
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <div style="text-align: left;float: left;">
                Pembayaran
            </div>
             <div style="text-align: right;">
                 <a :href="globalEnv.server == 'pertamina' ? 'pkbl_online/static/template/ImportPembayaran.xlsx' : 'static/template/ImportPembayaran.xlsx'"  class="btn btn-primary" download>Template Pembayaran</a>
                <!-- <a href="https://drive.google.com/uc?export=view&id=12Lty__yziJN9v3d3XfjbJYfjDd43QLZO" class="btn btn-primary" download>Template Pembayaran</a> -->
            </div>
          </div>
          <b-tabs>
            <b-tab active>
              <template slot="title">
                {{tabs[0]}}
              </template>
              <br>

              <b-row>
                <b-col sm="12">
                  <KadekTable :items="items" :fields="fields" :striped="true"  :itemsExcel="itemsExcelBB"  :settingExcel="setExcelBB"  :headerExcel="headerExcelBB" sheetName="Monitor Belum Bayar" filename="Monitor Belum Bayar">
                    <template slot-scope="{ row }">
                      <router-link :to="{ name: 'Pembayaran', params: {DACode:row.DACode,Value:row.TotalBill}}">
                        <b-button variant="primary" size="sm">
                          Bayar
                        </b-button>
                      </router-link><br><br>
                      <router-link :to="{ name: 'Kartu Piutang Print', params: {DACode:row.DACode,Print:'Koreksi'}}">
                        <b-button variant="secondary" size="sm">
                          Koreksi
                        </b-button>
                      </router-link>
                       <!-- <router-link :to="{ name: 'Kartu Piutang', params: {DACode:row.DACode}}">
                        <b-button pill variant="primary" size="md">
                          KP
                        </b-button>
                      </router-link>
                       <router-link :to="{ name: 'Kartu Piutang Print', params: {DACode:row.DACode,Print:'print'}}">
                        <b-button pill variant="primary" size="md">
                          Print KP
                        </b-button>
                      </router-link> -->
                    </template>
                  </KadekTable>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab>
              <template slot="title">
                {{tabs[1]}}
              </template>
              <br>

              <b-row>
                <b-col sm="12">
                  <KadekTable :infoModalStatus="infoModalStatus" :items="items3" :fields="fields2" :striped="true" :itemsExcel="itemsExcelSB" :settingExcel="setExcelSB" :headerExcel="headerExcelBB" sheetName="Monitor Sudah Bayar" filename="Monitor Sudah Bayar">
                    <!-- <template slot-scope="{ row }"> -->
                      <!-- <router-link :to="{ name: "Pembayaran", params: {DACode:row.DACode,Value:row.TotalBill}, query: {q1: "q1"} }"> -->
                       <!--  <b-button pill @click="kartuPiutang(row.DACode)" variant="primary" size="md">
                          Kartu Piutang
                        </b-button> -->
                       <!--   <router-link :to="{ name: 'Kartu Piutang', params: {DACode:row.DACode}}">
                        <b-button pill variant="primary" size="md">
                          KP
                        </b-button>
                      </router-link>
                       <router-link :to="{ name: 'Kartu Piutang Print', params: {DACode:row.DACode,Print:'print'}}">
                        <b-button pill variant="primary" size="md">
                          Print KP
                        </b-button> -->
                      <!-- </router-link>
                    </template> -->
                  </KadekTable>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab>
              <template slot="title">
                {{tabs[2]}}
              </template>
              <br>

              <b-row>
                <b-col sm="12">
                  <KadekTable :items="items2" :fields="fieldsLunas" :striped="true" :itemsExcel="itemsExcelLL" :settingExcel="setExcelSB" :headerExcel="headerExcelBB"  sheetName="Monitor Pembayaran" filename="Monitor Pembayaran">
                    <template slot-scope="{ row }">
                      <router-link :to="{ name: 'Kartu Piutang Print', params: {DACode:row.DACode,Print:'Koreksi'}}">
                        <b-button variant="secondary" size="sm">
                          Koreksi
                        </b-button>
                      </router-link><br><br>
                    </template>
                  </KadekTable>
                </b-col>
              </b-row>
            </b-tab>
          <!--    <b-tab>
              <template slot="title">
                {{tabs[2]}}
              </template>
              <KadekTable :items="itemLunas" :fields="fieldsLunas" :striped="true" :itemsExcel="itemsExcelL" :headerExcel="headerExcelL" sheetName="Monitor Pembayaran Lunas" filename="Monitor Pembayaran Lunas">
                <template slot-scope="{ row }">
                   <router-link :to="{ name: 'Lebih Bayar Form', params: {Status:'penerimaan',DACode:row.DACode,Sektor:row.BusinessSector}}">
                    <span class="fa fa-plus"></span>
                  </router-link>
                </template>
              </KadekTable>
            </b-tab> -->
            <b-tab>
              <template slot="title">
                {{tabs[3]}}
              </template>
              <KadekTable :items="itemLebihBayar" :fields="fieldsLebihBayar" :striped="true" :itemsExcel="itemsExcelLB" :settingExcel="setExcelL" :headerExcel="headerExcelLB" sheetName="Monitor Pembayaran Lebih Bayar" filename="Monitor Pembayaran Lebih Bayar">
                    <template slot-scope="{ row }">
                       <router-link :to="{ name: 'Lebih Bayar Form', params: {Status:'kelebihan',DACode:row.DACode,Sektor:row.BusinessSector,Value:row.AdvPayment}}">
                        <span class="fa fa-plus"></span>
                      </router-link>
                    </template>
              </KadekTable>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
       <!-- Modal Component -->

   <!--  <b-modal ref="modal1" id="modal1" title="Kartu Piutang" size="xl">
      <b-table :items="itemsKartuPiutang" :fields="fieldsKartuPiutang" responsive="lg">
        <template slot="thead-top" slot-scope="data">
          <tr>
            <th class="text-center" colspan="5">Kewajiban</th>
            <th class="text-center" colspan="5">Pembayaran</th>
          </tr>
        </template>
      </b-table>
    </b-modal> -->
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import KadekTable from '@/components/Tables.vue'
import apiDebitAccount from  '@/api/PK/DebitAccountApiService'
import apiDebitor from '@/api/PK/DebitorApiService'
import apiDebTransaction from '@/api/PK/DebTransactionApiService';
import apiInstSchedule from '@/api/PK/InstScheduleApiService';
import apiWorkArea from '@/api/WorkArea1ApiService';
import BtnExcel from '@/components/Excel'

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable, KadekTable},
  data () {
    return {
      cabang: null,
      items: [],
      items2: [],
      items3: [],
      itemLebihBayar: [],
      itemsArray: null,
        headerExcelBB : ["No",'No. Mitra','Nama','Tgl Jatuh Tempo','Tunggakan','Nilai Jasa','No. Hp Mitra','Email','Alamat Domisili','Usaha','Nilai Disetujui','Region','Keterangan'], // array
      setExcelBB : [
        {
          Cell : ['A','B','C','D','E','F','G','H','I','J','K','L','M']
        },
        {
          titles : [{
           cels : 'A1',
           name : 'Monitor Belum Bayar'
         }]
        },
        {
          mergeTo : ""
        },
        {
          origin : "A4"
        },
        {
            position : [
              {
                colums : 1,
                left : true
              },
              {
                colums : 2,
                left : true
              },
              {
                colums : 3,
                left : true
              },
              {
                colums : 4,
                left : true
              },
              {
                colums : 7,
                left : true
              },
              {
                colums : 8,
                left : true
              },
              {
                colums : 9,
                left : true
              },
              {
                colums : 10,
                left : true
              },
              {
                colums : 12,
                left : true
              },
              {
                colums : 13,
                left : true
              },
            ]
          }
      ],
       setExcelSB : [
        {
          Cell : ['A','B','C','D','E','F','G','H','I','J','K','L','M']
        },
        {
          titles : [{
           cels : 'A1',
           name : 'Monitor Sudah Bayar'
         }]
        },
        {
          mergeTo : ""
        },
        {
          origin : "A4"
        },
        {
            position : [
              {
                colums : 1,
                left : true
              },
              {
                colums : 2,
                left : true
              },
              {
                colums : 3,
                left : true
              },
              {
                colums : 4,
                left : true
              },
              {
                colums : 7,
                left : true
              },
              {
                colums : 8,
                left : true
              },
              {
                colums : 9,
                left : true
              },
              {
                colums : 10,
                left : true
              },
              {
                colums : 12,
                left : true
              },
              {
                colums : 13,
                left : true
              },
            ]
          }
      ],
        itemsExcelBB : [],
        itemsExcelSB: [],
      fields: [
        {key: 'no', label: 'No'},
        {key: 'DANumber', label: 'No. Mitra'},
        {key: 'FullName', label: 'Nama', sortable: true},
        {key: 'DueDate', label: 'Tgl Jatuh Tempo / Bulan', sortable: true},
        {key: 'SettValue', label: 'Tunggakan', sortable: true,tdClass: 'positionRight'},
        {key: 'InterestVal', label: 'Nilai Jasa', sortable: true,tdClass: 'positionRight'},
        {key: 'Hp1', label: 'No. Hp Mitra', sortable: true},
        {key: 'eMail', label: 'Email', sortable: true},
        {key: 'Address', label: 'Alamat Domisili', sortable: true},
        {key: 'Instance', label: 'Usaha', sortable: true},
        {key: 'DebValue', label: 'Nilai Disetujui', sortable: true,tdClass: 'positionRight'},
        {key: 'WACode', label: 'Region', sortable: true},
        {key: 'Description', label: 'Keterangan', sortable: true},
        {key: 'actions',label: 'Aksi'},
      ],
      fields2: [
        {key: 'no', label: 'No'},
        {key: 'DANumber', label: 'No. Mitra'},
        {key: 'FullName', label: 'Nama', sortable: true},
        {key: 'SettValue', label: 'Nilai Disetujui', sortable: true,tdClass: 'positionRight'},
        {key: 'InterestVal', label: 'Nilai Jasa', sortable: true,tdClass: 'positionRight'},
        {key: 'Hp1', label: 'No. Hp Mitra', sortable: true},
        {key: 'eMail', label: 'Email', sortable: true},
        {key: 'Address', label: 'Alamat Domisili', sortable: true},
        {key: 'Instance', label: 'Usaha', sortable: true},
        {key: 'WACode', label: 'Region', sortable: true}
      ],
        headerExcelL : ["No",'Kode','Nama','Nama Usaha','Alamat','Tanggal','Pinjaman','Jkt Wkt','Cabang','User Log'], // array
        itemsExcelL : [],
        setExcelL : [
        {
          Cell : ['A','B','C','D','E','F','G','H','I','J','K','L','M']
        },
        {
          titles : [{
           cels : 'A1',
           name : 'Pengembalian Kelebihan'
         }]
        },
        {
          mergeTo : "C"
        },
        {
          origin : "A4"
        },
        {
            position : [
              {
                colums : 1,
                left : true
              },
              {
                colums : 2,
                left : true
              },
              {
                colums : 3,
                left : true
              },
              {
                colums : 4,
                left : true
              },
              {
                colums : 12,
                left : true
              },
              {
                colums : 13,
                left : true
              },
            ]
          }
      ],
      itemsExcelLL:[],
      itemLunas:[],
      fieldsLunas: [
        {key: 'no', label: 'No'},
        {key: 'DANumber', label: 'No. Mitra'},
        {key: 'FullName', label: 'Nama', sortable: true},
        {key: 'DueDate', label: 'Tgl Jatuh Tempo / Bulan', sortable: true},
        {key: 'SettValue', label: 'Tunggakan', sortable: true,tdClass: 'positionRight'},
        {key: 'InterestVal', label: 'Nilai Jasa', sortable: true,tdClass: 'positionRight'},
        {key: 'Hp1', label: 'No. Hp Mitra', sortable: true},
        {key: 'eMail', label: 'Email', sortable: true},
        {key: 'Address', label: 'Alamat Domisili', sortable: true},
        {key: 'Instance', label: 'Usaha', sortable: true},
        {key: 'DebValue', label: 'Nilai Disetujui', sortable: true,tdClass: 'positionRight'},
        {key: 'WACode', label: 'Region', sortable: true},
        {key: 'actions',label: 'Aksi'},
      ],
      // fieldsKartuPiutang: [{
      //     key: 'Sequence',
      //     label: 'Ke'
      //   },
      //   {
      //     key: 'SettValue',
      //     label: 'Pokok'
      //   },
      //   {
      //     key: 'InterestVal',
      //     label: 'Jasa'
      //   },
      //   {
      //     key: 'TotalBill',
      //     label: 'Total'
      //   },
      //   {
      //     key: 'DueDate',
      //     label: 'Jatuh Tempo'
      //   },
      //   {
      //     key: 'TransNo',
      //     label: 'No Bukti'
      //   },
      //   {
      //     key: 'TransDate',
      //     label: 'Tgl Bayar'
      //   },
      //   {
      //     key: 'TransSettValue',
      //     label: 'Pokok'
      //   },
      //   {
      //     key: 'Interest',
      //     label: 'Jasa'
      //   },
      //   {
      //     key: 'TransValue',
      //     label: 'Total'
      //   },
      // ],
        headerExcelLB : ["#",'Kode','Nama','Nama Usaha','Pinjaman','Jasa','Bayar Pokok','Bayar Jasa','Sisa Pokok','Sisa Jasa','Kelebihan Bayar','Cabang','User Log'], // array
        itemsExcelLB : [],
      fieldsLebihBayar:[
        {key: 'no', label: '#'},
        {key: 'DANumber', label: 'Kode'},
        {key: 'FullName', label: 'Nama', sortable: true},
        {key: 'BusinessName', label: 'Nama Usaha', sortable: true},
        {key: 'SettValue', label: 'Pinjaman', sortable: true,tdClass: 'positionRight'},
        {key: 'InterestVal', label: 'Jasa', sortable: true,tdClass: 'positionRight'},
        {key: 'Loan', label: 'Bayar Pokok', sortable: true,tdClass: 'positionRight'},
        {key: 'Interest', label: 'Bayar Jasa', sortable: true,tdClass: 'positionRight'},
        {key: 'TotalValue', label: 'Sisa Pokok', sortable: true,tdClass: 'positionRight'},
        {key: 'TotalInterest', label: 'Sisa Jasa', sortable: true,tdClass: 'positionRight'},
        {key: 'AdvPaid', label: 'Kelebihan Bayar', sortable: true,tdClass: 'positionRight'},
        {key: 'actions',label: 'Aksi'},
        {key: 'WACode', label: 'Cabang', sortable: true},
        {key: 'UpdatedBy', label: 'User Log', sortable: true},
      ],
      itemsKartuPiutang:[],
      tabIndex: [0, 0],
      tabs: [
        'Belum Bayar',
        // 'Bulan Ini Belum Bayar',
        'Sudah Bayar',
        'Lunas',
        'Pengembalian Kelebihan',
      ],
      infoModalStatus : false,
    }
  },
  async created() {
    this.cabang = localStorage.cabang
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.getAll()
    this.ListLebihBayar()
    this.ListLunas()
  },
  methods: {
      async getAll() {
        this.loading = true
         var workarea = await apiWorkArea.getByCode(this.cabang)
         var WAName = "Semua"
         if(workarea[0]){
           if(workarea[0].Name){
             WAName = workarea[0].Name
           }
         }
        var Jadwal = await apiInstSchedule.getByTagihan(1,this.cabang)
        var Jadwal2 = await apiInstSchedule.getByTagihanLunas(this.cabang)
        var Jadwal3 = await apiInstSchedule.getByTagihan(2,this.cabang)
        // console.log("int ",jadwal);
        this.items = await this.loopData(Jadwal.Data,1)
         this.itemsExcelBB.push({
                  no : "",
                  DANumber : "",
                  FullName : "",
                  DueDate : "",
                  SettValue : "",
                  InterestVal : "",
                  Hp1 : "",
                  eMail : "",
                  Address : ""  ,
                  Instance : "" ,
                  DebValue : "" ,
                  WACode : "" ,
                  Description : ""
                })
         this.setExcelBB[1].titles.push(
         {
           cels : 'A2',
           name : 'Region ' + WAName
         },
         )
        //this.items2 = await this.loopData(Jadwal2.Data)
        this.items3 = await this.loopData(Jadwal3.Data,2)
        this.itemsExcelSB.push({
                  no : "",
                  DANumber : "",
                  FullName : "",
                  DueDate : "",
                  SettValue : "",
                  InterestVal : "",
                  Hp1 : "",
                  eMail : "",
                  Address : ""  ,
                  Instance : "" ,
                  DebValue : "" ,
                  WACode : "" ,
                  Description : ""
                })
        this.setExcelSB[1].titles.push(
         {
           cels : 'A2',
           name : 'Region ' + WAName
         },
         )


        this.items2 = await this.loopData(Jadwal2.Data,3)
        this.itemsExcelLL.push({
                  no : "",
                  DANumber : "",
                  FullName : "",
                  DueDate : "",
                  SettValue : "",
                  InterestVal : "",
                  Hp1 : "",
                  eMail : "",
                  Address : ""  ,
                  Instance : "" ,
                  DebValue : "" ,
                  WACode : "" ,
                  Description : ""
                })
        // console.log("Jadwal", Jadwal);

      },
      async koreksi(TransNo){
        this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
      },
      async loopData(Data,type){
        // console.log(Data.length);
        var curData = []
        for (var i = 0; i < Data.length; i++) {
          // console.log(i);
          var LoopJadwal = Data[i]
          var Alamat = ""
          var Provinsi = ""
          var Kabupaten = ""
          var Kecamatan = ""
          var Kelurahan = ""
          if(LoopJadwal.Address){
            Alamat = LoopJadwal.Address
          }
          if(LoopJadwal.Prov_code){
            Provinsi = LoopJadwal.Prov_code
          }
          if(LoopJadwal.Dist_code){
            Kabupaten = LoopJadwal.Dist_code
          }
          if(LoopJadwal.Subdis_code){
            Kecamatan = LoopJadwal.Subdis_code
          }
          if(LoopJadwal.Village_code){
            Kelurahan = LoopJadwal.Village_code
          }
          // console.log("LOOPJADWAL", LoopJadwal);
          // var LoopDebitAccount = await apiDebitAccount.getOne(LoopJadwal.DACode)
          // console.log("LoopDebitAccount", LoopDebitAccount.Data[0]);
          // var LoopDebitor = await apiDebitor.getOne(LoopDebitAccount.Data[0].DebCode)
          // console.log("LoopDebitor", LoopDebitor.Data[0]);

          LoopJadwal.no = i+1
          //  LoopJadwal.DACode = LoopDebitAccount.Data[0].DACode
          // LoopJadwal.DANumber = LoopDebitAccount.Data[0].DANumber
          // LoopJadwal.FullName = LoopDebitor.Data[0].FullName
          LoopJadwal.DueDate = this.formatDateDMY(LoopJadwal.DueDate)
          LoopJadwal.SettValue = this.formatCurrency(LoopJadwal.SettValue)
          LoopJadwal.InterestVal = this.formatCurrency(LoopJadwal.InterestVal)
          // LoopJadwal.Hp1 = LoopDebitor.Data[0].Hp1
          // LoopJadwal.eMail = LoopDebitor.Data[0].eMail
          LoopJadwal.Address = Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi
          // LoopJadwal.Instance = LoopDebitor.Data[0].Instance
          if (LoopJadwal.WACode) {
          // var WACode = await apiWorkArea.getByCode(LoopDebitor.Data[0].WACode)
            // if(WACode[0]){
              LoopJadwal.WACode = LoopJadwal.WAName
            // }
          }else{
            LoopJadwal.WACode = 'Kosong'
          }

          LoopJadwal.DebValue = this.formatCurrency(LoopJadwal.DebValue)
          if (LoopJadwal.IsPaid != true) {
            // LoopJadwal.Description = "Belum Bayar"
            curData.push(LoopJadwal)
          }else{
            // LoopJadwal.Description = "Sudah Bayar"
            curData.push(LoopJadwal)
          }
          if(type == 1){
            LoopJadwal.Description = "Belum Bayar"
            this.itemsExcelBB.push({
                  no : LoopJadwal.no,
                  DANumber : LoopJadwal.DANumber,
                  FullName : LoopJadwal.FullName,
                  DueDate : LoopJadwal.DueDate,
                  SettValue : this.CurrencyToNumber(LoopJadwal.SettValue),
                  InterestVal : this.CurrencyToNumber(LoopJadwal.InterestVal),
                  Hp1 : LoopJadwal.Hp1,
                  eMail : LoopJadwal.eMail,
                  Address : Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi  ,
                  Instance : LoopJadwal.Instance ,
                  DebValue : this.CurrencyToNumber(LoopJadwal.DebValue) ,
                  WACode : LoopJadwal.WACode ,
                  Description : LoopJadwal.Description
                })
          }else if(type == 2){
            LoopJadwal.Description = "Sudah Bayar"
              this.itemsExcelSB.push({
                  no : LoopJadwal.no,
                  DANumber : LoopJadwal.DANumber,
                  FullName : LoopJadwal.FullName,
                  DueDate : LoopJadwal.DueDate,
                  SettValue : this.CurrencyToNumber(LoopJadwal.SettValue),
                  InterestVal : this.CurrencyToNumber(LoopJadwal.InterestVal),
                  Hp1 : LoopJadwal.Hp1,
                  eMail : LoopJadwal.eMail,
                  Address : Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi  ,
                  Instance : LoopJadwal.Instance ,
                  DebValue : this.CurrencyToNumber(LoopJadwal.DebValue),
                  WACode : LoopJadwal.WACode ,
                  Description : LoopJadwal.Description
                })

          }else if(type == 3){

            LoopJadwal.Description = "Lunas"
              this.itemsExcelLL.push({
                  no : LoopJadwal.no,
                  DANumber : LoopJadwal.DANumber,
                  FullName : LoopJadwal.FullName,
                  DueDate : LoopJadwal.DueDate,
                  SettValue : this.CurrencyToNumber(LoopJadwal.SettValue),
                  InterestVal : this.CurrencyToNumber(LoopJadwal.InterestVal),
                  Hp1 : LoopJadwal.Hp1,
                  eMail : LoopJadwal.eMail,
                  Address : Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi  ,
                  Instance : LoopJadwal.Instance ,
                  DebValue : this.CurrencyToNumber(LoopJadwal.DebValue),
                  WACode : LoopJadwal.WACode ,
                  Description : LoopJadwal.Description
                })
          }
        }
        return curData
      },

      async ListLebihBayar(){
           let dataLebihBayar = await apiInstSchedule.getLebihBayar(this.cabang)
            for (var i = 0; i < dataLebihBayar.Data.length; i++) {
              var data = dataLebihBayar.Data[i]
            // console.log("LebihBayar",data)
            data.no = i + 1
            data.SettValue  = this.formatCurrency(data.SettValue)
            data.InterestVal = this.formatCurrency(data.InterestVal)
            data.Loan = this.formatCurrency(data.Loan)
            data.Interest = this.formatCurrency(data.Interest)
            data.TotalValue = this.formatCurrency(data.TotalValue)
            data.TotalInterest = this.formatCurrency(data.TotalInterest)
            if(data.AdvPayment){
              data.AdvPaid = this.formatCurrency(data.AdvPayment)
            }else{
              data.AdvPaid = this.formatCurrency(0)
            }
           if (data.WAName) {
                data.WACode = data.WAName
          }else{
            data.WACode = 'Kosong'
          }
                this.itemsExcelLB.push({
                  no : data.no,
                  DANumber : data.DANumber,
                  FullName : data.FullName,
                  BusinessName : data.BusinessName,
                  SettValue : this.CurrencyToNumber(data.SettValue),
                  InterestVal : this.CurrencyToNumber(data.InterestVal),
                  Loan : this.CurrencyToNumber(data.Loan),
                  Interest : this.CurrencyToNumber(data.Interest),
                  TotalValue : this.CurrencyToNumber(data.TotalValue),
                  TotalInterest : this.CurrencyToNumber(data.TotalInterest),
                  AdvPaid : this.CurrencyToNumber(data.AdvPaid),
                  WACode : data.WACode ,
                  UpdatedBy : data.UpdatedBy
                })
            this.itemLebihBayar.push(data)
            }
             this.itemsExcelLB.push({
                  no : "",
                  DANumber : "",
                  FullName : "",
                  BusinessName : "",
                  SettValue : "",
                  InterestVal : "",
                  Loan : "",
                  Interest : "",
                  TotalValue : "",
                  TotalInterest : "",
                  AdvPaid : "",
                  WACode : "",
                  UpdatedBy : ""
                })
              var workarea = await apiWorkArea.getByCode(this.cabang)
             var WAName = "Semua"
             if(workarea[0]){
               if(workarea[0].Name){
                 WAName = workarea[0].Name
               }
             }
            this.setExcelL[1].titles.push(
           {
             cels : 'A2',
             name : 'Region ' + WAName
           },
           )
      },
      async ListLunas(){
         let dataLunas = await apiDebitAccount.ListOfPembayaranLunas(this.cabang)
         console.log("DATA LUNAS",dataLunas)
          for (var i = 0; i < dataLunas.Data.length; i++) {
              var data = dataLunas.Data[i]
              data.no = i + 1
              if( data.DebValue){
                data.DebValue = this.formatCurrency(data.DebValue)
              }
               if(data.ContractDate){
                data.ContractDate = this.formatDateDMY(data.ContractDate)
               }
               if (data.WAName) {
                    data.WACode = data.WAName
                }else{
                  data.WACode = 'Kosong'
                }
                this.itemsExcelL.push({
                  no : data.no,
                  DANumber : data.DANumber,
                  FullName : data.FullName,
                  BusinessName : data.BusinessName,
                  BusinessAddress : data.BusinessAddress,
                  ContractDate : data.ContractDate,
                  DebValue : this.CurrencyToNumber(data.DebValue),
                  Tenor : data.Tenor,
                  WACode : data.WACode,
                  UpdatedBy : data.UpdatedBy
                })
              this.itemLunas.push(data)
          }
      }

  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
