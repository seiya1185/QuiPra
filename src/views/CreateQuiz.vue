<template>
  <section class="createQuiz">
    <div class="createQuiz_content">
      <div class="create_problemStatement">
        <label for="problemStatement">問題文</label>
        <textarea
          id="problemStatement"
          cols="30"
          rows="10"
          v-model="problemStatement"
          maxlength="220"
        ></textarea>
      </div>

      <!-- クイズを更新するためのフォーム -->
      <!-- <textarea
          id="problemStatement"
          cols="30"
          rows="10"
          v-model="this.updateProblemStatement"
          v-if="this.updateProblemStatement"
        ></textarea> -->

      <div class="create_answer">
        <label for="answer">答え</label>
        <input
          id="answer"
          type="text"
          v-model="answer"
          @change="createChoices"
          @input="handleNameInput"
          maxlength="19"
        />
      </div>

      <!-- クイズを更新するためのフォーム -->
      <!-- <input
          id="answer"
          type="text"
          v-model="this.updateAnswer"
          v-if="this.updateAnswer"
        /> -->

      <div class="create_option">
        <label>選択肢</label>
        <div class="selected-items">
          <button class="add_button" @click="openAddUnshiftModal">+</button>
          <template v-for="(letter, index) in this.splitAnswer">
            <button
              @click="openModal(), clickOption(letter), (currentId = index + 1)"
              class="selected-item"
              :key="index"
            >
              <p>{{ letter }}</p>
            </button>
          </template>
          <button class="add_button" @click="openAddPushModal">+</button>
        </div>
      </div>

      <!-- 更新をするための選択肢 -->
      <!-- <div class="selected-items" v-if="this.updateSplitAnswer">
          <template v-for="(letter, index) in this.updateSplitAnswer">
            <button
              @click="
                openModal(),
                  clickOption(letter.stringValue),
                  (currentId = index)
              "
              class="selected-item"
              :key="index"
            >
              <p>{{ letter.stringValue }}</p>
            </button>
          </template>
        </div> -->

      <div class="create_button">
        <button @click="createQuiz">問題を作る</button>
      </div>

      <!-- クイズを更新するためのボタン -->
      <!-- <button @click="updateQuiz" v-if="this.updateSplitAnswer">
          問題を更新する
        </button> -->
    </div>

    <div id="overlay" v-show="showContent">
      <div id="modal_content">
        <div class="change_option">
          <div class="correct_option">
            <label for="answer1">答えの選択肢</label>
            <input
              id="answer1"
              type="text"
              :value="this.currentLetter"
              maxlength="1"
            />
          </div>

          <div class="error_option">
            <label>間違いの選択肢</label>
            <input
              type="text"
              v-model="errorOptions[currentId][0]"
              maxlength="1"
            />
            <input
              type="text"
              v-model="errorOptions[currentId][1]"
              maxlength="1"
              class="margin"
            />
            <input
              type="text"
              v-model="errorOptions[currentId][2]"
              maxlength="1"
            />
          </div>
          <button @click="optionDelete">削除する</button>
          <button @click="closeModal">閉じる</button>
        </div>
      </div>
    </div>

    <!-- 選択肢を先頭に追加するモーダル -->
    <div id="overlay" v-show="showAddUnshiftContent">
      <div id="modal_content">
        <div class="add_option">
          <div class="correct_option">
            <label for="addAnswer1">答えの選択肢</label>
            <input
              id="addAnswer1"
              type="text"
              v-model="addAnswer"
              maxlength="1"
            />
          </div>

          <div class="error_option">
            <label>間違いの選択肢</label>
            <input type="text" v-model="addErrorOption[0]" maxlength="1" />
            <input
              type="text"
              v-model="addErrorOption[1]"
              maxlength="1"
              class="margin"
            />
            <input type="text" v-model="addErrorOption[2]" maxlength="1" />
          </div>
          <br />
          <button @click="optionAddUnshift">追加する</button>
          <button @click="closeAddUnshiftModal">閉じる</button>
        </div>
      </div>
    </div>

    <!-- 選択肢を後方に追加するモーダル -->
    <div id="overlay" v-show="showAddPushContent">
      <div id="modal_content">
        <div class="add_option">
          <div class="correct_option">
            <label for="addAnswer1">答えの選択肢</label>
            <input
              id="addAnswer1"
              type="text"
              v-model="addAnswer"
              maxlength="1"
            />
          </div>

          <div class="error_option">
            <label>間違いの選択肢</label>
            <input type="text" v-model="addErrorOption[0]" maxlength="1" />
            <input
              type="text"
              v-model="addErrorOption[1]"
              maxlength="1"
              class="margin"
            />
            <input type="text" v-model="addErrorOption[2]" maxlength="1" />
          </div>
          <br />
          <button @click="optionAddPush">追加する</button>
          <button @click="closeAddPushModal">閉じる</button>
        </div>
      </div>
    </div>

    <!-- 更新するクイズ 選択肢編集用のモーダル -->
    <!-- <div id="overlay" v-show="showContent" v-if="this.updateErrorOptions">
      <div id="modal_content">
        <div class="close" @click="closeModal">✗</div>
        <div>
          <label for="answer1">答え</label>
          <input
            id="answer1"
            type="text"
            :value="this.currentLetter"
            maxlength="1"
          />

          <label>間違いの選択肢</label>
          <template>
            <input
              type="text"
              :value="
                this.updateErrorOptions[this.currentId + 1].arrayValue.values[0]
                  .stringValue
              "
              maxlength="1"
            />
            <input
              type="text"
              :value="
                this.updateErrorOptions[this.currentId + 1].arrayValue.values[1]
                  .stringValue
              "
              maxlength="1"
            />
            <input
              type="text"
              :value="
                this.updateErrorOptions[this.currentId + 1].arrayValue.values[2]
                  .stringValue
              "
              maxlength="1"
            />
          </template>
          <button @click="closeModal">閉じる</button>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import router from "../router";
