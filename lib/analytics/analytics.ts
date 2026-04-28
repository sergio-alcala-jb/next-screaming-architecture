// Analytics service - tracks user events and page views
export type EventName =
    | 'flight_searched'
    | 'flight_selected'
    | 'seat_selected'
    | 'cart_viewed'
    | 'checkout_started'
    | 'booking_confirmed';

export interface AnalyticsEvent {
    name: EventName;
    properties?: Record<string, string | number | boolean>;
}

export function trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined') return;

    // Replace with your analytics provider (e.g. Segment, GA4)
    console.debug('[analytics]', event.name, event.properties ?? {});
}

export function trackPageView(path: string): void {
    trackEvent({ name: 'flight_searched', properties: { path } });
}
