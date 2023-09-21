type Task = () => void;
const tasks = [] as Task[];

export const taskQueue = {
    push: (task: Task) => {
        if (typeof task === 'function') {
            tasks.push(task);
        } else {
            console.error('[taskQueue] Error: task is not a function!');
        }
    },

    execute: async () => {
        while (tasks.length > 0) {
            const task = tasks.shift();

            if (task) {
                // @ts-ignore
                await scheduler.postTask(task);
            }
        }
    },
};
