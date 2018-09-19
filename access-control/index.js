"use strict";

let roles = require("./roles");

module.exports = function(){

    function isActionAllowed(role,action){
       
        return role.can.includes(action);

    }

    return {roles,isActionAllowed};
}();