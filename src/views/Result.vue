<template>
  <div class="result">
    <div class="result_content">
      <div class="result_screen">
        <ul class="result_number">
          <li>
            正解数 :
            <span class="red">
              {{ number.correctNumber }}
            </span>
          </li>
          <li>
            問題数 :
            <span>
              {{ problemStatementNumber.quizData.length }}
            </span>
          </li>
          <li>
            正解率 :
            <span class="blue">
              {{ Math.floor(correctRate) }}
            </span>
            ％
          </li>
        </ul>
      </div>
      <div class="chart_size">
        <chart :height="height" :width="width"></chart>
      </div>
      <transition name="buttons">
        <div class="option_button" v-if="buttonShow">
          <button @click="routerCreateQuiz">作成画面に戻る</button>
          <button @click="routerHome">ホームに戻る</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";
import router from "../router";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      number: this.$store.getters.correctNumber,
      problemStatementNumber: this.$store.getters.sentQuizData,
      height: window.innerHeight / 2.5,
      width: window.innerWidth / 2.5,
      buttonShow: false,
    };
  },
  created() {
    setTimeout(() => {
      this.buttonShow = true;
    }, 1000);
  },
  destroyed() {
    location.reload();
  },
  computed: {
    correctRate: function () {
      return (
        (this.number.correctNumber /
          this.problemStatementNumber.quizData.length) *
        100
      );
    },
  },
  methods: {
    routerCreateQuiz() {
      router.push("/create");
    },
    routerHome() {
      router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_result.scss";
@import "../assets/sass/layout/_grid_result.scss";

@include CommonButton;
@include QuizButton;

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_result";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_result";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_result";
} ;
</style>
