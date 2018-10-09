<template>
    <div>
        <div class="row">
        <div class ="col-sm-4"></div>
        <div class="col-sm-4" align="center"><img src="resources/images/dog.jpg" id="logo-photo"></div>
        <div class="col-sm-4"></div>
        </div>
        
        <div class="row">
            <div class="col-sm-4"></div>
            <div class="form-group col-sm-4">
                    <form class="login-form"> 
                        <input type="username" class="form-control" id="inputUsername" placeholder="Username" v-model="User.username"> 
                    </form>
            </div>
            <div class="col-sm-4"></div>
        </div>

        <div class ="row">
            <div class="form-group col-sm-12" align="center" >
                <button type="button" class="btn btn-outline-primary" id="signIn-button" @click="authenticate">Sign in</button>
            </div>
        </div>
        <div class="row" style="margin-top:20px">
            <div class="col-sm-12" align="center">
                <a class="link" v-on:click="register">Don't have an account yet? Register here!</a>
            </div>
        </div>   
    </div> 
</template>

<script>
const axios = require('axios');

export default {
    name:"loginHome",
    data(){
        return{
            showById:null,
            User: {username:'' },
        }
    },
    methods:{
        authenticate: function(){
            let loginUser = {
                username : this.User.username
            };
            axios({
            method: 'post',
            url: '/api/login/authenticate',
            data:  loginUser  
            })
            .then(response => {
                if(response.status === 200){
                    this.$store.commit('login',response.data.user);
                }
            })
            .catch(error =>{
                if(error.response){
                    if(error.response.status === 400){
                        alert("Incorrect username");
                    }
                }
                else{
                    console.log(error);
                }
            });
        },
        register:function(){
            this.$emit('register');
        }    
    }
};
</script>

<style scoped>
#signIn-button{
        width: 20%;
margin-left: 40%;
margin-right: 40%;
}
.link{
    color: #007bff !important;
}
.link:hover{
    text-decoration: underline #007bff !important;
    cursor: pointer;
}

#inputUsername{
display:flex;
}

#inputUsername{
    margin-right:auto;
    margin-left:auto;
    size: auto;
}
#logo-photo{
    margin-right:auto;
    margin-left:auto;
}

  @media screen and (max-width: 575px) {
        #inputUsername{
            display:flex;
            flex-direction: column;
            width: 75%;
            margin-right:auto;
            margin-left:auto;
        }
  }

  @media screen and (max-width: 500px) {
        #inputUsername{
            display:flex;
            flex-direction: column;
            width: 75%;
            margin-right:auto;
            margin-left:auto;
        }
        }
    
     @media screen and (max-width: 375px){
        #inputUsername{
            display:flex;
            width: 75%;
            margin-right:auto;
            margin-left:auto;
        }
        
    }
    @media screen and (max-width: 320px){
            #inputUsername {
            display:flex;
            width: 70%;
            margin-right:auto;
            margin-left:auto;
        }
        #logo-photo{
            width:70%;
        }
        #signIn-button{
            width:auto;
            font-size: auto;
            margin-right:auto;
            margin-left:auto;
        }
    }

   
    

</style>