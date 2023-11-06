FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ .
COPY tsconfig.build.json .
COPY tsconfig*.json .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]