import zod from "zod";

export const queueSchema = zod.object({
  id: zod.string(),
  userName: zod.string(),
  windowId: zod.string(),
  departmentId: zod.string(),
  queueId: zod.string(),
});

export const queuesSchema = zod.object({
  queues: queueSchema.array(),
});

export const createQueueSchema = zod.object({
  queue: queueSchema,
  saved: zod.boolean(),
});
