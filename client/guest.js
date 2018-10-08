const 
Vue = require('vue'),
VueRouter = require('vue-router'),
moment = require ('moment');

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        {path: '/login', component: require("./components/guestLogin.vue") },
        {path: '/register', component: require("./components/guestRegister.vue") },
    ]
});

  
let baseRouter = require("./components/guestBaserouter.vue");

new Vue({
    router: router,
    render: function (createElement){
        return createElement(baseRouter);
    },
    el:"#app"
});  