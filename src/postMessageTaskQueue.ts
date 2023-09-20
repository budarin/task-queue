type Task = () => void;

const tasks = [] as Task[];
const channel = new MessageChannel();
const hasNavigatorScheduling =
  "navigator" in globalThis &&
  "scheduling" in navigator &&
  //@ts-ignore
  "isInputPending" in navigator.scheduling;

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
      //@ts-ignore
      if (hasNavigatorScheduling && navigator.scheduling.isInputPending()) {
        await yieldToMain();
      }

      postMessageToTaskQueue();
    }
  }
};

export const postMessageTaskQueue = {
  push: (task: Task) => {
    tasks.push(task);
  },
  execute: postMessageToTaskQueue,
};
