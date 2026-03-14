// ==================== ЗАВДАННЯ 2.1 ====================
/**
 * Створіть проміс, який одразу резолвиться зі значенням
 * * @param {any} value - Будь-яке значення
 * @returns {Promise<any>}
 */
function makePromiseResolveWith(value) {
    // Використовуємо статичний метод для миттєвого створення успішного промісу
    return Promise.resolve(value);
}

// Перевірка:
makePromiseResolveWith(5)
    .then(value => console.log(' Тест 2.1:', value)); 

makePromiseResolveWith("Hello World")
    .then(value => console.log(' Тест 2.1 (рядок):', value));



    // ==================== ЗАВДАННЯ 2.2 ====================
/**
 * Створіть функцію, яка приймає масив чисел
 * і повертає проміс з сумою цих чисел
 * * @param {number[]} numbers 
 * @returns {Promise<number>}
 */
function sumNumbers(numbers) {
    // Рахуємо суму за допомогою reduce
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    
    // Повертаємо проміс, який миттєво резолвиться з результатом
    return Promise.resolve(sum);
}

// Перевірка:
sumNumbers([1, 2, 3, 4, 5])
    .then(sum => console.log(' Тест 2.2:', sum)); 




    // ==================== ЗАВДАННЯ 2.7 ====================
/**
 * Створіть функцію-обгортку для синхронних функцій,
 * яка перехоплює помилки та повертає проміс
 * * @param {Function} fn - Синхронна функція
 * @param {any[]} args - Аргументи для функції
 * @returns {Promise<any>}
 */
function tryCatchPromise(fn, ...args) {
    try {
        const result = fn(...args);
        // Повертаємо успішний проміс із результатом
        return Promise.resolve(result);
    } catch (error) {
        // Якщо функція "впала" з помилкою (throw), повертаємо rejected проміс
        return Promise.reject(error);
    }
}

// Перевірка:
const goodFunction = (a, b) => a + b;
const badFunction = () => { throw new Error('Oops!'); };

tryCatchPromise(goodFunction, 5, 3)
    .then(result => console.log(' Тест 2.7a (успіх):', result)); 

tryCatchPromise(badFunction)
    .catch(error => console.log(' Тест 2.7b (помилка):', error.message)); 
