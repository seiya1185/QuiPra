<template>
  <div class="ask_questions">
    <div class="ask_questions_content">
      <audio :src="this.startAudio" autoplay></audio>
      <audio :src="this.wrongAudio" autoplay></audio>
      <audio :src="this.correctAudio" autoplay></audio>

      <transition name="correct">
        <div class="correct" v-if="correctShow">
          <img src="../assets/images/correct.png" alt="正解" />
        </div>
      </transition>
      <transition name="incorrect">
        <div class="in_correct" v-if="incorrectShow">
          <img src="../assets/images/incorrect.png" alt="不正解" />
        </div>
      </transition>

      <transition name="number_action">
        <quizNumber
          v-if="componentNumberShow"
          :quizNumber="quizNumber"
        ></quizNumber>
      </transition>

      <div class="quiz_content">
        <div class="time" v-if="timeShow">
          {{ formatTime }}
        </div>
        <div class="problem_statement">
          <p id="typewriter"></p>
        </div>
        <div class="answer" v-if="answerShow">
          <p>
            A.
            {{
              sentQuizData.quizData[arrayNumber]._delegate._document.data.value
                .mapValue.fields.answer.stringValue
            }}
          </p>
        </div>
      </div>

      <transition name="buttons">
        <div class="option_button" v-if="buttonShow">
          <button @click="routerCreateQuiz">クイズ作成画面に戻る</button>
          <button @click="nextProblemStatement">次の問題へ進む</button>
        </div>
      </transition>

      <transition name="buttons">
        <div class="option_button" v-show="resultScreen">
          <button @click="routerResult">結果画面へ進む</button>
        </div>
      </transition>

      <a class="btn-quiz" @click="pushButton">
        <span class="btn-emergency-bottom"></span>
        <span class="btn-emergency-top"><span>ボタン</span></span>
      </a>

      <div id="overlay" v-show="showContent">
        <div id="modal_content">
          <div class="select_answer">
            <div
              v-for="(letter, index) in selectedAnswerArray"
              :key="index"
              class="select_letter"
            >
              <p>{{ letter }}</p>
            </div>
          </div>
          <div class="select_option">
            <input
              id="option1"
              type="button"
              :value="shuffleSelectOptions[0][0]"
              @click="selectAnswer"
            />
            <input
              id="option2"
              type="button"
              :value="shuffleSelectOptions[0][1]"
              @click="selectAnswer"
            />
            <input
              id="option3"
              type="button"
              :value="shuffleSelectOptions[0][2]"
              @click="selectAnswer"
            />
            <input
              id="option4"
              type="button"
              :value="shuffleSelectOptions[0][3]"
              @click="selectAnswer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quizNumber from "../components/quizNumber.vue";
import router from "../router";

