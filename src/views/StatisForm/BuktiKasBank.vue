<!-- <template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
              <card>
                <b-row>
                    <b-col sm="2">
                        <img src="static/logo.png" style="width:50px;">
                    </b-col>
                </b-row>
              </card>
            </b-col>
        </b-row>
    </div>
</template> -->
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
                  <b-row>
                      <b-col sm="12">
                        <b-row>
                            <b-col sm="6">
                                <h1 style="padding-top:20px;"><b>{{this.$route.params.name}}</b></h1>
                            </b-col>
                            <b-col sm="2">
                            </b-col>
                            <b-col sm="2">
                            </b-col>
                            <b-col sm="2">
                                <img class="leader" :src="globalEnv == 'pertamina' ? 'pkbl_online/static/logo.png' : '/static/logo.png'" style="width:300px;padding-top:5px;float:right;">
                                <!-- <img src="static/logo.png" style="width:300px;padding-top:5px;float:right;"> -->
                            </b-col>
                        </b-row>

                        <hr>

                        <b-row>
                            <b-col sm="2">
                              <label for="ccnumber">No Bukti
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                            <b-col sm="6">
                              <label for="ccnumber">: {{ this.JournalArray[0].JournalNumber }}
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="2">
                              <label for="ccnumber">Tanggal
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                            <b-col sm="6">
                              <label for="ccnumber">: {{ this.formatDateDMY(this.JournalArray[0].JournalDate) }}
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="2">
                              <label for="ccnumber">Kepada
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                            <b-col sm="6">
                              <label for="ccnumber" v-if="this.JournalArray[0].JournalCash[0]">: {{ this.JournalArray[0].JournalCash[0].Receiver }}
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="2">
                              <label for="ccnumber">Keterangan
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                            <b-col sm="6">
                              <label for="ccnumber">: {{ this.JournalArray[0].Description }}
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                        </b-row>
                        <br>

                        <b-row>
                            <b-col sm="12">
                                <b-table striped hover responsive
                                :items="items"
                                :fields="fields"
                                :current-page="currentPage"
                                :per-page="perPage" ></b-table>
                            </b-col>
                        </b-row>
                        <br>

                        <b-row>
                            <b-col sm="3">
                              <label for="ccnumber">Permintaan Bayar
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>

                            <b-col sm="3">
                              <label for="ccnumber">Verifikasi
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>

                            <b-col sm="3">
                              <label for="ccnumber">Penyetuju
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>

                            <b-col sm="3">
                              <label for="ccnumber">Diterima Oleh
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                        </b-row>

                        <br>
                        <br>

                        <b-row>
                            <b-col sm="3">
                              <label for="ccnumber" v-if="this.JournalArray[0].JournalCash[0]">{{ this.JournalArray[0].JournalCash[0].RequestToPay }}
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>

                            <b-col sm="3">
                              <label for="ccnumber" v-if="this.JournalArray[0].JournalCash[0]">{{ this.JournalArray[0].JournalCash[0].Verification }}
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>

                            <b-col sm="3">
                              <label for="ccnumber" v-if="this.JournalArray[0].JournalCash[0]">{{ this.JournalArray[0].JournalCash[0].Agreement }}
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>

                            <b-col sm="3">
                              <label for="ccnumber">
                                 <!-- <b class="text-danger"> *</b> -->
                               </label>
                            </b-col>
                        </b-row>

                      </b-col>
                  </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import cTable from '@/views/base/Table.vue'
import apiJournal from '@/api/AKJournalApiService';
import apiJournalItem from '@/api/AKJournalItemApiService';

export default {
  components: {
    cTable
  },

  data() {
    return {
      loading:false,
      items: [],
      JournalArray : [],
      id: null,
      // totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      date1:null,
      date2:null,
      fields: [{
          key: 'No',
          label: 'No'
        },
        {
          key: 'AccountCode',
          label: 'Kode Akun'
        },
        {
          key: 'Name',
          label: 'Nama Akun'
        },
        {
          key: 'Debit',
          label: 'Debet'
        },
        {
          key: 'Credit',
          label: 'Kredit'
        },
        {
          key: 'Description',
          label: 'Catatan'
        }

      ],
    }
  },
  async created() {
    var id = this.$route.params.id;
    this.id = id ;
    console.log('id',id);
    await this.getAll()
    if(this.loading != true){
      this.printWindow()
    }
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
      // totalRows() {
      //   return this.items.length
      // },
    },
    // mounted() {
    //   // Set the initial number of items
    //   this.totalRows = this.items.length
    // },
  methods: {
    async getAll() {
      this.loading = true
      var Journal = await apiJournal.getOne(this.id)
      console.log('isi',Journal);
      this.JournalArray = Journal;
      console.log('JournalArray',this.JournalArray[0]);

      var counter = 1 ;
      var JournalItem = await apiJournalItem.getByJrnID(Journal[0].Jrn_ID)
      console.log("JournalItem", JournalItem);

      var totalDebit = 0
      var totalCredit = 0

      for (var i = 0; i < JournalItem.length; i++) {
        var LoopJournalItem = JournalItem[i]
        console.log('LoopJournalItem',LoopJournalItem);

        for (var s = 0; s < Journal.length; s++) {
          var LoopJournal = Journal[s]
          console.log("dddddddddddd",Journal[s]);
        }

      // console.log('JournalItem',JournalItem);
      LoopJournalItem.AccountCode = LoopJournalItem.AccountCode.replace(/ /g,'')
      LoopJournalItem.Name = LoopJournalItem.Account.Name
      LoopJournalItem.Description = LoopJournal.Description
      LoopJournalItem.No = counter++
      if (LoopJournalItem.IsDebet != true) {
        totalCredit += LoopJournalItem.ItemValue
        LoopJournalItem.Credit = this.formatCurrency(LoopJournalItem.ItemValue)
        LoopJournalItem.Debit = "0"
        this.items.push(LoopJournalItem)
      }else{
        totalDebit += LoopJournalItem.ItemValue
        LoopJournalItem.Debit = this.formatCurrency(LoopJournalItem.ItemValue)
        LoopJournalItem.Credit = "0"
        this.items.push(LoopJournalItem)
        }
      }
        this.items.push({AccountCode : "",Name : "Total",Credit : this.formatCurrency(totalCredit),Debit : this.formatCurrency(totalDebit)})
          this.loading = false
    },
    printWindow: function () {
	     window.print();
    }
  },

}
</script>
