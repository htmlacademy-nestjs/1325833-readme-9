# Личный проект «Readme»

## Начало работы

### 1. Переход в нужную дерикторию и создание env
Основная работа происходит в директории project, поэтому нужно сделать следующий шаг:
```bash
cd project
```

Далее нужно создать .env файлы, выполнив следующий скрипт:
```bash
bash generate-envs.sh
```

### 2. Создание и запуск Docker контейнеров

Создать и запустить все контейнеры можно следующей командой:
```bash
bash start-all-dockers.sh
```

Или же можно создавать и запускать контейнеры выборочно.

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

Чтобы сгенерировать Prisma, нужно выполнить следующий скрипт:
```bash
bash generate-prisma.sh
```

Если необходимо дропнуть базу Prisma, то нужно запустить следующий скрипт:
```bash
bash reset-prisma.sh
```

### 4. Запуск сервисов
Чтобы запустить все сервисы разом, нужно выполнить команду:
```bash
bash start-all-services.sh
```

Или запустить каждый сервис руками:

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


