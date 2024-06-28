<template>
<div  class="">
  <div class="card">
    <div class="card-body"> 
      <div id="kontenData">
      <div class="imglogo">
        <div class="row">
            <table width="100%">
              <tr>
                <td align="right">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABICAYAAABMb8iNAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcxQTBGQ0E3Qjk1NjExRTdBMUMzQjhEMTE4NzdFNkRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcxQTBGQ0E4Qjk1NjExRTdBMUMzQjhEMTE4NzdFNkRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzFBMEZDQTVCOTU2MTFFN0ExQzNCOEQxMTg3N0U2REMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzFBMEZDQTZCOTU2MTFFN0ExQzNCOEQxMTg3N0U2REMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94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" style="padding-top:5px;">                
                </td>
              </tr>
            </table>
        </div>
      </div>
			<p>{{pengaturan.Cabang}},{{formatDateDMY(new Date())}}</p>
		   <table width="100%">
		   	<tr>
		   		<td>Nomor : </td>
		   		<td>{{pengaturan.Nomor}}</td>
		   	</tr>
		   	<tr>
		   		<td>Perihal : </td>
		   		<td>Konfirmasi Piutang</td>
		   	</tr>
		   </table>
		   	<p style="padding-top: 30px">
			   	Kepada Yth :<br>
			 	{{DebitAccount.DANumber}}<br>
			 	Sdr/i {{Debitor.FullName}}<br>
			 	{{Debitor.Address}} ,
		 	</p>
		 	<p style="padding-top: 30px">
		 		Memperhatikan Surat Perjanjian Pinjaman Uang Saudara {{DebitAccount.ContractNum}} tanggal {{formatDateDMY(DebitAccount.ContractDate)}} dengan PKBL / CSR &amp; SME Partnership Program PT. PERTAMINA
				(PERSERO) {{pengaturan.Cabang}}, bersama ini kami informasikan kepada Saudara/i
				sebagai berikut :
		 	</p>
		 	<table width="100%" >
		 		<tr>
		 			<td width="40%"></td>
		 			<td>Pokok</td>
		 			<td>Jasa</td>
		 			<td>Jumlah</td>
		 		</tr>
		 		<tr>
		 			<td>Jumlah Pinjaman</td>
		 			<td>Rp. {{debitAccountSummary.DebValue}}</td>
		 			<td>Rp. {{debitAccountSummary.InterestValue}}</td>
		 			<td>Rp. {{debitAccountSummary.TotalPinjaman}}</td>
		 		</tr>
		 		<tr>
		 			<td>Pinjaman Yang Telah Dibayarkan (Nilai Per closing)</td>
		 			<td>Rp. {{debitAccountSummary.LoanPaid}}</td>
		 			<td>Rp. {{debitAccountSummary.InterestPaid}}</td>
		 			<td>Rp. {{debitAccountSummary.TotalPaid}}</td>
		 		</tr>
		 		<tr>
		 			<td>Sisa Pinjaman</td>
		 			<td>Rp. {{debitAccountSummary.SisaPokok}}</td>
		 			<td>Rp. {{debitAccountSummary.SisaJasa}}</td>
		 			<td>Rp. {{debitAccountSummary.SisaTotal}}</td>
		 		</tr>
		 	</table>
		 	<p style="padding-top: 30px">
		 		Menurut catatan kami, sampai dengan tanggal {{formatDateDMY(pengaturan.TanggalClosing)}}, Saudara/i telah melakukan pembayaran terakhir pada tanggal {{formatDateDMY(debitAccountSummary.ClosingDate )}}, dan kewajiban yang harus Saudara/i bayarkan adalah :
		 	</p>
		 	<table width="100%">
		 		<tr>
		 			<td  width="25%">Tunggakan Pokok (nilai dari closing)</td>
		 			<td>Rp. {{debitAccountSummary.LoanOutstanding}}</td>
		 		</tr>
		 		<tr>
		 			<td>Tunggakan Jasa (nilai dari closing)</td>
		 			<td>Rp. {{debitAccountSummary.InterestOutstanding}}</td>
		 		</tr>
		 		<tr>
		 			<td>Total Tunggakan (nilai dari closing)</td>
		 			<td>Rp. {{debitAccountSummary.TotalOutstanding}}</td>
		 		</tr>
		 	</table>
		 	<p style="padding-top: 30px">
		 		Diharap Saudara/i segera membayar tunggakan tersebut pada No. Rekening<br>
				{{Debitor.Cabang}}
		 	</p>
		 	<p style="padding-top: 10px">
		 		atas nama :<br>
		 		<ol type="1">
				  <li v-for="(item, index) in BankItems">
				    {{ item.name }}
				  </li>
				</ol>
		 	</p>
		 	<p>
		 		dalam satu lembar bukti setorannya dikirimkan kepada PKBL / CSR &amp; SME Partnership
				Program PT PERTAMINA (PERSERO)  {{pengaturan.Cabang}}  {{pengaturan.Alamat}} selambat-lambatnya 2 Minggu setelah Surat ini diterima.
		 	</p>
		 	<p>
		 		Sekiranya jumlah yang tertera di atas tidak sesuai dengan bukti setor yang ada pada Saudara/i agar segera memberikan informasi kepada kami disertai bukti-bukti penyetoran.
		 	</p>
		 	<p>
				Kami harapkan kerjasama Saudara/i untuk segera membayar tunggakan tersebut dan
				bilamana Saudara/i tidak melakukannya maka akan diselesaikan secara hukum. Demikianlah
				disampaikan, atas perhatiannya diucapkan terima kasih
		 	</p>
		 	<p>
		 		{{pengaturan.Jabatan}}
		 	</p>
		 	<p style="padding-top: 20px">
		 		{{pengaturan.NamaPejabat}}
		 	</p>
		 	<p style="padding-top: 10px">
		 		KONFIRMASI HUTANG<br>
				Kepada <br>
				Kantor Pertamina Pertamina {{pengaturan.Cabang}} <br>
		 	</p>
		 	<p style="padding-top: 30px">
		 		Menurut catatan PKBL / CSR &amp; SME Partnership Program PT PERTAMINA (PERSERO) ,
				saldo hutang Kami ({{DebitAccount.DANumber}} /{{Debitor.FullName}}) per Tanggal Closing adalah sebesar Rp {{debitAccountSummary.TotalOutstanding}}, Menurut Kami saldo tersebut adalah : Sesuai / Tidak Sesuai (Coret yang tidak perlu) Penjelasan : (Bila tidak sesuai) ...................................................................................................
				..........................................................................................................................................
		 	</p>
		 	<p>
		 		<b>Mitra Binaan</b><br><br><br>

				{{Debitor.FullName}}/{{DebitAccount.DANumber}}
		 	</p>
    	</div>
    </div>
  </div>
	<div id="editor"></div>
