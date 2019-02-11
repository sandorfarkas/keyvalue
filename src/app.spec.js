const request = require('supertest');
const app = require('./app');
const { config } = require('./config');

const KEY_TO_CREATE = "key-to-create";

test('/new/:key should respond with url including token and key', (done) => {
  request(app).post(`/new/${KEY_TO_CREATE}`).then((response) => {
    const receivedText = response.res.text;

    expect(receivedText.startsWith(`${config.url}:${config.port}/`)).toBeTruthy();
    expect(receivedText.endsWith(KEY_TO_CREATE)).toBeTruthy();
    expect(response.res.statusCode).toBe(201);
    done();
  });
});