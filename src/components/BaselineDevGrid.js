import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { baselineSmall, baselineLarge, baselineBreakpoint } from '../config';

const dev = process.env.NODE_ENV === 'development';

const BaselineGrid = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  /* Height is calculated dynamically based on the document body scroll height */
  height: ${props => props.height};

  /* Enable clicking through the baseline element */
  pointer-events: none;

  background: linear-gradient(
    to bottom,
    ${props => props.theme.baselineDevColor1},
    ${props => props.theme.baselineDevColor1} 50%,
    ${props => props.theme.baselineDevColor2} 50%,
    ${props => props.theme.baselineDevColor2}
  );
  background-size: 100% ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    background-size: 100% ${2 * baselineLarge}px;
  }
`;

const isCtrlB = e => e.key === 'b' && e.ctrlKey;

// Hook that runs console.warn with the message only once
const useWarnOnce = message => {
  useEffect(() => {
    console.warn(message);
  }, []);
};

// Hook that returns the current body scroll height
const useBodyScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState('100vh');

  const onResize = () => {
    setScrollHeight(`${document.body.scrollHeight}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    // Navigating an internal link changes the document height, but
    // doesn't really trigger a global event we can listen to. This is
    // why we have to resort to an interval to update the grid height
    // continuously.
    const intervalId = window.setInterval(onResize, 2000);

    return () => {
      window.removeEventListener('resize', onResize);
      window.clearInterval(intervalId);
    };
  });
  return scrollHeight;
};

// Hook that listens to keyboard events and returns the current
// visibility of the grid
const useGridVisible = () => {
  const [visible, setVisible] = useState(false);

  const onKeyUp = e => {
    if (isCtrlB(e)) {
      setVisible(!visible);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  });

  return visible;
};

const BaselineDevGrid = props => {
  const { children } = props;
  if (!dev) {
    return <>{children}</>;
  }
  useWarnOnce(
    'Baseline development grid enabled, press CTLR+b to toggle visibility'
  );
  const scrollHeight = useBodyScrollHeight();
  const visible = useGridVisible();
  return (
    <>
      {children}
      <BaselineGrid visible={visible} height={scrollHeight} />
    </>
  );
};

export default BaselineDevGrid;
