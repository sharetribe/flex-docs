import React from 'react';

const MarkdownHtml = props => {
  const { html } = props;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownHtml;
