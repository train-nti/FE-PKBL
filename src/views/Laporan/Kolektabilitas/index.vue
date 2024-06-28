<style type="text/css">
  tr th{
      /*width:1%;*/
      white-space:nowrap;
  }
</style>
<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Laporan Kolektabilitas</strong>
        </div>
        <!-- <b-row>
            <b-col sm="3">
                <label for="ccnumber">Cari:
                 </label>
                 <b-form-input v-model="filter" placeholder=""></b-form-input>
            </b-col>
            <b-col sm="3">
                <label for="ccnumber">Bulan:
                 </label>
                  <b-form-select  v-model="cari.Month" :options="options_Month" required></b-form-select>
            </b-col>
            <b-col sm="3">
                <label for="ccnumber">Tahun:
                 </label>
                 <b-form-select  v-model="cari.Year" :options="options_Year" required></b-form-select>
              <br><br>
            </b-col>
             <b-col sm="3">
                <label for="ccnumber">
                  &nbsp;
                 </label>
                 <br>
                 <button class="btn btn-primary" v-on:click="cariKolektibilitas()">Cari</button>&nbsp;
                  <button class="btn btn-primary" v-on:click="bersihKolektibilitas()">Bersih</button>
              <br><br>
            </b-col>
        </b-row> -->
        <b-tabs class="full-widths" v-model="tabIndex[0]">
            <b-tab active >
              <b-row>
                <b-col sm="3">
                    <label for="ccnumber">Cari:
                     </label>
                     <b-form-input v-model="filter" placeholder=""></b-form-input>
                </b-col>
                <b-col sm="3">
                    <b-form-radio v-model="cari.filterSelect" name="filterSelect1" value="0">Bulan:</b-form-radio> 
                      <b-form-select  v-model="cari.Month" :options="options_Month"  :disabled = "cari.filterSelect == 1" required ></b-form-select>
                </b-col>    
                <b-col sm="3">
                     <b-form-radio v-model="cari.filterSelect" name="filterSelect1" value="1">Triwulan :</b-form-radio>  
                      <b-form-select  v-model="cari.Triwulan" :options="options_Triwulan"  :disabled = "cari.filterSelect == 0" required></b-form-select>
                </b-col> 
                 <b-col sm="3">
                    <label for="inputEmail4">Cabang</label>
                    <b-form-select v-model="cari.Cabang" :options="options_cabang"></b-form-select>
                  </b-col>
                 <b-col sm="3">
                    <label for="ccnumber">
                      &nbsp;
                     </label>
                     <br>
                     <button class="btn btn-primary" v-on:click="cariKolektibilitas()">Cari</button>&nbsp;
                      <button class="btn btn-primary" v-on:click="bersihKolektibilitas()">Bersih</button>
                  <br><br>
                </b-col>
            </b-row>
            <b-row> 
              <ExcelKolek style="padding-left: 20px;" :items="itemsExcelKC" :header="headerExcelK"  :settingExcel="setExcelKC" sheetName="Laporan Kolektibilitas Current" filename="Laporan Kolektibilitas Current"></ExcelKolek>
            </b-row>
             <template slot="title">
                <i class="icon-calculator"></i> {{tabs[0]}}
            </template>
            <b-row style="padding-top:10px;">
            <b-col sm="12">
              <b-table
              class="table-responsive"
              :fields="fields"
              caption=""
              :items="items_current"
              :filter="filter"
              :tbody-tr-class="rowClass"
               @filtered="onFiltered">
                <template v-slot:thead-top="data">
                    <tr>
                      <th colspan="3"></th>
                      <th colspan="4"><center>Outstanding (Sisa Pinjaman)</center> </th>
                      <th colspan="5"></th>
                    </tr>
                </template>

                <template slot="Name" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'|| data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) ' || data.item.Name == '% '">
                  <b>{{ data.item.Name }}</b>
                </template>
                <template slot="PaidLoan" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) ' || data.item.Name == '% '">
                  <b>{{ data.item.PaidLoan }}</b>
                </template>
                <template slot="OutstandingLoan" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) ' || data.item.Name == '% '">
                  <b>{{ data.item.OutstandingLoan }}</b>
                </template>
                <template slot="Collect1Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect1Outstanding }}</b>
                </template>
                <template slot="Collect2Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect2Outstanding }}</b>
                </template>
                <template slot="Collect3Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect3Outstanding }}</b>
                </template>
                <template slot="Collect4Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect4Outstanding }}</b>
                </template>
                <template slot="GrandTotal" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.GrandTotal }}</b>
                </template>
                <template slot="LC" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.LC }}</b>
                </template>
                <template slot="KL" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.KL }}</b>
                </template>
                <template slot="RG" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.RG }}</b>
                </template>
                <template slot="Persen" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Persen }}</b>
                </template>


              </b-table>
            </b-col>
          </b-row>
          </b-tab>
           <b-tab>
              <b-row>
                <b-col sm="3">
                    <label for="ccnumber">Cari:
                     </label>
                     <b-form-input v-model="filter" placeholder=""></b-form-input>
                </b-col>
                <b-col sm="3">
                    <b-form-radio v-model="cari.filterSelect" name="filterSelect" value="0">Bulan:</b-form-radio> 
                      <b-form-select  v-model="cari.Month" :options="options_Month"  :disabled = "cari.filterSelect == 1" required ></b-form-select>
                </b-col>    
                <b-col sm="3">
                     <b-form-radio v-model="cari.filterSelect" name="filterSelect" value="1">Triwulan :</b-form-radio>  
                      <b-form-select  v-model="cari.Triwulan" :options="options_Triwulan"  :disabled = "cari.filterSelect == 0" required></b-form-select>
                </b-col> 
                <b-col sm="3">
                    <label for="inputEmail4">Cabang</label>
                    <b-form-select v-model="cari.Cabang" :options="options_cabang"></b-form-select>
                  </b-col>
                 <b-col sm="3">
                    <label for="ccnumber">
                      &nbsp;
                     </label>
                     <br>
                     <button class="btn btn-primary" v-on:click="cariKolektibilitas()">Cari</button>&nbsp;
                      <button class="btn btn-primary" v-on:click="bersihKolektibilitas()">Bersih</button>
                  <br><br>
                </b-col>
            </b-row>
             <b-row> 
              <Excel style="padding-left: 20px;" :items="itemsExcelRKC" :header="headerExcelRK"  :settingExcel="setExcelRKC" sheetName="Laporan Rekapitulasi Kolektibilitas Current" filename="Laporan Rekapitulasi Kolektibilitas Current"></Excel>
            </b-row>
             <template slot="title">
                <i class="icon-calculator"></i>  {{tabs[1]}}
            </template>
            <b-row style="padding-top:10px;">
            <b-col sm="12">
              <b-table
              :fields="fields_bulanan"
              caption=""
              :items="items_bulanan_current"
              :filter="filter"
              :tbody-tr-class="rowClass"
               @filtered="onFiltered">
              </b-table>
            </b-col>
            <b-col sm="12">
              Dengan demikian kolektabilitas pengembalian pinjaman sebagai berikut :
            </b-col>
             <b-col sm="12">
                <label v-if="dataBulananCurrent.JumlahTotalCollectOutstanding">{{formatCurrency(dataBulananCurrent.JumlahTotalCollectOutstanding)}}</label>
                <label v-else="">0</label>
                /
                <label v-if="dataBulananCurrent.JumlahCollectOutstanding">{{formatCurrency(dataBulananCurrent.JumlahCollectOutstanding)}}</label>
                <label v-else="">0</label>
                X 100%     =
                <label v-if="dataBulananCurrent.PersenCollectOutstanding">{{formatCurrency(dataBulananCurrent.PersenCollectOutstanding)}}% </label>
                <label v-else="">0%</label>
            </b-col>
             <b-col sm="12">
              Dengan demikian, tingkat kolektabilitas penyaluran pinjaman kumulatif 01 Januari {{cari.Year}} s.d 31  {{bulanDipilih}} {{cari.Year}} adalah {{dataBulananCurrent.PersenCollectOutstanding}}%
            </b-col>
          </b-row>
           </b-tab>
           <b-tab>
                <b-row>
                    <b-col sm="3">
                        <label for="ccnumber">Cari:
                         </label>
                         <b-form-input v-model="filter" placeholder=""></b-form-input>
                    </b-col> 
                    <b-col sm="3">
                        <label for="ccnumber">Tahun:
                         </label>
                         <b-form-select  v-model="cari.Year" :options="options_Year" required></b-form-select>
                      <br><br>
                    </b-col>
                    <b-col sm="3">
                      <label for="inputEmail4">Cabang</label>
                      <b-form-select v-model="cari.Cabang" :options="options_cabang"></b-form-select>
                    </b-col>
                     <b-col sm="3">
                        <label for="ccnumber">
                          &nbsp;
                         </label>
                         <br>
                         <button class="btn btn-primary" v-on:click="cariKolektibilitasKumulatif()">Cari</button>&nbsp;
                          <button class="btn btn-primary" v-on:click="bersihKolektibilitasKumulatif()">Bersih</button>
                      <br><br>
                    </b-col>
                </b-row>
              <b-row> 
                <ExcelKolek style="padding-left: 20px;" :items="itemsExcelKK" :header="headerExcelK"  :settingExcel="setExcelKK" sheetName="Laporan Kolektibilitas Kumulatif" filename="Laporan Kolektibilitas Kumulatif"></ExcelKolek>
              </b-row>
             <template slot="title">
                <i class="icon-calculator"></i> {{tabs[2]}}
            </template>
            <b-row style="padding-top:10px;">
            <b-col sm="12">
              <b-table
              class="table-responsive"
              :fields="fields"
              caption="" 
              :items="items_kumulative"
              :filter="filter"
               @filtered="onFiltered">
                <template v-slot:thead-top="data">
                    <tr>
                      <th colspan="3"></th>
                      <th colspan="4"><center>Outstanding (Sisa Pinjaman)</center> </th>
                      <th colspan="5"></th>
                    </tr>
                </template>
                <template slot="Name" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'|| data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) ' || data.item.Name == '% '">
                  <b>{{ data.item.Name }}</b>
                </template>
                <template slot="PaidLoan" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) ' || data.item.Name == '% '">
                  <b>{{ data.item.PaidLoan }}</b>
                </template>
                <template slot="OutstandingLoan" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) ' || data.item.Name == '% '">
                  <b>{{ data.item.OutstandingLoan }}</b>
                </template>
                <template slot="Collect1Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect1Outstanding }}</b>
                </template>
                <template slot="Collect2Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect2Outstanding }}</b>
                </template>
                <template slot="Collect3Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect3Outstanding }}</b>
                </template>
                <template slot="Collect4Outstanding" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Collect4Outstanding }}</b>
                </template>
                <template slot="GrandTotal" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.GrandTotal }}</b>
                </template>
                <template slot="LC" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.LC }}</b>
                </template>
                <template slot="KL" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.KL }}</b>
                </template>
                <template slot="RG" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.RG }}</b>
                </template>
                <template slot="Persen" slot-scope="data" v-if="data.item.Name == 'Region 1'||data.item.Name == 'Region 2'||data.item.Name == 'RU'|| data.item.Name == 'KANTOR PUSAT'||data.item.Name == 'Total Sinergi '||data.item.Name == 'Total Perorangan ' || data.item.Name == 'Grand Total (Dalam Rp) '|| data.item.Name == '% '">
                  <b>{{ data.item.Persen }}</b>
                </template>
              </b-table>
             <!--  <b-pagination v-model="currentPage_kumulative" :total-rows="rows_kumulative" :per-page="perPage_kumulative" aria-controls="tambah_tidaksetujuPK"></b-pagination> -->
            </b-col>
          </b-row>
          </b-tab>
           <b-tab>
              <b-row>
                <b-col sm="3">
                    <label for="ccnumber">Cari:
                     </label>
                     <b-form-input v-model="filter" placeholder=""></b-form-input>
                </b-col> 
                <b-col sm="3">
                    <label for="ccnumber">Tahun:
                     </label>
                     <b-form-select  v-model="cari.Year" :options="options_Year" required></b-form-select>
                  <br><br>
                </b-col>
                <b-col sm="3">
                  <label for="inputEmail4">Cabang</label>
                  <b-form-select v-model="cari.Cabang" :options="options_cabang"></b-form-select>
                </b-col>
                 <b-col sm="3">
                    <label for="ccnumber">
                      &nbsp;
                     </label>
                     <br>
                     <button class="btn btn-primary" v-on:click="cariKolektibilitasKumulatif()">Cari</button>&nbsp;
                      <button class="btn btn-primary" v-on:click="bersihKolektibilitasKumulatif()">Bersih</button>
                  <br><br>
                </b-col>
            </b-row>
            <b-row> 
              <Excel style="padding-left: 20px;" :items="itemsExcelRKK" :header="headerExcelRK"  :settingExcel="setExcelRKK" sheetName="Laporan Rekapitulasi Kolektibilitas Kumulatif" filename="Laporan Rekapitulasi Kolektibilitas Kumulatif"></Excel>
            </b-row>
             <template slot="title">
                <i class="icon-calculator"></i>  {{tabs[3]}}
            </template>
            <b-row style="padding-top:10px;">
            <b-col sm="12">
              <b-table
              :fields="fields_bulanan"
              caption=""
              :items="items_bulanan_kumulative"
              :filter="filter"
               @filtered="onFiltered">
              </b-table>
            </b-col>
            <b-col sm="12">
              Dengan demikian kolektabilitas pengembalian pinjaman sebagai berikut :
            </b-col>
             <b-col sm="12">
                 258.892.606.450  /  265.371.258.000  X 100%     =  97,56%
            </b-col>
             <b-col sm="12">
              Dengan demikian, tingkat kolektabilitas penyaluran pinjaman kumulatif 01 Januari 2019 s.d 31 Desember 2019 adalah 97,56%
            </b-col>
          </b-row>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</div>
