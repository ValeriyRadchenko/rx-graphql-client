import { gql } from '../gql';

describe('gql', () => {
  let query: string;

  it('should transform gql to query string', () => {
    const expectedResult = `query {
  level1_1(test: "string") {
    level2_1
    level2_2
  }
  level1_2 {
    level2_3 {
      level3_1
      level3_2
    }
    level2_4
  }
  level1_3(test1: [1, 2, 3], test2: { a: "b" }) {
    ... on TestType {
      level5_1
    }
  }
}`;

    const result = gql`
      query {
        level1_1(test: "string") {
          level2_1
          level2_2
        }
        level1_2 {
          level2_3 {
            level3_1
            level3_2
          }
          level2_4
        }
        level1_3(test1: [1, 2, 3], test2: { a: "b" }) {
          ... on TestType {
            level5_1
          }
        }
      }
    `;

    expect(result.build()).toEqual(expectedResult);
  });
});
