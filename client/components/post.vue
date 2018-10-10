<template>
    <div class="container">
        <div class="mdia-boxs" v-for="post in posts" :key="post.time.created">
            <h5>{{ post.postedBy }}<small><i>&nbsp;Posted: {{ post.time.created }}</i></small></h5>
            <div class="media">
                <div class="media-left">
                <img src="resources/images/user.png" alt="Image" class="mr-3" style="width:120px">
                </div>
                <div class="media-body mr-3">
                    <div class="tm-description-box">
                        <h5>Post description:</h5>
                        <p>{{ post.text }}</p>
                    </div>
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <table>
                            <tr>
                                <td>Walk Time and Date:</td>
                                <td>Post Status:</td>
                            </tr>
                            <tr>
                                <td>{{ post.time.walkOrder }}</td>
                                <td>
                                    <p v-if="availability === 'notClaimed'">Available</p>
                                    <p v-else>Claimed by {{this.data}} </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
                </div>
                <div v-if="loginType === 'WALKER'">
                    <div v-if="availability === 'notClaimed'">
                    <button  v-on:click="claim">
                        Claim
                    </button>
                    </div>
                    <div v-if="availability === 'claimed'">
                    <button  v-on:click="cancel">
                        Cancel Claim
                    </button>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var axios = require('axios')

module.exports = {
    name:"Post",
    data(){
        return{
            showById:null,
            posts:[],
           
            User: {}
        }
    },
    methods: {
        getPost: function(){
            axios
            .get('/api/posts')
            .then(response =>{
                if(response.status !== 200){
                    console.log(response.status)
                } else{
                    this.post = response.data
                }
            })
            .catch(error => {
                console.log(error);
            })  
        },
        claim: function(){
                if(this.availability=='notClaimed'){
                    axios.patch('/api/users'+this._id,{
                        data: this.data
                    })
                    .then(response => {
                        if(response.status==201){
                        alert('Succesfully Claimed to the Post')}
                    })
                    this.availability='claimed'   
                }else{                    
                        this.availability='notClaimed'                
                        }
        },
        cancel: function(){
                if(this.availability=='claimed'){
                    this.availability='notClaimed'
                }else{                    
                        this.availability='claimed'                
                        }
        }
    },
    computed:{
        loginType(){
            return this.$store.state.userInstance.role;
        },
        userId(){
           return this.$store.state.userInstance._id
        }
    }
}
</script>

