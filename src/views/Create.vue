<template>
  <div class="create" @click.self="notActive()">
    <div class="create_contents">
      <div class="create_heading">
        <button class="btn btn-border add_color" @click="openCreateScreen">
          <span>クイズを作成する</span>
        </button>
        <!-- <button class="btn btn-border color2" @click="openUpdateScreen">
          <span>クイズを編集する</span>
        </button> -->
        <button class="btn btn-border delete_color" @click="deleteQuiz">
          <span>クイズを削除する</span>
        </button>
        <button class="btn create-btn float" @click="backCategoryPage">
          <span>カテゴリーへ戻る</span
          ><font-awesome-icon icon="angle-double-right" class="icon" />
        </button>
      </div>

      <div class="create_table">
        <table>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">問題文</th>
              <th scope="col">答え</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="(post, rowIndex) in (posts, getItems)">
              <tr
                :key="rowIndex"
                :class="{ 'is-active': isActive(rowIndex) }"
                @click="
                  clickCell($event),
                    getPost(
                      post._delegate._document.data.value.mapValue.fields
                        .problemStatement.stringValue
                    )
                "
              >
                <td>{{ rowIndex + 1 }}</td>
                <td class="create_problemStatement">
                  {{
                    post._delegate._document.data.value.mapValue.fields
                      .problemStatement.stringValue | omittedText
                  }}
                </td>
                <td class="create_answer">
                  {{
                    post._delegate._document.data.value.mapValue.fields.answer
                      .stringValue | omittedAnswer
                  }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <paginate
        :page-count="getPageCount"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'＜'"
        :next-text="'＞'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>

    <div class="quiz-button">
      <button class="btn btn-c" @click="routerAskQuestions">
        <span>ランダムにクイズを出題！</span><br />ランダム出題モード
      </button>
      <button class="btn btn-d" @click="routerOrderQuestions">
        <span>作問順にクイズを出題！</span><br />作問順出題モード
      </button>
    </div>
  </div>
</template>

<script>
import router from "../router";
import firebase from "firebase/app";

export default {
  data() {
    return {
      problemStatement: "",
      answer: "",
      timestamp: "",
      posts: [],
      showContent: false,
      showUpdateContent: false,
      currentCell: {},
      gettingDoc: "",
      parPage: 6,
      currentPage: 1,
      sentDocId: this.$store.getters.selectedDocId,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userId = user.uid;
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .collection("categories")
          .doc(this.sentDocId.DocId)
          .collection("quizCollection")
          .orderBy("createdAt", "asc");

        docRef
          .get()
          .then((querySnapshot) => {
            this.posts = querySnapshot.docs;
            this.$store.dispatch("sendQuizData", {
              quizData: this.posts,
            });
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        // ...
      } else {
        console.log("No user");
        // User is signed out
        // ...
      }
    });
  },
  filters: {
    omittedText(text) {
      // 38文字目以降は"…"
      return text.length > 25 ? text.slice(0, 25) + "…" : text;
    },
    omittedAnswer(text) {
      // 38文字目以降は"…"
      return text.length > 8 ? text.slice(0, 8) + "…" : text;
    },
  },
  computed: {
    getItems: function () {
      let current = this.currentPage * this.parPage;
      let start = current - this.parPage;
      return this.posts.slice(start, current);
    },
    getPageCount: function () {
      return Math.ceil(this.posts.length / this.parPage);
    },
  },
  methods: {
    openCreateScreen() {
      this.$store.dispatch("openCreateScreen");
    },
    openUpdateScreen() {
      if (this.gettingDoc.id) {
        this.$store.dispatch("sendUpdateDocId", {
          QuizDocId: this.gettingDoc.id,
        });
      } else {
        alert("更新するクイズを選択してください");
      }
    },
    closeUpdateModal() {
      this.showUpdateContent = false;
    },
    deleteQuiz() {
      if (this.gettingDoc.id) {
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
              .doc(this.gettingDoc.id);

            docRef
              .delete()
              .then(() => {
                console.log("Document successfully deleted!");
                location.reload();
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
      } else {
        alert("削除するクイズを選択してください");
      }
    },
    clickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
      return (this.currentCell = this.gettingDoc = "");
    },
    clickCell(event) {
      const cell = event.target.parentNode;

      this.currentCell = {
        xxxpostId: cell.rowIndex - 1,
      };
    },
    isActive(rowIndex) {
      return this.currentCell.xxxpostId == rowIndex;
    },
    notActive() {
      if (this.currentCell && this.gettingDoc) {
        return (this.currentCell = this.gettingDoc = "");
      }
    },
    getPost(gettingPost) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          for (const post of this.posts) {
            const currentPost =
              post._delegate._document.data.value.mapValue.fields
                .problemStatement.stringValue;

            if (currentPost == gettingPost) {
              const userId = user.uid;

              const docRef = firebase
                .firestore()
                .collection("users")
                .doc(userId)
                .collection("categories")
                .doc(this.sentDocId.DocId)
                .collection("quizCollection")
                .doc(post.id);

              docRef
                .get()
                .then((doc) => {
                  if (doc.exists) {
                    this.gettingDoc = doc;
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
                })
                .catch((error) => {
                  console.log("Error getting document:", error);
                });
            }
          }
        } else {
          console.log("No user");
          // User is signed out
          // ...
        }
      });
    },
    backCategoryPage() {
      router.push("/category");
    },
    routerAskQuestions() {
      router.push("/randomAskQuestions");
    },
    routerOrderQuestions() {
      router.push("/orderAskQuestions");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_create.scss";
@import "../assets/sass/layout/_grid_create.scss";

@include CommonButton;
@include dataButton;
@include createGoButton;
@include randomQuiz-button;
@include orderQuiz-button;

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_create";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_create";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_create";
} ;
</style>
