const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data/data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Helper to save data (for POST/PUT/DELETE)
function saveData() {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Level 1: Basic Students CRUD
app.get('/api/students', (req, res) => {
  res.json(data.students.filter(s => s.active)); // only active students
});

app.get('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = data.students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// Add more CRUD + other entities here later...

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
  console.log('Test: curl http://localhost:3000/api/students');
});