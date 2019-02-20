const request = require('supertest');
const app = require('./app');
const { config } = require('./config');

const KEY_TO_CREATE = "key-to-create";
const INVALID_KEY = ".invalid-key";
const TEST_KEY = "test-key";
const TEST_TOKEN = "test-token";
const TEST_VALUE = "test-value";

describe("/new/:key", () => {
  test('should respond with status 201 when key is valid', (done) => {
    request(app).post(`/new/${KEY_TO_CREATE}`).then((response) => {
      expect(response.res.statusCode).toBe(201);
      done();
    });
  });
  
  test('should respond with url including token and key', (done) => {
    request(app).post(`/new/${KEY_TO_CREATE}`).then((response) => {
      const receivedText = response.res.text;
  
      expect(receivedText.startsWith(`${config.url}:${config.port}/`)).toBeTruthy();
      expect(receivedText.endsWith(KEY_TO_CREATE)).toBeTruthy();
      done();
    });
  });
  
  test('should respond with status 400 when key is invalid', (done) => {
    request(app).post(`/new/${INVALID_KEY}`).then((response) => {
      const receivedText = response.res.text;
  
      expect(receivedText).toBe("Invalid key");
      expect(response.res.statusCode).toBe(400);
      done();
    });
  });
});

describe('/:token/:key', () => {
  test('should respond with status 200 when entry can be saved', (done) => {
    request(app).post(`/new/${KEY_TO_CREATE}`).send().then((response) => {
      const responseUrl = response.res.text;
      const tokenAndKey = responseUrl.substring(config.url.length + 1 + config.port.toString().length);
      request(app).post(tokenAndKey).send(TEST_VALUE).then((response) => {
        expect(response.res.statusCode).toBe(200);
        done();
      });
    });
  });

  test('should respond with value when entry can be saved', (done) => {
    request(app).post(`/new/${KEY_TO_CREATE}`).send().then((response) => {
      const responseUrl = response.res.text;
      const tokenAndKey = responseUrl.substring(config.url.length + 1 + config.port.toString().length);
      request(app).post(tokenAndKey).send(TEST_VALUE).then((response) => {
        const receivedText = response.res.text;
      
        expect(receivedText).toBe(TEST_VALUE);
        done();
      });
    });
  });

  test('should respond with status 400 when entry can not be saved', (done) => {
    request(app).post(`/${TEST_TOKEN}/${INVALID_KEY}`).send(TEST_VALUE).then((response) => {
      expect(response.res.statusCode).toBe(400);
      done();
    });
  });
});

describe('/:token/:key/:value', () => {
  test('should respond with status 200 when entry can be saved', (done) => {
    request(app).post(`/new/${KEY_TO_CREATE}`).send().then((response) => {
      const responseUrl = response.res.text;
      const tokenAndKey = responseUrl.substring(config.url.length + 1 + config.port.toString().length);
      request(app).post(`${tokenAndKey}/${TEST_VALUE}`).send().then((response) => {
        expect(response.res.statusCode).toBe(200);
        done();
      });
    });
  });

  test('should respond with value when entry can be saved', (done) => {
    request(app).post(`/new/${KEY_TO_CREATE}`).send().then((response) => {
      const responseUrl = response.res.text;
      const tokenAndKey = responseUrl.substring(config.url.length + 1 + config.port.toString().length);
      request(app).post(`${tokenAndKey}/${TEST_VALUE}`).send().then((response) => {
        const receivedText = response.res.text;
      
        expect(receivedText).toBe(TEST_VALUE);
        done();
      });
    });
  });

  test('should respond with status 400 when entry can not be saved', (done) => {
    request(app).post(`/${TEST_TOKEN}/${INVALID_KEY}`).send(TEST_VALUE).then((response) => {
      expect(response.res.statusCode).toBe(400);
      done();
    });
  });
});

describe('Get /:token/:key', () => {
  test('should return value when the right token is provided', () => {
    let tokenAndKey;
    request(app).post(`/new/${KEY_TO_CREATE}`).send().then((response) => {
      const responseUrl = response.res.text;
      tokenAndKey = responseUrl.substring(config.url.length + 1 + config.port.toString().length);
      
      request(app).post(`${tokenAndKey}/${TEST_VALUE}`).send().then((response) => {
                
        request(app).get(`${tokenAndKey}`).then((response) => {
          const receivedText = response.res.text;
          
          expect(receivedText).toEqual(TEST_VALUE);
        }).catch((err) => console.error(err));
      });
    });
  });
});