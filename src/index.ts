import { postMessageTaskQueue } from "./postMessageTaskQueue.js";
import { schedulerQueue } from "./schedulerQueue.js";

export const taskQueue =
  "scheduler" in globalThis ? schedulerQueue : postMessageTaskQueue;
