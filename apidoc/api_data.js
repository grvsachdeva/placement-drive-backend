define({ "api": [
  {
    "type": "post",
    "url": "/api/company/",
    "title": "Register a company for placement drive",
    "name": "RegisterCompany",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique name of the company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the company.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "numVacancies",
            "description": "<p>Number of vacancies. Default is 1.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "createdCompany",
            "description": "<p>Information of the added company.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/company.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "/api/company/:companyName",
    "title": "Get information about a company",
    "name": "ShowCompany",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>Name of the company.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "company",
            "description": "<p>Information of the company.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/company.js",
    "groupTitle": "Company"
  },
  {
    "type": "delete",
    "url": "/api/company/:name",
    "title": "Unregister a company from placement drive",
    "name": "UnregisterCompany",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique name of the company.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "deletedCompany",
            "description": "<p>Information of the deleted company.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/company.js",
    "groupTitle": "Company"
  },
  {
    "type": "delete",
    "url": "/api/student/:rollno",
    "title": "Delete a Student from records",
    "name": "DeleteStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rollno",
            "description": "<p>Roll number of the student.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "deletedEntry",
            "description": "<p>Information of the deleted student record.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/student.js",
    "groupTitle": "Student"
  },
  {
    "type": "get",
    "url": "/api/student/:rollno",
    "title": "Request Student information",
    "name": "GetStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rollno",
            "description": "<p>Student's unique roll number.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "student",
            "description": "<p>Information of the student.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/student.js",
    "groupTitle": "Student"
  },
  {
    "type": "post",
    "url": "/api/student/",
    "title": "Add a Student",
    "name": "PostStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rollno",
            "description": "<p>Roll number of the student.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the student.</p>"
          },
          {
            "group": "Parameter",
            "type": "Department",
            "optional": false,
            "field": "department",
            "description": "<p>Department of the student.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cgpa",
            "description": "<p>CGPA of the student.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "createdStudent",
            "description": "<p>Information of the created Student.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/student.js",
    "groupTitle": "Student"
  },
  {
    "type": "post",
    "url": "/api/student/register",
    "title": "Register a Student for placement drive",
    "name": "RegisterStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rollno",
            "description": "<p>Roll number of the student.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>Name of the company.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "createdEntry",
            "description": "<p>Information of the created entry.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/student.js",
    "groupTitle": "Student"
  },
  {
    "type": "post",
    "url": "/api/student/unregister",
    "title": "Unregister a Student for placement drive",
    "name": "UnregisterStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rollno",
            "description": "<p>Roll number of the student.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>Name of the company.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "deletedEntry",
            "description": "<p>Information of the deleted entry.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/student.js",
    "groupTitle": "Student"
  },
  {
    "type": "put",
    "url": "/api/student/:rollno",
    "title": "Edit a student record",
    "name": "UpdateStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rollno",
            "description": "<p>Roll number of the student.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "updatedRecord",
            "description": "<p>Information of the updated student record.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/student.js",
    "groupTitle": "Student"
  }
] });