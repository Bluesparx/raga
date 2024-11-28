# ZENZONE - A Mental Health Application

[Deployed](https://zen-zone-raga.vercel.app)

A comprehensive mental health platform built with the MERN stack, enabling users to track mood and sleep, participate in a supportive community, and enjoy a built-in joke generator to boost their mood.

![Main Screenshot](https://github.com/user-attachments/assets/30d45d6b-2e21-407c-b175-793629cd8957)

## Features

### Mood & Sleep Tracker
Log daily mood and sleep patterns, and view detailed analytics.

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/1911bf87-ee17-4121-811f-c553b54b21bb" alt="Mood Tracker" width="60%" />
</div>

### Community
Read and like mental health-related articles. Engage with others through posts and discussions.

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/109acdab-1ec9-4c7d-8ce3-14d1b10c3bd8" alt="Community" width="60%" />
</div>

### Joke Generator
Uplift your mood with random jokes.

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/1e0eeaa7-e64c-470f-9ea9-53c0d841e7ac" alt="Joke Generator" width="60%" />
</div>

### Analytics Dashboard
Visualize mood and sleep trends over time.
| ![Analytics Dashboard 1](https://github.com/user-attachments/assets/99490098-0be6-4c5e-9160-ba536e726a42) | ![Analytics Dashboard 2](https://github.com/user-attachments/assets/40412929-4c37-45fa-a820-bf0419ba4388) |
|:--:|:--:|
| Mood Calendar | Mood Graph |

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/ba87e52d-a208-48f0-9433-62a27d9cf03e" alt="Analytics Dashboard 3" width="60%" />
</div>


## Tech Stack

- **Frontend:** React, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, JWT Authentication
- **Database:** MongoDB for storing user data, posts, mood/sleep logs.

## File structure 
 
 ``` 
├── CONTRIBUTING.md
├── backend
│   ├── DB
│   │   └── Database.js
│   ├── Dockerfile
│   ├── Routers
│   │   ├── moodAnalysis.js
│   │   ├── moodRoutes.js
│   │   ├── postRoutes.js
│   │   ├── sleepRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   ├── constants.js
│   ├── controllers
│   │   ├── moodController.js
│   │   ├── postController.js
│   │   ├── sleepController.js
│   │   └── userController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── MoodModel.js
│   │   ├── PostModel.js
│   │   ├── SleepModel.js
│   │   └── UserModel.js
│   ├── package-lock.json
│   └── package.json
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── README.md
│   ├── components.json
│   ├── database-debug.log
│   ├── dataconnect
│   │   ├── connector
│   │   │   ├── connector.yaml
│   │   │   ├── mutations.gql
│   │   │   └── queries.gql
│   │   ├── dataconnect.yaml
│   │   └── schema
│   │       └── schema.gql
│   ├── dataconnect-debug.log
│   ├── dataconnect-generated
│   │   └── js
│   │       └── default-connector
│   │           ├── esm
│   │           │   ├── index.esm.js
│   │           │   └── package.json
│   │           ├── index.cjs.js
│   │           ├── index.d.ts
│   │           └── package.json
│   ├── eslint.config.js
│   ├── firebase.json
│   ├── firestore-debug.log
│   ├── index.css
│   ├── index.html
│   ├── nginx.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── 404.html
│   │   ├── enso.svg
│   │   ├── index.html
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   ├── meditation.mp3
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── AboutUs.jsx
│   │   │   ├── AddPost.jsx
│   │   │   ├── ContactUsForm.jsx
│   │   │   ├── DiscreteSliderMarks.jsx
│   │   │   ├── ModalMood.jsx
│   │   │   ├── MoodCalendar.jsx
│   │   │   ├── MoodGraph.jsx
│   │   │   ├── Navbar2.jsx
│   │   │   ├── NavbarDemo.jsx
│   │   │   ├── Pages
│   │   │   │   ├── AboutUsPage.jsx
│   │   │   │   ├── Breathing.jsx
│   │   │   │   ├── ContactUsPage.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── JokeGenerator.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── MoodCalendarPage.jsx
│   │   │   │   ├── MoodDemo.jsx
│   │   │   │   ├── MoodGraphPage.jsx
│   │   │   │   ├── MoodLogger.jsx
│   │   │   │   ├── PageNotFound.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   ├── SleepGraphPage.jsx
│   │   │   │   └── SleepTracker.jsx
│   │   │   ├── PostForm.jsx
│   │   │   ├── PostList.jsx
│   │   │   ├── Postitem.jsx
│   │   │   ├── SleepGraph.jsx
│   │   │   ├── ThreeDCardDemo.jsx
│   │   │   ├── VortexDemoSecond.jsx
│   │   │   ├── WavyBackgroundDemo.jsx
│   │   │   ├── shimmer.css
│   │   │   └── ui
│   │   │       ├── 3d-card.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── modal.jsx
│   │   │       ├── navbar-menu.jsx
│   │   │       ├── vortex.jsx
│   │   │       └── wavy-background.jsx
│   │   ├── index.css
│   │   ├── lib
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   └── utils
│   │       ├── apiRequest.js
│   │       ├── authProvider.jsx
│   │       ├── navbarSwitch.jsx
│   │       └── useAuthContext.js
│   ├── storage.rules
│   ├── tailwind.config.js
│   ├── vercel.json
│   ├── vite.config.js
│   └── y
│       ├── 404.html
│       └── index.html
├── package-lock.json
├── readme.md
└── sentimentmodel.py
 ```
 
## Setup Instructions
1. Clone the repository and install dependencies in both backend and frontend folder.
2. Install dependencies of both directories:
   
   ```bash
   npm install
4. Create a .env file in the backend folder and add the following variables:
   
   ```plaintext
   MONGO_URI=<your_mongo_uri>
   JWT_SECRET=<your_jwt_secret>
5. Create a .env file in the frontend folder and add the following variables:
   ```plaintext
   VITE_REACT_APP_API_KEY= 
   VITE_REACT_APP_AUTH_DOMAIN= 
   VITE_REACT_APP_PROJECT_ID= 
   VITE_REACT_APP_STORAGE_BUCKET= 
   VITE_REACT_APP_MESSAGING_SENDER_ID= 
   VITE_REACT_APP_APP_ID= 
   VITE_REACT_APP_MEASUREMENT_ID= 
   VITE_REACT_APP_API_HOST=https://zenzone.onrender.com

5. Start the server and client app.
   
   ```bash
   npm run dev
### Docker Setup
1. Add your JWT_SECRET and MONGO_URI to the docker-compose.yml file
```bash
services:
  raga-ui:
    init: true
    build: ./frontend
    ports:
      - "3000:80"
  
  raga-backend:
    init: true
    build: ./backend
    environment:
      - PORT=8080
      - JWT_SECRET=secret
      - MONGO_URI=urmongouri
    ports:
      - "8080:8080"
```
2. Run command
   ```bash
   docker compose up
   ```
