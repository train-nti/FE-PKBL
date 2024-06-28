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
     <b-row v-if="loading">
            <b-col sm="12">
                <b-card>
                     <b-spinner label="Spinning"></b-spinner>
                     Loading
                </b-card>
              </b-col>
        </b-row>
      <b-row  v-if="!loading">
          <b-col sm="12">
              <b-card>
                <div slot="header">
                  <strong>FORMULIR APLIKASI PROGRAM KEMITRAAN</strong>
                </div>

                <b-row>
                  <b-col sm="3">
                     <label for="ccnumber">Application Reff. No.
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                  </b-col>
                  <b-col sm="3">
                      <b-form-input v-model="debitor.NoReference"  type="text" required></b-form-input>
                  </b-col>
                </b-row>

                <b-row style="margin-top:10px">
                  <b-col sm="12">
                     <label for="ccnumber"><b> SEMUA INFORMASI HARAP DIISI (DENGAN HURUF BESAR/CETAK).</b> ISI ATAU BERIKAN TANDA   (X)   PADA KOTAK JAWABAN YANG SESUAI
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                  </b-col>
                </b-row>

                <b-tabs v-model="tabIndex">
                    <b-tab title="Data Usaha" active>
                          <b-row style="margin-top:10px; text-align:center;">
                            <b-col sm="12">
                               <label for="ccnumber" style="text-align:center">
                                  <b>Data Usaha</b>
                                </label>
                            </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Pola Penyaluran
                                    <b class="text-danger"> *</b>
                                  </label>
                              </b-col>
                              <b-col sm="2">
                                <b-form-radio v-model="debitorVenture.DistributionPattern" name="pola_penyaluran" value="Perseorangan">Perseorangan</b-form-radio>
                              </b-col>
                              <b-col sm="2">
                                <b-form-radio :disabled="(this.cabang != this.cabangKP )" v-model="debitorVenture.DistributionPattern" name="pola_penyaluran" value="Avalis">Avalis</b-form-radio>
                              </b-col>
                              <b-col sm="2">
                                <b-form-radio v-model="debitorVenture.DistributionPattern" name="pola_penyaluran" value="Channeling"> Channeling</b-form-radio>
                              </b-col>
                         </b-row>



                          <b-row style="margin-top:10px"  v-if="debitorVenture.DistributionPattern == 'Perseorangan' || debitorVenture.DistributionPattern == 'Channeling'">
                             <b-col sm="3">
                                <label for="ccnumber">Nama Pemohon Sesuai Kartu Identitas
                                   <b class="text-danger"> *</b>
                                 </label>
                             </b-col>
                             <b-col sm="9">
                                 <b-form-input v-model="debitor.KTPFullName" type="text" required :class="{'is-invalid': $v.debitor.KTPFullName.$error}"></b-form-input>
                                 <div class="text-danger" v-if="$v.debitor.KTPFullName.$error">Nama Pemohon harus diisi</div>
                             </b-col>
                         </b-row>

                         <b-row style="margin-top:10px" v-if="debitorVenture.DistributionPattern != 'Perseorangan'">
                            <b-col sm="3">
                               <label for="ccnumber">Perusahaan Sinergi/ BUMN/ Lembaga Penyalur
                                  <!-- <b class="text-danger"> *</b> -->
                                </label>
                            </b-col>
                            <b-col sm="9" v-if="debitorVenture.DistributionPattern == 'Channeling'">
                                <b-form-input  v-model="debitorVenture.SynergyCompany" type="text" required></b-form-input>
                            </b-col>
                             <b-col sm="9"  v-if="debitorVenture.DistributionPattern == 'Avalis'">
                               <b-form-select v-model="debitorVenture.SynergyChannelId" :options="options_SynergyChannelId"></b-form-select>

                              <!--  <v-select v-model="debitorVenture.SynergyChannelId" :options="options_SynergyChannelId"></v-select> -->
                            </b-col>
                        </b-row>

                        <!-- <b-row style="margin-top:10px">
                           <b-col sm="3">
                              <label for="ccnumber">Kode Program Kemitraan
                                 <b class="text-danger"> *</b>
                               </label>
                           </b-col>
                           <b-col sm="9">
                               <b-form-input type="text" required></b-form-input>
                           </b-col>
                       </b-row> -->

                       <b-row style="margin-top:10px">
                            <b-col sm="3">
                               <label for="ccnumber">Prinsip Pinjaman
                                  <b class="text-danger"> *</b>
                                </label>
                            </b-col>
                            <b-col sm="2">
                              <b-form-radio v-model="debitorVenture.LoanPrinciple" name="prinsip_pinjaman" value="Konvensional">Konvensional</b-form-radio>
                            </b-col>
                            <b-col sm="2">
                              <b-form-radio v-model="debitorVenture.LoanPrinciple" name="prinsip_pinjaman" value="Bagi Hasil">Bagi Hasil</b-form-radio>
                            </b-col>
                            <b-col sm="2">
                              <b-form-radio v-model="debitorVenture.LoanPrinciple" name="prinsip_pinjaman" value="Jual Beli"> Jual Beli</b-form-radio>
                            </b-col>
                       </b-row>

                        <b-row style="margin-top:50px"  v-if="statusPencairan == null">
                          <b-col sm="12">
                            <div class="form-group form-actions">
                               <b-button @click="tabIndex++;saveDrafDataUsahaPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                            </div>
                          </b-col>
                        </b-row>
                       <b-row style="margin-top:50px"  v-if="statusPencairan != null">
                        <b-col sm="12">
                          <div class="form-group form-actions">
                             <b-button @click="tabIndex++;"  size="md" variant="info">Selanjutnya</b-button>
                          </div>
                        </b-col>
                      </b-row>
                </b-tab>

                <b-tab title="Fasilitas Kredit/Pinjaman" >
                  <b-row style="margin-top:10px; text-align:center;">
                    <b-col sm="12">
                       <label for="ccnumber" style="text-align:center">
                          <b>Fasilitas Kredit/Pinjaman</b>
                        </label>
                    </b-col>
                  </b-row>

                  <!-- <b-row style="margin-top:10px">
                     <b-col sm="3">
                        <label for="ccnumber">Tujuan Program Kemitraan
                           <b class="text-danger"> *</b>
                         </label>
                     </b-col>
                     <b-col sm="9">
                         <b-form-input  v-model="debitor.Activity" type="text" required></b-form-input>
                     </b-col>
                  </b-row> -->

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                       <label for="ccnumber">Jumlah pinjaman :
                          <b class="text-danger"> *</b>
                        </label>
                    </b-col>
                    <b-col sm="9">
                        <!-- <b-form-input  v-model="debitAccount.DebValue" type="number" placeholder="1.500.000" required></b-form-input> -->
                        <money class="form-control" v-model="debitAccount.DebValue" v-bind="money" :class="{'is-invalid': $v.debitAccount.DebValue.$error}"></money>
                        <div class="text-danger" v-if="$v.debitAccount.DebValue.$error">Jumlah pinjaman harus diisi</div>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                      <label for="ccnumber">Jangka waktu pinjaman (tenure) :
                         <b class="text-danger"> *</b>
                       </label>
                   </b-col>
                   <b-col sm="2">
                       <b-form-input  v-model="debitAccount.Tenor" type="number" required :class="{'is-invalid': $v.debitAccount.Tenor.$error}"></b-form-input>
                       <div class="text-danger" v-if="$v.debitAccount.Tenor.$error">Jangka Waktu harus diisi</div>
                   </b-col>
                   <b-col sm="3">
                      <label for="ccnumber">Bulan
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                   </b-col>
                  </b-row>

                  <!-- <b-row style="margin-top:10px">
                  <b-col sm="3">
                     <label for="ccnumber">Anggaran Modal Awal
                        <b class="text-danger"> *</b>
                      </label>
                  </b-col>
                  <b-col sm="9">
                      <b-form-input type="number" placeholder="1.000.000" required></b-form-input>
                      <money class="form-control"  v-bind="money"></money>
                  </b-col>
                  </b-row> -->
                    <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                        <b-col sm="12">
                          <div class="form-group form-actions">
                              <b-button @click="tabIndex--;saveDrafFasilitasKreditPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                             <b-button @click="tabIndex++;saveDrafFasilitasKreditPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                        <b-col sm="12">
                          <div class="form-group form-actions">
                              <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                             <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                          </div>
                        </b-col>
                      </b-row>
                </b-tab>

                <b-tab title="Data Jaminan" >
                  <b-row style="margin-top:10px; text-align:center;">
                  <b-col sm="12">
                     <label for="ccnumber" style="text-align:center">
                        <b>Data Jaminan</b>
                      </label>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                     <label for="ccnumber">Jenis Jaminan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                  </b-col>
                  <b-col sm="9">
                      <b-form-input v-model="debitorCollaterall.CollateralType" type="text" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                      <label for="ccnumber">Luas Tanah / Bangunan
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                   </b-col>
                   <b-col sm="3">
                       <b-form-input v-model="debitorCollaterall.breadth" type="number" required></b-form-input>
                   </b-col>
                   <b-col sm="3">
                      <label for="ccnumber">m2
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                   </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                      <b-col sm="3">
                         <label for="ccnumber">Status Sertifikat
                            <b class="text-danger"> *</b>
                          </label>
                      </b-col>
                      <b-col sm="2">
                        <b-form-radio  v-model="debitorCollaterall.SHMStatus" name="status_sertifikat" value="Hak Milik">Hak Milik</b-form-radio>
                      </b-col>
                      <b-col sm="2">
                        <b-form-radio  v-model="debitorCollaterall.SHMStatus" name="status_sertifikat" value="HGB">HGB</b-form-radio>
                      </b-col>
                      <!-- <b-col sm="2">
                        <b-form-radio v-model="debitorCollaterall.SHMStatus" name="status_sertifikat" value="Strata Title">Strata Title</b-form-radio>
                      </b-col> -->
                      <b-col sm="1">
                        <b-form-radio v-model="debitorCollaterall.SHMStatus" name="status_sertifikat">Lainnya</b-form-radio>

                      </b-col>
                      <b-col sm="4"  v-if= "debitorCollaterall.SHMStatus != 'Hak Milik' && debitorCollaterall.SHMStatus != 'HGB'">
                        <b-form-input v-model="debitorCollaterall.SHMStatus" type="text" required></b-form-input>
                      </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">

                   </b-col>
                 <!--   <b-col sm="1">
                     <label fo --><!-- r="ccnumber">sebutkan -->
                        <!-- <b class="text-danger"> *</b> -->
                     <!--  </label>
                   </b-col>
                   <b-col sm="8">
                     <b-form-input v-model="debitorCollaterall.SHMName" type="text" required></b-form-input>
                   </b-col> -->
                  </b-row>

                  <b-row style="margin-top:10px">
                     <b-col sm="3">
                        <label for="ccnumber">Nomor Sertifikat
                           <!-- <b class="text-danger"> *</b> -->
                         </label>
                     </b-col>
                     <b-col sm="9">
                         <b-form-input v-model="debitorCollaterall.SHMNumber" type="text" required></b-form-input>
                     </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                       <label for="ccnumber">Status Jaminan
                          <!-- <b class="text-danger"> *</b> -->
                        </label>
                    </b-col>
                    <b-col sm="2">
                      <b-form-radio  v-model="debitorCollaterall.CollateralStatus" name="status_jaminan" value="milik sendiri">milik sendiri</b-form-radio>
                    </b-col>
                    <b-col sm="2">
                      <b-form-radio  v-model="debitorCollaterall.CollateralStatus" name="status_jaminan" value="milik orang lain">milik orang lain</b-form-radio>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                      <label for="ccnumber">Alamat jaminan
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                   </b-col>
                   <b-col sm="9">
                     <b-form-textarea
                      id="textarea"
                      v-model="debitorCollaterall.CollateralAddress"
                      placeholder="Enter something..."
                      rows="3"
                      max-rows="6"></b-form-textarea>
                   </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Provinsi
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <v-select  v-model="debitorCollaterall.Province" :options="options_DCProvince"></v-select>
                   </b-col>
                   </b-row>

                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kabupaten/Kota
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <v-select  v-model="debitorCollaterall.District"  :options="options_DCDistrict"></v-select>
                   </b-col>
                   </b-row>

                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kecamatan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <v-select   v-model="debitorCollaterall.SubDistrict"  :options="options_DCSubDistrict"></v-select>
                   </b-col>
                   </b-row>


                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kelurahan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                     <b-form-input v-model="debitorCollaterall.Village" type="text"></b-form-input>
                   </b-col>
                   </b-row>

                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kode Pos
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <b-form-input v-model="debitorCollaterall.PostalCode" type="number" required></b-form-input>
                   </b-col>
                   </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                     <label for="ccnumber"><b>Pemilik Jaminan</b>
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                     <label for="ccnumber">Nama
                        <b class="text-danger"> *</b>
                      </label>
                  </b-col>
                  <b-col sm="9">
                      <b-form-input v-model="debGuarantor.FullName" type="text" required :class="{'is-invalid': $v.debGuarantor.FullName.$error}"></b-form-input>
                      <div class="text-danger" v-if="$v.debGuarantor.FullName.$error">Nama harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Alamat
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-textarea
                    id="textarea"
                    v-model="debGuarantor.Address"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"></b-form-textarea>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Provinsi
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <v-select  v-model="debGuarantor.Province" :options="options_DGProvince"></v-select>
                   </b-col>
                   </b-row>

                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kabupaten/Kota
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <v-select  v-model="debGuarantor.District"  :options="options_DGDistrict"></v-select>
                   </b-col>
                   </b-row>

                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kecamatan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <v-select   v-model="debGuarantor.SubDistrict"  :options="options_DGSubDistrict"></v-select>
                   </b-col>
                   </b-row>


                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kelurahan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                     <b-form-input v-model="debGuarantor.Village" type="text"></b-form-input>
                   </b-col>
                   </b-row>

                   <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Kode Pos
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <b-form-input v-model="debGuarantor.PostalCode" type="number" required></b-form-input>
                   </b-col>
                   </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">No.telepon
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debGuarantor.Phone" type="text" required></b-form-input>
                  </b-col>
                  </b-row>

                  <!-- <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">No. fax penjamin
                      <b class="text-danger"> *</b>
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input v-model="penjamin.FaxNumber" type="text" required></b-form-input>
                  </b-col>
                  </b-row> -->

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber"><b>Untuk jaminan berupa kendaraan :</b>
                     <!-- <b class="text-danger"> *</b> -->
                   </label>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">Merek / Jenis / Tahun
                      <!-- <b class="text-danger"> *</b> -->
                    </label>
                  </b-col>
                  <b-col sm="3">
                    <b-form-input  v-model="debitorCollaterall.Merk" type="text" required></b-form-input>
                  </b-col>
                  <b-col sm="3">
                    <b-form-input  v-model="debitorCollaterall.VehicleType" type="text" required></b-form-input>
                  </b-col>
                  <b-col sm="3">
                    <b-form-input  v-model="debitorCollaterall.ProductionYear" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <!-- <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">No. BPKB / No. Rangka / No. Mesin / No. Polisi
                      <b class="text-danger"> *</b>
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-input type="number" required></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <b-form-input type="number" required></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <b-form-input type="number" required></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <b-form-input type="number" required></b-form-input>
                  </b-col>
                  </b-row> -->

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">No. BPKB
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debitorCollaterall.BPKBNumber" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">No. Rangka
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debitorCollaterall.ChassisNumber" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">No. Mesin
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debitorCollaterall.MachineNumber" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">No. Polisi
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debitorCollaterall.PoliceNumber" type="text" required></b-form-input>
                  </b-col>
                  </b-row>
                  <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--;saveDrafDataJaminanPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++;saveDrafDataJaminanPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                   <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>

                <b-tab title="Data Pemohon" >
                  <b-row style="margin-top:10px; text-align:center;">
                  <b-col sm="12">
                  <label for="ccnumber" style="text-align:center">
                     <b>Data Pemohon</b>
                   </label>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Nama Pemohon Sesuai Kartu Identitas
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input type="text" v-model="debitor.KTPFullName" required disabled></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Nama Panggilan
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input type="text" v-model="debitor.ShortName" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Jenis Kelamin
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="2">
                   <b-form-radio v-model="debitor.Gender" name="jenis_kelamin" value="true">Laki-laki</b-form-radio>
                  </b-col>
                  <b-col sm="2">
                   <b-form-radio v-model="debitor.Gender" name="jenis_kelamin" value="false">Perempuan</b-form-radio>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Tempat & tanggal lahir
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="4">
                     <v-select v-model="debitor.PlaceofBirth"  :options="options_PlaceofBirth"></v-select>
                  </b-col>
                  <b-col sm="4">
                      <date-picker v-model="debitor.DateofBirth" :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                     <!-- <b-form-input v-model="debitor.DateofBirth" type="date" required></b-form-input> -->
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Nomor Kartu Identitas
                       <b class="text-danger"> *</b>
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debitor.IDNumber" type="number" required :class="{'is-invalid': $v.debitor.IDNumber.$error}"></b-form-input>
                     <div class="text-danger" v-if="$v.debitor.IDNumber.$error">Nomor Kartu Identitas harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                     <b-col sm="3">
                        <label for="ccnumber">Nomor Kartu Keluarga :
                           <!-- <b class="text-danger"> *</b> -->
                         </label>
                     </b-col>
                     <b-col sm="9">
                         <b-form-input v-model="debitor.NoKK" type="number" required></b-form-input>
                     </b-col>
                 </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Nomor NPWP
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debitor.NPWPNumber" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Nama gadis ibu kandung
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                     <b-form-input v-model="debitor.MotherName" type="text" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Status perkawinan
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="2">
                   <b-form-radio  v-model="debitor.MaritalStatus" name="status_perkawinan" value="1">Lajang</b-form-radio>
                  </b-col>
                  <b-col sm="2">
                   <b-form-radio v-model="debitor.MaritalStatus" name="status_perkawinan" value="2">Menikah</b-form-radio>
                  </b-col>
                  <b-col sm="2">
                   <b-form-radio v-model="debitor.MaritalStatus" name="status_perkawinan" value="3">Duda/Janda</b-form-radio>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Jumlah tanggungan
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="2">
                     <b-form-input v-model="debitor.NumberOfDependents" type="text" required></b-form-input>
                  </b-col>
                  <b-col sm="3">
                    <label for="ccnumber">Orang
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  </b-row>
                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Pendidikan terakhir
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <b-form-select v-model="debitor.LastEducation"  :options="options_LastEducation"></b-form-select>
                   </b-col>
                   </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Jenis Pekerjaan
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="2">
                   <b-form-radio v-model="debitor.TypeOfWork" name="TypeOfWork" value="Karyawan">Karyawan</b-form-radio>
                  </b-col>
                  <b-col sm="2">
                   <b-form-radio v-model="debitor.TypeOfWork" name="TypeOfWork" value="Wiraswasta">Wiraswasta</b-form-radio>
                  </b-col>
                  <!-- <b-col sm="2">
                   <b-form-radio v-model="debitor.TypeOfWork" name="jenis_pekerjaan" value="Profesional">Ibu Rumah Tangga</b-form-radio>
                  </b-col> -->
                  <b-col sm="1">
                   <b-form-radio v-model="debitor.TypeOfWork" name="TypeOfWork">Lainnya</b-form-radio>
                  </b-col>
                   <b-col sm="4"  v-if= "debitor.TypeOfWork != 'Karyawan' && debitor.TypeOfWork != 'Wiraswasta'">
                     <b-form-input v-model="debitor.TypeOfWork" type="text" required></b-form-input>
                   </b-col>
                  </b-row>

                 <!--  <b-row style="margin-top:10px">
                   <b-col sm="3">

                   </b-col>
                   <b-col sm="1">
                     <label for="ccnumber">sebutkan
                        <b class="text-danger"> *</b>
                      </label>
                   </b-col>
                   <b-col sm="8">
                     <b-form-input v-model="debitor.TypeOfWork" type="text" required></b-form-input>
                   </b-col>
                  </b-row> -->

                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                      <label for="ccnumber">Status rumah
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                   </b-col>
                   <b-col sm="2">
                     <b-form-radio v-model="debitor.HomeOwnStatus" name="status_rumah" value="Milik sendiri">Milik sendiri</b-form-radio>
                   </b-col>
                   <b-col sm="2">
                     <b-form-radio v-model="debitor.HomeOwnStatus" name="status_rumah" value="Keluarga">Keluarga</b-form-radio>
                   </b-col>
                   <b-col sm="3">
                     <b-form-radio v-model="debitor.HomeOwnStatus" name="status_rumah" value="Kontrak/Kos">Kontrak/Kos</b-form-radio>
                   </b-col>

                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">

                   </b-col>
                    <b-col sm="1">
                     <b-form-radio v-model="debitor.HomeOwnStatus" name="status_rumah">Lainnya</b-form-radio>
                   </b-col>
                    <b-col sm="8"  v-if= "debitor.HomeOwnStatus != 'Milik sendiri' && debitor.HomeOwnStatus != 'Keluarga' && debitor.HomeOwnStatus != 'Kontrak/Kos'">
                     <b-form-input v-model="debitor.HomeOwnStatus" type="text" required></b-form-input>
                   </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                     <label for="ccnumber">Alamat tempat tinggal saat ini
                        <b class="text-danger"> *</b>
                      </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-textarea
                     id="textarea"
                     v-model="debitor.Address"
                     placeholder="Enter something..."
                     rows="3"
                     max-rows="6"  :class="{'is-invalid': $v.debitor.Address.$error}"></b-form-textarea>
                     <div class="text-danger" v-if="$v.debitor.Address.$error">Alamat harus diisi</div>
                  </b-col>
                  </b-row>

                 <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Provinsi
                       <b class="text-danger"> *</b>
                     </label>
                  </b-col>
                  <b-col sm="9">
                      <v-select v-model="debitor.Prov_code"  :options="options_Prov_code"  :class="{'is-invalid': $v.debitor.Prov_code.$error}"></v-select>
                       <div class="text-danger" v-if="$v.debitor.Prov_code.$error">Provinsi harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Kabupaten/Kota
                       <b class="text-danger"> *</b>
                     </label>
                  </b-col>
                  <b-col sm="9">
                      <v-select v-model="debitor.Dist_code"  :options="options_Dist_code"  :class="{'is-invalid': $v.debitor.Dist_code.$error}"></v-select>
                       <div class="text-danger" v-if="$v.debitor.Dist_code.$error">Kabupaten/Kota harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Kecamatan
                       <b class="text-danger"> *</b>
                     </label>
                  </b-col>
                  <b-col sm="9">
                      <v-select v-model="debitor.Subdis_code"  :options="options_Subdis_code"  :class="{'is-invalid': $v.debitor.Subdis_code.$error}"></v-select>
                       <div class="text-danger" v-if="$v.debitor.Subdis_code.$error">Kecamatan  harus diisi</div>
                  </b-col>
                  </b-row>


                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Kelurahan
                       <b class="text-danger"> *</b>
                     </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input type="text" v-model="debitor.Village_code"  :class="{'is-invalid': $v.debitor.Village_code.$error}"></b-form-input>
                     <div class="text-danger" v-if="$v.debitor.Village_code.$error">Kelurahan harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Kode Pos
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                      <b-form-input v-model="debitor.PosCode" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">

                   <label for="ccnumber">Alamat sesuai kartu identitas(jika berbeda dengan tempat tinggal saat ini)
                      <b class="text-danger"> *</b>
                    </label>
                  </b-col>
                  <b-col sm="9">
                  <b-form-textarea
                   id="textarea"
                   v-model="debitor.KTPAddress"
                   placeholder="Enter something..."
                   rows="3"
                   max-rows="6"  :class="{'is-invalid': $v.debitor.KTPAddress.$error}"></b-form-textarea>
                    <div class="text-danger" v-if="$v.debitor.KTPAddress.$error">Alamat harus diisi</div>
                  </b-col>
                  </b-row>

                 <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Provinsi
                       <b class="text-danger"> *</b>
                     </label>
                  </b-col>
                  <b-col sm="9">
                      <v-select v-model="debitor.KTPProv_code"  :options="options_KTPProv_code"  :class="{'is-invalid': $v.debitor.KTPProv_code.$error}"></v-select>
                       <div class="text-danger" v-if="$v.debitor.KTPProv_code.$error">Provinsi harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">Kabupaten/Kota
                     <b class="text-danger"> *</b>
                   </label>
                  </b-col>
                  <b-col sm="9">
                    <v-select v-model="debitor.KTPDist_code" :options="options_KTPDist_code"  :class="{'is-invalid': $v.debitor.KTPDist_code.$error}"></v-select>
                     <div class="text-danger" v-if="$v.debitor.KTPDist_code.$error">Kabupaten/Kota harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">Kecamatan
                     <b class="text-danger"> *</b>
                   </label>
                  </b-col>
                  <b-col sm="9">
                    <v-select v-model="debitor.KTPSubdis_code" :options="options_KTPSubdis_code"  :class="{'is-invalid': $v.debitor.KTPSubdis_code.$error}"></v-select>
                     <div class="text-danger" v-if="$v.debitor.KTPSubdis_code.$error">Kecamatan harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">Kelurahan
                     <b class="text-danger"> *</b>
                   </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-input type="text" v-model="debitor.KTPVillage_code"  :class="{'is-invalid': $v.debitor.KTPVillage_code.$error}"></b-form-input>
                    <div class="text-danger" v-if="$v.debitor.KTPVillage_code.$error">Kelurahan harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">Kode Pos
                     <!-- <b class="text-danger"> *</b> -->
                   </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input  v-model="debitor.KTPPosCode" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">No.Telepon
                     <!-- <b class="text-danger"> *</b> -->
                   </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-input v-model="debitor.Phone"  type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">No. HP 1
                     <b class="text-danger"> *</b>
                   </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-input v-model="debitor.Hp1" type="number" required :class="{'is-invalid': $v.debitor.Hp1.$error}"></b-form-input>
                   <div class="text-danger" v-if="$v.debitor.Hp1.$error">No. HP 1 harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">No. HP 2
                     <!-- <b class="text-danger"> *</b> -->
                   </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-input v-model="debitor.Hp2" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <!-- <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">No Facsimile
                     <b class="text-danger"> *</b>
                   </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-input  v-model="debitor.FaxNumber"  type="number" required></b-form-input>
                  </b-col>
                  </b-row> -->

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">Alamat email
                     <!-- <b class="text-danger"> *</b> -->
                   </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-input v-model="debitor.eMail"  type="text" placeholder="b@gmail.com" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                  <label for="ccnumber">Akun Social Media
                     <!-- <b class="text-danger"> *</b> -->
                   </label>
                  </b-col>
                  <b-col sm="9">
                   <b-form-input v-model="debitor.SocialMediaAccount"  type="text" required></b-form-input>
                  </b-col>
                  </b-row>
                  <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--;saveDrafDataPemohonPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++;saveDrafDataPemohonPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                   <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>

                <b-tab title="Data Pendamping/Saksi" >
                  <b-row style="margin-top:10px; text-align:center;">
                  <b-col sm="12">
                  <label for="ccnumber" style="text-align:center">
                    <b>Data Pendamping/Saksi</b>
                  </label>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">Nama Pendamping (sesuai kartu identitas)
                      <b class="text-danger"> *</b>
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input  v-model="debitorEmerg1.FullName"  type="text" required :class="{'is-invalid': $v.debitorEmerg1.FullName.$error}"></b-form-input>
                    <div class="text-danger" v-if="$v.debitorEmerg1.FullName.$error">Nama Pendamping harus diisi</div>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                   <b-col sm="3">
                     <label for="ccnumber">Hubungan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                   </b-col>
                   <b-col sm="9">
                       <b-form-select v-model="debitorEmerg1.Relationship"  :options="options_Hubungan_code"></b-form-select>
                   </b-col>
                   </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">Tempat & tanggal lahir
                      <!-- <b class="text-danger"> *</b> -->
                    </label>
                  </b-col>
                  <b-col sm="4">
                   <!--  <b-form-input v-model="debitorEmerg1.PlaceofBirth"   type="text" required></b-form-inpu -->
                     <v-select v-model="debitorEmerg1.PlaceofBirth"  :options="options_PlaceofBirth"></v-select>
                  </b-col>
                  <b-col sm="4">
                    <date-picker v-model="debitorEmerg1.DateofBirth" :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                    <!-- <b-form-input v-model="debitorEmerg1.DateofBirth" type="date" required></b-form-input> -->
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">Nomor kartu identitas
                      <!-- <b class="text-danger"> *</b> -->
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input v-model="debitorEmerg1.NoKTP" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">Nomor NPWP
                      <!-- <b class="text-danger"> *</b> -->
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input v-model="debitorEmerg1.NoNPWP" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">Jenis Pekerjaan
                      <!-- <b class="text-danger"> *</b> -->
                    </label>
                  </b-col>
                  <b-col sm="2">
                  <b-form-radio v-model="debitorEmerg1.Job" name="jenis_pekerjaan" value="Karyawan">Karyawan</b-form-radio>
                  </b-col>
                  <b-col sm="2">
                  <b-form-radio v-model="debitorEmerg1.Job" name="jenis_pekerjaan" value="Wiraswasta">Wiraswasta</b-form-radio>
                  </b-col>
                  <!-- <b-col sm="2">
                  <b-form-radio v-model="debitorEmerg1.Job" name="jenis_pekerjaan" value="Ibu RUmah Tangga">Ibu Rumah Tangga</b-form-radio>
                  </b-col> -->
                  <b-col sm="1">
                  <b-form-radio v-model="debitorEmerg1.Job" name="jenis_pekerjaan">Lainnya</b-form-radio>
                  </b-col>
                    <b-col sm="4"  v-if= "debitorEmerg1.Job != 'Karyawan' && debitorEmerg1.Job != 'Wiraswasta' ">
                     <b-form-input v-model="debitorEmerg1.Job" type="text" required></b-form-input>
                   </b-col>
                  </b-row>

                 <!--  <b-row style="margin-top:10px">
                   <b-col sm="3">

                   </b-col>
                   <b-col sm="1">
                     <label for="ccnumber">sebutkan
                        <b class="text-danger"> *</b>
                      </label>
                   </b-col>
                   <b-col sm="8">
                     <b-form-input v-model="debitorEmerg1.Job" type="text" required></b-form-input>
                   </b-col>
                  </b-row> -->

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">No.Telepon
                      <!-- <b class="text-danger"> *</b> -->
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input v-model="debitorEmerg1.Phone" type="number" required></b-form-input>
                  </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                  <b-col sm="3">
                   <label for="ccnumber">No. HP
                      <b class="text-danger"> *</b>
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input v-model="debitorEmerg1.Hp" type="number" required  :class="{'is-invalid': $v.debitorEmerg1.Hp.$error}"></b-form-input>
                    <div class="text-danger" v-if="$v.debitorEmerg1.Hp.$error">No. HP harus diisi</div>
                  </b-col>
                  </b-row>
                  <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--;saveDrafDataPendampingPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++;saveDrafDataPendampingPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                   <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>

                <b-tab title="Keluarga Terdekat (yang tidak tinggal serumah)" >
                  <b-row style="margin-top:10px; text-align:center;">
                    <b-col sm="12">
                      <label for="ccnumber" style="text-align:center">
                       <b>Keluarga Terdekat (yang tidak tinggal serumah)</b>
                      </label>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Nama
                         <b class="text-danger"> *</b>
                       </label>
                    </b-col>
                    <b-col sm="9">
                       <b-form-input v-model="debitorEmerg2.FullName" type="text" required  :class="{'is-invalid': $v.debitorEmerg2.FullName.$error}"></b-form-input>
                       <div class="text-danger" v-if="$v.debitorEmerg2.FullName.$error">Nama harus diisi</div>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Alamat tempat tinggal saat ini
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-textarea
                      id="textarea"
                      v-model="debitorEmerg2.Address"
                      placeholder="Enter something..."
                      rows="3"
                      max-rows="6"></b-form-textarea>
                    </b-col>
                  </b-row>


                 <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Provinsi
                       <!-- <b class="text-danger"> *</b> -->
                     </label>
                  </b-col>
                  <b-col sm="9">
                      <v-select v-model="debitorEmerg2.Province"  :options="options_KDProv_code"></v-select>
                  </b-col>
                  </b-row>


                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Kabupaten/Kota
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                    </b-col>
                    <b-col sm="9">
                       <v-select v-model="debitorEmerg2.District" :options="options_KDDist_code"></v-select>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Kecamatan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                    </b-col>
                    <b-col sm="9">
                       <v-select v-model="debitorEmerg2.SubDistrict" :options="options_KDSubdis_code"></v-select>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Kelurahan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input type="text" v-model="debitorEmerg2.Village"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Kode Pos
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                    </b-col>
                    <b-col sm="9">
                       <b-form-input v-model="debitorEmerg2.PostalCode" type="number" required></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">No.Telepon Rumah
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input v-model="debitorEmerg2.Phone" type="number" required></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">No. HP
                        <b class="text-danger"> *</b>
                      </label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input v-model="debitorEmerg2.Hp" type="number" required :class="{'is-invalid': $v.debitorEmerg2.Hp.$error}"></b-form-input>
                      <div class="text-danger" v-if="$v.debitorEmerg2.Hp.$error">No. HP harus diisi</div>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Hubungan dengan Pemohon
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input  v-model="debitorEmerg2.Relationship"  type="text" required></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--;saveDrafKeluargaTerdekatPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++;saveDrafKeluargaTerdekatPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>


                <b-tab title="Data Usaha" >
                              <b-row style="margin-top:10px; text-align:center;">
                                <b-col sm="12">
                                   <label for="ccnumber" style="text-align:center">
                                      <b>Data Usaha</b>
                                    </label>
                                </b-col>
                             </b-row>



                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Nama Pemohon
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input v-model="debitor.KTPFullName" type="text" required disabled></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Jenis Sektor Usaha
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                 <select class="form-control" v-model="debitorVenture.BusinessSector" :class="{'is-invalid': $v.debitorVenture.BusinessSector.$error}">
                                  <option v-for="option in options_BusinessSector" v-bind:value="option.value">
                                    {{ option.label }}
                                  </option>
                                </select>
                                 <div class="text-danger" v-if="$v.debitorVenture.BusinessSector.$error">Jenis Sektor Usaha harus diisi</div>
                                  <!--  <v-select  v-model="debitorVenture.BusinessSector" :options="options_BusinessSector"></v-select> -->
                               </b-col>
                           </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Nama Usaha
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <b-form-input  v-model="debitorVenture.BusinessName" type="text" required :class="{'is-invalid': $v.debitorVenture.BusinessName.$error}"></b-form-input>
                                   <div class="text-danger" v-if="$v.debitorVenture.BusinessName.$error">Nama Usaha harus diisi</div>
                               </b-col>
                           </b-row>



                        <b-row style="margin-top:10px">
                     <b-col sm="3">
                        <label for="ccnumber">Omset / bln
                           <b class="text-danger"> *</b>
                         </label>
                     </b-col>
                     <b-col sm="9">
                         <!-- <b-form-input v-model="debitorVenture.MonthlyIncomeRP" type="number" required></b-form-input> -->
                         <money class="form-control" v-model="debitorVenture.MonthlyIncomeRP" v-bind="money"  :class="{'is-invalid': $v.debitorVenture.MonthlyIncomeRP.$error}" ></money>
                         <div class="text-danger" v-if="$v.debitorVenture.MonthlyIncomeRP.$error">Omset / bln harus diisi</div>
                     </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                         <label for="ccnumber">Persentase kepemilikan
                            <!-- <b class="text-danger"> *</b> -->
                          </label>
                      </b-col>
                      <b-col sm="2">
                          <b-form-input v-model="debitorVenture.PersentaseKepemilikan"  type="number" required></b-form-input>
                      </b-col>
                     <!--  <b-col sm="1">
                        <label f --><!-- or="ccnumber">, -->
                           <!-- <b class="text-danger"> *</b> -->
                        <!--  </label>
                      </b-col>
                      <b-col sm="2">
                          <b-form-input v-model="debitorVenture.PersentaseKepemilikan2" type="number" required></b-form-input>
                      </b-col> -->
                      <b-col sm="1">
                        <label for="ccnumber">%
                           <!-- <b class="text-danger"> *</b> -->
                         </label>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                        <label for="ccnumber">Margin keuntungan bersih
                           <!-- <b class="text-danger"> *</b> -->
                         </label>
                      </b-col>
                      <b-col sm="2">
                         <b-form-input v-model="debitorVenture.MarginKeuntunganBersih" type="number" required></b-form-input>
                      </b-col>
                     <!--  <b-col sm="1">
                       <labe --><!-- l for="ccnumber">, -->
                          <!-- <b class="text-danger"> *</b> -->
                       <!--  </label>
                      </b-col>
                      <b-col sm="2">
                         <b-form-input v-model="debitorVenture.MarginKeuntunganBersih2" type="number" required></b-form-input>
                      </b-col> -->
                      <b-col sm="1">
                       <label for="ccnumber">%
                          <!-- <b class="text-danger"> *</b> -->
                        </label>
                      </b-col>
                    </b-row>

                           <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Alamat Usaha
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                 <b-form-textarea
                                  id="textarea"
                                  v-model="debitorVenture.BusinessAddress"
                                  placeholder="Enter something..."
                                  rows="3"
                                  max-rows="6" :class="{'is-invalid': $v.debitorVenture.BusinessAddress.$error}"></b-form-textarea>
                                  <div class="text-danger" v-if="$v.debitorVenture.BusinessName.$error">Alamat Usaha harus diisi</div>
                               </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Provinsi
                                    <b class="text-danger"> *</b>
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                   <v-select v-model="debitorVenture.Province" :options="options_DVProvince"  :class="{'is-invalid': $v.debitorVenture.Province.$error}"></v-select>
                                    <div class="text-danger" v-if="$v.debitorVenture.Province.$error">Provinsi harus diisi</div>
                              </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Kabupaten/Kota
                                    <b class="text-danger"> *</b>
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                   <v-select v-model="debitorVenture.District" :options="options_DVDistrict" :class="{'is-invalid': $v.debitorVenture.District.$error}"></v-select>
                                    <div class="text-danger" v-if="$v.debitorVenture.District.$error">Kabupaten/Kota harus diisi</div>
                              </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Kecamatan
                                    <b class="text-danger"> *</b>
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                   <v-select v-model="debitorVenture.SubDistrict" :options="options_DVSubDistrict" :class="{'is-invalid': $v.debitorVenture.SubDistrict.$error}"></v-select>
                                    <div class="text-danger" v-if="$v.debitorVenture.SubDistrict.$error">Kecamatan harus diisi</div>
                              </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Kelurahan
                                    <b class="text-danger"> *</b>
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                 <b-form-input v-model="debitorVenture.Village"  type="text" required :class="{'is-invalid': $v.debitorVenture.Village.$error}"></b-form-input>
                                  <div class="text-danger" v-if="$v.debitorVenture.Village.$error">Kelurahan harus diisi</div>
                              </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Kode Pos
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                   <b-form-input v-model="debitorVenture.PostalCode"  type="number" required></b-form-input>
                              </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                           <b-col sm="3">
                              <label for="ccnumber">Nomor Surat Keterangan Usaha :
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                           </b-col>
                           <b-col sm="6">
                               <b-form-input v-model="debitorVenture.BusinessCertificateNumber" type="number" required></b-form-input>
                           </b-col>
                           <b-col sm="3">
                              <label for="ccnumber">dari kelurahan/desa
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                           </b-col>
                       </b-row>

                         <b-row style="margin-top:10px">
                            <b-col sm="3">
                               <label for="ccnumber">Ijin Usaha:
                                  <b class="text-danger"> *</b>
                                </label>
                            </b-col>
                            <b-col sm="9">
                               <!--  <b-form-input  v-model="debitorVenture.BusinessLicenseNumber" type="number" required></b-form-input> -->
                                <b-form-input  v-model="debitorVenture.BusinessLicense"  type="text" required :class="{'is-invalid': $v.debitorVenture.BusinessLicense.$error}"></b-form-input>
                                <div class="text-danger" v-if="$v.debitorVenture.BusinessLicense.$error">Ijin Usaha harus diisi</div>
                            </b-col>
                        </b-row>

                         <b-row style="margin-top:10px">
                            <b-col sm="3">
                               <label for="ccnumber">Nomor Surat Ijin Usaha (SIUP):
                                  <b class="text-danger"> *</b>
                                </label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input  v-model="debitorVenture.BusinessLicenseNumber" type="text" required :class="{'is-invalid': $v.debitorVenture.BusinessLicenseNumber.$error}"></b-form-input>
                                <div class="text-danger" v-if="$v.debitorVenture.BusinessLicenseNumber.$error">Nama Usaha harus diisi</div>
                            </b-col>
                        </b-row>


                         <!-- <b-row style="margin-top:10px">
                            <b-col sm="3">
                               <label for="ccnumber">Tujuan Program Kemitraan
                                  <b class="text-danger"> *</b>
                                </label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input  v-model="debitor.Activity" type="text" required></b-form-input>
                            </b-col>
                        </b-row> -->

                        <!-- <b-row style="margin-top:10px">
                             <b-col sm="3">
                                <label for="ccnumber">No Facsimile Kantor
                                   <b class="text-danger"> *</b>
                                 </label>
                             </b-col>
                             <b-col sm="9">
                                 <b-form-input v-model="debitorVenture.FaxNumber" type="number" required></b-form-input>
                             </b-col>
                        </b-row> -->

                        <!-- <b-row style="margin-top:10px">
                           <b-col sm="3">
                              <label for="ccnumber">Unit Kerja
                                 <b class="text-danger"> *</b>
                               </label>
                           </b-col>
                           <b-col sm="9">
                               <b-form-input v-model="debitorVenture.TotalEmployee" type="text" required></b-form-input>
                           </b-col>
                       </b-row> -->




                       <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                        <b-col sm="12">
                          <div class="form-group form-actions">
                              <b-button @click="tabIndex--;saveDrafDataUsahaPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                             <b-button @click="tabIndex++;saveDrafDataUsahaPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                          </div>
                        </b-col>
                      </b-row>
                       <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                        <b-col sm="12">
                          <div class="form-group form-actions">
                              <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                             <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                          </div>
                        </b-col>
                      </b-row>
                </b-tab>

                  <b-tab title="Untuk Wiraswasta/Profesi" >
                    <b-row style="margin-top:10px; text-align:center;">
                      <b-col sm="12">
                         <label for="ccnumber" style="text-align:center">
                            <b>Untuk Wiraswasta/Profesi</b>
                          </label>
                      </b-col>
                    </b-row>

                    <!-- <b-row style="margin-top:10px">
                      <b-col sm="3">
                         <label for="ccnumber">Nama Jaminan -->
                            <!-- <b class="text-danger"> *</b> -->
                          <!-- </label>
                      </b-col>
                      <b-col sm="9">
                          <b-form-input  v-model="debitorVenture.NameGuarantee" type="text" required></b-form-input>
                      </b-col>
                    </b-row> -->
                    <b-row style="margin-top:10px">
                      <b-col sm="6">
                        <label for="ccnumber"><b>Data pekerjaan sebelumnya (wajib diisi jika bekerja/berusaha < 2 th)</b>
                           <!-- <b class="text-danger"> *</b> -->
                         </label>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                       <label for="ccnumber">Nama perusahaan
                          <!-- <b class="text-danger"> *</b> -->
                        </label>
                      </b-col>
                      <b-col sm="9">
                          <input type="hidden" v-model="debProfession1.DebProfessionID">
                         <!-- <b-form-input v-model="debProfession1.DebProfessionID" type="" required></b-form-input> -->
                        <b-form-input v-model="debProfession1.CompanyName" type="text" required></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Jenis usaha
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                      </b-col>
                      <b-col sm="9">
                       <b-form-input v-model="debProfession1.BussinessType" type="text" required></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Jabatan
                        <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="9">
                      <b-form-input  v-model="debProfession1.Position" type="text" required></b-form-input>
                      </b-col>
                    </b-row>

                    <!-- <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Unit Kerja -->
                       <!-- <b class="text-danger"> *</b> -->
                      <!-- </label>
                      </b-col>
                      <b-col sm="9">
                      <b-form-input v-model="debProfession1.JobUnit" type="text" required></b-form-input>
                      </b-col>
                    </b-row> -->

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Nomor telepon
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="9">
                      <b-form-input  v-model="debProfession1.Phone"  type="number" required></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Bekerja sejak
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="2">
                      <b-form-input v-model="debProfession1.WorkSinceMonth" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="1">
                      <label for="ccnumber">(bulan)
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="2">
                      <b-form-input v-model="debProfession1.WorkSinceYear" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="1">
                      <label for="ccnumber">(tahun)
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                    </b-row>
<!--
                    <b-row style="margin-top:10px">
                      <b-col sm="6">
                      <label for="ccnumber"><b>Data pekerjaan sebelumnya (wajib diisi jika bekerja/berusaha < 2 th)</b> -->
                        <!-- <b class="text-danger"> *</b> -->
                    <!--   </label>
                      </b-col>
                    </b-row>
 -->
                   <!--  <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Nama perusahaan -->
                       <!-- <b class="text-danger"> *</b> -->
                     <!--  </label>
                      </b-col>
                      <b-col sm="9">
                        <input type="hidden" v-model="debProfession2.DebProfessionID"> -->
                        <!-- <b-form-input v-model="debProfession2.DebProfessionID" type="text" required></b-form-input> -->
                     <!--  <b-form-input v-model="debProfession2.CompanyName" type="text" required></b-form-input>
                      </b-col>
                    </b-row> -->

                    <!-- <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Jenis usaha -->
                      <!-- <b class="text-danger"> *</b> -->
                     <!--  </label>
                      </b-col>
                      <b-col sm="9">
                      <b-form-input v-model="debProfession2.BussinessType" type="text" required></b-form-input>
                      </b-col>
                    </b-row> -->

                   <!--  <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Jabatan -->
                      <!-- <b class="text-danger"> *</b> -->
                     <!--  </label>
                      </b-col>
                      <b-col sm="9">
                      <b-form-input v-model="debProfession2.Position" type="text" required></b-form-input>
                      </b-col>
                    </b-row> -->

                    <!-- <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Unit Kerja -->
                      <!-- <b class="text-danger"> *</b> -->
                     <!--  </label>
                      </b-col>
                      <b-col sm="9">
                      <b-form-input v-model="debProfession2.JobUnit"  type="text" required></b-form-input>
                      </b-col>
                    </b-row> -->
