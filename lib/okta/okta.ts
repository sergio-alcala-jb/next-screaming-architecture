// Okta authentication helpers - wraps Okta SDK for app use
import { OktaAuth } from '@okta/okta-auth-js';

export const oktaAuth = new OktaAuth({
    issuer: process.env.NEXT_PUBLIC_OKTA_ISSUER!,
    clientId: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID!,
    redirectUri: typeof window !== 'undefined'
        ? `${window.location.origin}/login/callback`
        : '',
});

export async function getAccessToken(): Promise<string | null> {
    const tokenManager = oktaAuth.tokenManager;
    const token = await tokenManager.get('accessToken');
    return token ? (token as { accessToken: string }).accessToken : null;
}

export async function signOut(): Promise<void> {
    await oktaAuth.signOut();
}
