"use client";
import { GameRoundsScoreResponse } from "@/lib/schemas/gameRoundSchema";
import { getGameData } from "@/lib/services/gameRound";
import { useEffect, useState } from "react";
import { Label } from "../shared/Label";
import { SpecialButton } from "../shared/Button";
import { Button1 } from "@/assets";
import { LoadingCircle } from "../shared/LoadingCircle";
import { showErrorDialog } from "../shared/ErrorDialog";

type ScoreboardProps = {
  gameUuid: string;
};

export const Scoreboard = ({ gameUuid }: ScoreboardProps) => {
  const [scoreData, setScoreData] = useState<GameRoundsScoreResponse | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameData({ gameUuid });
        setScoreData(data);
      } catch (error: unknown) {
        showErrorDialog({
          error: error as Error,
          actionText: "Return Home",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/`;
          }
        });
      }
    };

    fetchData();
  }, [gameUuid]);

  if (!scoreData) {
    return (
      <div className="my-4">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Label className=" text-4xl md:text-5xl" variant="secondary">
        Round {scoreData.rounds}
      </Label>
      <SpecialButton backgroundImage={Button1} className="w-full h-[50px] lg:my-4">
        <Label className="text-white w-full text-center grid grid-cols-3 text-shadow-gray-500 text-2xl md:text-3xl px-10 py-2">
          <span>X-{scoreData.player1Score}</span>
          <span>Draw-{scoreData.draws}</span>
          <span>0-{scoreData.player2Score}</span>
        </Label>
      </SpecialButton>
    </div>
  );
};
