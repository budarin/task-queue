import { taskQueue as schedulerQueue } from './schedulerQueue.js';
import { taskQueue as postMessageTaskQueue } from './postMessageTaskQueue.js';

const hasScheduler = 'scheduler' in globalThis;

export const taskQueue = hasScheduler ? schedulerQueue : postMessageTaskQueue;
