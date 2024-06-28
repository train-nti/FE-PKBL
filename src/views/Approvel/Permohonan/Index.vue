<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Document Declaration</strong>
          </div>
          <b-row>
            <b-col sm="2" offset-sm="11">
              <div class="form-group form-actions">
                <router-link :to="{ name: 'Form Document Desaigner' }">
                  <b-button size="md" variant="primary">Tambah</b-button>
                </router-link>
              </div>
            </b-col>
            <b-col sm="12">
                <c-table :table-data="items" :fields="fields" caption="" custom="newSlot">
                  <template slot-scope="{ action }">
                    <router-link :to="{ name: 'Form Document Desaigner', params: {id:action.DocCode} }"><i class="fa fa-pencil fa-md text-default"></i></router-link>&nbsp;
                    <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteDocument(action.AccountCategoryID)"></i>
                  </template>
                </c-table>
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
import apiDocument from '@/api/BPM/DocumentApiService'

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable},
  data () {
    return {
      items: [],
      itemsArray: null,
      fields: [
        {key: 'Kode Dokumen', sortable: true},
        {key: 'Nama Dokumen'},
        // {key: 'Description'},
        {key: 'aksi'}
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
          var dataTable = await apiDocument.getAll()
          this.items = dataTable
          this.itemsArray = () => this.items
        } finally {
          this.loading = false
        }
      },
      deleteDocument: async function(DocCode) {
        if (confirm('Are you sure you want to delete this record?')) {
          await apiDocument.delete(DocCode)
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