import firebase from "firebase/app";
import * as AutoKana from "vanilla-autokana";
let autokana;

export default {
  name: "createQuiz",
  data() {
    return {
      problemStatement: "",
      answer: "",
      furigana: "",
      addAnswer: "",
      addErrorOption: [],
      history: [],
      splitAnswer: [],
      currentOption: {},
      currentLetter: {},
      errorOptions: [[]],
      currentId: 0,
      showContent: false,
      showAddUnshiftContent: false,
      showAddPushContent: false,
      sentDocId: this.$store.getters.selectedDocId,
      sentQuizDocId: this.$store.getters.selectedQuizDocId,
      hiragana:
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ",
      katakana:
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ",
      youonSokuon: "っゃゅょぁぃぅぇぉ",
      kanaYouonSokuon: "ッャュョァィゥェォ",
      uppercaseEnglish: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      englishLowercase: "abcdefghijklmnopqrstuvwxyz",
      number: 1234567890,
    };
  },
  mounted() {
    autokana = AutoKana.bind("#answer");
  },
  computed: {
    // ネストされた配列はfirestoreのフィールドに追加できないので、オブジェクトに変換する
    nestedArray: function () {
      const object = {};
      for (let i = 0; i < this.errorOptions.length; i++) {
        object[i] = this.errorOptions[i];
      }
      return object;
    },
    // updateNestedArray: function () {
    //   const object = {};
    //   for (let i = 0; i < this.updateErrorOptions.length; i++) {
    //     object[i] = this.updateErrorOptions[i];
    //   }
    //   return object;
    // },
    // updateOption: function() {
    //   return this.updateErrorOptions[this.currentId + 1].arrayValue.values
    // },
  },
  methods: {
    openModal() {
      this.showContent = true;
    },
    closeModal() {
      this.showContent = false;
    },
    openAddPushModal() {
      this.showAddPushContent = true;
      this.addAnswer = "";
      this.addErrorOption = [];
    },
    closeAddPushModal() {
      this.showAddPushContent = false;
    },
    openAddUnshiftModal() {
      this.showAddUnshiftContent = true;
      this.addAnswer = "";
      this.addErrorOption = [];
    },
    closeAddUnshiftModal() {
      this.showAddUnshiftContent = false;
    },
    handleNameInput() {
      this.furigana = autokana.getFurigana();
    },
    optionAddUnshift() {
      this.splitAnswer.unshift(this.addAnswer);
      this.errorOptions.unshift(this.addErrorOption);
      this.showAddUnshiftContent = false;
    },
    optionAddPush() {
      this.splitAnswer.push(this.addAnswer);
      this.errorOptions.push(this.addErrorOption);
      this.showAddPushContent = false;
    },
    optionDelete() {
      this.splitAnswer.splice(this.currentId - 1, 1);
      this.errorOptions.splice(this.currentId, 1);
      this.currentId = 0;
      this.showContent = false;
    },
    createQuiz() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // ...

          const userId = user.uid;
          const docRef = firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("categories")
            .doc(this.sentDocId.DocId)
            .collection("quizCollection")
            .doc();
          const timestamp = firebase.firestore.Timestamp.fromDate(new Date());

          const saveData = {
            problemStatement: this.problemStatement,
            answer: this.answer,
            splitAnswer: this.splitAnswer,
            errorOption: this.nestedArray,
            createdAt: timestamp,
          };

          docRef
            .set(saveData)
            .then(() => {
              router.push("/create");
            })
            .catch((error) => {
              // エラー発生時の処理
              console.error("Error adding document: ", error);
            });
        } else {
          console.log("No user");
          // User is signed out
          // ...
        }
      });
    },
    // updateQuiz() {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       // ...
    //       const docRef = firebase
    //         .firestore()
    //         .collection("categories")
    //         .doc(this.sentDocId.DocId)
    //         .collection("quizCollection")
    //         .doc(this.sentQuizDocId.QuizDocId);
    //       const saveData = {
    //         problemStatement: this.updateProblemStatement,
    //         answer: this.updateAnswer,
    //         splitAnswer: this.updateSplitAnswer,
    //         errorOption: this.updateNestedArray,
    //       };

    //       docRef
    //         .update(saveData)
    //         .then(() => {
    //           router.push("/create");
    //         })
    //         .catch((error) => {
    //           // エラー発生時の処理
    //           console.error("Error adding document: ", error);
    //         });
    //     } else {
    //       console.log("No user");
    //       // User is signed out
    //       // ...
    //     }
    //   });
    // },
    createChoices() {
      this.answer = this.answer.replace(/\s+/g, ""); //文章の前後・文中の空欄を消去する
      if (
        this.answer.match(
          /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu
        )
      ) {
        this.splitAnswer = this.furigana.split(""); //漢字だったらふりがなデータから、１文字ずつ分割して配列に代入
      } else {
        this.splitAnswer = this.answer.split(""); //漢字がなければそのまま答えを１文字ずつ分割して配列に代入
      }
      const symbolDelete = this.splitAnswer.filter(
        //記号を配列の中に含めない
        (item) =>
          item.match(
            /[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~！”＃＄％＆’（）＝〜｜￥＾「＠」：；＿・。、｛｀｝＊＋＿？＞＜\s+]/g
          ) == null
      );

      this.splitAnswer = symbolDelete;

      this.currentId = 0; //初期化
      this.errorOptions = [[]]; //一度配列内を空にすることで、文字の削除と連動させる

      if (!this.answer) {
        this.splitAnswer = [];
        this.furigana = "";
      }

      for (const letter of this.splitAnswer) {
        // letter = ひらがなだったパターン
        if (
          letter.match(
            /^[\u{3042}\u{3044}\u{3046}\u{3048}\u{304A}-\u{3062}\u{3064}-\u{3082}\u{3084}\u{3086}\u{3088}-\u{3093}\u{309B}-\u{309E}ー]+$/mu
          )
        ) {
          let cl = this.hiragana.length;

          let errorOption1 = this.hiragana[Math.floor(Math.random() * cl)];
          let errorOption2 = this.hiragana[Math.floor(Math.random() * cl)];
          let errorOption3 = this.hiragana[Math.floor(Math.random() * cl)];

          if (letter == errorOption1) {
            errorOption1 = this.hiragana[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption2) {
            errorOption2 = this.hiragana[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption3) {
            errorOption3 = this.hiragana[Math.floor(Math.random() * cl)];
          }
          let errorOption = [errorOption1, errorOption2, errorOption3];
          this.errorOptions.push(errorOption);
        } else if (
          letter.match(
            /^[\u{30A2}\u{30A4}\u{30A6}\u{30A8}\u{30AA}-\u{30C2}\u{30C4}-\u{30E2}\u{30E4}\u{30E6}\u{30E8}-\u{30F4}]+$/mu
          )
        ) {
          // letter = カタカナだったパターン
          let cl = this.katakana.length;

          let errorOption1 = this.katakana[Math.floor(Math.random() * cl)];
          let errorOption2 = this.katakana[Math.floor(Math.random() * cl)];
          let errorOption3 = this.katakana[Math.floor(Math.random() * cl)];

          if (letter == errorOption1) {
            errorOption1 = this.katakana[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption2) {
            errorOption2 = this.katakana[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption3) {
            errorOption3 = this.katakana[Math.floor(Math.random() * cl)];
          }
          let errorOption = [errorOption1, errorOption2, errorOption3];
          this.errorOptions.push(errorOption);
        } else if (letter.match(/[ぁぃぅぇぉっゃゅょ]/g)) {
          // letter = 促音か拗音だったパターン
          let cl = this.youonSokuon.length;

          let errorOption1 = this.youonSokuon[Math.floor(Math.random() * cl)];
          let errorOption2 = this.youonSokuon[Math.floor(Math.random() * cl)];
          let errorOption3 = this.youonSokuon[Math.floor(Math.random() * cl)];

          if (letter == errorOption1) {
            errorOption1 = this.youonSokuon[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption2) {
            errorOption2 = this.youonSokuon[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption3) {
            errorOption3 = this.youonSokuon[Math.floor(Math.random() * cl)];
          }
          let errorOption = [errorOption1, errorOption2, errorOption3];
          this.errorOptions.push(errorOption);
        } else if (letter.match(/[ッャュョァィゥェォ]/g)) {
          // letter = 促音か拗音だったパターン
          let cl = this.kanaYouonSokuon.length;

          let errorOption1 =
            this.kanaYouonSokuon[Math.floor(Math.random() * cl)];
          let errorOption2 =
            this.kanaYouonSokuon[Math.floor(Math.random() * cl)];
          let errorOption3 =
            this.kanaYouonSokuon[Math.floor(Math.random() * cl)];

          if (letter == errorOption1) {
            errorOption1 = this.kanaYouonSokuon[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption2) {
            errorOption2 = this.kanaYouonSokuon[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption3) {
            errorOption3 = this.kanaYouonSokuon[Math.floor(Math.random() * cl)];
          }
          let errorOption = [errorOption1, errorOption2, errorOption3];
          this.errorOptions.push(errorOption);
        } else if (letter.match(/^[A-Z]+$/)) {
          // letter = 大文字の英語だったパターン
          let cl = this.uppercaseEnglish.length;

          let errorOption1 =
            this.uppercaseEnglish[Math.floor(Math.random() * cl)];
          let errorOption2 =
            this.uppercaseEnglish[Math.floor(Math.random() * cl)];
          let errorOption3 =
            this.uppercaseEnglish[Math.floor(Math.random() * cl)];

          if (letter == errorOption1) {
            errorOption1 =
              this.uppercaseEnglish[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption2) {
            errorOption2 =
              this.uppercaseEnglish[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption3) {
            errorOption3 =
              this.uppercaseEnglish[Math.floor(Math.random() * cl)];
          }
          let errorOption = [errorOption1, errorOption2, errorOption3];
          this.errorOptions.push(errorOption);
        } else if (letter.match(/^[a-z]+$/)) {
          // letter = 小文字の英語だったパターン
          let cl = this.englishLowercase.length;

          let errorOption1 =
            this.englishLowercase[Math.floor(Math.random() * cl)];
          let errorOption2 =
            this.englishLowercase[Math.floor(Math.random() * cl)];
          let errorOption3 =
            this.englishLowercase[Math.floor(Math.random() * cl)];

          if (letter == errorOption1) {
            errorOption1 =
              this.englishLowercase[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption2) {
            errorOption2 =
              this.englishLowercase[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption3) {
            errorOption3 =
              this.englishLowercase[Math.floor(Math.random() * cl)];
          }
          let errorOption = [errorOption1, errorOption2, errorOption3];
          this.errorOptions.push(errorOption);
        } else if (letter.match(/[0-9０-９]+/u)) {
          // letter = 数字だったパターン
          let cl = this.number.length;

          let errorOption1 = this.number[Math.floor(Math.random() * cl)];
          let errorOption2 = this.number[Math.floor(Math.random() * cl)];
          let errorOption3 = this.number[Math.floor(Math.random() * cl)];

          if (letter == errorOption1) {
            errorOption1 = this.number[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption2) {
            errorOption2 = this.number[Math.floor(Math.random() * cl)];
          } else if (letter == errorOption3) {
            errorOption3 = this.number[Math.floor(Math.random() * cl)];
          }
          let errorOption = [errorOption1, errorOption2, errorOption3];
          this.errorOptions.push(errorOption);
        }
      }
    },
    clickOption(letter) {
      this.currentLetter = letter;
    },
    existsSameValue(a) {
      var s = new Set(a);
      return s.size != a.length;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_createQuiz.scss";
@import "../assets/sass/layout/_grid_createQuiz.scss";

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_createQuiz";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_createQuiz";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_createQuiz";
} ;
</style>
