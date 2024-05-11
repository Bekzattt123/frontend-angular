const express = require('express');
const path = require('path');
const app = express();

// Определение каталога, где находятся статические файлы Angular
const angularPath = path.join(__dirname, 'dist', 'untitled3');

// Указание Express использовать статические файлы Angular
app.use(express.static(angularPath));

// Маршрут для всех запросов, кроме статических файлов Angular, отправляет index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(angularPath, 'index.html'));
});

// Запуск Express приложения на порту 8080
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
