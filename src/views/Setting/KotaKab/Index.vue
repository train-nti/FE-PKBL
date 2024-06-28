<template>
<div class="">
  <CrudTable  :isBusy="isBusy" :items="items" :fields="fields">
    <template slot="buttonAdd">
      <b-button variant="outline-success" disabled @click="modalCreate()"><span class="fa fa-plus"></span> Tambah</b-button>
    </template>
    <template slot="buttonShowAndEdit" slot-scope="{ row }">
      <b-button pill variant="primary" @click="modalInfo(row)" size="md">
        <i class="fa fa fa-eye"></i>
      </b-button>
      <b-button pill variant="primary" @click="modalEdit(row.Kode_kota)" size="md">
        <i class="fa fa-pencil-square-o"></i>
      </b-button>
    </template>
  </CrudTable>

  <b-modal :id="infoModal.id" :title="infoModal.title" :size="infoModal.size" hide-footer ok-only>
    <div class="form-group row" v-for="(value, index) in fieldsModalInfo" :key="index">
      <label class="col-sm-2 col-form-label">{{value.label}}
      </label>
      <div class="col-sm-10">
        <input type="text" v-model="dataModelInfo[value.key]" class="form-control" disabled>
      </div>

    </div>
  </b-modal>

  <b-modal :id="editModal.id" :title="editModal.title" :size="editModal.size" hide-footer ok-only>
    <b-form @submit="update">
      <div class="form-group row" v-for="(value, index) in fieldsModalEdit" :key="index">
        <label class="col-sm-2 col-form-label" :for="'input-group-'+index">{{value.label}} <b v-if="value.required" class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <input :id="'input-group-'+index" type="text" v-model="dataModelEdit[value.key]" :required="value.required" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-4">
          <b-button variant="success" type="submit" :disabled="updateBtn">Update</b-button>
        </div>
      </div>
    </b-form>
  </b-modal>

  <b-modal :id="createModal.id" :title="createModal.title" :size="createModal.size" hide-footer ok-only>
    <b-form @submit="save" @reset="onReset">
      <div class="form-group row" v-for="(value, index) in fieldsModalCreate" :key="index">
        <label class="col-sm-2 col-form-label" :for="'input-group-'+index">{{value.label}} <b v-if="value.required" class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <input :id="'input-group-'+index" type="text" v-model="dataModelCreate[value.key]" :required="value.required" class="form-control" :placeholder="value.label">
        </div>
      </div>
      <!-- <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="input-group-select">Provinsi <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
        <v-select :options="dropdownRegion" v-model.number="dataModelCreate.Kode_provinsi" :reduce="text => text.value" label="text" />
        </div>
      </div> -->
      <div class="form-group row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-4">
          <b-button variant="success" type="submit" :disabled="saveBtn">Save</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </div>
    </b-form>
  </b-modal>


</div>
</template>

<script>
import CrudTable from '@/components/CrudTable';
import apiKotaKab from '@/api/BPM/KotaKabApiService';
import apiProvinsi from '@/api/BPM/ProvinsiApiService';
export default {
  components: {
    CrudTable
  },
  data() {
    return {
      updateBtn: false,
      saveBtn: false,
      isBusy: false,
      infoModal: {
        id: 'table1',
        title: 'Show',
        size: 'lg'
      },
      editModal: {
        id: 'table2',
        title: 'Edit',
        size: 'lg'
      },
      createModal: {
        id: 'table3',
        title: 'Create',
        size: 'lg'
      },
      items: [],
      fields: ['No', {
        key: 'Kode_kota',
        label: 'Kode Kota'
      },
      {
        key: 'Name',
        label: 'Nama Kota'
      },
       {
        key: 'UpdatedBy',
        label: 'User Log'
      }, 'actions'],
      fieldsModalInfo: [{
        key: 'Kode_kota',
        label: 'Kode Kota'
      },
      {
        key: 'Name',
        label: 'Nama Kota'
      },
       {
        key: 'UpdatedBy',
        label: 'User Log'
      }],
      fieldsModalEdit: [{
        key: 'Kode_kota',
        label: 'Kode Kota',
        required : true
      },
      {
        key: 'Name',
        label: 'Nama Kota',
        required : true
      }, ],
      fieldsModalCreate: [{
        key: 'Kode_kota',
        label: 'Kode Kota',
        required : true
      },
      {
        key: 'Name',
        label: 'Nama Kota',
        required : true
      }, ],
      dataModelInfo: {},
      dataModelEdit: {},
      dataModelCreate: {},
      dropdownRegion : []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.isBusy = true
      let data = await apiKotaKab.getAll()
      for (var i = 0; i < data.length; i++) {
        data[i].No = i + 1
      }
      this.items = data
      this.isBusy = false
      let prov = await apiProvinsi.getAllCombobox()
      this.dropdownRegion = prov

    },
    modalInfo(item) {
      this.dataModelInfo = item
      this.$root.$emit('bv::show::modal', this.infoModal.id)
    },
    async modalEdit(id) {
      this.updateBtn = false
      let data = await apiKotaKab.getOne(id)
      this.dataModelEdit = data[0]
      this.$root.$emit('bv::show::modal', this.editModal.id)
    },
    modalCreate() {
      this.$root.$emit('bv::show::modal', this.createModal.id)
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.dataModelCreate = {}
      this.saveBtn = false
    },
    async save(evt) {
      evt.preventDefault()
      this.dataModelCreate.UpdatedBy = this.getSession('username')
      let data = await apiKotaKab.create(this.dataModelCreate)
      this.saveBtn = true
      this.fetch()
      this.showNotif(data, 'Sektor Usaha')
    },
    async update(evt) {
      evt.preventDefault()
      this.dataModelEdit.UpdatedBy = this.getSession('username')
      let data = await apiKotaKab.update(this.dataModelEdit.SectorCode, this.dataModelEdit)
      this.updateBtn = true
      this.fetch()
      this.showNotif(data, 'Sektor Usaha')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
