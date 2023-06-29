# School-Management-System

## Installation and Run locally

Start by cloning
```bash
  git clone https://github.com/gaonkarBhai/School-Management-System.git
  cd School-Management-System
```
Run with npm
```bash
  npm i
  npm start
```
## End-Points

| Route                          | Description                                            |
|--------------------------------|--------------------------------------------------------|
| `/api/v1/admins`               | Handles CRUD operations for administrators             |
| `/api/v1/teachers`             | Manages teacher information and actions                |
| `/api/v1/students`             | Handles student-related operations                     |
| `/api/v1/academic-years`       | Manages academic years and their associated data        |
| `/api/v1/academic-terms`       | Handles academic term information and actions           |
| `/api/v1/class-levels`         | Manages different class levels                          |
| `/api/v1/programs`             | Handles program information and actions                |
| `/api/v1/subjects`             | Manages subjects and their details                      |
| `/api/v1/year-groups`          | Handles year group-related operations                   |
| `/api/v1/exams`                | Manages exams and related data                          |
| `/api/v1/questions`            | Handles questions for exams and related actions         |
| `/api/v1/results`              | Manages exam results and associated data                |

<!-- 
### Admin

- -



### Teacher

#### POST /api/v1/teachers/register

- Description: Register a new teacher
- Access: Admin only
- Body Parameters: name (string), email (string), password (string)

#### POST /api/v1/teachers/login

- Description: Login as a teacher
- Body Parameters: email (string), password (string)

#### GET /api/v1/teachers

- Description: Get all teachers
- Access: Admin only

#### GET /api/v1/teachers/profile

- Description: Get teacher profile
- Access: Teacher only

#### PUT /api/v1/teachers/profile

- Description: Update teacher profile
- Access: Teacher only
- Body Parameters: name (string), email (string), password (string) [optional]

#### GET /api/v1/teachers/:teacherID

- Description: Get a single teacher by ID
- Access: Admin only
- URL Parameters: teacherID (string)

#### PUT /api/v1/teachers/:teacherID

- Description: Admin updates teacher details
- Access: Admin only
- URL Parameters: teacherID (string)
- Body Parameters: program (string), classLevel (string), academicYear (string), subject (string)

#### Controllers

- `registerTeacher`: Register a new teacher
- `loginTeacher`: Login as a teacher
- `getAllTeacher`: Get all teachers
- `getSingleTeacher`: Get a single teacher by ID
- `getTeacherProfile`: Get teacher profile
- `updateTeacherProfile`: Update teacher profile
- `adminUpdatingTeacherProfile`: Admin updates teacher details

Please note that appropriate authentication and authorization middlewares are in place for each route.



### Student
- - -->