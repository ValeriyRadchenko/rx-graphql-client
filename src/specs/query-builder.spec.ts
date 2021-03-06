import { QueryBuilder } from '../query-builder';
import { Level } from '../level';
import { gql } from '../gql';

describe('QueryBuilder', () => {
  it('should build query', () => {
    const result = new QueryBuilder()
      .query()
      .addField('test', ['field1', 'field2', 'field3'])
      .build();

    const expectedResult =
      'query {' +
      '\n' +
      '  test {' +
      '\n' +
      '    field1' +
      '\n' +
      '    field2' +
      '\n' +
      '    field3' +
      '\n' +
      '  }' +
      '\n' +
      '}';

    expect(result).toEqual(expectedResult);
  });

  it('should build mutation', () => {
    const result = new QueryBuilder()
      .mutation()
      .addField('test', ['field1', new Level({ name: 'field2' })], {
        id: 'id1',
      })
      .build();

    const expectedResult =
      'mutation {' +
      '\n' +
      '  test(id: "id1") {' +
      '\n' +
      '    field1' +
      '\n' +
      '    field2' +
      '\n' +
      '  }' +
      '\n' +
      '}';

    expect(result).toEqual(expectedResult);
  });

  it('should set text query', () => {
    const query = gql`
      query {
        test(id: "id1") {
          field1
          field2
        }
      }
    `;

    const result = new QueryBuilder().setQuery(query).build();

    const expectedResult =
      'query {' +
      '\n' +
      '  test(id: "id1") {' +
      '\n' +
      '    field1' +
      '\n' +
      '    field2' +
      '\n' +
      '  }' +
      '\n' +
      '}';

    expect(result).toEqual(expectedResult);
  });
});
