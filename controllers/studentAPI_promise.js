// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
//const EmpModel = require('../models/employee_model');
const StudentModel = require('../models/student_model');
//const ContactModel = require('../models/contact_model');

// URL :- localhost:4500/emp/register  (USING POSTMAN POST)
/*
{
  "empname": "Chandan",
  "empemail": "chan@gmail.com",
  "empmobile": "9831125144",
  "empdob": "05/09/1984",
  "emppass": "abcd",
  "empgender": "Male",
  "empcountry": "India",
  "empaddress": "Kol",
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 
router.post('/register', (req, res) => {

  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  StudentModel.find({ $or: [{ "studentemail": req.body.studentemail }, { "studentmobile": req.body.studentmobile }] })
    .then(response => {
      if (response.length > 0) {
        return res.send({ message: "Email Id or Mobile No Already exits in our Database Please Register with Other Credentials" })
      }
      else {

        const studentobj = new StudentModel({
          studentname: req.body.studentname,
          studentemail: req.body.studentemail,
          studentmobile: req.body.studentmobile,
          studentdepartment: req.body.studentdepartment,
          studentrollnumber: req.body.studentrollnumber,
          studentregnumber:req.body.studentregnumber,
          studentsession: req.body.studentsession,
          studentpass: req.body.studentpassword,
          status: 0

        });//CLOSE EmpModel
        //INSERT/SAVE THE RECORD/DOCUMENT
        studentobj.save()
          .then(inserteddocument => {
            res.status(200).send({message:"Registration Successfull"});
          })//CLOSE THEN

          .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Employee Save ' })
          });//CLOSE CATCH
      }
    })
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26

// => localhost:4500/emp/remove/30     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMPID
//EmpModel.findOneAndRemove({"empid" : parseInt(req.params.empid)})

// => localhost:4500/emp/remove/abc@gmail.com     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMAILID
router.delete('/remove/:emailid', (req, res) => {
  StudentModel.findOneAndRemove({ "studentemail": req.params.emailid })
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


// localhost:4500/emp/10
//SEARCH EMPLOYEE BY EMPID
// "empid" : parseInt(req.params.empid) Convert empid String to Int
// EmpModel.find({"empid" : parseInt(req.params.empid)})

// localhost:4500/emp/abc@gmail.com
//SEARCH EMPLOYEE BY EMPEMAIL
// CALLBACK function for get method using lambda 
router.get('/search/:emailid', (req, res) => {
  StudentModel.find({ "studentemail": req.params.emailid })
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

// BROWSER URL :- localhost:4500/emp 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/', (req, res) => {
  StudentModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109  

router.post('/logincheck', (req, res) => {
  console.log(req.body.studentemail)
  console.log(req.body.studentpassword)
  StudentModel.find({ "studentemail": req.body.studentemail, "studentpass": req.body.studentpassword ,"status":1})
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
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE GET METHOD  

router.put('/update', (req, res) => {

  StudentModel.findOneAndUpdate({ "studentemail": req.body.studentemail },
    {
      $set: {
        "studentmobile": req.body.studentmobile,
        "studentpassword": req.body.studentpassword,
        "studentrollnumber": req.body.studentrollnumber
      }
    }, { new: true })
    .then(getupdateddocument => {
      if (getupdateddocument != null)
        res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
      else
        res.status(404).send('INVALID EMAILID ' + req.body.studentemail);
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.studentid });
    }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION Line No 108
); //CLOSE PUT METHOD Line No 107


router.put('/approve/:studentid', (req, res) => {
  //console.log(req.params.email);
  StudentModel.updateOne({ "_id": req.params.studentid }, {
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
  StudentModel.updateOne({ "_id": req.params.studentid }, {
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




//SHOULD BE EXPORTED
module.exports = router;