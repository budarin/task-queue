import { schedulerQueue } from "./schedulerQueue.js";
import { postMessageTaskQueue } from "./postMessageTaskQueue.js";

export const taskQueue =
  "scheduler" in globalThis ? schedulerQueue : postMessageTaskQueue;
