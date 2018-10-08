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
export default {
    name:"UserProfile",
    data(){
        return{
            showById:null,
            user: null,
            editedUser: null,
            editData:{
                name:'',
                city:'',
                country:'',
                address:'',
            },
            onEdit:true,
            id:this.$store.state.userInstance._id
        }
    },
    methods: {
        getUser: function(){
            axios.get('/api/users/' + this.id)
            .then(response => {
                if (response.status !== 200){
                    console.log("Wrong status code: " + response.status);
                }
                else{
                console.log(response.data);
                this.user = response.data;
                this.editedUser = this.user;
                }
            })
            .catch(function (error){
                console.log(error);
            })
            .then(function(){
            });
        },
        doneEdit: function(){
            this.editedUser.name = this.editData.name;
            this.editedUser.location.country = this.editData.country;
            this.editedUser.location.city = this.editData.city;
            this.editedUser.location.address = this.editData.address;
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
            axios.patch('/api/users/' + this.id ,this.editedUser, axiosConfig)
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
