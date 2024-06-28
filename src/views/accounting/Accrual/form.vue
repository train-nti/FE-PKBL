<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Daftar Accrual</strong>
          </div>
          <b-row>
            <b-col sm="2">
              <div class="form-group form-actions">
                <b-button size="md" @click="showModal()" variant="primary">Input Baru</b-button>
              </div>
            </b-col>
            <b-col sm="12">
              <c-table :table-data="items" :fields="fields" caption="" custom="newSlot" routeName="Form Document Desaigner">
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
    <b-modal id="modal-financial" title="Input Accrual" size="xl" hide-footer>
      <b-row>
        <b-col><label class="mr-sm-2" for="#">Periode</label></b-col>
        <b-col>
          <v-select placeholder="Tahun" :options="optionsPosition" v-model="AccrualModel.periode"/>
        </b-col>
      </b-row>
      <br>

      <b-row>
        <b-col><label class="mr-sm-2" for="#">Tanggal</label></b-col>
        <b-col><input class="form-control" placeholder="" type="date" required v-model="AccrualModel.tanggal"/></b-col>
      </b-row>
      <br>

      <b-row>
        <b-col><label class="sm-2" for="#">Wilayah</label></b-col>
        <b-col>
          <v-select taggable multiple placeholder="Periode" :options="optionsPositions" required v-model="AccrualModel.wilayah"/>
        </b-col>
      </b-row>
      <br>
      <b-col sm="12">
        <c-table :table-data="ListOfAccrual" :fields="fieldsModal" caption="" custom="newSlot" routeName="Form Document Desaigner">
          <!-- <template slot-scope="{ action }">
            <i class="fa fa-pencil fa-md text-default button-icon" @click="showModal()"></i>
            <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.AccountCategoryID)"></i>
          </template> -->
          <template slot-scope="{ action }">
            <input type="checkbox" :value="action.id" v-model="itemSelect">
          </template>
        </c-table>
      </b-col>
      <b-button variant="primary" v-on:click="saveAccrual()">Simpan</b-button>
    </b-modal>
  </div>
</template>

