import React from 'react';

const IconSearch = props => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(-16 -14)">
          <g
            transform="translate(17 15)"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M8.514 8l3.718 3.494" />
            <ellipse cx="4.789" cy="4.5" rx="4.789" ry="4.5" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default IconSearch;
