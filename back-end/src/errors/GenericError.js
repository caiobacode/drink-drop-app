export default class GenericError extends Error {
  constructor(message, code) {
    super(message);
    this.stack = code.toString();
  }
}
