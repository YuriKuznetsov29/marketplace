FROM node:24-slim

WORKDIR /app

# зависимости
COPY package*.json ./
RUN npm install

# prisma
COPY prisma ./prisma
RUN npx prisma generate

# код
COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]
