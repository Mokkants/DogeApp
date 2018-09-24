"use strict";

module.exports = function(){

    let roles = {

        'OWNER' : {
            actions: [
            "view_post","create_post","modify_post","delete_post",
            "modify_user","delete_user","view_user",
            "create_dog","modify_dog","delete_dog","update_dog"]
        },
        'WALKER' : {
            actions: ["view_post","modify_post",
            "modify_user","delete_user","view_user"
        ]
        },
        'ADMIN' : {
            actions: ["update_any_user","delete_any_user","update_post"]
        }

    }

    return roles;
}();