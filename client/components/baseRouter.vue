<template>
    <div class = "row">
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <ul class="navbar-nav">
                <li class = "navbar-nav"><router-link to="/dogs" exact>Dogs</router-link></li>
                <li class = "navbar-nav"><router-link to="/schedule" exact>Schedule</router-link></li>
                <li class = "navbar-nav"><router-link to="/profile" exact>Profile</router-link></li>
            <li>Log Out</li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
module.export = {
    name:"BaseRouter"
}
</script>

<style>
body{
    width:100%;
}
</style>