<script>
  import {
    shuffleArray
  } from '@/shared/utils'
  import cTable from '@/views/base/Table.vue'
  import apiAccountCategory from '@/api/AK/AccountCategoryApiService'
  import apiAccount from '@/api/AKAccountApiService';
  import apiBLApproval from '@/api/BL/BLApprovalApiService';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';

  // const someData = () => await api.getAll()

  export default {
    name: 'DocumentDesaigner',
    components: {
      cTable
    },
    data() {
      return {
        items: [],
        itemsArray: null,
        fields: [{
            label: 'No',
            key: 'Nama',
            sortable: true
          },
          {
            key: 'Tahun'
          },
          {
            key: 'Wilayah'
          },
          {
            key: 'Nilai'
          },
          {
            key: 'Status'
          },
          {
            key: 'Aksi'
          }
        ],

        itemsModal: [],
        itemsArrayModal: null,
        fieldsModal: [
        {
            label: 'No',
            key: 'Nama',
            sortable: true
          },
          {
            key: 'No Permohonan',
            value: 'DateProposal'
          },
          {
            label: 'Tgl MoU',
            key: 'ContractDate'
          },
          {
            label: 'Nama Instansi',
            key: 'Instance'
          },
          {
            label: 'Nama Pemohon',
            key: 'FullName'
          },
          {
            label: 'Nilai Penyaluran',
            key: 'Value'
          },
          {
            label: 'Aksi',
            key: 'action'
          }
        ],
        financialItem: {
          Account: [],
          Category: {}
        },
        options: [],
        optionsPosition: ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
        optionsPositions: ['Sumbagsel', 'SUMBU', 'SUMBS', 'JBB', 'BALNUS', 'KALIM', 'MALPA', 'SULWS', '', 'JBTT', 'JKK'],
        ListOfAccrual: [],
        AccrualModel: {},
        itemSelect: []
      }
    },
    async created() {
      this.getAll()
    },
    methods: {
      async getAll() {
        this.loading = true

        // try {
        //   var dataTable = await apiAccountCategory.getAll()
        //
        //   for (var i = 0; i < dataTable.length; i++) {
        //     dataTable[i].id = dataTable[i].CategoryID
        //     dataTable[i].AccumulatedAcc = ''
        //     for (var j = 0; j < dataTable[i].Account.length; j++) {
        //       if (j < 4) {
        //         if (j == 0) {
        //           dataTable[i].AccumulatedAcc += dataTable[i].Account[j].Code
        //         } else {
        //           dataTable[i].AccumulatedAcc += ',' + dataTable[i].Account[j].Code
        //         }
        //
        //       } else {
        //         break
        //       }
        //     }
        //   }

        // nampilin data ke table sekaligus join dari BLApproval - DebitAccount - Debitor
          var BLL = await apiBLApproval.getAll()
          // console.log("BL Approval", BLL);

          let ListOfApproval = await apiBLApproval.getAll();
          // console.log("l", ListOfApproval);
          for (var i = 0; i < ListOfApproval.Data.length; i++) {
            let debitAccount = await apiDebitAccount.getOne(ListOfApproval.Data[i].DACode);

            // console.log("debit",debitAccount);
            if (debitAccount.Data.length > 0) {
              // ListOfApproval.Data[i].Value = debitAccount.Data[0].Value
              ListOfApproval.Data[i].DebCode = debitAccount.Data[0].DebCode
              ListOfApproval.Data[i].ContractDate = debitAccount.Data[0].ContractDate
              let debitor = await apiDebitor.getOne(ListOfApproval.Data[i].DebCode);
              console.log("debitor",debitor);
              ListOfApproval.Data[i].id = i
              ListOfApproval.Data[i].FullName = debitor.Data[0].FullName
              ListOfApproval.Data[i].Instance = debitor.Data[0].Instance
              ListOfApproval.Data[i].Address = debitor.Data[0].Address
              ListOfApproval.Data[i].DateProposal = debitor.Data[0].DateProposal
            }

          }
          this.ListOfAccrual = ListOfApproval.Data
          // console.log("apa ya", this.ListOfAccrual);

        //   var getAccount = await apiAccount.getAll()
        //   this.options = [];
        //   for (var i = 0; i < getAccount.length; i++) {
        //     this.options.push({
        //       label: getAccount[i].Name,
        //       value: getAccount[i].Code
        //     })
        //   }
        //
        //   this.items = dataTable
        //   this.itemsArray = () => this.items
        //   console.log(this.items)
        // } finally {
        //   this.loading = false
        // }
      },
      async saveAccrual() {
        console.log("Model", this.AccrualModel);
        // console.log(this.itemSelect);

        for (var iS = 0; iS < this.itemSelect.length; iS++) {
          this.itemSelect[iS]

          // console.log("Item Select", this.itemSelect[iS]);
          console.log("LOA", this.ListOfAccrual[this.itemSelect[iS]]);
        }
        // try {
        //   this.financialItem.Account = []
        //   if (this.financialItem.AccountItem != null) {
        //
        //     for (var i = 0; i < this.financialItem.AccountItem.length; i++) {
        //       this.financialItem.Account.push({
        //         Code: this.financialItem.AccountItem[i].value
        //       })
        //     }
        //
        //   }
        //   apiAccountCategory.create(this.financialItem)
        //   console.log(this.financialItem);
        // } finally {
        //
        // }
      },
      deleteItem: async function(id) {
        if (confirm('Are you sure you want to delete this record?')) {
          console.log(id);
          // await api.delete(DocCode)
          // await this.getAll()
        }
      },
      async showModal() {
        this.$root.$emit('bv::show::modal', 'modal-financial', '#btnShow')
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
