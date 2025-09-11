"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { backend } from "../server";
import { EndGameInstanceData, GameInstanceData, GameInstanceHistoryData } from "../schemas/gameInstanceSchema";

export const createGameInstance = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const response = await axios.post<GameInstanceData>(
    `${backend}/game-instance/start`,
    null, // No request body
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const endGameInstance = async ({ gameUuid }: { gameUuid: string }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const response = await axios.put<EndGameInstanceData>(
    `${backend}/game-instance/end/${gameUuid}`,
    null, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};  

export const getGameHistory = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const response = await axios.get<GameInstanceHistoryData>(
    `${backend}/game-instance/get-by-user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};  