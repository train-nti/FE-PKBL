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
      <b-row v-if="!loading">
          <b-col sm="12">
              <b-card>
                <div slot="header">
                  <strong>Keputusan Penilaian</strong>
                </div>

                <b-tabs>
                    <b-tab title="A. Identitas Calon Mitra Binaan" active>
                      <b-row style="margin-top:10px">
                         <b-col sm="3">
                            <label for="ccnumber">No.Reff Penilaian :
                               <!-- <b class="text-danger"> *</b> -->
                             </label>
                         </b-col>
                         <b-col sm="9">
                             <b-form-input  v-model="PKSurvey.NoReff"  type="text" required disabled></b-form-input>
                         </b-col>
                     </b-row>

                     <b-row style="margin-top:10px">
                       <b-col sm="3">
                         <label for="ccnumber">Tanggal Proposal :
                            <!-- <b class="text-danger"> *</b> -->
                          </label>
                       </b-col>
                       <b-col sm="9">
                          <date-picker  style="width: 100%;" v-model="permohonan.DateProposal" :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
                          <!-- <b-form-input v-model="permohonan.DateProposal" type="date" required></b-form-input> -->
                       </b-col>
                     </b-row>

                     <b-row style="margin-top:10px">
                       <b-col sm="3">
                         <label for="ccnumber">Tanggal Survey :
                            <b class="text-danger"> *</b>
                          </label>
                       </b-col>
                       <b-col sm="9">
                          <date-picker  style="width: 100%;" v-model="approvalWorkflow.AppDate" :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id" :class="{'is-invalid': $v.approvalWorkflow.AppDate.$error}"></date-picker>
                         <!--  <b-form-input  v-model="approvalWorkflow.AppDate"   type="date" required  :class="{'is-invalid': $v.approvalWorkflow.AppDate.$error}"></b-form-input> -->
                           <div class="text-danger" v-if="$v.approvalWorkflow.AppDate.$error">Tanggal Survey harus diisi</div>
                       </b-col>
                     </b-row>

                     <b-row style="margin-top:10px">
                        <b-col sm="3">
                           <label for="ccnumber">Nama :
                              <!-- <b class="text-danger"> *</b> -->
                            </label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input v-model="permohonan.FullName" type="text" required disabled></b-form-input>
                        </b-col>
                    </b-row>

                      <b-row style="margin-top:10px">
                         <b-col sm="3">
                            <label for="ccnumber">Alamat Usaha :
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
                           <label for="ccnumber">Kecamatan :
                              <!-- <b class="text-danger"> *</b> -->
                            </label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input  v-model="permohonan.Dist_code" type="text" required disabled></b-form-input>
                        </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                         <b-col sm="3">
                            <label for="ccnumber">Kelurahan/Desa :
                               <!-- <b class="text-danger"> *</b> -->
                             </label>
                         </b-col>
                         <b-col sm="9">
                             <b-form-input v-model="permohonan.Subdis_code" type="text" required disabled></b-form-input>
                         </b-col>
                     </b-row>

                    <b-row style="margin-top:10px">
                        <b-col sm="3">
                           <label for="ccnumber">Bidang Usaha :
                              <!-- <b class="text-danger"> *</b> -->
                            </label>
                        </b-col>
                        <b-col sm="9">
                            <!-- <b-form-input type="text" required disabled></b-form-input> -->
                            <b-form-input v-model="PKSurvey.BusinessFields"  type="text" required></b-form-input>
                        </b-col>
                    </b-row>

                    <b-row style="margin-top:10px">
                         <b-col sm="3">
                            <label for="ccnumber">No Telepon :
                               <!-- <b class="text-danger"> *</b> -->
                             </label>
                         </b-col>
                         <b-col sm="9">
                             <b-form-input v-model="permohonan.Phone" type="number" required disabled></b-form-input>
                         </b-col>
                     </b-row>

                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Pengalaman Usaha :
                                <!-- <b class="text-danger"> *</b> -->
                              </label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-textarea
                             id="textarea"
                             v-model="PKSurvey.BussExp"
                             placeholder="Enter something..."
                             rows="3"
                             max-rows="6"></b-form-textarea>
                          </b-col>
                      </b-row>

                    </b-tab>

                    <b-tab title="B.Permohonan yang Diajukan Calon Mitra Binaan">
                          <b-row style="margin-top:10px">
                             <b-col sm="3">
                                <label for="ccnumber">No.Reff Costumer :
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                             </b-col>
                             <b-col sm="9">
                                 <b-form-input  v-model="permohonan.NoReference" type="text" required disabled></b-form-input>
                             </b-col>
                         </b-row>

                         <b-row style="margin-top:10px">
                           <b-col sm="3">
                             <label for="ccnumber">Permohonan Kredit :
                                <!-- <b class="text-danger"> *</b> -->
                              </label>
                           </b-col>
                           <b-col sm="9">
                              <money class="form-control" v-model="permohonan.Amount" v-bind="money" disabled></money>
                           </b-col>
                         </b-row>

                      </b-tab>

                   <!--    <b-tab title="C. Hubungan Calon Mitra Binaan">
                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Fasilitas bantuan yang pernah dan/atau sedang dinikmati dari BUMN lain : -->
                                     <!-- <b class="text-danger"> *</b> -->
                                 <!--   </label>
                               </b-col>
                               <b-col sm="9">
                                   <b-form-select v-model="PKSurvey.BumnFacility" :options="options_BumnFacility"></b-form-select>
                               </b-col>
                           </b-row>

                           <b-row style="margin-top:10px" v-if="PKSurvey.BumnFacility == 'Ya'">
                             <b-col sm="3">
                               <label for="ccnumber">Jika ada jelaskan : -->
                                  <!-- <b class="text-danger"> *</b> -->
                               <!--  </label>
                             </b-col>
                             <b-col sm="9">
                               <b-form-textarea
                                id="textarea"
                                v-model="PKSurvey.KetBumnFacilty"
                                placeholder="Enter something..."
                                rows="3"
                                max-rows="6"></b-form-textarea>
                             </b-col>
                           </b-row>

                        </b-tab> -->

                        <!-- <b-tab title="D. Legalitas Calon Mitra">
                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">No KTP Calon MB :
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <b-form-input type="number" required></b-form-input>
                               </b-col>
                           </b-row>

                           <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Nomor Kartu Keluarga :
                                    <b class="text-danger"> *</b>
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                  <b-form-input type="number" required></b-form-input>
                              </b-col>
                          </b-row>

                          <b-row style="margin-top:10px">
                             <b-col sm="3">
                                <label for="ccnumber">Nomor Surat Keterangan Usaha :
                                   <b class="text-danger"> *</b>
                                 </label>
                             </b-col>
                             <b-col sm="6">
                                 <b-form-input type="number" required></b-form-input>
                             </b-col>
                             <b-col sm="3">
                                <label for="ccnumber">dari kelurahan/desa
                                   <b class="text-danger"> *</b>
                                 </label>
                             </b-col>
                         </b-row>

                           <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Nomor Surat Ijin Usaha (SIUP):
                                    <b class="text-danger"> *</b>
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                  <b-form-input type="number" required></b-form-input>
                              </b-col>
                          </b-row>

                        </b-tab> -->

                          <b-tab title="C. Komitmen dan Motivasi">
                            <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Komitmen :
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                <b-form-textarea
                                 id="textarea"
                                 v-model="PKSurvey.Comitment"
                                 placeholder="Enter something..."
                                 rows="3"
                                 max-rows="6"></b-form-textarea>
                              </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">Motivasi :
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                <b-form-textarea
                                 id="textarea"
                                 v-model="PKSurvey.Motivation"
                                 placeholder="Enter something..."
                                 rows="3"
                                 max-rows="6"></b-form-textarea>
                              </b-col>
                            </b-row>
                          </b-tab>

                          <!-- <b-tab title="H. Motivasi">
                            <b-row style="margin-top:10px">
                              <b-col sm="12">
                                <b-form-textarea
                                 id="textarea"
                                 v-model="text"
                                 placeholder="Enter something..."
                                 rows="3"
                                 max-rows="6"></b-form-textarea>
                              </b-col>
                            </b-row>
                          </b-tab> -->

                          <b-tab title="D. Reputasi (Data Keu)">
                            <b-row style="margin-top:10px">
                              <b-col sm="12">
                                <label for="ccnumber"><h5><b>1. Data Keuangan</b></h5>
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                              </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                              <b-col sm="12">
                                <label for="ccnumber"><b>Aktiva</b>
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                              </b-col>
                            </b-row>

                             <b-row style="margin-top:10px">
                                  <b-col sm="3">
                                     <label for="ccnumber">a. Kas dan Bank :
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                  </b-col>
                                  <b-col sm="9">
                                      <!-- <b-form-input type="number" required></b-form-input> -->
                                      <money class="form-control" v-model="PKSurveyFinance.KasAndBank" v-bind="money"></money>
                                  </b-col>
                              </b-row>

                              <b-row style="margin-top:10px">
                                   <b-col sm="3">
                                      <label for="ccnumber">b. Persediaan Barang :
                                         <!-- <b class="text-danger"> *</b> -->
                                       </label>
                                   </b-col>
                                   <b-col sm="9">
                                       <!-- <b-form-input type="number" required></b-form-input> -->
                                       <money class="form-control" v-model="PKSurveyFinance.ItemPreparation" v-bind="money"></money>
                                   </b-col>
                               </b-row>

                               <b-row style="margin-top:10px">
                                    <b-col sm="3">
                                       <label for="ccnumber">c. Piutang Usaha :
                                          <!-- <b class="text-danger"> *</b> -->
                                        </label>
                                    </b-col>
                                    <b-col sm="9">
                                        <!-- <b-form-input type="number" required></b-form-input> -->
                                        <money class="form-control" v-model="PKSurveyFinance.AccountsReceivable" v-bind="money"></money>
                                    </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                     <b-col sm="3">
                                        <label for="ccnumber">d. Peralatan Usaha :
                                           <!-- <b class="text-danger"> *</b> -->
                                         </label>
                                     </b-col>
                                     <b-col sm="9">
                                         <!-- <b-form-input type="number" required></b-form-input> -->
                                         <money class="form-control" v-model="PKSurveyFinance.BusinessEquipment" v-bind="money"></money>
                                     </b-col>
                                 </b-row>

                                 <b-row style="margin-top:10px">
                                      <b-col sm="3">
                                         <label for="ccnumber">e. Kendaraan :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="9">
                                          <!-- <b-form-input type="number" required></b-form-input> -->
                                          <money class="form-control" v-model="PKSurveyFinance.Vehicle" v-bind="money"></money>
                                      </b-col>
                                  </b-row>

                                  <b-row style="margin-top:10px">
                                       <b-col sm="3">
                                          <label for="ccnumber">Total (Rp.) :
                                             <!-- <b class="text-danger"> *</b> -->
                                           </label>
                                       </b-col>
                                       <b-col sm="9">
                                           <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                           <money class="form-control" v-model="PKSurveyFinance.TotalAsset" v-bind="money"></money>
                                       </b-col>
                                   </b-row>

                                   <b-row style="margin-top:10px">
                                     <b-col sm="12">
                                       <label for="ccnumber"><b>Pasiva</b>
                                          <!-- <b class="text-danger"> *</b> -->
                                        </label>
                                     </b-col>
                                   </b-row>

                                    <b-row style="margin-top:10px">
                                         <b-col sm="3">
                                            <label for="ccnumber">a. Hutang Dagang :
                                               <!-- <b class="text-danger"> *</b> -->
                                             </label>
                                         </b-col>
                                         <b-col sm="9">
                                             <!-- <b-form-input type="number" required></b-form-input> -->
                                             <money class="form-control" v-model="PKSurveyFinance.AccountsPayable" v-bind="money"></money>
                                         </b-col>
                                     </b-row>

                                     <b-row style="margin-top:10px">
                                          <b-col sm="3">
                                             <label for="ccnumber">b. Hutang Lain-lain :
                                                <!-- <b class="text-danger"> *</b> -->
                                              </label>
                                          </b-col>
                                          <b-col sm="9">
                                              <!-- <b-form-input type="number" required></b-form-input> -->
                                              <money class="form-control" v-model="PKSurveyFinance.OtherDebts" v-bind="money"></money>
                                          </b-col>
                                      </b-row>

                                      <b-row style="margin-top:10px">
                                           <b-col sm="3">
                                              <label for="ccnumber">c. Modal :
                                                 <!-- <b class="text-danger"> *</b> -->
                                               </label>
                                           </b-col>
                                           <b-col sm="9">
                                               <!-- <b-form-input type="number" required></b-form-input> -->
                                               <money class="form-control" v-model="PKSurveyFinance.Capital" v-bind="money"></money>
                                           </b-col>
                                       </b-row>

                                       <b-row style="margin-top:10px">
                                            <b-col sm="3">
                                               <label for="ccnumber">Total (Rp.) :
                                                  <!-- <b class="text-danger"> *</b> -->
                                                </label>
                                            </b-col>
                                            <b-col sm="9">
                                                <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                                <money class="form-control" v-model="PKSurveyFinance.TotalLiability" v-bind="money"></money>
                                            </b-col>
                                        </b-row>

                                        <b-row style="margin-top:20px">
                                          <b-col sm="12">
                                            <label for="ccnumber"><h5><b>2. Perkembangan Hasil Usaha</b></h5>
                                               <!-- <b class="text-danger"> *</b> -->
                                             </label>
                                          </b-col>
                                        </b-row>

                                        <b-row style="margin-top:10px">
                                           <b-col sm="3">
                                              <label for="ccnumber">Berdasarkan catatan pembukuan dan wawancara, diperoleh sbb :
                                                 <!-- <b class="text-danger"> *</b> -->
                                               </label>
                                           </b-col>
                                           <b-col sm="9">
                                             <b-form-textarea
                                              id="textarea"
                                              v-model="PKSurvey.ResultBuss"
                                              placeholder="Enter something..."
                                              rows="3"
                                              max-rows="6"></b-form-textarea>
                                           </b-col>
                                       </b-row>

                                       <!-- <b-row style="margin-top:10px">
                                            <b-col sm="3">
                                               <label for="ccnumber">Sisa Karakter :
                                                  <b class="text-danger"> *</b>
                                                </label>
                                            </b-col>
                                            <b-col sm="3">
                                                <b-form-input type="number" required disabled></b-form-input>
                                            </b-col>
                                        </b-row> -->
                          </b-tab>

                          <b-tab title="E. Kegiatan">
                            <b-row style="margin-top:10px">
                               <b-col sm="12">
                                 <b-form-textarea
                                  id="textarea"
                                  v-model="PKSurvey.Activity"
                                  placeholder="Enter something..."
                                  rows="3"
                                  max-rows="6"></b-form-textarea>
                               </b-col>
                           </b-row>

                           <!-- <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Sisa Karakter :
                                      <b class="text-danger"> *</b>
                                    </label>
                                </b-col>
                                <b-col sm="3">
                                    <b-form-input type="number" required disabled></b-form-input>
                                </b-col>
                            </b-row> -->
                          </b-tab>

                          <b-tab title="F. Perhitungan Penghasilan Usaha Setiap Bulan">
                              <b-row style="margin-top:10px">
                                 <b-col sm="3">
                                    <label for="ccnumber">a. Hasil Penjualan/hari :
                                       <!-- <b class="text-danger"> *</b> -->
                                     </label>
                                 </b-col>
                                 <b-col sm="9">
                                     <!-- <b-form-input type="number" required></b-form-input> -->
                                       <money class="form-control" v-model="PKBussIncome.DailySalesResults" v-bind="money"></money>

                                 </b-col>
                                 <!-- <b-col sm="3">
                                    <label for="ccnumber">Rupiah
                                       <b class="text-danger"> *</b>
                                     </label>
                                 </b-col> -->
                             </b-row>

                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">b. Hasil Penjualan/bln :
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <!-- <b-form-input type="number" required></b-form-input> -->
                                    <money class="form-control" v-model="PKBussIncome.MonthlySalesResults" v-bind="money"></money>
                                </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">c. Hasil Penjualan/tahun :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <!-- <b-form-input type="number" required></b-form-input> -->
                                   <money class="form-control" v-model="PKBussIncome.AnnualSalesResults" v-bind="money"></money>
                               </b-col>
                               <!-- <b-col sm="3">
                                  <label for="ccnumber">Rupiah
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col> -->
                           </b-row>

                           <b-row style="margin-top:20px">
                             <b-col sm="12">
                               <label for="ccnumber"><b>b. Beban Usaha</b>
                                  <!-- <b class="text-danger"> *</b> -->
                                </label>
                             </b-col>
                           </b-row>

                           <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">- Harga Pokok Penj :
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                              </b-col>
                              <b-col sm="2">
                                  <b-form-input v-model="PKBussIncome.PercentagePrice"  v-on:input="PercentagePriceValue($event)" @change="PercentagePriceValue($event)" type="number" required></b-form-input>
                                  <!-- <money class="form-control" v-model="permohonan.d" v-bind="money" disabled></money> -->
                              </b-col>
                              <b-col sm="3">
                                 <label for="ccnumber">%
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                              </b-col>
                          </b-row>

                          <b-row style="margin-top:10px">
                             <b-col sm="3">
                                <label for="ccnumber">- Harga Pokok Penj :
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                             </b-col>
                             <b-col sm="9">
                                 <!-- <b-form-input type="number" required></b-form-input> -->
                                 <money class="form-control" v-model="PKBussIncome.CostOfGoodsSold"  v-on:input="CostOfGoodsSoldValue($event)" @change="CostOfGoodsSoldValue($event)" v-bind="money"></money>
                             </b-col>
                           </b-row>

                           <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">- Biaya Gaji Pegawai :
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                  <!-- <b-form-input type="number" required></b-form-input> -->
                                  <money class="form-control" v-model="PKBussIncome.EmployeeSalaryCosts" v-bind="money"></money>
                              </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">- Biaya Utilitas :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="6">
                                   <!-- <b-form-input type="number" required></b-form-input> -->
                                   <money class="form-control" v-model="PKBussIncome.UtilityCosts" v-bind="money"></money>
                               </b-col>
                               <b-col sm="3">
                                  <label for="ccnumber">Listrik, Telepon, Air
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                           </b-row>

                           <b-row style="margin-top:10px">
                              <b-col sm="3">
                                 <label for="ccnumber">- Biaya Lain-lain :
                                    <!-- <b class="text-danger"> *</b> -->
                                  </label>
                              </b-col>
                              <b-col sm="9">
                                  <!-- <b-form-input type="number" required></b-form-input> -->
                                  <money class="form-control" v-model="PKBussIncome.OtherCosts" v-bind="money"></money>
                              </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Jumlah Beban Usaha :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <input type="hidden"  v-model="TotalOperatingExpenses2"></input>
                                   <money class="form-control" v-model="PKBussIncome.TotalOperatingExpenses"  v-on:input="TotalOperatingExpensesValue($event)" @change="TotalOperatingExpensesValue($event)" v-bind="money"></money>
                               </b-col>
                             </b-row>

                             <b-row style="margin-top:20px">
                                <b-col sm="3">
                                   <label for="ccnumber"><b>c. Laba/Rugi Usaha :</b>
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="6">
                                    <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                    <money class="form-control" v-model="PKBussIncome.OperatingProfitOrLoss" v-bind="money"></money>
                                </b-col>
                                <b-col sm="3">
                                   <label for="ccnumber">c = a - b
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                              </b-row>

                              <b-row style="margin-top:20px">
                                <b-col sm="12">
                                  <label for="ccnumber"><b>d. Beban Rumah Tangga </b>
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                                </b-col>
                              </b-row>

                              <b-row style="margin-top:10px">
                                 <b-col sm="3">
                                    <label for="ccnumber">- Biaya Sewa :
                                       <!-- <b class="text-danger"> *</b> -->
                                     </label>
                                 </b-col>
                                 <b-col sm="9">
                                     <!-- <b-form-input type="number" required></b-form-input> -->
                                     <money class="form-control" v-model="PKBussIncome.RentalCosts" v-bind="money"></money>
                                 </b-col>
                               </b-row>

                               <b-row style="margin-top:10px">
                                  <b-col sm="3">
                                     <label for="ccnumber">- Biaya Makan :
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                  </b-col>
                                  <b-col sm="9">
                                      <!-- <b-form-input type="number" required></b-form-input> -->
                                      <money class="form-control" v-model="PKBussIncome.MealCost" v-bind="money"></money>
                                  </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                   <b-col sm="3">
                                      <label for="ccnumber">- Biaya Utilitas :
                                         <!-- <b class="text-danger"> *</b> -->
                                       </label>
                                   </b-col>
                                   <b-col sm="6">
                                       <!-- <b-form-input type="number" required></b-form-input> -->
                                       <money class="form-control" v-model="PKBussIncome.UtilityCostsHousehold" v-bind="money"></money>
                                   </b-col>
                                   <b-col sm="3">
                                      <label for="ccnumber">Listrik, Telepon, Air
                                         <!-- <b class="text-danger"> *</b> -->
                                       </label>
                                   </b-col>
                               </b-row>

                               <b-row style="margin-top:10px">
                                  <b-col sm="3">
                                     <label for="ccnumber">- Biaya Pendidikan :
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                  </b-col>
                                  <b-col sm="9">
                                      <!-- <b-form-input type="number" required></b-form-input> -->
                                      <money class="form-control" v-model="PKBussIncome.CostOfEducation" v-bind="money"></money>
                                  </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                   <b-col sm="3">
                                      <label for="ccnumber">- Biaya Lain-lain :
                                         <!-- <b class="text-danger"> *</b> -->
                                       </label>
                                   </b-col>
                                   <b-col sm="9">
                                       <!-- <b-form-input type="number" required></b-form-input> -->
                                       <money class="form-control" v-model="PKBussIncome.OtherCostsHousehold" v-bind="money"></money>
                                   </b-col>
                                 </b-row>

                                 <b-row style="margin-top:10px">
                                    <b-col sm="3">
                                       <label for="ccnumber">Jumlah Beban Rumah Tangga  :
                                          <!-- <b class="text-danger"> *</b> -->
                                        </label>
                                    </b-col>
                                    <b-col sm="9">
                                        <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                        <money class="form-control" v-model="PKBussIncome.TotalHouseholdExpenses" v-bind="money"></money>
                                    </b-col>
                                  </b-row>

                                  <b-row style="margin-top:20px">
                                     <b-col sm="3">
                                        <label for="ccnumber">Pendapatan Lain-lain :
                                           <!-- <b class="text-danger"> *</b> -->
                                         </label>
                                     </b-col>
                                     <b-col sm="9">
                                         <!-- <b-form-input type="number" required></b-form-input> -->
                                         <money class="form-control" v-model="PKBussIncome.OtherIncome" v-bind="money"></money>
                                     </b-col>
                                 </b-row>

                                 <b-row style="margin-top:10px">
                                    <b-col sm="3">
                                       <label for="ccnumber">Kemampuan Membayar Angsuran/bln :
                                          <!-- <b class="text-danger"> *</b> -->
                                        </label>
                                    </b-col>
                                    <b-col sm="6">
                                        <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                        <money class="form-control" v-model="PKBussIncome.AbilityToPaymonthlyInstallments" v-bind="money"></money>
                                    </b-col>
                                    <b-col sm="3">
                                       <label for="ccnumber">f = c - d + e
                                          <!-- <b class="text-danger"> *</b> -->
                                        </label>
                                    </b-col>
                                </b-row>

                          </b-tab>

                          <b-tab title="G. Kebutuhan Modal Kerja">
                            <b-row style="margin-top:10px">
                              <b-col sm="12">
                                <label for="ccnumber"><b>Ikhtisar Hasil Survey</b>
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                              </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Laba (Rugi) dari Usaha :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                   <money class="form-control" v-model="PKBussIncome.OperatingProfitOrLoss" v-bind="money" disabled></money>
                               </b-col>
                             </b-row>

                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Beban Rumah Tangga :
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                    <money class="form-control" v-model="PKBussIncome.TotalHouseholdExpenses" v-bind="money" disabled></money>
                                </b-col>
                              </b-row>

                              <b-row style="margin-top:10px">
                                 <b-col sm="3">
                                    <label for="ccnumber">Pendapatan Lain-lain :
                                       <!-- <b class="text-danger"> *</b> -->
                                     </label>
                                 </b-col>
                                 <b-col sm="9">
                                     <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                     <money class="form-control" v-model="PKBussIncome.OtherIncome" v-bind="money" disabled></money>
                                 </b-col>
                               </b-row>

                               <b-row style="margin-top:10px">
                                  <b-col sm="3">
                                     <label for="ccnumber">Kemampuan Membayar Angsuran per Bulan :
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                  </b-col>
                                  <b-col sm="9">
                                      <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                      <money class="form-control" v-model="PKBussIncome.AbilityToPaymonthlyInstallments" v-bind="money" disabled></money>
                                  </b-col>
                                </b-row>

                                <b-row style="margin-top:10px">
                                   <b-col sm="3">
                                      <label for="ccnumber">Pengakuan Kemampuan Membayar Angsuran per Bulan :
                                         <b class="text-danger"> *</b>
                                       </label>
                                   </b-col>
                                   <b-col sm="9">
                                       <!-- <b-form-input type="number" required ></b-form-input> -->
                                       <money class="form-control" v-model="PKBussIncome.AbilityPayInstallments" v-bind="money"  :class="{'is-invalid': $v.PKBussIncome.AbilityPayInstallments.$error}"></money>
                                       <div class="text-danger" v-if="$v.PKBussIncome.AbilityPayInstallments.$error">Pengakuan Kemampuan Membayar Angsuran per Bulan harus diisi</div>
                                   </b-col>
                                 </b-row>

                                 <b-row style="margin-top:20px">
                                   <b-col sm="12">
                                     <label for="ccnumber"><b>Perhitungan Jumlah Pinjaman</b>
                                        <!-- <b class="text-danger"> *</b> -->
                                      </label>
                                   </b-col>
                                 </b-row>

                                 <b-row style="margin-top:10px">
                                    <b-col sm="3">
                                       <label for="ccnumber">Permohonan Nilai Pinjaman :
                                          <!-- <b class="text-danger"> *</b> -->
                                        </label>
                                    </b-col>
                                    <b-col sm="9">
                                        <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                        <money class="form-control" v-model="permohonan.Amount" v-bind="money" disabled></money>
                                    </b-col>
                                  </b-row>

                                  <b-row style="margin-top:10px">
                                     <b-col sm="3">
                                        <label for="ccnumber">Kemampuan Membayar Angsuran per Bulan :
                                           <!-- <b class="text-danger"> *</b> -->
                                         </label>
                                     </b-col>
                                     <b-col sm="9">
                                         <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                         <money class="form-control" v-model="PKBussIncome.AbilityToPaymonthlyInstallments" v-bind="money" disabled></money>
                                     </b-col>
                                   </b-row>

                                   <b-row style="margin-top:10px">
                                      <b-col sm="3">
                                         <label for="ccnumber">Permohonan Masa Pinjaman dari Calon Mitra :
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                      <b-col sm="2">
                                         <!--  <b-form-input v-model="PKBussIncome.ApplicationForLoanPeriod" type="number" required :class="{'is-invalid': $v.PKBussIncome.ApplicationForLoanPeriod.$error}"></b-form-input>
                                           <div class="text-danger" v-if="$v.PKBussIncome.ApplicationForLoanPeriod.$error">Permohonan Masa Pinjaman dari Calon Mitra harus diisi</div> -->
                                           <b-form-input v-model="debitAccount.Tenor" type="number" required disabled></b-form-input>
                                      </b-col>
                                      <b-col sm="3">
                                         <label for="ccnumber">Bulan
                                            <!-- <b class="text-danger"> *</b> -->
                                          </label>
                                      </b-col>
                                  </b-row>

                                  <b-row style="margin-top:10px">
                                     <b-col sm="3">
                                        <label for="ccnumber">Grace Periode :
                                           <b class="text-danger"> *</b>
                                         </label>
                                     </b-col>
                                     <b-col sm="2">
                                         <b-form-input v-model="PKBussIncome.GracePeriod" type="number" required v-on:input="GracePeriodValidation($event)" @change="GracePeriodValidation($event)" :class="{'is-invalid': $v.PKBussIncome.GracePeriod.$error}"></b-form-input>
                                         <div class="text-danger" v-if="$v.PKBussIncome.GracePeriod.$error">Grace Periode harus diisi</div>
                                     </b-col>
                                     <b-col sm="3">
                                        <label for="ccnumber">Bulan
                                           <!-- <b class="text-danger"> *</b> -->
                                         </label>
                                     </b-col>
                                 </b-row>

                                <!--  <b-row style="margin-top:10px">
                                    <b-col sm="3">
                                       <label for="ccnumber">Estimasi Pembayaran dari Calon Mitra :
                                          <b class="text-danger"> *</b>
                                        </label>
                                    </b-col>
                                    <b-col sm="6"> -->
                                        <!-- <b-form-input type="number" required disabled></b-form-input> -->
                                     <!--    <money class="form-control" v-model="PKBussIncome.PaymentEstimates" v-bind="money" :class="{'is-invalid': $v.PKBussIncome.PaymentEstimates.$error}"></money>
                                        <div class="text-danger" v-if="$v.PKBussIncome.PaymentEstimates.$error">Estimasi Pembayaran dari Calon Mitra harus diisi</div>
                                    </b-col>
                                    <b-col sm="3">
                                       <label for="ccnumber">Termasuk Jasa -->
                                          <!-- <b class="text-danger"> *</b> -->
                                     <!--    </label>
                                    </b-col>
                                </b-row> -->

                                <!-- <b-row style="margin-top:10px">
                                   <b-col sm="3">
                                      <label for="ccnumber">Estimasi Nilai Pokok Pinjaman yang Diberikan :
                                         <b class="text-danger"> *</b>
                                       </label>
                                   </b-col>
                                   <b-col sm="9">
                                       <b-form-input type="number" required disabled></b-form-input>
                                   </b-col>
                               </b-row>

                               <b-row style="margin-top:10px">
                                  <b-col sm="3">
                                     <label for="ccnumber">Jumlah Pinjaman yang Dapat Diberikan :
                                        <b class="text-danger"> *</b>
                                      </label>
                                  </b-col>
                                  <b-col sm="6">
                                      <b-form-input type="number" required disabled></b-form-input>
                                  </b-col>
                                  <b-col sm="3">
                                     <label for="ccnumber">100%
                                        <b class="text-danger"> *</b>
                                      </label>
                                  </b-col>
                              </b-row> -->

                              <!-- <b-row style="margin-top:10px">
                                 <b-col sm="3">
                                    <label for="ccnumber">Pembulatan :
                                       <b class="text-danger"> *</b>
                                     </label>
                                 </b-col>
                                 <b-col sm="6">
                                     <b-form-input type="number" required disabled></b-form-input>
                                 </b-col>
                                 <b-col sm="3">
                                    <label for="ccnumber">masksimal pinjaman pokok
                                       <b class="text-danger"> *</b>
                                     </label>
                                 </b-col>
                             </b-row> -->

                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber"><b>Nilai Pinjaman Yang direkomendasi :</b>
                                      <b class="text-danger"> *</b>
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <!-- <b-form-input type="number"  v-model="approvalWorkflow.RecomendationValue" required></b-form-input> -->
                                    <money class="form-control" v-model="approvalWorkflow.RecomendationValue" v-bind="money" :class="{'is-invalid': $v.approvalWorkflow.RecomendationValue.$error}"></money>
                                    <div class="text-danger" v-if="$v.approvalWorkflow.RecomendationValue.$error">Nilai Pinjaman Yang direkomendasi harus diisi</div>
                                </b-col>
                            </b-row>

                          </b-tab>

                          <b-tab title="H. Kesimpulan">

                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Prinsip Pinjaman :
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input v-model="debitorVenture.LoanPrinciple" type="text" value="3" required disabled></b-form-input>
                                </b-col>
                            </b-row>

                             <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Jenis Pinjaman :
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                <select class="form-control" v-model="PKSurvey.LoanType" :class="{'is-invalid': $v.PKSurvey.LoanType.$error}">
                                  <option v-for="option in options_Pinjaman" v-bind:value="option.value">
                                    {{ option.label }}
                                  </option>
                                </select>
                                <div class="text-danger" v-if="$v.PKSurvey.LoanType.$error">Jenis Pinjaman harus diisi</div>
                                  <!--  <v-select v-model="PKSurvey.LoanType" :options="options_Pinjaman"></v-select> -->
                               </b-col>
                             </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Jenis Sektor Usaha :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <b-form-input v-model="debitorVenture.BusinessSector" type="text" disabled></b-form-input>
                               </b-col>
                             </b-row>

                             <!-- <b-row style="margin-top:10px">
                               <b-col sm="3">
                                 <label for="ccnumber">Mulai bayar tanggal :
                                    <b class="text-danger"> *</b>
                                  </label>
                               </b-col>
                               <b-col sm="9">
                                  <b-form-input v-model="PKSurvey.PaymentDate" type="date" required  :class="{'is-invalid': $v.PKSurvey.PaymentDate.$error}"></b-form-input>
                                  <div class="text-danger" v-if="$v.PKSurvey.PaymentDate.$error">Mulai bayar tanggal harus diisi</div>
                               </b-col>
                             </b-row>

                             <b-row style="margin-top:10px">
                               <b-col sm="3">
                                 <label for="ccnumber">Jatuh Tempo per Bulan :
                                    <b class="text-danger"> *</b>
                                  </label>
                               </b-col>
                               <b-col sm="2">
                                  <b-form-input v-model="PKSurvey.DueDate" type="number" required :class="{'is-invalid': $v.PKSurvey.DueDate.$error}"></b-form-input>
                                   <div class="text-danger" v-if="$v.PKSurvey.DueDate.$error">Jatuh Tempo per Bulan harus diisi</div>
                               </b-col>
                             </b-row>

                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Siklus Angsuran : -->
                                      <!-- <b class="text-danger"> *</b> -->
                                  <!--   </label>
                                </b-col >-->
                                <!-- <b-col sm="9">
                                    <b-form-select v-model="PKSurvey.InstallmentCycle" :options="options_Siklus_Angsuran"></b-form-select>
                                </b-col> -->
                               <!--  <b-col sm="2">
                                  <b-form-radio v-model="PKSurvey.InstallmentCycle" name="InstallmentCycle"  value="1">Bulanan</b-form-radio>
                                </b-col>
                                <b-col sm="1">
                                  <b-form-radio v-model="PKSurvey.InstallmentCycle" name="InstallmentCycle">Yarnen</b-form-radio>
                                </b-col>
                                  <b-col sm="2" v-if="PKSurvey.InstallmentCycle != '1'">
                                   <b-form-input v-model="PKSurvey.InstallmentCycle" type="text" required></b-form-input>
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

                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Jasa Administrasi :
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="2">
                                    <b-form-input v-model="PKSurvey.AdministrationFee" type="number"required disabled  ></b-form-input>
                                </b-col>
                                <b-col sm="3">
                                   <label for="ccnumber">%
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Jenis Perhitungan Jasa :
                                     <b class="text-danger"> *</b>
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                   <b-form-select v-model="PKSurvey.FeeType" :options="options_FeeType" :class="{'is-invalid': $v.PKSurvey.FeeType.$error}"></b-form-select>
                                    <div class="text-danger" v-if="$v.PKSurvey.FeeType.$error">Jenis Perhitungan Jasa harus diisi</div>
                               </b-col>
                             </b-row>

                            <!--  <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Kegunaan : -->
                                      <!-- <b class="text-danger"> *</b> -->
                                  <!--   </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input v-model="PKSurvey.Functions" type="text" required></b-form-input>
                                </b-col>
                            </b-row> -->

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Permohonan Nilai Pinjaman :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                    <money class="form-control" v-model="permohonan.Amount" v-bind="money" disabled></money>
                               </b-col>
                             </b-row>

                             <b-row style="margin-top:10px">
                                <b-col sm="3">
                                   <label for="ccnumber">Nilai Pinjaman Yang direkomendasi :
                                      <!-- <b class="text-danger"> *</b> -->
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <money class="form-control" v-model="approvalWorkflow.RecomendationValue" v-bind="money" disabled></money>
                                </b-col>
                            </b-row>

                            <b-row style="margin-top:20px">
                              <b-col sm="12">
                                <label for="ccnumber"><b>Keputusan Kredit</b>
                                   <!-- <b class="text-danger"> *</b> -->
                                 </label>
                              </b-col>
                            </b-row>

                            <b-row style="margin-top:10px">
                               <b-col sm="3">
                                  <label for="ccnumber">Alasan :
                                     <!-- <b class="text-danger"> *</b> -->
                                   </label>
                               </b-col>
                               <b-col sm="9">
                                 <b-form-textarea
                                  id="textarea"
                                  v-model="approvalWorkflow.Notes"
                                  placeholder="Enter something..."
                                  rows="3"
                                  max-rows="6"></b-form-textarea>
                               </b-col>
                           </b-row>

                           <b-row style="margin-top:30px" v-if="status != 'Ubah' && status != 'UbahPn' && statusPencairan == null">
                             <b-col sm="3">
                             </b-col>
                             <b-col sm="6">
                               <div class="form-group form-actions">
                                 <b-button type="submit" size="md" variant="success" v-on:click="saveLayak()" :disabled="klik">Diterima</b-button>
                                 <b-button type="button" size="md" variant="danger" v-on:click="saveTidakLayak()" :disabled="klik">Ditolak</b-button>
                                 <b-button type="button" size="md" variant="warning" style="color:white;" v-on:click="saveKoreksi()" :disabled="klik">Koreksi</b-button>
                                <!--  <b-button type="button" size="md" variant="Light">Batal</b-button> -->
                               </div>
                             </b-col>
                           </b-row>

                            <b-row style="margin-top:30px"  v-if="status == 'Ubah' || status == 'UbahPn' && statusPencairan == null">
                             <b-col sm="3">
                             </b-col>
                             <b-col sm="6">
                               <div class="form-group form-actions">
                                 <b-button type="submit" size="md" variant="success" v-on:click="saveKoreksi()" :disabled="klik">Ubah</b-button>
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
              <label for="ccnumber"  v-if="$v.approvalWorkflow.AppDate.$error"> [Identitas Calon Mitra Binaan] Tanggal Survey </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.PKBussIncome.AbilityPayInstallments.$error"> [Kebutuhan Modal Kerja] Pengakuan Kemampuan Membayar Angsuran per Bulan </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.PKBussIncome.GracePeriod.$error"> [Kebutuhan Modal Kerja] Grace Periode </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.approvalWorkflow.RecomendationValue.$error"> [Kebutuhan Modal Kerja] Nilai Pinjaman Yang direkomendasi </label>
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.PKSurvey.LoanType.$error"> [Kesimpulan] Jenis Pinjaman </label>
            </b-col>

            <b-col sm="12">
              <!-- <label for="ccnumber"  v-if="$v.PKSurvey.DueDate.$error"> [Kesimpulan] Jatuh Tempo per Bulan </label> -->
            </b-col>

            <b-col sm="12">
              <label for="ccnumber"  v-if="$v.PKSurvey.FeeType.$error"> [Kesimpulan] Jenis Perhitungan Jasa </label>
            </b-col>

            <b-button class="mt-2" variant="success" block @click="hideModal">OK</b-button>
          </b-modal>
      </b-row>
  </div>
