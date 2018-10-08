<template>
    <div>
        <div class="row">
        <div class ="col-sm-4"></div>
        <div class="col-sm-4" align="center"><img src="resources/images/dog.jpg"></div>
        <div class="col-sm-4"></div>
        </div>
        
        <div class="row">
            <div class="col-sm-4"></div>
            <div class="form-group col-sm-4">
                    <form class="form-horizontal"> 
                        <input type="username" class="form-control" id="inputUsername" placeholder="Username" v-model="User.username"> 
                    </form>
            </div>
            <div class="col-sm-4"></div>
        </div>

        <div class ="row">
            <div class="form-group col-sm-12" align="center" >
                <button type="button" class="btn btn-outline-primary" id="signIn-button" @click="authenticate">Sign in</button>
            </div>
        </div>
        <div class="row" style="margin-top:20px">
            <div class="col-sm-12" align="center">
                <a v-on:click="register">Don't have an account yet? Register here!</a>
            </div>
        </div>   
    </div> 
</template>

<script>
const axios = require('axios');

export default {
    name:"loginHome",
    data(){
        return{
            showById:null,
            User: {username:'' },
        }
    },
    methods:{
        authenticate: function(){
            let loginUser = {
                username : this.User.username
            };
            axios({
            method: 'post',
            url: '/api/login/authenticate',
            data:  loginUser  
            })
            .then(response => {
                if(response.status === 200){
                    this.$store.commit('login',response.data.user);
                }
            })
            .catch(error =>{
                if(error.response){
                    if(error.response.status === 400){
                        alert("Incorrect username");
                    }
                }
                else{
                    console.log(error);
                }
            });
        },
        register:function(){
            this.$emit('register');
        }    
    }
};
</script>

<style>
#signIn-button{
        width: 20%;
margin-left: 40%;
margin-right: 40%;
}
</style>