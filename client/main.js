const 
Vue = require('vue'),
VueRouter = require('vue-router'),
moment = require ('moment');

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [ { path: '/', component: require("./components/loginHome.vue") },
    { path: '/register', component: require("./components/register.vue") },
    { path: '/timeline', component: require("./components/timeline.vue") },
    { path: '/profile', component: require("./components/Profile.vue")}
    ]
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
  
let baseRouter = require("./components/baseRouter.vue");

new Vue({
    router: router,
    render: function (createElement){
        return createElement(baseRouter);
    },
    el:"#app"
});  