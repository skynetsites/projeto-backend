# 🔐 Autenticação JWT

## Gerar token:
```http
POST /v1/user/token
```
Payload:
```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```
Resposta:
```json
{
  "token": "JWT_TOKEN"
}
```

## Protegendo rotas
Inclua no header:
```
Authorization: Bearer JWT_TOKEN
```
