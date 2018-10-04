const 
Vue = require('vue'),
VueRouter = require('vue-router'),
moment = require ('moment');

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        {path:'/schedule', component: require("./components/walkerSchedule.vue") },
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