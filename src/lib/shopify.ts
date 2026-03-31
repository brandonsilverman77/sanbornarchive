import { createStorefrontApiClient, type StorefrontApiClient } from '@shopify/storefront-api-client';

let _client: StorefrontApiClient | null = null;

function getClient(): StorefrontApiClient {
  if (!_client) {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
    if (!domain || !token) {
      throw new Error('Shopify environment variables not configured');
    }
    _client = createStorefrontApiClient({
      storeDomain: domain,
      publicAccessToken: token,
      apiVersion: '2025-04',
    });
  }
  return _client;
}

// --- Types ---

export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: CartLineItem;
    }>;
  };
}

// --- GraphQL fragments ---

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                featuredImage {
                  url
                  altText
                }
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

// --- Cart operations ---

export async function createCart(
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  const { data, errors } = await getClient().request(
    `mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}`,
    {
      variables: {
        input: {
          lines: [{ merchandiseId: variantId, quantity }],
        },
      },
    }
  );

  if (errors) {
    throw new Error(errors.message || 'Failed to create cart');
  }

  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { data, errors } = await getClient().request(
    `query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
    ${CART_FRAGMENT}`,
    {
      variables: { cartId },
    }
  );

  if (errors) {
    return null;
  }

  return data.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  const { data, errors } = await getClient().request(
    `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}`,
    {
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    }
  );

  if (errors) {
    throw new Error(errors.message || 'Failed to add to cart');
  }

  return data.cartLinesAdd.cart;
}

export async function removeFromCart(
  cartId: string,
  lineItemId: string
): Promise<Cart> {
  const { data, errors } = await getClient().request(
    `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}`,
    {
      variables: {
        cartId,
        lineIds: [lineItemId],
      },
    }
  );

  if (errors) {
    throw new Error(errors.message || 'Failed to remove from cart');
  }

  return data.cartLinesRemove.cart;
}
