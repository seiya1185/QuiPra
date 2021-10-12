<template>
  <header class="header">
    <div class="logo">
      <router-link to="/"
        ><img src="../assets/images/logo.png" alt="ロゴ"
      /></router-link>
    </div>
    <div class="menu">
      <div class="pc_menu">
        <router-link to="/">ご利用ガイド</router-link>
        <span @click="logout" v-if="authentication">ログアウト</span>
        <template v-if="!authentication">
          <router-link to="/register">アカウント作成</router-link>
          <router-link to="/login">ログイン</router-link>
        </template>
      </div>

      <!--hamburgerボタンー-->
      <div class="hamburger-btn">
        <bubble right>
          <router-link to="/" class="white">Home</router-link>
          <router-link to="/" class="white">User Guide</router-link>
          <span @click="logout" v-if="authentication" class="white">Logout</span>
          <template v-if="!authentication">
            <router-link to="/register" class="white">Account Creation</router-link>
            <router-link to="/login" class="white">Login</router-link>
          </template>
        </bubble>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeButton: false,
    };
  },
  computed: {
    authentication() {
      return this.$store.getters.authenticatedUser !== null;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};

window.addEventListener("scroll", () => {
  let header = document.querySelector(".header");
  header.classList.toggle("scroll-nav", window.scrollY > 0);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_header.scss";
@import "../assets/sass/layout/_grid_header.scss";

@include hamburger_menu;

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_header";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_header";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_header";
} ;

</style>
