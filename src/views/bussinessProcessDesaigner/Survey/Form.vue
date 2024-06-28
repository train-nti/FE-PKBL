<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Penilaian </strong>
          </div>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Tanggal Survey</label>
                <b-form-input type="date" id="element.name" v-model="model.DateSurvey"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Lembaga</label>
                <b-form-input type="text" id="element.name"  v-model="model.instance"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Nama Pemohon</label>
                <b-form-input type="text" id="element.name"  v-model="model.FullName"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <label for="ccnumber">Alamat</label>
              <textarea id="element" rows="5" class="form-control" v-model="model.Address"></textarea>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Kabupaten / Kota</label>
                <b-form-input type="text" id="element.name"   v-model="model.SubDistrict"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <label for="ccnumber">Handphone</label>
              <b-form-input type="number" id="element.name" v-model="model.Phone"></b-form-input>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Jenis Bina Lingkungan</label>
                <b-form-input type="text" id="element.name"  v-model="model.Type"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Bentuk Kegiatan</label>
                <b-form-input type="text" id="element.name"  v-model="model.Activity"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <label for="ccnumber">Nilai Pengajuan</label>
              <b-form-input type="number" id="element.name" v-model="model.Value"></b-form-input>
            </b-col>
            <b-col sm="12">
              <label for="ccnumber">Nilai Rekomendasi</label>
              <b-form-input type="number" id="element.name" v-model="model.ValueRecommed"></b-form-input>
            </b-col>
            <b-col sm="12">
              <label for="ccnumber">Hasil Survey</label>
              <textarea id="element" rows="5" class="form-control" v-model="model.HasilSur"></textarea>
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
        {key: 'ApprType',label:'Type'},
        {key: 'PosName',label:'Position', sortable: true}
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
      dataElement:[],
      model:{}
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
      console.log(this.documentElements);
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
      // var sequence = await apiAppRequest.getByBussProcExecID(this.$route.params.BussProExecId)
      console.log(this.AppModel);
      // var result = await apiAppRequest.update(this.AppModel)
      // console.log(result);
      var dataBussProcExec = await apiAppRequest.getByBussProcExecID(this.$route.params.BussProExecId)
      console.log('datanya ',dataBussProcExec);
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
      if (dataBussProcExec.length > 0) {
        var data = this.dataElement[0]
        var min=1;
        var max=100;
        var random =Math.floor(Math.random() * (+max - +min)) + +min;
        var Debitor = {
            DebCode : 'BL'+random,
            Instance: data[3],
            FullName : data[4],
            IDNumber : data[5],
            // PlaceofBirth : data[3],
            // DateofBirth: data[4],
            // Gender: data[5],
            Address: data[6],
            Prov_code: data[7],
            Dist_code: data[8],
            Subdis_code: data[9],
            // PostalCode: data[10],
            Phone: data[12],
            eMail: data[13],
            BLType: data[14],
            Activity: data[15],
            Amount: data[16],
            FunctionBL: data[17]
        }
      }
        console.log(Debitor);
        // await debitor.create(Debitor);
      // console.log(customer);
      var result = await apiDebitor.create(Debitor);

      this.showNotif(result,"Review")
      this.$router.push('/bussiness-process-desaigner/review-and-approval')
    },
    showNotif(response,form){
      if (response.Status) {
        console.log(response.Status);
        this.$notify({
          group: 'notif-response',
          title: response.Message,
          text: form +' Data Successfully Processed',
          type: 'success'
        });
      }else {
        this.$notify({
          group: 'notif-response',
          title: response.Message,
          text: form +' Data Failed in Processed',
          type: 'error'
        });
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
