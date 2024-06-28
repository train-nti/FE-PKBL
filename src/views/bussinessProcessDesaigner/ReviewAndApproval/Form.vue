<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Penilaian </strong>
          </div>
          <b-row style="margin-bottom:20px">
            <b-col sm="12">
              <h5> {{ documentModel.DocName }} </h5>
            </b-col>

            <b-col sm="12" v-html="documentModel.Description">
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <g-form :element-data="documentElements" :data-element="dataElement" :step-display="AppModel.Sequence"
              :step-disable="AppModel.Sequence" ref="georm" />

            </b-col>
          </b-row>
          <b-row style="margin-top:100px">
            <b-col sm="12">
              <b-form-group>
                <b-col sm="12">
                    <c-table :table-data="items" :fields="fields" caption="Histori Persetujuan"></c-table>
                </b-col>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <b-form-group label="Your Decision">
                  <b-form-radio-group
                    id="radio-slots"
                    name="radio-options-slots"
                    v-model="AppModel.AppStatus">
                    <b-form-radio value="Approve">Approve</b-form-radio>
                    <b-form-radio value="Reject">Reject</b-form-radio>
                    <b-form-radio value="Pending">Pending</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <label for="element">Reason / Note</label>
                <textarea id="element" rows="5" v-model="AppModel.Notes" class="form-control"></textarea>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <div class="form-group form-actions">
                <b-button type="button" size="md" variant="primary" v-on:click="save()">Submit Process</b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import gForm from '@/views/base/FormGenerator.vue'
import cTable from '@/views/base/Table.vue'
import apiDocument from '@/api/BPM/DocumentApiService'
import apiBussProcess from '@/api/BPMBussinessProcessApiService'
import apiBussProcExec from '@/api/BPMBussinessProcExecApiService'
import apiStepProc from '@/api/BPMProcStepApiService'
import apiAppRequest from '@/api/BPMAppRequestApiService'
import apiCommitteeMembers from '@/api/BPMCommitteeMembersApiService'
import apiMemberApproval from '@/api/BPMMemberApprovalApiService'
import apiDebitor from '@/api/PK/DebitorApiService';
import dynamic from '@/api/DynamicApiService';


export default {
  name: 'WorkflowInitialization',
  components: {cTable,gForm},
  data () {
    return {
      isFollowUp: 0,
      // json:JSON.stringify({DocElements}),
      items: [],
      itemsArray: null,
      fields: [
        // {key: 'Step_ID',label:'', display:false},
        {key: 'Sequence',label:'Step', sortable: true},
        {key: 'StepName',label:'Step Name'},
        {key: 'ApprType',label:'Type'},
        {key: 'PosTmp_ID',label:'Position', sortable: true}
      ],
      bussProcessModel: {},
      bussProExecModel: {},
      documentOption: [],
      documentSelect: "",
      documentContent: [],
      documentElements:{},
      documentModel: {},
      tabIndex: [0, 0],
      AppModel:{},
      dataElement:[]
    }
  },
  async created() {
    var id = this.$route.params.BussProcId
    var idExec = this.$route.params.BussProExecId
    var idApp = this.$route.params.AppId
    console.log(id);
    console.log(idExec);
    console.log(idApp);
    if (id != null) {
      var dataBussProc = await apiBussProcess.getOne(id)
      var dataDocument = await apiDocument.getOne(dataBussProc[0].DocCode)
      var dataBussProcExec = await apiBussProcExec.getOne(idExec)
      this.bussProExecModel = dataBussProcExec[0]
      // this.bussProExecModel.StartDate = formatDate(this.bussProExecModel.StartDate,'yyyy-MM-dd')
      var dataApp = await apiAppRequest.getOne(idApp)
       this.AppModel = dataApp[0]
      var data = JSON.parse(dataBussProcExec[0].DocContent)
      this.dataElement = data.DocContent
      this.bussProcessModel = dataBussProc[0]
      this.documentModel = dataDocument[0]
      this.documentElements = JSON.parse(dataDocument[0].Elements)
      console.log(this.AppModel);
      for (var i = 0; i < this.documentElements.DocElements.length; i++) {
        this.documentContent.push({Name: this.documentElements.DocElements[i].Name, Value: null})
      }
      console.log(this.documentContent);
      var dataStepProc = await apiStepProc.getByBussProcID(id)
      for (var i = 0; i < dataStepProc.length; i++) {
        dataStepProc[i].id = dataStepProc[i].Step_ID

      }
      this.items = dataStepProc
      this.itemsArray = () => this.items
    }

  },
  methods: {
    async save() {
      var sequence = await apiAppRequest.getByBussProcExecID(this.$route.params.BussProExecId)
      console.log(this.AppModel);
      var result = await apiAppRequest.update(this.AppModel)
      console.log(result);
      var dataBussProcExec = await apiAppRequest.getByBussProcExecID(this.$route.params.BussProExecId)
      console.log('datanya el',this.dataElement[0]);
      // var dataElement = this.dataElement
      // var element = this.documentElements.DocElements
      // console.log(dataElement);
      // var objectData = {}
      // for (var i = 0; i < dataElement.length; i++) {
      //   console.log('element'+i,element[i]);
      //   if (typeof element[i].Form != 'undefined') {
      //     var dataField = element[i].Form
      //     // objectData[element[i].Relation] = {}
      //     for (var j = 0; j < dataField.length; j++) {
      //       console.log(dataElement[i][j]);
      //       if (typeof dataElement[i][j] != 'undefined') {
      //         // this.$set(this.someObject, 'b', 2)
      //         objectData[element[i].Relation][dataField[j].Name] = dataElement[i][j]
      //       }
      //     }
      //     console.log(objectData);
      //     await dynamic.create(element[i].Relation,objectData[element[i].Relation])
      //   }
      // }
      // objectData["Debitor"] = dataElement[0]
      // console.log(objectData);
      var dataBussProcExec = await apiAppRequest.getByBussProcExecID(this.$route.params.BussProExecId)
      console.log('datanya ',dataBussProcExec);
      if (dataBussProcExec.length < 1) {
        var data = this.dataElement[0]
        var Debitor = {
            DebCode : data[3][0],
            // Instance: data[8],
            FullName : data[9],
            IDNumber : data[7],
            // PlaceofBirth : data[3],
            // DateofBirth: data[4],
            // Gender: data[5],
            Address: data[14],
            Prov_code: data[10],
            Dist_code: data[11],
            Subdis_code: data[12],
            // PostalCode: data[10],
            Phone: data[15],
            eMail: data[16],
            BLType: data[15],
            // Activity: data[17],
            // Amount: data[16]
        }
      }
        console.log(Debitor);
      // console.log(customer);
      var result = await apiDebitor.create(Debitor);

      this.showNotif(result,"Review")
      this.$router.push('/bussiness-process-desaigner/review/2')
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
