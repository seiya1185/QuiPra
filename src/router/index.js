import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 必要に応じてコンポーネントが遅延して読み込まれるようになる。
function loadView(view)
{
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/', component: loadView('TopPage'), name: 'TopPage'
    },
    {
      path: '/register', component: loadView('Register'), name: 'register',
    },
    {
      path: '/login', component: loadView('Login'), name: 'login',
    },
    {
      path: '/category', component: loadView('Category'), name: 'category',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create', component: loadView('Create'), name: 'create',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createQuiz', component: loadView('CreateQuiz'), name: 'createQuiz',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/randomAskQuestions', component: loadView('RandomAskQuestions'), name: 'randomAskQuestions',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orderAskQuestions', component: loadView('OrderAskQuestions'), name: 'orderAskQuestions',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/result', component: loadView('Result'), name: 'result',
      meta: {
        requiresAuth: true
      }
    }
  ]
});
