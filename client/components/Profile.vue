<template>
    <div>
        <div v-bind:key="user._id" class="media border p-3 mt-3 mb-3">
            <img src="user.jpg" alt="User" class="mr-3 mt-3" style="width:60px;">
            <div class="media-body">
                <button type="button" class="edit" @click="editProfile(user._id)">&times;</button>
            </div>
        </div>
    </div>
</template>

<script>
var axios = require('axios');
import access from '../../access-control';
module.exports = {
    name:"UserProfile",
    data(){
        return{
            user,
        }
    },
    methods: {
        getCurrentUser: function(){
            axios.get('/api/user/',{
                params: {
                    ID: access.currentUser.id
                }
            })
            .then(function (response){
                if (response.status!==)
            })
        }

    }
}
</script>
