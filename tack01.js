// ==================== ЗАВДАННЯ 1.1 ====================
/**
 * Створіть проміс, який resolve або reject залежно від параметра
 * * @param {boolean} itShouldResolve - Чи повинен проміс успішно виконатися
 * @returns {Promise<string>}
 */
function makePromiseWithConstructor(itShouldResolve) {
    return new Promise((resolve, reject) => {
        if (itShouldResolve) {
            resolve('Success!');
        } else {
            reject('Failed!');
        }
    });
}

// Перевірка:
makePromiseWithConstructor(true)
    .then(result => console.log(' Тест 1.1 (resolve):', result))
    .catch(error => console.log(' Помилка:', error));

makePromiseWithConstructor(false)
    .then(result => console.log(' Не повинно виконатися'))
    .catch(error => console.log(' Тест 1.1 (reject):', error));

    

    // ==================== ЗАВДАННЯ 1.2 ====================
/**
 * Створіть проміс, який резолвиться з числом після перевірки
 * Якщо число парне - resolve, якщо непарне - reject
 * * @param {number} number 
 * @returns {Promise<number, string>}
 */
function checkEvenNumber(number) {
    return new Promise((resolve, reject) => {
        if (number % 2 === 0) {
            // Число ділиться на 2 без залишку (парне)
            resolve(number);
        } else {
            // Число має залишок (непарне)
            reject(`Число ${number} непарне!`);
        }
    });
}

// Перевірка:
checkEvenNumber(4)
    .then(num => console.log(' Тест 1.2 (парне):', num))
    .catch(err => console.log(' Помилка:', err));

checkEvenNumber(5)
    .then(num => console.log(' Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.2 (непарне):', err));



    // ==================== ЗАВДАННЯ 1.4 ====================
/**
 * Створіть проміс, який симулює авторизацію користувача
 * * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{username: string, authenticated: boolean}, string>}
 */
function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        // 1. Перевірка на порожній username
        if (!username || username.trim() === '') {
            return reject('Username is required');
        }

        // 2. Перевірка на порожній password
        if (!password || password.trim() === '') {
            return reject('Password is required');
        }

        // 3. Перевірка довжини пароля
        if (password.length < 6) {
            return reject('Password too short');
        }

        // Якщо всі перевірки пройдені - успіх!
        resolve({
            username: username,
            authenticated: true
        });
    });
}

// Перевірка:
authenticateUser('john', 'password123')
    .then(user => console.log(' Тест 1.4 (успіх):', user))
    .catch(err => console.log(' Помилка:', err));

authenticateUser('', 'password123')
    .then(user => console.log(' Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (немає username):', err));

authenticateUser('john', '12345')
    .then(user => console.log(' Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (короткий пароль):', err));
