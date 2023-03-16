/** SHOULD BE USED AS VSCODE DEBUGGER POST TASK */

import { DOC_FIXTURES_DIR, PAGES_FIXTURES_DIR } from '../constants';
import { cleanFixtures } from '../helpers/fixtures';

await cleanFixtures(DOC_FIXTURES_DIR);
await cleanFixtures(PAGES_FIXTURES_DIR);
