/** SHOULD BE USED AS VSCODE DEBUGGER POST TASK */

import { DOC_FIXTURES_DIR, PAGES_FIXTURES_DIR } from '../constants';
import { deleteFixturesIn } from '../helpers/fixtures';

await deleteFixturesIn(DOC_FIXTURES_DIR);
await deleteFixturesIn(PAGES_FIXTURES_DIR);
