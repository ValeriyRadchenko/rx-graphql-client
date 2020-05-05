import { isArray } from 'util';

export interface ILevelParams {
  name: string;
  attributes?: Record<string, any>;
  fields?: Level[];
}

export const TAB_SYMBOL = '  ';

export class Level {
  constructor(private params: ILevelParams) {
    this.params = {
      ...this.params,
      attributes: this.params.attributes || {},
      fields: this.params.fields || [],
    };
  }

  getName() {
    return this.params.name;
  }

  addField(field: Level) {
    this.params.fields.push(field);
  }

  build(tabs: string[] = []) {
    let body = '';
    let name = this.params.name;

    const attributes = [];
    const tabsString = tabs.join('');
    const newLine = tabsString ? '\n' + tabsString : '';

    for (const field of this.params.fields) {
      body += field.build([...tabs, TAB_SYMBOL]);
    }

    for (const key of Object.keys(this.params.attributes)) {
      const attribute = this.params.attributes[key];
      attributes.push(`${key}: ${this.stringifyAttribute(attribute)}`);
    }

    if (attributes.length) {
      name = name + '(' + attributes.join(', ') + ')';
    }

    if (body) {
      return newLine + name + ' {' + body + '\n' + tabsString + '}';
    }

    return newLine + name;
  }

  private stringifyAttribute(attribute: any) {
    if (isArray(attribute)) {
      return JSON.stringify(attribute);
    }

    if (attribute && typeof attribute === 'object') {
      const result = [];
      for (const key of Object.keys(attribute)) {
        result.push(`${key}: ${this.stringifyAttribute(attribute[key])}`);
      }

      return `{ ${result.join(', ')} }`;
    }

    if (typeof attribute === 'string') {
      return `"${attribute}"`;
    }

    return attribute;
  }
}
