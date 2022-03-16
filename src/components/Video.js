import React from 'react';

/**
 * Video component
 */
const VideoElement = ({children}) => {
    const mapChildren = React.Children.map(children, child => {
        return typeof(child) !== 'string' ? React.cloneElement(child) : null;
    })
    return (
        <video controls height="220" width="390">
        {children && mapChildren}
        </video>
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