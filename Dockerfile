FROM node:10-alpine

WORKDIR /app

COPY package.json /app
RUN npm install
COPY ./src /app/src

CMD npm start

EXPOSE 3102
