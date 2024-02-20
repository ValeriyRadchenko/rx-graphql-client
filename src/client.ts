import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { from } from 'rxjs';
import { QueryBuilder } from './query-builder';

export class GraphQLClient extends QueryBuilder {
  #headers: Record<string, string> = {};
  #variables: Record<string, any> = {};
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

  variables(variables: Record<string, any>) {
    this.#variables = variables;

    return this;
  }

  url(url: string) {
    this.#url = url;

    return this;
  }

  fetch() {
    const data = {
      [this.root.getName()]: this.build(),
      variables: this.#variables,
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
