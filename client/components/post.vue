<template>
    <div class="container">
        <div class="mdia-boxs">
            <h5 class="media-heading">{{ post.postedBy.ref }}<small><i>&nbsp;Posted: {{ post.time.created }}</i></small></h5>
            <div class="media">
                <div class="media-left">
                <img src="image" alt="Image" class="mr-3" style="width:120px">
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
                                <td>{{ post.text.walkTime }}</td>
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
                <div v-show="isWalker">
                    <button v-on:click="claimToPost(item.postId)"
                        :disabled="isClaimed"
                        :class="{ disabledButton: isClaimed}"
                        v-bind:key="item.postId"
                        >
                        Claim
                    </button>
                    <button v-show="isClaimed" @click="cancelClaimToPost(item.postId)"
                        v-bind:class="[showById===item.postId ? 'revealed' : '']"
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
        }
    },
    data(){
        return{
            showById:null,
            posts:[],
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
                    status: isClaimed
                }
            })
        },
        cancelClaimToPost: function(id){
            axios({
                method: 'patch',
                url: '/api/posts/'+id,
                data: {
                    walker: null,
                    status: !isClaimed
                }
            });
        }
    }
}
</script>

