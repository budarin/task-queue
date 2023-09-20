const tasks = [] as Task[];

export const taskQueue = {
    push: (task: Task) => {
        tasks.push(task);
    },
    execute: () => {
        while (tasks.length > 0) {
            const task = tasks.shift();

            if (task && typeof task === 'function') {
                setImmediate(() => {
                    try {
                        task();
                    } catch (error) {
                        console.error('[taskQueue] Error while running task', error);
                    }
                });
            }
        }
    },
};
