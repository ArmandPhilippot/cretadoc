import type { FC } from 'react';
import { themes } from '../../library';
import type { ThemeAuthor } from '../../types';
import * as styles from './themes-list.css';

type AuthorProps = {
  data?: ThemeAuthor;
};

const Author: FC<AuthorProps> = ({ data }) => {
  if (!data) return <>{''}</>;
  if (!data.website) return <>{data.name}</>;
  return <a href={data.website}>{data.name}</a>;
};

export const ThemesList: FC = () => {
  const authorColumn = 'Author';
  const colorSchemeColumn = 'Color scheme';
  const nameColumn = 'Name';
  const titleClassName = `${styles.cell} ${styles.title}`;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={titleClassName}>{nameColumn}</th>
          <th className={titleClassName}>{colorSchemeColumn}</th>
          <th className={titleClassName}>{authorColumn}</th>
        </tr>
      </thead>
      <tbody>
        {themes.map((theme) => (
          <tr key={theme.id}>
            <td className={styles.cell}>{theme.name}</td>
            <td className={styles.cell}>{theme.scheme}</td>
            <td className={styles.cell}>
              <Author data={theme.author} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
