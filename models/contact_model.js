const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let ContactModel = model_mongoose.model('contacts', 
{
    contactname: { type: String },
    contactemail: { type: String },
    contactmobile: { type: String },
    contactsubject: { type: String },
    contactmessage: { type: String },
    
	regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = ContactModel ;