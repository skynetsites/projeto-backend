# ❓ FAQ

### 🔥 Meu banco não conecta. O que fazer?
- Verifique seu arquivo `.env`.
- Cheque se o MySQL está rodando.

### 🖼 Onde as imagens são salvas?
- Dentro de `/src/assets/images/`.

### 🔑 Como gerar um JWT_SECRET seguro?
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```