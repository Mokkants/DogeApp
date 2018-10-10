<template>
<div>
    <div class="row"> 
        <div class="col-sm-4"></div>
        <div class="text-center col-sm-4"><h1>Your dogs</h1></div>
        <div class="col-sm-4"></div>
    </div>

    <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-8">
        <button class="add-dog-btn" onclick="document.getElementById('dog-create-modal').style.display='block'" style="width:auto;" exact>Add dog</button>
        <dog v-for="dog in dogs" :key="dog._id" :dog="dog" v-on:removed="onRemove" v-on:edited="onEdit"></dog>        
    </div>
    <div class="col-sm-2"></div>
    </div>
    
    <div id="dog-create-modal" class="modal">
        <form class="modal-content animate" action="#/dogs">
             <div class="imgcontainer">
               <span onclick="document.getElementById('dog-create-modal').style.display='none'" class="close" title="Close Modal">&times;</span>
               <img src="resources/images/logo.png" width="150" alt="Avatar" class="avatar">
             </div>
             <div class="container" id="createDog">
                <h1 class="media-heading"> Name </h1>
                <p> <input type = "text" v-model = "dogData.name" placeholder="Enter dog's name"> </p>
                <h2 class="media-heading"> Breed </h2>   
                <p> <input type = "text" v-model = "dogData.breed" placeholder="Enter dog's breed"> </p>
                <h3 class="media-heading"> Social? </h3>
                    <input type = "checkbox" v-model = "dogData.isSocial">
                <h4 class="media-heading"> Description </h4>   
                <p> <input type = "text" v-model= "dogData.shortInfo" placeholder="Enter dog's info"> </p>
                <p> <button class="btn" v-on:click="createDog">Done</button></p>   
             </div>
        </form>
    </div>
<div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-3" >
        <div id="dog-edit-modal" class="modal">
            <form class="modal-content animate" action="#/dogs">
                <div class="imgcontainer">
                <span onclick="document.getElementById('dog-edit-modal').style.display='none'" class="close" title="Close Modal">&times;</span>
                <img src="resources/images/logo.png" width="150" alt="Avatar" class="avatar">
                </div>
                <div class="container" id="createDog">
                    <h1 class="media-heading"> Name </h1>
                    <p> <input type = "text" v-model = "dogData.name" placeholder="Enter dog's name"> </p>
                    <h2 class="media-heading"> Breed </h2>   
                    <p> <input type = "text" v-model = "dogData.breed" placeholder="Enter dog's breed"> </p>
                    <h3 class="media-heading"> Social? </h3>
                        <input type = "checkbox" v-model = "dogData.isSocial">
                    <h4 class="media-heading"> Description </h4>   
                    <p> <input type = "text" v-model= "dogData.shortInfo" placeholder="Enter dog's info"> </p>
                    <p> <button class="btn" v-on:click="doneEdit">Done</button></p>   
                </div>
            </form>
        </div>
    </div>
    <div class="col-sm-6"></div>
</div>
</div>
</template>
<script>
import Dog from './Dog.vue';
const axios = require('axios');

export default {
    name: 'dog-list',
    components:{
        Dog,
    },
    data(){
        return{
            editedDog: null,
            dogData:{
                name:'',
                breed:'',
                shortInfo:'',
                isSocial:false,
            },
            editClicked: false,
            dogs:[]
        }
    },
    methods: {
        createDog: function(){
           let newDog = {
               owner: this.user._id,
               name : this.dogData.name,
               breed : this.dogData.breed,
               isSocial : this.dogData.isSocial,     
               shortInfo : this.dogData.shortInfo,
           };
            axios({
                method: 'post',
                url: '/api/dogs',
                data: newDog   
            })
            .then( response => {
               if(response.status==201){
                alert('added a new dog');
                document.getElementById('dog-create-modal').style.display='none';
                this.$router.go(this.$router.currentRoute);
               }    
            });
        },

        getDogs: function () {
            axios.get('/api/dogs/')
            .then(
                response => {
                    if (response.status!==200) {
                        console.log("Wrong status code: " + response.status);
                    }
                    this.dogs.length = 0;
                    let data = response.data.data;
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].owner === this.user._id){
                        this.dogs.push(data[i]);
                        }
                    }
            })
            .catch(error => {
                this.dogs.length = 0;
                console.log(error);
            })
            .then(data => {
        
            })
        },
        onRemove: function(id){
            axios.delete('/api/dogs/'+ id)
            .then(
                response => {
                    var localIndex = -1;
                    for (var i=0; i < this.dogs.length; i++) {
                        if (this.dogs[i]._id === id) {
                            localIndex = i;
                            i = this.dogs.length;
                }
                    }
                    if (localIndex !== -1) {
                        this.dogs.splice(localIndex, 1); 
                    }
                    console.log("Success: " + response.status);
            })
            .catch(error => {
                console.log(error);
            })
            .then(function () {
                this.$router.go(this.$router.currentRoute);
            });
        },
        onEdit: function(data){
            document.getElementById("dog-edit-modal").style.display="block";
            this.editedDog = data;
        },
        doneEdit: function(data){
            this.editedDog.name = this.dogData.name;
            this.editedDog.breed = this.dogData.breed;
            this.editedDog.shortInfo = this.dogData.shortInfo;
            this.editedDog.isSocial = this.dogData.isSocial;
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
            axios.patch('/api/dogs/' + this.editedDog._id, this.editedDog, axiosConfig)
            .then(() => {
                document.getElementById('dog-edit-modal').style.display='none';
            });
        }
    },
    computed:{
        user(){
            return this.$store.state.userInstance;
        }
    },
    mounted(){
        this.getDogs();
    },
    

}
var editModal = document.getElementById('dog-edit-modal');
var createModal = document.getElementById('dog-create-modal');

 
 //this doesnt work at the moment
    window.onclick = function(event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
    else if (event.target == createModal){
        createModal.style.display = "none";
    }
}
</script>
<style>
.add-dog-btn{
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}
modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    padding-top: 60px;
    align-content: center;
    
    
}
/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}
/* The Close Button (x) */
.close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;
}
#createDog{
    margin-left:500px;
    
}
.avatar{
    margin-left:500px;
}
    </style>