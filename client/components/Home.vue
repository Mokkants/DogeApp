<template>
<div>
    <navbar></navbar>
    <router-view></router-view>
</div>  
</template>

<script>
import Navigation from './Navigation.vue'
export default {
    name:"Home",
    components:{
        'navbar':Navigation
    }
}
</script>
