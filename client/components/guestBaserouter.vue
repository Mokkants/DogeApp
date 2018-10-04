<template>
<div>
    <div>
        <img src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13001000/Beagle-On-White-01-400x267.jpg" alt="Dog">
    </div>    
    <div>
        <button v-on:click="login">Login</button>
        <br>
        <button v-on:click="register">Sign Up</button>
    </div>
</div>
</template>

<script>
module.exports = {
    name: "Guest"
}
</script>


