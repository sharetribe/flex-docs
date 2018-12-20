import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineSpacing,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Ul,
  Ol,
  Li,
  Hr,
  A,
} from '../../brand-components';

const Html = styled.div`
  h1 {
    ${H1.styles}
    margin: ${baselineSpacing}px 0;
  }
  h2 {
    ${H2.styles}
    margin: ${baselineSpacing}px 0;
  }
  h3 {
    ${H3.styles}
    margin: ${baselineSpacing}px 0;
  }
  h4 {
    ${H4.styles}
    margin: ${baselineSpacing}px 0;
  }
  h5 {
    ${H5.styles}
    margin: ${baselineSpacing}px 0;
  }
  h6 {
    ${H6.styles}
    margin: ${baselineSpacing}px 0;
  }
  a {${A.styles}}
  p {
    margin: 0;
  }
  > p  {
    // Only top-level paragraphs get the P styles as paragraphs also
    // exist e.g. in lists where the baseline offset is already
    // done. Margins are also handled separately in those components.
    ${P.styles}
    margin: ${baselineSpacing}px 0;
  }
  blockquote {
    margin: ${baselineSpacing}px 0;
    padding-left: 10px;
    border-left: 10px solid #eee;

    p {
      ${P.styles}
      color: ${props => props.theme.textColorQuoted};
    }

    // Two paragraphs are separated by a margin
    p + p {
      margin-top: ${baselineSpacing}px;
    }
  }
  code {
    // Having two fonts in a paragraph makes the line box grow out of
    // the baseline. Reducing the line height of the inline code
    // element seems to fix this.
    //
    // See: https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align
    line-height: 23px;

    color: ${props => props.theme.textColorQuoted};
  }
  pre {
    margin: ${baselineSpacing}px 0;

    code {
      line-height: 24px;
    }
  }
  ul {
    ${Ul.styles}
    list-style: disc;
    padding-left: ${baselineSpacing}px;
  }
  ol {
    ${Ol.styles}
    list-style: decimal;
    padding-left: ${baselineSpacing}px;
  }
  > ul, > ol {
    // Only add margin to top-level lists, not sublists
    margin: ${baselineSpacing}px 0;
  }
  li {
    ${Li.styles}

    // Two paragraphs are separated by a margin
    p + p {
      margin: ${baselineSpacing}px 0;
    }
    li {
      // Prevent offsetting the baseline twice in a sub list
      position: static;
    }
  }
  hr {
    ${Hr.styles}
  }

  // Tables should be avoided since they don't work well on mobile,
  // but let's have some basic styles just in case.
  //
  table {
    color: ${props => props.theme.textColor};
    font-size: 16px;
    line-height: 24px;
    margin: ${baselineSpacing}px 0;
  }
  th {
    border: 1px solid ${props => props.theme.lineColor};
    padding: ${baselineSmall}px ${baselineSpacing}px;
  }
  td {
    border: 1px solid ${props => props.theme.lineColor};
    padding: ${baselineSmall}px ${baselineSpacing}px;
  }

  & > :first-child {
    margin-top: 0;
  }
  & > :last-child {
    margin-bottom: 0;
  }
`;

const MarkdownHtml = props => {
  const { html, ...rest } = props;
  return <Html {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownHtml;
