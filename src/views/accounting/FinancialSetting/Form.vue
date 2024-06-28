<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Financial Item</strong>
          </div>
          <b-row>
            <!-- Dicomment soalnya fungsinya masih ada error sedikit -->
            <!-- <b-col sm="2" offset-sm="11">
              <div class="form-group form-actions">
                  <b-button size="md" @click="showModal()" variant="primary">Tambah</b-button>
              </div>
            </b-col> -->
            <b-col sm="12">
                <c-table :table-data="items" :fields="fields" caption="" custom="newSlot" routeName="Form Document Desaigner" >
                  <template slot-scope="{ action }">
                    <i class="fa fa-pencil fa-md text-default button-icon" @click="showModal()"></i>
                    <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.AccountCategoryID)"></i>
                  </template>

                </c-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="modal-financial" title="Financial Item" size="lg" hide-footer>
      <b-row>
        <b-col><label class="mr-sm-2" for="#">Item Nama</label></b-col>
        <b-col><b-form-input class="mb-2 mb-sm-0" type="text" id="#" placeholder="ex: 1.000.000.000" required v-model="financialItem.Category.Name"></b-form-input></b-col>
      </b-row>
      <br>

      <b-row>
        <b-col><label class="mr-sm-2" for="#">Posisi</label></b-col>
        <b-col><v-select placeholder="ex : Aset" :options="optionsPosition" required v-model="financialItem.Category.Position" /></b-col>
      </b-row>
      <br>

      <b-row>
        <b-col><label class="mr-sm-2" for="#">Akun Akumulasi</label></b-col>
        <b-col>
          <v-select taggable multiple placeholder="ex : Kas - Program Kemitraan" :options="options" required v-model="financialItem.AccountItem" />
        </b-col>
      </b-row>
      <br>

      <b-button variant="primary" v-on:click="saveFinancial()">Simpan</b-button>
    </b-modal>
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import apiAccountCategory from '@/api/AK/AccountCategoryApiService'
import apiAccount from '@/api/AKAccountApiService';

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable},
  data () {
    return {
      items: [],
      itemsArray: null,
      fields: [
        {label: 'Item Laporan Keuangan',key: 'Name', sortable: true},
        {key: 'Posisi'},
        // {key: 'Description'},
        {label: 'Akun Akumulasi',key: 'AccumulatedAcc'},
        {key:'aksi'}
      ],
      financialItem:{Account:[],Category:{}},
      options:[],
      optionsPosition:['Aset','Kewajiban','Modal'],
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
