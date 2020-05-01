import { GraphQLClient } from '../index';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: {} })),
}));

import axios from 'axios';

describe('GraphQLClient', () => {
  it('should fetch query', async () => {
    const client = new GraphQLClient()
      .url('http://localhost:9999/graphql')
      .headers({})
      .query()
      .addField('test', ['field1']);

    const result = await client.fetch().toPromise();

    expect(axios).toBeCalledWith({
      data:
        '{"query":"query {\\n  test {\\n    field1\\n  }\\n}","variables":{}}',
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      url: 'http://localhost:9999/graphql',
    });

    expect(result.data).toEqual({});
  });
});
