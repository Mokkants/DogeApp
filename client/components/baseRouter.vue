<template>
    <div>
        <login v-if="user === null && !onRegister" v-on:register="register"></login>
        <register v-if="user === null && onRegister" v-on:back="back"></register>
        <home v-if="user !== null"></home>
    </div>
</template>

<script>

import Login from './Login.vue'
import Home from './Home.vue'
import Register from './Register.vue'

export default{
    name:"BaseRouter",
    data(){
        return{
            onRegister : false
        }
    },
    components:{
        'login':Login,
        'home':Home,
        "register":Register
    },
    computed: {
        user () {
        return this.$store.state.userInstance;
        }
    },
    methods:{
        register:function(){
            this.onRegister=true;
        },
        back:function(){
            this.onRegister=false;
        }
    }
}
</script>


<style scoped>

</style>