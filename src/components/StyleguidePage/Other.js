import React from 'react';

import { SecondaryBox, Breadcrumb, P, Hr } from '../../components';

import Example from './Example';

const Other = () => {
  return (
    <>
      <Example>
        <SecondaryBox>
          <P>Secondary box</P>
        </SecondaryBox>
      </Example>
      <Example>
        <Breadcrumb
          links={[
            {
              path: '/',
              label: 'Docs',
            },
            {
              path: '/tutorials/',
              label: 'Tutorials',
            },
            {
              path: '/tutorials/getting-started/',
              label: 'Getting started',
            },
          ]}
        />
      </Example>
      <Example>
        <Hr />
      </Example>
    </>
  );
};

export default Other;
