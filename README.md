# task-queue

Isomorphic task queue with optimized performance.

In order to give the event loop a little sigh between the execution of numerous tasks, you can use `setTimeout(f, 0)`, but the problem arises that if there are more than `4` tasks in the queue, `setTimeout` will start executing with a delay of `4ms` - this is very much in the case of application initialization (we need to initialize the application as quickly as possible).

Under the hood, various techniques are implemented for different environments and browsers:

-   for modern browsers - `scheduler.postTask(task)`
-   for the rest - `MessageChannel` is used with a `postMessage` call
-   for `Node.js` uses a simple task call

Usage example:

```js
import { taskQueue } from '@budarin/task-queue';

let t = performance.now();

const f = () => {
    console.log(performance.now() - t);
    t = performance.now();
};

// pushing tsks to the queue for executing them lately
taskQueue.push(f);
taskQueue.push(f, f, f, f);

taskQueue.execute();

// execute tasks immediately after pushing them to the queue
taskQueue.exec(f);
// execute tasks immediately after pushing them to the queue
taskQueue.exec(f, f, f, f);
```

Example of output of time delays between task execution - they are very small:

```
0.5
0.09999999403953552
0
0.10000000894069672
0.09999999403953552
```

It can be seen that there is time between tasks so that the event loop can check and, if available, perform other tasks.
This time is very small and does not add a significant overhead to the overall execution of tasks in the queue.
