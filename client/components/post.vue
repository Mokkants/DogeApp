<template>
    <div class="container">
        <div class="media-boxs" v-for="post in posts" v-bind:key="post._id">
            <h5 class="media-heading">{{ post.postedBy }}<small><i>&nbsp;Posted: {{ post.time.created | formatDate }}</i></small></h5>
            <div class="media">
                <div class="media-left">
                <img src="resources/images/user.png" alt="User" class="mr-3" style="width:120px">
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
                                    <p v-if="!isClaimed">Available</p>
                                    <p v-else>Claimed by {{ claimedBy }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
                </div>
                <div v-show="isWalker" v-bind="walker">
                    <button v-on:click="claimToPost(post._id)"
                        :disabled="isClaimed"
                        :class="{ disabledButton: isClaimed}"
                        v-bind:key="post._id"
                        >
                        Claim
                    </button>
                    <button v-show="isClaimed" @click="cancelClaimToPost(post._id)"
                        v-bind:class="post._id"
                        >
                        Cancel
                    </button>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var axios = require('axios')

module.exports = {
    name:"Post",
    props:{
        isWalker:{
            type: Boolean,
            required: true
        },
        isClaimed:{
            type: Boolean,
            required: false 
        }
    },
    data(){
        return{
            showById:null,
            posts:[],
            post: {postedBy:'', text:'', walker:'', created:'', lastModified:'', walkOrder:'' },
            User: {isWalker:''}
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
        claimToPost: function(id){
            axios({
                method: 'patch',
                url: '/api/posts/'+id,
                data:{
                    claimedBy: this.post.walker,
                }
            })
            .then( response => {
               if(response.status==201){
                alert('successfully claimed');
                this.isClaimed()
               }    
            });
        },
        cancelClaimToPost: function(id){
            axios({
                method: 'patch',
                url: '/api/posts/'+id,
                data: {
                    walker: null,
                }
            })
            .then( response => {
               if(response.status==201){
                alert('claim cancelled');
                this.isClaimed(flase) 
               }    
            });
        }
    },
    computed:{
        isClaimed(){
            return true
        }
    }
}
</script>

