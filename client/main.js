const 
Vue = require('vue'),
VueRouter = require('vue-router');
Vuex = require('vuex');
VuexPersistence = require('vuex-persist').VuexPersistence;

Vue.use(VueRouter);
Vue.use(Vuex);

let router = new VueRouter({
    routes: [ 
    { path: '/', component: require("./components/timeline.vue") },
    { path: '/profile', component: require("./components/Profile.vue")}
    ]
});

const vuexLocalStorage = new VuexPersistence({
    storage: window.localStorage
});

const store = new Vuex.Store({
    state: {
        userInstance : null
    },
    mutations: {
        login (state, user) {
        // mutate state
        state.userInstance = user;
        },
        logout(state){
            state.userInstance = null;
        }
    },
    plugins: [vuexLocalStorage.plugin]
});

let baseRouter = require("./components/baseRouter.vue");


new Vue({
    router: router,
    store,
    render: function (createElement){
        return createElement(baseRouter);
    },
    el:"#app"
});  