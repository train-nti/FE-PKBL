<template>
<b-row>
  <b-col sm="12">
    <b-card>
      <div slot="header">
        <strong>{{this.$route.name}}</strong>
      </div>

      <!-- Main table element -->
      <b-table show-empty responsive :items="data" :striped="striped" :fields="fields" :current-page="currentPage" :per-page="perPage" :borderless="borderless" :outlined="outlined" :filter="filter" @filtered="onFiltered">

        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>

        <template slot="Value" slot-scope="row">
          <input type="text" class="col-sm-2 form-control" v-model="row.item.Value" v-if="active">
          <input type="text" class="col-sm-2 form-control" name="" value="" v-model="row.item.Value" v-else disabled>
        </template>

        <template slot="actions" slot-scope="row">
          <b-button variant="success" @click="save()" v-if="active">Simpan</b-button>
          <b-button variant="primary" @click="active = true" v-else>Ubah</b-button>

        </template>

      </b-table>


    </b-card>

  </b-col>
</b-row>
</template>

<script>
import apiConfiq from '@/api/PK/ConfiqApiService';
export default {
  data() {
    return {
      striped: true,
      hover: false,
      configConfirm:null,
      textConfirm:null,
      outlined: true,
      borderless: true,
      currentPage: 1,
      perPage: 5,
      totalRows: 1,
      pageOptions: [5, 10, 15, 20, 25, 50, 100],
      filter: '',
      items: [
      ],
      fields: [{
          key: 'No',
          label: 'No'
        },
        {
          key: 'Value',
          label: 'Bunga'
        }, 'actions'
      ],
      active: false,
    }
  },
  async created() {
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.fetch()
  },
  methods: {
    async fetch() {
      let data = await apiConfiq.getByCode('SUKU_BUNGA')
      for (var i = 0; i < data.Data.length; i++) {
        data.Data[i].No = i + 1
      }
      this.items = data.Data
    },
    async save() {
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value){
            let item = {
              Description: this.items[0].Description,
              Value: this.items[0].Value,
              CreatedAt: new Date().toJSON().slice(0, 10).replace(/-/g, '/')
            }
            let data = await apiConfiq.update(this.items[0].Code, item)
            this.showNotif(data, 'Suku Bunga')
            this.active = false
            this.fetch()

          }
       })
       .catch(err => {
        // An error occurred
       })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
  computed: {
    data() {
      // Set the initial number of items
      this.totalRows = this.items.length
      return this.items
    }
  },
}
</script>

<style lang="css">
</style>
