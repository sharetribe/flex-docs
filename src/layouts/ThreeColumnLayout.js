import React from 'react';

import BaseLayout from './BaseLayout';

const ThreeColumnLayout = props => {
  const { children, ...rest } = props;
  return <BaseLayout {...rest}>
           <div style={{
             margin: '8 px auto',
             maxWidth: 1024,
           }}>
             {children}
           </div>
         </BaseLayout>;
};

export default ThreeColumnLayout;
