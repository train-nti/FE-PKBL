<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
  created(){

  }
}

</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  .custom-notif{
    font-size:12;width:400;height:40px
  }
</style>
