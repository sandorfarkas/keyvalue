const Token = require('./token');
const token = Token();

test('Create new should return token', () => {
  const actualToken = token.createNew();

  expect(actualToken).toEqual({});
});