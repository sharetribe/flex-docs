import React from 'react';

import { H2, P, Link } from '../../components';

import Example from './Example';

const Links = () => {
  return (
    <>
      <Example>
        <H2>
          This is a H2 with <Link to="/styleguide">a default link</Link>
        </H2>
      </Example>
      <Example>
        <H2>
          This is a H2 with{' '}
          <Link neutral to="/styleguide">
            a neutral link
          </Link>
        </H2>
      </Example>
      <Example>
        <P>
          This is a paragraph with <Link to="/styleguide">a default link</Link>
        </P>
      </Example>
      <Example>
        <P>
          This is a paragraph with{' '}
          <Link neutral to="/styleguide">
            a neutral link
          </Link>
        </P>
      </Example>
    </>
  );
};

export default Links;
