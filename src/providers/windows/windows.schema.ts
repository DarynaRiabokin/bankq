import zod from "zod";

export const windowsSchema = zod.object({
  windows: zod
    .object({
      id: zod.string(),
      name: zod.string(),
      departments: zod.string().array(),
    })
    .array(),
});
