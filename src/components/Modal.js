import React, { Component } from 'react';
import { default as ReactModal } from 'react-modal';
import styled from 'styled-components';
import noScroll from 'no-scroll';

import {
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  P,
} from '../brand-components';

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: ${10 * baselineSmall}px;
  height: ${10 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    width: ${10 * baselineLarge}px;
    height: ${10 * baselineLarge}px;
  }
`;

class Modal extends Component {
  componentDidMount() {
    ReactModal.setAppElement('#___gatsby');
    if (this.props.isOpen) {
      noScroll.on();
    }
  }
  componentDidUpdate() {
    if (this.props.isOpen) {
      noScroll.on();
    } else {
      noScroll.off();
    }
  }
  componentWillUnmount() {
    noScroll.off();
  }
  render() {
    const { isOpen, contentLabel, onClose, children } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel={contentLabel}
        onRequestClose={onClose}
        style={{
          content: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            border: 'none',
            padding: 0,
          },
        }}
      >
        {children}
        <CloseButton onClick={onClose}>
          <P>Close</P>
        </CloseButton>
      </ReactModal>
    );
  }
}

export default Modal;
