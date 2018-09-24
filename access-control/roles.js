"use strict";

module.exports = function(){

    let roles = {

        'OWNER' : {
            actions: ["create_dog"]
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