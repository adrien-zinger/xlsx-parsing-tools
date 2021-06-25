import cleaner from '../src/json-cleaner/expanse-dots.js'

test('Testing horizintal table style to json', () => {
  const dirtyjson = {
    n: 'e',
    'a.b': 'e2',
    test: {
      'n.m': {
        v: 'a',
      },
    },
  }

  const ret = JSON.stringify(cleaner(dirtyjson))
  expect(ret).toEqual('{"n":"e","a":{"b":"e2"},"test":{"n":{"m":{"v":"a"}}}}')
})
