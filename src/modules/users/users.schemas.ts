import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const createUserBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  applicationId: z.string().uuid(),
  password: z.string().min(6),
  initialUser: z.boolean().optional(),
});

export type createUserBody = z.infer<typeof createUserBodySchema>;

export const createUSerJsonSchema = {
  body: zodToJsonSchema(createUserBodySchema, "createUserBodySchema"),
};
