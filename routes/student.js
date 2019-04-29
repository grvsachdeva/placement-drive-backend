const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
var logger = require("../logger");

const Student = require('../models/student');
const Registration = require('../models/registration');
const Company = require('../models/company');

router.get("/:rollno", [
  check('rollno').exists().isInt()
] ,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Bad request", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
  
    Student.findOne({rollno: req.params.rollno})
      .then(student => {
        if (!student) {
          logger.info("Student not found in database");
          return res.status(404).json({
            message: "Student not found!"
          });
        }
        logger.info("Student found and details returned!");
        res.status(200).json({
          student: student
        });
      })
      .catch(err => {
        logger.error("Error caught!", err);
        res.status(500).json({
          error: err
        });
      });
  });

router.post("/", [
  check('rollno').exists().isInt(),
  check('rollno').custom(value => {
    return Student.findOne({rollno: value}).then(student => {
      if (student) {
        return Promise.reject('Student with same roll number already exists!');
      }
    });
  }), 
  check('name').exists().isString().trim(),
  check('cgpa').optional().isNumeric(),
  check('department').optional().isString().trim()
],(req, res, next) => {
  
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Bad request", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }  
  
  const student = new Student({ 
      name: req.body.name,
      department: req.body.department,
      rollno: req.body.rollno,
      cgpa: req.body.cgpa
    });
    student
      .save()
      .then(result => {
        logger.info("Student successfully created!", result);
        res.status(201).json({
          message: "Student successfully created!",
          createdStudent: result
        });
      })
      .catch(err => {
        logger.error("Error caught!", error);
        res.status(500).json({
          error: err
        });
      });
  });

  router.post("/register", [
    check('rollno').exists().isInt(), 
    check('companyName').exists().isString().trim()
  ] ,(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Bad request", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }  
  
    const companyName = req.body.companyName;
    const rollno = req.body.rollno;

   Student.findOne({rollno: req.body.rollno}, (err, student) => {
        if (err) {
            logger.error("Bad request", err);
            res.status(400).json({
              error: err
            });
          }else if(student != null){
            Company.findOne({name: companyName}, (err, company) => {
                
                if(err){
                    logger.error("Bad request", err);
                    res.status(400).json({
                        error: err
                    });
                }else if(company != null){
                    Registration.findOne({companyName: companyName, rollno: rollno}, (err, entry) => {
                        if(err){
                            logger.error("Bad request", err);
                            res.status(400).json({
                                error: err
                            });    
                        }else if(entry != null){
                          logger.info("Entry with student name and company already exist!", entry);  
                          res.status(200).json({
                                message: "Already registered for the company!"
                            })
                        }else{
                            const newEntry = new Registration({ 
                                companyName: companyName,
                                rollno: rollno
                              });
                              newEntry
                                .save()
                                .then(result => {
                                  logger.info("Student registration with company succesful!", result);
                                  res.status(201).json({
                                    message: "Registration Successful!",
                                    createdEntry: result
                                  });
                                })
                                .catch(err => {
                                  logger.error("Error caught ", err);
                                  res.status(500).json({
                                    error: err
                                  });
                                });
                        } 
                    })    
                }else{
                    logger.warn("Bad request, company with given name doesn't exist");
                    res.status(404).json({
                        error: "Company with given name doesn't exist!"
                    })
                }                
            })
          }else{
            logger.warn("Student with given roll number doesn't exist");
            res.status(404).json({
                error: "Student with given roll number doesn't exist!"
            })
          }
          
   });
  });

  router.delete("/unregister", [
    check('rollno').exists().isInt(), 
    check('companyName').exists().isString().trim()
  ] ,(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Bad request", errors);
      return res.status(400).json({ errors: errors.array() });
    }  

    const companyName = req.body.companyName;
    const rollno = req.body.rollno;

   Student.findOne({rollno: req.body.rollno}, (err, student) => {
        if (err) {
            logger.error("Bad request", err);
            res.status(400).json({
              error: err
            });
          }else if(student != null){
            Company.findOne({name: companyName}, (err, company) => {
                if(err){
                    logger.error("Bad request", err);
                    res.status(400).json({
                        error: err
                    });
                }else if(company != null){
                    Registration.findOneAndDelete({companyName: companyName, rollno: rollno}, (err, entry) => {
                        if(err){
                            logger.error("Bad request", err);
                            res.status(400).json({
                                error: err
                            });    
                        }else if(entry != null){
                            logger.verbose("Successfully unregistered", entry);
                            res.status(200).json({
                                message: `Successfully unregistered for the drive with the ${companyName}`,
                                deletedEntry: entry
                            })
                        }else{
                            logger.error("No registration record found");  
                            res.status(400).json({
                                error: "No registration found for given records!"
                            })
                        } 
                    })    
                }else{
                    logger.warn("Company with given name doesn't exist");               
                    res.status(404).json({
                        error: "Company with given name doesn't exist!"
                    })
                }                
            })
          }else{
            logger.warn("Student with given name doesn't exist");
            res.status(404).json({
                error: "Student with given roll number doesn't exist!"
            })
          }
          
   });
  });


router.put("/:rollno", [
  check('rollno').exists().isInt(),
  check('rollno').custom(value => {
    return Student.findOne({rollno: value}).then(student => {
      if (!student) {
        return Promise.reject('Student with given roll number doesn\'t exists!');
      }
    });
  })
] ,(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Bad request", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }  

    const rollno = req.params.rollno;
    
    Student.findOneAndUpdate({ rollno },
        req.body,
        { new: true },
        (err, student) => {
        if (err) {
          logger.error("Bad request", err);
          res.status(400).json({
            error: err
          });
        }else{
          logger.verbose("Student record successfully updated", student);
          res.status(200).json({
            message: "Student record successfully updated!"
          });
        }
      });
});

router.delete("/:rollno",[
  check('rollno').exists().isInt(),
  check('rollno').custom(value => {
    return Student.findOne({rollno: value}).then(student => {
      if (!student) {
        return Promise.reject('Student with given roll number doesn\'t exists!');
      }
    });
  })
 ] ,(req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Bad request", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }  
    const rollno = req.params.rollno;
      
    Student.remove({ rollno: req.params.rollno })
      .exec()
      .then(result => {
        logger.verbose("Student deleted successfully", result);
        res.status(200).json({
          message: "Student deleted successfully!"
        });
      })
      .catch(err => {
        logger.error("Error caught", err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;