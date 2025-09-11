import axios from 'axios';
import { UserResponseData } from '../schemas/userLoginSchema';
import { backend } from '../server';

export const serverHealthCheck = async (accessToken: string): Promise<UserResponseData> => {
  const response = await axios.get<UserResponseData>(
    `http://localhost:8000/auth/test-user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
