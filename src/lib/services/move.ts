"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { backend } from "../server";

type Move = {
  index: number;
  player: number;
};

type MoveProps = {
    gameRoundUuid: string;
     moves: Move[];
}

export const createMoves = async ({gameRoundUuid, moves}: MoveProps) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No access token found");
  }

const response = await axios.post(
  `${backend}/move/bulk/${gameRoundUuid}`,
  moves, // send just the array
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  }
);


  return response.data;
};
