type Task = () => void;
const queue = [] as Task[];

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

    execute: async () => {
        while (queue.length > 0) {
            const task = queue.shift();

            if (task) {
                // @ts-ignore
                await scheduler.postTask(task);
            }
        }
    },
};
