import { css } from 'styled-components';

import CircularStdBlack from './font-files/circular-std/CircularStd-Black.woff2';
import CircularStdBlackItalic from './font-files/circular-std/CircularStd-BlackItalic.woff2';
import CircularStdBold from './font-files/circular-std/CircularStd-Bold.woff2';
import CircularStdBoldItalic from './font-files/circular-std/CircularStd-BoldItalic.woff2';
import CircularStdMedium from './font-files/circular-std/CircularStd-Medium.woff2';
import CircularStdMediumItalic from './font-files/circular-std/CircularStd-MediumItalic.woff2';
import CircularStdBook from './font-files/circular-std/CircularStd-Book.woff2';
import CircularStdBookItalic from './font-files/circular-std/CircularStd-BookItalic.woff2';

const fonts = {
  'CircularStd-Black': {
    url: CircularStdBlack,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-Black, system-ui, sans-serif;
      font-weight: 800;
      font-style: normal;
    `,
  },
  'CircularStd-BlackItalic': {
    url: CircularStdBlackItalic,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-BlackItalic, system-ui, sans-serif;
      font-weight: 800;
      font-style: italic;
    `,
  },
  'CircularStd-Bold': {
    url: CircularStdBold,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-Bold, system-ui, sans-serif;
      font-weight: 600;
      font-style: normal;
    `,
  },
  'CircularStd-BoldItalic': {
    url: CircularStdBoldItalic,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-BoldItalic, system-ui, sans-serif;
      font-weight: 600;
      font-style: italic;
    `,
  },
  'CircularStd-Medium': {
    url: CircularStdMedium,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-Medium, system-ui, sans-serif;
      font-weight: 500;
      font-style: normal;
    `,
  },
  'CircularStd-MediumItalic': {
    url: CircularStdMediumItalic,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-MediumItalic, system-ui, sans-serif;
      font-weight: 500;
      font-style: italic;
    `,
  },
  'CircularStd-Book': {
    url: CircularStdBook,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-Book, system-ui, sans-serif;
      font-weight: 400;
      font-style: normal;
    `,
  },
  'CircularStd-BookItalic': {
    url: CircularStdBookItalic,
    format: 'woff2',
    styles: css`
      font-family: CircularStd-BookItalic, system-ui, sans-serif;
      font-weight: 400;
      font-style: italic;
    `,
  },
};

export default fonts;
