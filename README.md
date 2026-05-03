# LinkUp — Social Media Platform

A full-stack social media application with post creation, media uploads, likes, comments, follow system, and user profiles.

**Live:** Deployed on AWS EC2 via Docker Compose + Nginx reverse proxy.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4, MUI Icons |
| Backend | Node.js, Express 5, TypeScript, Mongoose |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary CDN |
| Auth | JWT (jsonwebtoken + bcrypt) |
| Validation | Zod |
| File Uploads | Multer (disk) → Cloudinary |
| Reverse Proxy | Nginx |
| Containers | Docker, Docker Compose |
| Hosting | AWS EC2 |
| CI/CD | GitHub Actions (3 workflows) |

---

## Architecture

```
Browser
  └─► Nginx (port 80)
        ├─► /*        → Next.js frontend (port 3000)
        └─► /api/*    → Express backend  (port 3001)
                            ├─► MongoDB Atlas
                            └─► Cloudinary CDN
```

All three services (nginx, frontend, backend) run as Docker containers orchestrated by Docker Compose.

---

## Features (Current)

- [x] User registration and login (JWT auth)
- [x] Create posts with text and up to 12 images/videos
- [x] Like / unlike posts
- [x] Comment on posts, delete comments
- [x] User profile with cover photo, profile photo, bio, location
- [x] Inline photo upload for cover and profile pictures
- [x] Edit profile (name, email, bio, location)
- [x] Profile tabs: Posts, Liked, Media (stub)
- [x] Follow/unfollow API (backend only, not wired to UI)
- [x] Global feed sorted by newest first
- [x] Responsive layout (desktop sidebar + mobile bottom nav)
- [x] Dark theme with custom CSS variables
- [x] Dockerized deployment with Nginx reverse proxy
- [x] CI/CD pipeline (build, release, deploy)

---

## Project Structure

```
social-media-app/
├── client/                 # Next.js 15 frontend
│   ├── src/
│   │   ├── app/            # Pages (login, register, dashboard, profile, message)
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # AuthContext
│   │   └── lib/            # Axios instance
│   ├── styles/             # globals.css (Tailwind + theme)
│   ├── public/             # Static assets
│   └── Dockerfile
├── server/                 # Express 5 backend
│   ├── src/
│   │   ├── controllers/    # Business logic (user, post, follow)
│   │   ├── models/         # Mongoose schemas (user, post, comment, follower)
│   │   ├── routes/         # Route definitions
│   │   ├── middleware/      # Auth middleware, Multer config
│   │   ├── utils/          # Cloudinary upload helper
│   │   └── config/         # DB connection
│   └── Dockerfile
├── nginx/                  # Nginx reverse proxy config
│   ├── default.conf
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/      # CI, Release, CD pipelines
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm
- Docker & Docker Compose (for containerized run)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repo
```bash
git clone https://github.com/aatishbhardwaj/social-media-app.git
cd social-media-app
```

### 2. Backend setup
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=3001
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/linkup
JWT_SECRET=<your-secret-key>
CLOUDINARY_NAME=<your-cloud-name>
CLOUDINARY_KEY=<your-api-key>
CLOUDINARY_SECRET=<your-api-secret>
```

Start the backend:
```bash
npm run go    # watch mode (dev)
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_BASEURL=http://localhost:3001
```

Start the frontend:
```bash
npm run dev
```

### 4. Docker (production-like)
```bash
# Build frontend and backend first
cd client && npm run build && cd ..
cd server && npm run build && cd ..

# Run with Docker Compose
IMAGE_TAG=latest docker compose up -d
```

---

## API Endpoints

### Users — `/api/users`
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/signup` | No | Register a new user |
| POST | `/signin` | No | Login, returns JWT |
| GET | `/me` | Yes | Get own profile + posts + liked posts |
| PATCH | `/me` | Yes | Update profile (JSON or multipart) |
| GET | `/all_user` | Yes | List all users |

### Posts — `/api/posts`
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/create` | Yes | Create post with text + media |
| GET | `/all` | Yes | Get all posts with comments |
| DELETE | `/delete_post/:id` | Yes | Delete a post |
| PATCH | `/like_post/:id` | Yes | Like a post |
| PATCH | `/unlike_post/:id` | Yes | Unlike a post |
| POST | `/comment/:id` | Yes | Add comment to a post |
| DELETE | `/delete_comment/:pid/:cid` | Yes | Delete a comment |

### Follow — `/api/follow`
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/:id` | Yes | Follow a user |
| POST | `/unfollow/:id` | Yes | Unfollow a user |

---

## Data Model

```
users       → _id, name, email, password, profilePhoto, coverPhoto, bio, location, followerCount, followingCount
posts       → _id, author→user, caption, mediaUrl[{type,url}], like[→user]
comments    → _id, author→user, postId→post, text
followers   → _id, follower→user, following→user  (unique compound index)
```

---

## Known Issues

See `summary.md` for a detailed breakdown. Key items:
- JWT secret hardcoded in signin (should use env var)
- No `return` after invalid password check in signin
- Comments not cleaned up on post delete (wrong field name)
- N+1 query on feed (optimized version exists but not wired)
- No pagination
- Follow button not connected to API on frontend
- No ownership check on post/comment delete

---

## CI/CD

| Workflow | Trigger | What it does |
|----------|---------|-------------|
| CI | Every push/PR | Builds backend + frontend, runs lint |
| Release | Manual | Builds Docker images, pushes to Docker Hub |
| CD | Manual | SSHs into EC2, pulls images, restarts containers |
