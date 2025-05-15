## Запуск контейнера для сервиса Account
```bash
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" --env-file ./apps/account/account.env up -d
```
