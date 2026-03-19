"use client";

import { useState, useEffect } from 'react';
import { fetchMyProfile, User } from '@/features/mentor-users/api/users';

let profilePromise: Promise<User> | null = null;
let cachedUser: User | null = null;

/**
 * Hook to fetch and cache the current user's profile.
 * Uses a singleton pattern to ensure the API is called only once.
 */
export function useUser() {
    const [user, setUser] = useState<User | null>(cachedUser);
    const [isLoading, setIsLoading] = useState(!cachedUser);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (cachedUser) {
            setUser(cachedUser);
            setIsLoading(false);
            return;
        }

        if (!profilePromise) {
            profilePromise = fetchMyProfile()
                .then((data) => {
                    cachedUser = data;
                    return data;
                })
                .catch((err) => {
                    profilePromise = null;
                    throw err;
                });
        }

        profilePromise
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    return { user, isLoading, error };
}
