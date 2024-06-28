<template>
<div class="">
  <div class="text-center">
    <button class="btn btn-outline-success my-2 my-sm-0" @click="exportToExcel(items, header, sheetName, filename)">
      <i style="margin-right: 5px;" class="fa fa-file-excel-o"></i>
      Excel</button>
  </div>
</div>
</template>

<script>
import XLSX from 'xlsx';
export default {
  props: {
    items: {
      type: [Array, Object],
      required: true,
      default: () => []
    },
    header: {
      type: [Array],
      required: false,
      default: () => []
    },
    sheetName: {
      type: String,
      default: "Contoh"
    },
    filename: {
      type: String,
      default: "book"
    },
  },
  data() {
    return {}
  },
  methods: {
    exportToExcel: function(data, headers, sheetName, filename) {
      var Heading = [[]];

      for (var i = 0; i < headers.length; i++) {
        Heading[0].push(headers[i])
      }

      var ws = XLSX.utils.aoa_to_sheet(Heading);
      XLSX.utils.sheet_add_json(ws, data, {
      skipHeader:true,
      origin: "A2"
      });

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      XLSX.writeFile(wb, filename + '.xlsx')

    },
  }
}
</script>

<style lang="css" scoped>

</style>
