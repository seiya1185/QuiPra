<template>
  <div class="category" @click.self="notActive()">
    <div class="category_contents">
      <div class="category_heading">
        <button class="btn btn-border add_color" @click="openModal">
          <span>カテゴリーを作成する</span>
        </button>
        <button class="btn btn-border edit_color" @click="openUpdateModal">
          <span>カテゴリーを編集する</span>
        </button>
        <button class="btn btn-border delete_color" @click="deleteCategory">
          <span>カテゴリーを削除する</span>
        </button>
        <button class="btn create-btn float" @click="goingCreatePage">
          <span>クイズを作成する</span
          ><font-awesome-icon icon="angle-double-right" class="icon" />
        </button>
      </div>

      <div class="category_table">
        <table>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">カテゴリー名</th>
              <th scope="col">ジャンル</th>
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
                      post._delegate._document.data.value.mapValue.fields.name
                        .stringValue
                    )
                "
              >
                <td>{{ rowIndex + 1 }}</td>
                <td class="category_name">
                  {{
                    post._delegate._document.data.value.mapValue.fields.name
                      .stringValue | omittedText
                  }}
                </td>
                <td class="category_genre">
                  {{
                    post._delegate._document.data.value.mapValue.fields.genre
                      .stringValue
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

    <!-- カテゴリー追加用のモーダル -->
    <div id="overlay" v-show="showContent">
      <div id="modal_content">
        <div class="close_modal" @click="closeModal">✕</div>
        <div class="add_form">
          <label for="name">カテゴリー名</label>
          <input
            id="name"
            type="text"
            v-model.trim="categoryName"
            maxlength="20"
          />
          <label for="genre">ジャンル</label>
          <select v-model="genre">
            <option v-for="genre in genres" :key="genre">
              {{ genre }}
            </option>
          </select>
          <br />
          <button @click="createCategory">作成する</button>
        </div>
      </div>
    </div>

    <!-- カテゴリーアップデート用のモーダル -->
    <div id="overlay" v-show="showUpdateContent">
      <div id="modal_content">
        <div class="close_modal" @click="closeUpdateModal">✕</div>
        <div class="update_form">
          <label for="nameUpdate">カテゴリー名</label>
          <input
            id="nameUpdate"
            type="text"
            v-model.trim="categoryName"
            maxlength="20"
          />
          <label for="genre">ジャンル</label>
          <select v-model="genre">
            <option v-for="genre in genres" :key="genre">
              {{ genre }}
            </option>
          </select>
          <br />
          <button @click="UpdateCategory">更新する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      categoryName: "",
      genres: [
        "ノンジャンル",
        "アニメ＆ゲーム",
        "スポーツ",
        "芸能",
        "文系",
        "理系",
        "社会",
        "苦手",
        "ライフスタイル",
        "鬼ムズ",
        "",
      ],
      genre: "",
      timestamp: "",
      posts: [],
      showContent: false,
      showUpdateContent: false,
      currentCell: {},
      gettingDoc: "",
      parPage: 8,
      currentPage: 1,
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
          .orderBy("createdAt", "asc");

        docRef
          .get()
          .then((querySnapshot) => {
            this.posts = querySnapshot.docs;
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
  filters: {
    omittedText(text) {
      // 38文字目以降は"…"
      return text.length > 9 ? text.slice(0, 9) + "…" : text;
    },
  },
  methods: {
    openModal() {
      this.showContent = true;
    },
    closeModal() {
      this.showContent = false;
    },
    openUpdateModal() {
      if (this.gettingDoc.id) {
        this.showUpdateContent = true;
      } else {
        alert("編集するカテゴリーを選択してください");
      }
    },
    closeUpdateModal() {
      this.showUpdateContent = false;
    },
    createCategory() {
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
            .doc();
          const timestamp = firebase.firestore.Timestamp.fromDate(new Date());

          const saveData = {
            name: this.categoryName,
            genre: this.genre,
            createdAt: timestamp,
          };

          docRef
            .set(saveData)
            .then(() => {
              this.closeModal();
              location.reload();
            })
            .catch((error) => {
              // エラー発生時の処理
              console.error("Error adding document: ", error);
            });
          this.categoryName = "";
          this.genre = "";
        } else {
          console.log("No user");
          // User is signed out
          // ...
        }
      });
    },
    UpdateCategory() {
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
            .doc(this.gettingDoc.id);
          const saveData = {
            name: this.categoryName,
            genre: this.genre,
          };

          docRef
            .update(saveData)
            .then(() => {
              this.closeUpdateModal();
              location.reload();
            })
            .catch((error) => {
              // エラー発生時の処理
              console.error("Error adding document: ", error);
            });
          this.categoryName = "";
          this.genre = "";
        } else {
          console.log("No user");
          // User is signed out
          // ...
        }
      });
    },
    deleteCategory() {
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
        alert("削除するカテゴリーを選択してください");
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
              post._delegate._document.data.value.mapValue.fields.name
                .stringValue;

            if (currentPost == gettingPost) {
              const userId = user.uid;

              const docRef = firebase
                .firestore()
                .collection("users")
                .doc(userId)
                .collection("categories")
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
    goingCreatePage() {
      if (this.gettingDoc.id) {
        this.$store.dispatch("sendDocId", {
          DocId: this.gettingDoc.id,
        });
      } else {
        alert("クイズを作成するカテゴリーを選択してください");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/prepends.scss";
@import "../assets/sass/themes/_default_category.scss";
@import "../assets/sass/layout/_grid_category.scss";

@include CommonButton;
@include dataButton;
@include createGoButton;

@include mq() {
  @import "../assets/sass/breakpoints/sp/_sp_category";
}

@include mq($breakpoint: tab) {
  @import "../assets/sass/breakpoints/tab/_tab_category";
}

@include mq($breakpoint: pc) {
  @import "../assets/sass/breakpoints/pc/_pc_category";
} ;
</style>
