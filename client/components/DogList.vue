<template>
<div>
    <div class="row"> 
        <div class="col-sm-4"></div>
        <div class="text-center col-sm-4"><h1>Your dogs</h1></div>
        <div class="col-sm-4"></div>
    </div>

    <div class="row">
    <div class="col-sm-2"></div>
        <dog v-for="dog in dogs" :key="dog._id" :dog="dog" v-on:removed="onRemove" v-on:edited="onEdit"></dog>        
    <div class="col-sm-2"></div>
    </div>

    <div id="dog-modal" class="modal">
        <form class="modal-content animate" action="#/dogs">
             <div class="imgcontainer">
               <span onclick="document.getElementById('dog-modal').style.display='none'" class="close" title="Close Modal">&times;</span>
               <img src="resources/images/logo.png" width="150" alt="Avatar" class="avatar">
             </div>
             <div class="container">
                <h1 class="media-heading"> Name </h1>
                <p> <input type = "text" v-model = "editData.name" placeholder="Enter dog's name"> </p>
                <h2 class="media-heading"> Breed </h2>   
                <p> <input type = "text" v-model = "editData.breed" placeholder="Enter dog's breed"> </p>
                <h3 class="media-heading"> Social? </h3>
                    <input type = "checkbox" v-model = "editData.isSocial">
                <h4 class="media-heading"> Description </h4>   
                <p> <input type = "text" v-model= "editData.shortInfo" placeholder="Enter dog's info"> </p>
                <p> <button class="btn" v-on:click="doneEdit">Done</button></p>   
             </div>
        </form>
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
            newDog:'',
            editData:{
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
            });
        },
        onEdit: function(data){
            document.getElementById("dog-modal").style.display="block";
            this.newDog = data;
        },
        doneEdit: function(data){
            this.newDog.name = this.editData.name;
            this.newDog.breed = this.editData.breed;
            this.newDog.shortInfo = this.editData.shortInfo;
            this.newDog.isSocial = this.editData.is
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
            axios.patch('/api/dogs/' + this.newDog._id, this.newDog, axiosConfig)
            .then(() => {
                document.getElementById('dog-modal').style.display='none'

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
var modal = document.getElementById('dog-modal');
 
 //this doesnt work at the moment
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>
