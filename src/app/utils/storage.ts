export class Storage {
  constructor() { }

  static setObject(k, v, storage = sessionStorage) {
    storage.setItem(k, JSON.stringify(v || {}));
  }

  static getObject(k, storage = sessionStorage) {
    const str = storage.getItem(k);
    return str ? JSON.parse(str) : {};
  }
}
