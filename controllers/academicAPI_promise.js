const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT

const AcademicinfoModel = require('../models/academicinfo_model');
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
  AcademicinfoModel.find({ $or: [{ "studentemail": req.body.studentemail }, { "studentmobile": req.body.studentmobile }] })
    .then(response => {
      if (response.length > 0) {
        return res.send({ message: "You already upload your Academic Info" })
      }
      else {

        const academicinfoobj = new AcademicinfoModel({
              studentname: req.body.studentname,
    studentemail: req.body.studentemail,
    studentdepartment: req.body.studentdepartment,
    studentsession: req.body.studentsession,
    studentsecschoolname: req.body.studentsecschoolname,
    studentsecboardname: req.body.studentsecboardname,
    studentsecpassingyear: req.body.studentsecpassingyear,
    studentsecpercentage: req.body.studentsecpercentage,

    studenthsschoolname: req.body.studenthsschoolname,
    studenthsboardname: req.body.studenthsboardname,
    studenthspassingyear: req.body.studenthspassingyear,
    studenthspercentage: req.body.studenthspercentage,

    studentcolschoolname: req.body.studentcolschoolname,
    studentcolboardname: req.body.studentcolboardname,
    studentcolpassingyear: req.body.studentcolpassingyear,
    studentcolpercentage: req.body.studentcolpercentage,


        });//CLOSE EmpModel
        //INSERT/SAVE THE RECORD/DOCUMENT
        academicinfoobj.save()
          .then(inserteddocument => {
            res.status(200).send({ message: "Academic Info Upload Successfull" });
          })//CLOSE THEN

          .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Employee Save ' })
          });//CLOSE CATCH
      }
    })
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26

router.get('/search/:emailid', (req, res) => {
  AcademicinfoModel.find({ "studentemail": req.params.emailid })
    .then(getsearchdocument => {
     // console.log(getsearchdocument)
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

module.exports = router;
