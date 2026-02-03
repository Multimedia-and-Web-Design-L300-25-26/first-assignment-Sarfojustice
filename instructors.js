const express = require('express');
const router = express.Router();

const data = require('../data/data.json');

// GET all instructors
router.get('/', (req, res) => {
  res.json(data.instructors);
});

// GET one instructor
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const instructor = data.instructors.find(i => i.id === id);
  if (!instructor) {
    return res.status(404).json({ error: 'Instructor not found' });
  }
  res.json(instructor);
});

// Level 2: GET courses taught by this instructor
router.get('/:id/courses', (req, res) => {
  const instructorId = Number(req.params.id);
  const courses = data.courses.filter(c => c.instructorId === instructorId);
  res.json(courses);
});

module.exports = router;