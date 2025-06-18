## Запуск контейнера для сервиса Account
```bash
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" --env-file ./apps/account/account.env up -d
```

## Запуск контейнера для сервиса Blog
```bash
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog" --env-file ./apps/blog/blog.env up -d
```

## Запуск контейнера для сервиса FilesStorage
```bash
docker compose --file ./apps/files-storage/docker-compose.dev.yml --project-name "readme-files-storage" --env-file ./apps/files-storage/files-storage.env up -d
```

## Запуск контейнера для сервиса Notify
```bash
docker compose --file ./apps/notify/docker-compose.dev.yml --project-name "readme-notify" --env-file ./apps/notify/notify.env up -d
```

## Команды Prisma
npx prisma generate

npx prisma migrate dev --name init

npx prisma migrate reset

npx prisma studio

## Команды запуска приложения
nx run account:serve
nx run files-storage:serve
nx run blog:serve
nx run notify:serve
