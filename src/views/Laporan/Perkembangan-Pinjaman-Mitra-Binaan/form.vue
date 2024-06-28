<style media="screen">
tr th {
  /*width:1%;*/
  white-space: nowrap;
}

.positionRight {
  text-align: right;
}

.positionLeft {
  text-align: left !important;
}
</style>
<template>
<div class="animated fadeIn">
  <b-row v-if="loading">
    <b-col sm="12">
      <b-card>
        <b-spinner label="Spinning"></b-spinner>
        Loading
      </b-card>
    </b-col>
  </b-row>
  <b-row v-if="!loading">
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Laporan Perkembangan Pinjaman Mitra Binaan</strong>
        </div>
        <div class="form-group form-actions">
          <!-- <form> -->
          <div class="row">
            <div class="col">
              <label for="inputEmail4">Periode Salur</label>
              <date-picker v-model="sortir.dari" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
              <!-- <input type="date" v-model="sortir.dari" class="form-control" placeholder=""> -->
            </div>
            <div class="col">
              <label for="inputEmail4">Sampai</label>
              <date-picker v-model="sortir.hingga" :input-attr="{ required: false }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
              <!-- <input type="date" v-model="sortir.hingga" class="form-control" placeholder=""> -->
            </div>
            <div class="col">
              <label for="inputEmail4">Bermasalah</label>
              <b-form-select v-model="sortir.bermasalah" :options="options_bermasalah"></b-form-select>
              <!-- <v-select placeholder="--SEMUA--" :options="options"/> -->
            </div>
            <div class="col">
                          <label for="inputEmail4">Periode Kualitas Per</label>
                           <b-form-select  v-model="sortir.Month" :options="options_Month" required></b-form-select>
                        </div>
                        <div class="col" style="padding-top: 27px;">
                           <b-form-select  v-model="sortir.Year" :options="options_Year" required></b-form-select>
                        </div>
            <!-- <div class="col" >
                          <label for="inputEmail4">Posting Jurnal</label>
                          <v-select placeholder="--SEMUA--" :options="options"/>
                        </div> -->
            <!-- <div class="col" >
                          <label for="inputEmail4">Sumber Dana</label>
                          <v-select placeholder="--SEMUA--" :options="options"/>
                        </div> -->

          </div>
          <!-- </form> -->
        </div>

        <div class="form-group form-actions">
          <form>
            <div class="row">
              <div class="col">
                <label for="inputEmail4">Kualitas Pinjaman : </label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadios" v-model="sortir.Kualitas" id="exampleRadios1"  checked>
                  <label class="form-check-label" for="Lancar">
                    Semua
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadios" v-model="sortir.Kualitas" id="exampleRadios1" value="Lancar" checked>
                  <label class="form-check-label" for="Lancar">
                    Lancar
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadios" v-model="sortir.Kualitas" id="exampleRadios1" value="Kurang Lancar">
                  <label class="form-check-label" for="exampleRadios1">
                    Kurang Lancar
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadios" v-model="sortir.Kualitas" id="exampleRadios1" value="Diragukan">
                  <label class="form-check-label" for="exampleRadios1">
                    Diragukan
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadios" v-model="sortir.Kualitas" id="exampleRadios1" value="Macet">
                  <label class="form-check-label" for="exampleRadios1">
                    Macet
                  </label>
                </div>
              </div>
              <!--  <div class="col">
                          <label for="inputEmail4">Sort By : </label>
                          <div class="form-check">
                              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                              <label class="form-check-label" for="exampleRadios1">
                                Lancar
                              </label>
                            </div>
                        </div> -->
            </div>
          </form>
        </div>
        <div class="form-group form-actions">
          <form>
            <div class="row">
            <div class="col">
              <label for="inputEmail4">Sektor</label>
              <b-form-select v-model="sortir.Sektor" :options="options_sector"></b-form-select>
              <!-- <v-select placeholder="Sektor Jasa" :options="options"/> -->
            </div>
            <div class="col">
              <label for="inputEmail4">Cabang</label>
              <b-form-select v-model="sortir.Cabang" :options="options_cabang"></b-form-select>
            </div>
              <div class="col">
                <label for="inputEmail4">Lunas</label>
                <b-form-select v-model="sortir.Lunas" :options="options_lunas"></b-form-select>
              </div>
              <div class="col">
                <label for="inputEmail4">Provinsi</label>
                <b-form-select v-model="sortir.Provinsi" :options="options_province"></b-form-select>
              </div>
              <div class="col">
                <label for="inputEmail4">Sort By</label>
                <b-form-select v-model="sortir.Sort" :options="options_sort"></b-form-select>
              </div>
              <div class="col">
                <label for="inputEmail4"><br></label>
                <b-form-select v-model="sortir.By" :options="options_By"></b-form-select>
              </div>
            </div>
          </form>
        </div>
        <div class="form-group">
          <div class="col" style="padding-top: 27px;">
            <button class="btn btn-primary" v-on:click="cariLPPMB()">Filter</button>&nbsp;
            <button class="btn btn-primary" v-on:click="hapusLPPMB()">Bersihkan Filter</button>
          </div>
        </div>
        <b-col sm="12">
        </b-col>
        <br>
        <b-row>
          <!-- <excelLPPMB :items="itemsExcel" :header="headerExcel" :header1="headerExcel1" :header0="headerExcel0" :header2="headerExcel2" :header3="headerExcel3"  :header4="headerExcel4"  IDTable="TableLPPMB" sheetName="Laporan LPPMB" filename="Laporan LPPMB">
          </excelLPPMB> -->
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <ExcelLPPMB2 :items="itemsExcel" :header="headerExcel" :titles="headerTitles" sheetName="Laporan LPPMB" filename="Laporan LPPMB"></ExcelLPPMB2>
        </b-row>

        <br>
        <b-row>
          <b-col sm="12" style="overflow-x:auto;overflow-y:auto;">
            <b-table id="TableLPPMB" style="max-height:500px" :items="items" :fields="fields" striped bordered :sticky-header='true' responsive="sm" small :per-page="perPage" :current-page="currentPage" :tbody-tr-class="rowClass" :filter="filter" @filtered="onFiltered">
              <template v-slot:thead-top="data">
                <tr>
                  <th colspan="15"></th>
                  <th colspan="3">Pengembalian Pinjaman</th>
                  <th colspan="4">Tunggakan</th>
                  <th colspan="14"></th>
                  <th colspan="4">Nominal Terakhir Bayar</th>
                  <th colspan="2"></th>
                </tr>
              </template>
              <template slot="Cycle" slot-scope="data">
                <span v-if='data.item.no==null'>{{ data.item.Cycle }}</span>
                <span v-else>
                  {{ data.item.Cycle }} Bulan
                </span>
              </template>
              <template slot="DebValue" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.DebValue }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.DebValue) }}</p>
                </span>
              </template>
              <template slot="InterestValue" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.InterestValue }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.InterestValue) }}</p>
                </span>
              </template>
              <template slot="FinalPaymentDate" slot-scope="data">
                <span v-if='data.item.no==null'>{{ data.item.FinalPaymentDate }}</span>
                <span v-else>
                   {{ formatDateDMY(data.item.FinalPaymentDate)  }}
                </span>
              </template>
              <template slot="FinalDueDate" slot-scope="data">
                <span v-if='data.item.no==null'>{{ data.item.FinalDueDate }}</span>
                <span v-else>
                  {{ formatDateDMY(data.item.FinalDueDate) }}
                </span>
              </template>
              <template slot="InterestDueDate" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.InterestDueDate }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.InterestDueDate)  }}</p>
                </span>
              </template>
              <template slot="LoanPaid" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.LoanPaid }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.LoanPaid) }}</p>
                </span>
              </template>
              <template slot="InterestPaid" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.InterestPaid }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.InterestPaid) }}</p>
                </span>
              </template>
              <template slot="TotalPaid" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.TotalPaid }}</p>
                </span>
                <span v-else>
                  <p align="right"> {{ formatCurrency(data.item.TotalPaid) }}</p>
                </span>
              </template>
              <template slot="LoanOutstanding" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.LoanOutstanding }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.LoanOutstanding) }}</p>
                </span>
              </template>
              <template slot="InterestOutstanding" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.InterestOutstanding }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.InterestOutstanding) }}</p>
                </span>
              </template>
              <template slot="TotalOutstanding" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.TotalOutstanding }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.TotalOutstanding) }}</p>
                </span>
              </template>
              <template slot="TotalSisaPinjaman" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.TotalSisaPinjaman }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.TotalSisaPinjaman) }}</p>
                </span>
              </template>
              <template slot="AdvPaid" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.AdvPaid }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.AdvPaid) }}</p>
                </span>
              </template>
              <template slot="LastPaidDate" slot-scope="data">
                <span v-if='data.item.no==null || !data.item.LastPaidDate'>
                  <p align="right">{{ data.item.LastPaidDate }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatDateDMY(data.item.LastPaidDate) }}</p>
                </span>
              </template>
              <template slot="LastPaidLoan" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.LastPaidLoan }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.LastPaidLoan) }}</p>
                </span>
              </template>
              <template slot="LastPaidInterest" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.LastPaidInterest }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.LastPaidInterest) }}</p>
                </span>
              </template>
              <template slot="LebihBayar" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.LebihBayar }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.LebihBayar) }}</p>
                </span>
              </template>
              <template slot="LastTotalBill" slot-scope="data">
                <span v-if='data.item.no==null'>
                  <p align="right">{{ data.item.LastTotalBill }}</p>
                </span>
                <span v-else>
                  <p align="right">{{ formatCurrency(data.item.LastTotalBill) }}</p>
                </span>
              </template>

               <template slot="bottom-row" slot-scope="data">
                <td colspan="9">Total Keseluruhan</td>
                <td class="positionRight">{{DebValue}}</td>
                <td class="positionRight">{{InterestValue}}</td>
                <!-- <td  class="positionRight">{{DebValue}}</td> -->
                <td colspan="3" ></td>
                <td class="positionRight">{{InterestDueDate}}</td>
                <td class="positionRight">{{LoanPaid}}</td>
                <td class="positionRight">{{InterestPaid}}</td>
                <td class="positionRight">{{TotalPaid}}</td>
                <td class="positionRight">{{LoanOutstanding}}</td>
                <td class="positionRight">{{InterestOutstanding}}</td>
                <td class="positionRight">{{TotalOutstanding}}</td>
                <td ></td>
                <td class="positionRight">{{TotalSisaPinjaman}}</td>
                <td ></td>
                <td class="positionRight">{{AdvPaid}}</td>
                <td colspan="11" ></td>
                <td class="positionRight">{{LastPaidLoan}}</td>
                <td class="positionRight">{{LastPaidInterest}}</td>
                <td class="positionRight">{{LebihBayar}}</td>
                <td class="positionRight">{{LastTotalBill}}</td>
                <td colspan="2"></td>
              </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"></b-pagination>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</div>
