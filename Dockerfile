# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Instalar dumb-init para melhor gerenciamento de sinais
RUN apk add --no-cache dumb-init

# Copiar node_modules do stage anterior
COPY --from=builder /app/node_modules ./node_modules

# Copiar dist do stage anterior
COPY --from=builder /app/dist ./dist

# Copiar package.json
COPY package.json .

# Criar usuário não-root por segurança

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
