<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Laporan keuangan</strong>
          </div>
          <b-row>
            <b-col sm="2" offset-sm="11">
            </b-col>
            <b-col sm="12">
              <!-- <big>Current Balance : <b>{{}}</b></big>  -->
                <c-table :table-data="items" :fields="fields" caption="" custom="newSlot"  :clickHandler="deleteDocument">
                  <template slot-scope="{ action }">
                    <i class="fa fa-book fa-md text-default button-icon" @click="showModal(action.AccumulatedAcc)"></i>
                  </template>

                </c-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="modal-journal" title="Journal" size="lg" hide-footer>
      <c-table :table-data="itemsJournal" :fields="fieldsJournal" caption="" routeName="Chart Of Account Form" fieldId="Code" :editField="editAcccount"></c-table>
    </b-modal>
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import apiAccountCategory from '@/api/AK/AccountCategoryApiService'
import apiAccount from '@/api/AKAccountApiService';
import apiJournal from '@/api/AKJournalApiService';

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
        {key:'Aksi'}
      ],
      financialItem:{Account:[],Category:{}},
      options:[],
      optionsPosition:['Aset','Kewajiban','Modal'],
      fieldsJournal: [
        {key: 'JournalNumber', label: 'Nomor Jurnal', sortable: true},
        {key: 'Date', label: 'Tanggal', sortable: true},
        {key: 'Code', label: 'Kode', sortable: true},
        {key: 'Name', label: 'Nama', sortable: true},
        {key: 'Debit', label: 'Debit'},
        {key: 'Kredit', label: 'Kredit'},
      ],
      itemsJournal:[],
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
          this.getAll()
          console.log(this.financialItem);
        }
        finally {

        }
      },
      deleteDocument: async function(DocCode) {
        if (confirm('Are you sure you want to delete this record?')) {
          await api.delete(DocCode)
          await this.getAll()
        }
      },
      async showModal(id) {
        console.log(id)
        var dataJournal = await apiJournal.getByFinancialItem(id.replace(/ /g,''));
        var dataTable = [];
        var debet,credit;
        console.log(dataJournal);
        for (var i = 0; i < dataJournal.length; i++) {
          for (var j = 0; j < dataJournal[i].JournalItem.length; j++) {
            debet = 0
            credit = 0
            var dataJournalItem = dataJournal[i].JournalItem[j]
            var Account = await apiAccount.getOne(dataJournalItem.AccountCode.replace(/ /g,''));
              if (dataJournalItem.IsDebet == "1") {
                debet = dataJournalItem.ItemValue
              }else{
                credit = dataJournalItem.ItemValue
              }
              dataTable.push({
                JournalNumber : dataJournal[i].JournalNumber,
                Date : dataJournal[i].JournalDate,
                Code : dataJournalItem.AccountCode,
                Name : Account[0].Name,
                Debit : debet,
                Kredit : credit,
              })
          }
        }
        this.itemsJournal = dataTable
        this.itemsArrayJournal = () => this.itemsJournal
        console.log(this.itemsJournal);
        this.$root.$emit('bv::show::modal','modal-journal', '#btnShow')
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
