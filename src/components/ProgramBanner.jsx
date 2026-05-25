/** Reusable WebP/JPEG banner with optional emoji badge */
export default function ProgramBanner({ image, imageFallback, emoji, badge, className = 'cc-thumb', imgClass = 'cc-thumb-img' }) {
  return (
    <div className={className}>
      {image && (
        <picture>
          <source srcSet={image} type="image/webp" />
          <img src={imageFallback} alt="" className={imgClass} loading="lazy" />
        </picture>
      )}
      {emoji && <span className="cc-thumb-badge" aria-hidden>{emoji}</span>}
      {badge}
    </div>
  );
}
