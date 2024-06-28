<template>
<div class="">
  <CrudTable :isBusy="isBusy" :items="items" :fields="fields">
    <template slot="buttonAdd">
      <b-button variant="outline-success" @click="modalCreate()"><span class="fa fa-plus"></span> Tambah</b-button>
    </template>
    <template slot="buttonShowAndEdit" slot-scope="{ row }">
      <b-button pill variant="primary" @click="modalInfo(row)" size="md" v-b-tooltip.hover title="Lihat Detail Account Group">
        <i class="fa fa fa-eye"></i>
      </b-button>
      <b-button pill variant="success" @click="modalEdit(row.GrpCode)" size="md" v-b-tooltip.hover title="Ubah Data Account Group">
        <i class="fa fa-pencil-square-o"></i>
      </b-button>
      <b-button pill variant="danger" @click="modalDelete(row.GrpCode)" size="md" v-b-tooltip.hover title="Hapus Data Account Group">
        <i class="fa fa-trash"></i>
      </b-button>
    </template>
  </CrudTable>
  <b-modal :id="deleteModal.id" :title="deleteModal.title" :size="deleteModal.size">
    <p>Anda yakin ingin menghapus data ? <br>
    </p>
    <template v-slot:modal-footer>
        <div class="w-100">
          <b-button  variant="danger" @click="$bvModal.hide(deleteModal.id)" class="float-right">
              Tidak
          </b-button>
          <b-button  variant="primary"  @click="softDelete(DeleteCode)" class="float-right" style="margin-right:20px;">
              Ya
          </b-button>
        </div>
      </template>
  </b-modal>
  <b-modal :id="infoModal.id" :title="infoModal.title" :size="infoModal.size" hide-footer ok-only>
    <div class="form-group row" v-for="(value, index) in fieldsModalInfo" :key="index">
      <label class="col-sm-2 col-form-label">{{value.label}}
      </label>
      <div class="col-sm-10">
        <input type="text" v-model="dataModelInfo[value.key]" class="form-control" disabled>
      </div>

    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label" >Parent Code <b class="text-danger"> *</b>
      </label>
      <div class="col-sm-10">
        <v-select :options="dropdownAcGrp" v-model="dataModelInfo.Prnt_Code" :disabled="true" :reduce="Name => Name.Code" label="Name" />
      </div>
    </div>
  </b-modal>

  <b-modal :id="editModal.id" :title="editModal.title" :size="editModal.size" hide-footer ok-only>
    <b-form @submit="update">
      <div class="form-group row" v-for="(value, index) in fieldsModalEdit" :key="index">
        <label class="col-sm-2 col-form-label" :for="'input-group-'+index">{{value.label}} <b v-if="value.required" class="text-danger"> *</b>
        </label>
        <div class="col-sm-10" v-if="!value.money">
          <input :id="'input-group-'+index" type="text" v-model="dataModelEdit[value.key]" :required="value.required" :disabled="value.disabled" class="form-control">
        </div>
        <div class="col-sm-10" v-else>
          <money v-model="dataModelEdit[value.key]" :required="value.required" class="form-control" v-bind="money"></money>
        </div>
      </div>
      <!-- <div class="form-group row">
        <label class="col-sm-2 col-form-label" >Group <b class="text-danger"> *</b>
        </label>
        <div class="col-sm-10">
          <v-select :options="dropdownAcGrp" v-model="dataModelEdit.Prnt_Code" :reduce="Name => Name.Code" label="Name" />
        </div>
      </div> -->

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
        <div class="col-sm-10" v-if="!value.money">
          <input :id="'input-group-'+index" type="text" v-model="dataModelCreate[value.key]" :required="value.required" :disabled="value.disabled" :placeholder="value.label" class="form-control">
        </div>
        <div class="col-sm-10" v-else>
          <money v-model="dataModelCreate[value.key]" :required="value.required" class="form-control" :placeholder="value.label" v-bind="money"></money>
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
// import apiAccount from '@/api/AKAccountApiService';
import apiAccountGroup from '@/api/AKAccountGroupApiService';
import {
  Money
} from 'v-money'
export default {
  components: {
    CrudTable
  },
  data() {
    return {
      getGrpCode : '', //Set Code
      DeleteCode : '',
      configConfirm:null,
      textConfirm:null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp. ',
        suffix: '',
        precision: 0,
        masked: false
      },
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
      deleteModal : {
        id: 'table4',
        title: 'Delete',
        size: 'md'
      },
      items: [],
      fields: ['No', {
          key: 'GrpCode',
          label: 'Code'
        },
        {
          key: 'GroupName',
          label: 'Nama'
        },
        {
          key: 'GroupType',
          label: 'Group'
        },
        {
          key: 'Prnt_Code',
          label: 'Parent Code'
        },
        {
          key: 'UpdatedBy',
          label: 'User Log'
        }, 'actions'
      ],
      fieldsModalInfo: [{
          key: 'GrpCode',
          label: 'Code'
        },
        {
          key: 'GroupName',
          label: 'Nama'
        },
        {
          key: 'GroupType',
          label: 'Group'
        },

      ],
      fieldsModalEdit: [{
          key: 'GrpCode',
          label: 'Code',
          required : true,
        },
        {
          key: 'GroupName',
          label: 'Nama',
          required : true,
        },
        {
          key: 'GroupType',
          label: 'Group'
        },
        {
          key: 'Prnt_Code',
          label: 'Parent Code',
          required : true,
        },
      ],
      fieldsModalCreate: [{
          key: 'GrpCode',
          label: 'Code',
          required : true,
          onChange : true,
        },
        {
          key: 'GroupName',
          label: 'Nama',
          required : true,
        },
        {
          key: 'GroupType',
          label: 'Group'
        },
        {
          key: 'Prnt_Code',
          label: 'Parent Code',
          required : true,
        },
      ],
      dataModelInfo: {},
      dataModelEdit: {},
      dataModelCreate: {},
      dropdownAcGrp: []
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
      let data = await apiAccountGroup.getAll()
      for (var i = 0; i < data.length; i++) {
        data[i].No = i + 1
        data[i].Balance = this.formatCurrency(data[i].Balance)
        data[i].InitialBalance = this.formatCurrency(data[i].InitialBalance)
        data[i].Debit = this.formatCurrency(data[i].Debit)
        data[i].Credit = this.formatCurrency(data[i].Credit)
        data[i].Mutasi = this.formatCurrency(data[i].Mutasi)
      }
      this.items = data
      this.isBusy = false
      let AccGrp = await apiAccountGroup.getAll()
      for (var i = 0; i < AccGrp.length; i++) {
        this.dropdownAcGrp.push({
          Code : AccGrp[i].GrpCode,
          Name : AccGrp[i].GrpCode + ' - ' + AccGrp[i].GroupName
        })

      }
      console.log("grp",this.dropdownAcGrp);
      // this.dropdownAcGrp = AcGrp
    },
    modalInfo(item) {
      this.dataModelInfo = item
      this.$root.$emit('bv::show::modal', this.infoModal.id)
    },
    async modalEdit(id) {
      this.updateBtn = false

      this.getGrpCode = id.replace(/\s/g, '');
      let data = await apiAccountGroup.getOne(this.getGrpCode)
      this.dataModelEdit = data[0]
      this.$root.$emit('bv::show::modal', this.editModal.id)
    },
    modalCreate() {
      this.$root.$emit('bv::show::modal', this.createModal.id)
    },
    modalDelete(id){
      this.DeleteCode = id
      this.$root.$emit('bv::show::modal', this.deleteModal.id)
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.dataModelCreate = {}
      this.saveBtn = false
    },
    async save(evt) {
       this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
       .then(async (value) => {
          if(value){
            evt.preventDefault()
            this.dataModelCreate.CreatedBy = this.getSession('username')
            this.dataModelCreate.UpdatedBy = this.getSession('username')
            console.log("create", this.dataModelCreate);
            let data = await apiAccountGroup.create(this.dataModelCreate)
            this.saveBtn = true
            this.fetch()
            this.showNotif(data, 'Account Group')

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
              this.dataModelEdit.UpdatedBy = this.getSession('username')
              let data = await apiAccountGroup.update(this.getGrpCode, this.dataModelEdit)
              this.updateBtn = true
              this.fetch()
              this.showNotif(data, 'Account Group')

            }
         })
         .catch(err => {
          // An error occurred
         })
    },
    async softDelete(id){
      console.log("delete ",id);
      let data = await apiAccountGroup.delete(id)
      this.fetch()
      this.showNotif(data, 'Account')
      this.$root.$emit('bv::hide::modal', this.deleteModal.id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
