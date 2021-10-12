<template>
  <footer>
    <div class="logo">
      <router-link to="/"
        ><img src="../assets/images/logo.png" alt="ロゴ"
      /></router-link>
    </div>
    <div class="footer_text">
      <div class="footer_text_use">
        <a href="">ご利用ガイド</a>
        <a href="">利用規約</a>
      </div>
      <div class="footer_text_copyright">
        <p>© 2021 Caster Co.Ltd. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_footer.scss";
@import "../assets/sass/layout/_grid_footer.scss";

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_footer";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_footer";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_footer";
} ;
</style>
