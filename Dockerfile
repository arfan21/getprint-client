FROM node:alpine3.13

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn set version berry
COPY .yarnrc.yml .
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]