<!--
                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Nomor telepon -->
                      <!-- <b class="text-danger"> *</b> -->
                      <!-- </label>
                      </b-col>
                      <b-col sm="9">
                      <b-form-input v-model="debProfession2.Phone" type="number" required></b-form-input>
                      </b-col>
                    </b-row> -->

                    <!-- <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Bekerja sejak -->
                      <!-- <b class="text-danger"> *</b> -->
                   <!--    </label>
                      </b-col>
                      <b-col sm="2">
                      <b-form-input v-model="debProfession2.WorkSinceMonth" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="1">
                      <label for="ccnumber">(bulan) -->
                      <!-- <b class="text-danger"> *</b> -->
                     <!--  </label>
                      </b-col>
                      <b-col sm="2">
                      <b-form-input v-model="debProfession2.WorkSinceYear" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="1">
                      <label for="ccnumber">(tahun) -->
                      <!-- <b class="text-danger"> *</b> -->
                     <!--  </label>
                      </b-col>
                    </b-row> -->
                    <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--;saveDrafWiraswastaPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++;saveDrafWiraswastaPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                   <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                  </b-tab>

                  <b-tab title="Data Penghasilan" >
                    <b-row style="margin-top:10px; text-align:center;">
                      <b-col sm="12">
                      <label for="ccnumber" style="text-align:center">
                      <b>Data Penghasilan</b>
                      </label>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Joint Income
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                      </b-col>
                      <b-col sm="2">
                      <b-form-radio v-model="IncomeData.JointIncome" name="joint_income" value="true">Ya</b-form-radio>
                      </b-col>
                      <b-col sm="2">
                      <b-form-radio v-model="IncomeData.JointIncome" name="joint_income" value="false">Tidak</b-form-radio>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Penghasilan Pemohon
                       <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="9">
                      <!-- <b-form-input type="number" required></b-form-input> -->
                      <money class="form-control" v-model="IncomeData.ApplicantsIncome" v-bind="money"></money>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Penghasilan suami/istri
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="9">
                      <!-- <b-form-input type="number" required></b-form-input> -->
                      <money class="form-control" v-model="IncomeData.HusbandWifeIncome" v-bind="money"></money>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Penghasilan tambahan
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="9">
                      <!-- <b-form-input type="number" required></b-form-input> -->
                      <money class="form-control" v-model="IncomeData.AdditionalIncome" v-bind="money"></money>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Biaya rumah tangga
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="9">
                      <!-- <b-form-input type="number" required></b-form-input> -->
                      <money class="form-control" v-model="IncomeData.HouseholdExpenses" v-bind="money"></money>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Angsuran Lainnya
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="9">
                      <!-- <b-form-input type="number" required></b-form-input> -->
                      <money class="form-control" v-model="IncomeData.OtherInstallments" v-bind="money"></money>
                      </b-col>
                    </b-row>
                    <b-row style="margin-top:50px"  v-if=" statusPencairan == null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--;saveDrafDataPenghasilanPemohonan()"  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++;saveDrafDataPenghasilanPemohonan()"  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row style="margin-top:50px"  v-if=" statusPencairan != null">
                    <b-col sm="12">
                      <div class="form-group form-actions">
                          <b-button @click="tabIndex--; "  size="md" variant="info">Sebelumnya</b-button>
                         <b-button @click="tabIndex++; "  size="md" variant="info">Selanjutnya</b-button>
                      </div>
                    </b-col>
                  </b-row>
                  </b-tab>

                  <b-tab title="Data Bank Pemohon" >
                    <b-row style="margin-top:10px; text-align:center;">
                      <b-col sm="12">
                      <label for="ccnumber" style="text-align:center">
                      <b>Data Bank Pemohon</b>
                      </label>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Menjadi nasabah Bank sejak
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="2">
                      <b-form-input v-model="AppBankData.Month" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="1">
                      <label for="ccnumber">(bulan)
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="2">
                      <b-form-input v-model="AppBankData.Year" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="1">
                      <label for="ccnumber">(tahun)
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      </b-col>
                      <b-col sm="3">
                      <label for="ccnumber">Nama Bank
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="3">
                      <label for="ccnumber">Nomor Rekening/Kartu
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="3">
                      <label for="ccnumber">Saldo/Limit
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Tabungan / Giro
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="3">
                      <b-form-input v-model="AppBankData.BankName1" type="text" required></b-form-input>
                      </b-col>
                      <b-col sm="3">
                      <b-form-input v-model="AppBankData.CardNumber1" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="3">
                      <!-- <b-form-input v-model="AppBankData.BalanceLimit1" type="number" required></b-form-input> -->
                      <money class="form-control" v-model="AppBankData.BalanceLimit1" v-bind="money"></money>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Tabungan / Giro
                      <!-- <b class="text-danger"> *</b> -->
                      </label>
                      </b-col>
                      <b-col sm="3">
                      <b-form-input v-model="AppBankData.BankName2" type="text" required></b-form-input>
                      </b-col>
                      <b-col sm="3">
                      <b-form-input  v-model="AppBankData.CardNumber2" type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="3">
                      <!-- <b-form-input v-model="AppBankData.BalanceLimit2" type="number" required></b-form-input> -->
                      <money class="form-control" v-model="AppBankData.BalanceLimit2" v-bind="money"></money>
                      </b-col>
                    </b-row>

                    <!-- <b-row style="margin-top:10px">
                      <b-col sm="3">
                      <label for="ccnumber">Kredit/Pinjaman
                      <b class="text-danger"> *</b>
                      </label>
                      </b-col>
                      <b-col sm="3">
                      <b-form-input type="text" required></b-form-input>
                      </b-col>
                      <b-col sm="3">
                      <b-form-input type="text" required></b-form-input>
                      </b-col>
                      <b-col sm="3">
                      <b-form-input type="text" required></b-form-input>
                      </b-col>
                    </b-row> -->

                    <b-row style="margin-top:30px"  v-if="status != 'Ubah' && statusPencairan == null">
                      <b-col sm="3">
                      </b-col>
                      <b-col sm="3">
                        <div class="form-group form-actions">
                          <b-button type="submit" size="md" variant="light" v-on:click="saveDrafPemohonan()" :disabled="klik">Simpan Draf</b-button>
                          <b-button type="button" size="md" variant="primary" v-on:click="savePemohonan()" :disabled="klik">Proses</b-button>
                        </div>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top:30px" v-if="status == 'Ubah' && statusPencairan == null">
                      <b-col sm="3">
                      </b-col>
                      <b-col sm="3">
                        <div class="form-group form-actions">
                          <b-button type="submit" size="md" variant="primary" v-on:click="saveDrafPemohonan()" :disabled="klik">Ubah</b-button>
                        </div>
                      </b-col>
                    </b-row>

                  </b-tab>

                </b-tabs>
              </b-card>
          </b-col>
      </b-row>
      <b-row>
          <b-modal ref="my-modal" hide-footer title="Keterangan Data Yang Tidak Boleh Kosong">
            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.debitor.KTPFullName.$error"> [Data Usaha] Nama Pemohon Sesuai Kartu Identitas </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.debitorVenture.BusinessName.$error"> [Data Usaha] Nama Usaha </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.debitorVenture.BusinessAddress.$error"> [Data Usaha] Alamat Usaha </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.debitorVenture.BusinessLicense.$error"> [Data Usaha] Ijin Usaha </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorVenture.BusinessLicenseNumber.$error"> [Data Usaha] Nomor Surat Ijin Usaha (SIUP) </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorVenture.Province.$error"> [Data Usaha] Provinsi </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorVenture.District.$error"> [Data Usaha] Kabupaten/Kota </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorVenture.SubDistrict.$error"> [Data Usaha] Kecamatan </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorVenture.Village.$error"> [Data Usaha] Kelurahan </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.debitorVenture.BusinessSector.$error"> [Data Usaha] Jenis Sektor Usaha </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorVenture.MonthlyIncomeRP.$error"> [Data Usaha] Omset / bln </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="!$v.debitAccount.Tenor.required"> [Fasilitas Kredit/Pinjaman] Jangka waktu pinjaman (tenure) </label>
            </b-col>
            <b-col sm="12">
              <label for="ccnumber" v-if="!$v.debitAccount.Tenor.between"> [Fasilitas Kredit/Pinjaman] Jangka waktu pinjaman (tenure) Harus Antara {{$v.debitAccount.Tenor.$params.between.min}} dan {{$v.debitAccount.Tenor.$params.between.max}}</label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitAccount.DebValue.$error">  [Fasilitas Kredit/Pinjaman] Jumlah pinjaman </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.debGuarantor.FullName.$error"> [Data Jaminan] Nama </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.IDNumber.$error"> [Data Pemohon] Nomor Kartu Identitas   </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.Hp1.$error"> [Data Pemohon] No. HP 1  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.Prov_code.$error"> [Data Pemohon] Provinsi  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.Dist_code.$error"> [Data Pemohon] Kabupaten/Kota  </label></b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.Subdis_code.$error"> [Data Pemohon] Kecamatan  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.Village_code.$error"> [Data Pemohon] Kelurahan  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.Address.$error"> [Data Pemohon] Alamat tempat tinggal saat ini  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.KTPProv_code.$error"> [Data Pemohon] Provinsi  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.KTPDist_code.$error"> [Data Pemohon] Kabupaten/Kota  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.KTPSubdis_code.$error"> [Data Pemohon] Kecamatan  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.KTPVillage_code.$error"> [Data Pemohon] Kelurahan  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitor.KTPAddress.$error"> [Data Pemohon] Alamat sesuai kartu identitas(jika berbeda dengan tempat tinggal saat ini)  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorEmerg1.Hp.$error"> [Data Pendamping/Saksi] No. HP  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorEmerg1.FullName.$error"> [Data Pendamping/Saksi] Nama Pendamping (sesuai kartu identitas)  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorEmerg2.Hp.$error"> [Keluarga Terdekat (yang tidak tinggal serumah)] No. HP  </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber" v-if="$v.debitorEmerg2.FullName.$error"> [Keluarga Terdekat (yang tidak tinggal serumah)] Nama  </label>
            </b-col>
            <b-button class="mt-2" variant="success" block @click="hideModal">OK</b-button>
          </b-modal>
      </b-row>
  </div>
