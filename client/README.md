# LinkUp — Frontend

Next.js 15 frontend for the LinkUp social media platform.

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| MUI Icons + Popper | Icon library + popover menus |
| Axios | HTTP client with interceptors |
| jwt-decode | Client-side JWT decoding (no verification) |

---

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (global styles, metadata)
│   │   ├── page.tsx                      # Root redirect (token check)
│   │   ├── login/page.tsx                # Login page
│   │   ├── register/page.tsx             # Registration page
│   │   └── (protected)/
│   │       ├── layout.tsx                # Auth guard (JWT decode + AuthContext)
│   │       ├── dashboard/page.tsx        # Main feed
│   │       ├── profile/page.tsx          # User profile
│   │       └── message/page.tsx          # Placeholder
│   ├── components/
│   │   ├── AuthForm.tsx                  # Shared login/register form
│   │   ├── Button.tsx                    # Primary/secondary/tertiary button
│   │   ├── ConfirmModal.tsx              # Reusable confirm/cancel modal
│   │   ├── CreatePost.tsx                # Post composer with image preview
│   │   ├── Feed.tsx                      # Maps posts → PostContainer
│   │   ├── FormField.tsx                 # Label + Input wrapper
│   │   ├── FormRenderer.tsx              # Schema-driven generic form
│   │   ├── Highlight.tsx                 # Hardcoded news section
│   │   ├── Input.tsx                     # Styled input component
│   │   ├── MediaComponent.tsx            # Image/video carousel
│   │   ├── Navbar.tsx                    # Left sidebar (desktop) + bottom bar (mobile)
│   │   ├── PostContainer.tsx             # Single post card (like, comment, delete)
│   │   ├── Sidebar.tsx                   # Right panel (search, highlights, suggestions)
│   │   ├── SuggestionBox.jsx            # Follow suggestions (hardcoded, JSX)
│   │   ├── SuggestionItem.tsx           # Single suggestion card
│   │   ├── UserContent.tsx              # Profile tabs (Posts/Liked/Media)
│   │   ├── UserProfile.tsx              # Profile header (photos, bio, edit)
│   │   └── post_components/
│   │       ├── PostTextArea.tsx          # Auto-resizing textarea
│   │       ├── ImagePreviewList.tsx      # Image preview carousel
│   │       └── PostActions.tsx           # Post button + char counter
│   ├── context/
│   │   └── AuthContext.tsx               # Provides { user: { id } }
│   └── lib/
│       └── axiosInstance.ts              # Axios with auth interceptors
├── styles/
│   └── globals.css                       # Tailwind + custom theme variables
├── public/
│   ├── default.jpg                       # Default avatar
│   ├── linkup-logo.svg                   # Logo
│   └── post1.webp                        # Sample image
├── next.config.ts                        # Standalone output, remote image patterns
├── package.json
├── tsconfig.json
├── Dockerfile
└── postcss.config.mjs
```

---

## Setup

### Prerequisites
- Node.js 20+
- Backend running on port 3001

### Install and run
```bash
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_BASEURL=http://localhost:3001
```

```bash
npm run dev       # Development (Turbopack)
npm run build     # Production build (standalone)
npm run start     # Serve production build
npm run lint      # ESLint
```

---

## Auth Flow

```
/ (root)
  └─ token in localStorage?
       ├─ yes → /dashboard
       └─ no  → /login

/login → POST /api/users/signin → store token → /dashboard
/register → POST /api/users/signup → /login

(protected)/layout.tsx
  └─ decode token with jwt-decode → AuthContext.Provider({ user: { id } })
  └─ no token → redirect /login

Every API call:
  └─ axiosInstance attaches Authorization: Bearer <token>
  └─ 401 response → clear token → redirect /login
```

---

## Theming

Dark theme only. Custom CSS variables in `styles/globals.css`:

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-bg-primary` | `#0f172a` | Page background |
| `--color-bg-secondary` | `#1e293b` | Cards, modals, hover states |
| `--color-accent-primary` | `#06b6d4` | Buttons, links, focus rings |
| `--color-text-secondary` | `#94a3b8` | Muted text, labels |
| `--color-text-teritary` | `#64748b` | Placeholders, timestamps |
| `--color-border` | `#334155` | Borders, separators |

All primary text is white.

---

## Docker Build

```bash
npm run build
docker build -t linkup-frontend .
```

The Dockerfile copies the Next.js standalone output:
```dockerfile
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
CMD ["node", "server.js"]
```

---

## Known Limitations

- `SuggestionBox.jsx` is the only non-TypeScript file — should be migrated to `.tsx`
- Follow button in suggestions is not wired to any API
- Search input is rendered but non-functional
- Media tab on profile is a stub
- Message page is a stub ("Coming soon")
- No loading/error states on API calls
- No toast notifications for success/failure feedback
