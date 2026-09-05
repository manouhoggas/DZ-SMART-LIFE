# DZ SMART LIFE

## Publish this on GitHub Pages — no editing required to go live

1. Create a new (empty) GitHub repository.
2. Upload **everything in this folder** to the repo root — including
   `index.html` and the `source/` folder — exactly as-is.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a URL like `https://<your-username>.github.io/<repo-name>/`.

The root `index.html` is a complete, self-contained build (React, the app,
and the logo are all inlined into that one file) — GitHub Pages just serves
it directly.

**Note:** "Continue with Google" and "Continue with Email" won't actually
sign anyone in yet — they need your own Firebase project's config (see
below). Until then, "Continue as Guest" works immediately with zero setup.

## Turning on real Google / Email sign-in (5 minutes, one-time)

The app now uses the real Firebase **client** SDK (`firebase/auth`) —
not the Admin SDK, which must never run in a browser. To activate it:

1. Go to **console.firebase.google.com** → create a project (or use an
   existing one).
2. **Project settings** (gear icon) → **General** → "Your apps" →
   Add app → **Web** (`</>`). Give it any nickname.
3. Firebase shows you a `firebaseConfig` object like:
   ```js
   {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "...",
     appId: "...",
   }
   ```
   These values are **not secret** — they're safe to put in client code.
   (Never do this with an Admin SDK / service-account JSON key — that one
   is a real secret and must only ever run on a server.)
4. Open `source/src/firebase.js` and paste your values into the
   `firebaseConfig` object there.
5. Back in the Firebase console: **Authentication → Sign-in method** →
   enable **Google** (and **Email/Password** if you want that option too).
6. **Authentication → Settings → Authorized domains** → add your GitHub
   Pages domain, e.g. `your-username.github.io` (required, or the Google
   sign-in popup will be rejected).
7. Rebuild and republish:
   ```bash
   cd source
   npm install
   npm run build          # writes source/dist/index.html
   ```
   Copy `source/dist/index.html` over the root `index.html`, then push.

If you'd rather not do the "copy the config in" step yourself, you can also
just tell me your `firebaseConfig` values (again — not secret, safe to
share) and I'll bake them in and hand you a rebuilt, ready-to-push
`index.html`.

## The `source/` folder

The editable project — real `App.jsx`, `firebase.js`, `package.json`, etc.
Not needed just to publish; GitHub Pages only looks at the root
`index.html`. Use it whenever you want to change the app:
```bash
cd source
npm install
npm run dev        # live-edit locally
npm run build      # regenerates source/dist/index.html
```

## What this app is (and isn't)

DZ SMART LIFE is a front-end prototype for a smart everyday-life & money
assistant for Algeria — dashboard, safe-to-spend, "can I afford this?",
bills, subscriptions, goals, Arabic/French/English with RTL, luxury dark
theme, and now real Firebase Authentication (Google + Email, once
configured above). There is still **no database** — signed-in users' app
data (expenses, bills, goals, subscriptions) lives only in the browser's
memory for the current session and resets on reload. Persisting that data
across sessions/devices would need a real database (e.g. Firestore) wired
up next.
