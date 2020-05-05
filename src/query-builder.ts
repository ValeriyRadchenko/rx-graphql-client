import { Level } from './level';

export class QueryBuilder {
  protected root: Level;
  private textQuery = '';

  query() {
    this.root = new Level({ name: 'query' });
    return this;
  }

  mutation() {
    this.root = new Level({ name: 'mutation' });
    return this;
  }

  addField(
    name: string,
    children: (string | Level)[],
    attributes: Record<string, any> = {},
  ) {
    this.root.addField(
      new Level({
        name,
        attributes,
        fields: children.map((child) => {
          if (typeof child === 'string') {
            return new Level({ name: child });
          }

          return child;
        }),
      }),
    );

    return this;
  }

  setQuery(query: string) {
    this.textQuery = query;
    return this;
  }

  build() {
    return this.root?.build() || this.textQuery;
  }
}