export default {
  components: {
    quizNumber,
  },
  data() {
    return {
      diagonalLine: "/",
      sentDocId: this.$store.getters.selectedDocId,
      sentQuizData: this.$store.getters.sentQuizData,
      shuffleQuizData: [],
      problemStatement: [],
      stopProblemStatement: "",
      remainingProblemStatement: "",
      splitAnswer: [],
      shuffleSelectOptions: [],
      selectedAnswer: "",
      selectedAnswerArray: [],
      quizNumber: 0,
      arrayNumber: 0,
      inArrayNumber: 1,
      correctNumber: 0,
      audio: new Audio(require("@/assets/sounds/quiz_button.mp3")),
      wrongAudio: new Audio(require("@/assets/sounds/quiz_wrong.mp3")),
      correctAudio: new Audio(require("@/assets/sounds/quiz_correct.mp3")),
      startAudio: new Audio(require("@/assets/sounds/quiz_start.mp3")),
      sec: 5,
      pushSec: 5,
      stopQuestion: null,
      timerObj: null,
      pushTimerObj: null,
      correctShow: false,
      incorrectShow: false,
      timeShow: false,
      pushTimeShow: false,
      answerShow: false,
      buttonShow: false,
      showContent: false,
      componentNumberShow: false,
      resultScreen: false,
      allInterval: [],
    };
  },
  created() {
    window.addEventListener("beforeunload", this.confirmSave);
  },
  beforeMount() {
    // クイズデータをシャッフルしてデータに代入
    this.shuffleQuizData = this.shuffle(this.sentQuizData.quizData);

    // 選択肢をシャッフルして代入
    let letter1 =
      this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
        .mapValue.fields.splitAnswer.arrayValue.values[this.inArrayNumber - 1]
        .stringValue;

    let letter2 =
      this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
        .mapValue.fields.errorOption.mapValue.fields[this.inArrayNumber]
        .arrayValue.values[0].stringValue;

    let letter3 =
      this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
        .mapValue.fields.errorOption.mapValue.fields[this.inArrayNumber]
        .arrayValue.values[1].stringValue;

    let letter4 =
      this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
        .mapValue.fields.errorOption.mapValue.fields[this.inArrayNumber]
        .arrayValue.values[2].stringValue;

    let selectOptions = [letter1, letter2, letter3, letter4];
    this.shuffleSelectOptions.push(this.shuffle(selectOptions));
    this.pushEnterButton();
  },
  mounted() {
    for (const post of this.sentQuizData.quizData) {
      const problemStatement = [
        post._delegate._document.data.value.mapValue.fields.problemStatement
          .stringValue,
      ];
      this.problemStatement.push(problemStatement);

      const splitAnswer = [
        post._delegate._document.data.value.mapValue.fields.splitAnswer
          .arrayValue.values,
      ];
      this.splitAnswer.push(splitAnswer);
    }
    if (this.allInterval.length > 0) {
      clearInterval(this.allInterval.shift());
    }
    this.startQuiz();
  },
  beforeDestroy() {
    if (this.allInterval.length > 0) {
      clearInterval(this.allInterval.shift());
    }
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.confirmSave);
  },
  methods: {
    // 効果音と共にクイズスタート！
    startQuiz() {
      this.componentQuestionsShow = false;
      this.flag = true;

      this.quizNumber++;
      this.startAudio.autoplay = true; // 音声読み込み時に自動再生を有効にする
      this.startAudio.play(); // 鳴らす
      this.componentNumberShow = true;
      setTimeout(() => {
        this.componentNumberShow = false;
      }, 1000);

      setTimeout(() => {
        this.typewriter({
          el: "#typewriter", //要素
          string: this.problemStatement[this.arrayNumber][0], //文字列
          speed: 110, //速度
        });
      }, 1500);
    },
    // 答えの選択肢をクリック！
    selectAnswer() {
      let e = e || window.event;
      let elem = e.target;
      let elemId = elem.id;

      const splitAnswer =
        this.splitAnswer[this.arrayNumber][0][this.inArrayNumber - 1]
          .stringValue;

      const splitAnswerLength = this.splitAnswer[this.arrayNumber][0].length;

      this.selectedAnswerArray.push(document.getElementById(elemId).value);
      if (splitAnswer == this.selectedAnswerArray[this.inArrayNumber - 1]) {
        // 選択した答えの数と、答えの文字数が一致すれば正解
        if (this.selectedAnswerArray.length == splitAnswerLength) {
          this.correctAnswer();
        } else {
          this.inArrayNumber++;
          // 選択肢が合っていればその都度その都度シャッフル
          this.insertShuffleOptions();
        }
      } else {
        // 間違えるとモーダルを閉じ、答えを表示し、時間も止めて無くす
        this.answerShow = true;
        this.timeShow = false;
        this.incorrectQuiz();
        this.wrongAnswer();
      }
    },
    correctAnswer() {
      this.showContent = false; // モーダル閉じる
      this.timeShow = false; // タイム表示を消す
      this.correctAudio.autoplay = true; // 音声読み込み時に自動再生を有効にする
      this.correctAudio.play(); // 正解音鳴らす
      // 正解数をカウント
      this.correctNumber++;
      // 正解画像（○）を表示する
      this.correctShow = true;
      // 残りの問題文を表示する
      if (this.allInterval.length > 0) {
        clearInterval(this.allInterval.shift());
      }
      this.typewriter({
        el: "#typewriter", //要素
        string: this.remainingProblemStatement, //残りの文字列
        speed: 30, //速度
      });
      // 正解画像（○）を消す
      setTimeout(() => {
        this.correctShow = false;
      }, 1000);
      // 答えを表示
      this.answerShow = true;
      if (this.problemStatement.length == this.quizNumber) {
        setTimeout(() => {
          this.resultScreen = true;
        }, 3000);
      } else {
        // ボタンも表示
        setTimeout(() => {
          this.buttonShow = true;
        }, 3000);
      }
    },
    incorrectQuiz() {
      this.showContent = false;
      this.wrongAudio.autoplay = true; // 音声読み込み時に自動再生を有効にする
      this.wrongAudio.play(); // 鳴らす
      this.incorrectShow = true;
      setTimeout(() => {
        this.incorrectShow = false;
      }, 1000);
      this.answerShow = true;
      if (this.problemStatement.length == this.quizNumber) {
        setTimeout(() => {
          this.resultScreen = true;
        }, 3000);
      } else {
        // ボタンも表示
        setTimeout(() => {
          this.buttonShow = true;
        }, 3000);
      }
    },
    nextProblemStatement() {
      // 次の問題への配列数を１プラス
      this.arrayNumber++;
      // 選んだ選択肢をリセット
      this.selectedAnswerArray = [];
      this.inArrayNumber = 1;
      this.shuffleSelectOptions = [];
      this.insertShuffleOptions();
      let el = document.querySelector("#typewriter");
      el.textContent = "";

      // 時間の秒数を戻す
      this.sec = 5;
      this.answerShow = false;
      this.buttonShow = false;
      this.startQuiz();
    },
    wrongAnswer() {
      let el = document.querySelector("#typewriter");
      if (el.textContent === this.problemStatement[this.arrayNumber][0]) {
        return;
      } else {
        this.typewriter({
          el: "#typewriter", //要素
          string: this.remainingProblemStatement, //文字列
          speed: 30, //速度
        });
      }
    },
    insertShuffleOptions() {
      this.shuffleSelectOptions = [];
      let letter1 =
        this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
          .mapValue.fields.splitAnswer.arrayValue.values[this.inArrayNumber - 1]
          .stringValue;

      let letter2 =
        this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
          .mapValue.fields.errorOption.mapValue.fields[this.inArrayNumber]
          .arrayValue.values[0].stringValue;

      let letter3 =
        this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
          .mapValue.fields.errorOption.mapValue.fields[this.inArrayNumber]
          .arrayValue.values[1].stringValue;

      let letter4 =
        this.sentQuizData.quizData[this.arrayNumber]._delegate._document.data.value
          .mapValue.fields.errorOption.mapValue.fields[this.inArrayNumber]
          .arrayValue.values[2].stringValue;

      let selectOptions = [letter1, letter2, letter3, letter4];
      this.shuffleSelectOptions.push(this.shuffle(selectOptions));
    },
    closeModal() {
      this.showContent = false;
    },
    typewriter(param) {
      let el = document.querySelector(param.el);
      let speed = param.speed;
      let string = param.string.split("");
      let count = -1;

      if (this.allInterval.length > 0) {
        clearInterval(this.allInterval.shift());
      }
      this.allInterval.push(
        (this.stopQuestion = setInterval(() => {
          if (count++ < param.string.length - 1) {
            el.textContent += string[count];
          } else {
            if (this.allInterval.length > 0) {
              clearInterval(this.allInterval.shift());
            }
            if (this.selectedAnswerArray[0]) {
              return;
            } else {
              this.timeShow = true;
              this.complete();
              this.start();
            }
          }
        }, speed))
      );
    },
    pushEnterButton() {
      document.body.addEventListener(
        "keypress",
        (event) => {
          if (event.key === "Enter") {
            this.showContent = true;
            if (this.allInterval.length > 0) {
              clearInterval(this.allInterval.shift());
            }
            this.complete();
            let el = document.querySelector("#typewriter");
            let string = this.problemStatement[this.arrayNumber][0];

            // 押した箇所までの問題文を格納
            this.stopProblemStatement = el.textContent;
            // 問題文から押した箇所までの問題文を除外することで、残りの問題文を格納
            this.remainingProblemStatement = string.replace(
              this.stopProblemStatement,
              ""
            );
            // 押した箇所に「/」を追記
            this.remainingProblemStatement = this.diagonalLine.concat(
              "",
              this.remainingProblemStatement
            );
            this.audio.play(); // 鳴らす
          }
        },
        { once: this.flag }
      );
    },
    pushButton() {
      let el = document.querySelector("#typewriter");
      let string = this.problemStatement[this.arrayNumber][0];

      this.showContent = true;
      if (this.allInterval.length > 0) {
        clearInterval(this.allInterval.shift());
      }
      this.complete();

      // 押した箇所までの問題文を格納
      this.stopProblemStatement = el.textContent;
      // 問題文から押した箇所までの問題文を除外することで、残りの問題文を格納
      this.remainingProblemStatement = string.replace(
        this.stopProblemStatement,
        ""
      );

      // 押した箇所に「/」を追記
      this.remainingProblemStatement = this.diagonalLine.concat(
        "",
        this.remainingProblemStatement
      );
      this.audio.play(); // 鳴らす
    },
    shuffle([...array]) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    count() {
      if (this.sec <= 0) {
        this.complete();
        this.timeShow = false;
        this.incorrectQuiz();
      } else {
        this.sec--;
      }
    },
    start() {
      let self = this;
      this.timerObj = setInterval(function () {
        self.count();
      }, 1000);
    },
    complete() {
      clearInterval(this.timerObj);
    },
    routerCreateQuiz() {
      if (this.allInterval.length > 0) {
        clearInterval(this.allInterval.shift());
      }
      router.push("/create");
    },
    routerResult() {
      const inCorrectNumber = this.problemStatement.length - this.correctNumber
      router.push("/result");
      this.$store.dispatch("sendCorrectNumber", {
        correctNumber: this.correctNumber,
        inCorrectNumber: inCorrectNumber
      });
    },
    confirmSave(event) {
      event.returnValue =
        "クイズデータが削除されてしまいます。よろしいですか？";
    },
  },
  computed: {
    formatTime: function () {
      let timeStrings = [this.sec.toString()].map(function (str) {
        if (str.length < 2) {
          return "0" + str;
        } else {
          return str;
        }
      });
      return timeStrings[0];
    },
    pushTime: function () {
      let puTimeStrings = [this.pushSec.toString()].map(function (str) {
        if (str.length < 2) {
          return "0" + str;
        } else {
          return str;
        }
      });
      return puTimeStrings[0];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_askQuestions.scss";
@import "../assets/sass/layout/_grid_askQuestions.scss";

@include CommonButton;
@include QuizButton;

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_askQuestions";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_askQuestions";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_askQuestions";
} ;
</style>
