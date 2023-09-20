type Task = () => void;

const tasks = [] as Task[];

export const schedulerQueue = {
  push: (task) => {
    tasks.push(task);
  },

  execute: async () => {
    while (tasks.length > 0) {
      const task = tasks.shift();

      if (typeof task === "function") {
        // @ts-ignore
        await scheduler.postTask(task);
      }
    }
  },
};
