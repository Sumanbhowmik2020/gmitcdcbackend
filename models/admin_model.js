// IMPORT MONGOOSE 
const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let AdminModel = model_mongoose.model('admins', 
{
    
    adminemail: { type: String },

   
    adminpassword: { type: String }
	
});

//EXPORT MODULE Employee using BINDING
module.exports = AdminModel ;
