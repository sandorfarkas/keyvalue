const Token = require('./token');
const token = Token();

test('Create new should return token with length 8.', () => {
  const actualToken = token.createNew();

  expect(actualToken.length).toBe(8);
});

test('Create new should return new token with every invoke.', () => {
  const actualToken1 = token.createNew();
  const actualToken2 = token.createNew();

  expect(actualToken1).not.toEqual(actualToken2);
});