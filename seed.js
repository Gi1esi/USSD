// seed.js
const mongoose = require('mongoose');
const Student = require('./models/Student'); // use correct casing
require('dotenv').config(); // if you're using a .env file

const dbURL = process.env.DB_URL || 'your-mongodb-uri-here';

mongoose.connect(dbURL)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Insert multiple students
    const students = [
      {
        studentId: '2021/1234',
        fullName: 'Grace Gausi',
        balance: 25000,
        grades: [
          { moduleCode: 'CS101', moduleName: 'Intro to CS', grade: 'A' },
          { moduleCode: 'IS201', moduleName: 'Systems Analysis', grade: 'B+' }
        ]
      },
      {
        studentId: '2021/5678',
        fullName: 'Olivia Mkandawire',
        balance: 10000,
        grades: [
          { moduleCode: 'CS102', moduleName: 'Data Structures', grade: 'A-' }
        ]
      }
    ];

    await Student.insertMany(students);
    console.log('Students inserted successfully');
    process.exit();
  })
  .catch(err => {
    console.error('Error connecting or inserting:', err);
    process.exit(1);
  });
