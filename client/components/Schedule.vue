<template>
<div class="main">
    <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
        <span class="no_result" v-show="postsCondensed.length === 0 || showNoResult">No result.</span>
        <table v-show="postsCondensed.length !== 0 && !showNoResult">
            <tr>
                <td>Date</td>
                <td>Time</td>
                <td>Location</td>
            </tr>
            <tr v-for="post in postsCondensed" :key="post.time.walkOrder">
                <td class="date">{{post.time.walkOrder | formatDay}} </td>
                <td class="time">{{post.time.walkOrder | formatHour}}</td>
                <td>
                        <ul>
                            <li class="schedule_event" v-for="item in post.details" v-bind:key="item.postId" @mouseover="showById=item.postId" @mouseout="showById=null">
                                <div class="event_location">
                                {{item.location.address}}
                                </div>
                                <div class="cancelbtn" v-on:click="cancelClaimToPost(item.postId, $event)" v-bind:class="[showById===item.postId ? 'revealed' : '']">
                                X
                                </div>
                            </li>
                        </ul>
                    </td>
            </tr>
        </table>
        </div>
        <div class="col-sm-3"></div>
    </div>
</div>
</template>

<script>

const 
moment = require('moment'),
_ = require('underline'),
axios = require('axios');

module.exports = {
    name:"Schedule",
    data(){
       return{
        showById:null,
        posts:[],
        postsCondensed:[]
       }
    },
    methods:{
        getPosts: function(){
            axios
            .get('/api/posts/')
            .then(response => {
                if(response.status === 200){
                    let data = response.data.data;
                    this.posts.length = 0;
                    for (let i = 0; i < data.length; i++) {
                        if(data[i].walker === this.user._id){
                            this.posts.push(data[i]);
                        }
                    }
                     this._getPostsCondensed();
                }
                else if (response.status===401){
                    console.log("unauthorized");
                }
            })
            .catch(e => {
                this.posts.length = 0;
                console.log(e)
            });
        },
        cancelClaimToPost: function(id, event){

            let newPosts = [];
            for(let i = 0; i < this.posts.length; i++){
                if(this.posts[i]._id !== id){
                    newPosts.push(this.posts[i]);
                }
            }
            this.posts = newPosts;

            let scheduleEvent = event.target.parentNode;
            if(scheduleEvent.parentNode.childNodes.length === 1){
                scheduleEvent.parentNode.parentNode.removeChild(scheduleEvent.parentNode);
            }else{
                scheduleEvent.parentNode.removeChild(scheduleEvent);
            }
            
            this._getPostsCondensed();

            axios({
                method: 'patch',
                url: '/api/posts/'+id,
                data: {
                    walker: null
                }
            });
        },
        //Simplifies post JSON so it's more suited for this view
        _getPostsCondensed : function(){
        let data=this.posts;
        let condensed = [];
        for (let i = 0; i < data.length; i++) {
                let item = {
                    time:{
                        walkOrder : data[i].time.walkOrder
                    },
                    details:[
                        {
                            location:data[i].postedBy.location,
                            postId:data[i]._id
                        }
                    ]
                }
                let foundDup = false;
                for (let j = 0; j< condensed.length; j++){
                    if(moment(String(condensed[j].time.walkOrder)).format('MMMM DD hh:mm') == moment(String(data[i].time.walkOrder)).format('MMMM DD hh:mm')){
                        foundDup = true;
                        condensed[j].details.push({
                            location:(data[i].postedBy.location),
                            postId:data[i]._id
                        });
                    }
                }
                if(!foundDup){
                    condensed.push(item);
                }
            }
        this.postsCondensed = condensed;
        }
    },
    computed:{
        user(){
            return this.$store.state.userInstance;
        },
        showNoResult(){
            return this.posts.length >= 0 ? false : true; 
        }
    },
    mounted () {
        this.getPosts();
  }
};
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}
table{
    width:100%;
    margin:2px;
}
tr{
    padding-bottom:15px;
    border-bottom:1px solid #444; 
}
.main{
    margin-top:50px;
}
.no_result{
    display:flex;
    justify-content: center;
    width:100%;
    color:#999;
    font-size:40px;
}
.schedule_event{
    display: flex;
    align-items: center;
    height:40px;
    max-height:40px;
    transition: .2;
    list-style-type: none;
    padding:5px;
    border-bottom: 1px solid #ddd;
}
.event_location{
    flex-grow: 1;
}
.cancelbtn{
    transform: scale(1,0.75);
    color:#bbb;
    height:30px;
    width:30px;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    flex-grow: 0;
}
.cancelbtn:hover{
    cursor:pointer;
    color:#444;    
}
.revealed{
    visibility: visible;
}
td{
    background-color: #fff;
    border-bottom:1px solid #777;
    padding:3px;
}
.time, .date{
    font-variant:small-caps
}
.time{
    font-size: 30px;
    color:#777;
}
</style>
