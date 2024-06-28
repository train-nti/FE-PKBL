<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Proses Bisnis</strong>
          </div>
          <b-row>
            <b-col sm="12">
                <c-table :table-data="items" :fields="fields" caption="" routeName="Form Workflow Initialization" custom="workflowInitialization" :clickHandler="deleteDocument"></c-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import api from '@/api/BPMBussinessProcessApiService'

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable},
  data () {
    return {
      items: [],
      itemsArray: null,
      fields: [
        {key: 'ProcName',label: 'Nama proses', sortable: true},
        {key: 'SuccessAction',label: 'Aksi Sukses'},
        {key: 'NotifiedIfSucces',label: 'Diberitahu Jika Berhasil'},
        {key: 'Kode Dokumen',sortable: true},
        {key: 'Aksi'},
      ],
    }
  },
  async created() {
    this.getAll()
  },
  methods: {
      async getAll() {
        this.loading = true

        try {
          var dataTable = await api.getAll()

          for (var i = 0; i < dataTable.length; i++) {
            dataTable[i].id = dataTable[i].BP_ID

          }
          console.log(dataTable )
          this.items = dataTable
          this.itemsArray = () => this.items
          console.log(this.items)
        } finally {
          this.loading = false
        }
      },
      deleteDocument: async function(DocCode) {
        if (confirm('Are you sure you want to delete this record?')) {
          await api.delete(DocCode)
          await this.getAll()
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
