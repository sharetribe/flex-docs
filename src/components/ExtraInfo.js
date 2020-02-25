import React, { useState } from 'react';
import styled from 'styled-components';

import { baselineSpacing } from '../config';

import { P } from '../components';

// TODO: check if the design is OK and add styling if needed
const ToggleButton = styled.button``;
const Title = styled.h6``;

// TODO: we might want to rethink how Markdown AST is styled.
// the current setup (with element styles) has cascading effect to specificity

const ExtraInfoSection = styled.section`
  margin-bottom: 24px;

  > button > h6 {
    // Reset default styles
    margin: 0;
    text-align: left;
    text-transform: unset;

    // Enable baseline offset
    position: relative;

    font-size: 12px;
    line-height: 18px;
    letter-spacing: 1px;

    // Offset baseline
    top: -1px;
  }
`;

const ExtraInfoContent = styled.div`
  && {
    padding-top: 2px;
    padding-bottom: 6px;

    > p  {
      // Only top-level paragraphs get the P styles as paragraphs also
      // exist e.g. in lists where the baseline offset is already
      // done. Margins are also handled separately in those components.
      ${P.styles}
      margin-bottom: ${baselineSpacing}px;
      max-width: ${props => props.theme.contentMaxWidth}px;
    }
  }
`;

/**
 * ExtraInfo component makes it possible to to initially hide optional information.
 */
const ExtraInfo = props => {
  // Declare a new state variable, which we'll call "count"
  const [isOpen, setIsOpen] = useState(false);
  const { children, title, ...otherProps } = props;
  const display = isOpen ? 'block' : 'none';

  // TODO: style this arrow (use SVG and animate?)
  const arrow = '›';

  return (
    <ExtraInfoSection {...otherProps}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <Title>
          {arrow} {title}
        </Title>
      </ToggleButton>
      <ExtraInfoContent style={{ display }}>{children}</ExtraInfoContent>
    </ExtraInfoSection>
  );
};

export default ExtraInfo;
