<template>
  <section class="login">
    <div class="form">
      <h1>ログイン</h1>
      <div class="form_input">
        <label for="email">メールアドレス</label>
        <input id="email" type="email" v-model="email" />
        <label for="password">パスワード</label>
        <input id="password" type="password" v-model="password" />
        <br />
        <div class="send_data">
          <button @click="login">ログイン</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_login.scss";
@import "../assets/sass/layout/_grid_login.scss";

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_login";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_login";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_login";
} ;
</style>
