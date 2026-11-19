// src/utils/validation.ts
import { z } from "zod";

export const signinSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(8).max(72),
});

export const signupSchema = signinSchema.extend({
  username: z.string().trim().min(2).max(30),
});

/* Q. why use Zod even when we already use TypeScript ? 
- TypeScript provides compile-time type safety, but it cannot validate external data at runtime because its types and interfaces are removed during compilation.

- For example, when an API receives a request body from the client, TypeScript cannot guarantee that the incoming data follows our expected structure.

- We use Zod to define runtime validation schemas that check the actual incoming data, enforce constraints, and transform values when required.

- Another advantage is that Zod allows us to infer TypeScript types directly from schemas using z.infer, so we don't have to maintain separate validation rules and TypeScript interfaces.

- So, TypeScript protects us while writing code, whereas Zod protects our application when it receives external data.
*/
