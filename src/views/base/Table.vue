<template>
  <b-card :header="caption">
    <b-table :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="captions" :current-page="currentPage" :per-page="perPage">
      <template slot="action" slot-scope="data" style="text-align:right">
        <div v-if="custom == 'default'">
          <span v-if="fieldId != ''">
            <i class="fa fa-pencil fa-md text-default" v-on:click="getID(data.item)"></i>&nbsp;
          </span>
          <span v-else>
            <router-link :to="{ name: routeName, params: {id:data.item.id} }"><i class="fa fa-pencil fa-md text-default"></i></router-link>&nbsp;
          </span>
          <span v-if="isCoaDetail">
            <i class="fa fa-book fa-md text-default" v-on:click="getCoaID(data.item)"></i>&nbsp;
          </span>
          <a href="#" v-on:click="buttonClicked(data.item[0])"><i class="fa fa-trash fa-md text-danger"></i></a>
        </div>
        <div v-else-if="custom == 'stepProcess'" style="text-align:right">
          <a href="#"><i class="fa fa-arrow-circle-up text-primary text-right" style="font-size:22px" v-on:click="buttonUpRowClicked(data.item.Sequence)"></i></a>&nbsp;
          <a href="#"><i class="fa fa-arrow-circle-down fa-md text-primary text-right" style="font-size:22px" v-on:click="buttonDownRowClicked(data.item.Sequence)"></i></a>&nbsp;
          <a href="#"><i class="fa fa-trash fa-md text-danger text-right" style="font-size:22px"></i></a>
        </div>
        <div v-else-if="custom == 'journalItem'" style="text-align:right">
          <a href="#" v-on:click="buttonClicked(data.item[0])"><i class="fa fa-trash fa-md text-danger"></i></a>
        </div>
        <div v-else-if="custom == 'workflowInitialization'" style="text-align:right">
          <router-link :to="{ name: routeName, params: {BussProcId:data.item.BP_ID,DocId:data.item.DocCode} }">
            <b-button size="md" variant="primary">Add</b-button>
          </router-link>
        </div>
        <div v-else-if="custom == 'ApprovalRequest'" style="text-align:right">
          <router-link :to="{ name: routeName, params: {BussProcId:data.item.BP_ID,BussProExecId:data.item.BPE_ID,AppId:data.item.APP_ID} }">
            <b-button size="md" variant="primary">Follow Up</b-button>
          </router-link>
        </div>
        <div v-else-if="custom == 'newSlot'">
          <slot :action="data.item"></slot>
        </div>
      </template>
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <!-- <template slot="action" slot-scope="data" style="text-align:right">
      <slot name="action"></slot>
      </template> -->
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
import api from '@/api/BPM/DocumentApiService'

export default {
  name: 'c-table',
  inheritAttrs: false,
  props: {
    clickHandler: {
                type: Function,
                default() {
                    return function () {};
                }
    },
    editField: {
                type: Function,
                default() {
                    return function () {};
                }
    },
    fieldId:{
      type: String,
      default: ''
    },
    isCoaDetail:{
      type: Boolean,
      default: false
    },
    coaDetail: {
                type: Function,
                default() {
                    return function () {};
                }
    },
    clickUpRowHandler: {
                type: Function,
                default() {
                    return function () {};
                }
    },
    clickDownRowHandler: {
                type: Function,
                default() {
                    return function () {};
                }
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    perPage: {
      type: Number,
      default: 5
    },
    dark: {
      type: Boolean,
      default: false
    },
    custom: {
      type: String,
      default: 'default'
    },
    actionValue: {
      type: String,
      default: ""
    },
    routeName: {
      type: String,
      default: ""
    }
  },
  data: () => {
    return {
      currentPage: 1,
      no:0
    }
  },
  computed: {
    items: function() {
      const items =  this.tableData
      return Array.isArray(items) ? items : items()
    },
    totalRows: function () { return this.getRowCount() },
    captions: function() { return this.fields }
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount: function () {
      return this.items.length
    },
    getID: function(id){
      var id;
      for (var key in id) {
        if (key == this.fieldId) {
          id = id[key]
        }
         // do some more stuff with obj[key]
      }
      console.log(id);
      this.editField(id); // invoke func passed via prop
    },
    getCoaID: function(id){
      var id;
      for (var key in id) {
        if (key == this.fieldId) {
          id = id[key]
        }
         // do some more stuff with obj[key]
      }
      console.log(id);
      this.coaDetail(id); // invoke func passed via prop
    },
    buttonClicked: function (id) {
      this.clickHandler(id); // invoke func passed via prop
    },
    buttonUpRowClicked: function (id) {
      this.clickUpRowHandler(id); // invoke func passed via prop
    },
    buttonDownRowClicked: function (id) {
      this.clickDownRowHandler(id); // invoke func passed via prop
    }
  }
}
</script>
