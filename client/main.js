const 
Vue = require('vue'),
VueRouter = require('vue-router');

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [ { path: '/', component: require("./components/loginHome.vue") },
    { path: '/register', component: require("./components/register.vue") }
    ]
});

let baseRouter = require("./components/baseRouter.vue");

new Vue({
    router: router,
    render: function (createElement){
        return createElement(baseRouter);
    },
    el:"#app"
});  