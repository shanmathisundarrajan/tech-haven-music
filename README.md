# Tech Haven Music

A music streaming web app where users can browse albums, play songs and save their favourite tracks. Admins can upload new albums and songs through a built-in admin panel.

**Live demo:** https://tech-haven-music.vercel.app

## Features

- **User accounts:** register, log in and manage a profile (Firebase Authentication with email verification)
- **Browse albums:** home page with trending songs and top albums
- **Music player:** play songs from any album with a persistent audio player
- **Favourites:** add or remove songs with a heart button and view them on a dedicated Favourites page
- **Admin panel:** role-based access for admins to create albums and upload songs, posters and audio files
- **Protected routes:** private pages for logged-in users and admin-only pages

## Tech Stack

- **Frontend:** React, Vite, React Router, Tailwind CSS
- **Backend services:** Firebase Authentication and Cloud Firestore
- **Media storage:** Cloudinary (images and audio)
- **Other libraries:** react-pro-audio-player, react-hot-toast, react-icons
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18 or later
- A Firebase project with Email/Password Authentication and Firestore enabled
- A Cloudinary account with an unsigned upload preset

### Installation

```bash
git clone https://github.com/shanmathisundarrajan/tech-haven-music.git
cd tech-haven-music
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Configuration

- Add your Firebase config in `src/backend/firebase.js`
- Add your Cloudinary cloud name and upload preset in `src/AdminComponents/CreateAlbum.jsx`

### Firestore rules

Use these rules, replacing the email with your admin email:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /album_collections/{albumId} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.email == "YOUR_ADMIN_EMAIL";
    }

    match /user-profile/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /favourites/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Becoming an admin

1. Register, verify your email and log in
2. Save your profile once from the profile page
3. In the Firebase Console, open the `user-profile` collection, find your user document and change `role` from `user` to `admin`
4. An **Admin** link now appears in the navbar

## Project Structure

```
src/
  AdminComponents/   Admin dashboard and album creation
  Components/        Album, auth, navbar and user components
  Pages/             Home, layout and 404 pages
  Routes/            Route definitions and route guards
  context/           Auth, user, album, audio player and favourites state
  backend/           Firebase setup
```

## Deployment

The app is deployed on Vercel. The included `vercel.json` rewrites all routes to `index.html` so page refreshes work with React Router. After deploying, add your Vercel domain under Firebase Console → Authentication → Settings → Authorized domains.

## Author

[shanmathisundarrajan](https://github.com/shanmathisundarrajan)
