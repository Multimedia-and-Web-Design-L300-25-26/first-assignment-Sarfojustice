const express = require('express');
const router = express.Router();

const data = require('../data/data.json');

// GET all students
router.get('/', (req, res) => {
  res.json(data.students);
});

// GET one student
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = data.students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

// ── Level 2 starts here ──

// GET student's enrollments
router.get('/:id/enrollments', (req, res) => {
  const studentId = Number(req.params.id);
  const enrollments = data.enrollments.filter(e => e.studentId === studentId);
  res.json(enrollments);
});

// GET student's courses (with some extra info)
router.get('/:id/courses', (req, res) => {
  const studentId = Number(req.params.id);
  
  // Find all enrollments for this student
  const studentEnrollments = data.enrollments.filter(e => e.studentId === studentId);
  
  // Get course details for each enrollment
  const courses = studentEnrollments.map(enrollment => {
    const course = data.courses.find(c => c.id === enrollment.courseId);
    if (!course) return null;
    return {
      ...course,
      grade: enrollment.grade,
      status: enrollment.status,
      semester: enrollment.semester,
      enrollmentDate: enrollment.enrollmentDate
    };
  }).filter(Boolean); // remove any nulls

  res.json(courses);
});

module.exports = router;