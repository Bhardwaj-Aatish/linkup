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
