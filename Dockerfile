FROM node:20

WORKDIR /home/node/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV WAIT_VERSION 2.9.0

CMD ["bun", "dev"]