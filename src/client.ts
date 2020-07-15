import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { from } from 'rxjs';
import { QueryBuilder } from './query-builder';

export class GraphQLClient extends QueryBuilder {
  #headers: Record<string, string> = {};
  #url: string;
  #client: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    super();
    this.#client = axios.create(config);
  }

  getInstance() {
    return this.#client;
  }

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
    };

    const request = this.#client({
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
