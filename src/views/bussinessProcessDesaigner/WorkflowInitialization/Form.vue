<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Inisialisasi Alur Kerja </strong>
          </div>
          <b-row>
            <b-col sm="3">
              <b>Alur kerja</b style="margin-left:20px;">
            </b-col>
            <b-col sm="4">
              : {{ bussProcessModel.ProcName }}
            </b-col>
          </b-row>
          <br><br>
          <b-row style="margin-bottom:20px">
            <b-col sm="12">
              <h5> {{ documentModel.DocName }} </h5>
            </b-col>

            <b-col sm="12" v-html="documentModel.Description">
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <g-form :element-data="documentElements" :data-element="dataElement" ref="georm" />
            </b-col>
          </b-row>
          <b-row style="margin-top:100px">
            <!-- <b-col sm="12" md="6">
              <b-form-group >
                <label for="month1">Lampirkan file</label>
                <b-form-file accept="image/*" />
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6">
              <b-form-group >
                <label for="">Di Mulai Tanggal</label>
                <b-input type="date" v-model="bussProExecModel.StartDate"></b-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <b-col sm="12">
                    <c-table :table-data="items" :fields="fields" caption="Workflow Summary"></c-table>
                </b-col>
              </b-form-group>
            </b-col> -->
            <b-col sm="12">
              <div class="form-group form-actions">
                <b-button type="submit" size="md" variant="info">Draft Save</b-button>
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
import cTable from '@/views/base/Table.vue'
import gForm from '@/views/base/FormGenerator.vue'
import apiDocument from '@/api/BPM/DocumentApiService'
import apiBussProcess from '@/api/BPMBussinessProcessApiService'
import apiBussProcExec from '@/api/BPMBussinessProcExecApiService'
import apiStepProc from '@/api/BPMProcStepApiService'
import apiAppRequest from '@/api/BPMAppRequestApiService'
import apiCommitteeMembers from '@/api/BPMCommitteeMembersApiService'
import apiMemberApproval from '@/api/BPMMemberApprovalApiService'
import debitor from '@/api/PK/DebitorApiService';
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
      elementsField: {},
      titleModalElement:'',
      dataElement:[],
      tabIndex: [0, 0],
    }
  },
  async created() {
    var id = this.$route.params.BussProcId
    console.log(id);


    if (id != null) {
      var dataBussProc = await apiBussProcess.getOne(id)
      var dataDocument = await apiDocument.getOne(dataBussProc[0].DocCode)
      console.log(dataDocument);
      this.bussProcessModel = dataBussProc[0]
      this.documentModel = dataDocument[0]
      this.documentElements = JSON.parse(dataDocument[0].Elements)
      console.log(this.documentElements);

      // for (var i = 0; i < this.documentElements.DocElements.length; i++) {
      //   this.documentContent.push({Name: this.documentElements.DocElements[i].Name, Value: null})
      // }
      // console.log(this.documentContent);
      var dataStepProc = await apiStepProc.getByBussProcID(id)
      for (var i = 0; i < dataStepProc.length; i++) {
        dataStepProc[i].id = dataStepProc[i].Step_ID

      }

      if (this.documentElements.DocElements != null) {
        for (var i = 0; i < this.documentElements.DocElements.length; i++) {
          // this.dataElement.push([]);
          // console.log(this.dataElement);
          // var element = this.documentElements.DocElements[i].Form
          // for (var j = 0; j < element.length; j++) {
          //   if (element[j].Generate != null) {
          //     this.dataElement[i].push([this.generate(element[j].Generate)])
          //   }else {
          //     this.dataElement[i].push([])
          //   }
          //
          // }
        }
      }

      this.items = dataStepProc
      this.itemsArray = () => this.items
    }

  },
  methods: {
    async save() {
      const isUpdate = !!this.id;
      var result;
      if (isUpdate) {
        result = await apiBussProcExec.update(this.$route.params.id, this.bussProcessModel)
        await apiStepProc.update(this.$route.params.id,this.items)
        //
      } else {
        this.bussProcessModel.DocCode = this.documentSelect
        this.bussProExecModel.DocContent = JSON.stringify({DocContent : this.dataElement })
        this.bussProExecModel.BP_ID = this.$route.params.BussProcId
        this.bussProExecModel.Status = 1
        this.bussProExecModel.Initiator = localStorage.username

        console.log(this.bussProExecModel)
        console.log(this.items)
        result = await apiBussProcExec.create(this.bussProExecModel)
        var lastData = await apiBussProcExec.getLast()
        console.log(lastData);
        console.log(this.dataElement)
        var reqAppRequest = await apiAppRequest.create(this.bussProExecModel.StartDate,lastData[0].BPE_ID,this.items)
        // var dataElement = this.dataElement
        // var element = this.documentElements.DocElements
        // console.log(dataElement);
        // var objectData = {}
        // for (var i = 0; i < dataElement.length; i++) {
        //   console.log('element'+i,element[i]);
        //   if (typeof element[i].Form != 'undefined') {
        //     var dataField = element[i].Form
        //     objectData[element[i].Relation] = {}
        //     for (var j = 0; j < dataField.length; j++) {
        //       console.log(dataElement[i][j]);
        //       if (typeof dataElement[i][j] != 'undefined') {
        //         // this.$set(this.someObject, 'b', 2)
        //         objectData[element[i].Relation][dataField[j].Name] = dataElement[i][j]
        //       }
        //     }
        //     dynamic.create(element[i].Relation,objectData[element[i].Relation])
        //   }
        // }
        // objectData["Debitor"] = dataElement[0]
        // console.log(objectData);
        // var data = dataElement[0]
        // var customer = {
        //   DebCode : data[0],
        //   IDNumber : data[1],
        //   FullName : data[2],
        //   PlaceofBirth : data[3],
        //   DateofBirth: data[4],
        //   Gender: data[5],
        //   Address: data[6],
        //   Prov_code: data[7],
        //   Dist_code: data[8],
        //   Subdis_code: data[9],
        //   HomeOwnStatus: data[10],
        //   Phone: data[11],
        //   eMail: data[12],
        //   MaritalStatus: data[13],
        //   SpouseName: data[14],
        //   MotherName: data[15]
        // }
        // console.log(customer);
        // await debitor.create(customer);
          // await apiCommitteeMembers.create(this.$route.params.BussProcId,this.items)
          // await apiMemberApproval.create(this.$route.params.BussProcId,this.items)

      }
      this.showNotif(result,'Workflow Initialization')
      this.$router.push('/bussiness-process-desaigner/workflow-initialization')
    },
    showModalElement(indexTab,key) {
      console.log(key);
      console.log(indexTab);
      this.indexTab = indexTab
      this.titleModalElement = this.documentElements.DocElements[indexTab].Tab
      this.documentElementsField = this.documentElements.DocElements[indexTab].Table.Field
      console.log(this.documentElementsField);
      this.$refs['element'].show();
    },
    saveOrUpdateElement(key){
      console.log(this.documentElements.DocElements[this.indexTab].Table.Row);
      var number = this.documentElements.DocElements[this.indexTab].Table.Row.length + 1;
      this.dataElement[this.indexTab][0] = number
      this.documentElements.DocElements[this.indexTab].Table.Row.push(this.dataElement[this.indexTab])
      this.hideModalElement(true)
    },
    hideModalElement(save) {
        this.$refs['element'].hide()
        if (save == false) {
          this.dataElement[this.indexTab] = {}
        }
    },
    getData(data){
      return data
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
