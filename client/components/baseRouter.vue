<template>
<<<<<<< HEAD
    <div class = "row">
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <ul class="navbar-nav">
                <li class = "navbar-nav"><router-link to="/dogs" exact>Dogs</router-link></li>
                <li class = "navbar-nav"><router-link to="/schedule" exact>Schedule</router-link></li>
                <li class = "navbar-nav"><router-link to="/profile" exact>Profile</router-link></li>
            <li>Log Out</li>
            </ul>
        </nav>
=======
    <div>
        <div id="navbar">
        <router-link to="/" exact>
        <div id="logo">
            <div id="logo_img"></div>
            <div id="logo_txt">DOG-E</div>
        </div>
        </router-link>
        <ul>
            <li><router-link to="/dogs" exact>Dogs</router-link></li>
            <li><router-link to="/schedule" exact>Schedule</router-link></li>
            <li><router-link to="/profile" exact>Profile</router-link></li>
            <li><a>Log Out</a></li>
        </ul>
        </div>
>>>>>>> 0b5d96074604db32627b411dad32fb35b21a08e8
        <router-view></router-view>
    </div>
</template>

<script>
module.export = {
    name:"BaseRouter"
}
</script>

<<<<<<< HEAD
<style>
body{
    width:100%;
}
=======
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
>>>>>>> 0b5d96074604db32627b411dad32fb35b21a08e8
</style>

