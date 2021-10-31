const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT

const BasicinfoModel = require('../models/basicinfo_model');
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
  BasicinfoModel.find({ $or: [{ "studentemail": req.body.studentemail }, { "studentmobile": req.body.studentmobile }] })
    .then(response => {
      if (response.length > 0) {
        return res.send({ message: "You already upload your bassicinfo" })
      }
      else {

        const basicinfoobj = new BasicinfoModel({
          studentname: req.body.studentname,
          studentemail: req.body.studentemail,
          studentmobile: req.body.studentmobile,
          studentdob: req.body.studentdob,
          studentgender: req.body.studentgender,
          studentgithub: req.body.stdentgithub,
          studentlinkedin: req.body.studentlinkedin,
          studentprofilepic: req.body.studentprofilepic,


        });//CLOSE EmpModel
        //INSERT/SAVE THE RECORD/DOCUMENT
        basicinfoobj.save()
          .then(inserteddocument => {
            res.status(200).send({ message: "Basic Info Update Successfull" });
          })//CLOSE THEN

          .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Employee Save ' })
          });//CLOSE CATCH
      }
    })
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26

router.get('/search/:emailid', (req, res) => {
  BasicinfoModel.find({ "studentemail": req.params.emailid })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.studentid });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.studentid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 88
);//CLOSE GET METHOD Line 87 


router.put('/update', (req, res) => {

  BasicinfoModel.findOneAndUpdate({ "studentemail": req.body.studentemail },
    {
      $set: {


        "studentdob": req.body.studentdob,
        "studentgender": req.body.studentgender,
        "studentgithub": req.body.stdentgithub,
        "studentlinkedin": req.body.studentlinkedin,
     //   "studentprofilepic": req.body.studentprofilepic



      }
    }, { new: true })
    .then(getupdateddocument => {
      if (getupdateddocument != null)
        res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
      else
        res.status(404).send('INVALID EMAILID ' + req.body.studentemail);
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.studentemail });
    }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION Line No 108
); //CLOSE PUT METHOD Line No 107



module.exports = router;
