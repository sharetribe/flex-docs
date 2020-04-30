import React from 'react';
import styled from 'styled-components';

const Description = styled.div`
  width: 100%;
  user-select: none;
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  padding-bottom: 24px;
  padding-right: 24px;

  & > img {
    width: 100%;
  }
`;

const Img = styled.img`
  border: solid 1px ${props => props.theme.slideImgBorderColor};
`;

const Slide = props => {
  const { className, children, imgSrc, imgAlt, width } = props;
  return (
    <SlideContainer className={className} width={width}>
      {imgSrc && imgAlt ? <Img src={imgSrc} alt={imgAlt} /> : null}
      <Description>{children}</Description>
    </SlideContainer>
  );
};

export default Slide;
