# Используем официальный образ Node.js в качестве базового образа
FROM node:18-alpine AS base

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Определение переменной окружения для отключения телеметрии Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
