const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT

const SkillinfoModel = require('../models/skillinfo_model');
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


router.post('/update', (req, res) => {
//console.log( req.body.studentprojecturl)
  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  const skillinfoobj = new SkillinfoModel({
    studentname: req.body.studentname,
    studentemail: req.body.studentemail,
    studentdepartment: req.body.studentdepartment,
    studentsession: req.body.studentsession,
    studentskillname: req.body.studentskillname,
    studentorganization: req.body.studentorganization,
    stdentprojectname: req.body.studentprojectname,
    studentprojecturl: req.body.studentprojecturl,

    studentprojectnote: req.body.studentprojectnote,
    status: 0


  });//CLOSE EmpModel
  //INSERT/SAVE THE RECORD/DOCUMENT
  skillinfoobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26

router.get('/', (req, res) => {
  SkillinfoModel.find()
    .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109 

router.get('/search/:emailid', (req, res) => {
  SkillinfoModel.find({ "studentemail": req.params.emailid })
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

router.get('/skillsearch/:skill', (req, res) => {
  var myregex = new RegExp(req.params.skill, "i");
  SkillinfoModel.find({ "studentskillname": myregex })
    .then(getsearchskilldocument => {
      if (getsearchskilldocument.length > 0) {
        res.send(getsearchskilldocument);
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


router.delete('/remove/:email', (req, res) => {
  SkillinfoModel.findOneAndRemove({ "studentname": req.params.email })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID STUDENT ID ' + req.params.email);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.email });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 60
); //CLOSE Delete METHOD Line 59


router.put('/approve/:email', (req, res) => {
  console.log(req.params.email);
  SkillinfoModel.updateOne({"studentemail":req.params.email}, {
    $set: {
      "status": "1"
    }
  }, { new: true })
    .sort({ "createdAt": -1 })
    .then(active => {
      res.status(200).send(active);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch News ' })
    })
})
router.put('/reject/:email', (req, res) => {
  // console.log(req.params.uid);
  SkillinfoModel.updateOne({"studentemail":req.params.email}, {
    $set: {
      "status": "-1"
    }
  }, { new: true })
    .sort({ "createdAt": -1 })
    .then(reject => {
      res.status(200).send(reject);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch News ' })
    })
})



module.exports = router;
