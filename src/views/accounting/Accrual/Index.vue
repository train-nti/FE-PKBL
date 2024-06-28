<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Chart Of Account</strong>
          </div>
          <b-row>
            <b-col sm="2" offset-sm="11">
              <div class="form-group form-actions">
                <router-link :to="{ name: 'Chart Of Account Form' }">
                  <b-button size="md" variant="primary">Add</b-button>
                </router-link>
              </div>
            </b-col>
            <b-col sm="12">
                <c-table :table-data="items" :fields="fields" caption="" routeName="Chart Of Account Form" :clickHandler="deleteDocument"></c-table>
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
import apiAccount from '@/api/AKAccountAPIService';

// const someData = () => await api.getAll()

export default {
  name: 'ChartOfAccount',
  components: {cTable},
  data () {
    return {
      items: [],
      itemsArray: null,
      fields: [
        {key: 'Code', sortable: true},
        {key: 'Name'},
        {key: 'Balance'},
        {key: 'GrpCode'},
        {key: 'action'}
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
          this.items = await apiAccount.getAll()
          this.itemsArray = () => this.items
          console.log(this.items)
        } finally {
          this.loading = false
        }
      },
      deleteDocument: async function(Jrn_ID) {
        if (confirm('Are you sure you want to delete this record?')) {
          await apiAccount.delete(Jrn_ID)
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
