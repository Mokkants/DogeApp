const 
Vue = require('vue'),
VueRouter = require('vue-router'),
moment = require ('moment');

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
<<<<<<< HEAD
        {path: '/profile', component: require('./components/Profile.vue')}
=======
        {path:'/schedule', component: require("./components/walkerSchedule.vue") },
        {path:'/profile', component: require("./components/Profile.vue")},
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
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