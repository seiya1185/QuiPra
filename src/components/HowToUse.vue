<template>
  <section class="use">
    <div class="use_heading">
      <h2>QuiPra 使い方の流れ</h2>
    </div>
    <div class="use_contents">
      <div class="use_content_part">
        <div class="use_content_part_text margin-right">
          <img src="../assets/images/one.png" alt="1番目" />
          <h3 class="margin-bottom">
            お好きな名前で、クイズカテゴリーとジャンルを作成しましょう。
          </h3>
          <div class="parent">
            <router-link
              to="/category"
              class="btn btn--red btn--radius btn--cubic category_button"
              >カテゴリー作成する<font-awesome-icon
                icon="angle-double-right"
                class="icon"
            /></router-link>
          </div>
        </div>
        <div class="use_content_part_gif arrow-left">
          <video controls>
            <source src="../assets/videos/first.mp4" />
          </video>
        </div>
      </div>

      <div class="use_content_part">
        <div class="use_content_part_gif arrow-right">
          <video controls>
            <source src="../assets/videos/second.mp4" />
          </video>
        </div>
        <div class="use_content_part_text margin-left">
          <img src="../assets/images/two.png" alt="2番目" />
          <h3>
            作問画面にいき、「問題文」と「答え」と「選択肢」を作成します。<br />
            選択肢は、追加と削除が自由におこなえます。
          </h3>
        </div>
      </div>

      <div class="use_content_part">
        <div class="use_content_part_text margin-right">
          <img src="../assets/images/three.png" alt="3番目" />
          <h3>
            「ランダム出題モード」か「登録順出題モード」のどちらかで早押しクイズをしましょう。
          </h3>
        </div>
        <div class="use_content_part_gif arrow-left">
          <video controls>
            <source src="../assets/videos/third.mp4" />
          </video>
        </div>
      </div>

      <div class="use_content_part">
        <div class="use_content_part_gif arrow-right">
          <video controls>
            <source src="../assets/videos/fourth.mp4" />
          </video>
        </div>
        <div class="use_content_part_text margin-left">
          <img src="../assets/images/four.png" alt="4番目" />
          <h3>
            回答ボタンはエンターキーか画面上のボタンをクリックしましょう。<br />
            現れた4つの選択肢から答えとなる文字を選んでください。
          </h3>
        </div>
      </div>

      <div class="use_contents">
        <div class="use_content_part">
          <div class="use_content_part_text margin-right">
            <img src="../assets/images/five.png" alt="5番目" />
            <h3>
              最後に結果画面が出て終了です。 全問正解目指して鍛錬しましょう。
            </h3>
          </div>
          <div class="use_content_part_gif arrow-left">
            <video controls>
            <source src="../assets/videos/fifth.mp4" />
          </video>
          </div>
        </div>
      </div>
    </div>

    <div class="button-text">
      <p>早速クイズを始めよう</p>
    </div>

    <router-link to="/category" class="btn-emergency">
      <span class="btn-emergency-bottom"></span>
      <span class="btn-emergency-top"><span>問題を作る</span></span>
    </router-link>
  </section>
</template>

<script>
export default {
  name: "HowToUse",
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_use.scss";
@import "../assets/sass/layout/_grid_use.scss";

@include CommonButton;
@include SolidButton;
@include QuizButton;

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_use";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_use";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_use";
} ;
</style>
