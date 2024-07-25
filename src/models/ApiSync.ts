import axios, { AxiosPromise, AxiosResponse } from 'axios';

// To solve for Generic type checking
interface HasId {
  id?: number;
}

// Using Generic Types
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}
  // Ability to fetch and save info tied to a user
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  // All data used will be received as a param
  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(`${this.rootUrl}`, data);
    }
  }
}

