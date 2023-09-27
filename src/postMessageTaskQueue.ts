type Task = () => void;

export function getMessageChannelTaskQueue() {
    const queue = [] as Task[];
    const channel = new MessageChannel();

    function postMessageToTaskQueue(): void {
        channel.port2.postMessage(undefined);
    }

    channel.port1.onmessage = function (): void {
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

    function push(...tasks: Task[]): void {
        for (const task of tasks) {
            if (typeof task === 'function') {
                queue.push(task);
            } else {
                console.error('[taskQueue] Error: task is not a function!', task);
            }
        }
    }

    function clear(): void {
        queue.length = 0;
    }

    function exec(...tasks: Task[]): void {
        push(...tasks);
        postMessageToTaskQueue();
    }

    return {
        push,
        exec,
        execute: postMessageToTaskQueue,
        clear,
    };
}
