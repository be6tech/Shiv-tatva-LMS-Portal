import { setAuthToken } from '../api/client.js';

const USER_KEY = 'st_user';

export function saveAuthSession({ token, email, fullName, role }) {
  setAuthToken(token);
  sessionStorage.setItem('st_email', email);
  localStorage.setItem(USER_KEY, JSON.stringify({ email, fullName, role }));
}

export function clearAuthSession() {
  setAuthToken(null);
  sessionStorage.removeItem('st_email');
  localStorage.removeItem(USER_KEY);
}

export function getAuthUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function hasAuthToken() {
  return Boolean(localStorage.getItem('st_token'));
}
