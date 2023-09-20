type Task = () => void;

const tasks = [] as Task[];
const channel = new MessageChannel();

function yieldToMain() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

function postMessageToTaskQueue() {
  channel.port2.postMessage(undefined);
}

channel.port1.onmessage = async function () {
  if (tasks.length > 0) {
    const task = tasks.shift();

    if (typeof task === "function") {
      try {
        task();
      } catch (error) {}
    }

    if (tasks.length > 0) {
      if (
        "scheduling" in navigator &&
        //@ts-ignore
        "isInputPending" in navigator.scheduling &&
        //@ts-ignore
        navigator.scheduling.isInputPending()
      ) {
        await yieldToMain();
      }

      postMessageToTaskQueue();
    }
  }
};

export const postMessageTaskQueue = {
  push: (task) => {
    tasks.push(task);
  },
  execute: postMessageToTaskQueue,
};
