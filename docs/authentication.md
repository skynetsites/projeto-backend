# 🔐 Autenticação JWT

## Gerar token:
```http
POST /v1/user/token
```
Payload:
```json
{
  "email": "user@mail.com",
  "password": "123@123"
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