<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Alur Kerja Proses Bisnis</strong>
          </div>
          <form @submit.prevent="saveBussProcess">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="name">Judul Proses Bisnis</label>
                  <b-form-input type="text" id="doc-code" placeholder="ex: Permohonan Kredit PK" v-model="bussProcessModel.ProcName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="ccnumber">Dokumen</label>
                  <b-row>
                  <b-col sm="8">
                    <v-select :options="documentOption" v-model="documentSelect" required/>
                  </b-col>
                  <b-col sm="3">
                    <b-input-group>
                      <b-input-group-append>
                        <b-button v-b-modal.modal-preview v-on:click="preview()" variant="primary">Sebelumnya</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="element">Deskripsi</label>
                  <textarea id="element" rows="3" v-model="bussProcessModel.Description" class="form-control"></textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                  <c-table :table-data="items" :fields="fields" caption="Process Steps" custom="stepProcess"
                   :clickUpRowHandler="upRow" :clickDownRowHandler="downRow"></c-table>
              </b-col>
              <b-col sm="12">
                <div class="form-group form-actions">
                  <b-button v-b-modal.form-step size="md" variant="primary">Add Step</b-button>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-card header="Successful Finish Action">
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <b-form-radio-group id="basicRadios" style="font-size:14.5 !important"
                          :plain="true"
                          :options="[
                            {text: 'Trigger another Bussiness Process <br>',value: '1',style: 'margin-bottom:10px'}
                          ]"
                          checked="1"
                          stacked v-model="typeNextAction">
                        </b-form-radio-group>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <b-form-select
                          :plain="true"
                          :options="['Formulir Permohonan PK','Formulir Permohonan BL']"
                          :disabled="typeNextAction == '2'"
                          v-model="bussProcessModel.PrevNext">
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <b-form-radio-group id="basicRadios" style="font-size:14.5 !important"
                          :plain="true"
                          :options="[
                            {text: 'Trigger External Process',value: '2',style: 'margin-bottom:10px'}
                          ]"
                          stacked v-model="typeNextAction">
                        </b-form-radio-group>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <b-form-input type="text" id="doc-code" placeholder="ex: Pencairan Pinjaman"
                            :disabled="typeNextAction == '1'" v-model="bussProcessModel.SuccessAction"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label>Notified parties (multiple email)</label>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <b-form-input type="text" id="doc-code" placeholder="ex: cashier@buzz.com;acctg@buzz.com" v-model="bussProcessModel.NotifiedIfSucces"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
              <b-col sm="12">
                <div class="form-group form-actions">
                  <b-button type="submit" size="md" variant="primary">Simpan</b-button>
                </div>
              </b-col>
            </b-row>
          </form>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="form-step" title="Add Step" size="lg" hide-footer>
      <b-row>
        <b-col sm="6">
          <b-form-group>
            <label for="name">Step Name</label>
            <b-form-input type="text" id="doc-code" placeholder="ex: Permohonan Kredit PK" v-model="stepModel.name"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group>
            <label for="name">Tipe</label>
            <b-form-select id="basicRadios"
              :plain="true"
              :options="[
                {text: 'Review',value: 'review',style: 'margin-bottom:10px'},
                {text: 'Approval',value: 'approval',style: 'margin-bottom:10px'}
              ]"
              v-model="stepModel.type">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group>
            <label for="name">Posisi</label>
            <b-form-select id="basicRadios"
              :plain="true"
              :options="[
                'Supervisor','Kepala Cabang','Staff Pusat','Komite Kredit','Kepala Unit PKBL'
              ]"
              v-model="stepModel.position">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <b-button type="submit" size="md" variant="primary" class="float-right" v-on:click="addStep()">
            Simpan
          </b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-preview" title="Preview Document" size="lg">
      <g-form :element-data="documentElements" :data-element="dataElement"/>
    </b-modal>
  </div>
</template>

<script>
import cTable from '@/views/base/Table.vue'
import gForm from '@/views/base/FormGenerator.vue'
import apiDocument from '@/api/BPM/DocumentApiService'
import apiBussProcess from '@/api/BPMBussinessProcessApiService'
import apiStepProc from '@/api/BPMProcStepApiService'

// const someData = [
//   {Sequence: '1', StepName: 'Periksa', ApprType: 'review', PosTmp_ID: 'Supervisor', action:'1'},
//   // {step: '2', step_name: 'Penilaian', type: 'approval', position: 'Kepala Cabang', action:'1'},
//   // {step: '3', step_name: 'pengajuan', type: 'approval', position: 'Staf pusat', action:'1'},
//   // {step: '4', step_name: 'Persetujuan', type: 'approval', position: 'Komite Kredit', action:'1'},
//   // {step: '5', step_name: 'Pengesahan', type: 'approval', position: 'Kepala Unit PKBL', action:'1'},
// ]

