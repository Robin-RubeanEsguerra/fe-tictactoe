import { z } from "zod";

export const savedGameRoundSchema = z.object({
  status: z.string(), // You can change this to z.enum(["ongoing", "finished", etc.])
  gameUuid: z.string().uuid(),
  _id: z.string(),
  gameRoundUuid: z.string().uuid(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  __v: z.number(),
});

export const savedGameInstanceSchema = z.object({
  _id: z.string(),
  status: z.string(), // Optionally: z.enum(["ongoing", "finished", ...])
  gameRounds: z.array(z.string().uuid()),
  gameUuid: z.string().uuid(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  __v: z.number(),
  userUuid: z.string().uuid(),
  roundsPlayed: z.number(),
});

export const gameRoundSchema = z.object({
  savedGameRound: savedGameRoundSchema,
  savedGameInstance: savedGameInstanceSchema,
});

export type GameRoundData = z.infer<typeof gameRoundSchema>;

export const gameRoundSchema2 = z.object({
  updatedGameRound: savedGameRoundSchema,
  savedGameInsupdatedGameInstancetance: savedGameInstanceSchema,
});

export type GameRoundData2 = z.infer<typeof gameRoundSchema2>;

const gameScoreSchema = z.object({
  _id: z.string(),
  status: z.enum(["completed", "ongoing"]),
  gameUuid: z.string(),
  gameRoundUuid: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  __v: z.number(),
  winner: z.number().int().optional(), // Optional because last round has no winner yet
});

export const gameRoundsResponseSchema = z.object({
  player1Score: z.number().int(),
  player2Score: z.number().int(),
  draws: z.number().int(),
  rounds: z.number().int(),
  gameRounds: z.array(gameScoreSchema),
});


export type GameRoundsScoreResponse = z.infer<typeof gameRoundsResponseSchema>;