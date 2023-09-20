import { schedulerQueue } from "./schedulerQueue.js";
import { postMessageTaskQueue } from "./postMessageTaskQueue.js";

const hasScheduler = "scheduler" in globalThis;

export const taskQueue = hasScheduler ? schedulerQueue : postMessageTaskQueue;
