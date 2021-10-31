const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT

const ContactModel = require('../models/contact_model');
// URL :- localhost:4500/contact/contact  (USING POSTMAN POST)
/*
{
  "contactname": "Chandan",
  "contactemail": "chan@gmail.com",
  "contactmobile": "9831125144",
  "contactsubject": "login problem",
  "contactmessage": "abcd",
  
}
*/


router.post('/register', (req, res) => {

  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  const contactobj = new ContactModel({
    contactname: req.body.contactname,
    contactemail: req.body.contactemail,
    contactmobile: req.body.contactmobile,
    contactsubject: req.body.contactsubject,
    contactmessage: req.body.contactmessage,


  });//CLOSE EmpModel
  //INSERT/SAVE THE RECORD/DOCUMENT
  contactobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26


router.get('/', (req, res) => {
  ContactModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109


module.exports = router;
