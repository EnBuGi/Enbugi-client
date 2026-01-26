import { z } from "zod";

const passwordSchema = z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .regex(/[a-zA-Z]/, { message: "영문자가 포함되어야 합니다." })
    .regex(/[0-9]/, { message: "숫자가 포함되어야 합니다." })
    .regex(/[^a-zA-Z0-9]/, { message: "특수문자가 포함되어야 합니다." });

export const loginSchema = z.object({
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export const registerSchema = z.object({
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
    code: z.string().min(6, { message: "인증 코드를 입력해주세요." }), // OTP
    name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
});
