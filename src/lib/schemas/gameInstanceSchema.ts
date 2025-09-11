import { z } from "zod";

export const gameInstanceSchema = z.object({
  status: z.string(), 
  gameRounds: z.array(z.any()), 
  _id: z.string(), 
  gameUuid: z.string(), 
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  __v: z.number(),
  userUuid: z.string(),
});

export type GameInstanceData = z.infer<typeof gameInstanceSchema>;



export const endGameSchema = z.object({
  _id: z.string(),
  status: z.string(), 
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

  winner: z.string(),

  score: z.object({
    player1: z.number().int(),
    player2: z.number().int(),
  }),
});

export type EndGameInstanceData = z.infer<typeof endGameSchema>;








const GameRoundSchema = z.object({
  _id: z.string(),
  status: z.string(),
  gameUuid: z.string(),
  gameRoundUuid: z.string(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  __v: z.number(),
  winner: z.union([z.number(), z.string()]),
});

const ScoreSchema = z.object({
  player1: z.number(),
  player2: z.number(),
});

const GameSchema = z.object({
  score: ScoreSchema,
  _id: z.string(),
  status: z.string(),
  gameRounds: z.array(GameRoundSchema),
  gameUuid: z.string(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  __v: z.number(),
  userUuid: z.string(),
  roundsPlayed: z.number(),
  winner: z.union([z.string(), z.number()]),
});

const ResponseSchema = z.object({
  items: z.array(GameSchema),
});

export type GameInstanceHistoryData = z.infer<typeof ResponseSchema>;