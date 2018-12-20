import React from 'react';
import styled from 'styled-components';

import {
  baselineSpacing,
  baselineBreakpoint,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Ul,
  Ol,
  Li,
  Hr,
} from '../brand-components';
import { MainLayout, Link, SecondaryBox, Breadcrumb } from '../components';

const Content = styled.div`
  margin-top: ${baselineSpacing}px;
  margin-bottom: ${baselineSpacing}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
  }
`;

const Example = styled.section`
  margin: ${baselineSpacing}px 0;
`;

const CustomLink = styled(Link)`
  color: red;

  :visited {
    color: red;
  }
  :hover {
    text-decoration: underline;
  }
`;

const StyleguidePage = () => {
  return (
    <MainLayout title="Styleguide">
      <Content>
        <Example>
          <H1>H1 level heading</H1>
        </Example>
        <Example>
          <H2>H2 level heading</H2>
        </Example>
        <Example>
          <H3>H3 level heading</H3>
        </Example>
        <Example>
          <H4>H4 level heading</H4>
        </Example>
        <Example>
          <H5>H5 level heading</H5>
        </Example>
        <Example>
          <H6>H6 level heading</H6>
        </Example>
        <Example>
          <Hr />
        </Example>
        <Example>
          <P>This is a paragraph</P>
        </Example>
        <Example>
          <P as="div">
            This is another paragraph, but rendered as a div element.
          </P>
        </Example>
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
            This is a paragraph with{' '}
            <Link to="/styleguide">a default link</Link>
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
          <Hr />
        </Example>
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
                path: '/tutorials',
                label: 'Tutorials',
              },
              {
                label: 'Some tutorial',
              },
            ]}
          />
        </Example>
      </Content>
    </MainLayout>
  );
};

export default StyleguidePage;
