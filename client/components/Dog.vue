<template>
    <div class="dog">
        <div class="header">
            <div class="name">{{dog.name}}</div>
            <div class="photo"><img src="resources/images/logo.png" alt=""></div>
        </div>
        <div class="primary">
            <div class="details">
                <div class="description">{{dog.shortInfo}}</div>
                <div class="breed">{{dog.breed}}</div>
                <div class="sociability">{{getSociability}}</div>
            </div>
            <div class="buttons">
                <a class="edit" v-on:click="onEdit = !onEdit">Edit</a>
                <a class="danger" v-on:click="remove">Remove</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['dog'],
    data : function(){
        return {
            
        }
    },
    computed:{
        getSociability : function(){
            return this.dog.isSocial ? "Social" : "Not social";
        }
    },
    methods: {
        remove: function(){
            this.$emit('remove');
        }
    }
}   
</script>

<style scoped>
    img{
        width:60px;
    }
    .name{
        text-align: center;
        font-size:17px;
        font-weight: bold;
    }
    .dog{
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
    .description{
        flex-grow:3 !important;
        word-wrap: break-word;
    }
    .breed{
        text-align: center;
    }
    .sociability{
        text-align: center;
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
        text-decoration: underline;
        background-color: rgb(235, 235, 235);
        cursor:pointer;
    }
    .danger{
        color:rgb(161, 49, 49) !important;
    }
    .edit{
        color:rgb(29, 30, 88) !important;
    }


</style>


