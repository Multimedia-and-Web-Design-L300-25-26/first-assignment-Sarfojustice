# University API - Justice osei sarfo

Level 1 done: GET all and GET by id for students, courses and instructors.

Here is how to run it:
npm install
npm run dev

Endpoints:
- GET /api/students
- GET /api/students/1
- GET /api/courses
- GET /api/courses/201
- GET /api/instructors
- GET /api/instructors/101

Level 2 added:

- GET /api/students/:id/enrollments
- GET /api/students/:id/courses
- GET /api/courses/:id/students
- GET /api/instructors/:id/courses