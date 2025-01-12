# Check-in система

## Требования

- python v3.10
- pipenv
- postgresql v14
- node.js v16.16

## Установка и запуск

1. Восстановить БД из дампа - `documents/db.sql`.
2. Запустить `init.sh`.
3. Запустить wsgi-сервер с переменными окружения, указанными в `src/server/env_keys.json`.