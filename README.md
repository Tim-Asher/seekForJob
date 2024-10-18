# SeekForJob

## Project Overview

### Project Name

**SeekForJob**

### Project Description

SeekForJob is a job-seeking and posting platform designed to connect job seekers with employers efficiently. The platform allows users to post job openings, search for job opportunities, and apply for competitions by submitting videos. SeekForJob provides an intuitive user experience for both job seekers and employers while offering a robust backend system for managing users, job postings, and applications.

## Technologies Used

<!-- prettier-ignore -->
| Frontend | Backend | External Services |
|----------|---------|-------------------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![RTK](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white) ![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FF9E00?style=for-the-badge&logo=openweathermap&logoColor=white)  | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white) ![bcrypt](https://img.shields.io/badge/bcrypt-854ABA?style=for-the-badge&logo=crypt&logoColor=white) ![Multer](https://img.shields.io/badge/Multer-FFA500?style=for-the-badge) ![Nodemailer](https://img.shields.io/badge/Nodemailer-000000?style=for-the-badge) |  ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)  |

## Frontend

### Framework and Libraries

- The frontend of the site is built using **Vite** and **React**.
- State management and API interaction are handled using **Redux Toolkit (RTK)**.
-  **Tailwind CSS** is used for styling and responsive design.

### User Interface

- The platform provides an intuitive interface for job seekers to search and apply for jobs, and for employers to post job openings.

### Job Application Process

- Job seekers can apply to job postings by submitting video applications.
- File handling is managed by **Multer**, ensuring smooth uploads for images and resumes.

## Backend

### Server and Framework

- The backend is built using **Node.js** and **Express** to handle all server-side operations.

### Database

- **MongoDB** is used for data storage, with **Mongoose** managing data models and relationships between users, jobs, and applications.
  
### User Authentication

- **JWT** (JSON Web Tokens) is used for managing user sessions and handling authentication securely.
- Passwords are hashed using **bcrypt** to ensure security.

### File Handling

- **Multer** is used to handle images uploads, which are then stored on **FireBase** for efficient media management.

## Dashboard

### User Roles

- Roles are assigned as employer, or job seeker, with each having specific permissions on the platform.
- Employers have access to a dashboard where they can post jobs, manage applications, and view analytics.

## Deployment

### Hosting

- The backend is hosted on **Render** for scalability, while the frontend is hosted on **Netlify**.

## Documentation Sections

### Endpoints

```
/api/
├── /users
|  ├── /getUsers                      - [GET] Get a list of all users
|  ├── /register                      - [POST] Register a new user
|  ├── /login                         - [POST] Log in an existing user
|  ├── /logOut                        - [GET] Log out the current user
|  ├── /forgotPassword                - [POST] Initiate password reset
|  ├── /resetPassword/:plainResetToken- [POST] Reset password using token
|  ├── /validateToken                 - [GET] Validate the current user's token
|  ├── /getUser                       - [GET] Get user by ID (protected)
|  ├── /me                            - [GET] Get logged-in user's details (protected)
|  ├── /updateProfilePicture          - [PUT] Update the profile picture (protected)
|  ├── /updateUser                    - [PATCH] Update user profile (protected)
|  ├── /rate                          - [PATCH] Rate a user (protected)
|  ├── /ratings                       - [GET] Get candidate's ratings
|  ├── /getUserCv                     - [POST] Get user's CV (protected)
|  ├── /apply/:jobId                  - [POST] Apply to a job by job ID (protected)
|  ├── /notifications/read/:notificationId
                                   - [PATCH] Mark a notification as read (protected)
|  ├── /deleteNotifications          - [DELETE] Delete all notifications (protected)
│
├── /jobs
|  ├── /random-jobs                                - [GET] Fetch a list of random jobs
|  ├── /getAllJobs                                 - [GET] Get all available jobs
|  ├── /createJobByEmployer                        - [POST] Create a new job posting (protected)
|  ├── /editJobByEmployer/:_id                     - [PATCH] Edit a job posting by employer (protected)
|  ├── /deleteJob/:id                              - [DELETE] Delete a job posting by employer (protected)
|  ├── /getJobById/:jobId                          - [GET] Get job details by job ID
|  ├── /getAllJobsByEmployerId/:employerId         - [GET] Get all jobs posted by a specific employer
|  ├── /jobs/getEmployerJobsWithCandidates         - [GET] Get jobs posted by the employer with associated candidates
|  ├── /jobs/:jobId/candidates                     - [GET] Get filtered candidates for a specific job
|  ├── /jobs-for-candidate/:userId                 - [GET] Get job postings relevant to a specific candidate
|  ├── /applyToJob/:jobId                          - [POST] Apply to a specific job (protected)
|  ├── /:jobId/applications/:userId                - [DELETE] Delete a candidate’s job application (protected)
|  ├── /statistics                                 - [GET] Get job statistics (e.g., total number of jobs, applications)
|  ├── /search                                     - [POST] Search for jobs based on keywords, location, etc.
|  ├── /updateCandidateStatus                      - [PATCH] Update the status of a candidate's job application (protected)
|
├── /otp
|  ├── /sendOtp                                 - [POST] Send OTP to user (protected)
|  ├── /validateOtp                             - [POST] Validate the OTP provided by the user
|
├── /cvs
|  ├── /uploadCv                             - [POST] Upload a CV (protected)
|  ├── /getUserCvs                           - [GET] Get all CVs of the authenticated user (protected)
|  ├── /deleteCv/:id                         - [DELETE] Delete a specific CV by ID (protected)
|  ├── /downloadCv/:fileName                 - [GET] Download a specific CV by file name (protected)

```

### Installation and Setup

1. Frontend-

```bash
npm install # to install all dependecies
npm run build # to build the react app
npm run dev # to satrt dev react app
```

2. Backend-

First create .env file regardes to the format and add it to the backend folder.

```bash
MONGO_DB_ATLAS= # your_mongodb_server
MONGO_DB_ATLAS_PASSWORD= # your_password
MONGO_DB_ATLAS_USERNAME= # your_username
JWT_SECRET= # your_jwt_secret
JWT_EXPIRES_IN=14d
EMAIL_HOST= # your_email_host
EMAIL_USER= # your_email_user
EMAIL_PORT= # your_email_port 
EMAIL_PASSWORD= # your_email_password
IP= # your_website_ip
```

```bash
npm install # to install all dependecies
npm start # to run nodemon dev app
node server.js # when running the app in production mode
```

### Code Quality and Organization

1. **Consistent Folder Structure**: The project adheres to a standardized folder structure, facilitating easy navigation and organization. This approach enhances maintainability, allowing developers to quickly locate files, debug issues efficiently, and implement changes or expansions as needed.

2. **Comprehensive Schema Validation**: All backend schema validations are mirrored in the frontend to minimize errors and reduce the likelihood of invalid requests from clients. This dual-layer validation approach ensures data integrity and improves the overall robustness of the application.

3. **Adherence to Coding Guidelines**: All coding practices follow specific guidelines designed to ensure uniformity and readability across the codebase. This consistency not only aids current developers in understanding the code but also streamlines onboarding for new team members.

4. **Extensive Code Comments**: Each code block is supplemented with meaningful comments to explain its purpose and functionality. This documentation is invaluable for future developers, providing clarity and context that facilitate quicker understanding and modification of the code.

5. **Prettier and Linting Compliance**: All files have undergone Prettier and linting processes to maintain consistency with the coding standards of other developers. This practice ensures that the code remains clean, readable, and free of common errors, fostering a collaborative and efficient development environment.
