<style>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
</style>
<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                  <div slot="header">
                    <strong>Transaksi Kas Bank</strong>
                  </div>

                  <b-tabs v-model="tabIndex">
                      <b-tab title="Daftar" active>
                          <b-row>
                              <b-col sm="12">
                                <b-card>
                                  <b-row>
                                      <b-col sm="3">
                                          <label for="ccnumber">No. Bukti (Oprasional):
                                             <!-- <b class="text-danger"> *</b> -->
                                           </label>
                                          <b-form-input v-model="nobukti" type="text" required></b-form-input>
                                      </b-col>
                                      <b-col sm="3">
                                          <label for="ccnumber">Dari:
                                             <!-- <b class="text-danger"> *</b> -->
                                           </label>
                                          <b-form-input v-model="dari" type="date" required></b-form-input>
                                      </b-col>
                                      <b-col sm="3">
                                          <label for="ccnumber">Hingga:
                                             <!-- <b class="text-danger"> *</b> -->
                                           </label>
                                          <b-form-input v-model="hingga" type="date" required></b-form-input>
                                      </b-col>
                                      <b-col sm="3">
                                          <label for="ccnumber">Program:
                                             <!-- <b class="text-danger"> *</b> -->
                                           </label>
                                          <b-form-select v-model="selected" :options="options_Program"></b-form-select>
                                      </b-col>
                                  </b-row>

                                  <b-row style="margin-top:10px">
                                      <b-col sm="12">
                                        <div class="form-group form-actions">
                                          <b-button type="submit" size="md" variant="light">Filter</b-button>
                                        </div>
                                      </b-col>
                                  </b-row>

                                  <b-row>

                                  </b-row>
                                </b-card>
                              </b-col>
                          </b-row>
                      </b-tab>

                      <b-tab title="Jurnal">
                        <b-row>
                            <b-col sm="12">
                                <b-card>
                                    <b-row>
                                        <b-col sm="2">
                                          <label for="ccnumber">Tanggal :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="3">
                                            <b-form-input v-model="tanggal_posting" type="date" required></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Kepada :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="6">
                                            <b-form-input v-model="kepada" type="text" required></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Keterangan Bayar :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="6">
                                            <b-form-input v-model="keterangan" type="text" required></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Jenis  Pembayaran :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="5">
                                            <b-form-select v-model="keterangan" :options="options_Kredit"></b-form-select>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Permintaan Bayar :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="6">
                                            <b-form-input v-model="permintaan" type="text" required></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Verifikasi :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="6">
                                            <b-form-input v-model="verifikasi.isi" type="text" required ></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Penyetuju :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="6">
                                            <b-form-input v-model="penyetuju.isi" type="text" required></b-form-input>
                                        </b-col>
                                    </b-row>
                                </b-card>

                                <b-card>
                                    <b-row>
                                        <b-col sm="2">
                                          <label for="ccnumber">Kode Akun :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="3">
                                            <b-form-input v-model="kode" type="text" required></b-form-input>
                                        </b-col>
                                        <b-col sm="3" style="color:grey;">
                                            <p>atau pilih Nama Akun dibawah ini</p>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Nama Akun :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="6">
                                            <b-form-select v-model="nama_akun" :options="options_Kredit"></b-form-select>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Nilai :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="3">
                                            <money class="form-control" v-model="nilai" v-bind="money" ></money>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                      <b-col sm="2">
                                      </b-col>
                                      <b-col sm="1">
                                          <b-form-radio v-model="debet" name="persetujuan.Status" value="Debet">Debet</b-form-radio>
                                      </b-col>
                                      <b-col sm="1">
                                          <b-form-radio v-model="krdit" name="persetujuan.Status" value="Kredit">Kredit</b-form-radio>
                                      </b-col>
                                    </b-row>

                                    <b-row style="margin-top:10px">
                                        <b-col sm="2">
                                          <label for="ccnumber">Keterangan :
                                             <b class="text-danger"> *</b>
                                           </label>
                                        </b-col>
                                        <b-col sm="6">
                                            <b-form-input v-model="keterangan" type="text" required></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row style="margin-top:30px">
                                      <b-col sm="6">
                                        <div class="form-group form-actions">
                                          <b-button type="submit" size="md" variant="primary">Tambah</b-button>
                                          <b-button type="submit" size="md" variant="link">Batal</b-button>
                                        </div>
                                      </b-col>
                                    </b-row>
                                </b-card>

                                <b-row>
                                  <b-col sm="6">
                                    <div class="form-group form-actions">
                                      <b-button type="submit" size="md" variant="light">Print</b-button>
                                    </div>
                                  </b-col>
                                </b-row>

                                <b-row>
                                  <b-col sm="12">
                                      <table id="dtHorizontalExample" class="table table-bordered">
                                          <tr>
                                              <td>No</td>
                                              <td>Kode</td>
                                              <td>Nama Akun</td>
                                              <td>Debet</td>
                                              <td>Kredit</td>
                                              <td>Kredit</td>
                                              <td>Keterangan</td>
                                              <td>Opr.</td>
                                          </tr>
                                          <tr>
                                              <td></td>
                                              <td><b-form-input v-model="keterangan" type="text" required></b-form-input></td>
                                              <td><b-form-input v-model="keterangan" type="text" required></b-form-input></td>
                                              <td><b-form-input v-model="keterangan" type="text" required></b-form-input></td>
                                              <td><b-form-input v-model="keterangan" type="text" required></b-form-input></td>
                                              <td><b-form-input v-model="keterangan" type="text" required></b-form-input></td>
                                              <td><b-form-input v-model="keterangan" type="text" required></b-form-input></td>
                                              <td></td>
                                          </tr>
                                          <tr>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                          </tr>
                                      </table>
                                      <b-pagination v-model="currentPage" :total-rows="rows_tambah" :per-page="perPage" aria-controls="tambah_sudahpersetujuanPK"></b-pagination>
                                  </b-col>
                                </b-row>

                                <b-row>
                                  <b-col sm="12">
                                      <b-button type="submit" size="md" variant="primary">Simpan</b-button>
                                  </b-col>
                                </b-row>

                                <!-- <b-card>
                                    <b-row>
                                        <b-col sm="12">

                                        </b-col>
                                    </b-row>
                                </b-card> -->
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
import {Money} from 'v-money'
  export default {
    data() {
      return {
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'Rp. ',
            suffix: '',
            precision: 2,
            masked: false
          },
          verifikasi:{
              isi : 'Vetty'
          },
          penyetuju:{
            isi:'Agus Sugiarso'
          },
          selected: null,
          options_Program: [
            { value: 'Pilih', text: 'Pilih' },
            { value: 'Kemitraan', text: 'Kemitraan' },
            { value: 'Bina Lingkungan', text: 'Bina Lingkungan' },
            { value: 'Kemitraan dan Bina Lingkungan', text: 'Kemitraan dan Bina Lingkungan' }
          ],
      }
    }
  }
</script>
