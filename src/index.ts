import { taskQueue as nodeTaskQueue } from './nodeTaskQueue.js';
import { taskQueue as schedulerQueue } from './schedulerQueue.js';
import { taskQueue as postMessageTaskQueue } from './postMessageTaskQueue.js';

const hasScheduler = 'scheduler' in globalThis;

export const taskQueue =
    'window' in globalThis ? (hasScheduler ? schedulerQueue : postMessageTaskQueue) : nodeTaskQueue;
