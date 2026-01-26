import { useState, useEffect } from "react";
import { authApi } from "../api/authApi";

export const useEmailVerification = () => {
    const [emailVerified, setEmailVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const sendCode = async (email: string) => {
        try {
            await authApi.sendVerificationCode(email);
            setTimeLeft(300); // 5 minutes
            alert(`인증 코드가 [${email}]로 발송되었습니다. (Mock: 123456)`);
            return true;
        } catch (error) {
            alert("인증 코드 발송에 실패했습니다.");
            return false;
        }
    };

    const verifyCode = async (code: string) => {
        if (timeLeft === 0) {
            alert("인증 시간이 만료되었습니다. 다시 시도해주세요.");
            return false;
        }
        try {
            await authApi.verifyCode(code);
            setEmailVerified(true);
            setTimeLeft(0);
            alert("이메일 인증이 완료되었습니다.");
            return true;
        } catch (error) {
            if (error instanceof Error) alert(error.message);
            return false;
        }
    };

    return {
        emailVerified,
        timeLeft,
        formatTime,
        sendCode,
        verifyCode
    };
};
