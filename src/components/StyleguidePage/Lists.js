import React from 'react';
import styled from 'styled-components';

import { Ul, Ol, Li, Link } from '../../components';

import Example from './Example';

const CustomLink = styled(Link)`
  color: red;

  :visited {
    color: red;
  }
  :hover {
    text-decoration: underline;
  }
`;

const Lists = () => {
  return (
    <>
      <Example>
        <Ul withBullets>
          <Li>List item 1</Li>
          <Li>
            List item 2 with <Link to="/styleguide">a default link</Link>
          </Li>
          <Li>
            List item 3 with{' '}
            <Link neutral to="/styleguide">
              a neutral link
            </Link>
          </Li>
          <Li>
            List item 3 with{' '}
            <CustomLink neutral to="/styleguide">
              a custom link
            </CustomLink>
          </Li>
          <Li css="color: red;">
            List item 3 with <Link to="/styleguide">a default link</Link>
          </Li>
          <Li css="color: red;">
            List item 3 with{' '}
            <Link neutral to="/styleguide">
              a neutral link
            </Link>
          </Li>
        </Ul>
      </Example>
      <Example>
        <Ol withBullets>
          <Li>Step a</Li>
          <Li>Step b</Li>
          <Li>Step c</Li>
        </Ol>
      </Example>
      <Example>
        <Ul withBullets>
          <Li small>Small step a</Li>
          <Li small>Small step a</Li>
        </Ul>
      </Example>
      <Example>
        <Ul withBullets>
          <Li tiny>Tiny step a</Li>
          <Li tiny>Tiny step a</Li>
        </Ul>
      </Example>
    </>
  );
};

export default Lists;
