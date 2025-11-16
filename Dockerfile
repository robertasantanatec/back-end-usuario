FROM node:20

WORKDIR /app

# Copia os pacotes primeiro
COPY package*.json ./

# Instala somente dependências de produção
RUN npm install --omit=dev

# Copia o projeto inteiro
COPY . .

# Build
RUN npm run build

EXPOSE 3001

# Inicia o servidor compilado
CMD ["npm", "start"]
