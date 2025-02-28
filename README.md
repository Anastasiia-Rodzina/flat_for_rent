Flat for Rent — це веб-застосунок для управління процесом оренди житла. У проекті реалізовано як фронтенд, так і бекенд.

Фронтенд створено за допомогою React.js, а бекенд — на Node.js та Express. База даних — MongoDB.

Вимоги

Для запуску проєкту вам потрібно:

Node.js (рекомендована версія: >= 16)

MongoDB (локальна або хмарна)

npm або yarn для встановлення залежностей

Інструкція з встановлення та запуску

1. Клонування репозиторію

git clone https://github.com/Anastasiia-Rodzina/flat_for_rent.git

cd flat_for_rent

2. Налаштування бекенду

Бекенд частина вже задеплоєна за адресою:

https://flat-for-rent-back.onrender.com

Якщо ви хочете запустити бекенд локально, перейдіть у папку backend:

cd backend

Встановіть залежності:

npm install

Створіть файл .env та додайте наступні змінні:

PORT=5000

MONGO*URI=ваш_URI*до*бази*даних (повідомлю в Telegram)

Запустіть сервер:

npm start

Сервер буде доступний за адресою: http://localhost:5000

3. Налаштування фронтенду

Якщо ви хочете запустити бекенд локально, перейдіть у папку frontend:

cd ../frontend

Встановіть залежності:

npm install

Запустіть фронтенд:

npm start

Застосунок буде доступний за адресою: http://localhost:3000
