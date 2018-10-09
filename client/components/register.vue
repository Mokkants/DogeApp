<template>
    <div>
        <button type="button" class="close"><router-link to="/" exact>&times;</router-link></button>
        <form id="registerForm">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="form-group col-sm-6" method="createUser()" name="registerForm">
                    <input type="username" class="form-control" id="usernameInput" placeholder="Username" v-model="User.username">
                </div>
                <div class="col-sm-3"></div>
            </div>
            <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="form-group col-sm-6">
                        <input type="name" class="form-control" id="nameInput" placeholder="Name" v-model="User.name" >
                    </div>
                    <div class="col-sm-3"></div>
            </div>
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="form-group col-sm-6">
                    <input type="country" class="form-control" id="countryInput" placeholder="Country" v-model="User.country">
                </div>
                <div class="col-sm-3"></div>
            </div>
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="form-group col-sm-6">
                    <input type="city" class="form-control" id="cityInput" placeholder="City" v-model="User.city">
                </div>
                <div class="col-sm-3"></div>
            </div>
            <div class="radio">
                <label><input type="radio" name="optradio" value="false" v-model="User.isWalker">Dog Owner</label>
                <label><input type="radio" name="optradio" style="margin-left:30px" value="true" v-model="User.isWalker">Dog Walker</label>
            </div>
            <button type="button" class="btn btn-default" v-on:click="createUser">Register</button>
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