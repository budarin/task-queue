# task-queue

Isomorphic task queue with optimized performance.

Usage example:

```js
import { taskQueue } from '@budarin/task-queue';

let t = performance.now();

taskQueue.push(() => {
    const t1 = performance.now();
    console.log(t1 - t);
    t = t1;
});

taskQueue.push(() => {
    const t1 = performance.now();
    console.log(t1 - t);
    t = t1;
});

taskQueue.push(() => {
    const t1 = performance.now();
    console.log(t1 - t);
    t = t1;
});

taskQueue.push(() => {
    const t1 = performance.now();
    console.log(t1 - t);
    t = t1;
});

taskQueue.execute();
```

The output:

```
0.5999999642372131
0.19999998807907104
0.30000001192092896
0.19999998807907104
```
