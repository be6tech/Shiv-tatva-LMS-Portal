const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export function getToken() {
  return localStorage.getItem('st_token');
}

export function setAuthToken(token) {
  if (token) localStorage.setItem('st_token', token);
  else localStorage.removeItem('st_token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}

export const api = {
  health: () => request('/health'),
  register: body => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: body => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  courses: () => request('/courses'),
  course: id => request(`/courses/${id}`),
  apply: body => request('/applications', { method: 'POST', body: JSON.stringify(body) }),
  myEnrollments: () => request('/me/enrollments'),
  verifyPayment: body =>
    request('/me/enrollments/verify-payment', { method: 'POST', body: JSON.stringify(body) }),
  videoAccess: courseId => request(`/me/courses/${courseId}/video-access`),
  sendOtp: phone => request('/otp/send', { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyOtp: (phone, code) =>
    request('/otp/verify', { method: 'POST', body: JSON.stringify({ phone, code }) }),
  completeEnrollment: body =>
    request('/enroll/complete', { method: 'POST', body: JSON.stringify(body) })
};
