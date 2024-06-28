<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Approval Request</strong>
          </div>
          <b-row>
            <b-col sm="2" offset-sm="11">
              <div class="form-group form-actions">
                <router-link :to="{ name: 'Form Survey' }">
                  <b-button size="md" variant="primary">Input Baru</b-button>
                </router-link>
              </div>
            </b-col>
            <b-col sm="12">
              <!-- <b-tabs class="full-widths" v-model="tabIndex[0]" v-if="elements.DocElements != null">
                  <b-tab>
                    <template slot="title">
                      <i class="icon-calculator"></i> {{tabs[0]}}
                    </template> -->
                    <c-table :table-data="items" :fields="fields" caption="" custom="newSlot" routeName="Form Document Desaigner" >
                      <template slot-scope="{ action }">
                        <i class="fa fa-eye fa-md text-default button-icon" @click="showModal()"></i>
                        <i class="fa fa-pencil fa-md text-default button-icon" @click="showModal()"></i>
                        <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.AccountCategoryID)"></i>
                      </template>

                    </c-table>

                  <!-- </b-tab>
              </b-tabs> -->
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
import apiBussProcess from '@/api/BPMBussinessProcessApiService'
import apiBussProcExec from '@/api/BPMBussinessProcExecApiService'
import apiAppRequest from '@/api/BPMAppRequestApiService'

// const someData = () => await api.getAll()

export default {
  name: 'DocumentDesaigner',
  components: {cTable},
  data () {
    return {
      items: [],
      itemsArray: null,
      fields: [
        {key: 'ProcName',label: 'Process Name', sortable: true},
        {key: 'NotifiedIfSucces',label: 'Notified If Success'},
        {key: 'DocCode',sortable: true},
        {key: 'action'},
      ],
      // tabIndex: [0, 0],
      // tabs: [
      //   'Daftar Survey',
      //   'Sudah Survey',
      // ],
    }
  },
  async created() {
    this.getAll()
  },
  methods: {
      async getAll() {
        this.loading = true
        var appRequest = await apiAppRequest.getbyPosition(localStorage.username);
        var dataTable = []

        for (var i = 0; i < appRequest.length; i++) {
          var bussProExec = await apiBussProcExec.getOne(appRequest[i].BPE_ID)
          console.log(bussProExec);

          var bussProc = await api.getOne(bussProExec[0].BP_ID)
          bussProc[0].BPE_ID = bussProExec[0].BPE_ID
          bussProc[0].APP_ID = appRequest[i].Appreq_ID
            dataTable.push(bussProc[0])
            console.log(dataTable )

        }
        console.log(appRequest);
        this.items = dataTable
        this.itemsArray = () => this.items
        console.log(this.items)

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
