import React from 'react';

import { Ingress, P } from '../../components';

import Example from './Example';

const Paragraphs = () => {
  return (
    <>
      <Example>
        <P>This is a paragraph</P>
      </Example>
      <Example>
        <P as="div">
          This is another paragraph, but rendered as a div element.
        </P>
      </Example>
      <Example>
        <Ingress>
          This is an ingress of an article. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Etiam aliquet id leo ut dictum. Phasellus
          dictum porttitor placerat. Aenean id volutpat turpis. Maecenas porta
          risus sed ex venenatis dictum.
        </Ingress>
      </Example>
    </>
  );
};

export default Paragraphs;
