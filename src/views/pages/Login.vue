<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4" style="width:66%">
              <b-card-body>
                <b-form>
                  <h1>Masuk</h1>
                  <p class="text-muted">Masukkan Akun Anda</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="userModel.username" placeholder="Nama User" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" v-model="userModel.password" placeholder="Kata Sandi" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" v-on:click="login">Masuk</b-button>
                    </b-col>
                    <!-- <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Lupa Kata Sandi?</b-button>
                    </b-col> -->
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <notifications group="notif-response"
               position="top right"
               :speed="500"
               class="custom-notif"/>
  </div>
</template>

<script>
import users from '@/dummy/users'
import apiLogin from '@/api/LoginApiService'
import apiDynamic from '@/api/DynamicApiService';
export default {
  name: 'Login',
  data () {
    return {
      data : users,
      authenticated: false,
      userModel:{}
    }
  },
  created(){
    console.log("users",this.data);
  },
  methods:{
    // search(nameKey, myArray){
    //   for (var i=0; i < myArray.length; i++) {
    //     if (myArray[i].name === nameKey) {
    //         return myArray[i];
    //     }
    //   }
    // },
    // login(){
    //   let resultObject = this.search(this.userModel.username, this.data );
    //   console.log("true",resultObject);
    //   localStorage.username = resultObject.name;
    //   if (resultObject) {
    //     localStorage.cabang = resultObject.cabang
    //     this.$notify({
    //       group: 'notif-response',
    //       title: 'Operation Success',
    //       text: 'Berhasil Login',
    //       type: 'success'
    //     });
    //     this.$router.push('/dashboard')

    //   }else {
    //     this.$notify({
    //       group: 'notif-response',
    //       title: 'Operation Failed',
    //       text: 'Gagal Login',
    //       type: 'error'
    //     });
    //   }
    // }
   async login(){
      try {
        var dataLogin = await apiLogin.getLogin(this.userModel.username,this.userModel.password)
        let getCloseDate = await apiDynamic.getCount('AccountSummary/ClosedDate')
        console.log(getCloseDate);
        console.log("test", dataLogin.Status , dataLogin.Message == 'Operation success');
         if (dataLogin.Status) {
          if(dataLogin.Data.User){
            if(dataLogin.Data.User.WorkArea1.Code){
                localStorage.cabang = dataLogin.Data.User.WorkArea1.Code
            }
            if(dataLogin.Data.User.RoleNames ){
               localStorage.role = dataLogin.Data.User.RoleNames
             }
             localStorage.username = this.userModel.username
             localStorage.StartDate = getCloseDate.StartDate
             localStorage.EndDate = getCloseDate.EndDate

             var nav = []

             if (dataLogin.Data.Navigation) {

               // let userNav = this.getUnique(dataLogin.Data.Navigation,'Id')
               let userNav = dataLogin.Data.Navigation


               for (var i = 0; i < userNav.length; i++) {
                 console.log("----------------------",i);
                 var checkNav = nav.find(obj => obj.name == userNav[i].Title )
                 var indeks
                 let child =  userNav[i].Children
                 console.log(userNav[i]);
                 console.log(checkNav);
                 if (checkNav) {
                   indeks = checkNav.index
                 }else {
                   console.log("test");
                   indeks = nav.length == 0 ? 0 : nav.length
                   nav.push({
                     index : indeks,
                     name : userNav[i].Title,
                     url : userNav[i].RouteLink,
                     icon : userNav[i].Icon,
                     children : []
                   })
                 }
                   console.log(nav[indeks],indeks);
                   for (var j = 0; j < child.length; j++) {
                     var checkItem = nav[indeks].children.find(obj => obj.name == child[j].Title )
                     if (!checkItem) {
                       nav[indeks].children.push({
                         name : child[j].Title,
                         url : child[j].RouteLink,
                         icon : child[j].Icon
                       })
                     }
                   }
                   console.log(nav);
               }
               console.log(nav);
             }

             this.setSession('Navigation', JSON.stringify(nav))


          }


          this.$notify({
            group: 'notif-response',
            title: 'Operation Success',
            text: 'Berhasil Login',
            type: 'success'
          });
          this.$router.push('/dashboard')

        }else {
          this.$notify({
            group: 'notif-response',
            title: 'Operation Failed',
            text: 'User atau password',
            type: 'error'
          });
        }
      } catch (error) {
        this.$notify({
            group: 'notif-response',
            title: 'Operation Failed',
            text: error,
            type: 'error'
          });
      }

    }
  },
}
</script>
