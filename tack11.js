// ==================== ЗАВДАННЯ 11.1 ====================
/**
 * Використайте Promise.allSettled() для обробки масиву промісів
 * Порахуйте скільки успішних і скільки невдалих
 */
function analyzeResults(promises) {
    return Promise.allSettled(promises)
        .then(results => {
            // Створюємо об'єкт для підрахунку статистики
            const stats = {
                successful: 0,
                failed: 0,
                results: results // зберігаємо повний масив станів
            };

            // Проходимо по кожному результату
            results.forEach(res => {
                if (res.status === 'fulfilled') {
                    stats.successful++;
                } else if (res.status === 'rejected') {
                    stats.failed++;
                }
            });

            return stats;
        });
}

// Перевірка:
const testPromises1 = [
    Promise.resolve(1),
    Promise.reject(new Error('Fail')),
    Promise.resolve(3),
    Promise.reject(new Error('Another fail')),
    Promise.resolve(5)
];

analyzeResults(testPromises1)
    .then(stats => {
        console.log(' Тест 11.1:', stats);
        // Очікується: {successful: 3, failed: 2, results: [...]}
    });

// ==================== ЗАВДАННЯ 11.2 ====================
    /**
 * @param {string[]} emails 
 * @returns {Promise<{sent: number, failed: number, details: object[]}>}
 */
async function sendBulkEmails(emails) {
    // 1. Створюємо масив промісів для кожного імейла
    const emailPromises = emails.map(email => sendEmail(email));

    // 2. Чекаємо на завершення всіх спроб
    const results = await Promise.allSettled(emailPromises);

    // 3. Агрегуємо статистику
    const stats = {
        sent: 0,
        failed: 0,
        details: results
    };

    results.forEach(res => {
        if (res.status === 'fulfilled') {
            stats.sent++;
        } else {
            stats.failed++;
        }
    });

    return stats;
}

// Перевірка:
const emails = ['user1@test.com', 'user2@test.com', 'user3@test.com', 'user4@test.com'];
sendBulkEmails(emails)
    .then(result => {
        console.log(' Тест 11.2 (Розсилка завершена):');
        console.log(` Відправлено: ${result.sent}`);
        console.log(` Помилок: ${result.failed}`);
        console.log(' Деталі:', result.details);
    });
