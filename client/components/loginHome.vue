
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
                <router-link to="/register" exact>Don't have an account yet? Register here!</router-link>
            </div>
        </div>   
    </div> 
</template>

<script>
const axios = require('axios');

module.exports = {
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
                    alert("You are now logged in as "+loginUser.username);  
                    window.location = '#/timeline'                      
                }
               
            })
            .catch(error =>{
                if(error.response.status === 400){
                    alert("Incorrect username");
                }
                
            });
        },    
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