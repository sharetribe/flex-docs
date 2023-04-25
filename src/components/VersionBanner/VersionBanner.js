import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { baselineBreakpoint, grid } from '../../config';
import { WarningIcon } from '../../components';

const Icon = styled(WarningIcon).attrs({
  bgcolor: '#c4dfff',
})`
  height: 23px;
  margin-right: 10px;
  min-width: 23px;
`;

const Banner = styled.div`
  background-color: #c4dfff;
  border: 2px solid #224fb6;
  border-radius: 4px;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  font-size: 12px;
  font-weight: 700;
  max-width: min(
    ${props => props.theme.pageContentMaxWidth + 2 * grid.sideMargin}px,
    calc(100% - 4em)
  );
  padding: 20px 30px 20px 20px;
  position: relative;
  margin: 30px auto 0 auto;

  a {
    font-weight: 400;
    text-decoration: underline;
    color: black;
  }
  a:first-child {
    margin-right: 20px;
  }
  a::before {
    content: '';
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    margin-right: 5px;
    margin-bottom: 2px;
    transform: rotate(-45deg);
  }
  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 14px;
  }
`;

const Cross = props => {
  return (
    <svg
      viewBox="0 0 10 10"
      width="0.75em"
      height="0.75em"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M1,1 9,9 M9,1 1,9" />
    </svg>
  );
};

const CloseBanner = styled(Cross)`
  width: 20px;
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 5px;
`;

const VersionBanner = props => {
  const [isOpen, setIsOpen] = useState(null);
  useEffect(() => {
    const isOpenS = JSON.parse(localStorage.getItem('FLEX_DOCS_bannerIsOpen'));
    if (isOpenS) {
      setIsOpen(isOpenS);
    } else if (isOpenS == null) {
      setIsOpen(true);
    }
  }, []);
  useEffect(() => {
    if (typeof isOpen == 'boolean') {
      localStorage.setItem('FLEX_DOCS_bannerIsOpen', JSON.stringify(isOpen));
    }
  }, [isOpen]);

  return (
    <div>
      <Banner isOpen={isOpen}>
        <Icon />
        <div>
          <CloseBanner onClick={() => setIsOpen(!isOpen)}></CloseBanner>
          <span>
            You are browsing the documentation for the new Sharetribe Web
            Template. If you are using FTW-daily, hourly or product, see the
            legacy documentation.
          </span>
          <div>
            <a href="/ftw/legacy-templates/">Read more</a>
            <a href="https://www.sharetribe.com/docs/legacy/">
              Legacy documentation
            </a>
          </div>
        </div>
      </Banner>
    </div>
  );
};

export default VersionBanner;
