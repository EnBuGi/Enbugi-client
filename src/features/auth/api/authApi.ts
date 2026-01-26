import type { RegisterFormData } from "../model/types";

// Mock API Functions
export const authApi = {
    sendVerificationCode: async (email: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Simulate Sending
        console.log(`[Mock API] Verification Code sent to ${email}: 123456`);
        return { success: true, message: "인증 코드가 발송되었습니다." };
    },

    verifyCode: async (code: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (code === "123456") {
            return { success: true, message: "이메일 인증이 완료되었습니다." };
        }
        throw new Error("인증 코드가 올바르지 않습니다.");
    },

    registerUser: async (data: RegisterFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Simulate Registration
        console.log("[Mock API] Register Data:", data);
        return { success: true };
    }
};
