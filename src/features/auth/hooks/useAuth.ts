"use client";

import { fetchWithAuth } from "@/shared/api/client";
import { useRouter } from "next/navigation";

export function useAuth() {
    const router = useRouter();

    const logout = async () => {
        try {
            await fetchWithAuth("/api/v1/auth/token", {
                method: "DELETE",
            });
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            // Local cleanup
            localStorage.removeItem("accessToken");
            document.cookie = "accessToken=; path=/; max-age=0";
            
            // Redirect to login
            router.push("/login");
        }
    };

    return { logout };
}
