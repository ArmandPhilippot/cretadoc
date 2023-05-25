export class CretadocCoreError extends Error {
  constructor(context: string, message: string) {
    super(`${context}: ${message}`);
    this.name = 'CretadocCoreError';
  }
}
