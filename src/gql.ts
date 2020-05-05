import { TAB_SYMBOL } from './level';

export const gql = (query: TemplateStringsArray): string => {
  const lines = query
    .toString()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);

  const tab = [];
  let result = '';
  for (const line of lines) {
    if (line[0] === '}') {
      tab.pop();
    }

    result += tab.join('') + line + '\n';

    if (line[line.length - 1] === '{') {
      tab.push(TAB_SYMBOL);
    }
  }

  return result.substr(0, result.length - 1);
};
