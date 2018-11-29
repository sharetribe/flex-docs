import React, { Component } from 'react';
import styled from 'styled-components';

import { baselineSmall, baselineLarge, baselineBreakpoint } from './config';

const dev = process.env.NODE_ENV === 'development';

const gridColor1 = 'rgba(0, 0, 0, 0.3)';
const gridColor2 = 'rgba(0, 0, 0, 0.1)';

const BaselineGrid = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;

  /* Height is calculated dynamically based on the document body scroll height */
  height: ${props => props.height};

  /* Enable clicking through the baseline element */
  pointer-events: none;

  background: linear-gradient(
    to bottom,
    ${gridColor1},
    ${gridColor1} 50%,
    ${gridColor2} 50%,
    ${gridColor2}
  );
  background-size: 100% ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    background-size: 100% ${2 * baselineLarge}px;
  }
`;

const isCtrlB = e => e.key === 'b' && e.ctrlKey;

class BaselineDevGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, scrollHeight: '100vh' };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  componentDidMount() {
    if (dev) {
      window.addEventListener('keyup', this.onKeyUp);
      window.addEventListener('resize', this.onResize);
      this.onResize();
      console.warn(
        'Baseline development grid enabled, press CTLR+b to toggle visibility'
      );
    }
  }
  componentWillUnmount() {
    if (dev) {
      window.removeEventListener('keyup', this.onKeyUp);
      window.removeEventListener('resize', this.onResize);
    }
  }
  onKeyUp(e) {
    if (isCtrlB(e)) {
      this.setState(prevState => ({
        visible: !prevState.visible,
      }));
    }
  }
  onResize() {
    this.setState({
      scrollHeight: `${document.body.scrollHeight}px`,
    });
  }
  render() {
    const { children } = this.props;
    if (!dev) {
      return <>{children}</>;
    }
    return (
      <>
        {children}
        <BaselineGrid
          visible={this.state.visible}
          height={this.state.scrollHeight}
        />
      </>
    );
  }
}

export default BaselineDevGrid;
