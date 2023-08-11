export const bodyPlaceholder = '<!-- ssr-body -->';
export const statePlaceholder = '<!-- ssr-state -->';
export const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR HTML Template</title>
  </head>
  <body>
    ${bodyPlaceholder}
  </body>
  ${statePlaceholder}
</html>
`;
export const body = 'voluptatum-ullam-explicabo';
export const state = {
  foo: 'bar',
};
