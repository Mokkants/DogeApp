"use strict";

module.exports = function(){

    let roles = require("./roles");
    let isActionAllowed = (action) => currentUser.role.actions.includes(action);
   
    let currentUser = {
        id : -1,
        role : {
            actions : []
        }
    };

    return {roles,isActionAllowed,currentUser};
}();