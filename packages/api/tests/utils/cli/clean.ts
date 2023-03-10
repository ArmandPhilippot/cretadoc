/** SHOULD BE USED AS VSCODE DEBUGGER POST TASK */

import { PAGES_FIXTURES_DIR } from '../constants';
import { cleanFixtures } from '../helpers/fixtures';

await cleanFixtures(PAGES_FIXTURES_DIR);
