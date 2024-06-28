<style>
    .dropdown {
    position: relative;
    display: inline-block;
    }

    .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    margin-left: -95px;
    }

    .dropdown:hover .dropdown-content {
    display: block;
    }
</style>
<!-- <template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="static/user.png"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks" /> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file" /> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>
      <b-dropdown-item @click="logout()"><i class="fa fa-lock" /> Logout</b-dropdown-item>

    </template>
  </AppHeaderDropdown>
</template> -->

<template>
  <div class="dropdown">
    <img
      :src="globalEnv.server == 'pertamina' ? 'pkbl_online/static/user.png' : 'static/user.png'"
      width="40px"
      height="40px"
      class="img-avatar"
      alt="admin@bootstrapmaster.com" />
    <div class="dropdown-content">
      <b-dropdown-header tag="div" class="text-center"><strong>{{ username }}</strong></b-dropdown-header>
      <b-dropdown-item @click="logout()"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </div>
  </div>
</template>

<script>
// const env = require('../../config/remoteBuild')
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import apiWorkArea from '@/api/WorkArea1ApiService';
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
   async created() {
      var dataCabang = await apiWorkArea.getByCode(localStorage.cabang)
      var cabang = ""
      console.log("CABANG AWAL",dataCabang[0].Name)
      if(dataCabang[0]){
        if(dataCabang[0].Name){
          cabang = dataCabang[0].Name
        }
      }
      this.username =  localStorage.username + " - " + cabang
      console.log("CABANG AWAL 2",this.username)
  },
  methods:{
    logout(){
      localStorage.username = '';
      localStorage.cabang = '';
      localStorage.Navigation = '';
      localStorage.role = '';
      this.$router.push('/')
    }
  },
  data: () => {
    return { itemsCount: 42,
      username:null,
      }
  }
}
</script>
