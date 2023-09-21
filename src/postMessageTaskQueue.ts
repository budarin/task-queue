type Task = () => void;
const tasks = [] as Task[];
const channel = new MessageChannel();

function postMessageToTaskQueue() {
    channel.port2.postMessage(undefined);
}

channel.port1.onmessage = async function () {
    const task = tasks.shift();

    if (task) {
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
        if (typeof task === 'function') {
            tasks.push(task);
        } else {
            console.error('[taskQueue] Error: task is not a function!');
        }
    },

    execute: postMessageToTaskQueue,
};
