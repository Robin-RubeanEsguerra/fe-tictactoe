import { z } from "zod";

const moveSchema = z.object({
  gameRoundUuid: z.string().uuid(),
  turnNumber: z.number().int().positive(),
  player: z.string(), // or z.enum(["1", "2"]) if you want to restrict player values
  index: z.number().int().min(0).max(8),
  _id: z.string(),
  moveUuid: z.string().uuid(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  __v: z.number().int().nonnegative(),
});

export type MoveData = z.infer<typeof moveSchema>;