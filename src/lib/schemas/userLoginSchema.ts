import z from 'zod';
export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserLoginData = z.infer<typeof userLoginSchema>;


export const userSchemaResponse = z.object({
  _id: z.string(),
  username: z.string().email(),
  email: z.string().email(),
  userUuid: z.string().uuid(),
  __v: z.number(),
  accessToken: z.string(),
  accessTokenExpiration: z.number(),
  refreshToken: z.string(),
});

export type UserResponseData = z.infer<typeof userSchemaResponse>;