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
                  <strong>Input Data Persetujuan</strong>
                </div>

                <b-row style="margin-top:10px">
                  <b-col sm="3">
                    <label for="ccnumber">Tanggal :
                       <b class="text-danger"> *</b>
                     </label>
                  </b-col>
                  <b-col sm="9">
                      <date-picker  style="width: 100%;"  v-model="persetujuan.AppDate" :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id" :class="{'is-invalid': $v.persetujuan.AppDate.$error}"></date-picker>
                   <!--   <b-form-input  type="date" v-model="persetujuan.AppDate"  required :class="{'is-invalid': $v.persetujuan.AppDate.$error}"></b-form-input> -->
                      <div class="text-danger" v-if="$v.persetujuan.AppDate.$error">Tanggal harus diisi</div>
                  </b-col>
                </b-row>

                <b-row style="margin-top:10px">
                   <b-col sm="3">
                      <label for="ccnumber">No. Persetujuan :
                         <!-- <b class="text-danger"> *</b> -->
                       </label>
                   </b-col>
                   <b-col sm="9">
                       <b-form-input  v-model="PKAgreement.ApprovalNumber"  type="text" required disabled></b-form-input>
                   </b-col>
                 </b-row>

                 <b-row style="margin-top:10px">
                    <b-col sm="3">
                       <label for="ccnumber">Prihal :
                          <!-- <b class="text-danger"> *</b> -->
                        </label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input v-model="PKAgreement.Subject" type="text" required disabled></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- <b-row style="margin-top:10px">
                     <b-col sm="3">
                        <label for="ccnumber">Sistem Bunga :
                           <b class="text-danger"> *</b>
                         </label>
                     </b-col>
                     <b-col sm="9">
                         <b-form-select v-model="PKAgreement.FeeSystem" :options="options_Sistem_Bunga"></b-form-select>
                     </b-col>
                   </b-row> -->

                   <!-- <b-row style="margin-top:10px">
                      <b-col sm="3">
                         <label for="ccnumber">Grace Period :
                            <b class="text-danger"> *</b>
                          </label>
                      </b-col>
                      <b-col sm="6">
                          <b-form-input type="number" required></b-form-input>
                      </b-col>
                      <b-col sm="3">
                         <label for="ccnumber">Bulan
                            <b class="text-danger"> *</b>
                          </label>
                      </b-col>
                  </b-row> -->

                  <!-- <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Mulai bayar tanggal :
                         <b class="text-danger"> *</b>
                       </label>
                    </b-col>
                    <b-col sm="9">
                       <b-form-input v-model="persetujuan" type="date" required ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                    <b-col sm="3">
                      <label for="ccnumber">Jatuh Tempo per Bulan :
                         <b class="text-danger"> *</b>
                       </label>
                    </b-col>
                    <b-col sm="9">
                       <b-form-input v-model="persetujuan" type="date" required ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top:10px">
                     <b-col sm="3">
                        <label for="ccnumber">Siklus Angsuran :
                           <b class="text-danger"> *</b>
                         </label>
                     </b-col>
                     <b-col sm="9">
                         <b-form-select v-model="persetujuan.Siklus_Angsuran" :options="options_Siklus_Angsuran"></b-form-select>
                     </b-col>
                   </b-row> -->

                   <!-- <b-row style="margin-top:10px">
                    <b-col sm="3">

                    </b-col>
                    <b-col sm="2">
                      <label for="ccnumber">Lainnya, sebutkan
                         <b class="text-danger"> *</b>
                       </label>
                    </b-col>
                    <b-col sm="7">
                      <b-form-input v-model="permohonan.HomeOwnStatus" type="text" required></b-form-input>
                    </b-col>
                   </b-row> -->

                  <!-- <b-row style="margin-top:10px">
                     <b-col sm="3">
                        <label for="ccnumber">Jenis Pinjaman :
                           <b class="text-danger"> *</b>
                         </label>
                     </b-col>
                     <b-col sm="9">
                         <b-form-select v-model="persetujuan.Pinjaman" :options="options_Pinjaman"></b-form-select>
                     </b-col>
                   </b-row> -->

                    <b-row style="margin-top:10px">
                      <b-col sm="12">
                        <b-button v-b-toggle.collapse-1 variant="light">Data Calon Mitra Binaan</b-button>
                          <b-collapse id="collapse-1" class="mt-2">
                            <b-card>
                                <b-row style="margin-top:10px">
                                  <b-col sm="3">
                                    <label for="ccnumber">Nama lengkap sesuai KTP
                                       <!-- <b class="text-danger"> *</b> -->
                                     </label>
                                  </b-col>
                                  <b-col sm="9">
                                     <b-form-input type="text" v-model="permohonan.KTPFullName" required disabled></b-form-input>
                                  </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Nama Panggilan
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                   <b-form-input type="text" v-model="permohonan.ShortName" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Jenis Kelamin
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="2">
                                 <b-form-input type="text" v-model="permohonan.Gender" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Tempat & tanggal lahir
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="4">
                                   <b-form-input v-model="permohonan.PlaceofBirth" type="text" required disabled></b-form-input>
                                </b-col>
                                <b-col sm="4">
                                   <b-form-input v-model="permohonan.DateofBirth" type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Nomor KTP
                                     <b class="text-danger"> *</b>
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                   <b-form-input v-model="permohonan.IDNumber" type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Nomor NPWP
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                   <b-form-input v-model="permohonan.NPWPNumber" type="number" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Nama gadis ibu kandung
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                   <b-form-input v-model="permohonan.MotherName" type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Status perkawinan
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="2">
                                 <b-form-input v-model="permohonan.MaritalStatus" type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Jumlah tanggungan
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="6">
                                   <b-form-input v-model="permohonan.NumberOfDependents" type="text" required disabled> </b-form-input>
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
                                 <b-form-input v-model="permohonan.LastEducation" type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Jenis Pekerjaan
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                  <b-form-input v-model="permohonan.TypeOfWork" type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                 <b-col sm="3">
                                    <label for="ccnumber">Status rumah
                                       <!-- <b class="text-danger"> *</b> -->
                                     </label>
                                 </b-col>
                                 <b-col sm="9">
                                   <b-form-input v-model="permohonan.HomeOwnStatus" type="text" required disabled></b-form-input>
                                 </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                 <b-col sm="3">

                                 </b-col>
                                 <b-col sm="2">
                                   <label for="ccnumber">Lainnya, sebutkan
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                 </b-col>
                                 <b-col sm="7">
                                   <b-form-input  v-model="permohonan.HomeOwnStatus"  type="text" required disabled></b-form-input>
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
                                   v-model="permohonan.Address"
                                   placeholder="Enter something..."
                                   rows="3"
                                   max-rows="6" disabled></b-form-textarea>
                                </b-col>
                                </b-row>

                               <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Provinsi
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input type="text" v-model="permohonan.Prov_code" disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Kabupaten/Kota
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input type="text" v-model="permohonan.Dist_code" disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Kecamatan
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input type="text" v-model="permohonan.Subdis_code"  disabled></b-form-input>
                                </b-col>
                                </b-row>


                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Kelurahan
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                   <b-form-input type="text" v-model="permohonan.Village_code"  s disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                  <label for="ccnumber">Kode Pos
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input v-model="permohonan.PosCode"  type="number" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                 <label for="ccnumber">Alamat sesuai KTP(jika berbeda dengan tempat tinggal saat ini)
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                                </b-col>
                                <b-col sm="9">
                                <b-form-textarea
                                 id="textarea"
                                 v-model="permohonan.KTPAddress"
                                 placeholder="Enter something..."
                                 rows="3"
                                 max-rows="6" disabled></b-form-textarea>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">Kelurahan
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                 <b-form-input type="text" v-model="permohonan.KTPVillage_code" disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">Kabupaten/Kota
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                  <b-form-input type="text" v-model="permohonan.KTPDist_code" disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">Kecamatan
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                  <b-form-input type="text" v-model="permohonan.KTPSubdis_code" disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">Kode Pos
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                  <b-form-input v-model="permohonan.KTPPosCode"  type="number" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">No.Telepon
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                 <b-form-input v-model="permohonan.Phone"  type="number" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">No. HP 1
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                 <b-form-input v-model="permohonan.Hp1" type="number" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">No. HP 2
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                 <b-form-input v-model="permohonan.Hp2" type="number" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">No Facsimile
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                 <b-form-input  v-model="permohonan.FaxNumber"  type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">Alamat email
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                 <b-form-input v-model="permohonan.eMail"  type="text" placeholder="b@gmail.com" required disabled></b-form-input>
                                </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                <b-col sm="3">
                                <label for="ccnumber">Akun Social Media
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                                </b-col>
                                <b-col sm="9">
                                 <b-form-input v-model="permohonan.SocialMediaAccount"  type="text" required disabled></b-form-input>
                                </b-col>
                                </b-row>
                            </b-card>
                          </b-collapse>
                      </b-col>
                    </b-row>

                  <!-- <b-row style="margin-top:10px">
                    <b-col sm="12">
                      <label for="ccnumber"><b>Data Calon Program Kemitraan</b>
                         <b class="text-danger"> *</b>
                       </label>
                    </b-col>
                  </b-row> -->

                  <b-row style="margin-top:10px">
                    <b-col sm="12">
                     <!--  <b-button v-b-toggle.collapse-2 variant="light">Ketentuan dan Syarat-syarat</b-button>
                        <b-collapse id="collapse-2" class="mt-2"> -->
                          <b-card>
                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">1. Nilai Rekomendasi :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <!-- <b-form-input v-model="persetujuan.RecomendationValue" type="number" required></b-form-input> -->
                                   <vue-numeric currency="Rp." disabled class="form-control" output-type="Number" v-model="RecomendationValue"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric>
                               </b-col>
                             </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">1. Maksimal Pinjaman :
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <!-- <b-form-input v-model="persetujuan.RecomendationValue" type="number" required></b-form-input> -->
                                   <money class="form-control" v-model="persetujuan.RecomendationValue" v-bind="money" :class="{'is-invalid': $v.persetujuan.RecomendationValue.$error}"></money>
                                    <div class="text-danger" v-if="$v.persetujuan.RecomendationValue.$error">Maksimal Pinjaman harus diisi</div>
                               </b-col>
                             </b-row>

                           <!--   <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">2. Kegunaan : -->
                                      <!-- <b class="text-danger"> *</b> -->
                                   <!--  </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input v-model="PKAgreement.Functions" type="text" required></b-form-input>
                                </b-col>
                              </b-row> -->

                              <b-row style="margin-top:10px">
                                 <b-col sm="3">
                                    <label for="ccnumber">2. Jenis Kredit :
                                       <!-- <b class="text-danger"> *</b> -->
                                     </label>
                                 </b-col>
                                 <b-col sm="9">
                                     <b-form-input v-model="PKAgreement.KreditType" type="text" required disabled></b-form-input>
                                 </b-col>
                               </b-row>

                               <b-row style="margin-top:10px">
                                  <b-col sm="3">
                                     <label for="ccnumber">3. Jangka Waktu :
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                  </b-col>
                                  <b-col sm="2">
                                      <b-form-input v-model="PKAgreement.Tenor"  type="number" required  disabled></b-form-input>

                                  </b-col>
                                  <b-col sm="3">
                                     <label for="ccnumber">Maksimal 36 Bulan
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                  </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                   <b-col sm="3">
                                      <label for="ccnumber">4. Presentase Jasa :
                                         <!-- <b class="text-danger"> *</b> -->
                                       </label>
                                   </b-col>
                                   <b-col sm="2">
                                       <b-form-input v-model="PKAgreement.FeeValue" type="number" required disabled></b-form-input>

                                   </b-col>
                                   <b-col sm="3">
                                      <label for="ccnumber">%
                                         <!-- <b class="text-danger"> *</b> -->
                                       </label>
                                   </b-col>
                                 </b-row>

                                 <b-row style="margin-top:10px"  v-if="status != 'Ubah' && status != 'UbahApp' && statusPencairan == null">
                                    <b-col sm="3">
                                       <label for="ccnumber">Keputusan :
                                          <b class="text-danger"> *</b>
                                        </label>
                                    </b-col>
                                    <b-col sm="2">
                                     <b-form-radio v-model="persetujuan.Status" name="persetujuan.Status" value="Layak" :class="{'is-invalid': $v.persetujuan.Status.$error}">Layak</b-form-radio>
                                    </b-col>
                                    <b-col sm="2">
                                     <b-form-radio v-model="persetujuan.Status" name="persetujuan.Status" value="Tidak layak" :class="{'is-invalid': $v.persetujuan.Status.$error}">Tidak layak</b-form-radio>
                                    </b-col>
                                    <b-col sm="2">
                                     <b-form-radio v-model="persetujuan.Status" name="persetujuan.Status" value="Tunda" :class="{'is-invalid': $v.persetujuan.Status.$error}">Tunda</b-form-radio>
                                    </b-col>
                                     <div class="text-danger" v-if="$v.persetujuan.Status.$error">Keputusan  harus diisi</div>
                                  </b-row>
                          </b-card>
                        <!-- </b-collapse> -->
                    </b-col>
                  </b-row>



                        <b-row style="margin-top:30px"  v-if="status != 'Ubah' && status != 'UbahApp' && statusPencairan == null">
                          <b-col sm="3">
                          </b-col>
                          <b-col sm="6">
                            <div class="form-group form-actions">
                              <b-button type="submit" size="md" variant="primary"  v-on:click="saveSubmit()" :disabled="klik">Simpan</b-button>
                            </div>
                          </b-col>
                        </b-row>

                         <b-row style="margin-top:30px"  v-if="status == 'Ubah' || status == 'UbahApp' && statusPencairan == null">
                          <b-col sm="3">
                          </b-col>
                          <b-col sm="6">
                            <div class="form-group form-actions">
                              <b-button type="submit" size="md" variant="primary"  v-on:click="saveDraft()" :disabled="klik">Ubah</b-button>
                            </div>
                          </b-col>
                        </b-row>

              </b-card>
          </b-col>
      </b-row>
  </div>
