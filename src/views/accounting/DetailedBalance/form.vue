<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <strong>Detail Saldo Awal</strong>
        </div>
        <b-card-text>
          <b-form v-if="show">
            <b-form inline>
              <label class="mr-sm-2" for="#">As end of fiscal year</label>
              <b-input class="mb-2 mb-sm-0" type="number" id="#" placeholder="2019" />
            </b-form></br></br>

            <div>
              <div class="form-group row" v-for="account in this.account">
                  <label for="inputPassword" class="col-sm-2 col-form-label">{{ account.Name }}</label>
                  <div class="col-sm-10">
                      <vue-numeric currency="" class="form-control" output-type="Number" v-model="account.Balance"  separator="." :empty-value="0" v-bind:precision="0"></vue-numeric>
                  </div>
                  <!-- <vue-numeric currency="" separator="." v-bind:precision="2" v-model="debitAccount.DebValue"></vue-numeric> -->
              </div>
              <br>
            </div>
          </b-form>
        </b-card-text>
        <div slot="footer">
            <b-button href="#" v-on:click="save()" variant="primary">Simpan</b-button>
            <router-link :to="{ name: 'Initial Balance' }">
              <b-button variant="danger">Batal</b-button>
            </router-link>

        </div>
      </b-card>
    </b-col>
  </b-row>
</div>
</template>

<script>
import apiAccount from '@/api/AKAccountApiService';
import apiAccountGroup from '@/api/AKAccountGroupApiService';
import VueNumeric from 'vue-numeric';

export default {
    name: 'DetailedBalance',
    components: { 'vue-numeric' : VueNumeric  },
  data() {
    return {
      form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
      selected: [], // Must be an array reference!
      show: true,

      tabIndex: [0, 0],
      account:{}
    }
  },
  created(){
    this.getAll()
  },
  methods: {
    async getAll() {
      this.account = await apiAccount.getMany(this.$route.params.AccountId)
      console.log(this.accountGroup)
    },
    async save() {
      var response = await apiAccount.update(this.account)
      this.showNotif(response,'Balance')
      this.$router.push('/accounting/initial-balance')
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

.scroll {
  background-color: #f1f1f1;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 25px;
  border-radius: 10px;
}
</style>
