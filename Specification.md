# Личный проект «Readme»

## Начало работы

### 1. Переход в нужную дерикторию
Основная работа происходит в директории project, поэтому нужно сделать следующий шаг:
```bash
cd project
```

### 2. Создание и запуск Docker контейнеров

#### Запуск контейнера для сервиса Account
```bash
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" --env-file ./apps/account/account.env up -d
```

#### Запуск контейнера для сервиса Blog
```bash
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog" --env-file ./apps/blog/blog.env up -d
```

#### Запуск контейнера для сервиса FilesStorage
```bash
docker compose --file ./apps/files-storage/docker-compose.dev.yml --project-name "readme-files-storage" --env-file ./apps/files-storage/files-storage.env up -d
```

#### Запуск контейнера для сервиса Notify
```bash
docker compose --file ./apps/notify/docker-compose.dev.yml --project-name "readme-notify" --env-file ./apps/notify/notify.env up -d
```

### 3. Подготовка Prisma клиента

Необходимо перейти в каталог <b>libs/blog/models</b>, используя следующую команду:
```bash
cd libs/blog/models
```

Далее, по очереди выполнить 2 следующие команды:
```bash
npx prisma generate
```
```bash
npx prisma migrate dev --name init
```

Если необходимо дропнуть базу Prisma, то нужно запустить следующую команду:
```bash
npx prisma migrate reset
```

### 4. Запуск сервисов

Далее, необходимо вернуться в папку project следующей командой:
```bash
cd ../../../
```

И далее запустить каждый сервис:

#### Запуск сервиса api-gateway
```bash
nx run api-gateway:serve
```

#### Запуск сервиса account
```bash
nx run account:serve
```

#### Запуск сервиса files-storage
```bash
nx run files-storage:serve
```

#### Запуск сервиса blog
```bash
nx run blog:serve
```

#### Запуск сервиса notify (RabbitMQ лежит в этом сервисе)
```bash
nx run notify:serve
```

TODO: Описать создание .env файлов


