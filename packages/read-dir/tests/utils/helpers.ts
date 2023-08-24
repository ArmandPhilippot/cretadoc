import { sep } from 'path';
import type { Fixture } from './fixtures';

export const getRootFixturesFrom = <
  T extends Fixture<'directory'> | Fixture<'file'>
>(
  fixtures: T[],
  rootPath: string
) =>
  fixtures.filter(
    (fixture) => fixture.path.replace(rootPath, '.').split(sep).length === 1
  );
