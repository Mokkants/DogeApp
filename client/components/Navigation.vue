<template>
      <div id="navbar">
        <router-link to="/" exact>
        <div id="logo">
            <div id="logo_img"></div>
            <div id="logo_txt">DOG-E</div>
        </div>
        </router-link>
        <ul>
            <router-link to="/" exact><li>Home</li></router-link>
            <router-link to="/dogs" exact v-if="userType=='OWNER'"><li>Dogs</li></router-link>
            <router-link to="/schedule" exact v-if="userType=='WALKER'"><li>Schedule</li></router-link>
            <router-link to="/profile" exact><li>Profile</li></router-link>
            <a v-on:click="logout"><li>Log Out</li></a>
        </ul>
        </div>
</template>

<script>
export default{
    methods:{
        logout:function(){
             this.$store.commit('logout');
        }
    },
    computed:{
        userType(){
            return this.$store.state.userInstance.role;
        }
    }
}
</script>

<style scoped>
    #logo{
        flex-grow: 0;
        display: flex;
        align-items:center;
    }
    #logo_img{
        background:url('../resources/images/logo.png');
        background-size: cover;
        width:50px;
        height:50px;
        margin:10px;
    }
    #logo_txt{
        font-size: 24px;
    }
    #navbar{
        display: flex;
        background-color:#eee;
        align-items: center;
    }
    #navbar ul{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
        list-style-type: none;
        margin:0px;
        user-select: none;
    }
    #navbar li{
        padding:10px;
        background-color:#ddd;
        margin:5px;
    }
    #navbar li:hover{
        cursor: pointer;
        background-color: rgb(235, 235, 235);
        color:#444;
    }
    #navbar a{
        text-decoration: none;
        color:#333;
    }
    @media screen and (max-width: 500px) {
        #navbar{
            display:flex;
            flex-direction: column;
        }
        ul{
            display: flex;
        }
        li{
            flex:1;
        }
        #logo_txt {
            display: none;
        }
        #logo_img{
            margin-right:0;
        }
    }
     @media screen and (max-width: 375px){
            #navbar li{
            margin-left:0;
            margin-right:3px;
        }
    }
    @media screen and (max-width: 320px){
            #navbar li{
            padding:5px;
            font-size:15px;
        }
    }
</style>

