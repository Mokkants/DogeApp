<template>
    <div>
        <input v-model = "username" placeholder = "username" v-on:keyup.enter="submit">
    </div>
</template>

<script>
moment = require('moment'),
_ = require('underline'),
axios = require('axios');

module.exports = {
    name: "Guest Login",
    data(){
        username
    },
    methods:{
        submit: function(){
            axios.post('/api/login/authenticate', {
                username: this.username
            })
            .then(response => {
                if(response.status === 200){
                    window.location.href = "../main.html";
                }
                else if (response.status === 401){
                    console.log("unauthorized");
                }
            })
        }
    }
}

</script>

