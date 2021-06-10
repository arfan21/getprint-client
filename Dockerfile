FROM node:alpine3.13

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH  

COPY package.json .
COPY yarn.lock .

RUN yarn set version berry
RUN yarn plugin import interactive-tools

COPY .yarnrc.yml .
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]