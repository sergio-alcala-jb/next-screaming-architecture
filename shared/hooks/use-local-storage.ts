// Custom hook - manages local storage state with SSR safety
'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) setStoredValue(JSON.parse(item));
        } catch {
            // Storage unavailable or parse error — keep initial value
        }
    }, [key]);

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage unavailable — silently fail
        }
    };

    return [storedValue, setValue] as const;
}
