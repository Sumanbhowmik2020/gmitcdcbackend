const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();


const AdminModel = require('../models/admin_model');

router.post('/logincheck', (req, res) => {
    console.log(req.body.adminemail)
    console.log(req.body.adminpassword)
    AdminModel.find({ "adminemail": req.body.adminemail, "adminpassword": req.body.adminpassword })
      .then(getsearchdocument => {
        if (getsearchdocument.length > 0) {
          res.send(getsearchdocument);
        }
        else {
          return res.status(404).send({ message: "Note not found with id " + req.params.adminemail });
        }
      }) //CLOSE THEN
      .catch(err => {
        return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.adminemail });
      })//CLOSE CATCH
  }//CLOSE CALLBACK FUNCTION BODY
  );//CLOSE GET METHOD  


module.exports = router;