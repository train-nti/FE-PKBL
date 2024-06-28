template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">

      <b-card>
        <div slot="header">
          <strong>Jurnal umum</strong>
        </div>
        <form @submit.prevent="SaveJournal">
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nomor Jurnal</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalModel.JournalNumber" type="text" id="#" placeholder="JKM01001" required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Tanggal Jurnal</label></b-col>
            <b-col><b-input class="mb-2 mb-sm-0" :disabled="id != null" v-model="JournalModel.JournalDate" type="date" id="#" placeholder="" required/></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Lembaga</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nama</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">No.Hp</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>

          <b-row>
            <b-col><label class="mr-sm-2" for="#">Kota</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nilai Uang Muka</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Sisa Uang Muka</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nilai Penyaluran</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nilai Operasional</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Nilai Pengembalian</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col><label class="mr-sm-2" for="#">Keterangan</label></b-col>
            <b-col></b-col>
          </b-row>
          <br>
          <big class="text-danger">&nbsp;&nbsp; {{ warning }} </big><br><br>


          <c-table :table-data="items" :fields="fields" caption="Journal Item" custom="newSlot" routeName="General Journal Form">
            <template slot-scope="{action}">
              <i class="fa fa-trash fa-md text-danger button-icon" @click="deleteItem(action.idItem)"></i>
            </template>
          </c-table>
          <!-- <b-table show-empty stacked="md" striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
            <template slot="action" slot-scope="data">
              <a href="#"><i class="fa fa-trash fa-md text-danger"></i></a>
            </template>
          </b-table>
          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
          </b-row> -->

          <b-row v-if="idJournalItem == null">
            <b-col md="6" class="my-1">
              <b-button variant="primary" @click="showModal" ref="btnShow">Tambah Item</b-button>
            </b-col>
          </b-row>

          <hr>
          <b-row v-if="id != null">
            <router-link :to="{ name: 'General Journal', params: {} }"><b-col><b-button type="submit" variant="danger">Kembali</b-button></b-col></router-link>
          </b-row>
          <b-row v-else>
            <b-col><b-button type="submit" variant="primary">Simpan</b-button></b-col>
          </b-row>
        </form>
      </b-card>

    </b-col>
  </b-row>
  <!-- Modal Component -->
  <b-modal id="modal1" title="Journal Item" hide-footer>
    <b-row>
      <b-col><label class="mr-sm-2" for="#">Akun</label></b-col>
      <!-- <b-col><b-form-select id="#" :options="account" required v-model="JournalItemModel.Account" /></b-col> -->
      <b-col>  <v-select :options="options" :reduce="name => name.code" label="name" required v-model="JournalItemModel.AccountCode" /></b-col>
    </b-row>
    <br>

    <b-row>
      <b-col><label class="mr-sm-2" for="#">Tipe Item</label></b-col>
      <b-col>
        <b-form-radio-group id="basicRadios" style="font-size:14.5 !important"
          :plain="true"
          :options="[
            {text: 'Debet',value: '1',style: 'margin-bottom:10px'},
            {text: 'Credit',value: '2',style: 'margin-bottom:10px'}
          ]"
          checked="1"
          stacked
          v-model="JournalItemModel.IsDebet"
          >
        </b-form-radio-group>
      </b-col>
    </b-row>
    <br>

    <b-row>
      <b-col><label class="mr-sm-2" for="#">Nilai Item</label></b-col>
      <b-col><b-input class="mb-2 mb-sm-0" type="number" id="#" placeholder="30.000.000" required v-model="JournalItemModel.ItemValue" /></b-col>
    </b-row>
    <br>

    <b-button variant="primary" block class="float-right" v-on:click="AddJournalItem()">Tambah Item</b-button>
  </b-modal>

</div>
</template>

