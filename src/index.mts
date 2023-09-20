import { postMessageTaskQueue } from "./postMessageTaskQueue.mjs";
import { schedulerQueue } from "./schedulerQueue.mjs";

export const taskQueue =
  "scheduler" in globalThis ? schedulerQueue : postMessageTaskQueue;
