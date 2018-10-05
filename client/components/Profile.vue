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
                    </div>
                    <div class="media-body col-sm-4" v-show="!onEdit">
                        <h1 class="media-heading"> Name </h1>
                        <p> <input type = "text" v-model = "editedUser.name" placeholder="Enter your name"> </p>
                        <h2 class="media-heading"> City </h2>
                        <p> <input type = "text" v-model= "editedUser.location.city" placeholder="Enter your city"> </p>
                        <p> <button class="btn" v-on:click="editProfile">Done</button></p>
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
var access = require('../../server/access-control');
module.exports = {
    name:"UserProfile",
    data(){
        return{
            showById:null,
            user: null,
            editedUser:{
                name:'',
                location: {
                    city:'',
                    country: ''
                }
            },
            onEdit:true,
        }
    },
    methods: {
        getUser: function(){
            axios.get('/api/users/5')
            .then(response => {
                if (response.status !== 200){
                    console.log("Wrong status code: " + response.status);
                }
                else{
                console.log(response.data);
                this.user = response.data;
                }
            })
            .catch(function (error){
                console.log(error);
            })
            .then(function(){
                this.location.country = response.data.location.country;
            });
        },
        editProfile: function(){
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
            axios.patch('/api/users/5',this.editedUser, axiosConfig)
            .then(() => {
            this.onEdit = true;
            })
        }
    },
    mounted(){
        this.getUser();
    }
};
</script>
