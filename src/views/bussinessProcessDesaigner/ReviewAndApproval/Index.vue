<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>{{ title }}</strong>
          </div>
          <b-row>
            <b-col sm="12" v-if="type == '1'">
              <b-tabs class="full-widths" v-model="tabIndex[0]">
                  <b-tab>
                    <template slot="title">
                      <i class="icon-calculator"></i> {{tabsPermohonan[0]}}
                    </template>
                    <c-table :table-data="items" :fields="fields" caption="" routeName="Form Workflow Initialization" custom="newSlot">
                      <template slot-scope="{ action }">
                        <router-link :to="{ name: 'Form Workflow Initialization',params: {BussProcId:action.BP_ID,DocId:action.DocCode} }">
                          <b-button size="md" variant="primary">Input Baru</b-button>
                        </router-link>
                      </template>
                    </c-table>
                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="icon-calculator"></i> {{tabsPermohonan[1]}}
                  </template>
              <c-table :table-data="items" :fields="fields" caption="" routeName="Form Review And Approval" custom="newSlot">
                <template slot-scope="{ action }">
                  <i class="fa fa-eye fa-md text-default button-icon" @click="showModal()"></i>
                  <i class="fa fa-pencil fa-md text-default button-icon" @click="showModal()"></i>
                  <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.AccountCategoryID)"></i>
                </template>
              </c-table>
              </b-tab>
              </b-tabs>
            </b-col>
            <b-col sm="12" v-else>
              <b-tabs class="full-widths" v-model="tabIndex[0]">
                  <b-tab>
                    <template slot="title">
                      <i class="icon-calculator"></i> {{tabsPermohonan[0]}}
                    </template>
                    <c-table :table-data="itemsApp" :fields="fieldsApp" caption="" routeName="Form Review And Approval" custom="newSlot">
                      <template slot-scope="{ action }">
                        <router-link :to="{ name: 'Form Review And Approval',params: {BussProcId:action.BP_ID,BussProExecId:action.BPE_ID,AppId:action.APP_ID} }">
                          <b-button size="md" variant="primary">Prosess</b-button>
                        </router-link>
                      </template>
                    </c-table>
                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="icon-calculator"></i> {{tabsPermohonan[1]}}
                  </template>
              <c-table :table-data="items" :fields="fields" caption="" routeName="Form Review And Approval" custom="newSlot">
                <template slot-scope="{ action }">
                  <i class="fa fa-eye fa-md text-default button-icon" @click="showModal()"></i>
                  <i class="fa fa-pencil fa-md text-default button-icon" @click="showModal()"></i>
                  <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.AccountCategoryID)"></i>
                </template>
              </c-table>
              </b-tab>
              </b-tabs>
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
        {key: 'action'},
      ],
      itemsApp: [],
      itemsArrayApp: null,
      fieldsApp: [
        {key: 'ProcName',label: 'Process Name', sortable: true},
        {key: 'NotifiedIfSucces',label: 'Notified If Success'},
        {key: 'DocCode',sortable: true},
        {key: 'action'},
      ],
      tabIndex: [0, 0],
      tabsPermohonan: [
        'Tambah Permohonan',
        'Daftar Permohonan',
      ],
      tabsSurvey: [
        'Proses Permohonan',
        'Daftar Survey',
      ],
      type:''
    }
  },
  async created() {
    this.type = this.$route.params.Type
    console.log(this.type);
    if (this.type == '1') {
      this.title = 'Permohonan'
      this.getAll()
    }else {
      this.title = 'Penilaian'
      this.getAllApp()
    }
  },
  watch: {
    '$route.params.Type': function() {
      this.type = this.$route.params.Type
      console.log(this.type);
      if (this.type == 'pengajuan') {
        this.getAll()
      }else {
        this.getAllApp()
      }
    },
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
      async getAllApp() {
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
        this.itemsApp = dataTable
        this.itemsArrayApp = () => this.itemsApp
        console.log(this.itemsApp)

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
