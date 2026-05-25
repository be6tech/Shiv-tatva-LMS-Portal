/** Enrollment registration page with phone OTP */
export function enrollUrl({ course, tier, type = 'course', cert, internship } = {}) {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  if (course) params.set('course', course);
  if (tier) params.set('tier', tier);
  if (cert) params.set('cert', cert);
  if (internship) params.set('internship', internship);
  const q = params.toString();
  return `/enroll${q ? `?${q}` : ''}`;
}
