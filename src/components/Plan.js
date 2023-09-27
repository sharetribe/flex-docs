import React from 'react';
import styled from 'styled-components';

import { Banner, Link } from '../components';

const PlanIcon = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <title>Plan indicator</title>
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="currentColor"
      />
      <path
        d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
        fill="#C4DFFF"
        stroke="#C4DFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"
        stroke="#C4DFFF"
        fill="#C4DFFF"
      />
    </svg>
  );
};

const Icon = styled(PlanIcon)`
  width: 28px;
`;

const tierColours = {
  extend: {
    fontColour: '#072901',
    borderColour: '#072901',
    backgroundColour: '#c4f5ba',
    content: ' is available in the Extend plan.',
  },
  launch: {
    fontColour: '#242901',
    borderColour: '#242901',
    backgroundColour: '#d3baed',
    content: ' is available in the Launch plan and above.',
  },
  onboard: {
    fontColour: '#292301',
    borderColour: '#292301',
    backgroundColour: '#ede2ba',
  },
};

const Plan = props => {
  const { children, tier, feature, ...otherProps } = props;
  const { fontColour, borderColour, backgroundColour, content } = tierColours[
    tier
  ];

  const featureMaybe = feature ? (
    <div>
      <span>
        {feature}
        {content}
      </span>
      <br />
    </div>
  ) : null;

  const link = (
    <Link to="https://www.sharetribe.com/products/pricing/" target="_blank">
      Read more about Sharetribe pricing
    </Link>
  );

  return (
    <Banner
      icon={Icon}
      fontColour={fontColour}
      borderColour={borderColour}
      backgroundColour={backgroundColour}
      title={'Pricing information'}
      {...otherProps}
    >
      {featureMaybe}
      {children}
      {link}
    </Banner>
  );
};

export default Plan;
