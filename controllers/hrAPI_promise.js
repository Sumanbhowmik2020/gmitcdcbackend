const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();


const HrModel = require('../models/hr_model');

router.post('/register', (req, res) => {

    //Create Object of Employee Model Class
    // And Receive value from request body and Store value within the Object
    HrModel.find({ $or: [{ "hremail": req.body.hremail }, { "hrmobile": req.body.hrmobile }] })
      .then(response => {
        if (response.length > 0) {
          return res.send({ message: "Email Id or Mobile No Already exits in our Database Please Register with Other Credentials" })
        }
        else {
  
          const hrobj = new HrModel({
           
            hrname: req.body.hrname,
            hremail: req.body.hremail,
            hrmobile: req.body.hrmobile,
            hrprofilepic: req.body.hrprofilepic,
            hrcompany: req.body.hrcompany,
           
            hrpassword: req.body.hrpassword,
  
  
          });//CLOSE EmpModel
          //INSERT/SAVE THE RECORD/DOCUMENT
          hrobj.save()
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


  router.get('/', (req, res) => {
    HrModel.find()
      .then(getalldocumentsfrommongodb => {
        res.status(200).send(getalldocumentsfrommongodb);
      }) //CLOSE THEN
      .catch(err => {
        res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
      });//CLOSE CATCH
  } //CLOSE CALLBACK FUNCTION BODY Line 110      
  );//CLOSE GET METHOD Line 109


  router.post('/logincheck', (req, res) => {
    console.log(req.body.hremail)
    console.log(req.body.hrpassword)
    HrModel.find({ "hremail": req.body.hremail, "hrpassword": req.body.hrpassword })
      .then(getsearchdocument => {
        if (getsearchdocument.length > 0) {
          res.send(getsearchdocument);
        }
        else {
          return res.status(404).send({ message: "Note not found with id " + req.params.hremail });
        }
      }) //CLOSE THEN
      .catch(err => {
        return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.hremail });
      })//CLOSE CATCH
  }//CLOSE CALLBACK FUNCTION BODY
  );//CLOSE GET METHOD  


module.exports = router;