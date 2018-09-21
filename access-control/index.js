"use strict";

module.exports = function(){

    let roles = require("./roles");
    let isActionAllowed = (action) => currentUser.role.can.includes(action);
   
    let currentUser = {
        role : roles.default
    };

    return {roles,isActionAllowed,currentUser};
}();