import axios from 'axios';
import { from } from 'rxjs';
import { QueryBuilder } from './query-builder';

export class GraphQLClient extends QueryBuilder {
  #headers: Record<string, string> = {};
  #url: string;

  headers(headers: Record<string, string>) {
    this.#headers = headers;

    return this;
  }

  url(url: string) {
    this.#url = url;

    return this;
  }

  fetch() {
    const data = {
        [this.root.getName()]: this.build(),
        variables: {},
    }

    const request = axios({
      method: 'post',
      url: this.#url,
      data: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        ...this.#headers,
      },
    });

    return from(request);
  }
}
