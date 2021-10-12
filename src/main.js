import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from '@firebase/app';
import Paginate from 'vuejs-paginate'

import { Bubble } from 'vue-burger-menu'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('paginate', Paginate)
Vue.component('bubble', Bubble);

require('@/assets/sass/main.scss');

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDtjM11oo33iFf28GxB7hBH8Gu1rHX7H4E",
  authDomain: "quipra-91b04.firebaseapp.com",
  databaseURL: "https://quipra-91b04-default-rtdb.firebaseio.com",
  projectId: "quipra-91b04",
  storageBucket: "quipra-91b04.appspot.com",
  messagingSenderId: "186662405058",
  appId: "1:186662405058:web:44e045806d8971eb9c0c5b",
  measurementId: "G-XT4LMG09KT"
};

if (!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}

router.beforeEach((to, from, next) =>
{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth)
  {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user)
    {
      if (user)
      {
        next()
      } else
      {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else
  {
    next() // next() を常に呼び出すようにしてください!
  }
})


// store.dispatch('autoLogin').then(() => {
new Vue({
  router,
  store,
  render: h => h(App),
  created()
  {
    // created時に初期StateをlocalStorageに保存しておく。
    sessionStorage.setItem('initialState', JSON.stringify(this.$store.state.authenticatedUser));
  },
}).$mount('#app');
// });
