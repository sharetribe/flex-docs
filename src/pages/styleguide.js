import React from 'react';

import SingleColumnLayout from '../layouts/SingleColumnLayout';
import { H1, H2, H3, H4, H5, H6, P } from '../brand-components';

const StyleguidePage = () => {
  return (
    <SingleColumnLayout title="Styleguide">
      <H1>H1</H1>
      <H1 as="div">H1 styles with div</H1>

      <H2>H2</H2>
      <H2 as="div">H2 styles with div</H2>

      <H3>H3</H3>
      <H3 as="div">H3 styles with div</H3>

      <H4>H4</H4>
      <H4 as="div">H4 styles with div</H4>

      <H5>H5</H5>
      <H5 as="div">H5 styles with div</H5>

      <H6>H6</H6>
      <H6 as="div">H6 styles with div</H6>

      <P>This is a paragraph</P>
    </SingleColumnLayout>
  );
};

export default StyleguidePage;
