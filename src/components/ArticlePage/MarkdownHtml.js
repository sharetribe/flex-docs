import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineSpacing,
  baselineBreakpoint,
} from '../../config';
import { H4, H5, H6, P, Ul, Ol, Li, Hr, A, Strong, Em } from '../../components';

require('prismjs/themes/prism-tomorrow.css');

const HighlightStyle = createGlobalStyle`

  // Decrease the distance between p and the code block
  p + .gatsby-highlight {
    margin-top: -${2 * baselineSmall}px;

    @media (min-width: ${baselineBreakpoint}px) {
      margin-top: -${2 * baselineLarge}px;
    }
  }

  li p + .gatsby-highlight {
    margin-top: 0;
    margin-bottom: ${3 * baselineSmall}px;

    @media (min-width: ${baselineBreakpoint}px) {
      // Baseline offset
      top: -2px;

      position: relative;
      margin-bottom: ${2 * baselineLarge}px;
    }
  }

  .gatsby-highlight  {
    margin-bottom: ${2 * baselineSmall}px;
    line-height: 24px;

    @media (min-width: ${baselineBreakpoint}px) {
      margin-bottom: ${2 * baselineLarge}px;
    }

    pre {
      font-size: 14px;
    }

    // Remove theme default styles
    pre[class*="language-"] {
      margin: ${baselineSmall}px 0;

      // Baseline offset
      padding: ${2 * baselineSmall}px 16px;

      // Somehow this special value makes the baselines aligned ¯\_(ツ)_/¯
      line-height: 23px;

      border-radius: 4px;

      @media (min-width: ${baselineBreakpoint}px) {
        margin: ${baselineLarge}px 0;
        padding: ${2 * baselineLarge}px 24px;
      }
    }
    code[class*="language-"] {
      line-height: 24px;
      font-size: 14px;
      background: none;
      font-weight: 400;
      color: #ccc;
    }

    pre[class*="language-"],
    code[class*="language-"],
    .token {
      &::selection {
        background-color: rgba(255, 255, 255, 0.2);
        color: inherit;
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
    margin: ${7 * baselineSmall}px 0 ${baselineSpacing}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;
    border-top: 1px solid #CCCCCC;
    padding-top: ${5 * baselineSmall - 1}px; // padding - border width

    @media (min-width: ${baselineBreakpoint}px) {
      margin: ${8 * baselineLarge - 2}px 0 ${baselineSpacing}px 0;
      padding-top: ${5 * baselineLarge + 1}px; // padding + border width
    }
  }
  h3 {
    ${H5.styles}
    margin: ${5 * baselineSmall}px 0 ${baselineSmall}px 0;
    max-width: ${props => props.theme.contentMaxWidth}px;

    @media (min-width: ${baselineBreakpoint}px) {
      margin: ${5 * baselineLarge}px 0 ${baselineLarge}px 0;
    }
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
    margin-bottom: ${baselineSpacing}px;
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
    line-height: 21px;
    font-size: 15px;
    background: rgba(255,229,100,0.35);

    white-space: nowrap;

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
      margin-bottom: ${baselineSpacing}px;
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
    font-size: 14px;
    line-height: 24px;
    margin: ${baselineSpacing}px 0;

    width: 100%;
    max-width: ${props => props.theme.contentMaxWidth}px;
  }
  th {
    border: 1px solid ${props => props.theme.lineColor};
    padding: ${baselineSmall}px 8px;
    white-space: nowrap;
  }
  td {
    border: 1px solid ${props => props.theme.lineColor};
    padding: ${baselineSmall}px 8px;
  }

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }

  & > h2:first-child {
    margin-top: 42px;

    @media (min-width: ${baselineBreakpoint}px) {
      margin-top: 46px;
    }
  }

  picture {
    transition: all ease-out 0.1s;

    &:hover {
      opacity: 0.9;
    }
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
