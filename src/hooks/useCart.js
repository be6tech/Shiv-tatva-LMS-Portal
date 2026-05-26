import { useCallback, useEffect, useState } from 'react';
import { getCartItems } from '../utils/cart';

export default function useCart() {
  const [items, setItems] = useState(getCartItems);

  const sync = useCallback(() => {
    setItems(getCartItems());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('cart-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('cart-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, [sync]);

  return { items, count: items.length };
}
