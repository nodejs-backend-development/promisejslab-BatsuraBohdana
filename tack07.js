// ==================== ЗАВДАННЯ 7.1 ====================
/**
 * Створіть ланцюжок, який:
 * 1. Починається з числа 5
 * 2. Множить на 2
 * 3. Додає 10
 * 4. Конвертує в рядок
 * * Очікуваний результат: "20"
 */
function simpleChain() {
    return Promise.resolve(5)
        // Множимо на 2: 5 * 2 = 10
        .then(number => number * 2)
        // Додаємо 10: 10 + 10 = 20
        .then(number => number + 10)
        // Конвертуємо в рядок: 20 -> "20"
        .then(number => String(number));
}

// Перевірка:
simpleChain()
    .then(result => {
        console.log(' Тест 7.1:', result);
        console.log(' Тип даних:', typeof result); 
    });


// ==================== ЗАВДАННЯ 7.3 ====================
    /**
 * Створіть функцію, яка:
 * 1. Отримує дані користувача
 * 2. Отримує його пости
 * 3. Рахує кількість постів
 * * @param {number} userId 
 * @returns {Promise<{id: number, username: string, posts: string[], postCount: number}>}
 */
function getUserWithPostCount(userId) {
    // Повертаємо ланцюжок промісів
    return fetchUserData(userId)
        .then(user => fetchUserPosts(user))    // Передаємо результат першої функції у другу
        .then(userData => countPosts(userData)); // Передаємо результат другої у третю
}

// Перевірка:
getUserWithPostCount(123)
    .then(result => {
        console.log(' Тест 7.3:', result);
        console.log(' Кількість постів:', result.postCount);
    });



// ==================== ЗАВДАННЯ 7.5 ====================
    /**
 * Створіть функцію оформлення замовлення:
 * 1. Отримати продукт за ID
 * 2. Перевірити наявність на складі
 * 3. Обчислити вартість
 * 4. Обробити всі можливі помилки
 * * @param {number} productId 
 * @param {number} quantity 
 * @returns {Promise<{product: string, quantity: number, unitPrice: number, total: number} | {error: string}>}
 */
function placeOrder(productId, quantity) {
    return getProduct(productId)
        .then(product => checkStock(product))
        .then(product => calculateTotal(product, quantity))
        // Обробляємо помилки, що виникли на будь-якому етапі вище
        .catch(error => {
            // Замість того, щоб прокидати помилку далі,
            // ми повертаємо об'єкт з описом помилки за умовою
            return { error: error.message };
        });
}

// Перевірка:
placeOrder(101, 2)
    .then(result => console.log(' Тест 7.5a (успіх):', result));

placeOrder(103, 1)
    .then(result => console.log(' Тест 7.5b (немає в наявності):', result));

placeOrder(999, 1)
    .then(result => console.log(' Тест 7.5c (не знайдено):', result));
