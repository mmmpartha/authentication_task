import { z } from "zod";

export const user_schema = z.object({
     name: z.string().max(50).min(1),
     email: z.string().email().max(400),
     password: z.string().max(20),
     mobile_number: z.string().min(10).max(10),
     role: z.enum(["admin", "user"]),
     account_status: z
          .enum(["unverified", "active", "inactive", "banned"])
          .default("active")
          .optional(),
     account_status_description: z
          .string()
          .max(150)
          .default("welcome to our app")
          .optional(),
     isVerified: z.boolean().default(false).optional(),
     verification_Code: z.string().optional(),
     resetPasswordToken: z.string().nullable().optional(),
     resetPasswordExpires: z.date().nullable().optional(),
});

export const login_user_schema = z.object({
     email: z.string().email().max(400),
     password: z.string().max(20),
});

export const forgot_Password_Schema = z.object({
     email: z.string().email().max(400),
});

// Zod schema for request validation
export const reset_Password_Schema = z.object({
     email: z.string().email(),
     resetToken: z.string(),
     newPassword: z.string(),
});


export const reset_Password_otp_Schema = z.object({
     email: z.string().email(),
     resetToken: z.string(),
});


export const profileUpdateSchema = z.object({
     name: z.string().optional(),
     email: z.string().email().optional(),
     mobile_number: z.string().optional(),
     password: z.string().optional(),
     role: z.enum(["admin", "user"]).optional(),
     account_status: z
          .enum(["active", "inactive", "unverified", "banned"])
          .optional(),
     account_status_description: z.string().optional(),
     isVerified: z.boolean().optional(),
     verification_Code: z.string().optional()
});

type UserType = z.infer<typeof user_schema>;

export default UserType;