type Task = () => void;
const queue = [] as Task[];
const channel = new MessageChannel();

function postMessageToTaskQueue() {
    channel.port2.postMessage(undefined);
}

channel.port1.onmessage = async function () {
    const task = queue.shift();

    if (task) {
        try {
            task();
        } catch (error) {
            console.error('[taskQueue] Error while running task', error);
        }
    }

    if (queue.length > 0) {
        postMessageToTaskQueue();
    }
};

export const taskQueue = {
    push: (...tasks: Task[]) => {
        for (const task of tasks) {
            if (typeof task === 'function') {
                queue.push(task);
            } else {
                console.error('[taskQueue] Error: task is not a function!', task);
            }
        }
    },

    execute: postMessageToTaskQueue,
};
