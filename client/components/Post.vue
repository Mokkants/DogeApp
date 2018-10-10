<template>
    <div class="post">
        <div class="header">
            <div class="name">{{post.postedBy.name}}</div>
            <div class="photo"><img src="resources/images/user.png" alt=""></div>
        </div>
        <div class="primary">
            <div class="details">
                <div class="wrapper">
                    <span>Description</span>
                    <div class="description">{{post.text}}</div>
                </div>
                <div class="wrapper">
                    <span>Time to be picked up:</span>
                    <div class="time">{{post.time.walkOrder | formatDate}}</div>
                </div>
            </div>
            <div class="buttons">
                <div class="ownerButtons" v-if="userType=='OWNER'">
                    <a class="post-btn-transparent" v-on:click="deletePost">&times;</a>
                </div>
                <div class="walkerButtons" v-if="userType=='WALKER'">
                    <a class="" v-show="post.walker === userId" v-on:click="cancelClaim">Cancel</a>
                    <a class="" v-show="post.walker === null" v-on:click="claimPost">Claim</a>
                </div>    
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['post'],
    data : function(){
        return {
            
        }
    },
    computed:{
        userId(){
            return this.$store.state.userInstance._id;
        },
        userType(){
            return this.$store.state.userInstance.role;
        }
    },
    methods: {
        deletePost:function(){
            this.$emit('delete');
        },
        claimPost: function(){
            this.$emit('claim');
            this.post.walker = userId;
        },
        cancelClaim:function(){
            this.$emit('cancel');
            this.post.walker = null;
        }
    }
}   
</script>

<style scoped>
    img{
        width:80px;
    }
    span{
        font-size:13px;
        color: #ccc;
    }
    .header{
        display: flex;
        flex-direction: column;
    }
    .name{
        text-align: center;
        font-size:17px;
        font-weight: bold;
    }
    .post{
        display: flex;
        width:100%;
        padding:5px;
        margin:10px;
        border:1px solid black;
    }
    .primary{
        flex-grow:2;
        display: flex;
    }
    .details{
        display:flex;
        align-items: center;
        flex-grow:2;
    }
    .details div{
        flex:1;
        margin:5px;
        padding:10px;
    }
    .wrapper{
        width:100%;
        display: flex;
        flex-direction: column;
    }
    .description{
        flex-grow:3 !important;
        word-wrap: break-word;
    }
    .secondary{
        display: flex;
    }

    .buttons{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .buttons a{
        border-radius: 5px;
        display: block;
        text-align: center;
        padding:5px;
        margin:3px;
        background-color: #ddd;
    }
    .buttons a:hover{
        background-color: rgb(235, 235, 235);
        color:rgb(29, 30, 88) !important;
        cursor:pointer;
    }
    .post-btn-transparent{
        background-color: #fff !important;
        color:rgb(161, 49, 49) !important;
        font-size: 30px;
        padding:10;
        line-height:0px;
        display: flex;
        align-items: center;
        justify-content: center;       
    }

    @media screen and (max-width: 980px){
        .header{
            flex-direction: row-reverse;
            justify-content: center;
            align-items: center;
        }
        .name{
            margin-left: 5px;
        }
        .primary, .details, .post{
            flex-direction: column;
        }   
    }

    @media screen and (max-width: 575px){
       .post{
           margin:0;
           margin-top:10px;
       }
    }

</style>


