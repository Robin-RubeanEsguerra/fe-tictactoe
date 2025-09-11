"use client";
import { Button1 } from "@/assets";
import { SpecialButton } from "../shared/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../shared/Dialog";
import { useEffect, useState } from "react";
import { getGameHistory } from "@/lib/services/gameInstance";
import { GameInstanceHistoryData } from "@/lib/schemas/gameInstanceSchema";
import { UseAuthStore } from "@/lib/store/use-logged-in-user";
import { LoadingCircle } from "../shared/LoadingCircle";
import { HistoryBlock } from "./HistoryBlock";
import { Label } from "../shared/Label";
import Swal from "sweetalert2";

export const HistoryDialog = () => {
  const [games, setGames] = useState<GameInstanceHistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, initializeAuth } = UseAuthStore();

  // Initialize auth once
  
  useEffect(() => {
    initializeAuth();

    if (!isAuthenticated) {
       return;
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGameHistory();
        setGames(data);
        console.log(data);
      } catch (error: unknown) {
        setError("Failed to load game history.");
        Swal.fire({
          title: "Oops...",
          text: "Failed to load game history.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SpecialButton backgroundImage={Button1}>History</SpecialButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle className="flex justify-center">
            <Label
              variant="primary"
              className="text-center text-5xl font-normal "
            >
              Game History
            </Label>
          </DialogTitle>
          <DialogDescription className="flex justify-center" />

          {loading && <LoadingCircle />}

          {!loading && !isAuthenticated && (
            <p className="text-red-500">Please login to view your history.</p>
          )}

          {!loading && error && <p className="text-red-500">{error}</p>}

          <div className="max-h-[500px] overflow-y-auto">
            {!loading &&
              isAuthenticated &&
              !error &&
              (games && games.items.length > 0 ? (
                <div className="flex flex-col gap-4 mt-4">
                  {games.items
                    .filter((game) => game.status === "completed")
                    .map((game, index) => (
                      <HistoryBlock
                        key={index}
                        winner={game.winner}
                        rounds={game.gameRounds.map((round) => round.winner)}
                        createdAt={new Date(game.createdAt)}
                        score={game.score}
                      />
                    ))}
                </div>
              ) : (
                <Label
                  variant="custom"
                  className="text-gray-600  text-shadow-gray-950 text-3xl flex justify-center"
                >
                  No games yet.
                </Label>
              ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
