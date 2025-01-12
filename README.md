# Project Management Application

This is a backend implementation of a **Project Management Application** built using **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**. The application supports managing users, projects, and tasks with JWT-based authentication and role-based access control.

## Features
- User authentication and authorization (JWT-based).
- CRUD operations for projects and tasks.
- User-to-project assignments.
- Nested routes for tasks under projects.
- Validation and error handling using middleware.

## Project Structure
The project is organized using industry-standard best practices:

```
├── src
│   ├── app
│   │   ├── controllers
│   │   ├── middlewares
|   |   |── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   ├── config
│   │   └── db.ts
│   └── app.ts
├── .env
├── package.json
└── README.md
```

## Requirements
- **Node.js**: >= 20.x
- **PostgreSQL**: Hosted on [Render](https://render.com).
- **npm**: >= 10.x

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Irshadpp/ProjectManagement.git
cd ProjectManagement
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
Create a `.env` file in the root directory and add the following:
```
PORT=5000
JWT_ACCESS_SECRET=<your_jwt_secret>
DATABASE_URL=<your_render_postgresql_url>
```

### 4. Database setup
Run the following Sequelize commands to set up the database:
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5. Start the server
```bash
npm run dev
```
The application will be available at `http://localhost:5000`.

## API Endpoints
### Users
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/api/v1/user`     | Create a new user         |
| POST   | `/api/v1/user/login` | User login               |

### Projects
| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| GET    | `/api/v1/project`         | Fetch all projects        |
| POST   | `/api/v1/project`         | Create a new project      |
| GET    | `/api/v1/project/:id`     | Fetch a specific project  |
| PATCH  | `/api/v1/project/:id`     | Update a project          |
| DELETE | `/api/v1/project/:id`     | Delete a project          |
| PATCH  | `/api/v1/project/:id/assign-user` | Assign a user to a project |

### Tasks
| Method | Endpoint                        | Description                |
|--------|---------------------------------|----------------------------|
| GET    | `/api/v1/project/:id/task`      | Fetch all tasks for a project |
| POST   | `/api/v1/project/:id/task`      | Create a new task          |
| GET    | `/api/v1/project/:id/task/:id`  | Fetch a specific task      |
| PATCH  | `/api/v1/project/:id/task/:id`  | Update a task              |
| DELETE | `/api/v1/project/:id/task/:id`  | Delete a task              |

## Development Scripts
- **Start server**: `npm run dev`
- **Run tests**: `npm test`

## Testing
You can write unit and integration tests for your application using your preferred testing framework (e.g., Jest or Mocha). Place your test files inside the `tests` directory.

## Future Enhancements
- Add email notifications for task assignments.
- Implement task prioritization.
- Introduce reporting and analytics.

## License
This project is licensed under the MIT License.

---
For questions or suggestions, feel free to open an issue or contact the author.

