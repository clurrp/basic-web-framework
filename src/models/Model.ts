import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  // interface style approach
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on; // I'm not calling a function, I'm returning a reference to the event's on method
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  save(): void {
    console.log(this.attributes.getAll())
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(()=> {
        this.trigger('error');
      })
  }
}