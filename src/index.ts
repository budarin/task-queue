import { taskQueue as nodeTaskQueue } from './nodeTaskQueue.js';
import { taskQueue as schedulerQueue } from './schedulerQueue.js';
import { getMessageChannelTaskQueue } from './postMessageTaskQueue.js';

const hasScheduler = 'scheduler' in globalThis;
const hasMessageChannel = 'MessageChannel' in globalThis;
const isNode = typeof process === 'object' && process + '' === '[object process]';

function getTaskQueue() {
    if (isNode) {
        return nodeTaskQueue;
    }

    if (hasScheduler) {
        return schedulerQueue;
    }

    if (hasMessageChannel) {
        return getMessageChannelTaskQueue();
    }

    return nodeTaskQueue;
}

export const taskQueue = getTaskQueue();
