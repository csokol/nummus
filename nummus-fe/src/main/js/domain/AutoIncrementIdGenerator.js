class AutoIncrementIdGenerator {
  id;

  constructor() {
    this.id = 0;
  }

  next() {
    this.id++;
    return this.id;
  }
}

export default AutoIncrementIdGenerator;
