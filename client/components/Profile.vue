<template>
    <div class="row">
        <div class="col"></div>
            <div class="card m-3 col-sm-10">
                <div class="media p-3 mt-3 mb-3">
                    <div class="media-left col">
                        <img src="https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png" class="media-object" style="width:60px">
                    </div>
                    <div class="media-body col-sm-4" v-show="onEdit">
                        <h1 class="media-heading"> Name </h1>
                        <p> {{user.name}} </p>
                        <h2 class="media-heading"> City </h2>
                        <p> {{user.location.city}} </p>
<<<<<<< HEAD
                        <h3 class="media-heading"> Country </h3>
                        <p> {{user.location.country}} </p>
                        <h3 class="media-heading"> Address </h3>
                        <p> {{user.location.address}} </p>
                    </div>
                    <div class="media-body col-sm-4" v-show="!onEdit">
                        <h1 class="media-heading"> Name </h1>
                        <p> <input type = "text" v-model = "editData.name" placeholder="Enter your name"> </p>
                        <h2 class="media-heading"> City </h2>   
                        <p> <input type = "text" v-model= "editData.city" placeholder="Enter your city"> </p>
                        <h3 class="media-heading"> Country </h3>
                        <p> <input type = "text" v-model = "editData.country" placeholder="Enter your country"> </p>
                        <h4 class="media-heading"> Address </h4>
                        <p> <input type = "text" v-model = "editData.address" placeholder="Enter your address"> </p>
                        <p> <button class="btn" v-on:click="doneEdit">Done</button></p>
=======
                    </div>
                    <div class="media-body col-sm-4" v-show="!onEdit">
                        <h1 class="media-heading"> Name </h1>
                        <p> <input type = "text" v-model = "editedUser.name" placeholder="Enter your name"> </p>
                        <h2 class="media-heading"> City </h2>
                        <p> <input type = "text" v-model= "editedUser.city" placeholder="Enter your city"> </p>
                        <p> <button class="btn" v-on:click="editProfile">Done</button></p>
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
                    </div> 
                    <div class="media-right col">
                        <button type="button" class="btn" v-on:click="onEdit = !onEdit"> Edit </button>
                    </div>
                </div> 
            </div>
        <div class="col"></div>
    </div>
</template>

<script>
var axios = require('axios');
<<<<<<< HEAD
export default {
=======
var access = require('../../server/access-control');
_ = require('underscore');
module.exports = {
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
    name:"UserProfile",
    data(){
        return{
            showById:null,
            user: null,
<<<<<<< HEAD
            editedUser: null,
            editData:{
                name:'',
                city:'',
                country:'',
                address:'',
            },
            onEdit:true,
            id:'' //needs global variable
=======
            editedUser:{
                name:'',
                city:''
            },
            onEdit:true,
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
        }
    },
    methods: {
        getUser: function(){
<<<<<<< HEAD
            axios.get('/api/users/' + id)
=======
            axios.get('/api/users/5')
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
            .then(response => {
                if (response.status !== 200){
                    console.log("Wrong status code: " + response.status);
                }
                else{
                console.log(response.data);
                this.user = response.data;
<<<<<<< HEAD
                this.editedUser = this.user;
=======
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
                }
            })
            .catch(function (error){
                console.log(error);
            })
            .then(function(){
            });
        },
<<<<<<< HEAD
        doneEdit: function(){
            this.editedUser.name = this.editData.name;
            this.editedUser.location.country = this.editData.country;
            this.editedUser.location.city = this.editData.city;
            this.editedUser.location.address = this.editData.address;
=======
        editProfile: function(){
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
<<<<<<< HEAD
            axios.patch('/api/users/' + id ,this.editedUser, axiosConfig)
=======
            this.editedUser
            axios.patch('/api/users/5',{
                "name" : this.editedUser.name,
                "location.city" : this.editedUser.city
            }
            , axiosConfig)
>>>>>>> b42fd55f791139cdc0e59460360ee7d71701d9e1
            .then(() => {
            this.onEdit = true;
            this.getUser();
            })
        }
    },
    mounted(){
        this.getUser();
    }
};
</script>
