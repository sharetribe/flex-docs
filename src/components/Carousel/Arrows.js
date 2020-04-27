import React from 'react';
import styled from 'styled-components';

const ArrowLeftComponent = props => (
  <button {...props}>
    <svg
      width="9"
      height="13"
      viewBox="0 0 9 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.195 6.03c-.26.26-.26.68 0 .94l5.333 5.335c.262.26.683.26.943 0 .262-.26.262-.683 0-.943L2.61 6.5l4.86-4.862c.262-.26.262-.683 0-.943-.26-.26-.68-.26-.942 0L1.195 6.03z"
        fillRule="evenodd"
      />
    </svg>
  </button>
);

const ArrowLeft = styled(ArrowLeftComponent)`
  padding: 24px 12px 22px 24px;

  &:focus {
    outline: none;
  }

  & svg {
    stroke: ${props =>
      props.disabled ? props.theme.arrowDisabled : props.theme.arrow};
  }

  &:focus svg {
    stroke: black;
  }

  &:hover svg {
    stroke: ${props =>
      props.disabled ? props.theme.arrowDisabled : props.theme.arrowHoverColor};
  }
`;

const ArrowRightComponent = props => (
  <button {...props}>
    <svg
      width="9"
      height="13"
      viewBox="0 0 9 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.472 6.97c.26-.26.26-.68 0-.94L2.14.694c-.263-.26-.684-.26-.944 0-.26.26-.26.683 0 .943L6.056 6.5l-4.86 4.862c-.26.26-.26.683 0 .943.26.26.68.26.943 0L7.47 6.97z"
        fillRule="evenodd"
      />
    </svg>
  </button>
);

const ArrowRight = styled(ArrowRightComponent)`
  padding: 24px 24px 22px 12px;

  &:focus {
    outline: none;
  }

  & svg {
    stroke: ${props =>
      props.disabled ? props.theme.arrowDisabled : props.theme.arrow};
  }

  &:focus svg {
    stroke: black;
  }

  &:hover svg {
    stroke: ${props =>
      props.disabled ? props.theme.arrowDisabled : props.theme.arrowHoverColor};
  }
`;

export { ArrowLeft, ArrowRight };
