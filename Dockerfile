FROM node:12-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN apk --no-cache --virtual build-dependencies add --no-cache python3 make gcc g++ && npm install --production && apk del build-dependencies

COPY . .

CMD ["npm", "start"]