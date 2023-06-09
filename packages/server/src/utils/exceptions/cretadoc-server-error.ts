export class CretadocServerError extends Error {
  constructor(context: string, message: string) {
    super(`${context}: ${message}`);
    this.name = 'CretadocServerError';
  }
}
