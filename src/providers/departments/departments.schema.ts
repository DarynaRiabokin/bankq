import zod from "zod";

export const departmentsSchema = zod.object({
  departments: zod
    .object({
      id: zod.string(),
      name: zod.string(),
    })
    .array(),
});
