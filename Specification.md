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

npx prisma generate

npx prisma migrate dev --name init

npx prisma migrate reset

npx prisma studio
