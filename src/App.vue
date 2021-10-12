<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/HeaderPart.vue";
import Footer from "./components/FooterPart.vue";
import firebase from "firebase";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("login");
      } else {
        console.log("logout");
      }
    });
  },
};
</script>

<style scoped lang="scss">
.bm-burger-button {
    position: fixed;
    width: 30px;
    height: 28px;
    left: 36px;
    top: 36px;
    cursor: pointer;
}

.bm-menu {
    background-color: #fffce4;
}
</style>
