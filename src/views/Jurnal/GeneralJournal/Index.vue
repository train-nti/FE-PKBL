<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Jurnal umum</strong>
        </div>
        <b-row>
          <b-col sm="2" offset-sm="11">
            <div class="form-group form-actions">
              <router-link :to="{ name: 'General Journal Form' }">
                <b-button size="md" variant="primary">Tambah</b-button>
              </router-link>
            </div>
          </b-col>
          <b-col sm="12">
            <c-table :table-data="items" :fields="fields" caption="" custom="newSlot">
              <template slot-scope="{ action }">
                <router-link :to="{ name: 'General Journal Form', params: { id: action.Jrn_ID } }">
                  <i class="fa fa-eye fa-md text-default button-icon"></i>
                </router-link>
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
import {
  shuffleArray
} from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import apiAccount from '@/api/AKAccountAPIService';
import apiJournal from '@/api/AKJournalAPIService';
import apiJournalItem from '@/api/AKJournalItemAPIService';

// const someData = () => await api.getAll()

export default {
  name: 'GeneralJournal',
  components: {
    cTable
  },
  data() {
    return {
      items: [],
      itemsArray: null,
      fields: [{
          key: 'JournalNumber',
          label: 'Nomor Jurnal',
          sortable: true
        },
        {
          key: 'JournalDate',
          label: 'Tanggal Jurnal',
        },
        {
          key: 'Description',
          label: 'Deskripsi',
        },
        {
          key: 'action',
          label: 'aksi'
        }
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
        var dataTable = await apiJournal.getAll()

        for (var i = 0; i < dataTable.length; i++) {
          dataTable[i].id = dataTable[i].Jrn_ID
        }

        this.items = dataTable
        this.itemsArray = () => this.items
        console.log(this.items)
      } finally {
        this.loading = false
      }
    },
    deleteJournal: async function(Jrn_ID) {
      if (confirm('Are you sure you want to delete this record?')) {
        await apiJournal.delete(Jrn_ID)
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
