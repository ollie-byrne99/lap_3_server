# Hello
# Lap 3 Client - To do list App


THIS IS THE BACK END. PLEASE SEE  RemnantEcho/Client

Progfolio is a web application that helps users manage their personal objectives and tasks using a calendar. Users can create an account, log in, and keep track of their tasks, marking them as incomplete, in progress, or completed.

## Features

- **User Registration**: Users can create an account with a unique username and password.
- **User Authentication**: Secure user authentication and login system.
- **Calendar View**: Display tasks on a calendar for easy visualization and tracking of progress.
- **Task Management**: Add, edit, and delete tasks.
- **Task Status**: Set task status as incomplete, in progress, or completed.
- **User Profile**: Update user profile information.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

OR run docker-compose up when in the global folder for this project.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-tracker-app.git
Install project dependencies:

bash
Copy code
cd task-tracker-app
npm install
Configure environment variables by creating a .env file in the project root:

makefile
Copy code
PORT=3000
DATABASE_URL=your_own_mongodb_instance
TOKEN_SECRET=your-secret-key
Update the values accordingly.

Start the application:

bash
Copy code
npm start
The app will be running at http://localhost:3000.

Usage
User Registration: Create a new user account by clicking on the "Register" link and providing a unique username and password.

User Login: Log in with your username and password.

Dashboard: View and manage your tasks on the dashboard.

Calendar View: Click on the calendar icon to view your tasks in a calendar format.

Task Management: Add new tasks, edit existing tasks, and mark tasks as incomplete, in progress, or completed.

Development
If you'd like to contribute to this project, please follow these guidelines:

Fork the repository on GitHub.
Create a new branch with a descriptive name for your feature or bug fix.
Make your changes and commit them with clear commit messages.
Push your branch to your fork on GitHub.
Submit a pull request to the original repository.
