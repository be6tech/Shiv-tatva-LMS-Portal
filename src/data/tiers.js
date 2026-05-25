/* Shared tier pricing for all full courses */
export const TIER_PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: '₹40,000',
    priceLabel: '₹40,000',
    durationNote: 'Foundation track',
    badgeClass: 'tier-basic'
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: '₹70,000',
    priceLabel: '₹70,000',
    durationNote: 'Professional track + 1-on-1 mentorship',
    badgeClass: 'tier-pro'
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: '₹1,20,000',
    priceLabel: '₹1.2 Lakhs',
    durationNote: 'Complete career track + guaranteed internship',
    badgeClass: 'tier-premium'
  }
};

export const TIER_CAREER_BENEFITS = {
  basic: [
    'Weekly doubt sessions (group)',
    'Placement material — starter kit (aptitude & HR PDFs)'
  ],
  pro: [
    'Live doubt sessions (3× per week)',
    '1-on-1 mentorship',
    'Resume building workshop + 1 expert review',
    'LinkedIn optimization workshop',
    'Placement material pack (aptitude, technical, HR)'
  ],
  premium: [
    'Unlimited doubt sessions + priority slots',
    'Full resume building & ATS optimization',
    'LinkedIn profile optimization (headline, About, featured)',
    'Placement material — full drive kit + monthly updates',
    'Dedicated placement coordinator',
    'Guaranteed internship providing'
  ]
};

export const TIER_COMPARE_ROWS = [
  { label: 'Program fee', basic: '₹40,000', pro: '₹70,000', premium: '₹1,20,000' },
  { label: 'Live instructor classes', basic: '✓', pro: '✓', premium: '✓' },
  { label: 'Recorded session access', basic: '✓', pro: '✓', premium: '✓ Lifetime' },
  { label: 'Doubt sessions', basic: 'Weekly (group)', pro: '3×/week live', premium: 'Unlimited + priority' },
  { label: 'Resume building', basic: '—', pro: 'Workshop + 1 review', premium: 'Full build + ATS' },
  { label: 'LinkedIn optimization', basic: '—', pro: 'Workshop', premium: 'Full profile optimization' },
  { label: 'Placement materials', basic: 'Starter kit', pro: 'Aptitude + HR pack', premium: 'Full kit + updates' },
  { label: 'Hands-on assignments', basic: 'Limited', pro: '✓', premium: '✓' },
  { label: 'Capstone / live projects', basic: '—', pro: 'Some', premium: '✓ Full' },
  { label: 'Mock interviews', basic: '—', pro: '2 sessions', premium: 'Unlimited' },
  { label: '1-on-1 mentorship', basic: '—', pro: '✓', premium: '✓ Priority' },
  { label: 'Placement assistance', basic: '—', pro: 'Guidance', premium: '✓ Dedicated' },
  { label: 'Internship', basic: '—', pro: '—', premium: '✓ Guaranteed' },
  { label: 'Industry certificate', basic: '✓', pro: '✓', premium: '✓' }
];

export function applyTierCareerBenefits(courses) {
  Object.values(courses).forEach(course => {
    ['basic', 'pro', 'premium'].forEach(tier => {
      TIER_CAREER_BENEFITS[tier].forEach(item => {
        if (!course.tierIncludes[tier].includes(item)) {
          course.tierIncludes[tier].push(item);
        }
      });
    });
  });
  return courses;
}
