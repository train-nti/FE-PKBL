<template>
<div>
  <table class="table table-bordered" style="background:#dddddd">
    <thead>
      <tr>
        <th v-for="data, key in labels">{{data}}</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in items">
        <td v-for="(row, key) in data">
          <input :ref="key+index" type="text" v-model="data[key]" style="border:none" :disabled="disabled"></input>
        </td>
        <td v-if="disabled">
          <button type="button" class="btn btn-success" @click="edit(index+''+key)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </td>
        <td v-else="disabled">
          <button type="button" class="btn btn-success" @click="update()">
            <i class="fa fa-floppy-o" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    </tbody>

  </table>

</div>
</template>

<script>
export default {
  props: ['labels', 'items'],
  data() {
    return {
      disabled: true
    }
  },
  methods: {
    edit: function(index, key) {
      console.log(this.$refs.id0);
      this.$refs[index+key][0].disabled = false
    },
    update: function() {
      this.disabled = true
    },
    deleteEvent: function(index) {
      this.proplabels.splice(index, 1);
    }
  }
}
</script>

<style lang="css" scoped>
input[type=text]:disabled {
  background: #dddddd;
}
</style>