</template>

<script>
  import apiSummaryCollectibility from '@/api/PK/SummaryCollectibilityApiService';
  import apiWorkArea1 from '@/api/WorkArea1ApiService'
  import Excel from '@/components/Excel'
  import ExcelKolek from '@/components/ExcelKolek'
export default {
  components: {
      Excel, ExcelKolek
    },
  data() {
    return {
      filter:null,
      cabangKP : 9900,
      cabang:null,
      items_current: [],
      items_kumulative: [],
      items_bulanan_current: [],
      items_bulanan_kumulative:[],
      dataBulananCurrent:{},
      setExcelKC : [
          {
            Cell : ['A','B','C','D','E','F','G','H','I','J','K']
          },
          {
            titles : []
          },
          {
            mergeTo : "A"
          },
          {
            origin : "A6"
          },
          {
            position : [
              {
                colums : 1,
                left : true
              }, 
            ]
          }
        ],
        setExcelKK: [
          {
            Cell : ['A','B','C','D','E','F','G','H','I','J','K']
          },
          {
            titles : []
          },
          {
            mergeTo : "A"
          },
          {
            origin : "A6"
          },
          {
            position : [
              {
                colums : 1,
                left : true
              }, 
            ]
          }
        ],
      setExcelRKC : [
          {
            Cell : ['A','B','C','D','E']
          },
          {
            titles : []
          },
          {
            mergeTo : "A"
          },
          {
            origin : "A5"
          },
          {
            position : [
              {
                colums : 1,
                left : true
              }, 
            ]
          }
        ],
        setExcelRKK : [
          {
            Cell : ['A','B','C','D','E']
          },
          {
            titles : []
          },
          {
            mergeTo : "A"
          },
          {
            origin : "A5"
          },
          {
            position : [
              {
                colums : 1,
                left : true
              }, 
            ]
          }
        ],
       headerExcelRK : ['','Saldo Pinjaman','','Bobot','Rata-rata Tertimbang'], // array
       headerExcelK : ['Region','Pengembalian Pokok Pinjaman','Piutang Outstanding (Sisa Pinjaman)','Lancar','Kurang Lancar ','Diragukan','Macet','Grand Total  ','LC','KL','RG'], // array
      itemsExcelRKC : [],
      itemsExcelRKK : [],
      itemsExcelKC : [],
      itemsExcelKK : [],
      options_Triwulan:[
        {text:"--- Semua ---",value:null}, 
        {text:"Pertama",value:3}, 
        {text:"Kedua",value:6}, 
        {text:"Ketiga",value:9}, 
        {text:"Keempat",value:12},
      ],
      bulanDipilih:null,
      fields_bulanan:[{
          key: 'status',
          label: ' ',
          tdClass: 'positionLeft'
      },
      {
          key: 'Saldo',
          label: 'Saldo Pinjaman ',
          tdClass: 'positionRight'
      },
      {
          key: 'x',
          label: ' ',
      },
      {
          key: 'Bobot',
          label: 'Bobot',
          tdClass: 'positionRight'
      },
      {
          key: 'Tertimbang',
          label: 'Rata-rata Tertimbang',
          tdClass: 'positionRight'
      }],
      fields: [{
          key: 'Name',
          label: 'Region',
          // sortable: true
          tdClass: 'positionLeft'
        },
        {
          key: 'PaidLoan',
          label: 'Pengembalian Pokok Pinjaman',
          tdClass: 'positionRight'
        },
        {
          key: 'OutstandingLoan',
          label: 'Piutang Outstanding (Sisa Pinjaman)',
          tdClass: 'positionRight'
        },
        {
          key: 'Collect1Outstanding',
          label: 'Lancar',
          tdClass: 'positionRight'
        },
        {
          key: 'Collect2Outstanding',
          label: 'Kurang Lancar',
          tdClass: 'positionRight'
        },
        {
          key: 'Collect3Outstanding',
          label: 'Diragukan',
          tdClass: 'positionRight'
        },
        {
          key: 'Collect4Outstanding',
          label: 'Macet',
          tdClass: 'positionRight'
        },
        {
          key: 'GrandTotal',
          label: 'Grand Total',
          tdClass: 'positionRight'
        },
        {
          key: 'LC',
          label: 'LC',
          tdClass: 'positionRight'
        },
        {
          key: 'KL',
          label: 'KL',
          tdClass: 'positionRight'
        },
        {
          key: 'RG',
          label: 'RG',
          tdClass: 'positionRight'
        },
        // {
        //   key: 'Persen',
        //   label: '%'
        // }
      ],
      tahun_kolek: new Date().getFullYear(),
      tabIndex: [0, 0],
      tabs: [
          'Kolektibilitas Current',
          'Rekapitulasi Kolektibilitas Current',
          'Kolektibilitas Kumulatif',
          'Rekapitulasi Kolektibilitas Kumulatif',
      ],
      rows_current: null,
      rows_kumulative: null,
      cari:{
        Year:null,
        Month:null,
        Triwulan:null,
        Cabang:null,
        filterSelect:1
      },
      // perPage_current: 10,
      // perPage_kumulative: 10,
      // currentPage_current: 1,
      // currentPage_kumulative: 1,
      options_Month:[],
      options_Year:[],
      options_cabang:[],
    }
  },
  async created() {
    this.cabang = localStorage.cabang
    this.getYear()
    this.getMonth() 
    this.getCabang()
    if(this.cabang == this.cabangKP){
      this.cari.Cabang = null
    }else{
      this.cari.Cabang = this.cabang
    }
    // this.getKolektibilitasCurrent()
    // this.getRekapKolektibilitasCurrent()
    // this.getKolektibilitasKumulatif()
    // this.getRekapKolektibilitasKumulatif()
  },
  watch:{
     'cari.filterSelect': async function () { 
        if(this.cari.filterSelect == 1){
            this.cari.Month = null
        }else{
          this.cari.Triwulan = null
        }
      },
  },
  methods: { 
    rowClass(item, type) {
        if (!item) return
        if (item) return 'positionRight' // positionRight name of class css
      },
    async getKolektibilitasCurrent(){
      console.log("CARI DATA",this.cari)
      var dataKolektibilitas = await apiSummaryCollectibility.getKolektibilitasCurrent(this.cari.filterSelect,this.cari.Month,this.cari.Triwulan,this.cari.Cabang)
        console.log("KOLEK",dataKolektibilitas)
      var CountPengembalian = 0;
      var CountPiutang = 0;
      var CountLancar = 0;
      var CountKurang = 0;
      var CountDiragukan = 0;
      var CountMacet = 0;
      var CountGrand = 0;
      var CountLC = 0;
      var CountKL = 0;
      var CountRG = 0;
      var CountPersen = 0;

      var CountTPPengembalian = 0;
      var CountTPPiutang = 0;
      var CountTPLancar = 0;
      var CountTPKurang = 0;
      var CountTPDiragukan = 0;
      var CountTPMacet = 0;
      var CountTPGrand = 0;
      var CountTPLC = 0;
      var CountTPKL = 0;
      var CountTPRG = 0;
      var CountTPPersen = 0;

      var CountGTPengembalian = 0;
      var CountGTPiutang = 0;
      var CountGTLancar = 0;
      var CountGTKurang = 0;
      var CountGTDiragukan = 0;
      var CountGTMacet = 0;
      var CountGTGrand = 0;
      var CountGTLC = 0;
      var CountGTKL = 0;
      var CountGTRG = 0;
      var CountGTPersen = 0;
      this.items_current = []
      this.itemsExcelKC = []
      this.setExcelKC[1].titles = []
      for (var i = 0; i < dataKolektibilitas.Data.length; i++) {
        var data = dataKolektibilitas.Data[i]
        var u = i + 1
        if(u == dataKolektibilitas.Data.length) {
          var data = dataKolektibilitas.Data[i]
           CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
           CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
           CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
           CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
           CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
           CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
           CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
           CountLC = CountLC + dataKolektibilitas.Data[i].LC
           CountKL = CountKL + dataKolektibilitas.Data[i].KL
           CountRG = CountRG + dataKolektibilitas.Data[i].RG
           CountPersen = (CountLC + CountKL + CountRG) / CountGrand * 100
            CountTPPersen = (CountTPLC + CountTPKL + CountTPRG) / CountTPGrand * 100
          var dataRegion = {
            Name : 'Total Sinergi ',
            PaidLoan : this.formatCurrency(CountPengembalian) ,
            OutstandingLoan : this.formatCurrency(CountPiutang) ,
            Collect1Outstanding : this.formatCurrency(CountLancar) ,
            Collect2Outstanding : this.formatCurrency(CountKurang) ,
            Collect3Outstanding : this.formatCurrency(CountDiragukan) ,
            Collect4Outstanding : this.formatCurrency(CountMacet) ,
            GrandTotal : this.formatCurrency(CountGrand) ,
            LC : this.formatCurrency(CountLC) ,
            KL : this.formatCurrency(CountKL) ,
            RG : this.formatCurrency(CountRG) ,
            Persen : CountPersen.toFixed(2),
          }

          var dataExcelRegion = {
            Name : 'Total Sinergi ',
            PaidLoan : CountPengembalian ,
            OutstandingLoan : CountPiutang,
            Collect1Outstanding : CountLancar,
            Collect2Outstanding : CountKurang,
            Collect3Outstanding : CountDiragukan,
            Collect4Outstanding : CountMacet,
            GrandTotal : CountGrand ,
            LC : CountLC,
            KL : CountKL ,
            RG : CountRG,
            // Persen : CountPersen.toFixed(2),
          }

          var dataTP = {
            Name : 'Total Perorangan ',
            PaidLoan : this.formatCurrency(CountTPPengembalian) ,
            OutstandingLoan : this.formatCurrency(CountTPPiutang) ,
            Collect1Outstanding : this.formatCurrency(CountTPLancar) ,
            Collect2Outstanding : this.formatCurrency(CountTPKurang) ,
            Collect3Outstanding : this.formatCurrency(CountTPDiragukan) ,
            Collect4Outstanding : this.formatCurrency(CountTPMacet) ,
            GrandTotal : this.formatCurrency(CountTPGrand) ,
            LC : this.formatCurrency(CountTPLC) ,
            KL : this.formatCurrency(CountTPKL) ,
            RG : this.formatCurrency(CountTPRG) ,
            Persen : CountTPPersen.toFixed(2),
          }

          var dataExcelTP = {
            Name : 'Total Perorangan ',
            PaidLoan : CountTPPengembalian,
            OutstandingLoan : CountTPPiutang,
            Collect1Outstanding : CountTPLancar,
            Collect2Outstanding : CountTPKurang,
            Collect3Outstanding : CountTPDiragukan,
            Collect4Outstanding : CountTPMacet,
            GrandTotal : CountTPGrand,
            LC : CountTPLC,
            KL : CountTPKL,
            RG : CountTPRG ,
            // Persen : CountTPPersen.toFixed(2),
          }

          CountGTPengembalian = CountPengembalian + CountTPPengembalian
          CountGTPiutang = CountPiutang + CountTPPiutang
          CountGTLancar = CountLancar + CountTPLancar
          CountGTKurang = CountKurang + CountTPKurang
          CountGTDiragukan = CountDiragukan + CountTPDiragukan
          CountGTMacet = CountMacet + CountTPMacet
          CountGTGrand = CountGrand + CountTPGrand
          CountGTLC = CountLC + CountTPLC
          CountGTKL = CountKL + CountTPKL
          CountGTRG = CountRG + CountTPRG
          CountGTPersen = (CountGTLC + CountGTKL + CountGTRG) / CountGTGrand * 100

           var dataGT = {
            Name : 'Grand Total (Dalam Rp) ',
            PaidLoan : this.formatCurrency(CountGTPengembalian) ,
            OutstandingLoan : this.formatCurrency(CountGTPiutang) ,
            Collect1Outstanding : this.formatCurrency(CountGTLancar) ,
            Collect2Outstanding : this.formatCurrency(CountGTKurang) ,
            Collect3Outstanding : this.formatCurrency(CountGTDiragukan) ,
            Collect4Outstanding : this.formatCurrency(CountGTMacet) ,
            GrandTotal : this.formatCurrency(CountGTGrand) ,
            LC : this.formatCurrency(CountGTLC) ,
            KL : this.formatCurrency(CountGTKL) ,
            RG : this.formatCurrency(CountGTRG) ,
            Persen :  CountGTPersen.toFixed(2),
          }
          var dataExcelGT = {
            Name : 'Grand Total (Dalam Rp) ',
            PaidLoan : CountGTPengembalian,
            OutstandingLoan : CountGTPiutang,
            Collect1Outstanding : CountGTLancar ,
            Collect2Outstanding : CountGTKurang,
            Collect3Outstanding : CountGTDiragukan,
            Collect4Outstanding : CountGTMacet,
            GrandTotal : CountGTGrand,
            LC : CountGTLC,
            KL : CountGTKL,
            RG : CountGTRG,
            // Persen :  CountGTPersen.toFixed(2),
          }

          // var dataPersen = {
          //   Name : '% ',
          //   PaidLoan : 0,
          //   OutstandingLoan : 0,
          //   Collect1Outstanding : 0,
          //   Collect2Outstanding : 0,
          //   Collect3Outstanding : 0,
          //   Collect4Outstanding : 0,
          //   GrandTotal : 0,
          //   LC : 0,
          //   KL : 0,
          //   RG : 0,
          //   Persen : 0,
          // }

          var dataExcel= {
            Name : data.ChnlName,
            PaidLoan : data.PaidLoan,
            OutstandingLoan : data.OutstandingLoan,
            Collect1Outstanding : data.Collect1Outstanding ,
            Collect2Outstanding : data.Collect2Outstanding,
            Collect3Outstanding : data.Collect3Outstanding,
            Collect4Outstanding : data.Collect4Outstanding,
            GrandTotal : data.GrandTotal,
            LC : data.LC,
            KL : data.KL,
            RG : data.RG,
            // Persen :  data.Persen,
          }

          data.Name = data.ChnlName
          data.PaidLoan = this.formatCurrency(data.PaidLoan)
          data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
          data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
          data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
          data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
          data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
          data.GrandTotal = this.formatCurrency(data.GrandTotal)
           data.RG = this.formatCurrency(data.RG)
          data.LC = this.formatCurrency(data.LC)
          data.KL = this.formatCurrency(data.KL)
          data.Persen = this.formatCurrency(data.Persen)

          this.items_current.push(data)
          this.items_current.push(dataRegion)
          this.items_current.push(dataTP)
          this.items_current.push(dataGT)

          this.itemsExcelKC.push(dataExcel)
          this.itemsExcelKC.push(dataExcelRegion)
          this.itemsExcelKC.push(dataExcelTP)
          this.itemsExcelKC.push(dataExcelGT)
          // this.items_current.push(dataPersen)
        }else{
            if(data.WACode){
              if(data.Region == dataKolektibilitas.Data[u].Region){
                 CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
                 CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
                 CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
                 CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
                 CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
                 CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
                 CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
                 CountLC = CountLC +  dataKolektibilitas.Data[i].LC
                 CountKL = CountKL +  dataKolektibilitas.Data[i].KL
                 CountRG = CountRG +  dataKolektibilitas.Data[i].RG
                // console.log("DATA"+ i,data)
                  
                 var dataExcel= {
                    Name : data.Name,
                    PaidLoan : data.PaidLoan,
                    OutstandingLoan : data.OutstandingLoan,
                    Collect1Outstanding : data.Collect1Outstanding ,
                    Collect2Outstanding : data.Collect2Outstanding,
                    Collect3Outstanding : data.Collect3Outstanding,
                    Collect4Outstanding : data.Collect4Outstanding,
                    GrandTotal : data.GrandTotal,
                    LC : data.LC,
                    KL : data.KL,
                    RG : data.RG,
                    // Persen :  data.Persen,
                  }

                this.itemsExcelKC.push(dataExcel)

                  data.PaidLoan = this.formatCurrency(data.PaidLoan)
                  data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
                  data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
                  data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
                  data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
                  data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
                  data.GrandTotal = this.formatCurrency(data.GrandTotal)
                   data.RG = this.formatCurrency(data.RG)
                  data.LC = this.formatCurrency(data.LC)
                  data.KL = this.formatCurrency(data.KL)
                  data.Persen = this.formatCurrency(data.Persen)
                this.items_current.push(data)
              }else{
                 CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
                 CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
                 CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
                 CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
                 CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
                 CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
                 CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
                 CountLC = CountLC +  dataKolektibilitas.Data[i].LC
                 CountKL = CountKL +  dataKolektibilitas.Data[i].KL
                 CountRG = CountRG +  dataKolektibilitas.Data[i].RG
                 CountPersen = (CountLC + CountKL + CountRG) / CountGrand * 100
                 var nameRegion = ""
                 if(data.Region){
                    if(data.Region == 3){
                      nameRegion = 'RU'
                    }else if(data.Region == 4){
                      nameRegion =  'KANTOR PUSAT'
                    }else{
                      nameRegion =  'Region '+ data.Region 
                    }
                 }
                var dataRegion = {
                  Name : nameRegion,
                  PaidLoan : this.formatCurrency(CountPengembalian) ,
                  OutstandingLoan : this.formatCurrency(CountPiutang) ,
                  Collect1Outstanding : this.formatCurrency(CountLancar) ,
                  Collect2Outstanding : this.formatCurrency(CountKurang) ,
                  Collect3Outstanding : this.formatCurrency(CountDiragukan) ,
                  Collect4Outstanding : this.formatCurrency(CountMacet) ,
                  GrandTotal : this.formatCurrency(CountGrand) ,
                  LC : this.formatCurrency(CountLC) ,
                  KL : this.formatCurrency(CountKL) ,
                  RG : this.formatCurrency(CountRG) ,
                  Persen : CountPersen.toFixed(2),
                }
                var dataExcelRegion = {
                  Name : nameRegion,
                  PaidLoan : CountPengembalian,
                  OutstandingLoan : CountPiutang,
                  Collect1Outstanding : CountLancar,
                  Collect2Outstanding : CountKurang,
                  Collect3Outstanding : CountDiragukan,
                  Collect4Outstanding : CountMacet,
                  GrandTotal : CountGrand,
                  LC : CountLC,
                  KL : CountKL ,
                  RG : CountRG ,
                  // Persen : CountPersen.toFixed(2),
                }
                var dataExcel= {
                    Name : data.Name,
                    PaidLoan : data.PaidLoan,
                    OutstandingLoan : data.OutstandingLoan,
                    Collect1Outstanding : data.Collect1Outstanding ,
                    Collect2Outstanding : data.Collect2Outstanding,
                    Collect3Outstanding : data.Collect3Outstanding,
                    Collect4Outstanding : data.Collect4Outstanding,
                    GrandTotal : data.GrandTotal,
                    LC : data.LC,
                    KL : data.KL,
                    RG : data.RG,
                    // Persen :  data.Persen,
                  }
                this.itemsExcelKC.push(dataExcel)
                this.itemsExcelKC.push(dataExcelRegion)
                 data.PaidLoan = this.formatCurrency(data.PaidLoan)
                  data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
                  data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
                  data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
                  data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
                  data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
                  data.GrandTotal = this.formatCurrency(data.GrandTotal)
                   data.RG = this.formatCurrency(data.RG)
                  data.LC = this.formatCurrency(data.LC)
                  data.KL = this.formatCurrency(data.KL)
                  data.Persen = this.formatCurrency(data.Persen)
                this.items_current.push(data)
                console.log("DATA 2"+ i,dataRegion)
                this.items_current.push(dataRegion)
                 CountTPPengembalian = CountTPPengembalian + CountPengembalian
                 CountTPPiutang = CountTPPiutang + CountPiutang
                 CountTPLancar = CountTPLancar + CountLancar
                 CountTPKurang = CountTPKurang + CountKurang
                 CountTPDiragukan = CountTPDiragukan + CountDiragukan
                 CountTPMacet = CountTPMacet + CountMacet
                 CountTPGrand = CountTPGrand + CountGrand
                 CountTPLC = CountTPLC + CountLC
                 CountTPKL = CountTPKL + CountKL
                 CountTPRG = CountTPRG + CountRG

                 CountPengembalian = 0
                 CountPiutang = 0
                 CountLancar = 0
                 CountKurang = 0
                 CountDiragukan = 0
                 CountMacet = 0
                 CountGrand = 0
                 CountLC = 0
                 CountKL = 0
                 CountRG = 0
              }
            }else{
                 CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
                 CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
                 CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
                 CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
                 CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
                 CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
                 CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
                 CountLC = CountLC + data.LC
                 CountKL = CountKL + data.KL
                 CountRG = CountRG + data.RG
                 var dataExcel= {
                    Name : data.ChnlName,
                    PaidLoan : data.PaidLoan,
                    OutstandingLoan : data.OutstandingLoan,
                    Collect1Outstanding : data.Collect1Outstanding ,
                    Collect2Outstanding : data.Collect2Outstanding,
                    Collect3Outstanding : data.Collect3Outstanding,
                    Collect4Outstanding : data.Collect4Outstanding,
                    GrandTotal : data.GrandTotal,
                    LC : data.LC,
                    KL : data.KL,
                    RG : data.RG,
                    // Persen :  data.Persen,
                  }
                // console.log("DATA"+ i,data)
                this.itemsExcelKC.push(dataExcel)
                data.Name = data.ChnlName
                 data.PaidLoan = this.formatCurrency(data.PaidLoan)
                  data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
                  data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
                  data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
                  data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
                  data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
                  data.GrandTotal = this.formatCurrency(data.GrandTotal)
                   data.RG = this.formatCurrency(data.RG)
                  data.LC = this.formatCurrency(data.LC)
                  data.KL = this.formatCurrency(data.KL)
                  data.Persen = this.formatCurrency(data.Persen)
                this.items_current.push(data)
            }

        }
      }
      var workarea = await apiWorkArea1.getByCode(this.cari.Cabang)
        var WAName = "Semua"
        if(workarea[0]){
          if(workarea[0].Name){
            WAName = workarea[0].Name
          }
        }

        var triwulan = ''
        if(this.cari.Triwulan == 3){
          triwulan = "Pertama"
        }else if(this.cari.Triwulan == 6){
          triwulan = "Kedua"
        }else if(this.cari.Triwulan == 9){
          triwulan = "Ketiga"
        }else{
          triwulan = "Keempat"
        }

        var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

        this.setExcelKC[1].titles.push(
        {
          cels : 'A1',
          name : "Laporan Kolektibilitas Current"
        },
        {
          cels : 'A2',
          name : 'Region ' + WAName
        },
        {
          cels : 'A3',
          name : this.cari.filterSelect == 0 ? "Periode "+  bulan[this.cari.Month-1] : "Periode "+  triwulan,
        },
        )
    },
    async getRekapKolektibilitasCurrent(){
      console.log("CARI DATA",this.cari)
        this.items_bulanan_current = []
        this.itemsExcelRKC = []
        this.setExcelRKC[1].titles = []
        var dataRekapKolektibilitas = await apiSummaryCollectibility.getKolektibilitasRekapCurrent(this.cari.filterSelect,this.cari.Month,this.cari.Triwulan,this.cari.Cabang)
          console.log("REKAP",dataRekapKolektibilitas.Data)
            var Collect1Outstanding = 0;
            var Collect2Outstanding = 0;
            var Collect3Outstanding = 0;
            var Collect4Outstanding = 0;

            var TotalCollect1Outstanding = 0;
            var TotalCollect2Outstanding = 0;
            var TotalCollect3Outstanding = 0;
            var TotalCollect4Outstanding = 0;

            var JumlahCollectOutstanding = 0;
            var JumlahTotalCollectOutstanding = 0;
            if(dataRekapKolektibilitas.Data){
              this.dataBulananCurrent = dataRekapKolektibilitas.Data
              if(dataRekapKolektibilitas.Data.Collect1Outstanding){
                Collect1Outstanding = dataRekapKolektibilitas.Data.Collect1Outstanding
              }
              if(dataRekapKolektibilitas.Data.Collect2Outstanding){
                Collect2Outstanding = dataRekapKolektibilitas.Data.Collect2Outstanding
              }
              if(dataRekapKolektibilitas.Data.Collect3Outstanding){
                Collect3Outstanding = dataRekapKolektibilitas.Data.Collect3Outstanding
              }
              if(dataRekapKolektibilitas.Data.Collect4Outstanding){
                Collect4Outstanding = dataRekapKolektibilitas.Data.Collect4Outstanding
              }


              if(dataRekapKolektibilitas.Data.TotalCollect1Outstanding){
                 TotalCollect1Outstanding = dataRekapKolektibilitas.Data.TotalCollect1Outstanding
              }
              if(dataRekapKolektibilitas.Data.TotalCollect2Outstanding){
                 TotalCollect2Outstanding = dataRekapKolektibilitas.Data.TotalCollect2Outstanding
              }
              if(dataRekapKolektibilitas.Data.TotalCollect3Outstanding){
                 TotalCollect3Outstanding = dataRekapKolektibilitas.Data.TotalCollect3Outstanding
              }
              if(dataRekapKolektibilitas.Data.TotalCollect4Outstanding){
                 TotalCollect4Outstanding = dataRekapKolektibilitas.Data.TotalCollect4Outstanding
              }


              if(dataRekapKolektibilitas.Data.JumlahCollectOutstanding){
                 JumlahCollectOutstanding = dataRekapKolektibilitas.Data.JumlahCollectOutstanding
              }
              if(dataRekapKolektibilitas.Data.JumlahTotalCollectOutstanding){
                 JumlahTotalCollectOutstanding = dataRekapKolektibilitas.Data.JumlahTotalCollectOutstanding
              }
            }else{
              this.dataBulananCurrent.Collect1Outstanding = 0
              this.dataBulananCurrent.Collect2Outstanding = 0
              this.dataBulananCurrent.Collect3Outstanding = 0
              this.dataBulananCurrent.Collect4Outstanding = 0
              this.dataBulananCurrent.JumlahCollectOutstanding = 0
              this.dataBulananCurrent.JumlahTotalCollectOutstanding = 0
              this.dataBulananCurrent.PersenCollectOutstanding = 0
              this.dataBulananCurrent.TotalCollect1Outstanding = 0
              this.dataBulananCurrent.TotalCollect2Outstanding = 0
              this.dataBulananCurrent.TotalCollect3Outstanding = 0
              this.dataBulananCurrent.TotalCollect4Outstanding = 0
            }

           var data = [{
             status:  'Lancar',
             Saldo: this.formatCurrency(Collect1Outstanding),
             x: 'X',
             Bobot: '100%',
             Tertimbang: this.formatCurrency(TotalCollect1Outstanding),
            },
            {
             status:  'Kurang Lancar ',
             Saldo: this.formatCurrency(Collect2Outstanding),
             x: 'X',
             Bobot: '75%',
             Tertimbang: this.formatCurrency(TotalCollect2Outstanding),
            },
            {
             status:  'Diragukan',
             Saldo: this.formatCurrency(Collect3Outstanding),
             x: 'X',
             Bobot: '25%',
             Tertimbang: this.formatCurrency(TotalCollect3Outstanding) ,
            },
            {
             status:  'Macet',
             Saldo: this.formatCurrency(Collect4Outstanding),
             x: 'X',
             Bobot: '0%',
             Tertimbang: this.formatCurrency(TotalCollect4Outstanding),
            },
            {
             status:  'Jumlah',
             Saldo: this.formatCurrency(JumlahCollectOutstanding) ,
             x: '',
             Bobot: '',
             Tertimbang:  this.formatCurrency(JumlahTotalCollectOutstanding) ,
            }]
            var dataExcel = [{
             status:  'Lancar',
             Saldo: Collect1Outstanding,
             x: 'X',
             Bobot: '100%',
             Tertimbang: TotalCollect1Outstanding,
            },
            {
             status:  'Kurang Lancar ',
             Saldo: Collect2Outstanding,
             x: 'X',
             Bobot: '75%',
             Tertimbang: TotalCollect2Outstanding,
            },
            {
             status:  'Diragukan',
             Saldo: Collect3Outstanding,
             x: 'X',
             Bobot: '25%',
             Tertimbang: TotalCollect3Outstanding ,
            },
            {
             status:  'Macet',
             Saldo: Collect4Outstanding,
             x: 'X',
             Bobot: '0%',
             Tertimbang: TotalCollect4Outstanding,
            },
            {
             status:  'Jumlah',
             Saldo: JumlahCollectOutstanding ,
             x: '',
             Bobot: '',
             Tertimbang:  JumlahTotalCollectOutstanding,
            }]
           var workarea = await apiWorkArea1.getByCode(this.cari.Cabang)
            var WAName = "Semua"
            if(workarea[0]){
              if(workarea[0].Name){
                WAName = workarea[0].Name
              }
            }

            var triwulan = ''
            if(this.cari.Triwulan == 3){
              triwulan = "Pertama"
            }else if(this.cari.Triwulan == 6){
              triwulan = "Kedua"
            }else if(this.cari.Triwulan == 9){
              triwulan = "Ketiga"
            }else{
              triwulan = "Keempat"
            }

            var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

            this.setExcelRKC[1].titles.push(
            {
              cels : 'A1',
              name : "Laporan Rekapitulasi Kolektibilitas Current"
            },
            {
              cels : 'A2',
              name : 'Region ' + WAName
            },
            {
              cels : 'A3',
              name : this.cari.filterSelect == 0 ? "Periode "+  bulan[this.cari.Month-1] : "Periode "+  triwulan,
            },
            )
            this.itemsExcelRKC = dataExcel
            this.items_bulanan_current = data
    },
     async getKolektibilitasKumulatif(){
      var dataKolektibilitas = await apiSummaryCollectibility.getKolektibilitasKumulatif(this.cari.Year,this.cari.Cabang)
      var CountPengembalian = 0;
      var CountPiutang = 0;
      var CountLancar = 0;
      var CountKurang = 0;
      var CountDiragukan = 0;
      var CountMacet = 0;
      var CountGrand = 0;
      var CountLC = 0;
      var CountKL = 0;
      var CountRG = 0;
      var CountPersen = 0;

      var CountTPPengembalian = 0;
      var CountTPPiutang = 0;
      var CountTPLancar = 0;
      var CountTPKurang = 0;
      var CountTPDiragukan = 0;
      var CountTPMacet = 0;
      var CountTPGrand = 0;
      var CountTPLC = 0;
      var CountTPKL = 0;
      var CountTPRG = 0;
      var CountTPPersen = 0;

      var CountGTPengembalian = 0;
      var CountGTPiutang = 0;
      var CountGTLancar = 0;
      var CountGTKurang = 0;
      var CountGTDiragukan = 0;
      var CountGTMacet = 0;
      var CountGTGrand = 0;
      var CountGTLC = 0;
      var CountGTKL = 0;
      var CountGTRG = 0;
      var CountGTPersen = 0;
      this.items_kumulative = []
      this.itemsExcelKK = []
      this.setExcelKK[1].titles = []
      for (var i = 0; i < dataKolektibilitas.Data.length; i++) {
        var data = dataKolektibilitas.Data[i]
        // console.log("KOLEK",data)
        var u = i + 1
        if(u == dataKolektibilitas.Data.length) {
          var data = dataKolektibilitas.Data[i]
           CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
           CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
           CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
           CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
           CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
           CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
           CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
           CountLC = CountLC + dataKolektibilitas.Data[i].LC
           CountKL = CountKL + dataKolektibilitas.Data[i].KL
           CountRG = CountRG + dataKolektibilitas.Data[i].RG
           CountPersen = (CountLC + CountKL + CountRG) / CountGrand * 100
            CountTPPersen = (CountTPLC + CountTPKL + CountTPRG) / CountTPGrand * 100
          var dataRegion = {
            Name : 'Total Sinergi ',
            PaidLoan : this.formatCurrency(CountPengembalian) ,
            OutstandingLoan : this.formatCurrency(CountPiutang) ,
            Collect1Outstanding : this.formatCurrency(CountLancar) ,
            Collect2Outstanding : this.formatCurrency(CountKurang) ,
            Collect3Outstanding : this.formatCurrency(CountDiragukan) ,
            Collect4Outstanding : this.formatCurrency(CountMacet) ,
            GrandTotal : this.formatCurrency(CountGrand) ,
            LC : this.formatCurrency(CountLC) ,
            KL : this.formatCurrency(CountKL) ,
            RG : this.formatCurrency(CountRG) ,
            Persen : CountPersen.toFixed(2),
          }

          var dataExcelRegion = {
            Name : 'Total Sinergi ',
            PaidLoan :  CountPengembalian  ,
            OutstandingLoan :  CountPiutang  ,
            Collect1Outstanding :  CountLancar  ,
            Collect2Outstanding :  CountKurang ,
            Collect3Outstanding :  CountDiragukan,
            Collect4Outstanding :  CountMacet ,
            GrandTotal :  CountGrand ,
            LC :  CountLC ,
            KL :  CountKL ,
            RG :  CountRG , 
          }

          var dataTP = {
            Name : 'Total Perorangan ',
            PaidLoan : this.formatCurrency(CountTPPengembalian) ,
            OutstandingLoan : this.formatCurrency(CountTPPiutang) ,
            Collect1Outstanding : this.formatCurrency(CountTPLancar) ,
            Collect2Outstanding : this.formatCurrency(CountTPKurang) ,
            Collect3Outstanding : this.formatCurrency(CountTPDiragukan) ,
            Collect4Outstanding : this.formatCurrency(CountTPMacet) ,
            GrandTotal : this.formatCurrency(CountTPGrand) ,
            LC : this.formatCurrency(CountTPLC) ,
            KL : this.formatCurrency(CountTPKL) ,
            RG : this.formatCurrency(CountTPRG) ,
            Persen : CountTPPersen.toFixed(2),
          }

           var dataExcelTP = {
            Name : 'Total Perorangan ',
            PaidLoan :  CountTPPengembalian ,
            OutstandingLoan :  CountTPPiutang ,
            Collect1Outstanding :  CountTPLancar,
            Collect2Outstanding :  CountTPKurang,
            Collect3Outstanding :  CountTPDiragukan,
            Collect4Outstanding :  CountTPMacet  ,
            GrandTotal :  CountTPGrand  ,
            LC :  CountTPLC,
            KL :  CountTPKL ,
            RG :  CountTPRG,
          }

          CountGTPengembalian = CountPengembalian + CountTPPengembalian
          CountGTPiutang = CountPiutang + CountTPPiutang
          CountGTLancar = CountLancar + CountTPLancar
          CountGTKurang = CountKurang + CountTPKurang
          CountGTDiragukan = CountDiragukan + CountTPDiragukan
          CountGTMacet = CountMacet + CountTPMacet
          CountGTGrand = CountGrand + CountTPGrand
          CountGTLC = CountLC + CountTPLC
          CountGTKL = CountKL + CountTPKL
          CountGTRG = CountRG + CountTPRG
          CountGTPersen = (CountGTLC + CountGTKL + CountGTRG) / CountGTGrand * 100

           var dataGT = {
            Name : 'Grand Total (Dalam Rp) ',
            PaidLoan : this.formatCurrency(CountGTPengembalian) ,
            OutstandingLoan : this.formatCurrency(CountGTPiutang) ,
            Collect1Outstanding : this.formatCurrency(CountGTLancar) ,
            Collect2Outstanding : this.formatCurrency(CountGTKurang) ,
            Collect3Outstanding : this.formatCurrency(CountGTDiragukan) ,
            Collect4Outstanding : this.formatCurrency(CountGTMacet) ,
            GrandTotal : this.formatCurrency(CountGTGrand) ,
            LC : this.formatCurrency(CountGTLC) ,
            KL : this.formatCurrency(CountGTKL) ,
            RG : this.formatCurrency(CountGTRG) ,
            Persen :  CountGTPersen.toFixed(2),
          }

          var dataExcelGT = {
            Name : 'Grand Total (Dalam Rp) ',
            PaidLoan :  CountGTPengembalian ,
            OutstandingLoan : CountGTPiutang,
            Collect1Outstanding : CountGTLancar,
            Collect2Outstanding : CountGTKurang,
            Collect3Outstanding : CountGTDiragukan,
            Collect4Outstanding : CountGTMacet,
            GrandTotal : CountGTGrand,
            LC : CountGTLC,
            KL : CountGTKL,
            RG : CountGTRG, 
          }

          // var dataPersen = {
          //   Name : '% ',
          //   PaidLoan : 0,
          //   OutstandingLoan : 0,
          //   Collect1Outstanding : 0,
          //   Collect2Outstanding : 0,
          //   Collect3Outstanding : 0,
          //   Collect4Outstanding : 0,
          //   GrandTotal : 0,
          //   LC : 0,
          //   KL : 0,
          //   RG : 0,
          //   Persen : 0,
          // }

          var dataExcel = {
            Name : data.ChnlName,
            PaidLoan :  data.PaidLoan ,
            OutstandingLoan : data.OutstandingLoan,
            Collect1Outstanding : data.Collect1Outstanding,
            Collect2Outstanding : data.Collect2Outstanding,
            Collect3Outstanding : data.Collect2Outstanding,
            Collect4Outstanding : data.Collect3Outstanding,
            GrandTotal : data.GrandTotal,
            LC : data.LC,
            KL : data.KL,
            RG : data.RG, 
          }

          data.Name = data.ChnlName
          data.PaidLoan = this.formatCurrency(data.PaidLoan)
          data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
          data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
          data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
          data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
          data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
          data.GrandTotal = this.formatCurrency(data.GrandTotal)
           data.RG = this.formatCurrency(data.RG)
          data.LC = this.formatCurrency(data.LC)
          data.KL = this.formatCurrency(data.KL)
          data.Persen = this.formatCurrency(data.Persen)

          this.items_kumulative.push(data)
          this.items_kumulative.push(dataRegion)
          this.items_kumulative.push(dataTP)
          this.items_kumulative.push(dataGT)

          this.itemsExcelKK.push(dataExcel)
          this.itemsExcelKK.push(dataExcelRegion)
          this.itemsExcelKK.push(dataExcelTP)
          this.itemsExcelKK.push(dataExcelGT)
          // this.items_kumulative.push(dataPersen)
        }else{
            if(data.WACode){
              if(data.Region == dataKolektibilitas.Data[u].Region){
                 CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
                 CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
                 CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
                 CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
                 CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
                 CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
                 CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
                 CountLC = CountLC +  dataKolektibilitas.Data[i].LC
                 CountKL = CountKL +  dataKolektibilitas.Data[i].KL
                 CountRG = CountRG +  dataKolektibilitas.Data[i].RG
                // console.log("DATA"+ i,data)
                var dataExcel = {
                  Name : data.Name,
                  PaidLoan :  data.PaidLoan ,
                  OutstandingLoan : data.OutstandingLoan,
                  Collect1Outstanding : data.Collect1Outstanding,
                  Collect2Outstanding : data.Collect2Outstanding,
                  Collect3Outstanding : data.Collect2Outstanding,
                  Collect4Outstanding : data.Collect3Outstanding,
                  GrandTotal : data.GrandTotal,
                  LC : data.LC,
                  KL : data.KL,
                  RG : data.RG, 
                }
                this.itemsExcelKK.push(dataExcel)
                 data.PaidLoan = this.formatCurrency(data.PaidLoan)
                  data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
                  data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
                  data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
                  data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
                  data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
                  data.GrandTotal = this.formatCurrency(data.GrandTotal)
                   data.RG = this.formatCurrency(data.RG)
                  data.LC = this.formatCurrency(data.LC)
                  data.KL = this.formatCurrency(data.KL)
                  data.Persen = this.formatCurrency(data.Persen)
                this.items_kumulative.push(data)
              }else{
                 CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
                 CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
                 CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
                 CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
                 CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
                 CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
                 CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
                 CountLC = CountLC +  dataKolektibilitas.Data[i].LC
                 CountKL = CountKL +  dataKolektibilitas.Data[i].KL
                 CountRG = CountRG +  dataKolektibilitas.Data[i].RG
                 CountPersen = (CountLC + CountKL + CountRG) / CountGrand * 100
                 var nameRegion = ""
                 if(data.Region){
                    if(data.Region == 3){
                      nameRegion = 'RU'
                    }else if(data.Region == 4){
                      nameRegion =  'KANTOR PUSAT'
                    }else{
                      nameRegion =  'Region '+ data.Region 
                    }
                 }
                var dataRegion = {
                  Name : nameRegion,
                  PaidLoan : this.formatCurrency(CountPengembalian) ,
                  OutstandingLoan : this.formatCurrency(CountPiutang) ,
                  Collect1Outstanding : this.formatCurrency(CountLancar) ,
                  Collect2Outstanding : this.formatCurrency(CountKurang) ,
                  Collect3Outstanding : this.formatCurrency(CountDiragukan) ,
                  Collect4Outstanding : this.formatCurrency(CountMacet) ,
                  GrandTotal : this.formatCurrency(CountGrand) ,
                  LC : this.formatCurrency(CountLC) ,
                  KL : this.formatCurrency(CountKL) ,
                  RG : this.formatCurrency(CountRG) ,
                  Persen : CountPersen.toFixed(2),
                } 
                var dataExcelRegion = {
                  Name : nameRegion,
                  PaidLoan : CountPengembalian,
                  OutstandingLoan : CountPiutang,
                  Collect1Outstanding : CountLancar,
                  Collect2Outstanding : CountKurang ,
                  Collect3Outstanding : CountDiragukan,
                  Collect4Outstanding : CountMacet,
                  GrandTotal : CountGrand,
                  LC : CountLC,
                  KL : CountKL,
                  RG : CountRG,
                } 
                var dataExcel = {
                  Name : data.Name,
                  PaidLoan :  data.PaidLoan ,
                  OutstandingLoan : data.OutstandingLoan,
                  Collect1Outstanding : data.Collect1Outstanding,
                  Collect2Outstanding : data.Collect2Outstanding,
                  Collect3Outstanding : data.Collect2Outstanding,
                  Collect4Outstanding : data.Collect3Outstanding,
                  GrandTotal : data.GrandTotal,
                  LC : data.LC,
                  KL : data.KL,
                  RG : data.RG, 
                }
                this.itemsExcelKK.push(dataExcel)
                this.itemsExcelKK.push(dataExcelRegion)
                 data.PaidLoan = this.formatCurrency(data.PaidLoan)
                  data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
                  data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
                  data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
                  data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
                  data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
                  data.GrandTotal = this.formatCurrency(data.GrandTotal)
                   data.RG = this.formatCurrency(data.RG)
                  data.LC = this.formatCurrency(data.LC)
                  data.KL = this.formatCurrency(data.KL)
                  data.Persen = this.formatCurrency(data.Persen)
                this.items_kumulative.push(data) 
                this.items_kumulative.push(dataRegion)
                 CountTPPengembalian = CountTPPengembalian + CountPengembalian
                 CountTPPiutang = CountTPPiutang + CountPiutang
                 CountTPLancar = CountTPLancar + CountLancar
                 CountTPKurang = CountTPKurang + CountKurang
                 CountTPDiragukan = CountTPDiragukan + CountDiragukan
                 CountTPMacet = CountTPMacet + CountMacet
                 CountTPGrand = CountTPGrand + CountGrand
                 CountTPLC = CountTPLC + CountLC
                 CountTPKL = CountTPKL + CountKL
                 CountTPRG = CountTPRG + CountRG

                 CountPengembalian = 0
                 CountPiutang = 0
                 CountLancar = 0
                 CountKurang = 0
                 CountDiragukan = 0
                 CountMacet = 0
                 CountGrand = 0
                 CountLC = 0
                 CountKL = 0
                 CountRG = 0
              }
            }else{
                 CountPengembalian = CountPengembalian +  dataKolektibilitas.Data[i].PaidLoan
                 CountPiutang = CountPiutang +  dataKolektibilitas.Data[i].OutstandingLoan
                 CountLancar = CountLancar +  dataKolektibilitas.Data[i].Collect1Outstanding
                 CountKurang = CountKurang +  dataKolektibilitas.Data[i].Collect2Outstanding
                 CountDiragukan = CountDiragukan +  dataKolektibilitas.Data[i].Collect3Outstanding
                 CountMacet = CountMacet +  dataKolektibilitas.Data[i].Collect4Outstanding
                 CountGrand = CountGrand +  dataKolektibilitas.Data[i].GrandTotal
                 CountLC = CountLC + data.LC
                 CountKL = CountKL + data.KL
                 CountRG = CountRG + data.RG
                // console.log("DATA"+ i,data)
                var dataExcel = {
                  Name : data.ChnlName,
                  PaidLoan :  data.PaidLoan ,
                  OutstandingLoan : data.OutstandingLoan,
                  Collect1Outstanding : data.Collect1Outstanding,
                  Collect2Outstanding : data.Collect2Outstanding,
                  Collect3Outstanding : data.Collect2Outstanding,
                  Collect4Outstanding : data.Collect3Outstanding,
                  GrandTotal : data.GrandTotal,
                  LC : data.LC,
                  KL : data.KL,
                  RG : data.RG, 
                }
              this.itemsExcelKK.push(dataExcel)
                data.Name = data.ChnlName
                 data.PaidLoan = this.formatCurrency(data.PaidLoan)
                  data.OutstandingLoan = this.formatCurrency(data.OutstandingLoan)
                  data.Collect1Outstanding = this.formatCurrency(data.Collect1Outstanding)
                  data.Collect2Outstanding = this.formatCurrency(data.Collect2Outstanding)
                  data.Collect3Outstanding = this.formatCurrency(data.Collect3Outstanding)
                  data.Collect4Outstanding = this.formatCurrency(data.Collect4Outstanding)
                  data.GrandTotal = this.formatCurrency(data.GrandTotal)
                   data.RG = this.formatCurrency(data.RG)
                  data.LC = this.formatCurrency(data.LC)
                  data.KL = this.formatCurrency(data.KL)
                  data.Persen = this.formatCurrency(data.Persen)
                this.items_kumulative.push(data)
            }

        } 
      }
      var workarea = await apiWorkArea1.getByCode(this.cari.Cabang)
      var WAName = "Semua"
      if(workarea[0]){
        if(workarea[0].Name){
          WAName = workarea[0].Name
        }
      } 

      this.setExcelKK[1].titles.push(
      {
        cels : 'A1',
        name : "Laporan Kolektibilitas Kumulatif"
      },
      {
        cels : 'A2',
        name : 'Region ' + WAName
      },
      {
        cels : 'A3',
        name : "Periode "+  this.cari.Year,
      },
      )
    },
    async getRekapKolektibilitasKumulatif(){
        this.items_bulanan_current = []
        this.itemsExcelRKK = []
        this.setExcelRKK[1].titles = []
        var dataRekapKolektibilitas = await apiSummaryCollectibility.getKolektibilitasRekapKumulatif(this.cari.Year,this.cari.Cabang)
          console.log("REKAP",dataRekapKolektibilitas.Data)
            var Collect1Outstanding = 0;
            var Collect2Outstanding = 0;
            var Collect3Outstanding = 0;
            var Collect4Outstanding = 0;

            var TotalCollect1Outstanding = 0;
            var TotalCollect2Outstanding = 0;
            var TotalCollect3Outstanding = 0;
            var TotalCollect4Outstanding = 0;

            var JumlahCollectOutstanding = 0;
            var JumlahTotalCollectOutstanding = 0;
            if(dataRekapKolektibilitas.Data){
              this.dataBulananCurrent = dataRekapKolektibilitas.Data
              if(dataRekapKolektibilitas.Data.Collect1Outstanding){
                Collect1Outstanding = dataRekapKolektibilitas.Data.Collect1Outstanding
              }
              if(dataRekapKolektibilitas.Data.Collect2Outstanding){
                Collect2Outstanding = dataRekapKolektibilitas.Data.Collect2Outstanding
              }
              if(dataRekapKolektibilitas.Data.Collect3Outstanding){
                Collect3Outstanding = dataRekapKolektibilitas.Data.Collect3Outstanding
              }
              if(dataRekapKolektibilitas.Data.Collect4Outstanding){
                Collect4Outstanding = dataRekapKolektibilitas.Data.Collect4Outstanding
              }


              if(dataRekapKolektibilitas.Data.TotalCollect1Outstanding){
                 TotalCollect1Outstanding = dataRekapKolektibilitas.Data.TotalCollect1Outstanding
              }
              if(dataRekapKolektibilitas.Data.TotalCollect2Outstanding){
                 TotalCollect2Outstanding = dataRekapKolektibilitas.Data.TotalCollect2Outstanding
              }
              if(dataRekapKolektibilitas.Data.TotalCollect3Outstanding){
                 TotalCollect3Outstanding = dataRekapKolektibilitas.Data.TotalCollect3Outstanding
              }
              if(dataRekapKolektibilitas.Data.TotalCollect4Outstanding){
                 TotalCollect4Outstanding = dataRekapKolektibilitas.Data.TotalCollect4Outstanding
              }


              if(dataRekapKolektibilitas.Data.JumlahCollectOutstanding){
                 JumlahCollectOutstanding = dataRekapKolektibilitas.Data.JumlahCollectOutstanding
              }
              if(dataRekapKolektibilitas.Data.JumlahTotalCollectOutstanding){
                 JumlahTotalCollectOutstanding = dataRekapKolektibilitas.Data.JumlahTotalCollectOutstanding
              }
            }else{
              this.dataBulananCurrent.Collect1Outstanding = 0
              this.dataBulananCurrent.Collect2Outstanding = 0
              this.dataBulananCurrent.Collect3Outstanding = 0
              this.dataBulananCurrent.Collect4Outstanding = 0
              this.dataBulananCurrent.JumlahCollectOutstanding = 0
              this.dataBulananCurrent.JumlahTotalCollectOutstanding = 0
              this.dataBulananCurrent.PersenCollectOutstanding = 0
              this.dataBulananCurrent.TotalCollect1Outstanding = 0
              this.dataBulananCurrent.TotalCollect2Outstanding = 0
              this.dataBulananCurrent.TotalCollect3Outstanding = 0
              this.dataBulananCurrent.TotalCollect4Outstanding = 0
            }

           var data = [{
             status:  'Lancar',
             Saldo: this.formatCurrency(Collect1Outstanding),
             x: 'X',
             Bobot: '100%',
             Tertimbang: this.formatCurrency(TotalCollect1Outstanding),
            },
            {
             status:  'Kurang Lancar ',
             Saldo: this.formatCurrency(Collect2Outstanding),
             x: 'X',
             Bobot: '75%',
             Tertimbang: this.formatCurrency(TotalCollect2Outstanding),
            },
            {
             status:  'Diragukan',
             Saldo: this.formatCurrency(Collect3Outstanding),
             x: 'X',
             Bobot: '25%',
             Tertimbang: this.formatCurrency(TotalCollect3Outstanding) ,
            },
            {
             status:  'Macet',
             Saldo: this.formatCurrency(Collect4Outstanding),
             x: 'X',
             Bobot: '0%',
             Tertimbang: this.formatCurrency(TotalCollect4Outstanding),
            },
            {
             status:  'Jumlah',
             Saldo: this.formatCurrency(JumlahCollectOutstanding) ,
             x: '',
             Bobot: '',
             Tertimbang:  this.formatCurrency(JumlahTotalCollectOutstanding) ,
            }]
            var dataExcel = [{
             status:  'Lancar',
             Saldo: Collect1Outstanding,
             x: 'X',
             Bobot: '100%',
             Tertimbang: TotalCollect1Outstanding,
            },
            {
             status:  'Kurang Lancar ',
             Saldo: Collect2Outstanding,
             x: 'X',
             Bobot: '75%',
             Tertimbang: TotalCollect2Outstanding,
            },
            {
             status:  'Diragukan',
             Saldo: Collect3Outstanding,
             x: 'X',
             Bobot: '25%',
             Tertimbang: TotalCollect3Outstanding ,
            },
            {
             status:  'Macet',
             Saldo: Collect4Outstanding,
             x: 'X',
             Bobot: '0%',
             Tertimbang: TotalCollect4Outstanding,
            },
            {
             status:  'Jumlah',
             Saldo: JumlahCollectOutstanding,
             x: '',
             Bobot: '',
             Tertimbang:  JumlahTotalCollectOutstanding,
            }]
            var workarea = await apiWorkArea1.getByCode(this.cari.Cabang)
            var WAName = "Semua"
            if(workarea[0]){
              if(workarea[0].Name){
                WAName = workarea[0].Name
              }
            } 

            this.setExcelRKK[1].titles.push(
            {
              cels : 'A1',
              name : "Laporan Rekapitulasi Kolektibilitas Kumulatif"
            },
            {
              cels : 'A2',
              name : 'Region ' + WAName
            },
            {
              cels : 'A3',
              name : "Periode "+  this.cari.Year,
            },
            )
            this.itemsExcelRKK = dataExcel
            this.items_bulanan_kumulative = data
    },
    async cariKolektibilitas(){
         var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
        this.bulanDipilih = bulan[this.cari.Month - 1]
        this.getKolektibilitasCurrent()
        this.getRekapKolektibilitasCurrent()
    },
    async bersihKolektibilitas(){ 
      this.cari.Month = null
      this.cari.Triwulan = null
      this.bulanDipilih = null
       if(this.cabang == this.cabangKP){
        this.cari.Cabang = null
      }else{
        this.cari.Cabang = this.cabang
      }
      this.itemsExcelKC= [] 
      this.itemsExcelRKC= []
      this.setExcelRKC[1].titles = []
      this.setExcelKC[1].titles = []
      this.items_current= [] 
      this.items_bulanan_current= []
      // this.getKolektibilitasCurrent()
      // this.getRekapKolektibilitasCurrent()
    },
    async cariKolektibilitasKumulatif(){
         var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
        this.bulanDipilih = bulan[this.cari.Month - 1]
      this.getKolektibilitasKumulatif()
      this.getRekapKolektibilitasKumulatif()
    },
    async bersihKolektibilitasKumulatif(){
      this.cari.Year = null 
      this.bulanDipilih = null
      if(this.cabang == this.cabangKP){
        this.cari.Cabang = null
      }else{
        this.cari.Cabang = this.cabang
      }
      this.itemsExcelKK= [] 
      this.itemsExcelRKK= []
      this.setExcelRKK[1].titles = []
      this.setExcelKK[1].titles = []
      this.items_kumulative = []
      this.items_bulanan_kumulative = []
      // this.getKolektibilitasKumulatif()
      // this.getRekapKolektibilitasKumulatif() 
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
    onFiltered(filteredItems) {
      this.rows_current = filteredItems.length
      this.currentPage_current = 1
    },
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
    }
  }
}
</script>

<style>
.positionRight {
  text-align:right;
}
.positionLeft{
  text-align:left !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
