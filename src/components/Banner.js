import React from 'react';
import styled from 'styled-components';

import { baselineSmall, baselineSpacing } from '../config';
import { P } from '.';

// Use this component to create info boxes, i.e. warning, info etc. See Warning.js and Info.js how this component is used

const BannerContainer = styled.section`
  background-color: ${props => props.backgroundColour};
  border: 3px solid ${props => props.borderColour};
  border-radius: 6px;
  box-shadow: 3px 4px 8px 0 rgb(0 0 0 / 20%);
  color: ${props => props.fontColour};
  margin-bottom: 20px;
  max-width: ${props => props.theme.contentMaxWidth}px;
  padding-top: ${3 * baselineSmall}px;
  padding-bottom: ${5 * baselineSmall}px;
  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;
`;

const Title = styled.h6`
  && {
    color: ${props => props.fontColour};
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    margin-left: 5px;
    letter-spacing: 0px;
    padding-top: 1px;
    text-transform: none;
    vertical-align: middle;
  }
`;

const BannerContent = styled.div`
  && {
    margin-top: 6px;

    > p  {
      // Only top-level paragraphs get the P styles as paragraphs also
      // exist e.g. in lists where the baseline offset is already
      // done. Margins are also handled separately in those components.
      ${P.styles}
      margin-bottom: ${baselineSpacing}px;
      max-width: ${props => props.theme.contentMaxWidth}px;
      color: ${props => props.fontColour};

    }

  }
`;

const TitleContainer = ({ title, icon: Icon, ...otherProps }) => {
  return (
    <div>
      <Icon />
      <Title {...otherProps}>{title}</Title>
    </div>
  );
};

const Banner = props => {
  const { children, title, ...otherProps } = props;
  return (
    <BannerContainer {...otherProps}>
      <TitleContainer title={title} {...otherProps} />
      <BannerContent {...otherProps}>{children}</BannerContent>
    </BannerContainer>
  );
};

export default Banner;
