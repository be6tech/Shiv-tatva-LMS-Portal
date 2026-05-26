export function starsHtml(rating) {
  const n = Math.round(parseFloat(rating) || 4.8);
  return '★'.repeat(n) + (n < 5 ? '☆' : '');
}

export function HowSteps({ title, steps, style }) {
  return (
    <div className="how-wrap fade-up" style={style}>
      <div className="how-title">{title}</div>
      <div className="how-steps">
        {steps.map(([t, d], i) => (
          <div key={t} className="how-step">
            <div className="hs-num">{i + 1}</div>
            <div className="hs-title">{t}</div>
            <div className="hs-desc">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgramsPageHeader({ pill, title, subtitle, children }) {
  return (
    <header className="programs-page-hdr fade-up">
      <div className="sec-pill">{pill}</div>
      <h1 className="sec-title">{title}</h1>
      {subtitle && <p className="sec-sub programs-page-sub">{subtitle}</p>}
      {children}
    </header>
  );
}
