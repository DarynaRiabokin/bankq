import zod from "zod";
import { queuesSchema } from "./queues.schema";
import { QueuesProvider } from "./queues.provider";

export type QueuesType = zod.infer<typeof queuesSchema>;
export type QueueType = QueuesType["queues"][number];
export type QueueCreateType = Pick<QueueType, "userName" | "departmentId">;

export type ContextType = {
  queuesList: List;
  queues: Record<Key, QueueType> | null;
  loadQueues: InstanceType<typeof QueuesProvider>["loadQueues"];
	saveQueue: InstanceType<typeof QueuesProvider>["saveQueue"];
	deleteQueue: InstanceType<typeof QueuesProvider>["deleteQueue"];
};
