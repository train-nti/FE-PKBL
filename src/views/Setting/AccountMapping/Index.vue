<template>
<div class="">
  <CrudTable :isBusy="isBusy" :items="items" :fields="fields">
    <template slot="buttonAdd">
      <b-button variant="outline-success" @click="modalCreate()"><span class="fa fa-plus"></span> Tambah</b-button>
    </template>
    <template slot="buttonShowAndEdit" slot-scope="{ row }">
      <b-button pill variant="primary" @click="modalInfo(row)" size="md" v-b-tooltip.hover title="Lihat Detail Account Mapping">
        <i class="fa fa fa-eye"></i>
      </b-button>
      <b-button pill variant="success" @click="modalEdit(row.Code, row.AccMappingCategoryId)" size="md" v-b-tooltip.hover title="Ubah Data Account Mapping">
        <i class="fa fa-pencil-square-o"></i>
      </b-button>
      <!-- <b-button pill variant="danger" @click="modalDelete(row.Code)" size="md">
        <i class="fa fa-trash"></i>
      </b-button> -->
    </template>
  </CrudTable>
  <!-- <b-modal :id="deleteModal.id" :title="deleteModal.title" :size="deleteModal.size">
    <p>Anda yakin ingin menghapus data ? <br>
    </p>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="danger" @click="$bvModal.hide(deleteModal.id)" class="float-right">
          Tidak
        </b-button>
        <b-button variant="primary" @click="softDelete(DeleteCode)" class="float-right" style="margin-right:20px;">
          Ya
        </b-button>
      </div>
    </template>
  </b-modal> -->
  <b-modal :id="infoModal.id" :title="infoModal.title" :size="infoModal.size" hide-footer ok-only>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Nama Account <b class="text-danger"> *</b>
      </label>
      <div class="col-sm-10">
        <v-select :options="dropdownAcGrp" v-model="dataModelInfo.NameMerge" :disabled="true" label="Name" @input="setSelected($event)" />
      </div>
    </div>
    <div class="form-group row" v-for="(value, index) in fieldsModalInfo" :key="index">
      <label class="col-sm-2 col-form-label" :for="'input-group-'+index">{{value.label}} <b v-if="value.required" class="text-danger"> *</b>
      </label>
      <div class="col-sm-10" v-if="!value.money">
        <input :id="'input-group-'+index" type="text" v-model="dataModelInfo[value.key]" :required="value.required" :disabled="value.disabled" :placeholder="value.label" class="form-control">
      </div>
      <div class="col-sm-10" v-else>
        <money v-model="dataModelInfo[value.key]" :required="value.required" class="form-control" :placeholder="value.label" v-bind="money"></money>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">WorkArea <b class="text-danger"> *</b>
      </label>
      <div class="col-sm-10">
        <v-select :options="dropdownWorkArea" :disabled="true" v-model="dataModelInfo.WorkArea1Code" :reduce="text => text.value" label="text" />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Mapping Kategori <b class="text-danger"> *</b>
      </label>
      <div class="col-sm-10">
        <v-select :options="dropdownMappingCategory" :disabled="true" v-model="dataModelInfo.AccMappingCategoryId" :reduce="text => text.value" label="text" />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Jenis Program <b class="text-danger"> *</b>
      </label>
      <div class="col-sm-10">
        <v-select :options="JenisProg" :disabled="true" v-model="dataModelInfo.Flag" :reduce="text => text.value" label="text" />
      </div>
    </div>
    <div class="form-group row" v-if="dataModelInfo.Flag === 1">
      <label class="col-sm-2 col-form-label">Sektor<b class="text-danger"> *</b>
      </label>
      <div class="col-sm-10">
        <v-select :options="dropdownPKSector" :disabled="true" v-model="dataModelInfo.SectorCode" :reduce="text => text.value" label="text" />
      </div>
    </div>
    <div class="form-group row" v-else-if="dataModelInfo.Flag === 2">
      <label class="col-sm-2 col-form-label">Jenis Bina Lingkungan<b class="text-danger"> *</b>
      </label>
      <div class="col-sm-10">
        <v-select :options="dropdownBLType" :disabled="true" v-model="dataModelInfo.SectorCode" :reduce="text => text.value" label="text" />
      </div>
    </div>


  </b-modal>

  <b-modal :id="editModal.id" :title="editModal.title" :size="editModal.size" hide-footer ok-only>
    <b-form @submit="update">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Nama Account <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownAcGrp" v-model="dataModelEdit.NameMerge" label="Name" @input="setSelectedEdit($event)" />
        </div>
      </div>
      <div class="form-group row" v-for="(value, index) in fieldsModalEdit" :key="index">
        <label class="col-sm-2 col-form-label" :for="'input-group-'+index">{{value.label}} <b v-if="value.required" class="text-danger"> *</b>
        </label>
        <div class="col-sm-10" v-if="!value.money">
          <input :id="'input-group-'+index" type="text" v-model="dataModelEdit[value.key]" :required="value.required" :disabled="value.disabled" :placeholder="value.label" class="form-control">
        </div>
        <div class="col-sm-10" v-else>
          <money v-model="dataModelEdit[value.key]" :required="value.required" class="form-control" :placeholder="value.label" v-bind="money"></money>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">WorkArea <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownWorkArea" v-model="dataModelInfo.WorkArea1Code" :reduce="text => text.value" label="text" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Mapping Kategori <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownMappingCategory" v-model="dataModelEdit.AccMappingCategoryId" :reduce="text => text.value" label="text" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Jenis Program <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="JenisProg" v-model="dataModelEdit.Flag" :reduce="text => text.value" label="text" />
        </div>
      </div>
      <div class="form-group row" v-if="dataModelEdit.Flag === 1">
        <label class="col-sm-2 col-form-label">Sektor<b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownPKSector" v-model="dataModelEdit.SectorCode" :reduce="text => text.value" label="text" />
        </div>
      </div>

      <div class="form-group row" v-else-if="dataModelEdit.Flag === 2">
        <label class="col-sm-2 col-form-label">Jenis Bina Lingkungan<b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownBLType" v-model="dataModelEdit.SectorCode" :reduce="text => text.value" label="text" />
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
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Nama Account <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownAcGrp" v-model="dataModelCreate.NameMerge" label="Name" @input="setSelected($event)" />
        </div>
      </div>
      <div class="form-group row" v-for="(value, index) in fieldsModalCreate" :key="index">
        <label class="col-sm-2 col-form-label" :for="'input-group-'+index">{{value.label}} <b v-if="value.required" class="text-danger"> *</b>
        </label>
        <div class="col-sm-10" v-if="!value.money">
          <input :id="'input-group-'+index" type="text" v-model="dataModelCreate[value.key]" :required="value.required" :disabled="value.disabled" :placeholder="value.label" class="form-control">
        </div>
        <div class="col-sm-10" v-else>
          <money v-model="dataModelCreate[value.key]" :required="value.required" class="form-control" :placeholder="value.label" v-bind="money"></money>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">WorkArea <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownWorkArea" v-model="dataModelCreate.WorkArea1Code" :reduce="text => text.value" label="text" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Mapping Kategori <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownMappingCategory" v-model="dataModelCreate.AccMappingCategoryId" :reduce="text => text.value" label="text" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Jenis Program <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="JenisProg" v-model="dataModelCreate.Flag" :reduce="text => text.value" label="text" />
        </div>
      </div>
      <div class="form-group row" v-if="dataModelCreate.Flag === 1">
        <label class="col-sm-2 col-form-label">Sektor<b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownPKSector" v-model="dataModelCreate.SectorCode" :reduce="text => text.value" label="text" />
        </div>
      </div>
      <div class="form-group row" v-else-if="dataModelCreate.Flag === 2">
        <label class="col-sm-2 col-form-label">Jenis Bina Lingkungan<b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownBLType" v-model="dataModelCreate.SectorCode" :reduce="text => text.value" label="text" />
        </div>
      </div>

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
import apiAccountMapping from '@/api/AKAccountMappingApiService';
import apiAccountMappingCategory from '@/api/AKAccountMappingCategoryApiService';
import apiAccountGroup from '@/api/AKAccountGroupApiService';
import apiBLType from '@/api/BL/BLTypeApiService';
import apiPKSector from '@/api/PK/PKSectorApiService';
import apiWorkArea from '@/api/WorkArea1ApiService';
import {
  Money
} from 'v-money'
export default {
  components: {
    CrudTable
  },
  data() {
    return {
      Code: '', //Set Code
      CategoryId : null,
      DeleteCode: '',
      configConfirm:null,
      textConfirm:null,
      Flag : 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp. ',
        suffix: '',
        precision: 0,
        masked: false
      },
      JenisProg: [{
          value: 2,
          text: 'Bina Lingkungan'
        },
        {
          value: 1,
          text: 'Kemitraan'
        }
      ],
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
      // deleteModal: {
      //   id: 'table4',
      //   title: 'Delete',
      //   size: 'md'
      // },
      items: [],
      fields: ['No', {
          key: 'Code',
          label: 'Kode'
        },
        {
          key: 'Name',
          label: 'Nama Account'
        },
        {
          key: 'Description',
          label: 'Deskripsi'
        },
        {
          key: 'UpdatedBy',
          label: 'User Log'
        }, 'actions'
      ],
      fieldsModalInfo: [{
        key: 'Description',
        label: 'Deskripsi',
        required: true,
        disabled: true
      }, ],
      fieldsModalEdit: [{
        key: 'Description',
        label: 'Deskripsi',
        required: true,
      }, ],
      fieldsModalCreate: [{
        key: 'Description',
        label: 'Deskripsi',
        required: true
      }, ],
      dataModelInfo: {},
      dataModelEdit: {
      },
      dataModelCreate: {},
      dropdownAcGrp: [],
      dropdownBLType: [],
      dropdownPKSector: [],
      dropdownWorkArea : [],
      dropdownMappingCategory: []
    }
  },
  async created() {
    this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
    this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
    this.fetch()
  },
  methods: {
    async fetch() {
      this.isBusy = true
      let data = await apiAccountMapping.getAll()
      for (var i = 0; i < data.length; i++) {
        data[i].No = i + 1
        data[i].NameMerge = data[i].Code + ' - ' + data[i].Name
      }
      this.items = data
      let AccGrp = await apiAccountGroup.getAll()
      for (var i = 0; i < AccGrp.length; i++) {
        this.dropdownAcGrp.push({
          Code: AccGrp[i].GrpCode,
          Name: AccGrp[i].GrpCode + ' - ' + AccGrp[i].GroupName,
          NameOrigin: AccGrp[i].GroupName
        })

      }

      let dataCategory = await apiAccountMappingCategory.getAll()
      for (var i = 0; i < dataCategory.length; i++) {
        this.dropdownMappingCategory.push({
          value: dataCategory[i].AccMappingCategoryID,
          text: dataCategory[i].Code
        })
      }

      let dataBLType = await apiBLType.getAll()
      for (var i = 0; i < dataBLType.length; i++) {
        dataBLType[i]
        this.dropdownBLType.push({
          value: dataBLType[i].BLTypeCode,
          text: dataBLType[i].BLTypeName
        })
      }

      let dataPKSector = await apiPKSector.getAll()
      for (var i = 0; i < dataPKSector.length; i++) {
        this.dropdownPKSector.push({
          value: dataPKSector[i].SectorCode,
          text: dataPKSector[i].SectorName
        })
      }


      let dataWorkArea1 = await apiWorkArea.getComboBoxAll()
      for (var i = 0; i < dataWorkArea1.length; i++) {
        this.dropdownWorkArea.push({
          value: dataWorkArea1[i].Code,
          text: dataWorkArea1[i].Code
        })
      }
      this.isBusy = false
    },
    async modalInfo(item) {
      this.dataModelInfo = {}
      this.dataModelInfo = item
//       let check = await this.checked(item.Code, item.AccMappingCategoryId  )
//
// console.log("check", check);
//       console.log("yeahh", item);
      this.dataModelInfo.Flag = this.dataModelInfo.Flag == 0 ? 2 : this.dataModelInfo.Flag
      this.$root.$emit('bv::show::modal', this.infoModal.id)
    },
    async modalEdit(code, categoryId) {
      this.updateBtn = false
      this.Code = code.replace(/\s/g, '');
      this.CategoryId = categoryId
      let data = await apiAccountMapping.getOne(this.Code, categoryId)
      console.log(data);
      this.dataModelEdit = {}
      this.dataModelEdit = data[0]
      this.dataModelEdit.NameMerge = data[0].Code + ' - ' + data[0].Name
      this.dataModelEdit.Flag = this.dataModelEdit.Flag == 0 ? 2 : this.dataModelEdit.Flag
      console.log(this.dataModelEdit);

      this.$root.$emit('bv::show::modal', this.editModal.id)
    },
    modalCreate() {
      this.$root.$emit('bv::show::modal', this.createModal.id)
    },
    // modalDelete(id) {
    //   this.DeleteCode = id
    //   this.$root.$emit('bv::show::modal', this.deleteModal.id)
    // },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.dataModelCreate = {}
      this.saveBtn = false
    },
    setSelected(value) {
      //  trigger a mutation, or dispatch an action
      console.log("vv", value);

      if (value) {
        this.dataModelCreate.Code = value.Code
        this.dataModelCreate.Name = value.NameOrigin
        this.dataModelCreate.NameMerge = value.Name

      } else {
        this.dataModelCreate.Code = ''
        this.dataModelCreate.Name = ''
        this.dataModelCreate.NameMerge = ''

      }

    },
    setSelectedEdit(value){

      if (value) {
        this.$nextTick(function () {
          this.dataModelEdit.Code = value.Code
          this.dataModelEdit.Name = value.NameOrigin
          this.dataModelEdit.NameMerge = value.Name
        })

      } else {
        this.dataModelEdit.Code = value.Code
        this.dataModelEdit.Name = value.NameOrigin
        this.dataModelEdit.NameMerge = value.Name
      }

      // console.log("ada datanya", this.dataModelEdit.NameMerge, " 0000 ", value.Name);

    },
    async save(evt) {
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value){
            evt.preventDefault()
            this.dataModelCreate.CreatedBy = this.getSession('username')
            this.dataModelCreate.UpdatedBy = this.getSession('username')
            this.dataModelCreate.Flag = this.dataModelCreate.Flag == 2 ? 0 : this.dataModelInfo.Flag
            let data = await apiAccountMapping.create(this.dataModelCreate)
            this.saveBtn = true
            this.fetch()
            this.showNotif(data, 'Account')
          }
       })
       .catch(err => {
        // An error occurred
       })
    },
    async update(evt) {
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value){
            evt.preventDefault()
            console.log(this.dataModelEdit);
            this.dataModelEdit.UpdatedBy = this.getSession('username')
            this.dataModelEdit.Flag = this.dataModelEdit.Flag == 2 ? 0 : this.dataModelEdit.Flag

            // if (this.Code == this.dataModelEdit.Code.replace(/\s/g, '')) {
            // console.log("sama");
            // }
            let data = await apiAccountMapping.update(this.Code, this.CategoryId , this.dataModelEdit)
            this.updateBtn = true
            this.fetch()
            this.showNotif(data, 'Account')

          }
       })
       .catch(err => {
        // An error occurred
       })
    },
    async checked(code, accMappingCategoryId){
      let data = await apiAccountMapping.getOne(code.replace(/\s/g, ''), accMappingCategoryId)
      if (data.length) {
      data[0] = {
        Status : false,
        Message : 'Operation Failed',
      }
    }
      return data;
    },
    // async softDelete(id) {
    //   console.log("delete ", id);
    //   let data = await apiAccountMapping.delete(id)
    //   this.fetch()
    //   this.showNotif(data, 'Account')
    //   this.$root.$emit('bv::hide::modal', this.deleteModal.id)
    // }
  }
}
</script>

<style lang="css" scoped>
</style>
