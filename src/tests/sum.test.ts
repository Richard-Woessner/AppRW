const f = require('../helpers/func');

const s = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(s(1, 2)).toBe(3);
});

test('loginValidation', () => {
  expect(f.validateSignIn('teststst', 'teststst')).toBe(false);
});
