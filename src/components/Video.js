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
`

const VideoElement = ({children}) => {
    const mapChildren = React.Children.map(children, child => {
        return typeof(child) !== 'string' ? React.cloneElement(child) : null;
    })
    return (
        <VideoTag controls muted>
        {children && mapChildren}
        <p>Your browser does not support embedded videos</p>
        </VideoTag>
    )
}

 const Video = props => {
    return (
        <div>
            <VideoElement children={props.children} />
        </div>
    )
  };

  export default Video;