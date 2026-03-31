'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, isLoading, removeFromCart, closeCart } = useCart();

  const lineItems = cart?.lines.edges.map((edge) => edge.node) ?? [];
  const subtotal = cart?.cost.subtotalAmount;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button
            onClick={closeCart}
            className="cart-drawer-close"
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer-body">
          {lineItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <Link href="/prints" onClick={closeCart} className="cart-browse-link">
                Browse Prints
              </Link>
            </div>
          ) : (
            <ul className="cart-items">
              {lineItems.map((item) => (
                <li key={item.id} className="cart-item">
                  {item.merchandise.product.featuredImage && (
                    <div className="cart-item-image">
                      <Image
                        src={item.merchandise.product.featuredImage.url}
                        alt={
                          item.merchandise.product.featuredImage.altText ||
                          item.merchandise.product.title
                        }
                        width={80}
                        height={96}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className="cart-item-details">
                    <p className="cart-item-title">
                      {item.merchandise.product.title}
                    </p>
                    <p className="cart-item-variant">
                      {item.merchandise.title}
                    </p>
                    <p className="cart-item-price">
                      ${parseFloat(item.merchandise.price.amount).toFixed(0)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-item-remove"
                    aria-label={`Remove ${item.merchandise.product.title}`}
                    disabled={isLoading}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lineItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>${subtotal ? parseFloat(subtotal.amount).toFixed(0) : '0'}</span>
            </div>
            <a
              href={cart?.checkoutUrl}
              className="cart-checkout-btn"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
