import { TIER_PLANS } from '../data/tiers.js';
import { api } from '../api/client.js';
import { hasAuthToken } from './authSession.js';

const STORAGE_KEY = 'st_enrollments';

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Sync enrollments from Spring Boot API into local cache */
export async function refreshEnrollmentsFromApi() {
  if (!hasAuthToken()) return false;
  try {
    const list = await api.myEnrollments();
    const all = {};
    for (const e of list) {
      all[e.courseId] = {
        tier: e.tier,
        paymentVerified: e.paymentStatus === 'VERIFIED',
        verifiedAt: e.verifiedAt || null
      };
    }
    writeAll(all);
    return true;
  } catch {
    return false;
  }
}

export function getEnrollment(courseId) {
  if (!courseId) return null;
  const all = readAll();
  return all[courseId] || null;
}

export function setEnrollment(courseId, tier, paymentVerified = true) {
  if (!courseId || !TIER_PLANS[tier]) return;
  const all = readAll();
  all[courseId] = {
    tier,
    paymentVerified: Boolean(paymentVerified),
    verifiedAt: new Date().toISOString()
  };
  writeAll(all);
}

/** Verify payment via API when logged in; otherwise local cache only */
export async function verifyPaymentForCourse(courseId, tier) {
  if (!courseId || !TIER_PLANS[tier]) return;
  if (hasAuthToken()) {
    try {
      await api.verifyPayment({ courseId, tier });
      await refreshEnrollmentsFromApi();
      return;
    } catch {
      /* fall through to local */
    }
  }
  setEnrollment(courseId, tier, true);
}

export function isPaymentVerified(courseId) {
  const e = getEnrollment(courseId);
  return Boolean(e?.paymentVerified && e?.tier);
}

export function getEnrolledTier(courseId) {
  const e = getEnrollment(courseId);
  return e?.paymentVerified ? e.tier : null;
}
