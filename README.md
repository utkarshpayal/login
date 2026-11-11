# login

A simple full-stack login / signup example: a React + Vite + Tailwind CSS frontend talking to an Express + MongoDB backend that hashes passwords with bcrypt and issues JWTs.

## Features

- **Sign up** with email and password; duplicate emails are rejected (HTTP 409) and passwords are hashed with bcrypt before being stored.
- **Log in** with email and password; on success the backend signs a JWT (valid for 2 hours) and returns it in the JSON response and in an HTTP-only `token` cookie.
- **Frontend pages** – Home, Login and Signup, with a navbar and footer; errors are shown with browser alerts.

## Tech Stack

| Part     | Technologies |
| -------- | ------------ |
| Frontend | React 18, Vite 5, React Router v6, Axios, Tailwind CSS |
| Backend  | Node.js, Express 4, Mongoose 8, bcrypt, jsonwebtoken, cookie-parser, cors, nodemon |
| Database | MongoDB |

## Project Structure

```
backend/
├── app.js     # Express server: /login and /signup routes (port 5000)
└── mongo.js   # MongoDB connection and user model (email, password)
frontend/
├── src/
│   ├── App.jsx            # Routes: /, /login, /signup
│   ├── Components/        # Navbar, Footer
│   └── Pages/             # Home, Login, Signup
└── vite.config.js
```

## API

The backend listens on `http://localhost:5000`.

| Method | Path      | Body                  | Responses |
| ------ | --------- | --------------------- | --------- |
| POST   | `/login`  | `{ email, password }` | `200` with `{ success, token, user }` and a `token` cookie; `401` `"invalid_credentials"`; `500` on server error |
| POST   | `/signup` | `{ email, password }` | `409` `"exists"` if the email is taken; otherwise `"notexists"` |

## Prerequisites

- Node.js and npm
- A MongoDB server running locally on the default port (`27017`)

## Setup and Running

### Backend

```bash
cd backend
npm install
npm start      # runs `nodemon app.js` on port 5000
```

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the URL printed by Vite (by default `http://localhost:5173`).

### Frontend scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite dev server         |
| `npm run build`   | Build for production into `dist/` |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

## Configuration

There are no environment variables. The following values are hard-coded and need to be edited in the source if you want to change them:

- MongoDB connection string – `backend/mongo.js` (local MongoDB, database `login`)
- JWT signing secret – `backend/app.js` (should be moved to an environment variable before any real use)
- Backend port (`5000`) – `backend/app.js`
- Backend URL used by the frontend (`http://localhost:5000`) – `frontend/src/Pages/Login.jsx` and `frontend/src/Pages/Signup.jsx`

## Notes

- The `/signup` route sends its `"notexists"` response before creating the user, so the later `201` response cannot be sent (needs confirmation that users are still saved as expected).
- The Home page shows "Not logged in" unless it receives `loggedIn` and `userEmail` in the router state, while the Login/Signup pages navigate with `{ id: email }`, so the logged-in message may not appear (needs confirmation).
