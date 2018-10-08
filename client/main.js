const 
Vue = require('vue'),
VueRouter = require('vue-router');

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [ { path: '/', component: require("./components/loginHome.vue") },
    { path: '/register', component: require("./components/register.vue") },
    { path: '/timeline', component: require("./components/timeline.vue") },
    { path: '/profile', component: require("./components/Profile.vue")}
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