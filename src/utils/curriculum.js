/** Parse legacy [emoji, cls, title, typeLabel] or normalized lesson objects */
export function parseLesson(entry) {
  if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
    return {
      emoji: entry.emoji || '📹',
      cls: entry.cls || 'ti-video',
      title: entry.title || '',
      type: entry.type || 'Lesson',
      duration: entry.duration || defaultDurationForType(entry.type)
    };
  }
  const [emoji, cls, title, typeLabel] = entry;
  const label = String(typeLabel || 'Lesson');
  let type = label;
  let duration = defaultDurationForType(label);

  if (label.includes('·')) {
    const [t, d] = label.split('·').map(s => s.trim());
    type = t || 'Lesson';
    duration = d || defaultDurationForType(t);
  } else if (/\d+\s*min/i.test(label)) {
    duration = label.match(/\d+\s*min/i)[0];
    type = 'Lesson';
  }

  return { emoji, cls, title, type, duration };
}

export function defaultDurationForType(type = '') {
  const t = String(type).toLowerCase();
  if (t.includes('mock') || t.includes('exam')) return '90 min';
  if (t.includes('quiz')) return '30 min';
  if (t.includes('lab')) return '60 min';
  if (t.includes('project') || t.includes('capstone')) return '120 min';
  if (t.includes('session') || t.includes('workshop')) return '60 min';
  if (t.includes('live')) return '45 min';
  if (t.includes('video')) return '40 min';
  if (t.includes('resources') || t.includes('material')) return '30 min';
  return '45 min';
}

export function parseMinutes(duration) {
  if (!duration || duration === '—') return 0;
  const m = String(duration).match(/(\d+)\s*min/i);
  return m ? parseInt(m[1], 10) : 0;
}

export function formatTotalDuration(subtopics) {
  const total = subtopics.reduce((sum, s) => sum + parseMinutes(s.duration), 0);
  if (!total) return '—';
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${total} min`;
}

/** Normalize week: topic, sub, subtopics[], duration */
export function normalizeWeek(week) {
  const raw = week.subtopics || week.topics || [];
  const subtopics = raw.map(parseLesson);
  return {
    ...week,
    topic: week.topic || week.title || 'Topic',
    sub: week.sub || week.subtitle || '',
    subtopics,
    duration: week.duration || formatTotalDuration(subtopics)
  };
}

export function normalizeMonth(month) {
  const weeks = (month.weeks || []).map(normalizeWeek);
  const monthDuration = formatTotalDuration(weeks.flatMap(w => w.subtopics));
  const weekCount = weeks.length;
  const lessonCount = weeks.reduce((n, w) => n + w.subtopics.length, 0);
  return {
    ...month,
    weeks,
    weekCount,
    lessonCount,
    monthDuration,
    tag: month.tag || `${weekCount} Weeks · ${lessonCount} Lessons · ${monthDuration}`
  };
}
