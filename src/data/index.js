import { COURSES as rawCourses } from './courses.js';
import { CERT_CURRICULA as rawCerts } from './certCurricula.js';
import { INTERNSHIPS as rawInternships } from './internships.js';
import { applyTierCareerBenefits } from './tiers.js';
export { TIER_PLANS, TIER_CAREER_BENEFITS, TIER_COMPARE_ROWS } from './tiers.js';
export { CERT_PROGRAM_FEE } from './certCurricula.js';
export { CURRICULA } from './curricula.js';

function fixAssetPath(path) {
  if (!path) return path;
  return path.replace(/^assets\//, '/');
}

const THUMB_COURSE = {
  'cc-java': 'java',
  'cc-python': 'python',
  'cc-cloud': 'cloud',
  'cc-aws': 'cloud',
  'cc-ai': 'ai',
  'cc-cyber': 'cyber',
  'cc-sap': 'sap',
  'cc-salesforce': 'salesforce',
  'cc-react': 'python',
  'cc-ui': 'cyber',
  'cc-ds': 'ai',
  'cc-spring': 'java'
};

const INTERN_COURSE = {
  java: 'java',
  react: 'python',
  aws: 'cloud',
  ml: 'ai',
  ui: 'cyber',
  data: 'sap'
};

export function courseImage(id) {
  return `/courses/${id}.webp`;
}

export function courseImageFallback(id) {
  return `/courses/${id}.jpg`;
}

export function trainingImage(id) {
  return `/training/${id}.webp`;
}

export function trainingImageFallback(id) {
  return `/training/${id}.jpg`;
}

/** Map legacy gradient thumb class → course banner */
export function imagesFromThumb(thumb) {
  const id = THUMB_COURSE[thumb] || 'java';
  return { image: courseImage(id), imageFallback: courseImageFallback(id) };
}

const patched = {};
Object.entries(rawCourses).forEach(([id, course]) => {
  patched[id] = {
    ...course,
    brochure: fixAssetPath(course.brochure),
    image: course.image || courseImage(id),
    imageFallback: course.imageFallback || courseImageFallback(id)
  };
});

export const COURSES = applyTierCareerBenefits(patched);
export const COURSE_LIST = Object.values(COURSES);

export const HERO_COURSES = COURSE_LIST.map(c => ({
  id: c.id,
  emoji: c.emoji,
  name: c.name,
  title: c.heroTitle || c.name,
  image: c.image,
  imageFallback: c.imageFallback
}));

const patchedCerts = {};
Object.entries(rawCerts).forEach(([id, cert]) => {
  patchedCerts[id] = {
    ...cert,
    brochure: fixAssetPath(cert.brochure),
    image: cert.image || trainingImage(id),
    imageFallback: cert.imageFallback || trainingImageFallback(id)
  };
});

export const CERT_CURRICULA = patchedCerts;

const patchedInternships = {};
Object.entries(rawInternships).forEach(([id, item]) => {
  const cid = INTERN_COURSE[id] || 'java';
  patchedInternships[id] = {
    ...item,
    image: courseImage(cid),
    imageFallback: courseImageFallback(cid)
  };
});

export const INTERNSHIPS = patchedInternships;
