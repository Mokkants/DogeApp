<template>
    <div>
        <ul id="navbar">
            <li><router-link to="/dogs" exact>Dogs</router-link></li>
            <li><router-link to="/schedule" exact>Schedule</router-link></li>
            <li><router-link to="/profile" exact>Profile</li>
            <li>Log Out</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
module.export = {
    name:"BaseRouter"
}
</script>

