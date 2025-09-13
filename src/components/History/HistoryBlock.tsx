import React from "react";
import Image from "next/image";
import { Chu, Juberto } from "@/assets";
import { Label } from "../shared/Label";

type HistoryBlockProps = {
  winner?: string | number | null;
  rounds?: (string | number | null)[];
  createdAt: Date | string;
  score?: {
    player1: number;
    player2: number;
  };
};

export const HistoryBlock = ({
  winner,
  rounds = [],
  createdAt,
  score,
}: HistoryBlockProps) => {
  const renderWinner = () => {
    if (winner === "1" || winner === 1) {
      return (
        <Image
          src={Chu}
          alt="Player 1"
          fill
          className="md:w-[200px] absolute inset-0 object-cover  -z-0 pointer-events-none"
        />
      );
    } else if (winner === "2" || winner === 2) {
      return (
        <Image
          src={Juberto}
          alt="Player 2"
          fill
          className="md:w-[200px] absolute object-top inset-0 object-cover   -z-0 pointer-events-none"
        />
      );
    } else {
      return (
        <div className="flex absolute inset-0 w-full h-full -z-0 flex-row">
          <div className="relative w-1/2 h-full overflow-hidden">
            <Image
              src={Chu}
              alt="Player 1"
              fill
              className="object-cover object-top md:scale-200 translate-y-16 md:translate-x-10 transform  pointer-events-none"
            />
          </div>
          <div className="relative w-1/2 h-full overflow-hidden">
            <Image
              src={Juberto}
              alt="Player 2"
              fill
              className="object-cover object-top md:scale-200 translate-y-20 transform  pointer-events-none"
            />
          </div>
        </div>
      );
    }
  };

  const displayDate =
    createdAt instanceof Date ? createdAt : new Date(createdAt);

    const playerScores = {
  player1: 0,
  player2: 0,
  ties: 0,
};

rounds.forEach((r) => {
  if (r === 1 || r === "1") playerScores.player1++;
  else if (r === 2 || r === "2") playerScores.player2++;
  else if (r === 0 || r === "0") playerScores.ties++;
});

 return (
  <div className="relative p-4 rounded-md shadow-sm bg-beige overflow-hidden">
    {renderWinner()}

    <div className="relative z-10 bg-white/80 p-2">
      <div className="flex items-center justify-between">
        <Label className="text-3xl">
          {winner === "tie" || !winner ? "Tie Game" : `Player ${winner} Won`}
        </Label>
        <span className="text-lg text-gray-500">
          {displayDate.toLocaleDateString()}
        </span>
      </div>

      <div className="text-2xl flex flex-col p-4  rounded-md shadow-2xs">
        <Label className="text-gray-800 text-start text-shadow-black">
          Game Summary:
        </Label>
        <Label className="text-gray-800 text-shadow-black px-10 text-2xl flex flex-col">
          <div className="flex items-center w-full flex-nowrap">
            <span className="text-nowrap">Player X Score:</span>
            <div className="border-dashed w-full mx-4 border-b-2" />
            {score?.player1 ?? 0}
          </div>

          <div className="flex items-center w-full flex-nowrap">
            <span className="text-nowrap">Player O Score:</span>
            <div className="border-dashed w-full mx-4 border-b-2" />
            {playerScores.player2}
          </div>

          <div className="flex items-center w-full flex-nowrap">
            <span className="text-nowrap">Round Draws:</span>
            <div className="border-dashed w-full mx-4 border-b-2" />
           {playerScores.ties}
          </div>

          <div className="flex items-center w-full flex-nowrap">
            <span className="text-nowrap">Rounds Played:</span>
            <div className="border-dashed w-full mx-4 border-b-2" />
            {rounds?.length ?? 0}
          </div>
        </Label>
      </div>
    </div>
  </div>
);

};
