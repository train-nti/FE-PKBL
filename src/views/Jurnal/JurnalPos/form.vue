<template>
  <div class="animated fadeIn">
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Jurnal Post</strong>
          </div>
          <b-tabs class="full-widths" v-model="tabIndex[0]">
            <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[0]}}
              </template>

            <!-- <b-col sm="12">
              <div class="form-group form-actions">
                  <form>
                    <div class="row">
                      <div class="col">
                        <label for="inputEmail4">Cari</label>
                        <b-form-group class="mb-0">
                          <b-input-group>
                            <b-form-input v-model="Search" placeholder="Cari..."></b-form-input>
                            <b-input-group-append>
                              <b-button :disabled="!Search" @click="Search = ''">Clear</b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </b-form-group>
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Dari</label>
                        <input type="date" class="form-control" v-model="Filter.StartDate" placeholder="">
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Hingga</label>
                        <input type="date" class="form-control" v-model="Filter.EndDate" placeholder="">
                      </div>
                    </div>
                  </form>
              </div>

            </b-col> -->
            <!-- <div class="form-group form-actions">
                  <form>
                    <div class="row">
                      <div class="col">
                        <v-select placeholder=""  :options="optionsPosition" required v-model="financialItem.Category.Position" style="width: 200px;" />
                      </div>
                      <div class="col">
                        <v-select placeholder="" :options="optionsPosition" required v-model="financialItem.Category.Position" style="width: 200px;" />
                      </div>
                      <div class="col">
                         <v-select placeholder="10" :options="optionsPosition" required v-model="financialItem.Category.Position" style="width: 200px;"/>
                      </div>
                      <div class="col">
                         <v-select placeholder="" :options="optionsPosition" required v-model="financialItem.Category.Position" style="width: 200px;"/>
                      </div>
                      <div class="col">
                        <button type="dropdown-item">Filter</button>
                      </div>
                      <div class="col">
                         <button type="dropdown-item">Clear</button>
                      </div>
                    </div>
                  </form>
              </div> -->
            <b-col sm="12">
                <cTablesV2 :infoModalStatus="infoModal" :items="items" :fields="fields">
                  <template slot-scope="{ row }">
                    <router-link :to="{ name: 'General Journal Form', params: { id: row.Jrn_ID } }">
                      <b-button pill variant="primary" size="md">
                        Post
                      </b-button>
                    </router-link>
                  </template>
                </cTablesV2>
            </b-col>
          </b-tab>
          <!-- <b-tab>
            <template slot="title">
              <i class="icon-calculator"></i> {{tabs[1]}}
            </template>
          </b-tab>
          <b-tab>
            <template slot="title">
              <i class="icon-calculator"></i> {{tabs[2]}}
            </template>
          </b-tab> -->
        </b-tabs>
        </b-card>
      </b-col>
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import cTablesV2 from '@/components/Tables';
import apiJournal from '@/api/AKJournalApiService'
import apiAccount from '@/api/AKAccountApiService';

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable, cTablesV2},
  data () {
    return {
      Search:'',
      Filter:{
        StartDate:null,
        EndDate:null
      },
      items: [],
      itemsArray: null,
      fields: [
        {label: 'No',key: 'No'},
        {label: 'Nama',key: 'FullName'},
        {label: 'Tanggal',key: 'JournalDate', sortable: true},
        // {label: 'No Mitra Binaan',key: 'DANumber'},
        {label: 'No Bukti',key: 'JournalNumber'},
        // {label: 'No Bukti',key: 'JournalNumber'},
        {key: 'Description', label: 'Deskripsi'},
        {key: 'Nilai', tdClass: 'positionRight'},
        {key:'actions',label:'Aksi'}
      ],
      itemsModal: [],
      itemsArrayModal: null,
      financialItem:{Account:[],Category:{}},
      options:[],
      optionsPosition:['1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010'],
      optionsPositions:['Sumbagsel','SUMBU','SUMBS','JBB','BALNUS','KALIM','MALPA','SULWS','','JBTT','JKK'],
      //
      infoModal : false,
      tabIndex: [0, 0],
      tabs: [
        'Draft',
        // 'Post',
        // 'Unpost'
      ],
    }
  },
  async created() {
    this.cabang = localStorage.cabang
    console.log('cabang',this.cabang);
    this.username = localStorage.username
    console.log('username',this.username);

    this.getAll()
  },
  watch:{
    'Filter.StartDate': async function () {
     this.getAll()
   },
    'Filter.EndDate': async function () {
     this.getAll()
    }
  },
  methods: {
      async getAll() {
        this.loading = true
        console.log(this.Filter);
        try {
          var dataTable = await apiJournal.getUnPosting(this.cabang,this.Filter.StartDate,this.Filter.EndDate)
          console.log(dataTable);
          for (var i = 0; i < dataTable.length; i++) {
            dataTable[i].No = i+1
            dataTable[i].Nilai = 0
            for (var j = 0; j < dataTable[i].JournalItem.length; j++) {
              if (dataTable[i].JournalItem[j].IsDebet) {
                var code = dataTable[i].JournalItem[j].AccountCode
                console.log('sub',code.substring(0,2));
                if ((code.substring(0,2) != '29') && (code.substring(0,2) != '19')) {
                  dataTable[i].Nilai += dataTable[i].JournalItem[j].ItemValue
                }
              }
            }
            if( dataTable[i].IsRevert == 2){
              dataTable[i].Nilai = this.formatCurrency(this.ConvertMinus(dataTable[i].Nilai))
           }else{
              dataTable[i].Nilai = this.formatCurrency(dataTable[i].Nilai)
           }
            // dataTable[i].Nilai = this.formatCurrency(dataTable[i].Nilai)
            dataTable[i].JournalDate = this.formatDateDMY(dataTable[i].JournalDate)
            if (dataTable[i].FullName) {
              dataTable[i].FullName = dataTable[i].FullName
            }else if(dataTable[i].Receiver){
              dataTable[i].FullName = dataTable[i].Receiver
            }else{
              if (dataTable[i].ReceiverWorkArea) {
                dataTable[i].FullName = dataTable[i].ReceiverWorkArea +" - "+ dataTable[i].WANameMasuk
              }else {
                dataTable[i].FullName = ''
              }
            }
          }

          // var getAccount = await apiAccount.getAll()
          // this.options = [];
          // for (var i = 0; i < getAccount.length; i++) {
          //   this.options.push({ label: getAccount[i].Name,value: getAccount[i].Code })
          // }
          // console.log(data);
          this.items = dataTable
          this.itemsArray = () => this.items
          console.log("items",this.items)
        } finally {
          this.loading = false
        }
      },
      // async updatePosting(id,isPosting){
      //   try {
      //     var Journal = { IsPosting:isPosting }
      //     var response = await apiJournal.updatePosting(id,Journal)
      //     console.log(Journal, isPosting);
      //     this.$router.push('/bussiness-process-desaigner/document-desaigner')
      //     this.showNotif(response,'Journal')
      //     this.getAll()
      //   }
      //   finally {
      //
      //   }
      // },

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
