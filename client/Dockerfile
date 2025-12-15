FROM node:24

WORKDIR /app

# зависимости
COPY package*.json ./
RUN npm install

# prisma
COPY prisma ./prisma
RUN npx prisma generate

# код
COPY . .

# сборка Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
