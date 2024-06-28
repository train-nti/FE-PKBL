<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col>
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Cari"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Bersihkan Filter</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row><br>

    <b-row>
      <b-col>
        <b-form-group label-cols-sm="3" label="Urutkan" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- None --</option>
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row><br>

    <b-row>
      <b-col>
        <b-form-group label-cols-sm="3" label="Per Halaman" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row><br>

    <b-row>
      <b-col v-if="btnExcel">
        <b-form-group label-cols-sm="3" label="Ekspor">
          <!-- <excel :items="itemsExcel" :header="headerExcel" style="float:left;" :sheetName="sheetName" :filename="filename"></excel> -->
          <btnExcel :items="itemsExcel" :settingExcel="settingExcel" :header="headerExcel" style="float:left;" :sheetName="sheetName" :filename="filename"></btnExcel>
        </b-form-group>
      </b-col>

      <!-- <b-col md="4" offset-md="8" class="my-1" v-else>
      <br>
    </b-col> -->

    </b-row><br>


    <!-- Main table element -->
    <b-table :busy="isBusy" show-empty :sort-compare="sortDate" responsive :items="items" :striped="striped" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
      @filtered="onFiltered">


      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>

      <template slot="actions" slot-scope="row">
        <slot :row="row.item"></slot>
        <!-- <b-button pill variant="primary" v-if="infoModalStatus" size="md" @click="info(row.item, row.index, $event.target)">
          <i class="fa fa-eye "></i>
        </b-button> -->
      </template>

      <template slot="StatusApprove" slot-scope="row">
        <b-badge pill variant="success">{{row.item.StatusApprove}}</b-badge>
      </template>

      <template slot="bottom-row" slot-scope="row" v-if="BtmRowitems">
        <td v-for="rowItem in BtmRowitems" :colspan="rowItem.cols">{{rowItem.value}}</td>
      </template>

    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0"></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal  :id="infoModal[0].id" :title="infoModal[0].title" ok-only @hide="resetInfoModal">
      <div class="form-group row" v-for="(value, index) in fields" v-if="value.label !== 'Actions'" :key="index">
        <label for="staticEmail" class="col-sm-2 col-form-label">{{value.label}}
        </label>

        <div class="col-sm-10">
          <input type="text" v-model="data[value.key]" class="form-control" :placeholder="value.label" disabled>
        </div>

      </div>
      <div class="form-group row" v-if="journal">
        <label for="inputPassword" class="col-sm-2 col-form-label">Lihat Journal</label>
        <div class="col-sm-10">
          <router-link :to="{ name: 'General Journal Form', params: { id: Jrn_ID } }">
            <button type="button" class="btn btn-info">
              <i class="fa fa-eye "></i>
            </button>
          </router-link>
        </div>
      </div>

    </b-modal>

  </b-container>
</template>

<script>
  import excel from './BtnExcel';
  import btnExcel from './Excel';
  import apijournal from '@/api/AKJournalApiService'
  import moment from '../../node_modules/moment/moment';
  export default {
    components: {
      'excel': excel,
      'btnExcel' : btnExcel
    },
    props: {
      BtmRowitems: {
        type: [Array, Object],
        required: false,
        default: () => []
      },
      items: {
        type: [Array, Object],
        required: true,
        default: () => []
      },
      itemsExcel: {
        type: [Array, Object],
        required: false,
        default: () => []
      },
      headerExcel: {
        type: [Array],
        required: false,
        default: () => []
      },
      settingExcel: {
        type: [Array],
        required: false,
        default: () =>  [
          {
            Cell : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O']
          },
          {
            titles : []
          },
          {
            mergeTo : "N"
          },
          {
            origin : "A9"
          }
        ]
      },
      fields: {
        type: [Array, Object],
        default: () => []
      },
      infoModal: {
        type: [Array, Object],
        required: false,
        default: () => [{
          id: '',
          title: '',
        }]
      },
      striped: {
        type: Boolean,
        default: false,
      },
      journal: {
        type: Boolean,
        default: false,
      },
      sheetName: {
        type: String,
        default: "Sheet1"
      },
      filename: {
        type: String,
        default: "Book"
      },
      infoModalStatus: {
        type: Boolean,
        default: true,
      },
      isBusy: {
        type: Boolean,
        required: false,
        default: false
      },
    },
    data() {
      return {
        Jrn_ID: '',
        data: {},
        btnExcel: true,
        totalRows: 1,
        currentPage: 1,
        perPage: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,

      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields

        if (!Array.isArray(this.itemsExcel) || !this.itemsExcel.length) {
          this.btnExcel = false
        } else {
          this.btnExcel = true
        }
        this.totalRows = this.items.length

        let field = this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {
              text: f.label,
              value: f.key
            }
          })

        return field

      },

    },

    methods: {
      sortDate(a, b, key) {
        let aDate = moment(a[key], 'DD/MMM/YYYY')
        let bDate = moment(b[key], 'DD/MMM/YYYY')

        if (aDate.isValid && bDate.isValid) {
          if (aDate < bDate) {
            return -1
          }
          else if (aDate > bDate) {
            return 1
          }
          else {
            return 0
          }
        }
        return null
      },
      async info(item, index, button) {
        this.data = item

        if (this.journal) {
          let id = await apijournal.getByJournalNumber(item.TransNo)
          this.Jrn_ID = id[0].Jrn_ID
          console.log("lulu ", id[0].Jrn_ID)
        }

        this.$root.$emit('bv::show::modal', this.infoModal[0].id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },

    }
  }
</script>
