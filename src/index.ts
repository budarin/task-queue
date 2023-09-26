const hasScheduler = 'scheduler' in globalThis;
const hasMessageChannel = 'MessageChannel' in globalThis;

function getTaskQueue() {
    if (hasScheduler) {
        return require('./schedulerQueue.js');
    }

    if (hasMessageChannel) {
        return require('./postMessageTaskQueue.js');
    }

    return require('./nodeTaskQueue.js');
}

export const taskQueue = getTaskQueue();
