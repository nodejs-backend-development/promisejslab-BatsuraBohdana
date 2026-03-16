// ==================== ЗАВДАННЯ 11.1 ====================
function analyzeResults(promises) {
    return Promise.allSettled(promises)
        .then(results => {
            const stats = {
                successful: 0,
                failed: 0,
                results: results
            };

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


const testPromises1 = [
    Promise.resolve(1),
    Promise.reject(new Error('Fail')),
    Promise.resolve(3),
    Promise.reject(new Error('Another fail')),
    Promise.resolve(5)
];

analyzeResults(testPromises1)
    .then(stats => {
        console.log(` Тест 11.1: Успішно: ${stats.successful}, Помилок: ${stats.failed}`);
    });


// ==================== ЗАВДАННЯ 11.2 ====================

/**
 * Додаємо функцію sendEmail, якої не вистачало.
 * Вона імітує відправку: успішно для парних, помилка для непарних.
 */
function sendEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email.includes('3')) {
                reject(new Error('SMTP Error'));
            } else {
                resolve('Success');
            }
        }, 100);
    });
}

async function sendBulkEmails(emails) {
    const emailPromises = emails.map(email => sendEmail(email));
    const results = await Promise.allSettled(emailPromises);

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

const emails = ['user1@test.com', 'user2@test.com', 'user3@test.com', 'user4@test.com'];
sendBulkEmails(emails)
    .then(result => {
        console.log(' Тест 11.2 (Розсилка завершена):');
        console.log(` Відправлено: ${result.sent}`);
        console.log(` Помилок: ${result.failed}`);
        
        console.log(' Деталі статусів:');
        result.details.forEach((item, index) => {
            console.log(`  - Тест №${index + 1}: ${item.status}`);
        });
    });
