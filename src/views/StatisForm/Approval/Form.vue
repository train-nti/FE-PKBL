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
                        <strong>Verifikasi / Persetujuan </strong>
                    </div>
                      <b-row>
                          <b-col sm="3">
                             <label for="ccnumber">Tanggal Persetujuan
                                <b class="text-danger"> *</b>
                              </label>
                          </b-col>
                          <b-col sm="4">
                             <date-picker v-model="persetujuan.AppDate" :input-attr="{ required: true }" :disabled-date="getClosingDate ? disabledDate : ''" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id" :class="{'is-invalid': $v.persetujuan.AppDate.$error}"></date-picker>
                              <!-- <b-form-input type="date" v-model="persetujuan.AppDate" required :class="{'is-invalid': $v.persetujuan.AppDate.$error}"></b-form-input> -->
                              <div class="text-danger" v-if="$v.persetujuan.AppDate.$error">Tanggal Persetujuan harus diisi</div>
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Referensi
                              </label>
                          </b-col>
                          <b-col sm="6">
                              <b-form-input type="text" v-model="permohonan.Reference" required disabled></b-form-input>
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Instansi/Lembaga
                              </label>
                          </b-col>
                          <b-col sm="6">
                              <b-form-input type="text" v-model="permohonan.Instance" required disabled></b-form-input>
                          </b-col>
                      </b-row>
                       <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Nama Pemohon
                              </label>
                          </b-col>
                          <b-col sm="6">
                              <b-form-input type="text" v-model="permohonan.FullName" required disabled></b-form-input>
                          </b-col>
                      </b-row>
                       <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Alamat
                              </label>
                          </b-col>
                          <b-col sm="7">
                             <b-form-textarea  id="textarea"  v-model="permohonan.Address" disabled></b-form-textarea>
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Kabupaten/Kota
                              </label>
                          </b-col>
                          <b-col sm="4">
                             <b-form-input type="text" v-model="permohonan.Dist_code" required disabled></b-form-input>
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Handphone
                              </label>
                          </b-col>
                          <b-col sm="4">
                              <b-form-input type="text" v-model="permohonan.Phone" required disabled></b-form-input>
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Jenis Bina Lingkungan
                              </label>
                          </b-col>
                          <b-col sm="6">
                             <b-form-input type="text" v-model="permohonan.BLType" required disabled></b-form-input>
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Bentuk Kegiatan
                              </label>
                          </b-col>
                          <b-col sm="6">
                              <b-form-input type="text" v-model="permohonan.Activity" required disabled></b-form-input>
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Nilai Pengajuan
                              </label>
                          </b-col>
                          <b-col sm="4">
                            <vue-numeric currency="Rp." disabled class="form-control" output-type="Number" v-model="permohonan.Amount"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric>
                          </b-col>
                      </b-row>
                       <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Nilai Rekomendasi
                              </label>
                          </b-col>
                          <b-col sm="4">
                             <vue-numeric currency="Rp." disabled class="form-control" output-type="Number" v-model="RecomendationValue"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric>
                          </b-col>
                      </b-row>
                     <!--  <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Nilai yang disetujui
                                <b class="text-danger"> *</b>
                              </label>
                          </b-col>
                          <b-col sm="4">
                              <b-form-input type="number" v-model="persetujuan.RecomendationValue" required></b-form-input>
                          </b-col>
                      </b-row>
                       <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Alasan Persetujuan
                                <b class="text-danger"> *</b>
                              </label>
                          </b-col>
                          <b-col sm="9">
                             <b-form-textarea  id="textarea" rows="5" v-model="persetujuan.Notes" ></b-form-textarea>
                          </b-col>
                      </b-row> -->
                      <b-row>
                      </b-row>
                      <br><br>
                      <b-row style="margin-top:10px">
                        <b-col sm="12">
                         <b-table id="histori_file" :items="items_histori_file" :fields="fields_histori_file">
                             <template slot="aksi" slot-scope="data">
                                   <!-- <b-button variant="default" class="fa fa-search"></b-button> -->
                                   <b-button variant="default" class="fa fa-cloud-download"  v-on:click="download(data.item.Id)"></b-button>
                              </template>
                          </b-table>
                        </b-col>
                      </b-row>
                      <br><br>
                      <b-row style="margin-top:10px">
                        <b-col sm="12">
                          <b-button v-b-toggle.collapse-3 class="m-1">Lihat Detail Permohonan</b-button>
                           <b-collapse invisible id="collapse-3">
                          <b-card>
                               <b-tabs class="full-widths" v-model="tabIndex[0]">
                              <b-tab active>
                               <template slot="title">
                                  <i class="icon-calculator"></i> {{tabs[0]}}
                              </template>
                                <b-form-group>
                                    <label for="ccnumber">No Proposal</label>
                                    <b-form-input type="text" v-model="permohonan.NoReference" required disabled></b-form-input>
                               </b-form-group>
                                <b-form-group>
                                    <label for="ccnumber">Tanggal Proposal</label>
                                    <b-form-input type="text" v-model="permohonan.DateProposal" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Tanggal Daftar</label>
                                    <b-form-input type="text" v-model="permohonan.DateRegistration" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">No KTP/SIM
                                    </label>
                                    <b-form-input type="text" v-model="permohonan.IDNumber" disabled></b-form-input>
                               </b-form-group>
                                <b-form-group>
                                    <label for="ccnumber">Referensi</label>
                                     <b-form-input  type="text" v-model="permohonan.Reference"required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Instansi/Lembaga</label>
                                     <b-form-input  type="text" v-model="permohonan.Instance"required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Nama Pemohon</label>
                                    <b-form-input type="text" v-model="permohonan.FullName" required disabled></b-form-input>
                               </b-form-group>
                                <b-form-group>
                                    <label for="ccnumber">Provinsi</label>
                                    <b-form-input type="text" v-model="permohonan.Prov_code" required disabled></b-form-input>
                               </b-form-group>
                                <b-form-group>
                                    <label for="ccnumber">Kota/Kabupaten</label>
                                     <b-form-input type="text" v-model="permohonan.Dist_code" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Kecamatan</label>
                                     <b-form-input type="text" v-model="permohonan.Subdis_code" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Kelurahan</label>
                                    <b-form-input type="text" v-model="permohonan.Village_code" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Alamat</label>
                                    <b-form-textarea  id="textarea"  v-model="permohonan.Address" disabled></b-form-textarea>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Nomor Telepon</label>
                                    <b-form-input type="number" v-model="permohonan.Phone" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Email
                                    </label>
                                    <b-form-input type="text" v-model="permohonan.eMail" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Jenis Bina Lingkungan</label>
                                     <b-form-input type="text" v-model="permohonan.BLType" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Bentuk Kegiatan</label>
                                    <b-form-input type="text" v-model="permohonan.Activity" required disabled></b-form-input>
                               </b-form-group>
                               <b-form-group>
                                    <label for="ccnumber">Nilai Pengajuan</label>
                                    <vue-numeric currency="Rp." disabled class="form-control" output-type="Number" v-model="permohonan.Amount"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric>
                               </b-form-group>
                              </b-tab>
                          </b-tabs>
                          </b-card>
                        </b-collapse>
                        </b-col>
                      </b-row>
                      <br><br>
                      <b-row>
                         <b-col sm="12">
                          <b-card>
                              <div slot="header">
                                  <strong>Riwayat Persetujuan </strong>
                              </div>
                              <b-row>
                                <b-col sm="12">
                                   <b-table id="histori_persetujuan"  :items="items_histori_persetujuan" :fields="fields_histori_persetujuan"></b-table>
                                 <!--  <b-table id="histori_persetujuan" :per-page="perPage_histori_persetujuan" :current-page="currentPage_histori_persetujuan" :items="items_histori_persetujuan" :fields="fields_histori_persetujuan"></b-table> -->
                                 <!--  <b-pagination v-model="currentPage_histori_persetujuan" :total-rows="rows_histori_persetujuan" :per-page="perPage_histori_persetujuan" aria-controls="histori_persetujuan"></b-pagination> -->
                                </b-col>
                              </b-row>
                          </b-card>
                         </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Nilai yang disetujui
                                <b class="text-danger"> *</b>
                              </label>
                          </b-col>
                          <b-col sm="4">
                            <money class="form-control" v-model="persetujuan.RecomendationValue" v-bind="money" :class="{'is-invalid': $v.persetujuan.RecomendationValue.$error}"></money>
                            <div class="text-danger" v-if="$v.persetujuan.RecomendationValue.$error">Nilai yang disetujui harus diisi</div>
                           <!--  <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="persetujuan.RecomendationValue"  separator="." :empty-value="0" v-bind:precision="2"></vue-numeric> -->
                          </b-col>
                      </b-row>
                      <b-row style="margin-top:10px">
                          <b-col sm="3">
                             <label for="ccnumber">Tahapan Termin
                                <b class="text-danger"> *</b>

                              </label>
                          </b-col>
                          <b-col sm="9">
                             <input type="hidden" name="JumlahTermin" v-model="JumlahTermin" />
                             <b-form-select  v-on:change="TerminCountyConfiguration($event)" v-model="persetujuan.TahapanTermin"  :options="options_TahapanTermin" :class="{'is-invalid': $v.persetujuan.TahapanTermin.$error}" :value="options_TahapanTermin.value"></b-form-select>
                              <div class="text-danger" v-if="$v.persetujuan.TahapanTermin.$error">Tahapan Termin harus diisi</div>
                          </b-col>
                      </b-row>
                       <b-row style="margin-top:10px"  v-show="persetujuan.TahapanTermin >= 1">
                          <b-col sm="3">
                          </b-col>
                          <b-col sm="1">
                             <label for="ccnumber">Termin 1
                              </label>
                          </b-col>
                           <b-col sm="7">
                            <money class="form-control" v-on:input="valueTermin1($event)" v-model="approvalTermin.Value1" v-bind="money" :disabled="approvalTermin.ContractNum[0] != null"></money>
                             <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="approvalTermin.Value[0]"  separator="." :empty-value="0" v-bind:precision="2" v-show="false"></vue-numeric>
                              <input type="hidden" name="approvalTermin.BLAppTerId[]" v-model="approvalTermin.BLAppTerId[0]" />
                                <input type="hidden" name="approvalTermin.ContractNum[]" v-model="approvalTermin.ContractNum[0]" />
                                  <input type="hidden" name="approvalTermin.DACodeChild[]" v-model="approvalTermin.DACodeChild[0]" />
                          </b-col>
                          <!--  <b-col sm="1">
                             <label for="ccnumber">Tanggal
                              </label>
                          </b-col>
                          <b-col sm="3">
                             <b-form-input  type="date" name="approvalTermin.TerminDate[]" v-model="approvalTermin.TerminDate[0]" ></b-form-input>
                          </b-col> -->
                      </b-row>
                      <b-row style="margin-top:10px"  v-show="persetujuan.TahapanTermin >= 2">
                          <b-col sm="3">
                          </b-col>
                          <b-col sm="1">
                             <label for="ccnumber">Termin 2
                              </label>
                          </b-col>
                           <b-col sm="7">
                            <money class="form-control" v-on:input="valueTermin2($event)" v-model="approvalTermin.Value2" v-bind="money" :disabled="approvalTermin.ContractNum[1] != null"></money>
                             <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="approvalTermin.Value[1]"  separator="." :empty-value="0" v-bind:precision="2" v-show="false"></vue-numeric>
                             <input type="hidden" name="approvalTermin.BLAppTerId[]" v-model="approvalTermin.BLAppTerId[1]" />
                              <input type="hidden" name="approvalTermin.ContractNum[]" v-model="approvalTermin.ContractNum[1]" />
                              <input type="hidden" name="approvalTermin.DACodeChild[]" v-model="approvalTermin.DACodeChild[1]" />
                          </b-col>
                          <!--  <b-col sm="1">
                             <label for="ccnumber">Tanggal
                              </label>
                          </b-col>
                          <b-col sm="3">
                             <b-form-input  type="date" name="approvalTermin.TerminDate[]" v-model="approvalTermin.TerminDate[1]" ></b-form-input>
                          </b-col> -->
                      </b-row>
                      <b-row style="margin-top:10px"  v-show="persetujuan.TahapanTermin >= 3">
                          <b-col sm="3">
                          </b-col>
                          <b-col sm="1">
                             <label for="ccnumber">Termin 3
                              </label>
                          </b-col>
                           <b-col sm="7">
                            <money class="form-control" v-on:input="valueTermin3($event)" v-model="approvalTermin.Value3" v-bind="money" :disabled="approvalTermin.ContractNum[2] != null"></money>
                             <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="approvalTermin.Value[2]"  separator="." :empty-value="0" v-bind:precision="2" v-show="false"></vue-numeric>
                              <input type="hidden" name="approvalTermin.BLAppTerId[]" v-model="approvalTermin.BLAppTerId[2]" />
                               <input type="hidden" name="approvalTermin.ContractNum[]" v-model="approvalTermin.ContractNum[2]" />
                               <input type="hidden" name="approvalTermin.DACodeChild[]" v-model="approvalTermin.DACodeChild[2]" />
                          </b-col>
                          <!--  <b-col sm="1">
                             <label for="ccnumber">Tanggal
                              </label>
                          </b-col>
                          <b-col sm="3">
                             <b-form-input name="approvalTermin.TerminDate[]"  type="date" v-model="approvalTermin.TerminDate[2]" ></b-form-input>
                          </b-col> -->
                      </b-row>
                      <b-row style="margin-top:10px"  v-show="persetujuan.TahapanTermin >= 4">
                          <b-col sm="3">
                          </b-col>
                          <b-col sm="1">
                             <label for="ccnumber">Termin 4
                              </label>
                          </b-col>
                           <b-col sm="7">
                            <money class="form-control" v-on:input="valueTermin4($event)" v-model="approvalTermin.Value4" v-bind="money" :disabled="approvalTermin.ContractNum[3] != null"></money>
                             <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="approvalTermin.Value[3]"  separator="." :empty-value="0" v-bind:precision="2" v-show="false"></vue-numeric>
                              <input type="hidden" name="approvalTermin.BLAppTerId[]" v-model="approvalTermin.BLAppTerId[3]" />
                               <input type="hidden" name="approvalTermin.ContractNum[]" v-model="approvalTermin.ContractNum[3]" />
                               <input type="hidden" name="approvalTermin.DACodeChild[]" v-model="approvalTermin.DACodeChild[3]" />
                          </b-col>
                          <!--  <b-col sm="1">
                             <label for="ccnumber">Tanggal
                              </label>
                          </b-col>
                          <b-col sm="3">
                             <b-form-input name="approvalTermin.TerminDate[]"  type="date" v-model="approvalTermin.TerminDate[2]" ></b-form-input>
                          </b-col> -->
                      </b-row>
                      <b-row style="margin-top:10px"  v-show="persetujuan.TahapanTermin >= 5">
                          <b-col sm="3">
                          </b-col>
                          <b-col sm="1">
                             <label for="ccnumber">Termin 5
                              </label>
                          </b-col>
                           <b-col sm="7">
                            <money class="form-control" v-on:input="valueTermin5($event)" v-model="approvalTermin.Value5" v-bind="money" :disabled="approvalTermin.ContractNum[4] != null"></money>
                             <vue-numeric currency="Rp." class="form-control" output-type="Number" v-model="approvalTermin.Value[4]"  separator="." :empty-value="0" v-bind:precision="2" v-show="false"></vue-numeric>
                              <input type="hidden" name="approvalTermin.BLAppTerId[]" v-model="approvalTermin.BLAppTerId[4]" />
                               <input type="hidden" name="approvalTermin.ContractNum[]" v-model="approvalTermin.ContractNum[4]" />
                               <input type="hidden" name="approvalTermin.DACodeChild[]" v-model="approvalTermin.DACodeChild[4]" />
                          </b-col>
                          <!--  <b-col sm="1">
                             <label for="ccnumber">Tanggal
                              </label>
                          </b-col>
                          <b-col sm="3">
                             <b-form-input name="approvalTermin.TerminDate[]"  type="date" v-model="approvalTermin.TerminDate[2]" ></b-form-input>
                          </b-col> -->
                      </b-row>
                      <b-row>
                      <b-col sm="12"  >
                          <b-form-group v-if="status != 'Ubah' && status != 'UbahApp' && statusPencairan == null">
                              <label for="ccnumber">Keputusan
                                <b class="text-danger"> *</b>
                              </label>
                               <b-form-radio-group v-model="persetujuan.Status" name="approvalWorkflow.Status" :options="options_Status" :class="{'is-invalid': $v.persetujuan.Status.$error}">
                              </b-form-radio-group>
                               <div class="text-danger" v-if="$v.persetujuan.Status.$error">Keputusan harus diisi</div>
                         </b-form-group>
                           <b-form-group>
                              <label for="ccnumber">Alasan Persetujuan
                                <b class="text-danger"> *</b>
                              </label>
                               <b-form-textarea  id="textarea"  v-model="persetujuan.Notes" rows="5" :class="{'is-invalid': $v.persetujuan.Notes.$error}"></b-form-textarea>
                                <div class="text-danger" v-if="$v.persetujuan.Status.$error">Alasan Persetujuan diisi</div>
                         </b-form-group>
                      </b-col>
                    </b-row>

                      <b-row>
                        <b-col sm="12">
                          <label for="ccnumber">
                            <b class="text-danger"> *</b> Wajib diisi
                          </label>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top:100px" v-if="status != 'Ubah' && status != 'UbahApp' && approvalTermin.ContractNum[approvalTermin.ContractNum.length - 1] == null">
                        <b-col sm="12">
                          <div class="form-group form-actions">
                            <b-button type="submit" size="md" variant="info" v-on:click="saveDraft()" v-model="typeSave"  :disabled="klik">Save Draft</b-button>
                            <b-button type="button" size="md" variant="primary" v-on:click="saveProses()" :disabled="klik">Submit Process</b-button>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top:100px" v-if="status == 'Ubah' || status == 'UbahApp' && approvalTermin.ContractNum[approvalTermin.ContractNum.length - 1] == null">
                        <b-col sm="12">
                          <div class="form-group form-actions">
                            <b-button type="submit" size="md" variant="info" v-on:click="saveDraft()">Ubah</b-button>
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
    import apiBLApprovalWorkflow from '@/api/BL/BLApprovalWorkflowApiService';
    import apiApprovalTermin from '@/api/BL/BLApprovalTerminApiService';
    import apiApproval from '@/api/BL/BLApprovalApiService';
    import apiAttached from '@/api/PK/AttachedApiService';
    import apiDebitAccountWorkFlow from '@/api/PK/DebitAccountWorkFlowApiService';
    import apiDebitAccountState from '@/api/PK/DebitAccountStateApiSevice';
    import dynamic from '@/api/DynamicApiService';
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
              username:null,
              cabang:null,
              status:'insert',
              statusPencairan: null,
              typeSave:'Ubah',
              JumlahTermin:0,
               dataTableDA: {
                Colum: "DACode",
                Table: "DebitAccount",
                Start: 0,
                Search: null
              },
               debitAccountState:{},
              DebitAccountWorkFlow:{
                DACode: null,
                TanggalPengajuan: null,
                TanggalPenilaian: null,
                TanggalPersetujuan: null,
                TanggalPerjanjian: null,
                TanggalSP3: null,
                TanggalPencairan: null
              },
              money: {
                  decimal: ',',
                  thousands: '.',
                  prefix: 'Rp. ',
                  suffix: '',
                  precision: 2,
                  masked: false
                },
              approvalTerminsave:{},
               approvalTermin:{
                Value:[0,0,0,0,0],
                TerminDate:[ this.formatDate(new Date()), this.formatDate(new Date()), this.formatDate(new Date()), this.formatDate(new Date()), this.formatDate(new Date())] ,
                Tenor:null,
                DACode:null,
                BLAppTerId:[],
                ContractNum:[],
                DACodeChild:[]
              },
              RecomendationValue:0,
              DebCode:null,
              DACode: null,
              AppWorkCode: null,
              debitAccount:{
                IsCompleted: false
              },
              approval:{},
              permohonan:{},
              configConfirm:null,
              textConfirm:null,
               persetujuan:{
                  DACode:null,
                  AppDate:this.formatDate(new Date()),
                  ReqDate: new Date(),
                  TahapanTermin: 0,
               },
               tabIndex: [0, 0],
                tabs: [
                    'Data Pemohon'
                ],
                 options_TahapanTermin:[
                    { text: 'Pilih', value: 0 },
                    { text: '1 Termin', value: 1 },
                    { text: '2 Termin', value: 2 },
                    { text: '3 Termin', value: 3 },
                    { text: '4 Termin', value: 4 },
                    { text: '5 Termin', value: 5 }
                ],
                options_Status: [
                   { text: 'Layak', value: 'Layak' },
                   { text: 'Tidak Layak', value: 'Tidak Layak' },
                   { text: 'Tunda', value: 'Tunda' }
                 ],
                 // perPage_histori_persetujuan: 5,
                 // currentPage_histori_persetujuan: 1,
                 items_histori_persetujuan: [],
                 fields_histori_persetujuan: [
                   {label: 'Level',key:'Sequence'},
                   {label: 'Nama Level',key: 'ReqType'},
                   {label: 'Nama User',key: 'Pos_Name'},
                   {label: 'Tanggal',key: 'AppDate'},
                   {label: 'Nilai Rekomendasi',key: 'RecomendationValue'},
                   {label: 'Catatan',key: 'Notes'}
                 ],
                fields_histori_file: [
                  {label: 'No',key:'No',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Keterangan',key: 'Tittle',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Nama File',key: 'Filename',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Size',key: 'SizeFile',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Tanggal Upload',key: 'CreatedAt',thStyle: { backgroundColor: '#cbced0'}},
                  {label: 'Aksi',key: 'aksi',thStyle: { backgroundColor: '#cbced0'}}
                ],
                items_histori_file:[],
            }
        },
        validations: {
        persetujuan: {
          AppDate: { required },
          TahapanTermin: { required },
          Status: { required },
          Notes: { required },
          RecomendationValue: { required, minLength: minLength(3) },
        }
      },
        watch:{
         'approvalTermin.Value1': async function () {
          console.log("TERMIN 1",this.approvalTermin.Value1)
              var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah > this.persetujuan.RecomendationValue){
                   alert("Jumlah termin melebihi nilai yang di setujui")
                    this.approvalTermin.Value[0] = 0
                    this.approvalTermin.Value1 = 0
              }else{
                    this.approvalTermin.Value[0] = this.approvalTermin.Value1
              }
         },
         'approvalTermin.Value2': async function(){
          console.log("TERMIN 2",this.approvalTermin.Value2)
          var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah > this.persetujuan.RecomendationValue){
                   alert("Jumlah termin melebihi nilai yang di setujui")
                    this.approvalTermin.Value[1] = 0
                    this.approvalTermin.Value2 = 0
              }else{
                    this.approvalTermin.Value[1] = this.approvalTermin.Value2
              }
         },
         'approvalTermin.Value3': async function(){
          console.log("TERMIN 3",this.approvalTermin.Value3)
          var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah > this.persetujuan.RecomendationValue){
                   alert("Jumlah termin melebihi nilai yang di setujui")
                    this.approvalTermin.Value[2] = 0
                    this.approvalTermin.Value3 = 0
              }else{
                  this.approvalTermin.Value[2] = this.approvalTermin.Value3
              }
         },
         'approvalTermin.Value4': async function(){
          console.log("TERMIN 4",this.approvalTermin.Value4)
          var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah > this.persetujuan.RecomendationValue){
                   alert("Jumlah termin melebihi nilai yang di setujui")
                    this.approvalTermin.Value[3] = 0
                    this.approvalTermin.Value4 = 0
              }else{
                  this.approvalTermin.Value[3] = this.approvalTermin.Value4
              }
         },
         'approvalTermin.Value5': async function(){
          console.log("TERMIN 5",this.approvalTermin.Value5)
          var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah > this.persetujuan.RecomendationValue){
                   alert("Jumlah termin melebihi nilai yang di setujui")
                    this.approvalTermin.Value[4] = 0
                    this.approvalTermin.Value5 = 0
              }else{
                  this.approvalTermin.Value[4] = this.approvalTermin.Value5
              }
         },
         // 'persetujuan.TahapanTermin': async function(){
         //      console.log("MASUK TERMIN")
         //      if(this.persetujuan.TahapanTermin == 1){

         //        if(this.approvalTermin.ContractNum[0] == null){
         //           this.approvalTermin.Value[0] =  this.persetujuan.RecomendationValue
         //          this.approvalTermin.Value1 = this.persetujuan.RecomendationValue
         //        }
         //      }
         //      if(this.persetujuan.TahapanTermin == 2 || this.persetujuan.TahapanTermin == 3 || this.persetujuan.TahapanTermin == 4 || this.persetujuan.TahapanTermin == 5){
         //        if(this.approvalTermin.ContractNum[0] == null){
         //           this.approvalTermin.Value[0] =  0
         //          this.approvalTermin.Value1 = 0
         //        }
         //        if(this.approvalTermin.ContractNum[1] == null){
         //            this.approvalTermin.Value[1] = 0
         //            this.approvalTermin.Value2 = 0
         //        }
         //        if(this.approvalTermin.ContractNum[2] == null){
         //             this.approvalTermin.Value[2] = 0
         //            this.approvalTermin.Value3 = 0
         //        }
         //        if(this.approvalTermin.ContractNum[3] == null){
         //           this.approvalTermin.Value[3] = 0
         //          this.approvalTermin.Value4 = 0
         //        }
         //         if(this.approvalTermin.ContractNum[4] == null){
         //             this.approvalTermin.Value[4] = 0
         //            this.approvalTermin.Value5 = 0
         //        }
         //      }
         // },
        },
        async created() {
            this.loading = true
            this.DebCode = this.$route.params.DebCode;
            this.DACode = this.$route.params.DACode;
            this.AppWorkCode = this.$route.params.AppWorkCode;
            if(this.$route.params.Mode){
              if(this.$route.params.Mode == 'Ubah'){
                this.typeSave = "Ubah"
              }
             this.status =  this.$route.params.Mode;
            }else{
              this.typeSave = "Ubah"
              this.status = "insert"
             // console.log("STATUSNYA",this.status)
            }
            this.username = localStorage.username
            this.cabang = localStorage.cabang
            this.textConfirm = await this.getConfig("PROMPT_TEXT_MESSAGE")
            this.configConfirm = JSON.parse(await this.getConfig("PROMPT_CONFIG_MESSAGE"))
             var getDebitur = await apiDebitor.getOne(this.DebCode)
             if(getDebitur.Data[0]){
              this.permohonan = getDebitur.Data[0]
               if(getDebitur.Data[0].DateProposal){
                      this.permohonan.DateProposal = this.formatDateDMY(getDebitur.Data[0].DateProposal)
               }
               if(getDebitur.Data[0].DateRegistration){
                      this.permohonan.DateRegistration = this.formatDateDMY(getDebitur.Data[0].DateRegistration)
               }
             }

             var getApproval = await apiApproval.getOneByDACode(this.DACode)
             this.approval = getApproval.Data
              var idAppWork = Number(this.AppWorkCode) - 1
             var NilaiRekomendasi = await apiBLApprovalWorkflow.getOne(idAppWork)
             this.RecomendationValue = NilaiRekomendasi.Data[0].RecomendationValue
             var getApprovalWorkflow = await apiBLApprovalWorkflow.getOne(this.AppWorkCode)
              this.persetujuan = getApprovalWorkflow.Data[0]
              console.log("DATA PERSETUJUAN",this.persetujuan)
              if(getApprovalWorkflow.Data[0].AppDate){
                this.persetujuan.AppDate = getApprovalWorkflow.Data[0].AppDate
              }
              var getDebitAccount = await apiDebitAccount.getOne(this.DACode)
              this.debitAccount = getDebitAccount.Data[0]
              var getApprovalTermin = await apiApprovalTermin.getOneByDaCode(this.DACode)
              var TahapanTermin = 0
              for (var i = 0; i < getApprovalTermin.Data.length; i++) {
                // this.approvalTermin.TerminDate[i] = this.formatDate(getApprovalTermin.Data[i].TerminDate)
                TahapanTermin = getApprovalTermin.Data.length
                this.approvalTermin.BLAppTerId[i] = getApprovalTermin.Data[i].BLAppTerId
                if(getApprovalTermin.Data[i].ContractNum){
                  this.approvalTermin.ContractNum[i] = getApprovalTermin.Data[i].ContractNum
                }else{
                  this.approvalTermin.ContractNum[i] = null
                }
                  this.approvalTermin.DACodeChild[i] = getApprovalTermin.Data[i].DACodeChild
                  // console.log("CONTRACTNUM 1",this.approvalTermin.ContractNum[i])
              }
              this.persetujuan.TahapanTermin = TahapanTermin
              // console.log("TERMIN",this.persetujuan.TahapanTermin)
              // console.log("CONTRACTNUM",this.approvalTermin.ContractNum.length - 1)
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

              this.getAllApprovalWorkflow()
              this.getAllAttach()

              if(getApprovalTermin.Data[0]){
                if(getApprovalTermin.Data[0].Value != 0){
                 this.approvalTermin.Value[0] = getApprovalTermin.Data[0].Value
                  this.approvalTermin.Value1 = this.approvalTermin.Value[0]
                }
              }
              if(getApprovalTermin.Data[1]){
                if(getApprovalTermin.Data[1].Value != 0){
                   this.approvalTermin.Value[1] = getApprovalTermin.Data[1].Value
                  this.approvalTermin.Value2 = this.approvalTermin.Value[1]
                }
              }
              if(getApprovalTermin.Data[2]){
                if(getApprovalTermin.Data[2].Value != 0){
                   this.approvalTermin.Value[2] = getApprovalTermin.Data[2].Value
                  this.approvalTermin.Value3 = this.approvalTermin.Value[2]
                }
              }
              if(getApprovalTermin.Data[3]){
                if(getApprovalTermin.Data[3].Value != 0){
                   this.approvalTermin.Value[3] = getApprovalTermin.Data[3].Value
                  this.approvalTermin.Value4 = this.approvalTermin.Value[3]
                }
              }
              if(getApprovalTermin.Data[4]){
                if(getApprovalTermin.Data[4].Value != 0){
                   this.approvalTermin.Value[4] = getApprovalTermin.Data[4].Value
                  this.approvalTermin.Value5 = this.approvalTermin.Value[4]
                }
              }
            console.log("WorkFlow",this.persetujuan.TahapanTermin)
            this.loading = false
        },
        computed: {
          // rows_histori_persetujuan() {
          //   return this.items_histori_persetujuan.length
          // }
        },
         methods: {
            disabledDate(date) {
              return date > this.getClosingDate().startDate && date < this.getClosingDate().endDate
            },
            valueTermin1(newdata){
               // console.log("TERMIN 1",this.approvalTermin.Value1)
              var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah > this.persetujuan.RecomendationValue){
                   alert("Jumlah termin melebihi nilai yang di setujui")
                    this.approvalTermin.Value[0] = 0
                    this.approvalTermin.Value1 = 0
              }else{
                    this.approvalTermin.Value[0] = this.approvalTermin.Value1
              }
            },
             valueTermin2(newdata){
               // console.log("TERMIN 2",this.approvalTermin.Value2)
              var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
                  if(jumlah > this.persetujuan.RecomendationValue){
                       alert("Jumlah termin melebihi nilai yang di setujui")
                        this.approvalTermin.Value[1] = 0
                        this.approvalTermin.Value2 = 0
                  }else{
                        this.approvalTermin.Value[1] = this.approvalTermin.Value2
                  }
            },
             valueTermin3(newdata){
                // console.log("TERMIN 3",this.approvalTermin.Value3)
                var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
                    if(jumlah > this.persetujuan.RecomendationValue){
                         alert("Jumlah termin melebihi nilai yang di setujui")
                          this.approvalTermin.Value[2] = 0
                          this.approvalTermin.Value3 = 0
                    }else{
                        this.approvalTermin.Value[2] = this.approvalTermin.Value3
                    }
            },
             valueTermin4(newdata){
                // console.log("TERMIN 4",this.approvalTermin.Value4)
              var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
                  if(jumlah > this.persetujuan.RecomendationValue){
                       alert("Jumlah termin melebihi nilai yang di setujui")
                        this.approvalTermin.Value[3] = 0
                        this.approvalTermin.Value4 = 0
                  }else{
                      this.approvalTermin.Value[3] = this.approvalTermin.Value4
                  }
            },
             valueTermin5(newdata){
               // console.log("TERMIN 5",this.approvalTermin.Value5)
              var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
                  if(jumlah > this.persetujuan.RecomendationValue){
                       alert("Jumlah termin melebihi nilai yang di setujui")
                        this.approvalTermin.Value[4] = 0
                        this.approvalTermin.Value5 = 0
                  }else{
                      this.approvalTermin.Value[4] = this.approvalTermin.Value5
                  }
            },
            async TerminCountyConfiguration(newdata){
                console.log("DATA TERMIT",newdata)
                if(newdata == 1){

                console.log("DATA TERMIT",newdata)
                if(this.approvalTermin.ContractNum[0] == null){
                   this.approvalTermin.Value[0] =  this.persetujuan.RecomendationValue
                  this.approvalTermin.Value1 = this.persetujuan.RecomendationValue
                }
              }
              if(newdata == 2 || newdata == 3 || newdata == 4 || newdata == 5){
                console.log("DATA TERMIT",newdata)
                if(this.approvalTermin.ContractNum[0] == null){
                   this.approvalTermin.Value[0] =  0
                  this.approvalTermin.Value1 = 0
                }
                if(this.approvalTermin.ContractNum[1] == null){
                    this.approvalTermin.Value[1] = 0
                    this.approvalTermin.Value2 = 0
                }
                if(this.approvalTermin.ContractNum[2] == null){
                     this.approvalTermin.Value[2] = 0
                    this.approvalTermin.Value3 = 0
                }
                if(this.approvalTermin.ContractNum[3] == null){
                   this.approvalTermin.Value[3] = 0
                  this.approvalTermin.Value4 = 0
                }
                 if(this.approvalTermin.ContractNum[4] == null){
                     this.approvalTermin.Value[4] = 0
                    this.approvalTermin.Value5 = 0
                }
              }
                 this.persetujuan.TahapanTermin = newdata
                 this.JumlahTermin = newdata
                console.log("DATA TERMIT",this.persetujuan.TahapanTermin)
            },
            async saveDraft(){
              // console.log(this.persetujuan.TahapanTermin)
              // console.log(this.approvalTermin.BLAppTerId)
              console.log( "TERMINNYA",this.approvalTermin.Value)
              // this.persetujuan.Status = "Tunda"
              var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah != this.persetujuan.RecomendationValue){
                   alert("Nilai termin tidak sesuai ....!")
              }else{
                 this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                   .then(async (value) => {
                      if(value){
                          this.loading = true
                          this.klik = true
                        // this.$v.$touch()
                        // if (!this.$v.$invalid) {
                             // console.log(this.approvalTermin);
                          this.persetujuan.DACode = this.DACode
                            // console.log("Tanggal Setuju",this.persetujuan.AppDate)
                          if(this.status == "UbahApp"){
                              // console.log("STATUSNYA",this.status)
                            this.approval.Value = this.persetujuan.RecomendationValue
                            this.approval.UpdatedBy = this.username
                            let dataApproval = await apiApproval.update(this.approval.BLAppId,this.approval)
                            console.log("Tanggal Setuju",this.persetujuan.AppDate)
                            this.persetujuan.UpdatedBy = this.username
                            let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                          }else{
                            this.persetujuan.AppDate = null
                            console.log("Tanggal Setuju",this.persetujuan.AppDate)
                            this.persetujuan.UpdatedBy = this.username
                            let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                          }

                            this.DebitAccountWorkFlow.TanggalPersetujuan = this.persetujuan.AppDate
                            this.DebitAccountWorkFlow.UpdatedBy = this.username
                            let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)
                          for (var i = 0; i < this.approvalTermin.Value.length; i++) {
                            this.dataTableDA.Search = 'BL'+this.cabang
                            this.dataTableDA.Start =  this.dataTableDA.Search.length + 1
                            var codeDACode = await this.getCount(this.dataTableDA)
                              this.approvalTerminsave.Tenor = i + 1
                              this.approvalTerminsave.DACode = this.DACode
                            if(this.approvalTermin.Value[i] > 0){
                              console.log("MASUK VALUE 1",this.approvalTermin.Value[i])
                                this.approvalTerminsave.Value = this.approvalTermin.Value[i]
                                this.approvalTerminsave.TerminDate = this.approvalTermin.TerminDate[i]
                                if(this.approvalTermin.DACodeChild[i]){
                                  this.approvalTerminsave.DACodeChild = this.approvalTermin.DACodeChild[i]
                                }else{
                                  this.approvalTerminsave.DACodeChild =  codeDACode
                                }

                                var debitAccount = {}
                               var debitAccountWorkFlow = {}
                                if(this.approvalTermin.DACodeChild[i]){
                                     var getDebitAccount = await apiDebitAccount.getOne(this.approvalTermin.DACodeChild[i])
                                     console.log("DataDEBACCOUNT",this.approvalTermin.DACodeChild[i])
                                     if(getDebitAccount.Data[0]){
                                        debitAccount = getDebitAccount.Data[0]
                                        debitAccount.ParentDACode = this.DACode
                                        debitAccount.ContractDate = new Date()
                                        debitAccount.DebValue = this.approvalTermin.Value[i]
                                        debitAccount.StatusApprove = 'Approve'
                                        debitAccount.UpdatedBy = this.username
                                        let dataDebitAccount = await apiDebitAccount.update(this.approvalTermin.DACodeChild[i],debitAccount)
                                     }
                                }else{
                                   if(this.status == "UbahApp"){

                                     debitAccount.InterestRate = 3
                                      debitAccount.StlmCycle = 0
                                      debitAccount.StlmBillvalue = 0
                                      debitAccount.OutstandingBal = 0
                                      debitAccount.Arrears = 0
                                      debitAccount.LateFromDue = 0
                                      debitAccount.Collectability = 0
                                      debitAccount.IsCompleted = false
                                      debitAccount.ContractDate = new Date()
                                       debitAccount.Tenor =  this.approvalTerminsave.Tenor
                                      debitAccount.DACode = codeDACode
                                      debitAccount.DebCode = this.DebCode
                                      debitAccount.DebValue = this.approvalTermin.Value[i]
                                      debitAccount.ParentDACode = this.DACode
                                      debitAccount.StatusApprove = 'Approve'
                                      debitAccount.CreatedBy = this.username
                                      let dataDebAccount = await apiDebitAccount.create(debitAccount)
                                      debitAccountWorkFlow = this.DebitAccountWorkFlow
                                      debitAccountWorkFlow.DACode = codeDACode
                                      debitAccountWorkFlow.CreatedBy = this.username
                                      debitAccountWorkFlow.persetujuan = this.persetujuan.AppDate
                                      debitAccountWorkFlow.perjanjian = new Date()
                                       let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.create(debitAccountWorkFlow)
                                   }
                                }

                              if(this.approvalTermin.BLAppTerId[i]){
                                console.log("MASUK APROFAL 1",this.approvalTerminsave)
                                this.approvalTerminsave.UpdatedBy = this.username
                                   let dataTermin = await apiApprovalTermin.update(this.approvalTermin.BLAppTerId[i],this.approvalTerminsave)
                              }else{
                                this.approvalTerminsave.CreatedBy = this.username
                                console.log("MASUK APROFAL 2",this.approvalTerminsave)
                                  let dataTermin = await apiApprovalTermin.create(this.approvalTerminsave)
                              }
                            }else{
                              console.log("MASUK VALUE 2",this.approvalTermin.Value[i])
                               var debitAccount = {}
                                if(this.approvalTermin.DACodeChild[i]){
                                       console.log("DataDEBACCOUNT 3",this.approvalTermin.DACodeChild[i])
                                     var getDebitAccount = await apiDebitAccount.getOne(this.approvalTermin.DACodeChild[i])
                                     if(getDebitAccount.Data[0]){
                                         debitAccount = getDebitAccount.Data[0]
                                        debitAccount.DebValue = 0
                                        debitAccount.ParentDACode = null
                                        debitAccount.ContractDate = null
                                        debitAccount.StatusApprove = null
                                       console.log("DataDEBACCOUNT 3",debitAccount)
                                      debitAccount.UpdatedBy = this.username
                                       let dataDebitAccountWorkFlow = await apiDebitAccount.update(this.approvalTermin.DACodeChild[i],debitAccount)
                                     }
                                }
                               if(this.approvalTermin.BLAppTerId[i]){
                                console.log("MASUK APROFAL 3",this.approvalTerminsave)
                                 // this.approvalTerminsave.DACode = this.DACode
                                  this.approvalTerminsave.Value = 0
                                  // this.approvalTerminsave.Tenor = this.approvalTerminsave.Tenor
                                  this.approvalTerminsave.TerminDate = this.approvalTermin.TerminDate[i]
                                  if(this.approvalTermin.DACodeChild[i]){
                                    this.approvalTerminsave.DACodeChild = this.approvalTermin.DACodeChild[i]
                                  }
                                  this.approvalTerminsave.UpdatedBy = this.username
                                  let dataTermin = await apiApprovalTermin.update(this.approvalTermin.BLAppTerId[i],this.approvalTerminsave)
                               }
                            }
                          }
                          this.loading = false
                          this.showNotif(dataDebitAccountWorkFlow,'Penilaian')
                          this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                        // }else{
                        //    alert("Harap isi data yang wajib")
                        // }
                      }
                   })
                   .catch(err => {
                    // An error occurred
                   })

              }


            },
            async saveProses(){
               var jumlah = this.approvalTermin.Value1 + this.approvalTermin.Value2 + this.approvalTermin.Value3 + this.approvalTermin.Value4 + this.approvalTermin.Value5
              if(jumlah != this.persetujuan.RecomendationValue){
                   alert("Nilai tidak sesuai ....!")
              }else{
                this.$v.$touch()
                if (!this.$v.$invalid) {
                   this.$bvModal.msgBoxConfirm(this.textConfirm,this.configConfirm)
                         .then(async (value) => {
                            if(value){
                              this.loading = true
                              this.klik = true
                              // console.log(this.approvalTermin);
                                this.persetujuan.DACode = this.DACode
                                // this.persetujuan.ReqDate = null
                                console.log(this.approvalTermin.Value)
                                // return 0
                                if (this.persetujuan.Status == 'Tidak Layak') {
                                   this.approval.Value = this.persetujuan.RecomendationValue
                                    this.approval.UpdatedBy = this.username
                                    let dataApproval = await apiApproval.update(this.approval.BLAppId,this.approval)
                                    this.DebitAccountWorkFlow.TanggalPersetujuan = this.persetujuan.AppDate

                                    this.DebitAccountWorkFlow.UpdatedBy = this.username
                                    let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)


                                    this.persetujuan.UpdatedBy = this.username
                                   let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                    // this.persetujuan.UpdatedBy = this.username
                                    let updateStatus = await apiBLApprovalWorkflow.updateStatus(this.DACode,this.persetujuan)
                                  this.showNotif(updateStatus,'Persetujuan')
                                  this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                                }

                                if (this.persetujuan.Status == 'Tunda') {
                                    this.persetujuan.AppDate = null
                                    this.DebitAccountWorkFlow.TanggalPersetujuan = this.persetujuan.AppDate

                                    this.DebitAccountWorkFlow.UpdatedBy = this.username
                                    let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)
                                    this.persetujuan.UpdatedBy = this.username
                                   let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                  this.showNotif(data,'Persetujuan')
                                  this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                                }
                                var tenor = 1;
                                for (var i = 0; i < this.approvalTermin.Value.length; i++) {
                                  if (this.approvalTermin.Value[i] > 0) {
                                      this.dataTableDA.Search = 'BL'+this.cabang
                                    this.dataTableDA.Start =  this.dataTableDA.Search.length + 1
                                    var codeDACode = await this.getCount(this.dataTableDA)
                                    this.approvalTerminsave.DACode = this.DACode
                                     if (i < 1) {
                                        this.approvalTerminsave.DACodeChild = this.DACode
                                     }else{
                                       this.approvalTerminsave.DACodeChild = codeDACode
                                     }
                                      this.approvalTerminsave.Tenor = i + 1
                                      this.approvalTerminsave.Value = this.approvalTermin.Value[i]
                                      this.approvalTerminsave.TerminDate = this.approvalTermin.TerminDate[i]
                                    if(this.approvalTermin.BLAppTerId[i]){
                                    this.approvalTerminsave.UpdatedBy = this.username
                                        let dataTermin = await apiApprovalTermin.update(this.approvalTermin.BLAppTerId[i],this.approvalTerminsave)
                                    }else{
                                        this.approvalTerminsave.CreatedBy = this.username
                                        let dataTermin = await apiApprovalTermin.create(this.approvalTerminsave)
                                    }

                                    var debitAccount = {}
                                      debitAccount.InterestRate = 3
                                      debitAccount.StlmCycle = 0
                                      debitAccount.StlmBillvalue = 0
                                      debitAccount.OutstandingBal = 0
                                      debitAccount.Arrears = 0
                                      debitAccount.LateFromDue = 0
                                      debitAccount.Collectability = 0
                                      debitAccount.IsCompleted = false

                                    var DebitAccountWorkFlow = {}



                                    if (this.persetujuan.Status == 'Layak') {
                                       this.approval.Value = this.persetujuan.RecomendationValue
                                        this.debitAccountState.ApprovedDate = new Date()
                                        this.debitAccountState.ApprovedValue = this.persetujuan.RecomendationValue

                                          this.debitAccountState.UpdatedBy = this.username
                                         let dataDebitAccountState = await apiDebitAccountState.update(this.DACode,this.debitAccountState)

                                          this.approval.UpdatedBy = this.username
                                        let dataApproval = await apiApproval.update(this.approval.BLAppId,this.approval)
                                          this.persetujuan.UpdatedBy = this.username
                                         let data = await apiBLApprovalWorkflow.update( this.AppWorkCode,this.persetujuan)
                                        debitAccount.StatusApprove = "Approve"
                                        debitAccount.Tenor = tenor
                                        debitAccount.ContractDate = this.approvalTermin.TerminDate[i]
                                    }
                                    console.log(i);
                                    if (i < 1) {
                                      debitAccount.DebValue = this.approvalTermin.Value[i]
                                      debitAccount.DebCode = this.DebCode
                                      console.log("update",debitAccount);
                                      debitAccount.UpdatedBy = this.username
                                      let dataDebAccount = await apiDebitAccount.update(this.DACode,debitAccount)
                                    }else {
                                      // var autoincDebitorAccount = await dynamic.getCount('debitAccount/CountByDACode')
                                      // var total = parseInt(autoincDebitorAccount[0].Total)
                                      // console.log(autoincDebitorAccount,"Auto Debit");
                                      // console.log('DABL'+total);
                                      debitAccount.DACode = codeDACode
                                      debitAccount.DebCode = this.DebCode
                                      debitAccount.DebValue = this.approvalTermin.Value[i]
                                      debitAccount.ParentDACode = this.DACode

                                       DebitAccountWorkFlow.TanggalPengajuan =  this.DebitAccountWorkFlow.TanggalPengajuan
                                       DebitAccountWorkFlow.TanggalPenilaian =  this.DebitAccountWorkFlow.TanggalPenilaian
                                       DebitAccountWorkFlow.TanggalPersetujuan =  this.DebitAccountWorkFlow.TanggalPersetujuan
                                       DebitAccountWorkFlow.DACode =  this.approvalTerminsave.DACodeChild
                                       if(this.persetujuan.AppDate){
                                          debitAccount.CreatedBy = this.username
                                          let dataDebAccount = await apiDebitAccount.create(debitAccount)

                                         this.DebitAccountWorkFlow.TanggalPersetujuan = this.persetujuan.AppDate
                                           this.DebitAccountWorkFlow.TanggalPerjanjian = new Date()
                                           if(this.DACode == codeDACode){
                                              this.DebitAccountWorkFlow.UpdatedBy = this.username
                                              let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.update( this.DACode,this.DebitAccountWorkFlow)
                                           }else{
                                              DebitAccountWorkFlow.CreatedBy = this.username
                                              let dataDebitAccountWorkFlow = await apiDebitAccountWorkFlow.create(DebitAccountWorkFlow)
                                           }
                                       }
                                    }
                                    tenor = tenor + 1
                                  }
                                }
                                this.loading = false
                                this.$notify({
                                  group: 'notif-response',
                                  title: 'Operation Success',
                                  text: ' Data Successfully Processed',
                                  type: 'success'
                                });
                                this.$router.push('/bussiness-process-desaigner/workflow-initialization2')
                            }
                         })
                         .catch(err => {
                          // An error occurred
                         })
                }else{
                   alert("Harap isi data yang wajib")
                }
              }


            },
            async getAllApprovalWorkflow() {
               var dataTable = await apiBLApprovalWorkflow.getOneByDaCode(this.DACode)
               for (var i = 0; i < dataTable.Data.length; i++) {
                  if(dataTable.Data[i].AppDate){
                    dataTable.Data[i].AppDate = this.formatDateDMY(dataTable.Data[i].AppDate)
                  }
                   if(dataTable.Data[i].RecomendationValue){
                    dataTable.Data[i].RecomendationValue = this.formatCurrency(dataTable.Data[i].RecomendationValue,"Rp.")
                  }
               }
                this.items_histori_persetujuan = dataTable.Data
                console.log(dataTable)
            },
            async getAllAttach() {
               var dataTable = await apiAttached.getOneByDaCode(this.DebCode)
               for (var i = 0; i < dataTable.Data.length; i++) {
                 dataTable.Data[i].No = i + 1
                  if(dataTable.Data[i].CreatedAt){
                    dataTable.Data[i].CreatedAt = this.formatDateDMY(dataTable.Data[i].CreatedAt)
                  }
               }
                this.items_histori_file = dataTable.Data
                console.log(dataTable)
          },
           async download(data){
            let formData = new FormData();
                formData.append('id', data);
                 let saveDataFile = await apiAttached.getOneId(data)
                 let saveFile = await apiAttached.download(formData)
                  var filename = saveDataFile.Filename;
                  var contentType = saveFile.headers['content-type'];
                  this.downloadFile(saveFile.data,contentType,filename)
              console.log("IDNYA", saveDataFile.Filename)
          }
         }
    }
</script>
<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
</style>
