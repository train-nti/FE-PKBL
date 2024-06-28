<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong> {{ (this.$route.params.id ? 'Edit Document ' + model.DocName : 'New Document') }} </strong>
          </div>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="name">Kode Dokumen</label>
                  <b-form-input type="text" id="doc-code" placeholder="" v-model="model.DocCode"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="ccnumber">Nama / Judul Dokumen</label>
                  <b-form-input type="text" id="doc-name" v-model="model.DocName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group >
                  <label for="month1">Deskripsi</label>
                  <textarea rows="5" id="doc-desc" v-model="model.Description" class="form-control"></textarea>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group>
                  <label for="element">Deklarasi Elemen</label>
                  <textarea id="element" rows="10" v-model="model.Elements" class="form-control"></textarea>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-card header="Sebelumnya" style="max-height:350px;height:350px;overflow-y: scroll;">
                  <g-form :element-data="elements" :data-element="dataElement"/>
                </b-card>
              </b-col>
              <b-col sm="12">
                <div class="form-group form-actions">
                  <b-button type="submit" size="md" variant="primary" @click="saveDocument">Save</b-button>
                  <b-button type="button" v-on:click="preview" size="md" variant="secondary">Preview</b-button>
                  <router-link :to="{ name: 'Document Desaigner'}">
                    <b-button size="md" variant="danger">Batal</b-button>
                  </router-link>
                </div>
              </b-col>
            </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import apiDocument from '@/api/BPM/DocumentApiService'
import gForm from '@/views/base/FormGenerator.vue'


export default {
  name: 'DocumentDesaigner',
  components: {gForm},
  data () {
    return {
      id: null,
      elements: {},
      elementsField: {},
      model: {},
      titleModalElement:'',
      dataElement:[],
      tabIndex: [0, 0]
    }
  },
  async created() {
    this.id = this.$route.params.id;
    if (this.id != null) {
      this.data = await apiDocument.getOne(this.id)
      this.model = this.data[0]
      this.preview()
    }

  },
  methods: {
    preview() {
      this.elements = JSON.parse(this.model.Elements);
      if (this.elements.DocElements != null) {
        for (var i = 0; i < this.elements.DocElements.length; i++) {
          this.dataElement.push([]);
        }
      }
      // DocElements.push({Name: 'pemo  hon', Caption: 'Pemohon', ItemType: 'text'});
    },
    async saveDocument() {
      const isUpdate = !!this.id;
      var response;
      if (isUpdate) {
        response = await apiDocument.update(this.id, this.model)
      } else {
        response = await apiDocument.create(this.model)
      }
      this.showNotif(response,'Document')
      this.$router.push('/bussiness-process-desaigner/document-desaigner')
    },
    async editElement(id) {
      this.showModalElement()
    },
    saveOrUpdateElement(key){

      console.log(this.dataElement);

      this.elements.DocElements[this.indexTab].Table.Row.push(this.dataElement)
    },
    hideModalElement() {
        this.$refs['element'].hide()
        //console.log("yo baka")
       //this.setActive = false;

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
