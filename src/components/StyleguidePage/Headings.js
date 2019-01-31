import React from 'react';

import { H1, H2, H3, H4, H5, H6 } from '../../components';

import Example from './Example';

const Headings = () => {
  return (
    <>
      <Example>
        <H1>H1 for the developer docs</H1>
      </Example>
      <Example>
        <H2>H2 for the developer docs</H2>
      </Example>
      <Example>
        <H3>H3 for the developer docs</H3>
      </Example>
      <Example>
        <H4>H4 for the developer docs</H4>
      </Example>
      <Example>
        <H5>H5 for the developer docs</H5>
      </Example>
      <Example>
        <H6>H6 for the developer docs</H6>
      </Example>
    </>
  );
};

export default Headings;
