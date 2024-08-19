import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type TDog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type TDogToAddOrUpdate = Omit<TDog, "id">;

export type Dog = z.infer<typeof dogSchema>;