</div>
</template>
<script>
import jsPDF from 'jspdf'
import $ from 'JQuery'
import 'jspdf-autotable';
import apiDebitAccount from '@/api/PK/DebitAccountApiService';
import apiDebitor from '@/api/PK/DebitorApiService';
import apiWorkArea1 from '@/api/WorkArea1ApiService';
import account from '@/api/AKAccountApiService';
import apiDebitAccountSummary from '@/api/PK/DebitAccountSummaryApiService';
export default {
  	data() {
	    return {
	    	loading:true,
	    	pengaturan:{},
	    	Debitor:{},
	    	DebitAccount:{},
	    	debitAccountSummary:{},
	    	BankItems:[]
	    }
	},
  	async created() {

  		// console.log("DATA",await this.$route.query.konfirmasi)
  	},
  	async	mounted() {
  		this.pengaturan = await this.$route.query.konfirmasi
  		if(this.$route.query.konfirmasi.DACode){
	           var  JumDebValue = 0
	          var  JumInterestValue = 0
	          var  JumTotalPinjaman = 0

        	var  JumLoanPaid = 0
        	var  JumInterestPaid = 0
        	var  JumTotalPaid = 0


        	var  JumInterestOutstanding = 0
        	var  JumLoanOutstanding = 0
        	var  JumTotalOutstanding = 0
  			 var getDebitAccountSummary = await apiDebitAccountSummary.getByCode(this.$route.query.konfirmasi.DACode)
  			 console.log("DASUMARY",getDebitAccountSummary)
  			  if(getDebitAccountSummary.Data[0]){
		          this.debitAccountSummary = getDebitAccountSummary.Data[0]
		          if(this.debitAccountSummary.DebValue){
	          		JumDebValue = this.debitAccountSummary.DebValue
		          	this.debitAccountSummary.DebValue = this.formatCurrency(JumDebValue)
		          }
		          if(this.debitAccountSummary.InterestValue){
		          	JumInterestValue = this.debitAccountSummary.InterestValue
		          	this.debitAccountSummary.InterestValue = this.formatCurrency(JumInterestValue)
		          }
		          	JumTotalPinjaman = JumDebValue + JumInterestValue
		          this.debitAccountSummary.TotalPinjaman = this.formatCurrency(JumTotalPinjaman)

		         if(this.debitAccountSummary.LoanPaid){
		          	JumLoanPaid =  this.debitAccountSummary.LoanPaid
		          	this.debitAccountSummary.LoanPaid = this.formatCurrency(JumLoanPaid)
		          }
		          if(this.debitAccountSummary.InterestPaid){
		          	JumInterestPaid =  this.debitAccountSummary.InterestPaid
		          	this.debitAccountSummary.InterestPaid = this.formatCurrency(JumInterestPaid)
		          }
		          if(this.debitAccountSummary.TotalPaid){
		          	JumTotalPaid =  this.debitAccountSummary.TotalPaid
		          	this.debitAccountSummary.TotalPaid = this.formatCurrency(JumTotalPaid)
		          }

		          this.debitAccountSummary.SisaPokok = this.formatCurrency(JumDebValue - JumLoanPaid)

		          this.debitAccountSummary.SisaJasa = this.formatCurrency(JumInterestValue - JumInterestPaid)

		          this.debitAccountSummary.SisaTotal = this.formatCurrency(JumTotalPinjaman - JumTotalPaid)

		          if(this.debitAccountSummary.InterestOutstanding){
		          	JumInterestOutstanding = this.debitAccountSummary.InterestOutstanding
		          	this.debitAccountSummary.InterestOutstanding = this.formatCurrency(JumInterestOutstanding)
		          }
		          if(this.debitAccountSummary.LoanOutstanding){
		          	JumLoanOutstanding = this.debitAccountSummary.LoanOutstanding
		          	this.debitAccountSummary.LoanOutstanding = this.formatCurrency(JumLoanOutstanding)
		          }
		           if(this.debitAccountSummary.TotalOutstanding){
		           		JumTotalOutstanding = this.debitAccountSummary.TotalOutstanding
	          			this.debitAccountSummary.TotalOutstanding = this.formatCurrency(JumTotalOutstanding)
		           }

		      }

  			var dataDA = await apiDebitAccount.getOne(this.$route.query.konfirmasi.DACode)
  			this.DebitAccount = dataDA.Data[0]
  			if(dataDA.Data[0].DebCode){
  				var dataDEB = await apiDebitor.getOne(dataDA.Data[0].DebCode)
  				this.Debitor = dataDEB.Data[0]
			  	var Alamat = ""
		        var Provinsi = ""
		        var Kabupaten = ""
		        var Kecamatan = ""
		        var Kelurahan = ""
		         if(dataDEB.Data[0].Address){
		          Alamat = dataDEB.Data[0].Address
		        }
		        if(dataDEB.Data[0].Prov_code){
		          Provinsi = dataDEB.Data[0].Prov_code
		        }
		        if(dataDEB.Data[0].Dist_code){
		          Kabupaten = dataDEB.Data[0].Dist_code
		        }
		        if(dataDEB.Data[0].Subdis_code){
		          Kecamatan = dataDEB.Data[0].Subdis_code
		        }
		        if(dataDEB.Data[0].Village_code){
		          Kelurahan = dataDEB.Data[0].Village_code
		        }
		        this.Debitor.Address = Alamat + ", " + Kelurahan + ", " + Kecamatan + ", " + Kabupaten + ", " + Provinsi
		        if(dataDEB.Data[0].WACode){
		        	console.log("DATA MAAMN 0",dataDEB.Data[0].WACode)
		         	var CabangDeb = await apiWorkArea1.getByCode(dataDEB.Data[0].WACode)
			      console.log("DATA MAAMN 1",CabangDeb)
		         	this.Debitor.Cabang = CabangDeb[0].Name
		        await this.getCOABank(dataDEB.Data[0].WACode)
			      console.log("DATA MAAMN",this.BankItems)
		        }
  			}
  		}
  			 var meta= "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>";
            //  _styles_ will be replaced with custome css
			var head= "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n";
			//  _body_ will be replaced with custome body html
            var body= "<body>_body_</body>";
			var html = document.getElementById('kontenData').innerHTML ;

            var blob = new Blob(['\ufeff', html], {
                type: 'application/msword'
            });
			var  css = (
                   '<style>' +
                   'img {width:50px;}' +
				   '</style>'
                  );
//  Image Area %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
			var options = { maxWidth: 624};
			var images = Array();
			var img = $("#"+'kontenData').find("img");
			for (var i = 0; i < img.length; i++) {
				// Calculate dimensions of output image
				var w = Math.min(img[i].width, options.maxWidth);
				var h = img[i].height * (w / img[i].width);
				// Create canvas for converting image to data URL
				var canvas = document.createElement("CANVAS");
				canvas.width = w;
				canvas.height = h;
				// Draw image to canvas
				var context = canvas.getContext('2d');
				context.drawImage(img[i], 0, 0, w, h);
				// Get data URL encoding of image
				var uri = canvas.toDataURL("image/png");
				$(img[i]).attr("src", img[i].src);
				img[i].width = w;
				img[i].height = h;
				// Save encoded image to array
				images[i] = {
					type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
					encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
					location: $(img[i]).attr("src"),
					data: uri.substring(uri.indexOf(",") + 1)
				};
			}

			// Prepare bottom of mhtml file with image data
			var imgMetaData = "\n";
			for (var i = 0; i < images.length; i++) {
				imgMetaData += "--NEXT.ITEM-BOUNDARY\n";
				imgMetaData += "Content-Location: " + images[i].location + "\n";
				imgMetaData += "Content-Type: " + images[i].type + "\n";
				imgMetaData += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
				imgMetaData += images[i].data + "\n\n";
			}
			imgMetaData += "--NEXT.ITEM-BOUNDARY--";
// end Image Area %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
			 var output = meta.replace("_html_", head.replace("_styles_", css) + body.replace("_body_", html)) + imgMetaData;
            var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(output);
           var filename = 'document.doc';
            var downloadLink = document.createElement("a");
            document.body.appendChild(downloadLink);
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                downloadLink.href = url;
                downloadLink.download = filename;
                downloadLink.click();
            }
            document.body.removeChild(downloadLink);
    },
  	methods: {
      async getCOABank(WACode){
          var getBank = await account.getByTypeWorkareaAndFlag(30,WACode)
            console.log("DATA MAAMN 2",getBank)
           for (var i = 0; i < getBank.length; i++) {
              this.BankItems.push({ name:getBank[i].Code +" - "+ getBank[i].Name })
            }
      }
  	}

}
</script>
