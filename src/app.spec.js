const request = require('supertest');
const app = require('./app');
const { config } = require('./config');

const KEY_TO_CREATE = "key-to-create";
const INVALID_KEY = ".invalid-key";

test('/new/:key should respond with status 201 when key is valid', (done) => {
  request(app).post(`/new/${KEY_TO_CREATE}`).then((response) => {
    const receivedText = response.res.text;

    expect(response.res.statusCode).toBe(201);
    done();
  });
});

test('/new/:key should respond with url including token and key', (done) => {
  request(app).post(`/new/${KEY_TO_CREATE}`).then((response) => {
    const receivedText = response.res.text;

    expect(receivedText.startsWith(`${config.url}:${config.port}/`)).toBeTruthy();
    expect(receivedText.endsWith(KEY_TO_CREATE)).toBeTruthy();
    done();
  });
});

test('/new/:key should respond with status 400 when key is invalid', (done) => {
  request(app).post(`/new/${INVALID_KEY}`).then((response) => {
    const receivedText = response.res.text;

    expect(receivedText).toBe("Invalid key.");
    expect(response.res.statusCode).toBe(400);
    done();
  });
});
