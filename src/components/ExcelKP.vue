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
        if (item.mergeTo) {
          worksheet.mergeCells(item.cels, item.mergeTo);
        }

        worksheet.getCell(item.cels).value = item.name

        worksheet.getCell(item.values.cels).value = item.values.name
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

      worksheet.mergeCells('A8', 'E8');
      worksheet.getCell("A8").value = "Kewajiban"
      worksheet.getCell('A8').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell("A8").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.getCell("A8").font = { name: 'Arial', family: 4, size: 11, bold: true };
      worksheet.getCell('A8').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      worksheet.mergeCells('F8', 'K8');
      worksheet.getCell("F8").value = "Pembayaran"
      worksheet.getCell('F8').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell("F8").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.getCell("F8").font = { name: 'Arial', family: 4, size: 11, bold: true };
      worksheet.getCell('F8').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      worksheet.mergeCells('L8', 'N8');
      worksheet.getCell("L8").value = "Sisa Pembayaran"
      worksheet.getCell('L8').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell("L8").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.getCell("L8").font = { name: 'Arial', family: 4, size: 11, bold: true };
      worksheet.getCell('L8').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
      //

      // let str = typeof settingExcel[3] === 'undefined' ? "A9" : settingExcel[3].origin
      // let getNumRow = str.substring(1, 3);
      // let num = parseInt(getNumRow)

      /*Column headers*/


      worksheet.getRow(9).values = headers
      worksheet.getRow(9).font = { name: 'Arial', family: 4, size: 11, bold: true };
      // let cel1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X'
      // ,'Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP']
      settingExcel[0].Cell.forEach(function(item, index) {
        worksheet.getCell(item+'9').fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      })

      // worksheet.getRow(10).values = ['', '2', '3', '4','5','6','7','8','9','11','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','36','33','37','38','39','40','41','42','43','44','45'];

      /*Define your column keys because this is what you use to insert your data
      according to your columns, they're column A, B, C, D respectively being idClient, Name, Tel, and Adresse.
      So, it's pretty straight forward */
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

//       styles.forEach(function(item, index) {
//         worksheet.getCell(item.cels).font = {
//     name: item.name,
//     family: item.family,
//     size: item.size,
//     underline: item.underline,
//     bold: item.bold
//   }
// })



      /* Now we use the keys we defined earlier to insert your data by iterating through arrData
      and calling worksheet.addRow()
      */
      data.forEach(function(item, index) {
        worksheet.addRow(item).alignment = { vertical: 'bottom', horizontal: 'right' };
      })

       if (typeof settingExcel[4] != 'undefined') {
        settingExcel[4].position.forEach(function(data, indexRow) {
          if (data.left) {
            worksheet.getColumn(data.colums).alignment = { vertical: 'top', horizontal: 'left' };
          }else if (data.right) {
            worksheet.getColumn(data.colums).alignment = { vertical: 'bottom', horizontal: 'right' };
          }else {
            worksheet.getColumn(data.colums).alignment = { vertical: 'middle', horizontal: 'center' };
          }
        })
      }


      let getLastCell = data.length - 1 + 10
      // let btmCell = ['A'+getLastCell, 'J'+getLastCell,'K'+getLastCell,'L'+getLastCell,'M'+getLastCell,'N'+getLastCell,'O'+getLastCell,'P'+getLastCell,'Q'+getLastCell,'R'+getLastCell,'S'+getLastCell,'T'+getLastCell,'U'+getLastCell,
      // 'V'+getLastCell, 'W'+getLastCell, 'X'+getLastCell, 'Y'+getLastCell, 'Z'+getLastCell, 'AA'+getLastCell,'AB'+getLastCell,'AC'+getLastCell, 'AD'+getLastCell, 'AE'+getLastCell, 'AF'+getLastCell, 'AG'+getLastCell, 'AH'+getLastCell, 'AI'+getLastCell, 'AJ'+getLastCell,
      // 'AK'+getLastCell, 'AL'+getLastCell,'AM'+getLastCell, 'AN'+getLastCell, 'AO'+getLastCell, 'AP'+getLastCell]
      worksheet.mergeCells('A'+getLastCell, settingExcel[2].mergeTo+getLastCell);

      worksheet.getCell("A"+getLastCell).alignment = { vertical: 'middle', horizontal: 'center' };
      settingExcel[0].Cell.forEach(function(item, index) {
          worksheet.getCell(item+getLastCell).fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
          worksheet.getCell(item+getLastCell).font = { name: 'Arial', family: 4, size: 11, bold: true };
      })

      // console.log("aarr", data.length );

      // save under export.xlsx
      // workbook.xlsx.writeFile('export.xlsx');
      workbook.xlsx.writeBuffer()
        .then(buffer => FileSaver.saveAs(new Blob([buffer]), filename + `.xlsx`))
        .catch(err => console.log('Error writing excel export', err))
    }

  },

}
</script>

<style lang="css" scoped>

</style>
