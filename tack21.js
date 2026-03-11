// ==================== ЗАВДАННЯ 21.1 ====================
class PromiseQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    /**
     * Додати проміс в чергу
     * @param {Function} promiseFactory - Функція що повертає проміс
     */
    add(promiseFactory) {
        // Додаємо функцію-фабрику в масив
        this.queue.push(promiseFactory);
        
        // Якщо черга зараз не активна, запускаємо обробку
        if (!this.processing) {
            this.process();
        }
    }

    async process() {
        // Встановлюємо прапор, що обробка почалася
        this.processing = true;

        // Поки в черзі є завдання
        while (this.queue.length > 0) {
            // Беремо перше завдання (FIFO - First In, First Out)
            const promiseFactory = this.queue.shift();
            
            try {
                // Чекаємо завершення поточного промісу
                await promiseFactory();
            } catch (error) {
                console.error('Error during task execution in queue:', error);
            }
        }

        // Коли черга порожня, скидаємо прапор
        this.processing = false;
    }
}

// Перевірка:
const queue1 = new PromiseQueue();

queue1.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('Test 21.1: Task 1 completed (300ms)');
        resolve(1);
    }, 300);
}));

queue1.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('Test 21.1: Task 2 completed (100ms)');
        resolve(2);
    }, 100);
}));

queue1.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('Test 21.1: Task 3 completed (200ms)');
        resolve(3);
    }, 200);
}));

// ==================== ЗАВДАННЯ 21.3 ====================
class ControllableQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.paused = false;
    }

    add(promiseFactory) {
        this.queue.push(promiseFactory);
        // Запускаємо обробку, тільки якщо черга не на паузі і не працює зараз
        if (!this.processing && !this.paused) {
            this.process();
        }
    }

    pause() {
        this.paused = true;
        console.log('Queue paused');
    }

    resume() {
        if (this.paused) {
            this.paused = false;
            console.log('Queue resumed');
            // Якщо під час паузи обробка зупинилася, запускаємо її знову
            if (!this.processing) {
                this.process();
            }
        }
    }

    async process() {
        if (this.processing) return;
        this.processing = true;

        // Цикл працює, поки є завдання і немає паузи
        while (this.queue.length > 0 && !this.paused) {
            const promiseFactory = this.queue.shift();
            
            try {
                await promiseFactory();
            } catch (error) {
                console.error('Task error in queue:', error);
            }
        }

        // Коли виходимо з циклу, скидаємо прапор обробки
        this.processing = false;
    }
}

// Перевірка:
const queue3 = new ControllableQueue();

queue3.add(() => new Promise(res => setTimeout(() => { 
    console.log('  Task A'); res(); 
}, 50)));

queue3.add(() => new Promise(res => setTimeout(() => { 
    console.log('  Task B'); res(); 
}, 50)));

setTimeout(() => {
    queue3.pause();
    console.log('  Pause trigger called');
}, 100);

setTimeout(() => {
    queue3.add(() => Promise.resolve(console.log('  Task C')));
    queue3.resume();
    console.log('  Resume trigger called');
}, 500);

console.log('Test 21.3: Controllable Queue initialized');


// ==================== ЗАВДАННЯ 21.4 ====================
class TimedQueue {
    constructor(timeout = 5000) {
        this.queue = [];
        this.timeout = timeout;
        this.processing = false;
    }

    add(promiseFactory) {
        this.queue.push(promiseFactory);
        if (!this.processing) {
            this.process();
        }
    }

    async process() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length > 0) {
            const promiseFactory = this.queue.shift();

            // Створюємо проміс-таймер для обмеження часу
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout exceeded')), this.timeout);
            });

            try {
                // Використовуємо Promise.race для змагання між завданням та таймером
                await Promise.race([
                    promiseFactory(),
                    timeoutPromise
                ]);
            } catch (error) {
                console.error(`Task error or cancellation: ${error.message}`);
            }
        }

        this.processing = false;
    }
}

// Перевірка:
const queue4 = new TimedQueue(500);

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('Fast task completed');
        resolve();
    }, 200);
}));

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        // Код виконається асинхронно, але Promise.race вже завершиться за таймаутом
        console.log('This should not affect the queue timing');
        resolve();
    }, 1000);
}));

console.log('Test 21.4: Timed Queue started');
