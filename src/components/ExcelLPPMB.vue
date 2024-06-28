<template>
<div class="">
  <div class="text-center">
    <button class="btn btn-outline-success my-2 my-sm-0" @click="exportToExcel(items, header, sheetName, filename, titles)">
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
      default: () => []
    },
    // styles: {
    //   type: [Array, Object],
    //   required: false,
    //   default: () => [{
    //     cels : 'A9',
    //     name: 'Comic Sans MS',
    //     family: 4,
    //     size: 8,
    //     underline: true,
    //     bold: true
    //   },{
    //     cels : 'A11',
    //     name: 'Comic Sans MS',
    //     family: 4,
    //     size: 8,
    //     underline: true,
    //     bold: true
    //   }]
    // },
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
    exportToExcel: function(data, headers, sheetName, filename, titles) {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet(sheetName);

      /*TITLE*/
      titles.forEach(function(item, index) {
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
            pattern:'solid',
            fgColor:{argb:item.fills.color}
          };
        }

      })

      /*Column headers*/
      worksheet.mergeCells('A6', 'O6');
      worksheet.getCell("A6").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.mergeCells('P6', 'R6');
      worksheet.getCell("P6").value = "Pengembalian Pinjaman"
      worksheet.getCell('P6').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell("P6").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.getCell("P6").font = { name: 'Arial', family: 4, size: 11, bold: true };
      worksheet.getCell('P6').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
      //
      worksheet.mergeCells('S6', 'V6');
      worksheet.getCell("S6").value = "Tunggakan"
      worksheet.getCell('S6').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell("S6").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.getCell("S6").font = { name: 'Arial', family: 4, size: 11, bold: true };
      worksheet.getCell('S6').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
      //
      worksheet.mergeCells('W6', 'AJ6');
      worksheet.getCell("W6").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.mergeCells('AK6', 'AN6');
      worksheet.getCell("AK6").value = "Nominal Terakhir Bayar"
      worksheet.getCell('AK6').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell("AK6").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      worksheet.getCell("AK6").font = { name: 'Arial', family: 4, size: 11, bold: true };
      worksheet.getCell('AK6').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
      worksheet.mergeCells('AO6', 'AP6');
      worksheet.getCell("AO6").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
      //
      // worksheet.getRow(9).values = ['No', 'Nomor Mitra', 'Nama', 'Nama Usaha','Alamat','Provinsi','Kota/Kabupaten','No.Telp/HP','Agunan','Jumlah Pinjaman','Nilai Jasa','Jangka Waktu','Tanggal Penyaluran','Tanggal Jatuh Tempo','Jumlah Jasa Jatuh Tempo','Pokok','Jasa Adm','Jumlah','Pokok','Jasa Adm','Jumlah'
      // ,'Hari','Sisa Pinjaman','Penyisihan','Kelebihan','STS','Sektor','Region','Sinergi','Kriteria','Catatan','Alamat Baru','Pola Penyaluran','Grace Period','Tanggal Terakhir Bayar','Pembayaran Terakhir Ke','Pokok','Jasa Adm','Lebih Bayar','Jumlah','Cabang Provinsi','Detail Jatuh Tempo'];
      worksheet.getRow(7).values = headers
      worksheet.getRow(7).font = { name: 'Arial', family: 4, size: 11, bold: true };
      let cel1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X'
      ,'Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP']
      cel1.forEach(function(item, index) {
        worksheet.getCell(item+"7").fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
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
              width : i == 0 ? 10 : 20
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
      let position = [
            {
              colums : 1,
              left : true
            },
            {
              colums : 2,
              left : true
            },
            {
              colums : 3,
              left : true
            },
            {
              colums : 4,
              left : true
            },
            {
              colums : 5,
              left : true
            },
            {
              colums : 6,
              left : true
            },
            {
              colums : 7,
              left : true
            },
            {
              colums : 8,
              left : true
            },
            {
              colums : 9,
              left : true
            },
            {
              colums : 12,
              center : true
            },
            {
              colums : 13,
              left : true
            },
            {
              colums : 14,
              left : true
            },
            {
              colums : 25,
              left : true
            },
            {
              colums : 26,
              left : true
            },
            {
              colums : 27,
              left : true
            },
            {
              colums : 28,
              left : true
            },
            {
              colums : 29,
              left : true
            },
            {
              colums : 30,
              left : true
            },
            {
              colums : 31,
              left : true
            },
            {
              colums : 32,
              left : true
            },
            {
              colums : 33,
              left : true
            },
            {
              colums : 34,
              left : true
            },
            {
              colums : 35,
              left : true
            },
            {
              colums : 41,
              left : true
            },
            {
              colums : 42,
              left : true
            },
          ]


          if (typeof position != 'undefined' || position) {
            position.forEach(function(data, indexRow) {
              if (data.left) {
                worksheet.getColumn(data.colums).alignment = { vertical: 'top', horizontal: 'left' };
              }else if (data.right) {
                worksheet.getColumn(data.colums).alignment = { vertical: 'bottom', horizontal: 'right' };
              }else {
                worksheet.getColumn(data.colums).alignment = { vertical: 'middle', horizontal: 'center' };
              }
            })
          }


          worksheet.getRow(7).alignment = { vertical: 'middle', horizontal: 'center' };
          worksheet.getRow(8).alignment = { vertical: 'middle', horizontal: 'center' };

      let getLastCell = data.length - 1 + 8
      let btmCell = ['A'+getLastCell, 'J'+getLastCell,'K'+getLastCell,'L'+getLastCell,'M'+getLastCell,'N'+getLastCell,'O'+getLastCell,'P'+getLastCell,'Q'+getLastCell,'R'+getLastCell,'S'+getLastCell,'T'+getLastCell,'U'+getLastCell,
      'V'+getLastCell, 'W'+getLastCell, 'X'+getLastCell, 'Y'+getLastCell, 'Z'+getLastCell, 'AA'+getLastCell,'AB'+getLastCell,'AC'+getLastCell, 'AD'+getLastCell, 'AE'+getLastCell, 'AF'+getLastCell, 'AG'+getLastCell, 'AH'+getLastCell, 'AI'+getLastCell, 'AJ'+getLastCell,
      'AK'+getLastCell, 'AL'+getLastCell,'AM'+getLastCell, 'AN'+getLastCell, 'AO'+getLastCell, 'AP'+getLastCell]
      worksheet.mergeCells('A'+getLastCell, 'I'+getLastCell);

      worksheet.getCell("A"+getLastCell).alignment = { vertical: 'middle', horizontal: 'center' };
      btmCell.forEach(function(item, index) {
          worksheet.getCell(item).fill = { type: 'pattern', pattern:'solid', fgColor:{argb:'6495ED'} };
          worksheet.getCell(item).font = { name: 'Arial', family: 4, size: 11, bold: true };
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
