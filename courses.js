const express = require('express');
const router = express.Router();

const data = require('../data/data.json');

// GET all courses
router.get('/', (req, res) => {
  res.json(data.courses);
});

// GET one course
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = data.courses.find(c => c.id === id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
});

// Level 2: GET students enrolled in this course
router.get('/:id/students', (req, res) => {
  const courseId = Number(req.params.id);
  
  const courseEnrollments = data.enrollments.filter(e => e.courseId === courseId);
  
  const students = courseEnrollments.map(enrollment => {
    const student = data.students.find(s => s.id === enrollment.studentId);
    if (!student) return null;
    return {
      ...student,
      grade: enrollment.grade,
      status: enrollment.status,
      semester: enrollment.semester
    };
  }).filter(Boolean);

  res.json(students);
});

module.exports = router;