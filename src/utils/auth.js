import { getAuthUser } from './authSession.js';

const STORAGE_KEY = 'st_email';

export function getStoredEmail(paramEmail) {
  if (paramEmail) {
    sessionStorage.setItem(STORAGE_KEY, paramEmail);
    return paramEmail;
  }
  return sessionStorage.getItem(STORAGE_KEY) || '';
}

export function formatUserFromEmail(email) {
  const auth = getAuthUser();
  if (auth?.fullName) {
    const name = auth.fullName;
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'ST';
    return { name, initials };
  }
  if (!email) return { name: 'Student', initials: 'ST' };
  const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'ST';
  return { name, initials };
}

export const LOGIN_ROUTES = {
  student: '/dashboard',
  trainer: '/trainer',
  admin: '/admin'
};