<script>
  import cTable from '@/views/base/Table.vue'
  import apiAccount from '@/api/AKAccountAPIService';
  import apiJournal from '@/api/AKJournalAPIService';
  import apiJournalItem from '@/api/AKJournalItemAPIService';
  import BTable from '../../../../node_modules/bootstrap-vue/es/components/table/table'
  import vSelect from '../../../../node_modules/vue-select/dist/vue-select'
  import '../../../../node_modules/vue-select/dist/vue-select.css';
  import moment from '../../../../node_modules/moment/moment'
  import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  components:{'v-select': vSelect, cTable},
  data() {
    return {
      warning:'',
      idItem: -1,
      id:null,
      idJournalItem: null,
      JournalModel: {
        JournalNumber: "",
        JournalDate: "",
        Description: "",
      },
      options: [],
      JournalItemModel: {},
      account: [],
      show: true,
      selected: [], // Must be an array reference!
      show: true,
      tabIndex: [0, 0],
      items: [],
      fields: [
        {key: 'Account.Name', label: 'Akun', sortable: true},
        {key: 'debet', label: 'Debet'},
        {key: 'credit', label: 'Credit'},
        {key: 'action', label: '',},
      ],
      AccountCode: null,
    }
  },
  validations:{
    JournalModel: {
      JournalNumber: { required },
      JournalDate: { required },
      Description: { required }
    }
  },
  async created(){
    var id = this.$route.params.id;
    this.id = id
    if (this.id != null) {
      this.fields.splice(this.fields.length - 1,1)
    }
    var getall = await apiAccount.getAll()
    // console.log(getall);
    // this.loading = true
    this.options = [];
    for (var i = 0; i < getall.length; i++) {
      this.options.push({ code: getall[i].Code, name: getall[i].Name })
    }

    if (id != null) {

      var Journal = await apiJournal.getOne(id)
      this.JournalModel = Journal[0]
      var date = this.JournalModel.JournalDate = this.formatDate(this.JournalModel.JournalDate)

      var JournalItem = await apiJournalItem.getByJrnID(Journal[0].Jrn_ID)
      for (var i = 0; i < JournalItem.length; i++) {
        JournalItem[i].idItem = i;
        if (JournalItem[i].IsDebet != 1) {
          JournalItem[i].credit = JournalItem[i].ItemValue
        }else{
          JournalItem[i].debet = JournalItem[i].ItemValue
        }
      }



      this.items = JournalItem
      this.idJournalItem = JournalItem[0].Jrn_ID

      this.itemsArray = () => this.items

      console.log(this.items  );
      // console.log(this.id);
    }
  },
  methods: {
    async SaveJournal(){
      const isUpdate = !!this.$route.params.id;
      var totalDebet = 0
      var totalCredit = 0

      for (var i = 0; i < this.items.length; i++) {
        this.items[i]
        if (this.items[i].debet != null) {
          totalDebet += parseInt(this.items[i].debet)
        }else if (this.items[i].credit != null) {
          totalCredit += parseInt(this.items[i].credit)
        }
      }

      if (totalDebet != totalCredit) {
        this.warning = 'Debet dan Credit harus seimbang'
        return
      }

      if (isUpdate) {
        await apiJournal.update(this.$route.params.id, this.JournalModel);

        await apiJournalItem.update(this.$route.params.id, this.items);
      } else {
          if (this.items.length > 0) {
            await apiJournal.create(this.JournalModel);
            var JrnID = await apiJournal.getLast();
            await apiJournalItem.create(this.items, JrnID[0].Jrn_ID);
            this.$router.push('/accounting/general-journal')
            this.showNotif(response,'Journal Item')
          }
      }

    },
    async AddJournalItem(){
      var x = await apiAccount.getOne(this.JournalItemModel.AccountCode)

      console.log(this.JournalItemModel.AccountCode);
      if (this.JournalItemModel.IsDebet == "1") {
        var debet = this.JournalItemModel.ItemValue
      }else{
        var credit = this.JournalItemModel.ItemValue
      }
      this.items.push({Account:x[0], debet: debet, credit: credit, action:'1'})
      this.itemsArray = () => this.items
      var response = { Status:true , Message: 'Operation success' }
      this.showNotif(response,'Journal Item')
      console.log(this.items);

    },
    formatDate(value) {
        return moment(String(value)).format('YYYY-MM-DD')
    },
    showModal () {
      this.$root.$emit('bv::show::modal','modal1', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal','modal1', '#btnShow')
    },
    onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
    deleteItem(id){
      console.log(id);
      this.items.splice(id,1)

    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.full-width .card-header-tabs {
    margin-right: -21px;
    margin-left: -21px;
}

.full-width .nav-tabs .nav-item {
    margin-bottom: -1px;
    flex-grow: 1;
    text-align: center;
}
</style>
