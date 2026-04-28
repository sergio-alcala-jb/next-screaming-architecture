// App-wide route constants
export const ROUTES = {
    HOME: '/',
    FLIGHTS: '/flights',
    SEAT_SELECTION: '/seat-selection',
    CART: '/cart',
    CHECKOUT: '/checkout',
    CONFIRMATION: '/confirmation',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
