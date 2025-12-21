Social Media Projects

 * mkdir client server
 * touch README.md
 * inside client -> npx create-next-app@latest .

Creating a new Next.js app
✔ Would you like to use TypeScript? … No / Yes
✔ Which linter would you like to use? › ESLint
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack? (recommended) … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*



try to follow this
react tostifier

social-media-app/
│
├── .gitignore
├── .dockerignore
├── docker-compose.yml
├── README.md
│
├── client/                             # Next.js frontend (TypeScript + MUI + Tailwind)
│   ├── .env.local                      # Environment variables for client
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── public/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── default-avatar.png
│   │   │   └── banner.jpg
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   └── src/
│       ├── app/                        # Next.js app router (v13+)
│       │   ├── layout.tsx
│       │   ├── globals.css             # Tailwind global styles
│       │   ├── page.tsx
│       │   ├── login/
│       │   │   └── page.tsx
│       │   ├── signup/
│       │   │   └── page.tsx
│       │   ├── profile/
│       │   │   └── page.tsx
│       │   └── dashboard/
│       │       └── page.tsx
│       │
│       ├── components/
│       │   ├── forms/
│       │   │   ├── LoginForm.tsx
│       │   │   └── SignupForm.tsx
│       │   ├── layout/
│       │   │   ├── Navbar.tsx
│       │   │   ├── Sidebar.tsx
│       │   │   └── Footer.tsx
│       │   └── ui/
│       │       ├── Button.tsx
│       │       ├── Input.tsx
│       │       └── Avatar.tsx
│       │
│       ├── styles/
│       │   ├── theme.ts                # MUI theme customization
│       │   └── mixins.css              # Any global reusable classes
│       │
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useToast.ts
│       │   └── useFetch.ts
│       │
│       ├── lib/
│       │   ├── axiosInstance.ts
│       │   ├── constants.ts
│       │   ├── auth.ts
│       │   └── storage.ts              # handles localStorage/token
│       │
│       ├── context/
│       │   └── AuthContext.tsx
│       │
│       └── types/
│           ├── user.d.ts
│           ├── post.d.ts
│           └── common.d.ts
│
│
└── server/                             # Node.js + Express + MongoDB backend
    ├── .env                            # Backend environment variables
    ├── package.json
    ├── tsconfig.json
    ├── Dockerfile
    │
    ├── src/
    │   ├── app.ts                      # Express app setup
    │   ├── index.ts                    # Server start
    │
    │   ├── config/
    │   │   ├── db.ts                   # MongoDB connection
    │   │   ├── env.ts                  # Env variable handling
    │   │   └── logger.ts               # Winston logger setup
    │
    │   ├── models/
    │   │   ├── User.ts
    │   │   ├── Post.ts
    │   │   ├── Comment.ts
    │   │   └── Notification.ts
    │
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── userController.ts
    │   │   ├── postController.ts
    │   │   └── uploadController.ts
    │
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── userRoutes.ts
    │   │   ├── postRoutes.ts
    │   │   └── uploadRoutes.ts
    │
    │   ├── middleware/
    │   │   ├── authMiddleware.ts
    │   │   ├── errorHandler.ts
    │   │   └── rateLimiter.ts
    │
    │   ├── services/
    │   │   ├── mailService.ts          # for OTP/verification
    │   │   ├── fileUploadService.ts
    │   │   └── tokenService.ts
    │
    │   ├── utils/
    │   │   ├── generateToken.ts
    │   │   ├── hashPassword.ts
    │   │   ├── validateEmail.ts
    │   │   └── constants.ts
    │
    │   ├── types/
    │   │   ├── user.d.ts
    │   │   ├── post.d.ts
    │   │   └── index.d.ts
    │
    │   ├── tests/
    │   │   ├── auth.test.ts
    │   │   └── user.test.ts
    │   │
    │   └── uploads/                    # temporary file storage (local)
    │
    └── logs/
        ├── app.log
        └── error.log






https://git-scm.com/cheat-sheet#prepare-to-commit


# Social Media Platform – Full Feature List

## 1. Authentication & Authorization
- User signup with email/password (JWT + refresh token)
- User signin with email/password
- Google OAuth login
- Next.js-based signin option
- JWT stored in HTTP-only cookies / localStorage
- Role-based access control (User, Admin)
- Middleware for protected routes
- Email verification flow (optional enhancement)

## 2. User Profile
- User profile page with:
  - Avatar
  - Cover photo
  - Bio / personal info
  - User posts
  - Liked posts
  - Media gallery (images, videos)
- Edit profile info
- View other user profiles

## 3. Social Graph: Friends & Blocking
- Send friend request
- Accept / reject friend request
- Display notifications for friend requests
- Block a user (full restriction):
  - Cannot message
  - Cannot send friend request
  - Cannot view posts/profile
  - Hidden from search and suggestions

## 4. Newsfeed & Posts
- Create post (text, images, videos)
- Display all posts on home feed
- Like a post
- Comment on a post
- Trending posts section:
  - Based on like count or engagement
- Search users via search bar
- Pagination for feed and comments
- Redis-based caching for trending posts (recommended)

## 5. Media Handling
- Upload images & videos
- Cloudinary/S3 upload integration
- Serve optimized media URLs

## 6. Messaging System
- One-to-one messaging
- Real-time chat using WebSockets/Socket.IO
- "Seen" or "Delivered" indicators (optional)
- Message list + chat UI

## 7. Payment & Verification (Twitter Blue Tick)
- Payment integration (Stripe/Razorpay)
- Premium subscription for blue tick
- Payment webhook handling
- Verification workflow:
  - Sanity checks before granting blue tick:
    - Valid email
    - Completed profile
    - No abusive history
  - Update `isVerified = true` only after successful checks
- Show blue tick on profile & posts after verification

## 8. Notifications System
- Friend request notifications
- Comment notifications
- Like notifications
- Verification status notifications
- Real-time notification updates (WebSocket)

## 9. Admin Panel (Admin UI)
- Admin login (RBAC)
- View list of all users
- Ban/abandon/delete user accounts
- Review flagged content (if added later)
- System analytics dashboard (optional)
- Audit logs (optional)

## 10. Backend Architecture (Node.js + Express)
- Controllers, services, repositories separated
- Input validation with middleware
- Error handling middleware
- Logging with Winston/Morgan
- API rate limiting (recommended)
- Modular route grouping
- Database indexing for fast queries
- Queues (BullMQ/RabbitMQ) for:
  - Notifications
  - Verification workflows
  - Media processing

## 11. Frontend Architecture (React)
- Component-based architecture
- Global state management (Redux/Zustand/Recoil)
- Protected routes
- Responsive UI/UX
- Reusable form components
- Skeleton loading states

## 12. Deployment & DevOps
- Docker container for frontend
- Docker container for backend
- NGINX reverse proxy
- Kubernetes deployment:
  - Deployments
  - Services
  - Ingress
  - ConfigMaps & Secrets
  - Horizontal Pod Autoscaler
- CI/CD pipeline (GitHub Actions optional)
- Environment variable handling

## 13. Testing
- Jest unit tests
- Supertest API integration tests
- Mocking database & services
- E2E tests (Playwright/Cypress optional)

## 14. Database (MongoDB/Postgres)
- Users
- Posts
- Likes
- Comments
- Messages
- Friend requests
- Blocks
- Notifications
- Transactions/Payments
- Admin logs
- Indexes for search & queries

## 15. Other Optional Enhancements
- Dark mode
- Activity log for user
- Post analytics
- Hashtags & trending topics
