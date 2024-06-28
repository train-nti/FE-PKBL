<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                  <div slot="header">
                    <strong>Laporan Perkembangan Pinjaman Mitra Binaan</strong>
                  </div>
                  <div class="form-group form-actions">
                    <form>
                      <div class="row">
                        <div class="col">
                          <label for="inputEmail4">Periode Salur</label>
                          <input type="date" class="form-control" placeholder="">
                        </div>
                        <div class="col">
                          <label for="inputEmail4">Sampai</label>
                          <input type="date" class="form-control" placeholder="">
                        </div>
                        <div class="col">
                          <label for="inputEmail4">Periode Kualitas Per</label>
                          <v-select placeholder="Pilih Bulan" :options="options"/>
                        </div>
                        <div class="col" style="padding-top: 27px;">
                          <v-select placeholder="Pilih Tahun" :options="options"/>                          
                        </div>
                        <div class="col">
                          <label for="inputEmail4">Cabang</label>
                          <v-select placeholder="--SEMUA--" :options="options"/>
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
                    </form>
                 </div>
 
                  <div class="form-group form-actions">
                    <form>
                      <div class="row">
                        <div class="col">
                          <label for="inputEmail4">Kualitas Pinjaman : </label>
                          <div class="form-check">
                              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                              <label class="form-check-label" for="exampleRadios1">
                                Lancar
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
                              <label class="form-check-label" for="exampleRadios1">
                                Kurang Lancar
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
                              <label class="form-check-label" for="exampleRadios1">
                                Diragukan
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
                              <label class="form-check-label" for="exampleRadios1">
                                Macet
                              </label>
                            </div>
                        </div>
                        <div class="col">
                          <label for="inputEmail4">Sort By : </label>
                          <div class="form-check">
                              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                              <label class="form-check-label" for="exampleRadios1">
                                Lancar
                              </label>
                            </div>
                        </div>
                      </div>
                    </form>
                 </div>
                 <div class="form-group form-actions">
                       <form>
                        <div class="row">
                          <div class="col">
                            <label for="inputEmail4">Bermasalah</label>
                            <v-select placeholder="--SEMUA--" :options="options"/>
                          </div>
                          <div class="col">
                            <label for="inputEmail4">Sektor</label>
                            <v-select placeholder="Sektor Jasa" :options="options"/>                          
                          </div>
                          <div class="col">
                            <label for="inputEmail4">Lunas</label>
                            <v-select placeholder="--SEMUA--" :options="options"/>
                          </div>
                          <div class="col">
                            <label for="inputEmail4">Provinsi</label>
                            <v-select placeholder="--Pilih--" :options="options"/>
                          </div>
                          <div class="col">
                            <label for="inputEmail4">Sort By</label>
                            <v-select placeholder="--Pilih--" :options="options"/>
                          </div>
                        </div>
                     </form>
                 </div>
                 <div class="form-group">
                   <div class="col" style="padding-top: 27px;">
                          <button class="btn btn-primary">Go</button>&nbsp;
                          <button class="btn btn-primary">Reset</button>
                        </div>
                 </div>
                 <br>
                    <b-row>
                        <b-col sm="12">
                          <div style="overflow-x:auto;">
                            <table id="dtHorizontalExample" class="table table-bordered">
                                <tr style="background:#f1f1f1;">
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">No</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Kode</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Nama</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Nama Usaha</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Alamat</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Provinsi</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Kota/Kabupaten</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">No. Telp/HP</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Agunan</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Jumlah Pinjaman</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Nilai Jasa</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Nilai Realisasi</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Jangka Waktu</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Tanggal Penyaluran</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Tanggal Jatuh Tempo</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Jumlah Jasa Jatuh Tempo</td>
                                  <td colspan="3" style="text-align:center;">Pengembalian Pinjaman</td>
                                  <td colspan="4" style="text-align:center;">Tunggakan</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Sisa Pinjaman</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Penyisihan</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Kelebihan</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">STS</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Sektor</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Region</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Sinergi</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Kriteria</td>
                                  <td rowspan="2" style="text-align:center; padding-top:50px;">Catatan</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Alamat Baru</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Grace Periode</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Tanggal Terakhir Bayar</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Pemabayaran Terakhir Ke</td>
                                  <td colspan="4" style="text-align:center;">Nominal Terakhir Dibayar</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Cabang Provinsi</td>
                                  <td rowspan="2" style="text-align:center; padding-top:40px;">Detail Jatuh Tempo</td>
                                </tr>
                                <tr style="background:#f1f1f1;">
                                  <td>Pokok</td>
                                  <td>Jasa Adm.</td>
                                  <td>Jumlah.</td>
                                  <td>Pokok</td>
                                  <td>Jasa Adm.</td>
                                  <td>Jumlah.</td>
                                  <td>Hari</td>
                                  <td>Pokok</td>
                                  <td>Jasa Adm.</td>
                                  <td>Lebih Bayar</td>
                                  <td>Jumlah.</td>
                                </tr>
                                <tr style="background:#f1f1f1; text-align:center;">
                                  <td>1</td>
                                  <td>2</td>
                                  <td>3</td>
                                  <td>4</td>
                                  <td>5</td>
                                  <td>6</td>
                                  <td>7</td>
                                  <td>8</td>
                                  <td>9</td>
                                  <td>10</td>
                                  <td>11</td>
                                  <td>12</td>
                                  <td>13</td>
                                  <td>14</td>
                                  <td>15</td>
                                  <td>16</td>
                                  <td>17</td>
                                  <td>18</td>
                                  <td>19</td>
                                  <td>20</td>
                                  <td>21</td>
                                  <td>22</td>
                                  <td>23</td>
                                  <td>24</td>
                                  <td>25</td>
                                  <td>26</td>
                                  <td>27</td>
                                  <td>28</td>
                                  <td>29</td>
                                  <td>30</td>
                                  <td>31</td>
                                  <td>32</td>
                                  <td>33</td>
                                  <td>34</td>
                                  <td>35</td>
                                  <td>36</td>
                                  <td>37</td>
                                  <td>38</td>
                                  <td>39</td>
                                  <td>40</td>
                                  <td>41</td>
                                  <td>42</td>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>28052287</td>
                                  <td>ipul samudin</td>
                                  <td>Galaxi Bima Darmasena</td>
                                  <td>Jalan Merpati Burung Bangao</td>
                                  <td>Bogor</td>
                                  <td>Parung</td>
                                  <td></td>
                                  <td>BPKB Mobil nya ga ada</td>
                                  <td>4,450,000</td>
                                  <td>5,000,200</td>
                                  <td>4,450,000</td>
                                  <td>36</td>
                                  <td>2019-07-2</td>
                                  <td>2020-08-19</td>
                                  <td>1,500,000</td>
                                  <td>1,500,000</td>
                                  <td>4,285,000</td>
                                  <td>750,000</td>
                                  <td>1,500,000</td>
                                  <td>8,660,000</td>
                                  <td>5,035,000</td>
                                  <td>155</td>
                                  <td>29,138,000</td>
                                  <td>7,284,500</td>
                                  <td>0</td>
                                  <td>Kurang Lancar</td>
                                  <td>Jas</td>
                                  <td>2800</td>
                                  <td>0</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>1 kali</td>
                                  <td>2015-06-30</td>
                                  <td>2</td>
                                  <td>862,000</td>
                                  <td>300,000</td>
                                  <td>0</td>
                                  <td>1,162,000</td>
                                  <td>2700</td>
                                  <td>1 Bulan</td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>28052287</td>
                                  <td>Lutifa</td>
                                  <td>PT Tama Jaya Alumunium</td>
                                  <td>Jalan Tanah Air Kutidak Kulupakan</td>
                                  <td>Depok</td>
                                  <td>Sawangan</td>
                                  <td></td>
                                  <td>Sertifikat Hak Milik No.1223</td>
                                  <td>6,000,000</td>
                                  <td>3,100,000</td>
                                  <td>6,000,000</td>
                                  <td>36</td>
                                  <td>2019-07-02</td>
                                  <td>2020-08-19</td>
                                  <td>900,000</td>
                                  <td>1,500,000</td>    
                                  <td>1,575,000</td>
                                  <td>175,000</td>
                                  <td>1,100,000</td>
                                  <td>4,300,000</td>
                                  <td>1,175,000</td>
                                  <td>76</td>
                                  <td>31,575,000</td>
                                  <td>7,893,750</td>
                                  <td>0</td>
                                  <td>Kurang Lancar</td>
                                  <td>Jas</td>
                                  <td>2800</td>
                                  <td>0</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>1 kali</td>
                                  <td>2016-02-25</td>
                                  <td>8</td>
                                  <td>2,975,000</td>
                                  <td>525,000</td>
                                  <td>0</td>
                                  <td>3,500,000</td>
                                  <td>2700</td>
                                  <td>1 Bulan</td>
                                </tr>
                                <tr style="font-weight: bold;">
                                  <td colspan="9">Jumlah</td>
                                  <td>10,450,000</td>
                                  <td>8,100,200</td>
                                  <td>10,450,000</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>2,400,000</td>
                                  <td>3,000,000</td>
                                  <td>5,860,000</td>
                                  <td>925,000</td>
                                  <td>2,600,000</td>
                                  <td>12,960,000</td>
                                  <td>6,785,000</td>
                                  <td></td>
                                  <td>60,713,000</td>
                                  <td>15,178,250</td>
                                  <td>0</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>3,837,000</td>
                                  <td>825,000</td>
                                  <td>0</td>
                                  <td>4,662,000</td>
                                  <td></td>
                                  <td></td>
                                </tr>
                            </table>
                          </div>
 
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>