const someDataArray = () => someData

export default {
  name: 'DocumentDesaigner',
  components: {cTable,gForm},
  data () {
    return {
      typeNextAction: "1",
      items: [],
      itemsArray: null,
      fields: [
        // {key: 'Step_ID',label:'', display:false},
        {key: 'Sequence',label:'Level', sortable: true},
        {key: 'StepName',label:'Nama Level'},
        {key: 'ApprType',label:'Tipe'},
        {key: 'PosTmp_ID',label:'Posisi', sortable: true},
        {key: 'action'}
      ],
      bussProcessModel: {},
      documentOption: [],
      documentSelect: {},
      documentElements:[],
      dataElement:[],
      documentModel: {},
      tabIndex: [0, 0],
      stepModel: {},
      x: 5
    }
  },
  async created() {
    var id = this.$route.params.id
    this.getDocumentComboBox()
    if (id != null) {
      var dataBussProc = await apiBussProcess.getOne(id)
      this.bussProcessModel = dataBussProc[0]
      var documentData = await apiDocument.getOne(this.bussProcessModel.DocCode)

      this.documentSelect = {label:documentData[0].DocName,value:documentData[0].DocCode}
      console.log(this.documentSelect)

      var dataStepProc = await apiStepProc.getByBussProcID(id)
      for (var i = 0; i < dataStepProc.length; i++) {
        dataStepProc[i].id = dataStepProc[i].Step_ID

      }

      if (this.documentElements.DocElements != null) {
        for (var i = 0; i < this.documentElements.DocElements.length; i++) {
          this.dataElement.push([]);
        }
      }

      this.items = dataStepProc
      this.itemsArray = () => this.items
      console.log(this.id);
    }
  },
  methods: {
    async preview(){
      this.documentModel = await apiDocument.getOne(this.documentSelect.value)
      console.log(this.documentModel);
      this.documentElements = JSON.parse(this.documentModel[0].Elements);
      console.log(this.documentElements);
    },
    async getDocumentComboBox() {
      this.loading = true

      try {
        var documentData = await apiDocument.getAllName()
          for (var i = 0; i < documentData.length; i++) {
            this.documentOption.push({ label: documentData[i].text,value: documentData[i].value })
          }
          console.log(documentOption);
      } finally {
        this.loading = false
      }
    },
    addStep(){
      console.log(this.items)
      this.items.push({Sequence: (this.items.length + 1), StepName: this.stepModel.name, ApprType: this.stepModel.type, PosTmp_ID: this.stepModel.position, action:'1'})
      this.itemsArray = () => this.items
    },
    upRow(id){
      id = parseInt(id)
      if (id < 2) {
        return;
      }
      console.log(id)
      console.log(this.items.length)
      var items = this.items
      var x = id-1,y = id-2
      var b = items[x]
      items[x] = items[y]
      items[x].Sequence = b.Sequence
      items[y] = b
      items[y].Sequence = (parseInt(b.Sequence)-1)
      this.items.splice((this.items.length - 1),0)
      this.itemsArray = () => this.items
    },
    downRow(id){
      id = parseInt(id)
      if (id >= this.items.length) {
        return;
      }
      console.log(id)
      console.log(this.items.length)
      var items = this.items
      var x = id-1,y = id
      var b = items[x]
      items[x] = items[y]
      items[x].Sequence = b.Sequence
      items[y] = b
      items[y].Sequence = (parseInt(b.Sequence)+1)
      this.items.splice((this.items.length - 1),0)
      this.itemsArray = () => this.items
    },
    async saveBussProcess() {
      const isUpdate = !!this.$route.params.id
      var responseBussproc;
      var responseStepProc;
      console.log(this.items);
      // return;
      this.bussProcessModel.DocCode = this.documentSelect.value;

      if (isUpdate) {
        responseBussproc = await apiBussProcess.update(this.$route.params.id, this.bussProcessModel)
        responseStepProc = await apiStepProc.update(this.$route.params.id,this.items)
      } else {
        this.bussProcessModel.DocCode = this.documentSelect.value
        console.log(this.bussProcessModel);
        responseBussproc = await apiBussProcess.create(this.bussProcessModel)
        var lastData = await apiBussProcess.getLast()
        console.log(lastData)
        console.log(lastData[0].BP_ID)
        var responseStepProc = await apiStepProc.create(lastData[0 ].BP_ID,this.items)
      }
      console.log(responseBussproc);
      console.log(responseStepProc);
        this.showNotif(responseStepProc,'Bussiness Process')
      this.$router.push('/bussiness-process-desaigner/bussiness-process')
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
