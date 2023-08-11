import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import type { RenderFn } from '../../../src/types';
import {
  body,
  bodyPlaceholder,
  htmlTemplate,
  state,
  statePlaceholder,
} from './data';

/**
 * Generate the HTML.
 *
 * It will replace the given placeholders with the rendered contents.
 *
 * @returns {string} The generated HTML.
 */
const generateHTML = (
  template: string,
  placeholders: { body: string; state: string },
  contents: { body: string; state: Record<string, unknown> }
): string => {
  let html = template.replace(placeholders.body, contents.body);

  if (placeholders.state) {
    const stateScript = `\n<script>window.__SSR_STATE__='${JSON.stringify(
      contents.state
    )}'</script>`;
    html = html.replace(placeholders.state, stateScript);
  }

  return html;
};

export const render: RenderFn = ({ res }) => {
  const html = generateHTML(
    htmlTemplate,
    { body: bodyPlaceholder, state: statePlaceholder },
    { body, state }
  );
  res
    .status(HTTP_STATUS_CODE.OK)
    .set({ 'Content-Type': 'text/html' })
    .end(html);
};
