// подключение express
const fs = require('node:fs');
const express = require('express');
const path = require('node:path');
// создаем объект приложения
const app = express();
console.log(__dirname);
// определяем обработчик для маршрута "/"
app.get('/', (request, response) => {
    const file = path.join(__dirname, 'index.html');
    const data = fs.readFileSync(file, 'utf8');
    // отправляем ответ
    response.send(data);
});

app.get('/*.js', (request, response) => {
    let file;
    if (request.originalUrl.indexOf('test.') > -1) {
        file = path.join(__dirname, request.originalUrl);
    } else {
        file = path.join(__dirname, '../', request.originalUrl);
    }
    console.log({ file, o: request.originalUrl });
    response.sendFile(file);
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