</template>
<script>
  import moment from 'moment'
  import { required, minLength } from "vuelidate/lib/validators";
  import apiPKSurvey from '@/api/PK/PKSurveyApiService';
  import apiPKSurveyFinance from '@/api/PK/PKSurveyFinanceApiService';
  import apiPKBussIncome from '@/api/PK/PKBussIncomeApiService';
  import apiDebitor from '@/api/PK/DebitorApiService';
  import dynamic from '@/api/DynamicApiService';
  import apiApproval from '@/api/PK/PKApprovalApiService';
  import apiDebitorVenture from '@/api/PK/DebitorVentureApiService';
  import apiDebitAccount from '@/api/PK/DebitAccountApiService';
  import apiBLApprovalWorkflow from '@/api/PK/PKApprovalWorkflowApiService';
  import apiPKSector from '@/api/PK/PKSectorApiService';
  import apiPKType from '@/api/PK/PKTypeApiService';
  import apiDebitAccountWorkFlow from '@/api/PK/DebitAccountWorkFlowApiService';
  import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
  import {Money} from 'v-money'
   export default {
   data() {
      return {
        loading: false,
        klik:false,
        status:'insert',
        username:null,
        statusPencairan:null,
        DebitAccountWorkFlow:{},
        options:[],
        DebCode:null,
        DACode:null,
        IdPKSurvey:null,
        debitorVenture:{},
        debitAccount:{},
         debitAccountState:{},
        configConfirm:null,
        textConfirm:null,
        PKBussIncome:{
          DACode:null,
          IdPKSurvey:null,

          AbilityPayInstallments: 0,
          AbilityToPaymonthlyInstallments: 0,
          AnnualSalesResults: 0,
          ApplicationForLoanPeriod: 0,
          CostOfEducation: 0,
          CostOfGoodsSold: 0,
          DailySalesResults: 0,
          EmployeeSalaryCosts: 0,
          GracePeriod: 0,
          MealCost: 0,
          MonthlySalesResults: 0,
          OperatingProfitOrLoss: 0,
          OtherCosts: 0,
          OtherCostsHousehold: 0,
          OtherIncome: 0,
          PaymentEstimates: 0,
          PercentagePrice: 0,
          RentalCosts: 0,
          TotalHouseholdExpenses: 0,
          TotalOperatingExpenses: 0,
          UtilityCosts: 0,
          UtilityCostsHousehold: 0
        },
        PKSurveyFinance:{
          DACode:null,
          IdPKSurvey:null,

          // AccountsPayable: 100000,
          // AccountsReceivable: 100000,
          // BusinessEquipment: 100000,
          // Capital: 100000,
          // ItemPreparation: 100000,
          // KasAndBank: 100000,
          // OtherDebts: 100000,
          // TotalAsset: 100000,
          // TotalLiability:  100000,
          // Vehicle: 100000,
        },
        PKSurvey:{
          DACode:null,
          AdministrationFee: 0,
          InstallmentCycle: null,
          // Activity: "Pembangunan",
          // BumnFacility: "Ya",
          // BussExp: "Yakin",
          // Comitment: "Ya Saya Komit",
          // DueDate: 12,
          // BusinessFields: "Ternak",
          Functions: "Pembangunan Rumah",
          // KetBumnFacilty: "Mobil Lima",
          LoanType: "",
          FeeType: "Sliding Rate",
          // Motivation: "Membangun",
          NoReff: null,
          // PaymentDate: this.formatDate(new Date()),
          // ResultBuss: "Harus Sesuai"
        },
        AppWorkCode:null,
         permohonan:{},
         approval:{},
        approvalWorkflow:{
          AppDate: new Date(),
          DACode:null,
          ReqDate: new Date()
        },
        options_FeeType:[
             { text: 'Jasa Administrasi Saldo Menurun', value: 'Sliding Rate' },
             { text: 'Jasa Administrasi Tetap', value: 'Flat Rate' }
        ],
        options_BumnFacility:[
             { text: 'Ya', value: 'Ya' },
             { text: 'Tidak', value: 'Tidak' }
        ],
        options_Siklus_Angsuran:[
             { text: 'Bulanan', value: 'Bulanan' },
             { text: 'Yarnen/Lainnya', value: 'Yarnen' }
         ],
         options_Pinjaman:[
              // { text: 'Pinjaman Modal Kerja', value: 'Pinjaman Modal Kerja' },
              // { text: 'Pinjaman Investasi', value: 'Pinjaman Investasi' },
              // { text: 'Pinjaman Khusus', value: 'Pinjaman Khusus' }
          ],
          TotalOperatingExpenses2:0,
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
        PKBussIncome: {
          // ApplicationForLoanPeriod: { required },
          GracePeriod: { required },
          AbilityPayInstallments: { required, minLength: minLength(3) },
          // PaymentEstimates: { required, minLength: minLength(3) },
        },
        approvalWorkflow: {
          AppDate: { required },
          RecomendationValue: { required, minLength: minLength(3) },
        },
         PKSurvey: {
          LoanType: { required },
          // PaymentDate: { required },
          // DueDate: { required },
          FeeType: { required },
        },
      },
       watch:{
        'PKSurveyFinance.KasAndBank': async function () {
          var total = this.PKSurveyFinance.KasAndBank + this.PKSurveyFinance.ItemPreparation + this.PKSurveyFinance.AccountsReceivable + this.PKSurveyFinance.BusinessEquipment + this.PKSurveyFinance.Vehicle
            this.PKSurveyFinance.TotalAsset = total
         },
         'PKSurveyFinance.ItemPreparation': async function () {
           var total = this.PKSurveyFinance.KasAndBank + this.PKSurveyFinance.ItemPreparation + this.PKSurveyFinance.AccountsReceivable + this.PKSurveyFinance.BusinessEquipment + this.PKSurveyFinance.Vehicle
            this.PKSurveyFinance.TotalAsset = total
         },
         'PKSurveyFinance.AccountsReceivable': async function () {
           var total = this.PKSurveyFinance.KasAndBank + this.PKSurveyFinance.ItemPreparation + this.PKSurveyFinance.AccountsReceivable + this.PKSurveyFinance.BusinessEquipment + this.PKSurveyFinance.Vehicle
            this.PKSurveyFinance.TotalAsset = total
         },
         'PKSurveyFinance.BusinessEquipment': async function () {
           var total = this.PKSurveyFinance.KasAndBank + this.PKSurveyFinance.ItemPreparation + this.PKSurveyFinance.AccountsReceivable + this.PKSurveyFinance.BusinessEquipment + this.PKSurveyFinance.Vehicle
            this.PKSurveyFinance.TotalAsset = total
         },
         'PKSurveyFinance.Vehicle': async function () {
           var total = this.PKSurveyFinance.KasAndBank + this.PKSurveyFinance.ItemPreparation + this.PKSurveyFinance.AccountsReceivable + this.PKSurveyFinance.BusinessEquipment + this.PKSurveyFinance.Vehicle
            this.PKSurveyFinance.TotalAsset = total
         },
         'PKSurveyFinance.AccountsPayable': async function () {
            var total = this.PKSurveyFinance.AccountsPayable + this.PKSurveyFinance.OtherDebts + this.PKSurveyFinance.Capital
            this.PKSurveyFinance.TotalLiability = total
         },
         'PKSurveyFinance.OtherDebts': async function () {
          var total = this.PKSurveyFinance.AccountsPayable + this.PKSurveyFinance.OtherDebts + this.PKSurveyFinance.Capital
            this.PKSurveyFinance.TotalLiability = total
         },
         'PKSurveyFinance.Capital': async function () {
          var total = this.PKSurveyFinance.AccountsPayable + this.PKSurveyFinance.OtherDebts + this.PKSurveyFinance.Capital
            this.PKSurveyFinance.TotalLiability = total
         },
         'PKBussIncome.MonthlySalesResults': async function () {
          var total = this.PKBussIncome.MonthlySalesResults * this.PKBussIncome.PercentagePrice / 100
          this.PKBussIncome.CostOfGoodsSold = total

          var total2 = this.PKBussIncome.MonthlySalesResults - this.PKBussIncome.TotalOperatingExpenses
          this.PKBussIncome.OperatingProfitOrLoss = total2
         },
         'PKBussIncome.TotalOperatingExpenses': async function () {
         var total2 = this.PKBussIncome.MonthlySalesResults - this.PKBussIncome.TotalOperatingExpenses
          this.PKBussIncome.OperatingProfitOrLoss = total2
         },
         'PKBussIncome.PercentagePrice': async function () {
          var total = this.PKBussIncome.MonthlySalesResults * this.PKBussIncome.PercentagePrice / 100
          this.PKBussIncome.CostOfGoodsSold = total
         },
         'PKBussIncome.CostOfGoodsSold': async function () {
          var total = this.PKBussIncome.CostOfGoodsSold + this.PKBussIncome.EmployeeSalaryCosts + this.PKBussIncome.UtilityCosts + this.PKBussIncome.OtherCosts
          this.PKBussIncome.TotalOperatingExpenses = total
         },
          'PKBussIncome.EmployeeSalaryCosts': async function () {
          var total = this.PKBussIncome.CostOfGoodsSold + this.PKBussIncome.EmployeeSalaryCosts + this.PKBussIncome.UtilityCosts + this.PKBussIncome.OtherCosts
          this.PKBussIncome.TotalOperatingExpenses = total
         },
          'PKBussIncome.UtilityCosts': async function () {
          var total = this.PKBussIncome.CostOfGoodsSold + this.PKBussIncome.EmployeeSalaryCosts + this.PKBussIncome.UtilityCosts + this.PKBussIncome.OtherCosts
          this.PKBussIncome.TotalOperatingExpenses = total
         },
          'PKBussIncome.OtherCosts': async function () {
          var total = this.PKBussIncome.CostOfGoodsSold + this.PKBussIncome.EmployeeSalaryCosts + this.PKBussIncome.UtilityCosts + this.PKBussIncome.OtherCosts
          this.PKBussIncome.TotalOperatingExpenses = total
         },
          'PKBussIncome.OperatingProfitOrLoss': async function () {
            //  var total = this.PKBussIncome.OperatingProfitOrLoss - this.PKBussIncome.TotalHouseholdExpenses + this.PKBussIncome.OtherIncome
            // this.PKBussIncome.AbilityToPaymonthlyInstallments =  total
         },
          'PKBussIncome.RentalCosts': async function () {
            var total = this.PKBussIncome.RentalCosts + this.PKBussIncome.MealCost + this.PKBussIncome.UtilityCostsHousehold + this.PKBussIncome.CostOfEducation + this.PKBussIncome.OtherCostsHousehold
            this.PKBussIncome.TotalHouseholdExpenses =  total
         },
          'PKBussIncome.MealCost': async function () {
             var total = this.PKBussIncome.RentalCosts + this.PKBussIncome.MealCost + this.PKBussIncome.UtilityCostsHousehold + this.PKBussIncome.CostOfEducation + this.PKBussIncome.OtherCostsHousehold
            this.PKBussIncome.TotalHouseholdExpenses =  total
         },
          'PKBussIncome.UtilityCostsHousehold': async function () {
             var total = this.PKBussIncome.RentalCosts + this.PKBussIncome.MealCost + this.PKBussIncome.UtilityCostsHousehold + this.PKBussIncome.CostOfEducation + this.PKBussIncome.OtherCostsHousehold
            this.PKBussIncome.TotalHouseholdExpenses =  total
         },
          'PKBussIncome.CostOfEducation': async function () {
             var total = this.PKBussIncome.RentalCosts + this.PKBussIncome.MealCost + this.PKBussIncome.UtilityCostsHousehold + this.PKBussIncome.CostOfEducation + this.PKBussIncome.OtherCostsHousehold
            this.PKBussIncome.TotalHouseholdExpenses =  total
         },
          'PKBussIncome.OtherCostsHousehold': async function () {
             var total = this.PKBussIncome.RentalCosts + this.PKBussIncome.MealCost + this.PKBussIncome.UtilityCostsHousehold + this.PKBussIncome.CostOfEducation + this.PKBussIncome.OtherCostsHousehold
            this.PKBussIncome.TotalHouseholdExpenses =  total
         },
           'PKBussIncome.TotalHouseholdExpenses': async function () {
            //  var total = this.PKBussIncome.OperatingProfitOrLoss - this.PKBussIncome.TotalHouseholdExpenses + this.PKBussIncome.OtherIncome
            // this.PKBussIncome.AbilityToPaymonthlyInstallments =  total
         },
          'PKBussIncome.OtherIncome': async function () {
         //     var total = this.PKBussIncome.OperatingProfitOrLoss - this.PKBussIncome.TotalHouseholdExpenses + this.PKBussIncome.OtherIncome
         //    this.PKBussIncome.AbilityToPaymonthlyInstallments =  total
         },

       },
    async created() {
      this.loading = true
       this.username = localStorage.username
      this.DebCode = this.$route.params.DebCode;
      this.DACode = this.$route.params.DACode;
      this.status =  this.$route.params.Mode;
      this.AppWorkCode = this.$route.params.AppWorkCode;
      this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
      this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
       var autoincSurvey = await dynamic.getCount('PKSurvey/Count')
       this.PKSurvey.NoReff = new Date().getFullYear()+'.'+new Date().getMonth()+'.PNL-KPO.'+autoincSurvey.Total
        this.getAllComboboxPKType()

      if(this.DACode){
        var getDebitAccount = await apiDebitAccount.getOne(this.DACode)
        if(getDebitAccount.Data[0]){
         this.debitAccount = getDebitAccount.Data[0]
         this.PKBussIncome.ApplicationForLoanPeriod = getDebitAccount.Data[0].Tenor
         // console.log("DEBITACCOUNT", this.debitAccount)
        }

        var getPKSurvey = await apiPKSurvey.getByDaCode(this.DACode)
        console.log("SUKU BUNGA",await this.getSukuBunga())
        if(getPKSurvey.Data[0]){
          this.PKSurvey = getPKSurvey.Data[0]
          // console.log(this.PKSurvey)
          this.PKSurvey.PaymentDate =  this.formatDate(getPKSurvey.Data[0].PaymentDate)
          // this.PKSurvey.DueDate =  this.formatDate(getPKSurvey.Data[0].DueDate)
          this.IdPKSurvey = getPKSurvey.Data[0].IdPKSurvey
          var getPKSurveyFinance = await apiPKSurveyFinance.getByIdPKSurveyCode(getPKSurvey.Data[0].IdPKSurvey)
          if(getPKSurveyFinance.Data[0]){
            this.PKSurveyFinance = getPKSurveyFinance.Data[0]
          }

          var getPKBussIncome = await apiPKBussIncome.getByIdPKSurveyCode(getPKSurvey.Data[0].IdPKSurvey)
          if(getPKBussIncome.Data[0]){
              this.PKBussIncome = getPKBussIncome.Data[0]
              console.log("PKBussIncome",getPKBussIncome.Data[0])
          }
        }
        this.PKSurvey.AdministrationFee = await this.getSukuBunga()

         let dataDebitAccountState = await apiDebitAccountState.getOneByDACode(this.DACode)
         if(dataDebitAccountState.Data[0]){
            this.debitAccountState = dataDebitAccountState.Data[0]
         }
           console.log("DATA STATE", this.debitAccountState)
       }

        if(this.DebCode != undefined){
             var getDebiturVenture = await apiDebitorVenture.getByDEBCode(this.DebCode)
               if(getDebiturVenture.Data[0]){
                   this.debitorVenture = getDebiturVenture.Data[0]
                   if(getDebiturVenture.Data[0].BusinessSector != null){
                      var dataPKSector = await apiPKSector.getOne(getDebiturVenture.Data[0].BusinessSector)
                      if(dataPKSector[0]){
                        this.debitorVenture.BusinessSector = dataPKSector[0].SectorName
                      }
                   }
               }

             var getDebitur = await apiDebitor.getOne(this.DebCode)
              if(getDebitur.Data[0]){
                  this.permohonan = getDebitur.Data[0]
                  this.permohonan.DateProposal =  getDebitur.Data[0].DateProposal
               }
          }
        if(this.DACode ){
           var getApproval = await apiApproval.getOneByDACode(this.DACode)
            this.approval = getApproval.Data

         var getDebitAccountWorkFlow = await apiDebitAccountWorkFlow.getOneByDACode(this.DACode)
           if(getDebitAccountWorkFlow.Data[0]){
              this.DebitAccountWorkFlow = getDebitAccountWorkFlow.Data[0]
              if(getDebitAccountWorkFlow.Data[0].TanggalPencairan){
                 this.statusPencairan = getDebitAccountWorkFlow.Data[0].TanggalPencairan
              }
              console.log("WorkFlow",this.DebitAccountWorkFlow)
           }
        }
         if(this.AppWorkCode ){
          var AppWorkId =  null
          if(this.status == 'UbahPn'){
            AppWorkId = this.AppWorkCode - 1
          }else{
              AppWorkId = this.AppWorkCode
          }
           var getApprovalWorkflow = await apiBLApprovalWorkflow.getOne(AppWorkId)
            if( getApprovalWorkflow.Data[0]){
              this.approvalWorkflow = getApprovalWorkflow.Data[0]
              if(getApprovalWorkflow.Data[0].AppDate){
                this.approvalWorkflow.AppDate = getApprovalWorkflow.Data[0].AppDate
              }
            }
        }

        // console.log(getApproval.Data.PKAppId)
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
       GracePeriodValidation(event){
         if(event > this.debitAccount.Tenor ){
            alert("Grace Periode Tidak Boleh Melebihi Tenor")
            this.PKBussIncome.GracePeriod = 0
         }
      },
      PercentagePriceValue(event){
          console.log("DATA Percen",event)
            var total = this.PKBussIncome.MonthlySalesResults * event / 100
          this.PKBussIncome.CostOfGoodsSold = total
      },
      CostOfGoodsSoldValue(event){
          console.log("DATA Cost",event)
         var total = event + this.PKBussIncome.EmployeeSalaryCosts + this.PKBussIncome.UtilityCosts + this.PKBussIncome.OtherCosts
          console.log("DATA Cost 2",total)
          this.PKBussIncome.TotalOperatingExpenses = total
          this.TotalOperatingExpenses2 = total
      },
      TotalOperatingExpensesValue(event){
           var total2 = this.PKBussIncome.MonthlySalesResults - this.PKBussIncome.TotalOperatingExpenses
          this.PKBussIncome.OperatingProfitOrLoss = total2
          this.TotalOperatingExpenses2 = total2
      },
       async getAllComboboxPKType() {
           var getPKType = await apiPKType.getAllCombobox()
              this.options_Pinjaman = [];
              for (var i = 0; i < getPKType.length; i++) {
                this.options_Pinjaman.push({ label: getPKType[i].text,value: getPKType[i].value })
              }
              console.log("GETTYPE",getPKType[0].text)
         },
       async saveLayak(){
         this.$v.$touch()
          if (!this.$v.$invalid) {
             this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
               .then(async (value) => {
                  if(value){
                        this.loading = true
                        this.klik = true
                    // console.log('PKBussIncome',this.PKBussIncome);
                        //  console.log('PKSurvey',this.PKSurvey);
                        //   console.log('PKSurveyFinance',this.PKSurveyFinance);
                        this.PKSurvey.DACode = this.DACode
                        this.PKSurveyFinance.DACode = this.DACode
                        this.PKBussIncome.DACode = this.DACode
                        this.PKBussIncome.ApplicationForLoanPeriod = this.debitAccount.Tenor
                        this.approvalWorkflow.DACode = this.DACode
                        this.approvalWorkflow.Status = 'Layak'
                        this.debitAccount.StlmCycle = this.PKSurvey.InstallmentCycle
                          this.DebitAccountWorkFlow.TanggalPenilaian = this.approvalWorkflow.AppDate
                        this.DebitAccountWorkFlow.TanggalPersetujuan = new Date()

                       this.debitAccountState.RecommendationDate = new Date()
                        this.debitAccountState.RecommendationValue = this.approvalWorkflow.RecomendationValue

                      this.DebitAccountWorkFlow.UpdatedBy = this.username
                      let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update(this.DACode,this.DebitAccountWorkFlow)
                        // if(this.PKSurvey.LoanType != null) this.PKSurvey.LoanType =  this.PKSurvey.LoanType.value
                        // this.approvalWorkflow.ReqDate = null
                        if(this.IdPKSurvey == null){
                            this.PKSurvey.CreatedBy = this.username
                            let dataPKSurvey = await apiPKSurvey.create(this.PKSurvey)

                          this.PKBussIncome.IdPKSurvey = dataPKSurvey.Data.IdPKSurvey
                          this.PKSurveyFinance.IdPKSurvey = dataPKSurvey.Data.IdPKSurvey

                          this.PKSurveyFinance.CreatedBy = this.username
                          let dataPKSurveyFinance = await apiPKSurveyFinance.create(this.PKSurveyFinance)

                          this.PKBussIncome.CreatedBy = this.username
                          let dataPKBussIncome = await apiPKBussIncome.create(this.PKBussIncome)

                        }else{
                          this.PKSurvey.UpdatedBy = this.username
                          let dataPKSurvey = await apiPKSurvey.updateByIdPKSurvey(this.IdPKSurvey,this.PKSurvey)

                          this.PKSurveyFinance.UpdatedBy = this.username
                          let dataPKSurveyFinance = await apiPKSurveyFinance.updateByIdPKSurveyCode(this.IdPKSurvey,this.PKSurveyFinance)
                          this.PKBussIncome.UpdatedBy = this.username
                          let dataPKBussIncome = await apiPKBussIncome.updateByIdPKSurveyCode(this.IdPKSurvey,this.PKBussIncome)

                        }

                          this.permohonan.UpdatedBy = this.username
                        var getDebitur = await apiDebitor.update(this.DebCode,this.permohonan)

                        console.log("Permohonan",getDebitur)

                          this.debitAccount.UpdatedBy = this.username
                        let dataDebitAccount = await apiDebitAccount.update(this.DACode,this.debitAccount)

                          this.debitAccountState.UpdatedBy = this.username
                        let dataDebitAccountState = await apiDebitAccountState.update(this.DACode,this.debitAccountState)


                          this.approvalWorkflow.UpdatedBy = this.username
                        let data = await apiBLApprovalWorkflow.update(this.AppWorkCode,this.approvalWorkflow)
                        this.approval.Value = this.approvalWorkflow.RecomendationValue
                        this.approvalWorkflow = {}
                         this.approvalWorkflow.DACode = this.DACode
                        this.approvalWorkflow.ReqDate = new Date()
                        var idAppWork = Number(this.AppWorkCode) + 1
                          this.approvalWorkflow.UpdatedBy = this.username
                        let data2 = await apiBLApprovalWorkflow.update(idAppWork,this.approvalWorkflow)
                        this.approval.CurrentPosition = 'Kepala Cabang'
                          this.approval.UpdatedBy = this.username
                         let dataApproval = await apiApproval.update(this.approval.PKAppId,this.approval)
                         this.loading = false
                         this.showNotif(dataApproval,'Penilaian')
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
        },
            async  saveTidakLayak(){
               this.$v.$touch()
                if (!this.$v.$invalid) {
                   this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                   .then(async (value) => {
                      if(value){
                          this.loading = true
                          this.klik = true
                          this.PKSurvey.DACode = this.DACode
                          this.approvalWorkflow.Status = 'Tidak Layak'
                            this.approvalWorkflow.DACode = this.DACode
                            this.PKBussIncome.ApplicationForLoanPeriod = this.debitAccount.Tenor
                              this.debitAccount.StlmCycle = this.PKSurvey.InstallmentCycle
                              // if(this.PKSurvey.LoanType != null) this.PKSurvey.LoanType =  this.PKSurvey.LoanType.value
                                // this.approvalWorkflow.ReqDate = null
                           if(this.IdPKSurvey == null){
                              this.PKSurvey.CreatedBy = this.username
                                let dataPKSurvey = await apiPKSurvey.create(this.PKSurvey)

                              this.PKBussIncome.IdPKSurvey = dataPKSurvey.Data.IdPKSurvey
                              this.PKSurveyFinance.IdPKSurvey = dataPKSurvey.Data.IdPKSurvey

                              this.PKSurveyFinance.CreatedBy = this.username
                              let dataPKSurveyFinance = await apiPKSurveyFinance.create(this.PKSurveyFinance)

                              this.PKBussIncome.CreatedBy = this.username
                              let dataPKBussIncome = await apiPKBussIncome.create(this.PKBussIncome)

                            }else{
                              this.PKSurvey.UpdatedBy = this.username
                              let dataPKSurvey = await apiPKSurvey.updateByIdPKSurvey(this.IdPKSurvey,this.PKSurvey)

                              this.PKSurvey.UpdatedBy = this.username
                              let dataPKSurveyFinance = await apiPKSurveyFinance.updateByIdPKSurveyCode(this.IdPKSurvey,this.PKSurveyFinance)

                              this.PKBussIncome.UpdatedBy = this.username
                              let dataPKBussIncome = await apiPKBussIncome.updateByIdPKSurveyCode(this.IdPKSurvey,this.PKBussIncome)

                            }
                              this.permohonan.UpdatedBy = this.username
                                var getDebitur = await apiDebitor.update(this.DebCode,this.permohonan)

                                console.log("Permohonan",getDebitur)
                              this.debitAccount.UpdatedBy = this.username
                               let dataDebitAccount = await apiDebitAccount.update(this.DACode,this.debitAccount)

                              this.approvalWorkflow.UpdatedBy = this.username
                                let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.approvalWorkflow)
                              // this.approvalWorkflow.UpdatedBy = this.username
                                 let updateStatus = await apiBLApprovalWorkflow.updateStatus(this.DACode,this.approvalWorkflow)
                                this.loading = false
                                 this.showNotif(updateStatus,'Penilaian')
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
                  },
          async  saveKoreksi(){
             this.$v.$touch()
              if (!this.$v.$invalid) {
                 this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                 .then(async (value) => {
                    if(value){
                        this.loading = true
                         this.klik = true
                        this.PKSurvey.DACode = this.DACode
                        this.PKBussIncome.ApplicationForLoanPeriod = this.debitAccount.Tenor
                        this.approvalWorkflow.DACode = this.DACode
                        this.debitAccount.StlmCycle = this.PKSurvey.InstallmentCycle
                        if(this.status != 'UbahPn' && this.status != 'Ubah'){
                            this.approvalWorkflow.AppDate = null
                            this.approvalWorkflow.Status = 'Koreksi'
                        }
                        // if(this.PKSurvey.LoanType != null) this.PKSurvey.LoanType =  this.PKSurvey.LoanType.value
                         if(this.IdPKSurvey == null){
                            this.PKSurvey.CreatedBy = this.username
                              let dataPKSurvey = await apiPKSurvey.create(this.PKSurvey)

                            this.PKBussIncome.IdPKSurvey = dataPKSurvey.Data.IdPKSurvey
                            this.PKSurveyFinance.IdPKSurvey = dataPKSurvey.Data.IdPKSurvey

                            this.PKSurveyFinance.CreatedBy = this.username
                            let dataPKSurveyFinance = await apiPKSurveyFinance.create(this.PKSurveyFinance)

                            this.PKBussIncome.CreatedBy = this.username
                            let dataPKBussIncome = await apiPKBussIncome.create(this.PKBussIncome)

                          }else{
                              this.PKSurvey.UpdatedBy = this.username
                            let dataPKSurvey = await apiPKSurvey.updateByIdPKSurvey(this.IdPKSurvey,this.PKSurvey)

                              this.PKSurveyFinance.UpdatedBy = this.username
                            let dataPKSurveyFinance = await apiPKSurveyFinance.updateByIdPKSurveyCode(this.IdPKSurvey,this.PKSurveyFinance)

                              this.PKBussIncome.UpdatedBy = this.username
                            let dataPKBussIncome = await apiPKBussIncome.updateByIdPKSurveyCode(this.IdPKSurvey,this.PKBussIncome)

                          }
                              this.permohonan.UpdatedBy = this.username
                        var getDebitur = await apiDebitor.update(this.DebCode,this.permohonan)

                        console.log("Permohonan",getDebitur)
                              this.debitAccount.UpdatedBy = this.username
                        let dataDebitAccount = await apiDebitAccount.update(this.DACode,this.debitAccount)
                        var AppWorkId = null
                        if(this.status == 'UbahPn'){
                              AppWorkId = this.AppWorkCode - 1
                        }else{
                          AppWorkId = this.AppWorkCode
                        }
                              this.approvalWorkflow.UpdatedBy = this.username
                        let data = await apiBLApprovalWorkflow.update(AppWorkId,this.approvalWorkflow)

                              this.approval.UpdatedBy = this.username
                          this.approval.Value = this.approvalWorkflow.RecomendationValue
                        let dataApproval = await apiApproval.update(this.approval.PKAppId,this.approval)
                        this.loading = false
                         this.showNotif(data,'Penilaian')
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
  }
</script>
