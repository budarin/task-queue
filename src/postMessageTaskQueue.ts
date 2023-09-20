const tasks = [] as Task[];
const channel = new MessageChannel();

function postMessageToTaskQueue() {
    channel.port2.postMessage(undefined);
}

channel.port1.onmessage = async function () {
    const task = tasks.shift();

    if (task && typeof task === 'function') {
        try {
            task();
        } catch (error) {
            console.error('[taskQueue] Error while running task', error);
        }
    }

    if (tasks.length > 0) {
        postMessageToTaskQueue();
    }
};

export const taskQueue = {
    push: (task: Task) => {
        tasks.push(task);
    },
    execute: postMessageToTaskQueue,
};
