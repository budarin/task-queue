# task-queue

Isomorphic task queue with optimized performance.

Usage example:

```js
import { taskQueue } from '@budarin/task-queue';

let t = performance.now();

for (let i = 0; i < 5; i++) {
    taskQueue.push(() => {
        console.log(performance.now() - t);
        t = performance.now();
    });
}

taskQueue.execute();
```

The output:

```
0.5
0.09999999403953552
0
0.10000000894069672
0.09999999403953552
```
