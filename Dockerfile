FROM node:10-alpine

WORKDIR /app

COPY package.json /app
RUN npm install
COPY ./lib /app/lib

CMD npm start

EXPOSE 3102
