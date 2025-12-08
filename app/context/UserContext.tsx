"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Recommended users from schneider-backend/README.md
export const DEMO_USER_IDS = [
    '1450181150',
    '635246794',
    '169348607',
    '689997252',
    '625493898'
];

interface UserContextType {
    userId: string;
    setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    // Default to the first user in the list
    const [userId, setUserId] = useState<string>(DEMO_USER_IDS[0]);

    // Optional: Persist to localStorage
    useEffect(() => {
        const stored = localStorage.getItem('demo_userId');
        if (stored && DEMO_USER_IDS.includes(stored)) {
            setUserId(stored);
        }
    }, []);

    const handleSetUserId = (id: string) => {
        setUserId(id);
        localStorage.setItem('demo_userId', id);
    };

    return (
        <UserContext.Provider value={{ userId, setUserId: handleSetUserId }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
