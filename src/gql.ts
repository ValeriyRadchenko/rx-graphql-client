import { Level } from './level';

export const gql = (query: TemplateStringsArray): Level => {
  const lines = query
    .toString()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);

  let index = 0;

  function convert() {
    let result = [];

    for (; index < lines.length; index++) {
      const line = lines[index];

      if (line[line.length - 1] === '{') {
        const name = line.replace(/\s*{$/, '');
        index++;
        result.push(new Level({ name, fields: convert() }));
        continue;
      }

      if (line[0] === '}') {
        return result;
      }

      result.push(new Level({ name: line }));
    }

    return result;
  }

  return convert()[0];
};