</template><script>
  import {
    shuffleArray
  } from '@/shared/utils'
    import moment from 'moment';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService'
  import apiWorkArea1 from '@/api/WorkArea1ApiService'
  import apiProvinsi from '@/api/BPM/ProvinsiApiService'
  import apiPKSector from '@/api/PK/PKSectorApiService'
  import BtnExcel from '@/components/BtnExcel.vue'
  // import excelLPPMB from '@/components/ExcelLPPMB.vue'
  import ExcelLPPMB2 from '@/components/ExcelLPPMB'

  // const someData = () => await api.getAll()
  const headNumber = {no:null,DANumber:2,FullName:3,BusinessName:4,Address:5,Prov_code:6,
                      Dist_code:7,Hp1:8,CollateralType:9,DebValue:10,InterestValue:11,
                      Tenor:12,FinalPaymentDate:13,FinalDueDate:14,InterestDueDate:15,LoanPaid:16,InterestPaid:17,TotalPaid:18,LoanOutstanding:19,InterestOutstanding:20,
                      TotalOutstanding:21,Tanggal_Tunggakan:22,TotalSisaPinjaman:23,Penyisihan:24,AdvPaid:25,
                      sts:26,SectorName:27,WACode:28,SynergyCompany:29,Kriteria:30,Catatan:31,AlamatBaru:32,DistributionPattern:33,kriteria:34,catatan:35,AlamatBaru:36,
                      GracePeriod:37,LastPaidDate:38,LastPaidSeq:39,LastPaidLoan:40,LastPaidInterest:41,LebihBayar:42,
                      LastTotalBill:43,CabangProv:44,Cycle:45

                    }
  export default {
    name: 'DocumentDesaigner',
    components: {
      BtnExcel,
      // excelLPPMB,
      ExcelLPPMB2
    },
    data() { 
      return { 
        cabangKP : 9900,
        items: [

        ],
        fields: [
          'no',
          { key: 'DANumber', label: 'Nomor Mitra' },
          { key: 'FullName', label: 'Nama' },
          { key: 'BusinessName', label: 'Nama Usaha' },
          { key: 'Address', label: 'Alamat' },
          { key: 'Prov_code', label: 'Provinsi' },
          { key: 'Dist_code', label: 'Kota/Kabupaten' },
          { key: 'Hp1', label: 'No.Telp/Hp' },
          { key: 'CollateralType', label: 'Agunan' },
          { key: 'DebValue', label: 'Jumlah Pinjaman' },
          { key: 'InterestValue', label: 'Nilai Jasa' },
          { key: 'DebValue', label: 'Nilai Realisasi' },
          { key: 'Tenor', label: 'Jangka Waktu' },
          { key: 'FinalPaymentDate', label: 'Tanggal Penyaluran' },
          { key: 'FinalDueDate', label: 'Tanggal Jatuh Tempo' },
          { key: 'InterestDueDate', label: 'Jumlah Jasa Jatuh Tempo' },
          { key: 'LoanPaid', label: 'Pokok' },
          { key: 'InterestPaid', label: 'Jasa Adm' },
          { key: 'TotalPaid', label: 'Jumlah' },
          { key: 'LoanOutstanding', label: 'Pokok' },
          { key: 'InterestOutstanding', label: 'Jasa Adm' },
          { key: 'TotalOutstanding', label: 'Jumlah' },
          { key: 'Tanggal_Tunggakan', label: 'Hari' },
          { key: 'TotalSisaPinjaman', label: 'Sisa Pinjaman' },
          { key: 'Penyisihan', label: 'Penyisihan' },
          { key: 'AdvPaid', label: 'Kelebihan' },
          { key: 'sts', label: 'STS' },
          { key: 'SectorName', label: 'Sektor' },
          { key: 'WACode', label: 'Region' },
          { key: 'SynergyCompany', label: 'Sinergi' },
          { key: 'Kriteria', label: 'Kriteria' },
          { key: 'Catatan', label: 'Catatan' },
          { key: 'AlamatBaru', label: 'Alamat Baru' },
          { key: 'DistributionPattern', label: 'Pola Penyaluran' },
          { key: 'GracePeriod', label: 'Grace Periode' },
          { key: 'LastPaidDate', label: 'Tanggal Terakhir Bayar' },
          { key: 'LastPaidSeq', label: 'Pembayaran Terakhir Ke' },
          { key: 'LastPaidLoan', label: 'Pokok' },
          { key: 'LastPaidInterest', label: 'Jasa Adm' },
          { key: 'LebihBayar', label: 'Lebih Bayar' },
          { key: 'LastTotalBill', label: 'Jumlah' },
          { key: 'CabangProv', label: 'Cabang Provinsi' },
          { key: 'Cycle', label: 'Detail Jatuh Tempo' },

        ],
        // headerExcel0:["Laporan Perkembangan"],
        headerExcel:[
          "No",
          "Nomor Mitra",
          "Nama",
          "Nama Usaha",
          "Alamat",
          "Provinsi",
          "Kota/Kabupaten",
          "No.Telp/HP",
          "Agunan",
          "Jumlah Pinjaman",
          "Nilai Jasa",
          "Jangka Waktu",
          "Tanggal Penyaluran",
          "Tanggal Jatuh Tempo",
          "Jumlah Jasa Jatuh Tempo",
          "Pokok",
          "Jasa Adm",
          "Jumlah",
          "Pokok",
          "Jasa Adm",
          "Jumlah",
          "Hari",
          "Sisa Pinjaman",
          "Penyisihan",
          "Kelebihan",
          "STS",
          "Sektor",
          "Region",
          "Sinergi",
          "Kriteria",
          "Catatan",
          "Alamat Baru",
          "Pola Penyaluran",
          "Grace Period",
          "Tanggal Terakhir Bayar",
          "Pembayaran Terakhir Ke",
          "Pokok",
          "Jasa Adm",
          "Lebih Bayar",
          "Jumlah",
          "Cabang Provinsi",
          "Detail Jatuh Tempo",
        ],
        headerTitles :[],
        // headerExcel1:[],
        // headerExcel2:[],
        // headerExcel3:[],
        // headerExcel4:[],
        itemsExcel:[],
        itemsArray: null,
        data: [],
        i:0,
        perPage: 11,
        currentPage: 1,
        options: [],
        filter:null,
        options_Month:[],
        options_Year:[],
        options_cabang:[],
        options_province:[],
        options_sector:[],
        options_sort:[
          { text:"--- Semua ---",value:null},
          { value: 'DebitAccount.DANumber', text: 'Nomor Mitra' },
          { value: 'Debitor.FullName', text: 'Nama' },
          { value: 'DebitorVenture.BusinessName', text: 'Nama Usaha' },
          { value: 'Debitor.Address', text: 'Alamat' },
          { value: 'Debitor.Prov_code', text: 'Provinsi' },
          { value: 'Debitor.Dist_code', text: 'Kota/Kabupaten' },
          { value: 'Debitor.Hp1', text: 'No.Telp/Hp' },
          { value: 'DebitorCollaterall.CollateralType', text: 'Agunan' },
          { value: 'DebitAccount.DebValue', text: 'Jumlah Pinjaman', tdClass: 'positionRight' },
          { value: 'DebitAccountSummary.InterestValue', text: 'Nilai Jasa', tdClass: 'positionRight' },
          { value: 'DebitAccountSummary.DebValue', text: 'Nilai Realisasi', tdClass: 'positionRight' },
          { value: 'DebitAccount.Tenor', text: 'Jangka Waktu' },
          { value: 'DebitAccountSummary.FinalPaymentDate', text: 'Tanggal Penyaluran' },
          { value: 'DebitAccountSummary.FinalDueDate', text: 'Tanggal Jatuh Tempo' },
          { value: 'DebitAccountSummary.InterestOutstanding', text: 'Jumlah Jasa Jatuh Tempo', tdClass: 'positionRight' },
          { value: 'HasilLoan', text: 'Pokok', tdClass: 'positionRight' },
          { value: 'HasilInterest', text: 'Jasa Adm', tdClass: 'positionRight' },
          { value: 'Total', text: 'Jumlah', tdClass: 'positionRight' },
          { value: 'DebitAccountSummary.LoanOutstanding', text: 'Pokok', tdClass: 'positionRight' },
          //{ text: 'JasaTunggakan', label: 'Jasa Adm' },
          { value: 'HasilLoanInterest', text: 'Jumlah', tdClass: 'positionRight' },
          { value: 'Tanggal_Tunggakan', text: 'Hari' },
          { value: 'TotalSisaPinjaman', text: 'Sisa Pinjaman', tdClass: 'positionRight' },
          //{ text: 'Penyisihan', label: 'Penyisihan' },
          { value: 'DebitAccountSummary.AdvPaid', text: 'Kelebihan', tdClass: 'positionRight' },
          { value: 'DebitAccountSummary.Status', text: 'STS' },
          { value: 'PKSector.SectorName', text: 'Sektor' },
          { value: 'Debitor.WACode', text: 'Region' },
          { value: 'DebitorVenture.DistributionPattern', text: 'Pola Penyaluran' },
          { value: 'PKBussIncome.GracePeriod', text: 'Grace Periode' },
          { value: 'DebitAccountSummary.LastPaidDate', text: 'Tanggal Terakhir Bayar' },
          { value: 'DebitAccountSummary.LastPaidSeq', text: 'Pembayaran Terakhir Ke' },
          { value: 'DebitAccountSummary.LastPaidLoan', text: 'Pokok', tdClass: 'positionRight' },
          { value: 'DebitAccountSummary.LastPaidInterest', text: 'Jasa Adm', tdClass: 'positionRight' },
          { value: 'LebihBayar', text: 'Lebih Bayar', tdClass: 'positionRight' },
          { value: 'LastTotalBill', text: 'Jumlah', tdClass: 'positionRight' },
          { value: 'Debitor.WACode', text: 'Cabang Provinsi' },
          { value: 'DebitAccountSummary.Cycle', text: 'Detail Jatuh Tempo' },
        ],
        options_bermasalah:[
        {
          text:'--- Semua ---',
          value:null
        },
        {
          text:'Bermasalah',
          value:'Ya'
        },
        {
          text:'Tidak Bermasalah',
          value:'Tidak'
        }],
        options_By:[
        {
          text:'ASC',
          value:'ASC'
        },
        {
          text:'DESC',
          value:'DESC'
        }],
        options_lunas:[
          {
            text:'--- Semua ---',
            value:null
          },
          {
            text:'Lunas',
            value:'Lunas'
          },
          {
            text:'Belum Lunas',
            value:'Belum'
          }
        ],
        cabang:null,
        sortir:{
          dari:null,
          hingga:null,
          Provinsi:null,
          Cabang:null,
          Month:null,
          Year:null,
          Sektor:null,
          bermasalah:null,
          Lunas:null,
          Sort:null,
          By:"ASC",
          Kualitas:null
        }
       }
    },
    async created() {
      this.loading = true
      this.cabang = localStorage.cabang
      if(this.cabang == this.cabangKP){
        this.sortir.Cabang = null
      }else{
        this.sortir.Cabang = this.cabang
      }
      this.getCabang()
      this.getProvince()
      this.getSector()
      this.getYear()
      this.getMonth()
      // this.getSortBY()
      // this.getAll()
      // this.setHeaderExport()
      this.loading = false
    },
    watch:{
       // 'sortir.dari': async function () {
       //   console.log(this.sortir);
       //   this.getAll()
       // },
       // 'sortir.hingga': async function () {
       //   console.log(this.sortir);
       //   this.getAll()
       // },
       // 'JournalTypeId': async function (){
       //   this.getAll(this.dari,this.hingga)
       // }
    },
    computed: {
        sortOptions() {
          // Create an options list from our fields
          return this.fields
            .filter(f => f.sortable)
            .map(f => {
              return { text: f.label, value: f.key }
            })
        },
        totalRows() {
          return this.items.length
        },
        DebValue: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.DebValue  || 0);
              }
             return data
          }, 0))
        },
        InterestValue: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
             var data = 0
              if(c.no != null){
                data = a + Number(c.InterestValue  || 0);
              }
             return data
          }, 0))
        },
        InterestDueDate: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data =a + Number(c.CountInterestDueDate  || 0);
              }
             return data
          }, 0))
        },
        LoanPaid: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.CountLoanPaid  || 0);
              }
             return data
          }, 0))
        },
        InterestPaid: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.CountInterestPaid  || 0);
              }
             return data
          }, 0))
        },
        TotalPaid: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.CountTotalPaid  || 0);
              }
             return data
          }, 0))
        },
        LoanOutstanding: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.CountLoanOutStanding  || 0);
              }
             return data
          }, 0))
        },
        InterestOutstanding: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.CountInterestOutStanding  || 0);
              }
             return data
          }, 0))
        },
        TotalOutstanding: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.CountTotalOutStanding  || 0);
              }
             return data
          }, 0))
        },
        TotalSisaPinjaman: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.TotalSisaPinjamanHS  || 0);
              }
             return data
          }, 0))
        },
        AdvPaid: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.AdvPaid  || 0);
              }
             return data
          }, 0))
        },
        LastPaidLoan: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.LastPaidLoan  || 0);
              }
             return data
          }, 0))
        },
        LastPaidInterest: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.LastPaidInterest  || 0);
              }
             return data
          }, 0))
        },
        LebihBayar: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){
            var data = 0
              if(c.no != null){
                data = a + Number(c.LebihBayar  || 0);
              }
             return data
          }, 0))
        },
        LastTotalBill: function() {
          return this.formatCurrency(this.items.reduce(function(a, c){

            var data = 0
              if(c.no != null){
                data = a + Number(c.LastTotalBill  || 0);
              }
              console.log(data);
             return data
          }, 0))
        },
      },
      mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length

      },
    methods: {
    rowClass(item, type) {
        if (!item) return
        if (item) return 'positionRight' // positionRight name of class css
      },
      async getAll() {
          this.items = []
          this.itemsExcel= []
          var list = await apiDebitAccount.getAllPerkembanganMitraBinaan(this.sortir)

          // this.itemsExcel = list.Data
          list.Data.splice(0, 0, headNumber);
        console.log("DATA LPPMB",list)
          for (var i = 0; i < list.Data.length; i++) {
                var lppmb = list.Data[i]
                var Alamat = ""
                var Kecamatan = ""
                var Kelurahan = ""
                lppmb.HasilLoanHS = lppmb.HasilLoan
                if(lppmb.Address){
                  Alamat = lppmb.Address
                }
                if(lppmb.Subdis_code){
                  Kecamatan = lppmb.Subdis_code
                }
                if(lppmb.Village_code){
                  Kelurahan = lppmb.Village_code
                }
                if(lppmb.DistributionPattern == 'Perseorangan'){
                  lppmb.SynergyCompany == ""
                }
                if(lppmb.no != null){
                  lppmb.Address = Alamat + ", " + Kelurahan + ", " + Kecamatan
                }


                 lppmb.FinalPaymentDateND = lppmb.FinalPaymentDate
                 lppmb.FinalDueDateND = lppmb.FinalDueDate
                 lppmb.LastPaidDateND = lppmb.LastPaidDate
                if(lppmb.no != null){
                  lppmb.CountInterestDueDate = lppmb.InterestDueDate
                  lppmb.CountLoanPaid =  lppmb.LoanPaid
                  lppmb.CountInterestPaid =  lppmb.InterestPaid
                  lppmb.CountTotalPaid =  lppmb.TotalPaid
                  lppmb.CountLoanOutStanding =  lppmb.LoanOutstanding
                  lppmb.CountInterestOutStanding =  lppmb.InterestOutstanding
                  lppmb.CountTotalOutStanding =  lppmb.TotalOutstanding
                  lppmb.TotalSisaPinjamanHS =  lppmb.TotalSisaPinjaman

                  lppmb.FinalPaymentDateND = lppmb.FinalPaymentDate ? this.formatDateDMY(lppmb.FinalPaymentDate) : ""
                  lppmb.FinalDueDateND = lppmb.FinalDueDate ? this.formatDateDMY(lppmb.FinalDueDate) : ""
                  lppmb.LastPaidDateND = lppmb.LastPaidDate ? this.formatDateDMY(lppmb.LastPaidDate) : ""
                }
               console.log(lppmb);
               this.data.push(lppmb)
               this.items.push(lppmb)
               var no = i == 0 ? 1 : i
               this.itemsExcel.push({
                  No: no,
                  DANumber: lppmb.DANumber,
                  FullName: lppmb.FullName,
                  BusinessName: lppmb.BusinessName,
                  Address: lppmb.Address,
                  Prov_code: lppmb.Prov_code,
                  Dist_code: lppmb.Dist_code,
                  Hp1: lppmb.Hp1,
                  CollateralType: lppmb.CollateralType,
                  DebValue: lppmb.DebValue ,
                  InterestValue: lppmb.InterestValue ,
                  Tenor: lppmb.Tenor,
                  FinalPaymentDate: lppmb.FinalPaymentDateND,
                  FinalDueDate: lppmb.FinalDueDateND,
                  InterestDueDate: lppmb.InterestDueDate ,
                  LoanPaid: lppmb.LoanPaid ,
                  InterestPaid: lppmb.InterestPaid ,
                  TotalPaid: lppmb.TotalPaid ,
                  LoanOutstanding: lppmb.LoanOutstanding ,
                  InterestOutstanding: lppmb.InterestOutstanding ,
                  TotalOutstanding: lppmb.TotalOutstanding ,
                  Tanggal_Tunggakan: lppmb.Tanggal_Tunggakan,
                  TotalSisaPinjaman: lppmb.TotalSisaPinjaman ,
                  Penyisihan: lppmb.Penyisihan,
                  AdvPaid: lppmb.AdvPaid,
                  sts: lppmb.sts,
                  SectorName: lppmb.SectorName,
                  WACode: lppmb.WACode,
                  SynergyCompany: lppmb.SynergyCompany,
                  Kriteria: lppmb.Kriteria,
                  Catatan: lppmb.Catatan,
                  AlamatBaru: lppmb.AlamatBaru,
                  DistributionPattern: lppmb.DistributionPattern,
                  GracePeriod: lppmb.GracePeriod,
                  LastPaidDate: lppmb.LastPaidDateND ,
                  LastPaidSeq: lppmb.LastPaidSeq,
                  LastPaidLoan: lppmb.LastPaidLoan ,
                  LastPaidInterest: lppmb.LastPaidInterest ,
                  LebihBayar: lppmb.LebihBayar,
                  LastTotalBill: lppmb.LastTotalBill,
                  CabangProv: lppmb.CabangProv,
                  Cycle: lppmb.Cycle,
                })

             }
          this.itemsExcel.push({
                 No: "Total Keseluruhan",
                 DANumber: "",
                 FullName: "",
                 BusinessName: "",
                 Address: "",
                 Prov_code: "",
                 Dist_code: "",
                 Hp1: "",
                 CollateralType: "",
                 DebValue:  this.CurrencyToNumber(this.DebValue),
                 InterestValue:  this.CurrencyToNumber(this.InterestValue),
                 Tenor: "",
                 FinalPaymentDate: "",
                 FinalDueDate: "",
                 InterestDueDate:  this.CurrencyToNumber(this.InterestDueDate),
                 LoanPaid:  this.CurrencyToNumber(this.LoanPaid),
                 InterestPaid:  this.CurrencyToNumber(this.InterestPaid),
                 TotalPaid:  this.CurrencyToNumber(this.TotalPaid),
                 LoanOutstanding:  this.CurrencyToNumber(this.LoanOutstanding),
                 InterestOutstanding:  this.CurrencyToNumber(this.InterestOutstanding),
                 TotalOutstanding:  this.CurrencyToNumber(this.TotalOutstanding),
                 Tanggal_Tunggakan: "",
                 TotalSisaPinjaman:  this.CurrencyToNumber(this.TotalSisaPinjaman),
                 Penyisihan: "",
                 AdvPaid:  this.CurrencyToNumber(this.AdvPaid),
                 sts: "",
                 SectorName: "",
                 WACode: "",
                 SynergyCompany: "",
                 Kriteria: "",
                 Catatan: "",
                 AlamatBaru: "",
                 DistributionPattern: "",
                 GracePeriod: "",
                 LastPaidDate: "",
                 LastPaidSeq: "",
                 LastPaidLoan:  this.CurrencyToNumber(this.LastPaidLoan),
                 LastPaidInterest:  this.CurrencyToNumber(this.LastPaidInterest),
                 LebihBayar:  this.CurrencyToNumber(this.LebihBayar),
                 LastTotalBill: this.CurrencyToNumber(this.LastTotalBill),
                 CabangProv: "",
                 Cycle: "",
               })
          var workarea = await apiWorkArea1.getByCode(this.sortir.Cabang)
          var WAName = "Semua"
          if(workarea[0]){
            if(workarea[0].Name){
              WAName = workarea[0].Name
            }
          }


          // this.headerExcel2 = [
          //   "Region "+ WAName
          // ]
          // this.headerExcel3 = [
          //   "Periode "+ this.formatDateDMY(this.sortir.dari) + " sampai " + this.formatDateDMY(this.sortir.hingga)
          // ]

          // this.headerExcel4 = [
          //   "Periode kualitas per "+ bulan[this.sortir.Month - 1] + "  " + this.sortir.Year
          // ]

           var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

          this.headerTitles = [
            {
              cels : 'A1',
              name : 'Laporan Perkembangan Pinjaman Mitra Binaan',
            },
            {
              cels : 'A2',
              name : "Region "+ WAName,
            },
            {
              cels : 'A3',
              name : "Periode "+ this.formatDateDMY(this.sortir.dari) + " sampai " + this.formatDateDMY(this.sortir.hingga),
            },
            {
              cels : 'A4',
              name : "Periode kualitas per "+ bulan[this.sortir.Month - 1] + "  " + this.sortir.Year,
            },
          ]
          console.log(this.items,'items');
      },
      async cariLPPMB(){
        this.loading = true
         this.getAll()
        this.loading = false
      },
      async hapusLPPMB(){
        this.loading = true
          this.sortir.dari = null
          this.sortir.hingga = null
          this.sortir.Provinsi = null
          if(this.cabang == this.cabangKP){
            this.sortir.Cabang = null
          }else{
            this.sortir.Cabang = this.cabang
          }
          this.sortir.Month = null
          this.sortir.Year = null
          this.sortir.Sektor = null
          this.sortir.bermasalah = null
          this.sortir.Lunas = null
          this.sortir.Sort = null
          this.sortir.By = "ASC"
          this.sortir.Kualitas = null
          this.items = []
          this.itemsExcel = []
         // this.getAll()
        this.loading = false
      },
      rowClass(item,type){
        if (!item) return
        if (item.statusClass === 'awesome') return 'table-success'
      },
      onFiltered(filteredItems) {
        this.rows = filteredItems.length
        this.currentPage = 1
      },
      getYear(){
      this.options_Year = [{text:"--- Semua ---",value:null}]
      for (var i = new Date().getFullYear(); i >= 1990; i--) {
        this.options_Year.push(i)
      }
    },
    getMonth(){
      this.options_Month = [{text:"--- Semua ---",value:null}]
      var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
      for (var i = 0; i < bulan.length; i++) {
      console.log(i+1)
        this.options_Month.push({text: bulan[i],value:i+1})
      }
    },
    // async getSortBY(){
    //     this.options_sort = [{text:"--- Semua ---",value:null}]
    //       console.log("SORT",this.fields)
    //     for (var i = 0; i < this.fields.length; i++) {
    //       if(this.fields[i].label){
    //         this.options_sort.push({text: this.fields[i].label,value:this.fields[i].key})
    //       }
    //     }
    // },
     async getCabang(){
      var workarea = null
      if(this.cabang != this.cabangKP){
       workarea = await apiWorkArea1.getByCode(this.cabang)
       console.log("CABANG",workarea)
       this.options_cabang = [{text: workarea[0].Name,value:workarea[0].Code}]
       // this.options_cabang.push({text: workarea[0].Name,value:workarea[0].Code})
      }else{
        var workarea = await apiWorkArea1.getComboBoxAll()
        this.options_cabang = [{text:"--- Semua ---",value:null}]
        for (var i = 0; i < workarea.length; i++) {
          var data =  workarea[i]
          this.options_cabang.push({text: data.Name,value:data.Code})
        }
      }
      console.log("cabang",workarea)
    },
     async getProvince(){
      var province = await apiProvinsi.getAllCombobox()
      console.log("Province",province)
      this.options_province = [{text:"--- Semua ---",value:null}]
      for (var i = 0; i < province.length; i++) {
        var data =  province[i]
        this.options_province.push({text: data.text,value:data.value})
      }
    },
    async getSector(){
      var sector = await apiPKSector.getAllCombobox()
      console.log("Sektor",sector)
      this.options_sector = [{text:"--- Semua ---",value:null}]
      for (var i = 0; i < sector.length; i++) {
        var data =  sector[i]
        this.options_sector.push({text: data.text,value:data.value})
      }
    }
    }
  }
</script>
<style>
.positionRight {
  text-align:right;
}
</style>