</template>
<script>
  import moment from 'moment'
  import { required, minLength, between } from "vuelidate/lib/validators";
  import apiProvinsi from '@/api/BPM/ProvinsiApiService';
  import apiKotaKab from '@/api/BPM/KotaKabApiService';
  import apiKecamatan from '@/api/BPM/KecamatanApiService';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiApprovalWorkflow from '@/api/BL/ApprovalWorkflowApiService';
  import apiBLApproval from '@/api/PK/PKApprovalApiService';
  import apiBLApprovalWorkflow from '@/api/PK/PKApprovalWorkflowApiService';
  import apiDebitorCollaterall from '@/api/PK/DebitorCollaterallApiService';
  import apiDebGuarantor from '@/api/PK/DebGuarantorApiService';
  import apiDebitorEmerg from '@/api/PK/DebitorEmergApiService';
  import apiDebitorVenture from '@/api/PK/DebitorVentureApiService';
  import apiDebProfession from '@/api/PK/DebProfessionApiService';
  import apiPKSector from '@/api/PK/PKSectorApiService';
  import apiIncomeData from '@/api/PK/IncomeDataApiService';
  import apiAppBankData from '@/api/PK/AppBankDataApiService';
  import apiChannelPartner from '@/api/PK/ChannelPartnerApiService';
  import apiDebitAccountWorkFlow from '@/api/PK/DebitAccountWorkFlowApiService';
  import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
  import dynamic from '@/api/DynamicApiService';
  import {Money} from 'v-money'
  export default {
   data() {
      return {
        cabangKP : 9900,
        loading:false,
        klik:false,
        status:'insert',
        statusPencairan:null,
        cabang:null,
        username:null,
        DebitAccountWorkFlow:{},
         tabIndex: 1,
        DebCode:null,
        options:[],
        selected:null,
        selectedM:0,
        SynergyChannelId:null,
        debitAccountState:{},
        configConfirm:null,
        textConfirm:null,
        AppBankData:{
           DebCode: null
         },
        IncomeData:{
           DebCode: null
         },
        debProfession1:{
           DebCode: null,
           DebProfessionID:null,

          // BussinessType: "Petani",
          // CompanyName: "PTM  120",
          // JobUnit: "123",
          // Phone: "098765435",
          // Position: "Direktur",
          // WorkSinceYear: "5",
          // WorkSinceMonth:"6"
        },
        debProfession2:{
           DebCode: null,
           DebProfessionID:null,

          // BussinessType: "Petani2",
          // CompanyName: "PTM 122",
          // JobUnit: "1234",
          // Phone: "0768765435",
          // Position: "Employ",
          // WorkSinceYear: "5",
          // WorkSinceMonth:"6"
        },
        debitorEmerg1:{
          DebCode: null,
          Job:'Karyawan',
          isAddressDeb:true,

          // DateofBirth: this.formatDate(new Date()),

          // FullName: "Konan Duri",
          // Hp: "908765454",
          // NoKTP: "80976543",
          // NoNPWP: "09876543",
          // Phone: "09876543",
          // PlaceofBirth: "Surakarta",
          // Relationship: "Suami/Istri",
        },
        debitorEmerg2:{
           DebCode: null,
          isAddressDeb:false,

          // Address: "Jl.Baru",
          // FullName: "Sulistina",
          // Hp: "09876542343",
          // Phone: "09876543",
          // PostalCode: "654344",
          // Relationship: "Kerabat",
          // Village: "Cingka"
        },
        debitor:{
          Prov_code: null,
          Dist_code: null,
          Subdis_code: null,
          KTPProv_code: null,
          KTPDist_code: null,
          KTPSubdis_code: null,
          DebCode: null,
          DateRegistration:new Date(),
          DateProposal:new Date(),
          Flag:1,
          Gender:true,
          MaritalStatus:1,
          TypeOfWork:'Karyawan',
          HomeOwnStatus:'Milik sendiri',
          // DateofBirth: this.formatDate(new Date()),

          // Activity: "Pembangunan",
          // Address: "Jl. Melati",
          // FaxNumber: "987667",
          // FullName: "Mardiana",
          // Gender: true,
          // HP1: "098765432",
          // HP2: "09876543",
          // IDNumber: "98765432",
          // KTPAddress: "Jl. Putih Melati",
          // KTPFullName: "Jono Andara",
          // KTPPosCode: "654324",
          // KTPVillage_code: "Cinangka",
          // LastEducation: "Tamat SD",
          // MotherName: "Erni",
          // NPWPNumber: "987654354",
          // NumberOfDependents: "86754345",
          // Phone: "897654354",
          // PosCode: "098765",
          // SocialMediaAccount: "Joni Andara",
          // Village_code: "Cinagka 12",
          // eMail: "jono@gmail.com",
          // NoKK:"90876543456"
        },
        debitorVenture:{
           DebCode: null,
          DistributionPattern: 'Perseorangan',
          LoanPrinciple: 'Konvensional',

          // BusinessAddress: "Jl. Mawar Melati",
          // BusinessCertificateNumber: "87654321",
          // BusinessName: "Pertanian",
          // MarginKeuntunganBersih1: "121",
          // MarginKeuntunganBersih2: "11",
          // MonthlyIncomeRP: "100000",
          // PersentaseKepemilikan1: "11",
          // PersentaseKepemilikan2: "11",
          // PostalCode: "543332",
          // SynergyCompany: "PTM",
          // TotalEmployee: "3",
          // Village: "Cimang",
          // BusinessLicenseNumber:"09876543433",
          // FaxNumber: "987667"
        },
        debGuarantor:{
           DebCode: null,

          //  Address: "JL. Putih Biru",
          // FullName: "Farniana",
          // Phone: "098765435"
        },
        debitorCollaterall:{
           DebCode: null,
          SHMStatus: 'Hak Milik',
          CollateralStatus:'milik sendiri',


          // BPKBNumber: "98765436",
          // ChassisNumber: "87654365",
          // CollateralAddress: "Jl Murah Raya",
          // CollateralType: "Pembangunan",
          // MachineNumber: "98786756543",
          // Merk: "Honda",
          // PoliceNumber: "76766",
          // ProductionYear: "2000",
          // SHMName: "Jiana",
          // SHMNumber: "987654323",
          // VehicleType: "Rumah Baru",
          // breadth: "Jabatan"
        },
        debitAccount:{
          DACode: null,
          DebCode:null,

          // DebValue:500000,

          InterestRate:3,

          // Tenor:2,

          // StlmCycle:0,
          // StlmBillvalue:0,
          // OutstandingBal:0,
          // Arrears:0,
          // LateFromDue:0,
          // Collectability:0,
          // IsCompleted:false

        },
        BLApprovalWorkflow:{
            DACode:null,
            Sequence:0,
            Pos_Name:null,
            ReqDate:null,
            ReqType:null
        },
        BLApproval:{
            DACode:null,
            Value:0,
            CurrentPosition:'Staf Pusat'
        },
        options_Dist_code:[],
        options_Subdis_code:[],
        options_Hubungan_code:[
            { text: 'Suami/Istri', value: 'Suami/Istri' },
            { text: 'Anak', value: 'Anak' },
            { text: 'Saudara Sekandung', value: 'Saudara Sekandung' },
            { text: 'Orang Tua', value: 'Orang Tua' }
        ],
         options_Prov_code:[],
          options_KTPDist_code:[],
        options_KTPSubdis_code:[],
         options_KTPProv_code:[],
           options_KDDist_code:[],
        options_KDSubdis_code:[],
         options_KDProv_code:[],
          options_LastEducation:[
            { text: 'Tidak/Belum Tamat SD', value: 'Tidak/Belum Tamat SD' },
            { text: 'Tamat SD', value: 'Tamat SD' },
            { text: 'Tamat SLTP', value: 'Tamat SLTP' },
            { text: 'Tamat SLTA', value: 'Tamat SLTA' },
            { text: 'Diploma - D1/D3/D4', value: 'Diploma - D1/D3/D4' },
            { text: 'Strata 1', value: 'Strata 1' },
            { text: 'Strata 2/3', value: 'Strata 2/3' }
          ],
          options_PlaceofBirth:[],
           options_DVProvince:[],
          options_DVDistrict:[],
        options_DVSubDistrict:[],
           options_DGProvince:[],
          options_DGDistrict:[],
        options_DGSubDistrict:[],
         options_DCProvince:[],
          options_DCDistrict:[],
        options_DCSubDistrict:[],
        options_BusinessSector:[],
        options_SynergyChannelId:[],
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'Rp. ',
            suffix: '',
            precision: 2,
            masked: false
          },
      }
    },
    validations: {
        debitorVenture: {
          BusinessName: { required },
          BusinessAddress: { required },
          BusinessLicense: { required },
          BusinessLicenseNumber: { required },
          Province: { required },
          District: { required },
          SubDistrict: { required },
          Village: { required },
          BusinessSector: { required },
          MonthlyIncomeRP: { required, minLength: minLength(3) },
        },
        debitAccount:{
          Tenor: { required, between: between(1, 36) },
          DebValue: { required, minLength: minLength(3) }
        },
        debitor:{
          KTPFullName:{ required },
          IDNumber:{ required },
          Hp1:{ required },
          Prov_code:{ required },
          Dist_code:{ required },
          Subdis_code:{ required },
          Village_code:{ required },
          Address:{ required },
          KTPProv_code:{ required },
          KTPDist_code:{ required },
          KTPSubdis_code:{ required },
          KTPVillage_code:{ required },
          KTPAddress:{ required },
        },
        debGuarantor:{
          FullName:{ required },
        },
        debitorEmerg1:{
          Hp:{ required },
          FullName:{ required },
        },
         debitorEmerg2:{
          Hp:{ required },
          FullName:{ required },
        }
      },
    watch:{
       'debitor.Prov_code': async function () {
          if(this.debitor.Prov_code.value){
           this.getAllComboboxKotaKab(this.debitor.Prov_code.value)
          }
       },
       'debitor.Dist_code': async function(){
        if(this.debitor.Dist_code.value){
          this.getAllComboboxKecamatan(this.debitor.Dist_code.value)
        }
       },
       'debitor.KTPProv_code': async function () {
          if(this.debitor.KTPProv_code.value){
           this.getAllComboboxKotaKabKTP(this.debitor.KTPProv_code.value)
          }
       },
       'debitor.KTPDist_code': async function(){
          if(this.debitor.KTPDist_code.value){
            this.getAllComboboxKecamatanKTP(this.debitor.KTPDist_code.value)
          }
       },
        'debitorEmerg2.Province': async function () {
          if(this.debitorEmerg2.Province.value){
           this.getAllComboboxKotaKabKD(this.debitorEmerg2.Province.value)
          }
       },
       'debitorEmerg2.District': async function(){
          if(this.debitorEmerg2.District.value){
            this.getAllComboboxKecamatanKD(this.debitorEmerg2.District.value)
          }
       },
       'debitorVenture.Province': async function () {
          if(this.debitorVenture.Province.value){
           this.getAllComboboxDVKotaKab(this.debitorVenture.Province.value)
          }
       },
       'debitorVenture.District': async function(){
          if(this.debitorVenture.District.value){
            this.getAllComboboxDVKecamatan(this.debitorVenture.District.value)
          }
       },
        'debGuarantor.Province': async function () {
          if(this.debGuarantor.Province.value){
           this.getAllComboboxDGKotaKab(this.debGuarantor.Province.value)
          }
       },
       'debGuarantor.District': async function(){
          if(this.debGuarantor.District.value){
            this.getAllComboboxDGKecamatan(this.debGuarantor.District.value)
          }
       },
        'debitorCollaterall.Province': async function () {
          if(this.debitorCollaterall.Province.value){
           this.getAllComboboxDCKotaKab(this.debitorCollaterall.Province.value)
          }
       },
       'debitorCollaterall.District': async function(){
          if(this.debitorCollaterall.District.value){
            this.getAllComboboxDCKecamatan(this.debitorCollaterall.District.value)
          }
       },
       'debitorVenture.DistributionPattern': async function(){
          if(this.debitorVenture.DistributionPattern != 'Avalis'){
            this.debitor.KTPFullName = null
            this.debitorVenture.SynergyChannelId = null
          }
       },
        'debitorVenture.SynergyChannelId': async function(){
            this.cekOpenAccount(this.debitorVenture.SynergyChannelId);
            var SynergyCompany = await apiChannelPartner.getAllById(this.debitorVenture.SynergyChannelId)
             if(SynergyCompany[0]){
                this.debitor.KTPFullName = SynergyCompany[0].ChnlName
             }
       }
      },
     async created() {
       this.loading = true
      this.DebCode = this.$route.params.DebCode;
      this.DACode = this.$route.params.DACode;
      this.status =  this.$route.params.Mode;
       this.username = localStorage.username
      this.cabang = localStorage.cabang
      // var autoincDebitor = await dynamic.getCount('debitor/CountByDebcCode')
      // var autoincDebitorAccount = await dynamic.getCount('debitAccount/CountByDACode')
      // this.debitor.NoReference = new Date().getFullYear()+'.'+new Date().getMonth()+'.PK-KPO.'+autoincDebitor.Total
      // this.debitor.DebCode = 'PK'+autoincDebitor.Total
      // this.debitAccount.DACode = 'DAPK'+autoincDebitorAccount[0].Total

       this.getAllComboboxProvinsi()
       // this.getAllComboboxProvinsiKTP()
       // this.getAllComboboxProvinsiKD()
       // this.getAllComboboxDCProvinsi()
       this.getAllComboboxKotaKabPlaceofBirth()
       this.getAllComboboxDVProvinsi()
       // this.getAllComboboxDGProvinsi()
       this.getAllComboboxPKSector()
       this.getAllComboboxChannel()
      this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
      this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
        if(this.DACode){
             var getDebitAccountWorkFlow = await apiDebitAccountWorkFlow.getOneByDACode(this.DACode)
             if(getDebitAccountWorkFlow.Data[0]){
                this.DebitAccountWorkFlow = getDebitAccountWorkFlow.Data[0]
                if(getDebitAccountWorkFlow.Data[0].TanggalPencairan){
                   this.statusPencairan = getDebitAccountWorkFlow.Data[0].TanggalPencairan
                }
                console.log("WorkFlow",this.DebitAccountWorkFlow)
             }
              let dataBLApproval = await apiBLApproval.getOneByDACode(this.DACode)
              if(dataBLApproval.Data){
                this.BLApproval = dataBLApproval.Data
                console.log("Approval",dataBLApproval.Data)
              }

          }

       console.log("DACODE",this.DACode)
      if(this.DebCode != undefined){
          var getDebitur = await apiDebitor.getAllOne(this.DebCode)
           this.debitor = getDebitur.Data[0]
           console.log("DEBITUR",this.debitor)
           if(getDebitur.Data[0].DateProposal){
                  this.debitor.DateProposal = this.formatDateDMY(getDebitur.Data[0].DateProposal)
           }
           if(getDebitur.Data[0].DateRegistration){
                  this.debitor.DateRegistration = this.formatDateDMY(getDebitur.Data[0].DateRegistration)
           }
           if(getDebitur.Data[0].IDNumber){
             this.debitor.IDNumber = Number(getDebitur.Data[0].IDNumber)
           }
           if(getDebitur.Data[0].Hp1){
             this.debitor.HP1 = Number(getDebitur.Data[0].Hp1)
           }
           if(getDebitur.Data[0].HP2){
             this.debitor.HP1 = Number(getDebitur.Data[0].Hp1)
           }

           // if(getDebitur.Data[0].DateofBirth){
           //   this.debitor.DateofBirth = getDebitur.Data[0].DateofBirth
           // }

           var getDebitAccount = await apiDebitAccount.getByDEBCode(this.DebCode)
           if(getDebitAccount.Data[0]){
               this.debitAccount = getDebitAccount.Data[0]
             if(getDebitAccount.Data[0].DACode){
               let dataDebitAccountState = await apiDebitAccountState.getOneByDACode(getDebitAccount.Data[0].DACode)
               if(dataDebitAccountState.Data[0]){
                  this.debitAccountState = dataDebitAccountState.Data[0]
               }
             }
           }
           console.log("DATA STATE", this.debitAccountState)
           var getDebiturVenture = await apiDebitorVenture.getByDEBCode(this.DebCode)
           if(getDebiturVenture.Data[0]){
               this.debitorVenture = getDebiturVenture.Data[0]
                // console.log('DEBITOR',this.debitorVenture)
           }

           var getDebitorCollaterall = await apiDebitorCollaterall.getByDEBCode(this.DebCode)
           if(getDebitorCollaterall.Data[0]){
                this.debitorCollaterall = getDebitorCollaterall.Data[0]
           }

           var getDebGuarantor = await apiDebGuarantor.getByDEBCode(this.DebCode)
           if(getDebGuarantor.Data[0]){
              this.debGuarantor = getDebGuarantor.Data[0]
           }

           var getDebitorEmerg1 = await apiDebitorEmerg.getByDEBCode(true,this.DebCode)
           if(getDebitorEmerg1.Data[0]){
                this.debitorEmerg1 = getDebitorEmerg1.Data[0]
            }
           //  if(getDebitorEmerg1.Data[0].DateofBirth){
           //   this.debitorEmerg1.DateofBirth = getDebitorEmerg1.Data[0].DateofBirth
           // }

            var getDebitorEmerg2 = await apiDebitorEmerg.getByDEBCode(false,this.DebCode)
            if(getDebitorEmerg2.Data[0]){
                this.debitorEmerg2 = getDebitorEmerg2.Data[0]
            }

           var getDebProfession = await apiDebProfession.getByDEBCode(this.DebCode)
           if(getDebProfession.Data[0]){
              this.debProfession1 = getDebProfession.Data[0]
           }
           // if(getDebProfession.Data[1]){
           //    this.debProfession2 = getDebProfession.Data[1]
           // }

            var getIncomeData = await apiIncomeData.getByDEBCode(this.DebCode)
           if(getIncomeData.Data[0]){
              this.IncomeData = getIncomeData.Data[0]
           }

           var getAppBankData = await apiAppBankData.getByDEBCode(this.DebCode)
           if(getAppBankData.Data[0]){
              this.AppBankData = getAppBankData.Data[0]
           }
      }
       this.loading = false
     },
     methods: {
             disabledDate(date) {
               return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
             },
             showModal() {
              this.$refs['my-modal'].show()
            },
            hideModal() {
              this.$refs['my-modal'].hide()
            },
            async getAllComboboxChannel() {
               var getChannel = await apiChannelPartner.getCombobox()
                  console.log("SINERGI",getChannel)
                  this.options_SynergyChannelId = getChannel;
                  // for (var i = 0; i < getChannel.length; i++) {
                  //   this.options_SynergyChannelId.push({ text: getChannel[i].text,value: getChannel[i].value })
                  // }
             },
            async getAllComboboxPKSector() {
               var getPKSector = await apiPKSector.getAllCombobox()
                  this.options_BusinessSector = [];
                  for (var i = 0; i < getPKSector.length; i++) {
                    this.options_BusinessSector.push({ label: getPKSector[i].text,value: getPKSector[i].value })
                  }
             },
              async getAllComboboxProvinsi() {
               var getProvinsi = await apiProvinsi.getAllCombobox()
                  this.options_Prov_code = [];
                  for (var i = 0; i < getProvinsi.length; i++) {
                    this.options_Prov_code.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
                    this.options_KTPProv_code.push({ label: getProvinsi[i].text,value: getProvinsi[i].value})
                    this.options_KDProv_code.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
                    // this.options_DVProvince.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
                    this.options_DGProvince.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
                    this.options_DCProvince.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
                  }
             },
             async getAllComboboxKotaKab(id) {
               var getKotaKab = await apiKotaKab.getAllComboboxByKodeProv(id)
                  this.options_Dist_code = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_Dist_code.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxKecamatan(id) {
               var getKecamatan = await apiKecamatan.getAllComboboxByKodeProv(id)
                  this.options_Subdis_code = [];
                  for (var i = 0; i < getKecamatan.length; i++) {
                    this.options_Subdis_code.push({ label: getKecamatan[i].text,value: getKecamatan[i].value })
                  }
             },
             //  async getAllComboboxProvinsiKTP() {
             //   var getProvinsi = await apiProvinsi.getAllCombobox()
             //      this.options_KTPProv_code = [];
             //      for (var i = 0; i < getProvinsi.length; i++) {
             //        this.options_KTPProv_code.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
             //      }
             // },
             async getAllComboboxKotaKabKTP(id) {
               var getKotaKab = await apiKotaKab.getAllComboboxByKodeProv(id)
                  this.options_KTPDist_code = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_KTPDist_code.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxKecamatanKTP(id) {
               var getKecamatan = await apiKecamatan.getAllComboboxByKodeProv(id)
                  this.options_KTPSubdis_code = [];
                  for (var i = 0; i < getKecamatan.length; i++) {
                    this.options_KTPSubdis_code.push({ label: getKecamatan[i].text,value: getKecamatan[i].value })
                  }
             },
             // async getAllComboboxProvinsiKD() {
             //   var getProvinsi = await apiProvinsi.getAllCombobox()
             //      this.options_KDProv_code = [];
             //      for (var i = 0; i < getProvinsi.length; i++) {
             //        this.options_KDProv_code.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
             //      }
             // },
             async getAllComboboxKotaKabKD(id) {
               var getKotaKab = await apiKotaKab.getAllComboboxByKodeProv(id)
                  this.options_KDDist_code = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_KDDist_code.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxKecamatanKD(id) {
               var getKecamatan = await apiKecamatan.getAllComboboxByKodeProv(id)
                  this.options_KDSubdis_code = [];
                  for (var i = 0; i < getKecamatan.length; i++) {
                    this.options_KDSubdis_code.push({ label: getKecamatan[i].text,value: getKecamatan[i].value })
                  }
             },
             async getAllComboboxKotaKabPlaceofBirth() {
               var getKotaKab = await apiKotaKab.getAllCombobox()
                  this.options_PlaceofBirth = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_PlaceofBirth.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxDVProvinsi() {
               var getProvinsi = await apiProvinsi.getAllComboboxWACode(this.cabang)
                  this.options_DVProvince = [];
                  for (var i = 0; i < getProvinsi.length; i++) {
                    this.options_DVProvince.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
                  }
             },
             async getAllComboboxDVKotaKab(id) {
               var getKotaKab = await apiKotaKab.getAllComboboxByKodeProv(id)
                  this.options_DVDistrict = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_DVDistrict.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxDVKecamatan(id) {
               var getKecamatan = await apiKecamatan.getAllComboboxByKodeProv(id)
                  this.options_DVSubDistrict = [];
                  for (var i = 0; i < getKecamatan.length; i++) {
                    this.options_DVSubDistrict.push({ label: getKecamatan[i].text,value: getKecamatan[i].value })
                  }
             },

             // async getAllComboboxDGProvinsi() {
             //   var getProvinsi = await apiProvinsi.getAllCombobox()
             //      this.options_DGProvince = [];
             //      for (var i = 0; i < getProvinsi.length; i++) {
             //        this.options_DGProvince.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
             //      }
             // },
             async getAllComboboxDGKotaKab(id) {
               var getKotaKab = await apiKotaKab.getAllComboboxByKodeProv(id)
                  this.options_DGDistrict = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_DGDistrict.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxDGKecamatan(id) {
               var getKecamatan = await apiKecamatan.getAllComboboxByKodeProv(id)
                  this.options_DGSubDistrict = [];
                  for (var i = 0; i < getKecamatan.length; i++) {
                    this.options_DGSubDistrict.push({ label: getKecamatan[i].text,value: getKecamatan[i].value })
                  }
             },

             // async getAllComboboxDCProvinsi() {
             //   var getProvinsi = await apiProvinsi.getAllCombobox()
             //      this.options_DCProvince = [];
             //      for (var i = 0; i < getProvinsi.length; i++) {
             //        this.options_DCProvince.push({ label: getProvinsi[i].text,value: getProvinsi[i].value })
             //      }
             // },
             async getAllComboboxDCKotaKab(id) {
               var getKotaKab = await apiKotaKab.getAllComboboxByKodeProv(id)
                  this.options_DCDistrict = [];
                  for (var i = 0; i < getKotaKab.length; i++) {
                    this.options_DCDistrict.push({ label: getKotaKab[i].text,value: getKotaKab[i].value })
                  }
             },
             async getAllComboboxDCKecamatan(id) {
               var getKecamatan = await apiKecamatan.getAllComboboxByKodeProv(id)
                  this.options_DCSubDistrict = [];
                  for (var i = 0; i < getKecamatan.length; i++) {
                    this.options_DCSubDistrict.push({ label: getKecamatan[i].text,value: getKecamatan[i].value })
                  }
             },
             async savePemohonan(){
              try {
                if(this.debitorVenture.DistributionPattern == 'Perseorangan'){
                  this.debitorVenture.SynergyCompany = null
                  this.debitorVenture.SynergyChannelId = null
                  var cekChannel = await apiDebitAccount.CanOpenAccount(null)
                }
                if(this.debitorVenture.DistributionPattern == 'Channeling'){
                  this.debitorVenture.SynergyChannelId = null
                  var cekChannel = await apiDebitAccount.CanOpenAccount(null)
                }
                if(this.debitorVenture.DistributionPattern == 'Avalis'){
                    var cekChannel = await apiDebitAccount.CanOpenAccount(this.debitorVenture.SynergyChannelId)
                }
                if(!cekChannel.Data){
                    alert("Mitra masih mempunyai tunggakan.")
                }else{
                    this.$v.$touch()
                  if (!this.$v.$invalid) {
                     this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                     .then(async (value) => {
                        if(value){
                            this.loading = true
                            this.klik = true
                            this.PassingDebCode(this.debitor.DebCode)
                             this.debitor.ActiveUntil = '2111-12-30'
                             // this.debitAccount.DACode = codeDACode
                            this.BLApproval.DACode = this.debitAccount.DACode
                            this.BLApproval.Value = this.debitAccount.DebValue
                            this.debitor.Amount = this.debitAccount.DebValue
                            this.debitor.Reference = this.debitorVenture.SynergyCompany
                            this.debitor.Instance =  this.debitorVenture.BusinessName

                            this.debitAccountState.SubmittedDate = new Date()
                            this.debitAccountState.SubmittedValue = this.debitAccount.DebValue

                            if(this.debitor.KTPFullName){
                              this.debitor.FullName = this.debitor.KTPFullName
                            }else{
                              this.debitor.FullName = this.debitor.ShortName
                            }
                              this.debitor.DateProposal = new Date()
                              this.debitor.DateRegistration = new Date()

                            this.DebitAccountWorkFlow.DACode = this.debitAccount.DACode
                            this.DebitAccountWorkFlow.TanggalPengajuan = this.debitor.DateRegistration
                            this.DebitAccountWorkFlow.TanggalPenilaian = new Date()


                            // this.PassingWilayah()
                        if(this.debitor.PlaceofBirth != null){
                          if(this.debitor.PlaceofBirth.label) {
                            this.debitor.PlaceofBirth = this.debitor.PlaceofBirth.label
                          }
                        }
                        if(this.debitor.Prov_code != null){
                          if(this.debitor.Prov_code.value) {
                            this.debitor.ProvinceCode =  this.debitor.Prov_code.value
                           }
                           if(this.debitor.Prov_code.label) {
                            this.debitor.Prov_code =  this.debitor.Prov_code.label
                           }
                        }
                        if(this.debitor.Dist_code != null){
                          if(this.debitor.Dist_code.value) {
                            this.debitor.DistrictCode  =  this.debitor.Dist_code.value
                          }
                          if(this.debitor.Dist_code.label) {
                            this.debitor.Dist_code =  this.debitor.Dist_code.label
                          }
                        }
                        if(this.debitor.Subdis_code != null){
                          if(this.debitor.Subdis_code.value) {
                            this.debitor.SubDistrictCode  =  this.debitor.Subdis_code.value
                          }
                          if(this.debitor.Subdis_code.label) {
                            this.debitor.Subdis_code =  this.debitor.Subdis_code.label
                          }
                        }
                       if(this.debitor.KTPProv_code != null){
                         if(this.debitor.KTPProv_code.value) {
                            this.debitor.KTPProvinceCode =  this.debitor.KTPProv_code.value
                          }
                          if(this.debitor.KTPProv_code.label) {
                            this.debitor.KTPProv_code =  this.debitor.KTPProv_code.label
                          }
                       }
                       if(this.debitor.KTPDist_code != null){
                        if(this.debitor.KTPDist_code.value){
                          this.debitor.KTPDistrictCode  =  this.debitor.KTPDist_code.value
                        }
                        if(this.debitor.KTPDist_code.label){
                          this.debitor.KTPDist_code =  this.debitor.KTPDist_code.label
                        }
                       }
                       if(this.debitor.KTPSubdis_code != null){
                        if(this.debitor.KTPSubdis_code.value){
                          this.debitor.KTPSubDistrictCode =  this.debitor.KTPSubdis_code.value
                        }
                        if(this.debitor.KTPSubdis_code.label){
                          this.debitor.KTPSubdis_code =  this.debitor.KTPSubdis_code.label
                        }
                       }
                       if(this.debitorEmerg1.PlaceofBirth != null){
                        if(this.debitorEmerg1.PlaceofBirth.label) {
                          this.debitorEmerg1.PlaceofBirth = this.debitorEmerg1.PlaceofBirth.label
                        }
                       }
                       if(this.debitorEmerg2.District != null){
                        if(this.debitorEmerg2.District.value){
                          this.debitorEmerg2.DistrictCode =  this.debitorEmerg2.District.value
                        }
                        if(this.debitorEmerg2.District.label){
                          this.debitorEmerg2.District =  this.debitorEmerg2.District.label
                        }
                       }
                       if(this.debitorEmerg2.Province != null){
                        if(this.debitorEmerg2.Province.value){
                          this.debitorEmerg2.ProvinceCode =  this.debitorEmerg2.Province.value
                        }
                        if(this.debitorEmerg2.Province.label){
                          this.debitorEmerg2.Province =  this.debitorEmerg2.Province.label
                        }
                       }
                        if(this.debitorEmerg2.SubDistrict != null){
                          if(this.debitorEmerg2.SubDistrict.value){
                            this.debitorEmerg2.SubDistrictCode =  this.debitorEmerg2.SubDistrict.value
                           }
                           if(this.debitorEmerg2.SubDistrict.label){
                            this.debitorEmerg2.SubDistrict =  this.debitorEmerg2.SubDistrict.label
                           }
                        }
                        if(this.debitorVenture.District != null){
                          if(this.debitorVenture.District.value){
                            this.debitorVenture.DistrictCode =  this.debitorVenture.District.value
                          }
                          if(this.debitorVenture.District.label){
                            this.debitorVenture.District =  this.debitorVenture.District.label
                          }
                        }
                        if(this.debitorVenture.Province != null){
                          if(this.debitorVenture.Province.value){
                            this.debitorVenture.ProvinceCode =  this.debitorVenture.Province.value
                          }
                          if(this.debitorVenture.Province.label){
                            this.debitorVenture.Province =  this.debitorVenture.Province.label
                          }
                        }
                        if(this.debitorVenture.SubDistrict != null){
                          if(this.debitorVenture.SubDistrict.value) {
                            this.debitorVenture.SubDistrictCode =  this.debitorVenture.SubDistrict.value
                          }
                          if(this.debitorVenture.SubDistrict.label) {
                            this.debitorVenture.SubDistrict =  this.debitorVenture.SubDistrict.label
                          }
                        }
                       if(this.debGuarantor.District != null){
                         if(this.debGuarantor.District.value) {
                          this.debGuarantor.DistrictCode =  this.debGuarantor.District.value
                        }
                         if(this.debGuarantor.District.label) {
                          this.debGuarantor.District =  this.debGuarantor.District.label
                        }
                       }
                       if(this.debGuarantor.Province != null){
                        if(this.debGuarantor.Province.value){
                          this.debGuarantor.ProvinceCode =  this.debGuarantor.Province.value
                        }
                        if(this.debGuarantor.Province.label){
                          this.debGuarantor.Province =  this.debGuarantor.Province.label
                        }
                       }
                        if(this.debGuarantor.SubDistrict != null){
                          if(this.debGuarantor.SubDistrict.value){
                            this.debGuarantor.SubDistrictCode =  this.debGuarantor.SubDistrict.value
                           }
                           if(this.debGuarantor.SubDistrict.label){
                            this.debGuarantor.SubDistrict =  this.debGuarantor.SubDistrict.label
                           }
                        }
                        if(this.debitorCollaterall.District != null){
                           if(this.debitorCollaterall.District.value){
                            this.debitorCollaterall.DistrictCode =  this.debitorCollaterall.District.value
                           }
                           if(this.debitorCollaterall.District.label){
                            this.debitorCollaterall.District =  this.debitorCollaterall.District.label
                           }
                        }
                        if(this.debitorCollaterall.Province != null){
                           if(this.debitorCollaterall.Province.value){
                            this.debitorCollaterall.ProvinceCode =  this.debitorCollaterall.Province.value
                           }
                           if(this.debitorCollaterall.Province.label){
                            this.debitorCollaterall.Province =  this.debitorCollaterall.Province.label
                           }
                        }
                        if(this.debitorCollaterall.SubDistrict != null){
                          if(this.debitorCollaterall.SubDistrict.value){
                            this.debitorCollaterall.SubDistrictCode =  this.debitorCollaterall.SubDistrict.value
                           }
                           if(this.debitorCollaterall.SubDistrict.label){
                            this.debitorCollaterall.SubDistrict =  this.debitorCollaterall.SubDistrict.label
                           }
                        }

                           if(this.debitorVenture.BusinessSector != null) {
                             if(this.debitorVenture.BusinessSector.value){
                              this.debitorVenture.BusinessSector =  this.debitorVenture.BusinessSector.value
                             }
                           }

                           if(this.debitorVenture.DistributionPattern == 'Perseorangan'){
                            this.debitorVenture.SynergyCompany = null
                            this.debitorVenture.SynergyChannelId = null
                          }
                          if(this.debitorVenture.DistributionPattern == 'Channeling'){
                            this.debitorVenture.SynergyChannelId = null
                          }
                          if(this.debitorVenture.DistributionPattern == 'Avalis'){
                             var SynergyCompany = await apiChannelPartner.getAllById(this.debitorVenture.SynergyChannelId)
                             if(SynergyCompany[0]){
                                this.debitorVenture.SynergyCompany = SynergyCompany[0].ChnlName
                             }
                          }

                           //  if(this.DebCode == null){
                           //    this.debitor.Reference = this.debitorVenture.SynergyCompany
                           //    this.debitor.Instance =  this.debitorVenture.BusinessName
                           //    let data = await apiDebitor.create(this.debitor)

                           //  let dataDebitorVenture = await apiDebitorVenture.create(this.debitorVenture)

                           //  let dataDebAccount = await apiDebitAccount.create(this.debitAccount)

                           //  let dataDebitorCollaterall = await apiDebitorCollaterall.create(this.debitorCollaterall)

                           //  let dataDebGuarantor = await apiDebGuarantor.create(this.debGuarantor)

                           //  let datadebitorEmerg1 = await apiDebitorEmerg.create(this.debitorEmerg1)

                           //  let datadebitorEmerg2 = await apiDebitorEmerg.create(this.debitorEmerg2)

                           //  let datadebProfession1 = await apiDebProfession.create(this.debProfession1)

                           //   // let datadebProfession2 = await apiDebProfession.create(this.debProfession2)

                           //   let dataIncomeData = await apiIncomeData.create(this.IncomeData)

                           //    let dataAppBankData = await apiAppBankData.create(this.AppBankData)
                           // }else{
                              this.DebitAccountWorkFlow.CreatedBy = this.username
                               let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.create(this.DebitAccountWorkFlow)

                               let data = await apiDebitor.update(this.DebCode,this.debitor)

                              this.debitorVenture.UpdatedBy = this.username
                            let dataDebitorVenture = await apiDebitorVenture.updateByDEBCode(this.DebCode,this.debitorVenture)

                              this.debitAccount.UpdatedBy = this.username
                            let dataDebAccount = await apiDebitAccount.updateByDebCode(this.DebCode,this.debitAccount)

                              this.debitAccountState.UpdatedBy = this.username
                             let dataDebitAccountState = await apiDebitAccountState.update(this.debitAccount.DACode,this.debitAccountState)

                              this.debitorCollaterall.UpdatedBy = this.username
                            let dataDebitorCollaterall = await apiDebitorCollaterall.updateByDEBCode(this.DebCode,this.debitorCollaterall)

                              this.debGuarantor.UpdatedBy = this.username
                            let dataDebGuarantor = await apiDebGuarantor.updateByDEBCode(this.DebCode,this.debGuarantor)

                              this.debitorEmerg1.UpdatedBy = this.username
                            let datadebitorEmerg1 = await apiDebitorEmerg.updateByDEBCode(true,this.DebCode,this.debitorEmerg1)

                              this.debitorEmerg2.UpdatedBy = this.username
                            let datadebitorEmerg2 = await apiDebitorEmerg.updateByDEBCode(false,this.DebCode,this.debitorEmerg2)

                              this.debProfession1.UpdatedBy = this.username
                            let datadebProfession1 = await apiDebProfession.update(this.debProfession1.DebProfessionID,this.debProfession1)

                             // let datadebProfession2 = await apiDebProfession.update(this.debProfession1.DebProfessionID,this.debProfession2)
                           // }
                            // let dataDebAccount = await apiDebitAccount.create(this.debitAccount)

                              this.IncomeData.UpdatedBy = this.username
                            let dataIncomeData = await apiIncomeData.updateByDEBCode(this.DebCode,this.IncomeData)

                              this.AppBankData.UpdatedBy = this.username
                            let dataAppBankData = await apiAppBankData.updateByDEBCode(this.DebCode,this.AppBankData)

                            this.BLApproval.CreatedBy = this.username
                            let dataBLApproval = await apiBLApproval.create(this.BLApproval)

                            let getApprovalworkflow = await apiApprovalWorkflow.getAllApprovalWorkFlow()
                            var dataBLApprovalWorkflow = null
                            for (var i = 0; i < getApprovalworkflow.length; i++) {
                              this.BLApprovalWorkflow.Sequence = getApprovalworkflow[i].Sequence
                              this.BLApprovalWorkflow.Pos_Name = getApprovalworkflow[i].Pos_Name
                              this.BLApprovalWorkflow.ReqType = getApprovalworkflow[i].ReqType
                              this.BLApprovalWorkflow.DACode = this.debitAccount.DACode
                              if(getApprovalworkflow[i].Sequence == 1){
                               this.BLApprovalWorkflow.ReqDate = new Date()
                              }else{
                                 this.BLApprovalWorkflow.ReqDate = null
                              }
                              this.BLApprovalWorkflow.CreatedBy = this.username
                              dataBLApprovalWorkflow = await apiBLApprovalWorkflow.create(this.BLApprovalWorkflow)
                            }

                            console.log(this.BLApproval);
                             this.loading = false
                            this.showNotif(dataBLApprovalWorkflow,'debitor')
                            this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                        }
                     })
                     .catch(err => {
                      // An error occurred
                     })
                  }else{
                    this.showModal()
                    alert("Harap isi data yang wajib...!!")
                  }

                }
                 }
                  finally {

                  }
             },
             async saveDrafPemohonan(){
                try{
                  this.$v.$touch()
                  if (!this.$v.$invalid) {
                     this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                       .then(async (value) => {
                          if(value){
                               this.loading = true
                              this.klik = true
                              this.PassingDebCode(this.debitor.DebCode)
                              this.debitor.ActiveUntil = '2111-12-30'
                              this.debitor.Amount = this.debitAccount.DebValue
                              if(this.debitor.KTPFullName){
                                this.debitor.FullName = this.debitor.KTPFullName
                              }else{
                                this.debitor.FullName = this.debitor.ShortName
                              }
                                this.debitor.DateProposal = new Date()
                                this.debitor.DateRegistration = new Date()
                          if(this.debitor.PlaceofBirth != null){
                            if(this.debitor.PlaceofBirth.label) {
                              this.debitor.PlaceofBirth = this.debitor.PlaceofBirth.label
                            }
                          }
                          if(this.debitor.Prov_code != null){
                            if(this.debitor.Prov_code.value) {
                              this.debitor.ProvinceCode  =  this.debitor.Prov_code.value
                             }
                             if(this.debitor.Prov_code.label) {
                              this.debitor.Prov_code =  this.debitor.Prov_code.label
                             }
                          }
                          if(this.debitor.Dist_code != null){
                            if(this.debitor.Dist_code.value) {
                              this.debitor.DistrictCode =  this.debitor.Dist_code.value
                            }
                            if(this.debitor.Dist_code.label) {
                              this.debitor.Dist_code =  this.debitor.Dist_code.label
                            }
                          }
                          if(this.debitor.Subdis_code != null){
                            if(this.debitor.Subdis_code.value) {
                              this.debitor.SubDistrictCode =  this.debitor.Subdis_code.value
                            }
                            if(this.debitor.Subdis_code.label) {
                              this.debitor.Subdis_code =  this.debitor.Subdis_code.label
                            }
                          }
                         if(this.debitor.KTPProv_code != null){
                          if(this.debitor.KTPProv_code.value) {
                              this.debitor.KTPProvinceCode =  this.debitor.KTPProv_code.value
                            }
                            if(this.debitor.KTPProv_code.label) {
                              this.debitor.KTPProv_code =  this.debitor.KTPProv_code.label
                            }
                         }
                         if(this.debitor.KTPDist_code != null){
                          if(this.debitor.KTPDist_code.value){
                            this.debitor.KTPDistrictCode =  this.debitor.KTPDist_code.value
                          }
                          if(this.debitor.KTPDist_code.label){
                            this.debitor.KTPDist_code =  this.debitor.KTPDist_code.label
                          }
                         }
                         if(this.debitor.KTPSubdis_code != null){
                          if(this.debitor.KTPSubdis_code.value){
                            this.debitor.KTPSubDistrictCode =  this.debitor.KTPSubdis_code.value
                          }
                          if(this.debitor.KTPSubdis_code.label){
                            this.debitor.KTPSubdis_code =  this.debitor.KTPSubdis_code.label
                          }
                         }
                         if(this.debitorEmerg1.PlaceofBirth != null){
                          if(this.debitorEmerg1.PlaceofBirth.label) {
                            this.debitorEmerg1.PlaceofBirth = this.debitorEmerg1.PlaceofBirth.label
                          }
                         }
                         if(this.debitorEmerg2.District != null){
                          if(this.debitorEmerg2.District.value){
                            this.debitorEmerg2.DistrictCode =  this.debitorEmerg2.District.value
                          }
                          if(this.debitorEmerg2.District.label){
                            this.debitorEmerg2.District =  this.debitorEmerg2.District.label
                          }
                         }
                         if(this.debitorEmerg2.Province != null){
                          if(this.debitorEmerg2.Province.value){
                            this.debitorEmerg2.ProvinceCode =  this.debitorEmerg2.Province.value
                          }
                          if(this.debitorEmerg2.Province.label){
                            this.debitorEmerg2.Province =  this.debitorEmerg2.Province.label
                          }
                         }
                          if(this.debitorEmerg2.SubDistrict != null){
                            if(this.debitorEmerg2.SubDistrict.value){
                              this.debitorEmerg2.SubDistrictCode =  this.debitorEmerg2.SubDistrict.value
                             }
                             if(this.debitorEmerg2.SubDistrict.label){
                              this.debitorEmerg2.SubDistrict =  this.debitorEmerg2.SubDistrict.label
                             }
                          }
                          if(this.debitorVenture.District != null){
                            if(this.debitorVenture.District.value){
                              this.debitorVenture.DistrictCode =  this.debitorVenture.District.value
                            }
                            if(this.debitorVenture.District.label){
                              this.debitorVenture.District =  this.debitorVenture.District.label
                            }
                          }
                          if(this.debitorVenture.Province != null){
                            if(this.debitorVenture.Province.value){
                              this.debitorVenture.ProvinceCode =  this.debitorVenture.Province.value
                            }
                            if(this.debitorVenture.Province.label){
                              this.debitorVenture.Province =  this.debitorVenture.Province.label
                            }
                          }
                          if(this.debitorVenture.SubDistrict != null){
                            if(this.debitorVenture.SubDistrict.value) {
                              this.debitorVenture.SubDistrictCode =  this.debitorVenture.SubDistrict.value
                            }
                            if(this.debitorVenture.SubDistrict.label) {
                              this.debitorVenture.SubDistrict =  this.debitorVenture.SubDistrict.label
                            }
                          }
                         if(this.debGuarantor.District != null){
                          if(this.debGuarantor.District.value) {
                            this.debGuarantor.DistrictCode =  this.debGuarantor.District.value
                          }
                           if(this.debGuarantor.District.label) {
                            this.debGuarantor.District =  this.debGuarantor.District.label
                          }
                         }
                         if(this.debGuarantor.Province != null){
                          if(this.debGuarantor.Province.value){
                            this.debGuarantor.ProvinceCode =  this.debGuarantor.Province.value
                          }
                          if(this.debGuarantor.Province.label){
                            this.debGuarantor.Province =  this.debGuarantor.Province.label
                          }
                         }
                          if(this.debGuarantor.SubDistrict != null){
                             if(this.debGuarantor.SubDistrict.value){
                              this.debGuarantor.SubDistrictCode =  this.debGuarantor.SubDistrict.value
                             }
                             if(this.debGuarantor.SubDistrict.label){
                              this.debGuarantor.SubDistrict =  this.debGuarantor.SubDistrict.label
                             }
                          }
                          if(this.debitorCollaterall.District != null){
                            if(this.debitorCollaterall.District.value){
                              this.debitorCollaterall.DistrictCode =  this.debitorCollaterall.District.value
                             }
                             if(this.debitorCollaterall.District.label){
                              this.debitorCollaterall.District =  this.debitorCollaterall.District.label
                             }
                          }
                          if(this.debitorCollaterall.Province != null){
                            if(this.debitorCollaterall.Province.value){
                              this.debitorCollaterall.ProvinceCode =  this.debitorCollaterall.Province.value
                             }
                             if(this.debitorCollaterall.Province.label){
                              this.debitorCollaterall.Province =  this.debitorCollaterall.Province.label
                             }
                          }
                          if(this.debitorCollaterall.SubDistrict != null){
                            if(this.debitorCollaterall.SubDistrict.value){
                              this.debitorCollaterall.SubDistrictCode =  this.debitorCollaterall.SubDistrict.value
                             }
                             if(this.debitorCollaterall.SubDistrict.label){
                              this.debitorCollaterall.SubDistrict =  this.debitorCollaterall.SubDistrict.label
                             }
                          }

                          if( this.BLApproval.PKAppId){
                            if(this.DebitAccountWorkFlow.TanggalPersetujuan == null){
                                 this.BLApproval.DACode = this.debitAccount.DACode
                                  this.BLApproval.Value = this.debitAccount.DebValue
                                  this.BLApproval.UpdatedBy = this.username
                                 let dataBLApproval = await apiBLApproval.update(this.BLApproval.PKAppId,this.BLApproval)
                            }
                          }

                          if(this.debitorVenture.DistributionPattern == 'Perseorangan'){
                              this.debitorVenture.SynergyCompany = null
                              this.debitorVenture.SynergyChannelId = null
                            }
                            if(this.debitorVenture.DistributionPattern == 'Channeling'){
                              this.debitorVenture.SynergyChannelId = null
                            }
                            if(this.debitorVenture.DistributionPattern == 'Avalis'){
                               var SynergyCompany = await apiChannelPartner.getAllById(this.debitorVenture.SynergyChannelId)
                               if(SynergyCompany[0]){
                                  this.debitorVenture.SynergyCompany = SynergyCompany[0].ChnlName
                               }
                            }


                           // if(this.debitorVenture.BusinessSector != null) this.debitorVenture.BusinessSector =  this.debitorVenture.BusinessSector.value

                            // if(this.DebCode == null){
                            //     this.debitor.Reference = this.debitorVenture.SynergyCompany
                            //     this.debitor.Instance = this.debitorVenture.BusinessName
                            //     let data = await apiDebitor.create(this.debitor)

                            //   let dataDebitorVenture = await apiDebitorVenture.create(this.debitorVenture)

                            //   let dataDebAccount = await apiDebitAccount.create(this.debitAccount)

                            //   let dataDebitorCollaterall = await apiDebitorCollaterall.create(this.debitorCollaterall)

                            //   let dataDebGuarantor = await apiDebGuarantor.create(this.debGuarantor)

                            //   let datadebitorEmerg1 = await apiDebitorEmerg.create(this.debitorEmerg1)

                            //   let datadebitorEmerg2 = await apiDebitorEmerg.create(this.debitorEmerg2)

                            //   let datadebProfession1 = await apiDebProfession.create(this.debProfession1)

                            //    // let datadebProfession2 = await apiDebProfession.create(this.debProfession2)

                            //     let dataIncomeData = await apiIncomeData.create(this.IncomeData)

                            //     let dataAppBankData = await apiAppBankData.create(this.AppBankData)
                            //    console.log(this.BLApproval);
                            //   this.showNotif(dataAppBankData,'data')
                            //   this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                            //  }else{
                                  this.debitor.Reference = this.debitorVenture.SynergyCompany
                                  this.debitor.Instance = this.debitorVenture.BusinessName
                                  this.debitor.UpdatedBy = this.username
                                 let data = await apiDebitor.update(this.DebCode,this.debitor)

                                  this.debitorVenture.UpdatedBy = this.username
                              let dataDebitorVenture = await apiDebitorVenture.updateByDEBCode(this.DebCode,this.debitorVenture)

                                  this.debitAccount.UpdatedBy = this.username
                              let dataDebAccount = await apiDebitAccount.updateByDebCode(this.DebCode,this.debitAccount)

                                  this.debitorCollaterall.UpdatedBy = this.username
                              let dataDebitorCollaterall = await apiDebitorCollaterall.updateByDEBCode(this.DebCode,this.debitorCollaterall)

                                  this.debGuarantor.UpdatedBy = this.username
                              let dataDebGuarantor = await apiDebGuarantor.updateByDEBCode(this.DebCode,this.debGuarantor)

                                  this.debitorEmerg1.UpdatedBy = this.username
                              let datadebitorEmerg1 = await apiDebitorEmerg.updateByDEBCode(true,this.DebCode,this.debitorEmerg1)

                                  this.debitorEmerg2.UpdatedBy = this.username
                              let datadebitorEmerg2 = await apiDebitorEmerg.updateByDEBCode(false,this.DebCode,this.debitorEmerg2)

                                  this.debProfession1.UpdatedBy = this.username
                              let datadebProfession1 = await apiDebProfession.update(this.debProfession1.DebProfessionID,this.debProfession1)

                               // let datadebProfession2 = await apiDebProfession.update(this.debProfession1.DebProfessionID,this.debProfession2)
                               console.log(this.BLApproval);

                                  this.IncomeData.UpdatedBy = this.username
                               let dataIncomeData = await apiIncomeData.updateByDEBCode(this.DebCode,this.IncomeData)

                                  this.AppBankData.UpdatedBy = this.username
                              let dataAppBankData = await apiAppBankData.updateByDEBCode(this.DebCode,this.AppBankData)
                               this.loading = true
                              this.showNotif(dataAppBankData,'data')
                              this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                             // }
                          }
                       })
                       .catch(err => {
                        // An error occurred
                       })

                  }else{
                    this.showModal()
                    alert("Harap isi data yang wajib...!!")
                  }

                }
                finally {

                }
            },
            async saveDrafDataUsahaPemohonan(){
                try{
                  console.log(this.$v.$invalid)
                //    this.$v.$touch()
                //     if (!this.$v.$invalid) {
                    this.PassingDebCode(this.debitor.DebCode)
                if(this.debitorVenture.District != null){
                  // if(this.debitorVenture.District.value){
                  //   this.debitorVenture.DistrictCode =  this.debitorVenture.District.value
                  // }
                  if(this.debitorVenture.District.label){
                    this.debitorVenture.District =  this.debitorVenture.District.label
                  }
                }
                if(this.debitorVenture.Province != null){
                  if(this.debitorVenture.Province.value){
                    this.debitorVenture.ProvinceCode =  this.debitorVenture.Province.value
                  }
                  if(this.debitorVenture.Province.label){
                    this.debitorVenture.Province =  this.debitorVenture.Province.label
                  }
                }
                if(this.debitorVenture.SubDistrict != null){
                  if(this.debitorVenture.SubDistrict.value) {
                    this.debitorVenture.SubDistrictCode =  this.debitorVenture.SubDistrict.value
                  }
                  if(this.debitorVenture.SubDistrict.label) {
                    this.debitorVenture.SubDistrict =  this.debitorVenture.SubDistrict.label
                  }
                }
                console.log("ERROR getDebiturVenture 1",this.debitorVenture.SynergyChannelId);
                if(this.debitorVenture.SynergyChannelId) {
                  if(this.debitorVenture.SynergyChannelId.value) {
                    this.debitorVenture.SynergyChannelId =  this.debitorVenture.SynergyChannelId.value
                  }
                }

                console.log("ERROR getDebiturVenture 2",this.debitorVenture.SynergyChannelId);
                if(this.debitorVenture.DistributionPattern == 'Perseorangan'){
                    this.debitorVenture.SynergyCompany = null
                    this.debitorVenture.SynergyChannelId = null
                  }
                  if(this.debitorVenture.DistributionPattern == 'Channeling'){
                    this.debitorVenture.SynergyChannelId = null
                  }
                  if(this.debitorVenture.DistributionPattern == 'Avalis'){
                    var SynergyCompany = await apiChannelPartner.getAllById(this.debitorVenture.SynergyChannelId)
                    if(SynergyCompany[0]){
                      this.debitorVenture.SynergyCompany = SynergyCompany[0].ChnlName
                    }
                  }

                    this.debitorVenture.UpdatedBy = this.username
                    let dataDebitorVenture = await apiDebitorVenture.updateByDEBCode(this.DebCode,this.debitorVenture)
                     this.showNotif(dataDebitorVenture,'data')

                //   }else{
                //      alert("Harap isi data yang wajib...!!")
                //      return false
                //   }
                }
                finally {

                }
            },
            async saveDrafFasilitasKreditPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                    this.PassingDebCode(this.debitor.DebCode)
                    this.debitAccount.UpdatedBy = this.username
                    let dataDebAccount = await apiDebitAccount.updateByDebCode(this.DebCode,this.debitAccount)

                     this.showNotif(dataDebAccount,'data')
                  // }else{
                  //      alert("Harap isi data yang wajib...!!")
                  // }
                }
                finally {

                }
            },
            async saveDrafDataJaminanPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                  //   this.PassingDebCode(this.debitor.DebCode)
               if(this.debGuarantor.District != null){
                if(this.debGuarantor.District.value) {
                  this.debGuarantor.DistrictCode =  this.debGuarantor.District.value
                }
                 if(this.debGuarantor.District.label) {
                  this.debGuarantor.District =  this.debGuarantor.District.label
                }
               }
               if(this.debGuarantor.Province != null){
                if(this.debGuarantor.Province.value){
                  this.debGuarantor.ProvinceCode =  this.debGuarantor.Province.value
                }
                if(this.debGuarantor.Province.label){
                  this.debGuarantor.Province =  this.debGuarantor.Province.label
                }
               }
                if(this.debGuarantor.SubDistrict != null){
                   if(this.debGuarantor.SubDistrict.value){
                    this.debGuarantor.SubDistrictCode =  this.debGuarantor.SubDistrict.value
                   }
                   if(this.debGuarantor.SubDistrict.label){
                    this.debGuarantor.SubDistrict =  this.debGuarantor.SubDistrict.label
                   }
                }
                if(this.debitorCollaterall.District != null){
                  if(this.debitorCollaterall.District.value){
                    this.debitorCollaterall.DistrictCode =  this.debitorCollaterall.District.value
                   }
                   if(this.debitorCollaterall.District.label){
                    this.debitorCollaterall.District =  this.debitorCollaterall.District.label
                   }
                }
                if(this.debitorCollaterall.Province != null){
                  if(this.debitorCollaterall.Province.value){
                    this.debitorCollaterall.ProvinceCode =  this.debitorCollaterall.Province.value
                   }
                   if(this.debitorCollaterall.Province.label){
                    this.debitorCollaterall.Province =  this.debitorCollaterall.Province.label
                   }
                }
                if(this.debitorCollaterall.SubDistrict != null){
                  if(this.debitorCollaterall.SubDistrict.value){
                    this.debitorCollaterall.SubDistrictCode =  this.debitorCollaterall.SubDistrict.value
                   }
                   if(this.debitorCollaterall.SubDistrict.label){
                    this.debitorCollaterall.SubDistrict =  this.debitorCollaterall.SubDistrict.label
                   }
                }

                    this.debitorCollaterall.UpdatedBy = this.username
                    let dataDebitorCollaterall = await apiDebitorCollaterall.updateByDEBCode(this.DebCode,this.debitorCollaterall)

                    this.debGuarantor.UpdatedBy = this.username
                    let dataDebGuarantor = await apiDebGuarantor.updateByDEBCode(this.DebCode,this.debGuarantor)


                     this.showNotif(dataDebGuarantor,'data')
                  // }else{
                  //    alert("Harap isi data yang wajib...!!")
                  // }
                }
                finally {

                }
            },
             async saveDrafDataPemohonPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                  //   this.PassingDebCode(this.debitor.DebCode)
                    // this.debitor.ActiveUntil =  '2111-12-30'
                    this.debitor.Amount = this.debitAccount.DebValue
                    if(this.debitor.KTPFullName){
                      this.debitor.FullName = this.debitor.KTPFullName
                    }else{
                      this.debitor.FullName = this.debitor.ShortName
                    }
                      this.debitor.DateProposal = new Date()
                      this.debitor.DateRegistration = new Date()
                if(this.debitor.PlaceofBirth != null){
                  if(this.debitor.PlaceofBirth.label) {
                    this.debitor.PlaceofBirth = this.debitor.PlaceofBirth.label
                  }
                }
                if(this.debitor.Prov_code != null){
                   if(this.debitor.Prov_code.value) {
                    this.debitor.ProvinceCode =  this.debitor.Prov_code.value
                   }
                   if(this.debitor.Prov_code.label) {
                    this.debitor.Prov_code =  this.debitor.Prov_code.label
                   }
                }
                if(this.debitor.Dist_code != null){
                  if(this.debitor.Dist_code.value) {
                    this.debitor.DistrictCode =  this.debitor.Dist_code.value
                  }
                  if(this.debitor.Dist_code.label) {
                    this.debitor.Dist_code =  this.debitor.Dist_code.label
                  }
                }
                if(this.debitor.Subdis_code != null){
                  if(this.debitor.Subdis_code.value) {
                    this.debitor.SubDistrictCode =  this.debitor.Subdis_code.value
                  }
                  if(this.debitor.Subdis_code.label) {
                    this.debitor.Subdis_code =  this.debitor.Subdis_code.label
                  }
                }
               if(this.debitor.KTPProv_code != null){
                if(this.debitor.KTPProv_code.value) {
                    this.debitor.KTPProvinceCode  =  this.debitor.KTPProv_code.value
                  }
                  if(this.debitor.KTPProv_code.label) {
                    this.debitor.KTPProv_code =  this.debitor.KTPProv_code.label
                  }
               }
               if(this.debitor.KTPDist_code != null){
                if(this.debitor.KTPDist_code.value){
                  this.debitor.KTPDistrictCode  =  this.debitor.KTPDist_code.value
                }
                if(this.debitor.KTPDist_code.label){
                  this.debitor.KTPDist_code =  this.debitor.KTPDist_code.label
                }
               }
               if(this.debitor.KTPSubdis_code != null){
                 if(this.debitor.KTPSubdis_code.value){
                  this.debitor.KTPSubDistrictCode =  this.debitor.KTPSubdis_code.value
                }
                if(this.debitor.KTPSubdis_code.label){
                  this.debitor.KTPSubdis_code =  this.debitor.KTPSubdis_code.label
                }
               }

                        this.debitor.Reference = this.debitorVenture.SynergyCompany
                        this.debitor.Instance = this.debitorVenture.BusinessName
                    this.debitor.UpdatedBy = this.username
                       let data = await apiDebitor.update(this.DebCode,this.debitor)

                     this.showNotif(data,'data')
                  // }else{
                  //    alert("Harap isi data yang wajib...!!")
                  // }
                }
                finally {

                }
            },
            async saveDrafDataPendampingPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                  //   this.PassingDebCode(this.debitor.DebCode)
               if(this.debitorEmerg1.PlaceofBirth != null){
                if(this.debitorEmerg1.PlaceofBirth.label) {
                  this.debitorEmerg1.PlaceofBirth = this.debitorEmerg1.PlaceofBirth.label
                }
               }
                    this.debitorEmerg1.UpdatedBy = this.username
                    let datadebitorEmerg1 = await apiDebitorEmerg.updateByDEBCode(true,this.DebCode,this.debitorEmerg1)
                     this.showNotif(datadebitorEmerg1,'data')
                  // }else{
                  //    alert("Harap isi data yang wajib...!!")
                  // }
                }
                finally {

                }
            },
            async saveDrafKeluargaTerdekatPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                  //   this.PassingDebCode(this.debitor.DebCode)

               if(this.debitorEmerg2.District != null){
                if(this.debitorEmerg2.District.value){
                  this.debitorEmerg2.DistrictCode =  this.debitorEmerg2.District.value
                }
                if(this.debitorEmerg2.District.label){
                  this.debitorEmerg2.District =  this.debitorEmerg2.District.label
                }
               }
               if(this.debitorEmerg2.Province != null){
                if(this.debitorEmerg2.Province.value){
                  this.debitorEmerg2.ProvinceCode =  this.debitorEmerg2.Province.value
                }
                if(this.debitorEmerg2.Province.label){
                  this.debitorEmerg2.Province =  this.debitorEmerg2.Province.label
                }
               }
                if(this.debitorEmerg2.SubDistrict != null){
                  if(this.debitorEmerg2.SubDistrict.value){
                    this.debitorEmerg2.SubDistrict =  this.debitorEmerg2.SubDistrict.value
                   }
                   if(this.debitorEmerg2.SubDistrict.label){
                    this.debitorEmerg2.SubDistrict =  this.debitorEmerg2.SubDistrict.label
                   }
                }

                    this.debitorEmerg2.UpdatedBy = this.username
                    let datadebitorEmerg2 = await apiDebitorEmerg.updateByDEBCode(false,this.DebCode,this.debitorEmerg2)

                     this.showNotif(datadebitorEmerg2,'data')
                  // }else{
                  //    alert("Harap isi data yang wajib...!!")
                  // }
                }
                finally {

                }
            },
            // async saveDrafDataUsahaPemohonan(){
            //     try{
            //       // this.$v.$touch()
            //       // if (!this.$v.$invalid) {
            //       //   this.PassingDebCode(this.debitor.DebCode)

            //     if(this.debitorVenture.District != null){
            //       if(this.debitorVenture.District.label){
            //         this.debitorVenture.District =  this.debitorVenture.District.label
            //       }
            //     }
            //     if(this.debitorVenture.Province != null){
            //       if(this.debitorVenture.Province.label){
            //         this.debitorVenture.Province =  this.debitorVenture.Province.label
            //       }
            //     }
            //     if(this.debitorVenture.SubDistrict != null){
            //       if(this.debitorVenture.SubDistrict.label) {
            //         this.debitorVenture.SubDistrict =  this.debitorVenture.SubDistrict.label
            //       }
            //     }

            //         let dataDebitorVenture = await apiDebitorVenture.updateByDEBCode(this.DebCode,this.debitorVenture)


            //          this.showNotif(dataDebitorVenture,'data')
            //       // }else{
            //       //    alert("Harap isi data yang wajib...!!")
            //       // }
            //     }
            //     finally {

            //     }
            // },
             async saveDrafWiraswastaPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                  //   this.PassingDebCode(this.debitor.DebCode)

                    this.debProfession1.UpdatedBy = this.username
                    let datadebProfession1 = await apiDebProfession.update(this.debProfession1.DebProfessionID,this.debProfession1)
                     this.showNotif(datadebProfession1,'data')
                  // }else{
                  //    alert("Harap isi data yang wajib...!!")
                  // }

                }
                finally {

                }
            },
            async saveDrafDataPenghasilanPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                  //   this.PassingDebCode(this.debitor.DebCode)

                    this.IncomeData.UpdatedBy = this.username
                     let dataIncomeData = await apiIncomeData.updateByDEBCode(this.DebCode,this.IncomeData)
                     this.showNotif(dataIncomeData,'data')
                  // }else{
                  //    alert("Harap isi data yang wajib...!!")
                  // }
                }
                finally {

                }
            },
             async saveDrafAppBankDataPemohonan(){
                try{
                  // this.$v.$touch()
                  // if (!this.$v.$invalid) {
                    this.PassingDebCode(this.debitor.DebCode)
                    this.AppBankData.UpdatedBy = this.username
                    let dataAppBankData = await apiAppBankData.updateByDEBCode(this.DebCode,this.AppBankData)
                     this.showNotif(dataAppBankData,'data')
                  // }else{
                  //    alert("Harap isi data yang wajib...!!")
                  // }
                }
                finally {

                }
            },
            PassingDebCode(debcode){
                this.debitAccount.DebCode = debcode
                this.debProfession1.DebCode = debcode
                // this.debProfession2.DebCode = debcode
                this.debitorEmerg1.DebCode = debcode
                this.debitorEmerg2.DebCode = debcode
                this.debitorVenture.DebCode = debcode
                this.debGuarantor.DebCode = debcode
                this.debitorCollaterall.DebCode = debcode
                this.IncomeData.DebCode = debcode
                this.AppBankData.DebCode = debcode
            },

           async cekOpenAccount(id){
                var cekChannel = await apiDebitAccount.CanOpenAccount(id)
                if(!cekChannel.Data){
                    alert("Mitra masih mempunyai tunggakan.")
                }
                console.log(cekChannel);
            },
            // PassingWilayah(){

            //   if(this.debitor.PlaceofBirth != null) this.debitor.PlaceofBirth = this.debitor.PlaceofBirth.label

            //   if(this.debitor.Prov_code != null) this.debitor.Prov_code =  this.debitor.Prov_code.label
            //    if(this.debitor.Dist_code != null) this.debitor.Dist_code =  this.debitor.Dist_code.label
            //    if(this.debitor.Subdis_code != null) this.debitor.Subdis_code =  this.debitor.Subdis_code.label

            //     if(this.debitor.KTPProv_code != null) this.debitor.KTPProv_code =  this.debitor.KTPProv_code.label
            //    if(this.debitor.KTPDist_code != null) this.debitor.KTPDist_code =  this.debitor.KTPDist_code.label
            //    if(this.debitor.KTPSubdis_code != null) this.debitor.KTPSubdis_code =  this.debitor.KTPSubdis_code.label

            //     if(this.debitorEmerg2.District != null) this.debitorEmerg2.District =  this.debitorEmerg2.District.label
            //     if(this.debitorEmerg2.Province != null) this.debitorEmerg2.Province =  this.debitorEmerg2.Province.label
            //     if(this.debitorEmerg2.SubDistrict != null) this.debitorEmerg2.SubDistrict =  this.debitorEmerg2.SubDistrict.label

            //     if(this.debitorVenture.District != null) this.debitorVenture.District =  this.debitorVenture.District.label
            //     if(this.debitorVenture.Province != null) this.debitorVenture.Province =  this.debitorVenture.Province.label
            //     if(this.debitorVenture.SubDistrict != null) this.debitorVenture.SubDistrict =  this.debitorVenture.SubDistrict.label
            // }

     }
  }
</script>
