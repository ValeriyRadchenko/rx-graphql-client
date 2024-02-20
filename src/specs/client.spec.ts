import { GraphQLClient } from '../index';

const axiosInstance = jest.fn(() => Promise.resolve({ data: {} }));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: () => axiosInstance,
  },
}));

describe('GraphQLClient', () => {
  it('should fetch query', async () => {
    const client = new GraphQLClient()
      .url('http://localhost:9999/graphql')
      .headers({})
      .query()
      .addField('test', ['field1']);

    const result = await client.fetch().toPromise();

    expect(axiosInstance).toBeCalledWith({
      data: '{"query":"query {\\n  test {\\n    field1\\n  }\\n}","variables":{}}',
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      url: 'http://localhost:9999/graphql',
    });

    expect(result.data).toEqual({});
  });

  it('should fetch query with variables', async () => {
    const client = new GraphQLClient()
      .url('http://localhost:9999/graphql')
      .headers({})
      .variables({ foo: 'foo', bar: ['1', '2', '3'] })
      .query()
      .addField('test', ['field1']);

    const result = await client.fetch().toPromise();

    expect(axiosInstance).toBeCalledWith({
      data: '{"query":"query {\\n  test {\\n    field1\\n  }\\n}","variables":{"foo":"foo","bar":["1","2","3"]}}',
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      url: 'http://localhost:9999/graphql',
    });

    expect(result.data).toEqual({});
  });

  it('should return axios instance', () => {
    const client = new GraphQLClient();
    expect(client.getInstance()).toBeDefined();
  });
});
