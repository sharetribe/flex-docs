import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineSpacing,
  baselineBreakpoint,
} from '../../config';
import { H4, H5, H6, P, Ul, Ol, Li, Hr, A, Strong, Em } from '../../components';

require('prismjs/themes/prism-solarizedlight.css');

const HighlightStyle = createGlobalStyle`
  .gatsby-highlight  {

    // Remove theme default styles
    pre[class*="language-"] {
      background-color: transparent;
      margin: ${baselineSmall}px 0;
      padding: ${2 * baselineSmall}px 0;
      line-height: 24px;
      border-radius: 0;

      @media (min-width: ${baselineBreakpoint}px) {
        margin: ${baselineLarge}px 0;
        padding: ${2 * baselineLarge}px 0;
      }
    }
    code[class*="language-"] {
      line-height: 24px;
    }

    pre[class*="language-"],
    code[class*="language-"],
    .token {
      &::selection {
        // Use same selection styles as in sanitize.css
        background-color: #b3d4fc;
        color: #000;
        text-shadow: none;
      }
    }
  }
`;

const Html = styled.div`
  h1 {
    ${H4.styles}
    margin: ${baselineSpacing}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;
  }
  h2 {
    ${H4.styles}
    margin: ${2 * baselineSpacing}px 0 ${baselineSpacing}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;
  }
  h3 {
    ${H5.styles}
    margin: ${baselineSpacing}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;
  }
  h4 {
    ${H6.styles}
    margin: ${baselineSpacing}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;
  }
  h5 {
    ${H6.styles}
    margin: ${baselineSpacing}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;
  }
  h6 {
    ${H6.styles}
    margin: ${baselineSpacing}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;
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
    max-width: ${props => props.theme.contentMaxWidth}px;
  }
  strong {${Strong.styles}}
  em {${Em.styles}}
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
  > blockquote {
    max-width: ${props => props.theme.contentMaxWidth}px;
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
    max-width: ${props => props.theme.contentMaxWidth}px;
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
    max-width: ${props => props.theme.contentMaxWidth}px;
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
  return (
    <>
      <Html {...rest} dangerouslySetInnerHTML={{ __html: html }} />
      <HighlightStyle />
    </>
  );
};

export default MarkdownHtml;
