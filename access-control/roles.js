"use strict";

module.exports = function(){

    let roles = {

        owner : {
            can: []
        },
        walker : {
            can: []
        },
        default : {
            can: []
        }

    }

    return roles;
}();