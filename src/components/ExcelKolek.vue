<template>
<div class="">
  <div class="text-center">
    <button class="btn btn-outline-success my-2 my-sm-0" @click="exportToExcel(items, header, sheetName, filename, titles, settingExcel)">
      <i style="margin-right: 5px;" class="fa fa-file-excel-o"></i>
      Excel</button>
  </div>
</div>
</template>

<script>
import * as Excel from "exceljs";
import * as FileSaver from 'file-saver';

export default {
  props: {
    items: {
      type: [Array, Object],
      required: false,
      default: () => [{
          idClient: 1,
          name: 'Rihabbs',
          tel: '0123456789',
          adresse: 'Home sweet home',

        },
        {
          idClient: 2,
          name: 'mfahmirukman',
          tel: '0123456789',
          adresse: 'Indonesia',

        }
      ]
    },
    header: {
      type: [Array],
      required: false,
      default: () => ['Tes','Cek']
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
    titles: {
      type: [Array, Object],
      required: false,
      default: () => [{
        cels : 'A1',
        name : 'Laporan AA',
        font : {
          name : "Arial",
          family:2,
          size: 11,
          bold: true
        },
        // fills: {
        //   color : '6495ED'
        // }
      },
      {
        cels : 'A2',
        name : 'SUMBAGUT',
      }]
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
    exportToExcel: function(data, headers, sheetName, filename, titles, settingExcel) {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet(sheetName);
  console.log("Cc", settingExcel[1].titles);
      /*TITLE*/
      settingExcel[1].titles.forEach(function(item, index) {
        let no = index + 1
        worksheet.mergeCells('A'+no, 'D'+no);
        worksheet.getCell(item.cels).value = item.name

        //font title
        if (item.font) {
          worksheet.getCell(item.cels).font = {
            name: item.font.name,
            family:item.font.family,
            size: item.font.size,
            bold: item.font.bold
          };
        } else {
          worksheet.getCell(item.cels).font = {
            name: 'Arial',
            family:2,
            size: 11,
            bold: true
          };
        }

        //fills title
        if (item.fills) {
          worksheet.getCell(item.cels).fill = {
            type: 'pattern',
            pattern:'darkVertical',
            fgColor:{argb:item.fills.color}
          };
        }

      })

      worksheet.mergeCells('A5', 'K5');
      worksheet.getCell("A5").value = "Outstanding (Sisa Pinjaman)" 
      worksheet.getCell("A5").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.getCell("A5").font = { name: 'Arial', family: 4, size: 11, bold: true };
      worksheet.getCell('A5').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      let str = typeof settingExcel[3] === 'undefined' ? "A9" : settingExcel[3].origin
      let getNumRow = str.substring(1, 3);
      let num = parseInt(getNumRow)
      console.log("DATA NUM",num)
      /*Column headers*/


      worksheet.getRow(num).values = headers
      worksheet.getRow(num).font = { name: 'Arial', family: 4, size: 11, bold: true }; 
      settingExcel[0].Cell.forEach(function(item, index) {
        worksheet.getCell(item+getNumRow).fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      }) 
      data.forEach(function(item, index) {
        if (index == 0) {
          let obj = Object.keys(item)
          let keys = []
          for (var i = 0; i < obj.length; i++) {
            keys.push({
              key: obj[i],
              width : i == 0 ? 10 : 30
            })
          }
          worksheet.columns = keys
        }
      })
 
       data.forEach(function(item, index) {
        console.log("DATA ITEM",item)
        if(item.Name == 'Region 1' || item.Name == 'Region 2' || item.Name == 'RU' || item.Name == 'KANTOR PUSAT' || item.Name == 'Total Sinergi ' || item.Name == 'Total Perorangan '){ 
           worksheet.addRow(item).font = { name: 'Arial', family: 4, size: 11, bold: true }; 
        }else{ 
          worksheet.addRow(item).alignment = { vertical: 'bottom', horizontal: 'right' }; 
        }
      })

      if (typeof settingExcel[4] != 'undefined') {
        settingExcel[4].position.forEach(function(data, indexRow) {
          console.log(indexRow,data)
          if (data.left) {
            worksheet.getColumn(data.colums).alignment = { vertical: 'top', horizontal: 'left' };
          }else if (data.right) {
            worksheet.getColumn(data.colums).alignment = { vertical: 'bottom', horizontal: 'right' };
          }else {
            worksheet.getColumn(data.colums).alignment = { vertical: 'middle', horizontal: 'center' };
          }
        })
      }

         worksheet.getRow(num - 1).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getRow(num).alignment = { vertical: 'middle', horizontal: 'center' };



      let getLastCell = data.length - 1 + (num + 1) 
      worksheet.mergeCells('A'+getLastCell, settingExcel[2].mergeTo+getLastCell);

      worksheet.getCell("A"+getLastCell).alignment = { vertical: 'middle', horizontal: 'center' };
      settingExcel[0].Cell.forEach(function(item, index) {
          worksheet.getCell(item+getLastCell).fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
          worksheet.getCell(item+getLastCell).font = { name: 'Arial', family: 4, size: 11, bold: true };
      })
 
      workbook.xlsx.writeBuffer()
        .then(buffer => FileSaver.saveAs(new Blob([buffer]), filename + `.xlsx`))
        .catch(err => console.log('Error writing excel export', err))
    }

  },

}
</script>

<style lang="css" scoped>

</style>
