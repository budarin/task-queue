# task-queue

Isomorphic task queue with optimized performance.

The incentive to write this package was the article: ["Task Scheduler: do not freeze the tab when opening the page"](https://habr.com/ru/companies/jugru/articles/716620/)

This package will help improve some of the key metrics - FID, TTI and TBT.
It is known that for many complex applications, due to the large number of sequentially executed tasks, app initialization takes quite a long time, which worsens these metrics.

In order to give the event loop a little sigh between the execution of numerous tasks, you can use `setTimeout(f, 0)`, but the problem arises that if there are more than `4` tasks in the queue, `setTimeout` will start executing with a delay of `4ms` - this is very much in the case of application initialization (we need to initialize the application as quickly as possible).

Under the hood, various techniques are implemented for different environments and browsers:

-   for modern browsers - `scheduler.postTask(task)`
-   for the rest - `MessageChannel` is used with a `postMessage` call
-   for `Node.js` - `setImmediate`

Usage example:

```js
import { taskQueue } from '@budarin/task-queue';

let t = performance.now();

const f = () => {
    console.log(performance.now() - t);
    t = performance.now();
};

// pushing tasks to the queue for executing them lately
taskQueue.push(f);
taskQueue.push(f, f, f, f);

// executing tasks in queue
taskQueue.execute();

// executing tasks in queue immediately after pushing them to the queue
taskQueue.exec(f);

taskQueue.push(f);
taskQueue.push(f);
// executing tasks in queue immediately after pushing them to the queue
taskQueue.exec(f, f);

taskQueue.push(f, f, f, f);
// clearing taskQueue
taskQueue.clear();
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

Distributed CommonJS modules are generated for ES6, and ESM modules are generated for ESNext version of JavaScript.

Below is an example of the original flame-graph of long-term initialization of the application

![log task](assets/long-task.png)

and an example of optimizing long initialization by splitting it into small tasks that do not block for a long time the main thread

![ыьфдд ефылы](assets/small-tasks.png)
