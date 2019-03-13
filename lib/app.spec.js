const request = require('supertest');
const App = require('./app');

const TEST_KEY = 'key-to-create';
const TEST_TOKEN = 'test-token';
const TEST_VALUE = 'test-value';
const TEST_INVALID_KEY = '.invalid-key';

const config = {inMemoryDb: true, publicHost: 'http://test-host:4242'};
const app = App(config);

describe('POST /new/:key', () => {
  test('should respond with status 201 when key is valid', (done) => {
    request(app).post(`/new/${TEST_KEY}`).then((response) => {
      expect(response.res.statusCode).toBe(201);
      done();
    });
  });

  test('should respond with url including token and key', (done) => {
    request(app).post(`/new/${TEST_KEY}`).then((response) => {
      const receivedText = response.res.text;

      expect(receivedText.startsWith(`${config.publicHost}/`)).toBeTruthy();
      expect(receivedText.endsWith(TEST_KEY)).toBeTruthy();
      done();
    });
  });

  test('should respond with status 400 when key is invalid', (done) => {
    request(app).post(`/new/${TEST_INVALID_KEY}`).then((response) => {
      const receivedText = response.res.text;

      expect(receivedText).toBe('Invalid key');
      expect(response.res.statusCode).toBe(400);
      done();
    });
  });
});

describe('POST /:token/:key', () => {
  test('should respond with status 200 when entry can be saved', (done) => {
    request(app).post(`/new/${TEST_KEY}`).send().then((response) => {
      const tokenAndKey = getTokenAndKeyFromUrl(response.res.text);
      request(app).post(tokenAndKey).send(TEST_VALUE).then((response) => {

        expect(response.res.statusCode).toBe(200);
        done();
      });
    });
  });

  test('should respond with value when entry can be saved', (done) => {
    request(app).post(`/new/${TEST_KEY}`).send().then((response) => {
      const tokenAndKey = getTokenAndKeyFromUrl(response.res.text);

      request(app).post(tokenAndKey).send(TEST_VALUE).then((response) => {
        const receivedText = response.res.text;

        expect(receivedText).toBe(TEST_VALUE);
        done();
      });
    });
  });

  test('should respond with status 400 when entry can not be saved', (done) => {
    request(app).post(`/${TEST_TOKEN}/${TEST_INVALID_KEY}`).send(TEST_VALUE).then((response) => {

      expect(response.res.statusCode).toBe(400);
      done();
    });
  });
});

describe('POST /:token/:key/:value', () => {
  test('should respond with status 200 when entry can be saved', (done) => {
    request(app).post(`/new/${TEST_KEY}`).send().then((response) => {
      const tokenAndKey = getTokenAndKeyFromUrl(response.res.text);

      request(app).post(`${tokenAndKey}/${TEST_VALUE}`).send().then((response) => {

        expect(response.res.statusCode).toBe(200);
        done();
      });
    });
  });

  test('should respond with value when entry can be saved', (done) => {
    request(app).post(`/new/${TEST_KEY}`).send().then((response) => {
      const tokenAndKey = getTokenAndKeyFromUrl(response.res.text);

      request(app).post(`${tokenAndKey}/${TEST_VALUE}`).send().then((response) => {
        const receivedText = response.res.text;

        expect(receivedText).toBe(TEST_VALUE);
        done();
      });
    });
  });

  test('should respond with status 400 when entry can not be saved', (done) => {
    request(app).post(`/${TEST_TOKEN}/${TEST_INVALID_KEY}/${TEST_VALUE}`).send().then((response) => {

      expect(response.res.statusCode).toBe(400);
      done();
    });
  });
});

describe('GET /:token/:key', () => {
  test('should return value when the right token is provided', (done) => {
    request(app).post(`/new/${TEST_KEY}`).send().then((response) => {
      const tokenAndKey = getTokenAndKeyFromUrl(response.res.text);

      request(app).post(`${tokenAndKey}/${TEST_VALUE}`).send().then(() => {

        request(app).get(`${tokenAndKey}`).then((response) => {
          const receivedText = response.res.text;

          expect(receivedText).toEqual(TEST_VALUE);
          done();
        });
      });
    });
  });

  test('should return 400 id invalid token and key provided', (done) => {
    request(app).get('/invalid-token/invalid-key').then((response) => {

      expect(response.res.statusCode).toBe(400);
      done();
    });
  });
});

function getTokenAndKeyFromUrl(responseUrl) {
  return responseUrl.substring(config.publicHost.length);
}
