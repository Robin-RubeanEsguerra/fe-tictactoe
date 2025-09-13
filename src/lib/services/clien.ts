import axios from 'axios';
import { UserResponseData } from '../schemas/userLoginSchema';
import { next_private } from '../server';

export const serverHealthCheck = async (accessToken: string): Promise<UserResponseData> => {
  const response = await axios.get<UserResponseData>(
    `${next_private}/auth/test-user`,  
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
