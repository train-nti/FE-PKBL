<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Jurnal Post</strong>
          </div>
          <b-row>
            <b-col sm="12">
              <div class="form-group form-actions">
                  <form>
                    <div class="row">
                      <div class="col">
                        <label for="inputEmail4">Cariiii</label>
                        <input type="text" class="form-control" placeholder="">
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Dari</label>
                        <input type="date" class="form-control" placeholder="">
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Hingga</label>
                        <input type="date" class="form-control" placeholder="">
                      </div>
                    </div>
                  </form>
              </div>

            </b-col>
            <!-- <div class="form-group form-actions">
                  <form>
                    <div class="row">
                      <div class="col">
                        <v-select placeholder="--semua--"  :options="optionsPosition" required v-model="financialItem.Category.Position" style="width: 200px;" />
                      </div>
                      <div class="col">
                        <v-select placeholder="--semua" :options="optionsPosition" required v-model="financialItem.Category.Position" style="width: 200px;" />
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
                <c-table :table-data="items" :fields="fields" caption="" custom="newSlot" routeName="Form Document Desaigner" >
                  <template slot-scope="{ action }">
                    <i class="fa fa-pencil fa-md text-default button-icon" @click="showModal()"></i>
                    <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.AccountCategoryID)"></i>
                  </template>

                </c-table>

                <b-button variant="primary" v-on:click="saveFinancial()">Post</b-button>
                <b-button variant="primary" v-on:click="saveFinancial()">Unpost</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="modal-financial" title="Input Accrual" size="xl" hide-footer>
      <b-row>
        <b-col><label class="mr-sm-2" for="#">Periode</label></b-col>
        <b-col><v-select placeholder="Tahun" :options="optionsPosition" /></b-col>
      </b-row>
      <br>

      <b-row>
        <b-col><label class="mr-sm-2" for="#">Tanggal</label></b-col>
        <b-col><input class="form-control" placeholder="" type="date" required v-model="financialItem.Category.Position" /></b-col>
      </b-row>
      <br>

      <b-row>
        <b-col><label class="sm-2" for="#">Wilayah</label></b-col>
        <b-col>
          <v-select taggable multiple placeholder="Periode" :options="optionsPositions" required v-model="financialItem.AccountItem" />
        </b-col>
      </b-row>
      <br>
      <b-col sm="12">
                <c-table :table-data="itemsModal" :fields="fieldsModal" caption="" custom="newSlot" routeName="Form Document Desaigner" >
                  <template slot-scope="{ action }">
                    <i class="fa fa-pencil fa-md text-default button-icon" @click="showModal()"></i>
                    <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.AccountCategoryID)"></i>
                  </template>

                </c-table>
            </b-col>
      <b-button variant="primary" v-on:click="saveFinancial()">Simpan</b-button>
    </b-modal>
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import apiAccountCategory from '@/api/AK/AccountCategoryApiService'
import apiAccount from '@/api/AKAccountAPIService';

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable},
  data () {
    return {
      items: [],
      itemsArray: null,
      fields: [
        {label: 'Tanggal',key: 'Nama', sortable: true},
        {key: 'No Bukti'},
        {key: 'No Debitur'},
        {key: 'Nilai'},
        {key: 'Status'}
      ],

      itemsModal: [],
      itemsArrayModal: null,
      fieldsModal: [
        {label: 'No',key: 'Nama', sortable: true},
        {key: 'No Permohoman'},
        {key: 'Tgl MoU'},
        {key: 'Nama Instansi'},
        {key: 'Nama Pemohon'},
        {key: 'Nilai Penyaluran'},
        {key:'Aksi'}
      ],
      financialItem:{Account:[],Category:{}},
      options:[],
      optionsPosition:['1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010'],
      optionsPositions:['Sumbagsel','SUMBU','SUMBS','JBB','BALNUS','KALIM','MALPA','SULWS','','JBTT','JKK'],
    }
  },
  async created() {
    this.getAll()
  },
  methods: {
      async getAll() {
        this.loading = true

        try {
          var dataTable = await apiAccountCategory.getAll()

          for (var i = 0; i < dataTable.length; i++) {
            dataTable[i].id = dataTable[i].CategoryID
            dataTable[i].AccumulatedAcc = ''
            for (var j = 0; j < dataTable[i].Account.length; j++) {
              if (j < 4) {
                if (j == 0) {
                  dataTable[i].AccumulatedAcc += dataTable[i].Account[j].Code
                }else {
                  dataTable[i].AccumulatedAcc += ',' + dataTable[i].Account[j].Code
                }

              }else {
                break
              }
            }
          }

          var getAccount = await apiAccount.getAll()
          this.options = [];
          for (var i = 0; i < getAccount.length; i++) {
            this.options.push({ label: getAccount[i].Name,value: getAccount[i].Code })
          }

          this.items = dataTable
          this.itemsArray = () => this.items
          console.log(this.items)
        } finally {
          this.loading = false
        }
      },
      async saveFinancial(){
        try {
          this.financialItem.Account = []
          if (this.financialItem.AccountItem != null) {

            for (var i = 0; i < this.financialItem.AccountItem.length; i++) {
              this.financialItem.Account.push({Code : this.financialItem.AccountItem[i].value})
            }

          }
          apiAccountCategory.create(this.financialItem)
          console.log(this.financialItem);
        }
        finally {

        }
      },
      deleteItem: async function(id) {
        if (confirm('Are you sure you want to delete this record?')) {
          console.log(id);
          // await api.delete(DocCode)
          // await this.getAll()
        }
      },
      async showModal() {
        this.$root.$emit('bv::show::modal','modal-financial', '#btnShow')
      },

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
