const express = require('express')
require('dotenv').config();
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/Student');



mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });

app.set('view engine', 'ejs');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    const dataarray = text.split("*");
    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. View Grades
        2. Check Balance`;
    } else if(text == '1' || text == '2'){
        response = `CON Enter your registration number
        `;
    } else if(dataarray[1] != '' && dataarray[0] == '1'){
        const registration_number = dataarray[1];
        const student = Student.findOne({ studentId: registration_number });

        if (!student) {
            response = `CON Registration number not found
        `;
        }

        else{
            response = `END Name: ${student.fullName}\nGrades:\n`;

            student.grades.forEach((g) => {
            response += `${g.moduleCode}: ${g.grade}\n`;
            });
        }  

    } else if(dataarray[1] != '' && dataarray[0] == '2'){
        const registration_number = dataarray[1];
         Student.findOne({ studentId: registration_number })
        .then(student => {
        if (!student) {
            response = `CON Registration number not found`;
        } else {
            response = `END Name: ${student.fullName}\nBalance: MWK ${student.balance}`;
        }

        // Send the response from here, since you can't use it outside
        res.send(response);
        })
        .catch(err => {
        console.error('Error fetching student:', err);
        res.send('END An error occurred. Try again later.');
        });

    }
    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

//routing path
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Start the server
app.listen(3002, () => {
  console.log('Server started on port 3002');
});

