<template>
  <section class="createAccount">
    <div class="validation">
      <p v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
      </p>
    </div>

    <div class="form">
      <h1>アカウント作成</h1>
      <div class="form_input">
        <label for="email">メールアドレス</label>
        <input id="email" type="email" name="email" v-model="email" />
        <label for="password">パスワード</label>
        <input id="password" type="password" name="password" v-model="password" />
      </div>
      <br />
      <div class="send_data">
        <button @click="register">アカウントを作成</button>
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
      errors: [],
    };
  },
  methods: {
    register(e) {
      this.errors = [];

      if (!this.email) {
        this.errors.push("メールアドレスを入力してください");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("無効なメールアドレスです");
      }

      if (!this.password) {
        this.errors.push("パスワードを入力してください");
      }

      if (!this.errors.length) {
        this.$store.dispatch("register", {
          email: this.email,
          password: this.password,
        });
        this.email = "";
        this.password = "";
      }

      e.preventDefault();
    },
    validEmail(email) {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_register.scss";
@import "../assets/sass/layout/_grid_register.scss";

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_register";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_register";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_register";
} ;
</style>
