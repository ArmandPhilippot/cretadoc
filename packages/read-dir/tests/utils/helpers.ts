import { sep } from 'path';
import type { Fixture } from './fixtures';

export const getRootFixturesFrom = <
  T extends Fixture<'directory'> | Fixture<'file'>
>(
  fixtures: T[],
  rootPath: string
) =>
  fixtures.filter(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (fixture) => fixture.path.replace(rootPath, '.').split(sep).length === 1
  );
