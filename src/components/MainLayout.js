import React, { useEffect } from 'react';
import styled from 'styled-components';
import noScroll from 'no-scroll';

import { baselineBreakpoint, baselineLarge } from '../config';

import { BaseLayout, Topbar, Footer, Sidebar } from '../components';

const hasWindow = typeof window !== 'undefined';
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = hasWindow ? window : {};
  return { width, height };
};
const handleSidebarOnResize = setIsOpen => () => {
  const width = getWindowDimensions().width;
  const isDesktopLayout = width && width >= baselineBreakpoint;
  const isMobileLayout = width && width < baselineBreakpoint;

  if (isDesktopLayout) {
    noScroll.off();
  } else if (isMobileLayout) {
    setIsOpen(false);
  }
};

const WrapperTopbar = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TopbarArea = styled.div`
  @media (min-width: ${baselineBreakpoint}px) {
    z-index: 10;
  }
`;

const WrapperSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  @media (min-width: ${baselineBreakpoint}px) {
    flex-direction: row;
  }
`;
const SidebarArea = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: calc(100vh - 60px);
  margin: 0;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 9;

  @media (min-width: ${baselineBreakpoint}px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: sticky;
    flex-shrink: 0;
    width: 255px;
    height: 100vh;
    transform: unset;
    box-shadow: 6px 0px 16px -10px rgba(0, 0, 0, 0.05);
  }
  @media (min-width: 1024px) {
    display: block;
  }
`;
const Content = styled.main`
  // Make sure that even with little content the element expands so
  // that the Wrapper takes at least the full viewport height.
  flex-grow: 1;
  margin-bottom: ${9 * baselineLarge}px;

  @media (min-width: ${baselineBreakpoint}px) {
    width: calc(100vw - 255px);
  }
`;

const MainLayout = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const csr = hasWindow;
  useEffect(() => {
    if (csr) {
      const handleResize = handleSidebarOnResize(setIsOpen);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [csr]);

  const setOpen = open => {
    const width = getWindowDimensions().width;
    const isMobileLayout = width && width < baselineBreakpoint;
    if (open && isMobileLayout) {
      noScroll.on();
    } else {
      noScroll.off();
    }
    setIsOpen(open);
  };

  const { activeArticle, activeCategory, children, ...rest } = props;
  return (
    <BaseLayout activeArticle={activeArticle} activeCategory={props.activeCategory} {...rest}>
      <WrapperTopbar>
        <TopbarArea>
          <Topbar manageSidebar={{ isOpen, setIsOpen: setOpen }} />
        </TopbarArea>

        <WrapperSidebar>
          <SidebarArea isOpen={isOpen}>
            <Sidebar activeArticle={activeArticle} />
          </SidebarArea>
          <Content>{children}</Content>
        </WrapperSidebar>
        <Footer />
      </WrapperTopbar>
    </BaseLayout>
  );
};

export default MainLayout;
