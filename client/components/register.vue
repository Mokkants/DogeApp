<template>
    <div>
         <div class="row">
        <div class ="col-sm-4"></div>
        <div class="col-sm-4" align="center"><img src="resources/images/dog.jpg"></div>
        <div class="col-sm-4"></div>
        </div>
        
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6"><a href="/" class="previous">&laquo; Previous</a></div>
            <div class="col-sm-3"></div>
        </div>
        
        <form id="registerForm">
            <div class="row" style="margin-top:20px">
                <div class="col-sm-4"></div>
                <div class="form-group col-sm-4" method="createUser()" name="registerForm">
                    <input type="username" class="form-control" id="usernameInput" placeholder="Username" v-model="User.username">
                </div>
                <div class="col-sm-4"></div>
            </div>
            <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="form-group col-sm-4">
                        <input type="name" class="form-control" id="nameInput" placeholder="Name" v-model="User.name" >
                    </div>
                    <div class="col-sm-4"></div>
            </div>
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="form-group col-sm-4">
                    <input type="country" class="form-control" id="countryInput" placeholder="Country" v-model="User.country">
                </div>
                <div class="col-sm-4"></div>
            </div>
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="form-group col-sm-4">
                    <input type="city" class="form-control" id="cityInput" placeholder="City" v-model="User.city">
                </div>
                <div class="col-sm-4"></div>
            </div>
            <div class="row">
                <div class="radio col-sm-12" align="center">
                    <label><input type="radio" name="optradio" value="false" v-model="User.isWalker">Dog Owner</label>
                    <label><input type="radio" name="optradio" style="margin-left:30px" value="true" v-model="User.isWalker">Dog Walker</label>
            </div>
            </div>
            <div class="row">
                <div class="col-sm-12" align="center">
                    <button type="button" class="btn btn-default" v-on:click="createUser">Register</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
const axios = require('axios');

module.exports = {
    name:"Register",
    data(){
        return {
            showById:null,
            User: {username:'', name:'', country:'', city:'', isWalker:'' }
        };
    },
    methods:{
       createUser: function(){
           let newUser = {
               username : this.User.username,
               name : this.User.name,
               location:{
               country : this.User.country,
               city : this.User.city
               },
               isWalker : this.User.isWalker
           };
            axios({
                method: 'post',
                url: '/api/users',
                data: newUser    
            })
            .then( response => {
               if(response.status==201){
                alert('Your registration was succesful. Welcome to DogeApp,' + this.User.name);
                window.location = '/index.html';
               }    
            });
        }
    }
}
</script>