<template>
<div>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th v-for="data, key in labels">{{data}}</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(datalist, index) in filterData">
        <td v-for="(row, key) in datalist" v-model="datalistkey">
          {{datalist[key]}}
        </td>
        <td class="text-center">
            <button type="button" class="btn btn-success" @click="edit(filterData[index])">
                <i class="fa fa-pencil "></i>
            </button>
        </td>
      </tr>
    </tbody>

  </table>
  <b-button @click="prevPage" variant="primary">Previous</b-button>
  <b-button disabled variant="outline-primary">{{currentPage}}</b-button>
  <b-button @click="nextPage" variant="primary">Next</b-button>
</div>
</template>

<script>
export default {
  // props: ['labels', 'items'],
  name : 'ctable',
  props: {
    labels: Array,
    items: {
      type: [Array, Object],
      default: () => []
    },
    pageSize : {
      type: Number,
      default: 5
    },
    clickHandler: {
                type: Function,
                default() {
                    return function () {};
                }
    },
  },
  data() {
    return {
      currentPage : 1,
      datalistkey:[],
    }
  },
  methods: {
    edit: function(data){

      this.clickHandler(data)

      // console.log(data)


    },
    nextPage: function () {
        if ((this.currentPage * this.pageSize) < this.items.length) this.currentPage++;
    },
    prevPage: function () {
        if (this.currentPage > 1) this.currentPage--;
    },
  },
  computed: {
    filterData: function () {
        return this.items.filter((row, index) => {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true;
          });
    },

    }

}

</script>

<style lang="css" scoped>

</style>
