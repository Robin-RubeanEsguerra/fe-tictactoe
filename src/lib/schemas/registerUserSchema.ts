import z from 'zod';

export const registerUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;