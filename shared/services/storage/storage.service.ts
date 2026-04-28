// Service layer - abstracts browser storage interactions
const PREFIX = 'jb_';

export function storageGet<T>(key: string): T | null {
    try {
        const item = window.localStorage.getItem(`${PREFIX}${key}`);
        return item ? (JSON.parse(item) as T) : null;
    } catch {
        return null;
    }
}

export function storageSet<T>(key: string, value: T): void {
    try {
        window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch {
        // Storage unavailable — silently fail
    }
}

export function storageRemove(key: string): void {
    try {
        window.localStorage.removeItem(`${PREFIX}${key}`);
    } catch {
        // Storage unavailable — silently fail
    }
}
