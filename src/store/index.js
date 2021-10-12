import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState(
        {
            key: 'QuiPra',
            paths: [
                'authenticatedUser',
                'selectedDocId',
                'selectedQuizDocId',
                'correctNumber'
            ],
            storage: window.sessionStorage
        },
    )],
    state: {
        authenticatedUser: null,
        selectedDocId: '',
        selectedQuizDocId: '',
        sentQuizData: '',
        correctNumber: 0
    },
    getters: {
        authenticatedUser: state => state.authenticatedUser,
        selectedDocId: state => state.selectedDocId,
        selectedQuizDocId: state => state.selectedQuizDocId,
        sentQuizData: state => state.sentQuizData,
        correctNumber: state => state.correctNumber
    },
    mutations: {
        // updateIdToken(state, idToken)
        // {
        //     state.idToken = idToken;
        // },
        updateAuthenticatedUser(state, authenticatedUser)
        {
            state.authenticatedUser = authenticatedUser
        },
        updateSelectedDocId(state, selectedDocId)
        {
            state.selectedDocId = selectedDocId
        },
        updateSelectedQuizDocId(state, selectedQuizDocId)
        {
            state.selectedQuizDocId = selectedQuizDocId
        },
        sendingQuiz(state, sentQuizData)
        {
            state.sentQuizData = sentQuizData
        },
        sendingCorrectNumber(state, correctNumber)
        {
            state.correctNumber = correctNumber
        },
        RESET_VUEX_STATE(state)
        {
            Object.assign(state, JSON.parse(sessionStorage.getItem('initialState')));
        },
    },
    actions: {
        test({ commit }, data)
        {
            commit('updateQuiz', data)
        },
        sendDocId({ commit }, docId)
        {
            commit('updateSelectedDocId', docId)
            router.push("/create");
        },
        sendUpdateDocId({ commit }, quizDocId)
        {
            commit('updateSelectedQuizDocId', quizDocId)
            router.push("/createQuiz");
        },
        sendQuizData({ commit }, quizData)
        {
            commit('sendingQuiz', quizData)
        },
        sendCorrectNumber({ commit }, correctNumber)
        {
            commit('sendingCorrectNumber', correctNumber)
        },
        openCreateScreen({ commit })
        {
            commit('sendingQuiz', '')
            router.push("/createQuiz");
        },
        login({ commit }, authData)
        {
            firebase
                .auth()
                .signInWithEmailAndPassword(authData.email, authData.password)
                .then(
                    (userCredential) =>
                    {
                        const user = userCredential.user
                        alert("ログインに成功しました");
                        commit('updateAuthenticatedUser', user.uid)
                        router.push("/category");
                    },
                    (err) =>
                    {
                        alert(err.message);
                    }
                );
        },
        logout({ commit })
        {
            firebase.auth().signOut().then(() =>
            {
                commit('updateAuthenticatedUser', null)
                commit('RESET_VUEX_STATE');
            });
        },
        register({ commit }, authData)
        {
            firebase
                .auth()
                .createUserWithEmailAndPassword(authData.email, authData.password)
                .then((userCredential) =>
                {
                    const user = userCredential.user

                    const docRef = firebase.firestore().collection("users").doc(user.uid);
                    const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
                    const email = authData.email
                    const userId = user.uid;

                    const saveData = {
                        createdAt: createdAt,
                        email: email,
                        userId: userId,
                    };

                    docRef
                        .set(saveData)
                        .then(() =>
                        {
                            alert("ユーザーを作成しました！");
                            commit('updateAuthenticatedUser', user.uid)
                            router.push('/category')
                        })
                        .catch((error) =>
                        {
                            // エラー発生時の処理
                            console.error("Error adding document: ", error);
                        });
                })
                .catch((error) =>
                {
                    alert(error.message);
                });
        },
    }
})
