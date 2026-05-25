import { useState } from 'react';
import { normalizeWeek } from '../utils/curriculum';
import VideoPlayerModal from './VideoPlayerModal';

function lessonId(monthNum, weekNum, lessonIdx) {
  return `${monthNum}-${weekNum}-${lessonIdx}`;
}

function SubtopicRow({ lesson, monthNum, weekNum, accessEntry }) {
  const [playing, setPlaying] = useState(false);
  const unlocked = accessEntry?.access?.unlocked ?? false;
  const isVideo = accessEntry?.isVideo ?? lesson.cls === 'ti-video';

  const onClick = () => {
    if (!isVideo || !unlocked) return;
    setPlaying(true);
  };

  return (
    <>
      <li
        className={`subtopic-item${isVideo && unlocked ? ' playable' : ''}`}
        onClick={isVideo && unlocked ? onClick : undefined}
        role={isVideo && unlocked ? 'button' : undefined}
        tabIndex={isVideo && unlocked ? 0 : undefined}
        onKeyDown={e => isVideo && unlocked && e.key === 'Enter' && setPlaying(true)}
      >
        <div className="subtopic-main">
          <div className={`topic-icon ${lesson.cls}`}>{lesson.emoji}</div>
          <div className="subtopic-text">
            <span className="subtopic-title">{lesson.title}</span>
            <span className="subtopic-type">{lesson.type}</span>
          </div>
        </div>
        <span className="subtopic-duration">{lesson.duration}</span>
      </li>
      {playing && <VideoPlayerModal lesson={lesson} onClose={() => setPlaying(false)} />}
    </>
  );
}

function WeekBlock({ week: rawWeek, defaultOpen, weekLabel = 'Week', monthNum, accessMap }) {
  const week = normalizeWeek(rawWeek);
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`week-card${open ? ' open' : ''}`}>
      <div className="week-head" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(!open)}>
        <div className="week-head-left">
          <div className="week-num">{weekLabel} {week.w}</div>
          <div>
            <div className="week-title">{week.topic}</div>
            <div className="week-subtitle">{week.sub}</div>
          </div>
        </div>
        <div className="week-head-right">
          <span className="week-duration-badge">⏱ {week.duration}</span>
          <div className="week-toggle">▼</div>
        </div>
      </div>
      {open && (
        <div className="week-body">
          <div className="curriculum-topic-block">
            <div className="curriculum-label-row">
              <span className="curriculum-label">Topic</span>
              <span className="curriculum-duration-col">Duration</span>
            </div>
            <div className="curriculum-topic-name">{week.topic}</div>
            <p className="curriculum-topic-sub">{week.sub}</p>
          </div>
          <div className="subtopics-section">
            <div className="curriculum-label-row subtopics-header">
              <span className="curriculum-label">Subtopics</span>
              <span className="curriculum-duration-col">Duration</span>
            </div>
            <ul className="subtopics-list">
              {week.subtopics.map((lesson, i) => (
                <SubtopicRow
                  key={i}
                  lesson={lesson}
                  monthNum={monthNum}
                  weekNum={week.w}
                  accessEntry={accessMap?.get(lessonId(monthNum, week.w, i))}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function MonthCurriculumPanel({ month, active, weekLabel = 'Week', periodLabel = 'Month', accessMap }) {
  if (!active) return null;
  const weeks = month.weeks.map(w => normalizeWeek(w));

  return (
    <div className="month-panel active">
      <div className="month-header">
        <div className="month-badge">
          <span className="mn">{periodLabel}</span>
          <span className="num">{String(month.num).padStart(2, '0')}</span>
        </div>
        <div className="month-info">
          <h2>{month.title}</h2>
          <p>{month.desc}</p>
          <div className="month-tag">{month.tag}</div>
        </div>
      </div>
      <div className="week-overview">
        <div className="week-overview-title">Weekly breakdown</div>
        <table className="week-overview-table">
          <thead>
            <tr>
              <th>{weekLabel}</th>
              <th>Topic</th>
              <th>Subtopics</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map(w => (
              <tr key={w.w}>
                <td>{weekLabel} {w.w}</td>
                <td>{w.topic}</td>
                <td>{w.subtopics.length}</td>
                <td>{w.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="weeks-grid">
        {weeks.map((w, i) => (
          <WeekBlock
            key={w.w}
            week={w}
            defaultOpen={i === 0}
            weekLabel={weekLabel}
            monthNum={month.num}
            accessMap={accessMap}
          />
        ))}
      </div>
    </div>
  );
}

export default WeekBlock;
