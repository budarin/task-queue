import { taskQueue as schedulerQueue } from './schedulerQueue.js';
import { taskQueue as postMessageTaskQueue } from './postMessageTaskQueue.js';
import { taskQueue as setImmediateTaskQueue } from './setImmediateTaskQueue.js';

const hasScheduler = 'scheduler' in globalThis;

export const taskQueue = window ? (hasScheduler ? schedulerQueue : postMessageTaskQueue) : setImmediateTaskQueue;
