<template>
  <section class="main">
    <p>branch</p>
    <div class="main_parts">
      <div class="main_text">
        <h1>自分で問題を作る。積み上げる。</h1>
        <img src="../assets/images/knowledge _Isometric.png" alt="知識を積み上げる" />
      </div>
      <div class="main_quiz">
        <h5 class="main_quiz_text1">
          登録した問題文が、そのまま早押しクイズに。
        </h5>
        <h5 class="main_quiz_text2">
          さっそく問題を作成して、早押しクイズをしましょう！
        </h5>
        <router-link to="category" class="btn-emergency">
          <span class="btn-emergency-bottom"></span>
          <span class="btn-emergency-top"><span>問題を作る</span></span>
        </router-link>
      </div>
      <div class="white_triangle"></div>
    </div>
    <div class="main_scroll">
      <a href="#feature">Scroll</a>
      <div class="white_triangle2"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Top",
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_top.scss";
@import "../assets/sass/layout/_grid_top.scss";

@include CommonButton;
@include QuizButton;
@include Scroll;

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_top";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_top";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_top";
} ;

</style>
