import { TIER_PLANS } from '../data/tiers.js';
import { getEnrolledTier, isPaymentVerified } from './enrollment.js';
import { normalizeMonth, normalizeWeek } from './curriculum.js';

/** Plan fees in INR — drives how many videos unlock after payment */
export const TIER_PRICE_INR = {
  basic: 40000,
  pro: 70000,
  premium: 120000
};

export const PREMIUM_PRICE_INR = TIER_PRICE_INR.premium;

export function flattenCourseLessons(months) {
  const list = [];
  (months || []).map(normalizeMonth).forEach(month => {
    (month.weeks || []).forEach(week => {
      const w = normalizeWeek(week);
      w.subtopics.forEach((lesson, lessonIdx) => {
        list.push({
          id: `${month.num}-${w.w}-${lessonIdx}`,
          lesson,
          monthNum: month.num,
          weekNum: w.w,
          lessonIdx,
          isVideo: isVideoLesson(lesson)
        });
      });
    });
  });
  return list;
}

export function isVideoLesson(lesson) {
  const cls = lesson?.cls || '';
  const type = String(lesson?.type || '').toLowerCase();
  return cls === 'ti-video' || type.includes('video') || lesson?.emoji === '📹';
}

/** How many video lessons unlock for a paid tier (proportional to fee vs Premium ₹1.2L) */
export function unlockedVideoCount(totalVideos, tierId) {
  if (!totalVideos || !tierId) return 1;
  const price = TIER_PRICE_INR[tierId];
  if (!price) return 1;
  const ratio = price / PREMIUM_PRICE_INR;
  return Math.max(1, Math.min(totalVideos, Math.ceil(totalVideos * ratio)));
}

export function getVideoUnlockLimit(videoTotal, courseId) {
  const paidTier = getEnrolledTier(courseId);
  if (!paidTier || !isPaymentVerified(courseId)) return 1;
  return unlockedVideoCount(videoTotal, paidTier);
}

export function buildLessonAccessMap(months, courseId) {
  const flat = flattenCourseLessons(months);
  const videoTotal = flat.filter(x => x.isVideo).length;
  const limit = getVideoUnlockLimit(videoTotal, courseId);
  const map = new Map();
  let videoIndex = 0;
  let globalIndex = 0;

  flat.forEach(item => {
    let access;
    if (!item.isVideo) {
      access = { unlocked: true, reason: 'open' };
    } else {
      const unlocked = videoIndex < limit;
      if (videoIndex === 0) {
        access = { unlocked: true, reason: 'preview' };
      } else if (!isPaymentVerified(courseId)) {
        access = { unlocked: false, reason: 'payment' };
      } else if (unlocked) {
        access = { unlocked: true, reason: 'tier' };
      } else {
        access = { unlocked: false, reason: 'upgrade' };
      }
      videoIndex += 1;
    }
    map.set(item.id, {
      ...item,
      globalIndex,
      videoIndex: item.isVideo ? videoIndex - 1 : null,
      access
    });
    globalIndex += 1;
  });

  return { flat, map, total: flat.length, videoTotal, videoLimit: limit };
}

export function getAccessSummary(months, courseId) {
  const { flat, map, videoTotal, videoLimit } = buildLessonAccessMap(months, courseId);
  const paidTier = getEnrolledTier(courseId);
  let videoUnlocked = 0;
  flat.forEach(item => {
    if (item.isVideo && map.get(item.id)?.access?.unlocked) videoUnlocked += 1;
  });

  return {
    totalLessons: flat.length,
    videoTotal,
    videoUnlocked,
    videoLimit,
    paidTier,
    verified: isPaymentVerified(courseId),
    tierLabel: paidTier ? TIER_PLANS[paidTier]?.name : null,
    tierPrice: paidTier ? TIER_PLANS[paidTier]?.price : null
  };
}
