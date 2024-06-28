<template>
<div id="CrudTable">
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>{{ label ? label : this.$route.name}}</strong>
        </div>
        <b-row>
          <b-col cols="4">
            <slot name="buttonAdd"></slot>
            <!-- <b-button variant="outline-success"><span class="fa fa-plus"></span> Tambah</b-button> -->
          </b-col>
          <b-col cols="5">

            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" v-model="filter" placeholder="Search">
            </div>
          </b-col>
          <b-col cols="3">
            <b-form-group label-cols-sm="3" label="Data" class="mb-0">
              <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
            </b-form-group>
          </b-col>

        </b-row>
        <!-- Main table element -->
        <b-table show-empty responsive :busy="isBusy" :items="data" :striped="striped" :fields="fields" :current-page="currentPage" :per-page="perPage" :borderless="borderless" :outlined="outlined" :filter="filter" @filtered="onFiltered">

          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>

          <template slot="actions" slot-scope="row">
            <slot name="buttonShowAndEdit" :row="row.item"></slot>
          </template>

        </b-table>
        <b-row class="d-flex justify-content-center">
          <b-col md="6" class="my-1">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last"></b-pagination>
          </b-col>
        </b-row>

      </b-card>

    </b-col>
  </b-row>
</div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    items: {
      type: [Array, Object],
      required: true,
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    striped: {
      type: Boolean,
      required: false,
      default: true
    },
    hover: {
      type: Boolean,
      required: false,
      default: false
    },
    outlined: {
      type: Boolean,
      required: false,
      default: true
    },
    borderless: {
      type: Boolean,
      required: false,
      default: true
    },
    perPage: {
      type: Number,
      required: false,
      default: 5
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      currentPage: 1,
      totalRows: 1,
      pageOptions: [5, 10, 15, 20, 25, 50, 100],
      filter: '',
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
  computed : {
    data () {
      // Set the initial number of items
      this.totalRows = this.items.length
      return this.items
    }
  },

}
</script>

<style lang="css" scoped>
.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.2rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}

</style>
