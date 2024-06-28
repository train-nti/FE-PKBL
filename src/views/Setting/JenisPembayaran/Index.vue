<!-- <template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
              <card>
                <b-row>
                    <b-col sm="2">
                        <img src="static/logo.png" style="width:50px;">
                    </b-col>
                </b-row>
              </card>
            </b-col>
        </b-row>
    </div>
</template> -->
<template>
    <div class="animated fadeIn">
        <b-row v-if="loading">
            <b-col sm="12">
                <b-card>
                     <b-spinner label="Spinning"></b-spinner>
                     Loading
                </b-card>
              </b-col>
        </b-row>
        <b-row v-if="!loading">
            <b-col sm="12">
                <b-card>
                  <b-row>
                      <b-col sm="12">
                          <b-table striped hover responsive
                          :items="items"
                          :fields="fields"
                          :current-page="currentPage"
                          :per-page="perPage" >
                          <template slot="Program" slot-scope="data">
                            <!-- <input type="text" name="" v-model="data.item.PrmrekId" hidden> -->
                            <b-form-select v-model="data.item.Jprog" :options="options"></b-form-select>
                          </template>
                          <template slot="No" slot-scope="data">
                            <p v-if="No < items.length">
                              {{ No += 1 }}
                            </p>
                            <p v-else style="display:hidden;">
                              {{ No = 1 }}
                            </p>

                          </template>
                          </b-table>
                      </b-col>
                  </b-row>

                  <b-row>
                    <b-col sm="4">
                        <b-button variant="primary" type="submit" size="md" v-on:click="Update()">Simpan</b-button>
                    </b-col>
                  </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import cTable from '@/views/base/Table.vue'
import apiJournal from '@/api/AKJournalApiService';
import apiJournalItem from '@/api/AKJournalItemApiService';
import apiPaymentType from '@/api/PaymentTypeApiService';
// import BTable from '../../../node_modules/bootstrap-vue/es/components/table/table'

export default {
  components: {
    cTable
  },
  data() {
    return {
      loading: false,
      items: [],
      JournalArray : [],
      id: null,
      configConfirm:null,
      textConfirm:null,
      // totalRows: 1,
      rows:null,
      currentPage: 1,
      perPage: 100,
      filter: null,
      date1:null,
      date2:null,
      selected:[],
      options : [
        { text: 'Program PK', value: '1' },
        { text: 'Program BL', value: '2' },
        { text: 'Program PKBL', value: '0' },
      ],
      fields: [
        {
          key: 'No',
          label: 'No'
        },
        {
          key: 'Description',
          label: 'Deskripsi'
        },
        {
          key: 'Program',
          label: 'Program'
        }
      ],
    }
  },
  async created() {
    this.loading = true
    this.No = 0 ;
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.getAll()
    this.loading = false
  },
  computed: {
      sortOptions() {
        this.No = 0
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
    },
  methods: {
    async getAll() {
      this.No = 0
      this.items = await apiPaymentType.getComboBoxAll()
      // console.log(this.items.length);
    },

    async Update(){
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value){
            this.loading = true
            console.log(this.items);
            // return 0
            var response = await apiPaymentType.UpdateJprogById(this.items)
            this.showNotif(response, 'Pembayaran')
            if (response.Message != 'Operation success') {
               this.getAll()
            }

            this.loading = false
            // console.log('response',response);
          }
       })
       .catch(err => {
        // An error occurred
       })
    }

  }
}
</script>
