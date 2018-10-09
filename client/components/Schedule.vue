<template>
<div class="main">
    <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
        <table>
            <tr>
                <td>Date</td>
                <td>Time</td>
                <td>Location</td>
            </tr>
            <tr v-for="post in posts" :key="post.time.walkOrder">
                <td class="date">{{post.time.walkOrder | formatDay}} </td>
                <td class="time">{{post.time.walkOrder | formatHour}}</td>
                <td>
                        <ul>
                            <li class="schedule_event" v-for="item in post.details" v-bind:key="item.postId" @mouseover="showById=item.postId" @mouseout="showById=null">
                                <div class="event_location">
                                {{item.location.address}}
                                </div>
                                <div class="cancelbtn" @click="cancelClaimToPost(item.postId)" v-bind:class="[showById===item.postId ? 'revealed' : '']">
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
        posts:[]
       }
    },
    methods:{
        getPosts: function(){
            axios
            .get('/api/posts/')
            .then(response => {
                if(response.status === 200){
                    return this._getPostsCondensed(response.data.data);
                }
                else if (response.status===401){
                    console.log("unauthorized");
                }
            })
            .then(data => {
            this.posts.length = 0;
            for (let i = 0; i < data.length; i++) {
                this.posts.push(data[i]);
            }
            })
            .catch(e => {
                this.posts.length = 0;
                console.log(e)
            });
        },

        cancelClaimToPost: function(id){
            axios({
                method: 'patch',
                url: '/api/posts/'+id,
                data: {
                    walker: null
                }
            });
        },

        //Simplifies post JSON so it's more suited for this view
        _getPostsCondensed : function(data){
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
        return condensed;
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
