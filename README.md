# Zetatech_b2b
Сервис по парсингу и мониторингу сайтов

## Запуск бекенда (dev режим)

- скопировать \.env.example -> dev.env в папке deployments
- перейти в папку deployments и запустить make up_build
- сгенерировать данные через команду make gen_data

если make не работает попробовать запустить \./init.sh

если не работает сборка то поменять end of line с CRLF на LF у файла entrypoint.sh

## Запуск фронта (dev режим)
- cd web && npm i && npm run dev

## Стек Frontend
React, Ts, Effector, Next, Mantine, Tailwind
