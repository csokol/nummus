import uuid from 'uuid/v4';

class UUIDGenerator {
  next() {
    return uuid();
  }
}

export default UUIDGenerator;
