const 
Vue = require('vue'),
VueRouter = require('vue-router');
Vuex = require('vuex');
VuexPersistence = require('vuex-persist').VuexPersistence;
moment = require ('moment');

Vue.use(VueRouter);
Vue.use(Vuex);

let router = new VueRouter({
    routes: [ 
    { path: '/', component: require("./components/timeline.vue") },
    { path: '/profile', component: require("./components/Profile.vue")},
    { path: '/schedule', component: require("./components/Schedule.vue")},
    { path: '/dogs', component: require("./components/DogList.vue")},
    ]
});

//Vuex
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

//Filters
Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(String(value)).format('YYYY MMM D hh:mm')
    }
  });

Vue.filter('formatDay', function(value) {
  if (value) {
    return moment(String(value)).format('MMM D')
  }
});

Vue.filter('formatHour', function(value) {
  if (value) {
    return moment(String(value)).format('hh:mm')
  }
});
  
let app = require("./App.vue");

new Vue({
    router: router,
    store,
    render: function (createElement){
        return createElement(app);
    },
    el:"#app"
});  