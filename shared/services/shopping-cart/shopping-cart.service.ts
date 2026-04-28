// Service layer - handles shopping cart API calls and business logic
export interface CartItem {
    flightId: string;
    seatId?: string;
    price: number;
    quantity: number;
}

export async function getCart(): Promise<CartItem[]> {
    const response = await fetch('/api/cart');

    if (!response.ok) {
        throw new Error('Failed to fetch cart');
    }

    return response.json();
}

export async function addToCart(item: CartItem): Promise<CartItem[]> {
    const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error('Failed to add item to cart');
    }

    return response.json();
}

export async function removeFromCart(flightId: string): Promise<CartItem[]> {
    const response = await fetch(`/api/cart/${flightId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to remove item from cart');
    }

    return response.json();
}
