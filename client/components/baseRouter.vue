<template>
    <div>
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>

import Navigation from './Navigation.vue'

export default{
    name:"BaseRouter",
    components:{
        'navbar':Navigation
    }
}
</script>

<style scoped>

</style>

