const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'University API - Nana Adwoa - Level 2' });
});

// Connect the route files
app.use('/api/students',    require('./routes/students'));
app.use('/api/courses',     require('./routes/courses'));
app.use('/api/instructors', require('./routes/instructors'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});