# E-Wallet — Frontend (React + Vite)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/mit)

Frontend for the KODA B7 e-wallet exercise built with React, Vite, and Redux Toolkit.

## Overview
- Single-page application built with Vite + React.
- Uses Axios for API requests, Redux Toolkit for state, and React Router for navigation.

## Technologies
- React 18+
- Vite
- Redux Toolkit
- Axios
- Tailwind CSS

## Features
- Authentication flows (login/register)
- Profile editing (image upload via FormData)
- Top-up and transfer flows
- Transaction history with search and pagination

## Requirements
- Node.js 18+ (or compatible)
- npm or pnpm

## Environment
Create a `.env` file in `e-wallet-react` with variables used by the app. Example:

```
VITE_API_BASE_URL=http://localhost:8080/api

# Optional
VITE_SOME_FEATURE_FLAG=true
```

Ensure `VITE_API_BASE_URL` points to your backend API.

## Quickstart (local)
1. Install dependencies:

```bash
cd e-wallet-react
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build locally:

```bash
npm run preview
```

## Docker
The repository includes a `Dockerfile` for building a production image.

Build and run:

```bash
cd e-wallet-react
docker build -t e-wallet-frontend .
docker run -p 3000:80 e-wallet-frontend
```

## CI / GHCR
There is a GitHub Actions workflow at `./.github/workflows/build_to_ghcr.yml` that can build and publish the frontend image to GHCR. Verify the branch, tags, and secrets before relying on it.

## Notes & Gotchas
- The Axios instance removes the default JSON `Content-Type` header to allow `FormData` uploads (profile image). Keep this in mind if you change `api.js`.
- Profile image URLs may need the API base prefix if stored as relative paths; `getImageUrl()` helper handles that in `EditProfile.jsx`.

## Contributing
- Fork the repo
- Create your feature branch
- Open a pull request with a clear description and relevant screenshots/tests

## License
MIT License
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.