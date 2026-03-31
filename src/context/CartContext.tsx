'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  createCart as shopifyCreateCart,
  addToCart as shopifyAddToCart,
  removeFromCart as shopifyRemoveFromCart,
  getCart as shopifyGetCart,
  type Cart,
} from '@/lib/shopify';

const CART_ID_KEY = 'sanborn_cart_id';

interface CartContextType {
  cart: Cart | null;
  isCartOpen: boolean;
  isLoading: boolean;
  addToCart: (variantId: string) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (!savedCartId) return;

    shopifyGetCart(savedCartId).then((existingCart) => {
      if (existingCart && existingCart.totalQuantity > 0) {
        setCart(existingCart);
      } else {
        localStorage.removeItem(CART_ID_KEY);
      }
    });
  }, []);

  const addToCart = useCallback(
    async (variantId: string) => {
      setIsLoading(true);
      try {
        let updatedCart: Cart;

        if (cart) {
          updatedCart = await shopifyAddToCart(cart.id, variantId);
        } else {
          updatedCart = await shopifyCreateCart(variantId);
        }

        setCart(updatedCart);
        localStorage.setItem(CART_ID_KEY, updatedCart.id);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    async (lineItemId: string) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updatedCart = await shopifyRemoveFromCart(cart.id, lineItemId);
        setCart(updatedCart);

        if (updatedCart.totalQuantity === 0) {
          localStorage.removeItem(CART_ID_KEY);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isLoading,
        addToCart,
        removeFromCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
