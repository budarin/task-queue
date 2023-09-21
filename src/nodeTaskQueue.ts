type Task = () => void;
const queue = [] as Task[];

function push(...tasks: Task[]) {
    for (const task of tasks) {
        if (typeof task === 'function') {
            queue.push(task);
        } else {
            console.error('[taskQueue] Error: task is not a function!', task);
        }
    }
}

function exec(...tasks: Task[]) {
    push(...tasks);
    execute();
}

function execute() {
    while (queue.length > 0) {
        const task = queue.shift();

        if (task) {
            // setImmediate(() => {
            try {
                task();
            } catch (error) {
                console.error('[taskQueue] Error while running task', error);
            }
            // });
        }
    }
}

export const taskQueue = {
    push,
    exec,
    execute,
};
