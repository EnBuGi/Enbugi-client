import { z } from "zod";
import { loginSchema, registerSchema } from "./schema";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
