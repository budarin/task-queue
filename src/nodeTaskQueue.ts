type Task = () => void;
const tasks = [] as Task[];

export const taskQueue = {
    push: (...tasks: Task[]) => {
        for (const task of tasks) {
            if (typeof task === 'function') {
                tasks.push(task);
            } else {
                console.error('[taskQueue] Error: task is not a function!');
            }
        }
    },

    execute: () => {
        while (tasks.length > 0) {
            const task = tasks.shift();

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
    },
};
