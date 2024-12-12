# CS348-project
Task Management Application
Overview
This is a full-stack task management application that allows users to:

Create tasks with categories.
View and filter tasks dynamically by category and user.
Update task statuses and delete tasks.
The project uses MongoDB as the database, Express.js for the backend, and React for the frontend.

Features
Add Users: Create new users with a unique ID and email.
Add Categories: Define task categories dynamically.
Add Tasks: Create tasks and associate them with users and categories.
Filter Tasks: Filter tasks dynamically by user and category.
Update and Delete Tasks: Update task completion status and delete tasks.
Technical Tools Used
MongoDB: NoSQL database to store tasks, users, and categories.
Mongoose: MongoDB ORM for simplified database interactions.
Express.js: Backend framework for RESTful API development.
React: Frontend library for building the user interface.
Node.js: JavaScript runtime environment for server execution.
Postman: API testing tool during development.
MongoDB Compass: GUI for managing and visualizing MongoDB data.
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone [repository-url]
cd task-management-app
2. Install Dependencies
Install backend and frontend dependencies.

Backend:

bash
Copy code
cd backend
npm install
Frontend:

bash
Copy code
cd frontend
npm install
3. Start the Application
Run the Backend Server:

bash
Copy code
cd backend
node server.js
The server will start on http://localhost:3001.

Run the Frontend:

bash
Copy code
cd frontend
npm start
The frontend will run on http://localhost:3000.

4. MongoDB Setup
Ensure MongoDB is installed and running on localhost:27017.
Use MongoDB Compass or the CLI to verify the database test and collections (users, categories, and todos).
API Endpoints
User Routes
Add a User:
POST /add-user
Body: { student_id, username, email }
Category Routes
Get Categories:
GET /get-categories

Add a Category:
POST /add-category
Body: { name, description, user_id }

Task Routes
Get Tasks:
GET /get

Add a Task:
POST /add
Body: { task, user_id, category_id }

Update a Task:
PUT /update/:id

Delete a Task:
DELETE /delete/:id

Filter Tasks:
GET /filter-tasks
Query: ?user_id=xxx&category_id=yyy

Lessons Learned
Simplified database interactions using Mongoose.
Integrated a dynamic UI that retrieves data from MongoDB.
Learned to structure backend APIs efficiently using Express.js.
Improved understanding of transactions and query optimization using indexes.
Future Improvements
Add user authentication for better security.
Implement multi-user concurrency with MongoDB transactions.
Deploy the application to a cloud provider like AWS or GCP.
