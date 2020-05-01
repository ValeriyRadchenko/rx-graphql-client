import { GraphQLClient } from '../client';
import { of, Observable } from 'rxjs';

let instance: GraphQLClientMock = null;
let returnData: any = {
  data: {},
};
export const getInstance = () => instance;

export class GraphQLClientMock extends GraphQLClient {
  static setReturnData(data: any) {
    returnData.data = data;
  }

  static clear() {
    instance = null;
    returnData = {
      data: {},
    };
  }

  constructor() {
    super();
    instance = this;
  }
  headers = jest.fn((headers: Record<string, string>) =>
    super.headers(headers),
  );
  url = jest.fn((url: string) => super.url(url));
  fetch(): Observable<any> {
    return of(returnData);
  }

  query = jest.fn(() => super.query());
  addField = jest.fn(
    (name: string, children: string[], attributes: Record<string, any> = {}) =>
      super.addField(name, children, attributes),
  );
}
