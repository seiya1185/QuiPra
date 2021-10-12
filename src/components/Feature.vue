<template>
  <section class="feature" id="feature">
    <div class="feature_heading">
      <h2>QuiPraで早押しに強くなる</h2>
      <p>「早押しクイズで強くなること」に特化した、QuiPraの３つのポイント</p>
    </div>
    <div class="feature_contents">
      <section class="feature_contents_part">
        <div class="part__number color1">
          <img class="number" src="../assets/images/green_number.png" alt="01" />
        </div>
        <div class="part__icon">
          <img
            class="icon"
            src="../assets/images/random.png"
            alt="ランダム出題モード"
          />
        </div>
        <div class="part__heading">
          <h3 class="heading">
            ランダム出題で繰り返し練習できる
            <br />
            <span class="emphasis">
              <span class="emphasis__quote">"</span>
              ランダム出題モード
              <span class="emphasis__quote">"</span>
            </span>
          </h3>
        </div>
        <div class="part__body">
          <p class="body">
            問題の登録順に出題する「登録順出題モード」もあります
          </p>
        </div>
      </section>

      <section class="feature_contents_part">
        <div class="part__number color2">
          <img class="number" src="../assets/images/yellow_number.png" alt="02" />
        </div>
        <div class="part__icon">
          <img
            class="icon"
            src="../assets/images/register.png"
            alt="押しポイント登録"
          />
        </div>
        <div class="part__heading">
          <h3 class="heading">
            ボタンを押したタイミングを記録する
            <br />
            <span class="emphasis">
              <span class="emphasis__quote">"</span>
              斜線 (/) 挿入機能
              <span class="emphasis__quote">"</span>
            </span>
          </h3>
        </div>
        <div class="part__body">
          <p class="body">
            ボタンを押したポイントで問題文に「/」が入ることで、押した箇所が可視化できます
          </p>
        </div>
      </section>

      <section class="feature_contents_part">
        <div class="part__number color3">
          <img class="number" src="../assets/images/red_number.png" alt="03" />
        </div>
        <div class="part__icon">
          <img
            class="icon"
            src="../assets/images/book.png"
            alt="クイズカテゴリー作成機能"
          />
        </div>
        <div class="part__heading">
          <h3 class="heading">
            好きに出題ジャンルを作れる
            <br />
            <span class="emphasis">
              <span class="emphasis__quote">"</span>
              クイズカテゴリー作成機能
              <span class="emphasis__quote">"</span>
            </span>
          </h3>
        </div>
        <div class="part__body">
          <p class="body">
            苦手な問題や分野などでジャンルを分けることができます
          </p>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: "Feature",
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_feature.scss";
@import "../assets/sass/layout/_grid_feature.scss";

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_feature";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_feature";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_feature";
} ;
</style>
