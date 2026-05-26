import { Link, useNavigate } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import useCart from '../hooks/useCart';
import { COURSES, TIER_PLANS } from '../data';
import { enrollUrl } from '../utils/enrollUrl';
import { clearCart, formatInr, removeFromCart, TIER_AMOUNTS } from '../utils/cart';
import '../styles/cart.css';
import '../styles/programs-page.css';

export default function CartPage() {
  useScrollReveal();
  const navigate = useNavigate();
  const { items } = useCart();

  const lines = items
    .map(item => {
      const course = COURSES[item.courseId];
      const plan = TIER_PLANS[item.tier];
      if (!course || !plan) return null;
      return { ...item, course, plan };
    })
    .filter(Boolean);

  const total = lines.reduce((sum, line) => sum + (TIER_AMOUNTS[line.tier] || 0), 0);

  return (
    <div className="programs-page cart-page">
      <header className="programs-page-hdr fade-up">
        <div className="sec-pill">Cart</div>
        <h1 className="sec-title">
          Your <em>Cart</em>
        </h1>
        <p className="programs-page-sub">
          Review selected courses and plans. Proceed to enrollment when you are ready.
        </p>
      </header>

      {lines.length === 0 ? (
        <div className="cart-empty fade-up">
          <div className="cart-empty-icon" aria-hidden>
            🛒
          </div>
          <h2>Your cart is empty</h2>
          <p>Browse courses and add a plan to get started.</p>
          <Link to="/courses" className="cart-empty-btn">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="cart-layout fade-up">
          <ul className="cart-list">
            {lines.map(line => (
              <li key={line.id} className="cart-item">
                <div className="cart-item-emoji" aria-hidden>
                  {line.course.emoji}
                </div>
                <div className="cart-item-body">
                  <div className="cart-item-cat">{line.course.cat}</div>
                  <div className="cart-item-name">{line.course.name}</div>
                  <div className="cart-item-plan">
                    <span className={`cart-tier-badge tier-${line.tier}`}>{line.plan.name} plan</span>
                    <span className="cart-item-price">{line.plan.price}</span>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      type="button"
                      className="cart-btn-primary"
                      onClick={() => navigate(enrollUrl({ course: line.courseId, tier: line.tier }))}
                    >
                      Enroll now
                    </button>
                    <Link to={`/course/${line.courseId}?tier=${line.tier}`} className="cart-btn-link">
                      View course
                    </Link>
                    <button type="button" className="cart-btn-remove" onClick={() => removeFromCart(line.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="cart-summary">
            <h2>Order summary</h2>
            <div className="cart-summary-row">
              <span>Items</span>
              <span>{lines.length}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Estimated total</span>
              <span>{formatInr(total)}</span>
            </div>
            <p className="cart-summary-note">Enroll each course separately to complete registration and OTP verification.</p>
            <button
              type="button"
              className="cart-summary-enroll"
              onClick={() => navigate(enrollUrl({ course: lines[0].courseId, tier: lines[0].tier }))}
            >
              Enroll first item
            </button>
            <button type="button" className="cart-summary-clear" onClick={() => clearCart()}>
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
