const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  moduleCode: String,        
  moduleName: String,        
  grade: String              
}, { _id: false });

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  fullName: String,
  balance: Number,
  grades: [gradeSchema]
});

module.exports = mongoose.model('Student', studentSchema);