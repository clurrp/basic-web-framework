import { UserProps } from "./User";

export class Attributes<T extends object> {
    constructor(private data: T) {}

    // keyof is a constraint that limites the type of K (can only be one of the diff keys of T), 
    // T[K], Look up T and return the value of K
    get = <K extends keyof T>(key: K): T[K] => {
      return this.data[key];
    }
  
    set(update: UserProps): void {
      Object.assign(this.data, update);
    }

    getAll(): T {
      return this.data;
    }
}

const attrs = new Attributes<UserProps>({
  id: 5,
  age: 100,
  name: 'Clare'
})

const name = attrs.get('name');
const age = attrs.get('age');
const id = attrs.get('id');