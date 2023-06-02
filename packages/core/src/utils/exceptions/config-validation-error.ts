import type { ValidationError } from '../../types/internals';
import { ConfigError } from './config-error';

export class ConfigValidationError extends ConfigError {
  constructor(errors: ValidationError[]) {
    const errorsList = errors
      .map(
        ({ key, reason, received }) =>
          `- ${key}: ${reason}. Received: ${received}`
      )
      .join('\n');
    super(`\n${errorsList}`);
  }
}
