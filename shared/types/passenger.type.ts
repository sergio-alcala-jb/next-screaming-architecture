// Shared type definitions used across modules
export interface Passenger {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    knownTravelerNumber?: string;
}

export interface ContactInfo {
    email: string;
    phone: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
