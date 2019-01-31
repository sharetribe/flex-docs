import React from 'react';

import { Box, Breadcrumb, P, Hr } from '../../components';

import Example from './Example';

const Other = () => {
  return (
    <>
      <Example>
        <Box>
          <P>Box with a paragraph.</P>
        </Box>
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
