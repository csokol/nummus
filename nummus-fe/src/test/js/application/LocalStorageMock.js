class LocalStorageMock {
  store = new Map();

  getItem(key) {
    return this.store.get(key);
  }

  setItem(k, v){
    this[k] = null;
    this.store.set(k, v);
  }

  clear() {
    this.store = new Map();
  }

  removeItem(key) {
    this.store.delete(key);
  }
}

export default LocalStorageMock;
