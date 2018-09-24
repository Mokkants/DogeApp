"use strict";

module.exports = function(){

    let roles = {

        'OWNER' : {
            actions: ["create_dog","modify_post","create_post","modify_user","modify_dog"]
        },
        'WALKER' : {
            actions: []
        },
        'ADMIN' : {
            actions: ["update_any_user","delete_any_user"]
        }

    }

    return roles;
}();