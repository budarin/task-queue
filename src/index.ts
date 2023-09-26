const hasScheduler = 'scheduler' in globalThis;
const hasMessageChannel = 'MessageChannel' in globalThis;

function getTaskQueue() {
    if (hasScheduler) {
        return require('./schedulerQueue.js').taskQueue;
    }

    if (hasMessageChannel) {
        return require('./postMessageTaskQueue.js').taskQueue;
    }

    return require('./nodeTaskQueue.js').taskQueue;
}

export const taskQueue = { taskQueue: getTaskQueue() };
