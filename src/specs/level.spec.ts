import { Level } from '../level';

describe('Level', () => {
  it('should build GraphQL query', () => {
    const result = new Level({
      name: 'query',
      fields: [
        new Level({
          name: 'test',
          attributes: {
            id: 'id1',
            array: ['id2', 'id3'],
            object: {
              name: 'test',
              age: 1,
            },
          },
          fields: [
            new Level({ name: 'field1' }),
            new Level({ name: 'field2' }),
            new Level({ name: 'field3' }),
          ],
        }),
      ],
    }).build();

    const expectedResult =
      'query {' +
      '\n' +
      '  test(id: "id1", array: ["id2","id3"], object: { name: "test", age: 1 }) {' +
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

  it('should get level name', () => {
    const level = new Level({
      name: 'query',
    });

    expect(level.getName()).toEqual('query');
  });

  it('should add field', () => {
    const level = new Level({
      name: 'query',
    });

    level.addField(
      new Level({ name: 'test', fields: [new Level({ name: 'field1' })] }),
    );

    const result = level.build();

    const expectedResult =
      'query {' +
      '\n' +
      '  test {' +
      '\n' +
      '    field1' +
      '\n' +
      '  }' +
      '\n' +
      '}';

    expect(result).toEqual(expectedResult);
  });
});
