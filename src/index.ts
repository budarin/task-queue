const hasScheduler = 'scheduler' in globalThis;
const hasMessageChannel = 'MessageChannel' in globalThis;
const isNode = typeof process === 'object' && process + '' === '[object process]';

function getTaskQueue() {
    if (isNode) {
        return require('./nodeTaskQueue.js');
    }

    if (hasScheduler) {
        return require('./schedulerQueue.js');
    }

    if (hasMessageChannel) {
        return require('./postMessageTaskQueue.js');
    }

    return require('./nodeTaskQueue.js');
}

export const { taskQueue } = getTaskQueue();
