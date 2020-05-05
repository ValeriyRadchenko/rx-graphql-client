import { Level } from './level';

export const gql = (query: TemplateStringsArray, ...rest: any): Level => {
  function concat(query: TemplateStringsArray, params: any[]) {
    let result = '';

    for (const [index, part] of query.entries()) {
      result += part + (params[index] || '');
    }

    return result;
  }

  const lines = concat(query, rest)
    .split('\n')
    .map((line) => line.replace(/#.*/g, '').trim())
    .filter((line) => !!line);

  let index = 0;

  function convert() {
    const result = [];

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
