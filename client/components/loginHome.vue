
<template>
    <div id="profile">
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="form-group col-sm-6">
                <form class="form-horizontal"> 
                    <input type="username" class="form-control" id="inputUsername" placeholder="Username" v-model="User.username"> 
                </form>
            </div>
            <div class="col-sm-3"></div>
        </div>
        <div class ="row">
            <div class="form-group col-sm-12" >
                <button type="button" class="btn btn-default" @click="authenticate">Sign in</button>
            </div>
        </div>
        <div class="row" style="margin-top:20px">
            <div class="col-sm-12">
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
            User: {username:'' }
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