</template>
<script>
   import moment from 'moment'
  import { required, minLength } from "vuelidate/lib/validators";
    import apiDebitor from '@/api/PK/DebitorApiService';
    import apiDebitAccount from '@/api/PK/DebitAccountApiService';
    import apiBLApprovalWorkflow from '@/api/PK/PKApprovalWorkflowApiService';
    import apiApproval from '@/api/PK/PKApprovalApiService';
    import apiPKAgreement from '@/api/PK/PKAgreementApiService';
    import apiPKSurvey from '@/api/PK/PKSurveyApiService';
    import apiDebitAccountWorkFlow from '@/api/PK/DebitAccountWorkFlowApiService';
    import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
    import apiPKType from '@/api/PK/PKTypeApiService';
    import dynamic from '@/api/DynamicApiService';
    import DANumberGenerate from '@/api/genereteDANumberApiService';
    import VueNumeric from 'vue-numeric';
    import {Money} from 'v-money'
     export default {
        components: {
          'vue-numeric' : VueNumeric,
          'money' : Money
        },
         data() {
            return {
              loading:false,
              klik:false,
              cabang:null,
              username:null,
               status:'insert',
              statusPencairan: null,
              RecomendationValue:0,
              configConfirm:null,
              textConfirm:null,
              dataTableApprovalNumber: {
                Colum: "ApprovalNumber",
                Table: "PKAgreement",
                Start: 0,
                Search: null
              },
              dataTableDANumber: {
                Colum: "DANumber",
                Table: "DebitAccount",
                Start: 0,
                Search: null
              },
               debitAccountState:{},
              DebitAccountWorkFlow:{},
              DebCode:null,
              DACode: null,
              AppWorkCode: null,
              PKSurvey:{},
              PKAgreement:{
                PKAgreeId: 0,
                FeeValue: 0,
                  ApprovalNumber: null,
                Subject : 'Persetujuan Pinjaman',
                KreditType: ''
              },
              permohonan:{},
              debitAccount:{},
              approval:{
                Value:0
              },
              persetujuan:{
                  DACode:null,
                  PKAgreeId: null,
                  ReqDate: new Date(),
                  Status:null,
                  RecomendationValue:0,
               },
               options_Pinjaman:[
                    { text: 'Pinjaman Modal Kerja', value: 'Pinjaman Modal Kerja' },
                    { text: 'Pinjaman Investasi', value: 'Pinjaman Investasi' },
                    { text: 'Pinjaman Khusus', value: 'Pinjaman Khusus' },
                    { text: 'Pendidikan, Pelatihan dan Pemagangan', value: 'Pendidikan, Pelatihan dan Pemagangan' },
                    { text: 'Pemasaran dan Promosi', value: 'Pemasaran dan Promosi' },
                    { text: 'Pinjaman Berjangka', value: 'Pinjaman Berjangka' }
                ],
                options_Sistem_Bunga:[
                     { text: 'Flat', value: 'Flat' },
                     { text: 'Saldo Menurun', value: 'Saldo Menurun' }
                 ],
                 options_Siklus_Angsuran:[
                      { text: 'Bulanan', value: 'Bulanan' },
                      { text: 'Yarnen/Lainnya', value: 'Yarnen' }
                  ],
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
            persetujuan: {
              AppDate: { required },
              Status: { required },
              RecomendationValue: { required, minLength: minLength(3) },
            },
            //  PKAgreement: {
            //   Tenor: { required },
            //   FeeValue: { required },
            // }
          },
          async created() {
            this.loading = true
             this.username = localStorage.username
             this.DebCode = this.$route.params.DebCode;
            this.DACode = this.$route.params.DACode;
            this.AppWorkCode = this.$route.params.AppWorkCode
             this.status =  this.$route.params.Mode;;

              this.cabang = localStorage.cabang
              this.dataTableApprovalNumber.Search =  '2000.'+new Date().getFullYear()+'.DRS.'
              this.dataTableApprovalNumber.Start =  this.dataTableApprovalNumber.Search.length + 1
              var codeApprovalNumber = await this.getCount(this.dataTableApprovalNumber)
              this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
              this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
              // var autoincDebitor = await dynamic.getCount('PKAgreement/Count')
            this.PKAgreement.ApprovalNumber = codeApprovalNumber

             if(this.DebCode != undefined){
               var getDebitur = await apiDebitor.getOne(this.DebCode)
                if(getDebitur.Data[0]){
                    this.permohonan = getDebitur.Data[0]
                    if(getDebitur.Data[0].Gender){
                      this.permohonan.Gender = "Laki-laki"
                    }else{
                       this.permohonan.Gender = "Perempuan"
                    }
                    this.permohonan.DateofBirth = this.formatDateDMY(getDebitur.Data[0].DateofBirth)
                    if(getDebitur.Data[0].MaritalStatus == 1){
                      this.permohonan.MaritalStatus = "Lajang"
                    }else if(getDebitur.Data[0].MaritalStatus == 2){
                       this.permohonan.MaritalStatus = "Menikah"
                    }else{
                       this.permohonan.MaritalStatus = "Duda/Janda"
                    }
                }
             }
              var idAppWork = Number(this.AppWorkCode) - 1
             var NilaiRekomendasi = await apiBLApprovalWorkflow.getOne(idAppWork)
             this.RecomendationValue = NilaiRekomendasi.Data[0].RecomendationValue
             console.log("NILAI REKOMEN",NilaiRekomendasi)
             var getApprovalWorkflow = await apiBLApprovalWorkflow.getOne(this.AppWorkCode)
             this.persetujuan = getApprovalWorkflow.Data[0]
             if(getApprovalWorkflow.Data[0].AppDate){
                this.persetujuan.AppDate = getApprovalWorkflow.Data[0].AppDate
             }
             // console.log(getApprovalWorkflow.Data[0])
             if(getApprovalWorkflow.Data[0].PKAgreeId > 0 ){
                 var getPKAgreement = await apiPKAgreement.getByPKAgreeId(getApprovalWorkflow.Data[0].PKAgreeId)
                 this.PKAgreement = getPKAgreement.Data[0]
             }
             this.PKAgreement.FeeValue = await this.getSukuBunga()

             var getApproval = await apiApproval.getOneByDACode(this.DACode)
             this.approval = getApproval.Data

             if(this.DACode){
                var getDebitAccount = await apiDebitAccount.getOne(this.DACode)
                if(getDebitAccount.Data[0]){
                 this.debitAccount = getDebitAccount.Data[0]
                 this.PKAgreement.Tenor = getDebitAccount.Data[0].Tenor
                 // console.log("DEBITACCOUNT", this.debitAccount)
                }

                var getPKSurvey = await apiPKSurvey.getByDaCode(this.DACode)
                if(getPKSurvey.Data[0]){
                 // this.PKSurvey = getPKSurvey.Data[0]
                 if( getPKSurvey.Data[0].LoanType){
                  var getPKType = await apiPKType.getOne(getPKSurvey.Data[0].LoanType)
                  console.log(getPKType)
                  if(getPKType[0]){
                    if(getPKType[0].PkTypeName ){
                      this.PKAgreement.KreditType = getPKType[0].PkTypeName
                    }
                  }
                 }

                }

                var getDebitAccountWorkFlow = await apiDebitAccountWorkFlow.getOneByDACode(this.DACode)
                 if(getDebitAccountWorkFlow.Data[0]){
                    this.DebitAccountWorkFlow = getDebitAccountWorkFlow.Data[0]
                    if(getDebitAccountWorkFlow.Data[0].TanggalPencairan){
                       this.statusPencairan = getDebitAccountWorkFlow.Data[0].TanggalPencairan
                    }
                 }

              let dataDebitAccountState = await apiDebitAccountState.getOneByDACode(this.DACode)
               if(dataDebitAccountState.Data[0]){
                  this.debitAccountState = dataDebitAccountState.Data[0]
               }
                 console.log("DATA STATE", this.debitAccountState)
             }

             this.loading = false
          },
           methods: {
            disabledDate(date) {
              return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
            },
            async saveDraft(){
               this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                         .then(async (value) => {
                            if(value){
                                this.loading = true
                                 this.klik = true
                                this.persetujuan.DACode = this.DACode
                                 if(this.status == 'Ubah'){
                                     this.persetujuan.Status = 'Tunda'
                                     this.persetujuan.AppDate = null
                                  }
                                 if(this.PKAgreement.PKAgreeId > 0){
                                  console.log("DATANYA",this.debitAccount)
                                    this.PKAgreement.UpdatedBy = this.username
                                    let dataAgree = await apiPKAgreement.update(this.PKAgreement.PKAgreeId,this.PKAgreement)
                                     this.persetujuan.PKAgreeId =  this.PKAgreement.PKAgreeId
                                     this.debitAccount.DebValue = this.persetujuan.RecomendationValue
                                    this.debitAccount.UpdatedBy = this.username
                                     let dataDebitAccount = await apiDebitAccount.update(this.DACode,this.debitAccount)

                                    this.persetujuan.UpdatedBy = this.username
                                      let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                      this.loading = false
                                       this.showNotif(data,'Penilaian')
                                      this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                                  }else{
                                    this.PKAgreement.CreatedBy = this.username
                                     let dataAgree = await apiPKAgreement.create(this.PKAgreement)
                                     this.persetujuan.PKAgreeId =  dataAgree.Data

                                    this.persetujuan.UpdatedBy = this.username
                                      let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                        this.loading = false
                                       this.showNotif(data,'Penilaian')
                                      this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                                  }
                            }
                         })
                         .catch(err => {
                          // An error occurred
                         })
            },
            async saveSubmit(){
               try {
                 this.$v.$touch()
                  if (!this.$v.$invalid) {
                     this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                         .then(async (value) => {
                            if(value){
                                 this.loading = true
                                  this.klik = true
                                   if(this.persetujuan.Status == 'Layak'){
                                  var DaNumber =  await DANumberGenerate.getDANumber(this.cabang)
                                    this.debitAccount.DANumber = DaNumber

                                    // console.log(this.debitAccount.DANumber)
                                    this.persetujuan.DACode = this.DACode
                                    // this.persetujuan.ReqDate = null
                                     this.persetujuan.Status = 'Layak'

                                     this.debitAccount.StatusApprove = 'Approve'
                                      this.debitAccount.DebValue = this.persetujuan.RecomendationValue

                                      this.debitAccountState.ApprovedDate = new Date()
                                      this.debitAccountState.ApprovedValue = this.persetujuan.RecomendationValue

                                    this.debitAccount.UpdatedBy = this.username
                                     let dataDebitAccount = await apiDebitAccount.update(this.DACode,this.debitAccount)

                                    this.debitAccountState.UpdatedBy = this.username
                                     let dataDebitAccountState = await apiDebitAccountState.update(this.DACode,this.debitAccountState)

                                     if(this.PKAgreement.PKAgreeId > 0){
                                        this.PKAgreement.UpdatedBy = this.username
                                        let dataAgree = await apiPKAgreement.update(this.PKAgreement.PKAgreeId,this.PKAgreement)
                                         this.persetujuan.PKAgreeId =  this.PKAgreement.PKAgreeId
                                        this.persetujuan.UpdatedBy = this.username
                                        let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)

                                        this.approval.Value = this.persetujuan.RecomendationValue
                                        this.approval.UpdatedBy = this.username
                                        let dataApproval = await apiApproval.update(this.approval.PKAppId,this.approval)

                                          this.loading = false
                                         this.showNotif(dataApproval,'Penilaian')
                                        this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                                      }else{
                                        this.PKAgreement.CreatedBy = this.username
                                         let dataAgree = await apiPKAgreement.create(this.PKAgreement)
                                        this.persetujuan.UpdatedBy = this.username
                                         this.persetujuan.PKAgreeId =  dataAgree.Data
                                         let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)

                                        this.approval.Value = this.persetujuan.RecomendationValue
                                        this.approval.UpdatedBy = this.username
                                        let dataApproval = await apiApproval.update(this.approval.PKAppId,this.approval)

                                          this.loading = false
                                         this.showNotif(dataApproval,'Penilaian')
                                        this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                                      }
                                       // console.log('dataAgree',dataAgree.Data)

                                  }else if(this.persetujuan.Status == 'Tidak layak'){
                                    this.persetujuan.DACode = this.DACode
                                    // this.persetujuan.ReqDate = null
                                     this.persetujuan.Status = 'Tidak layak'

                                    if(this.PKAgreement.PKAgreeId > 0){
                                        this.PKAgreement.UpdatedBy = this.username
                                        let dataAgree = await apiPKAgreement.update(this.PKAgreement.PKAgreeId,this.PKAgreement)
                                         this.persetujuan.PKAgreeId =  this.PKAgreement.PKAgreeId

                                       console.log('persetujuan',this.persetujuan)

                                        this.persetujuan.UpdatedBy = this.username
                                    let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                        // this.persetujuan.UpdatedBy = this.username
                                     let updateStatus = await apiBLApprovalWorkflow.updateStatus(this.DACode,this.persetujuan)
                                      this.loading = false
                                     this.showNotif(updateStatus,'Penilaian')
                                    this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')

                                      }else{
                                        this.PKAgreement.CreatedBy = this.username
                                         let dataAgree = await apiPKAgreement.create(this.PKAgreement)
                                         this.persetujuan.PKAgreeId =  dataAgree.Data

                                        this.persetujuan.UpdatedBy = this.username
                                      let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                        // this.persetujuan.UpdatedBy = this.username
                                      let updateStatus = await apiBLApprovalWorkflow.updateStatus(this.DACode,this.persetujuan)
                                    this.loading = false
                                     this.showNotif(updateStatus,'Penilaian')
                                    this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                                      }
                                  }else{
                                    this.persetujuan.DACode = this.DACode
                                     this.persetujuan.Status = 'Tunda'
                                     this.persetujuan.AppDate = null
                                     if(this.PKAgreement.PKAgreeId > 0){
                                        this.PKAgreement.UpdatedBy = this.username
                                        let dataAgree = await apiPKAgreement.update(this.PKAgreement.PKAgreeId,this.PKAgreement)
                                         this.persetujuan.PKAgreeId =  this.PKAgreement.PKAgreeId

                                        this.persetujuan.UpdatedBy = this.username
                                          let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                              this.loading = false
                                           this.showNotif(data,'Penilaian')
                                          this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                                      }else{
                                        this.PKAgreement.CreatedBy = this.username
                                         let dataAgree = await apiPKAgreement.create(this.PKAgreement)
                                         this.persetujuan.PKAgreeId =  dataAgree.Data

                                        this.persetujuan.UpdatedBy = this.username
                                          let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                              this.loading = false
                                           this.showNotif(data,'Penilaian')
                                          this.$router.push('/bussiness-process-desaigner/workflow-initializationpk2')
                                      }
                                  }
                            }
                         })
                         .catch(err => {
                          // An error occurred
                         })

                  }else{
                      alert("Harap isi data yang wajib...!!")
                  }
               }
               finally {

              }
            },
           }
        }
</script>
