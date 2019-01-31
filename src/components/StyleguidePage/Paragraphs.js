import React from 'react';

import { Ingress, P, Strong, Em } from '../../components';

import Example from './Example';

const Paragraphs = () => {
  return (
    <>
      <Example>
        <Ingress>
          This is an ingress of an article. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Etiam aliquet id leo ut dictum. Phasellus
          dictum porttitor placerat. Aenean id volutpat turpis. Maecenas porta
          risus sed ex venenatis dictum.
        </Ingress>
        <Example>
          <P>
            This is a paragraph with normal text size and <Strong>bold</Strong>{' '}
            and <Em>emphasized</Em> text
          </P>
        </Example>
        <Example>
          <P as="div">
            This is another paragraph, but rendered as a div element.
          </P>
        </Example>
        <Example>
          <P small>This is a paragraph with small text size.</P>
        </Example>
        <Example>
          <P tiny>This is a paragraph with tiny text size.</P>
        </Example>
      </Example>
    </>
  );
};

export default Paragraphs;
