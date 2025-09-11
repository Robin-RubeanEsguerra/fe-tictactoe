"use server";
import { cookies } from "next/headers";
import axios from "axios"
import { Cookie } from "next/font/google";
import { RegisterUserData } from "../schemas/registerUserSchema";
import { UserLoginData, UserResponseData } from "../schemas/userLoginSchema";
import { backend } from "../server";
;

export const login = async (values: UserLoginData) => {
  try {
    const { email, password } = values;
    const response = await fetch(`${backend}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorMsg = "Login failed";
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (values: RegisterUserData) => {
  try {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const response = await fetch(`${backend}/auth/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      let errorMsg = "Register failed";
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
      console.log(errorData);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};


export const healthCheck = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("No access token found");
  }

const response = await axios.get<UserResponseData>(`${backend}/auth/test-user`,  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return response;
};

export const logoutUser = async() => {
  const cookieStore = await cookies(); 
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  } 

  const response = await axios.post(
    `${backend}/auth/logout`,
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );

   cookieStore.delete("accessToken");
  return response.data;
};
