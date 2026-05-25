# Shiv Tatva LMS Portal (Frontend)

React + Vite learning portal for Shiv Tatva Solutions.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:8080

## API (optional)

Auth, enroll, and OTP need the Spring Boot API. Run the API separately and set in Vercel (or `.env`):

```
VITE_API_BASE_URL=https://your-api-host.com/api
```

Without it, the UI still loads; login/OTP/enroll fall back to limited local behavior.

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com)
2. Framework: **Vite**
3. Build: `npm run build`
4. Output: `dist`
5. Add env `VITE_API_BASE_URL` when your backend is hosted

## Stack

- React 19, React Router 7, Vite 6
- Course pages, training, apply, enroll + phone OTP (via API)
