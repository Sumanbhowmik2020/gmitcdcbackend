const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT

const JobinfoModel = require('../models/job_model');
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
  JobinfoModel.find({ "studentemail": req.body.studentemail, "studentskillname": req.body.studentskillname ,"studentcompany":req.body.studentcompany})
    .then(response => {
      if (response.length > 0) {
        return res.send({ message: "Already Student select with this Skil" })
      }
      else {

        const jobinfoobj = new JobinfoModel({
          studentname: req.body.studentname,
          studentemail: req.body.studentemail,
          studentcompany: req.body.studentcompany,
          studentsession: req.body.studentsession,
          studentskillname: req.body.studentskillname,
          studentdept: req.body.studentdept,
          studentdate: req.body.studentdate,

          studentprofilepic: req.body.studentprofilepic,
          status: 0


        });//CLOSE EmpModel
        //INSERT/SAVE THE RECORD/DOCUMENT
        jobinfoobj.save()
          .then(inserteddocument => {
            res.status(200).send({ message: "Internship info Upload Succesfully" });
          })//CLOSE THEN

          .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Employee Save ' })
          });//CLOSE CATCH
      }
    })
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26
//CLOSE POST METHOD Line 26

router.get('/', (req, res) => {
  JobinfoModel.find()
    .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109 

router.get('/home', (req, res) => {
  JobinfoModel.find({"status":"1"})
    .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });
}
);

router.get('/search/:studentcompany', (req, res) => {
  JobinfoModel.find({ "studentcompany": req.params.studentcompany })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.studentcompany });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.studentcompany });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 88
);//CLOSE GET METHOD Line 87 



router.delete('/remove/:studentid', (req, res) => {
  JobinfoModel.findOneAndRemove({ "_id": req.params.studentid })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID STUDENT ID ' + req.params.studentid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.studentid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 60
); //CLOSE Delete METHOD Line 59


router.put('/approve/:studentid', (req, res) => {
  //console.log(req.params.email);
  JobinfoModel.updateOne({ "_id": req.params.studentid }, {
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
router.put('/reject/:studentid', (req, res) => {
  // console.log(req.params.uid);
  JobinfoModel.updateOne({ "_id": req.params.studentid }, {
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
