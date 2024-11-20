import React from 'react';
import styled from 'styled-components';

import { P, Link, H4, A, UiText } from '../../components';

const Paragraph = styled(P)`
  max-width: 720px;
  padding-top: 15px;
`;

const Heading = styled(H4)`
  border-top: 1px solid #cccccc;
  padding-top: 29px;
  max-width: 720px;
`;

const Container = styled.div`
  padding-bottom: 10px;
`;

const RegularFooter = props => {
  return (
    <Paragraph>
      Reach out to our support team by{' '}
      <A href="mailto:hello@sharetribe.com">email</A>, or consult the Sharetribe
      Developer Community at{' '}
      <Link to="https://www.sharetribe.com/dev-slack">
        Sharetribe Developers Slack Channel
      </Link>
      . You can also contact our support team through the chat widget in
      Console.
    </Paragraph>
  );
};

const AlternativeFooter = props => {
  return (
    <Paragraph>
      Reach out to our support team from the bottom-right-located support widget
      in <Link to="https://console.sharetribe.com/">Console</Link>, by{' '}
      <A href="mailto:hello@sharetribe.com">email</A> or by joining{' '}
      <Link to="https://www.sharetribe.com/dev-slack">
        the Sharetribe Developer Community
      </Link>
      .
    </Paragraph>
  );
};

const Footer = props => {
  const { altFooter } = props;
  return (
    <Container>
      <Heading>
        <UiText id="Footer.heading" />
      </Heading>
      {altFooter ? <AlternativeFooter /> : <RegularFooter />}
    </Container>
  );
};

export default Footer;
