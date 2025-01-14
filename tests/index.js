// подключение express
const fs = require('node:fs');
const express = require('express');
const path = require('node:path');
// создаем объект приложения
const app = express();
const PORT = 3000;

const extractFileName = (fullPath) => fullPath.replace(/^.*[\\/]/, '');
// замена import chai на глобальную переменную
// добавление .js т.к. ,rowser module не может без них читать import
const toESImport = (content) => content
    .replace('import { expect } from \'chai\';', 'const { expect } = chai;')
    .replace(/^import\s*[^;]((?!\.js).)*(';)$/gm, (m) => m.replace('\';', '.js\';'));

// определяем обработчик для маршрута "/"
app.get('/', (request, response) => {
    const file = path.join(__dirname, 'index.html');
    const data = fs.readFileSync(file, 'utf8');
    // отправляем ответ
    response.send(data);
});
app.get('chai', (request, response) => {
    console.log('chai !!!!!');

    response.send('');
});

app.get(['/*.js'], (request, response) => {
    let file = request.originalUrl;
    file += (file.indexOf('.js') === -1 ? '.js' : '');

    // преобразуем маршруты в реальные
    if (request.originalUrl.indexOf('-test') > -1) {
        file = path.join(__dirname, file);
    } else {
        file = path.join(__dirname, '../', file);
    }

    if (fs.existsSync(file)) {
        // console.log({ request: request.originalUrl, response: file, name: request.params[0] });
        const content = toESImport(fs.readFileSync(file, 'utf8'));
        response.set({
            'Content-type': 'application/javascript;charset=UTF-8',
            'Content-Disposition': `attachment; filename=${extractFileName(request.params[0])}.js`,
        });
        response.send(content);
        // response.sendFile(file);
    } else {
        console.log({ exists: false, request: request.originalUrl, response: file });
        response.send('');
    }
});

// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
    console.log('------------------------');
    console.log(`start server on port ${PORT}`);
    console.log({
        url: `http://localhost:${PORT}`,
        dirname: __dirname,
    });
});
