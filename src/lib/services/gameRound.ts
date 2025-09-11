"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { backend } from "../server";
import { GameRoundData, GameRoundData2, GameRoundsScoreResponse } from "../schemas/gameRoundSchema";

type GameRoundProps = {
    gameUuid: string;
}
export const createGameRound = async ({gameUuid}: GameRoundProps) => {
  const cookieStore = await cookies(); 
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  } 

  const response = await axios.post<GameRoundData>(
    `${backend}/game-round/${gameUuid}`,
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

export const endGameRound = async ({ gameRoundUuid ,winner}: { gameRoundUuid: string ,winner:number}) => {
  const cookieStore = await cookies(); 
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  } 

  const response = await axios.put<GameRoundData2>(
    `${backend}/game-round/end/${gameRoundUuid}`,
    {winner}, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );


  return response.data;
};

export const getGameData = async({gameUuid}: GameRoundProps) => {
  const cookieStore = await cookies(); 
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  } 

  const response = await axios.get<GameRoundsScoreResponse>(
    `${backend}/game-round/get-by-game/${gameUuid}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );


  return response.data;
};