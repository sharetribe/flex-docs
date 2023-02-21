import React from 'react';
import styled from 'styled-components';

/**
 * Video component for embedding video
 */
const VideoTag = styled.video`
  width: 100%;
  height: auto;
  max-width: 720px; // Match max-width of text paragraphs
  margin-bottom: 24px;
`;

const VideoElement = ({ children }) => {
  const mapChildren = React.Children.map(children, child => {
    // Using React.cloneElement, we clone the video object and overwrite the src prop.
    // The overwrite appends #t=0.1 which in combination with preload="metadata" adds the
    // first frame of the video as the video thumbnail.
    return typeof child !== 'string'
      ? React.cloneElement(child, { src: child.props?.src + '#t=0.1' })
      : null;
  });
  return (
    <VideoTag controls muted preload="metadata">
      {children && mapChildren}
      <p>Your browser does not support embedded videos</p>
    </VideoTag>
  );
};

const Video = props => {
  return (
    <div>
      <VideoElement children={props.children} />
    </div>
  );
};

export default Video;
