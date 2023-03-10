export class CretadocAPIError extends Error {
  constructor(context: string, message: string) {
    super(`${context}: ${message}`);
    this.name = 'CretadocAPIError';
  }
}
