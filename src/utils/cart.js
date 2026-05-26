const STORAGE_KEY = 'shivtatva_cart';

export const TIER_AMOUNTS = {
  basic: 40000,
  pro: 70000,
  premium: 120000
};

export function cartItemId(courseId, tier) {
  return `${courseId}:${tier}`;
}

export function getCartItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart-updated'));
}

export function addToCart({ courseId, tier }) {
  if (!courseId || !tier) return false;
  const id = cartItemId(courseId, tier);
  const items = getCartItems();
  if (items.some(i => i.id === id)) return false;
  items.push({ id, courseId, tier, addedAt: Date.now() });
  persist(items);
  return true;
}

export function removeFromCart(id) {
  persist(getCartItems().filter(i => i.id !== id));
}

export function clearCart() {
  persist([]);
}

export function getCartCount() {
  return getCartItems().length;
}

export function formatInr(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
