import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, themeLight } from '../../config';
import { Ul, Li } from '../../components';

import Example from './Example';

const ColorBox = styled.div`
  height: ${baselineSpacing}px;
  background-color: ${props => props.color};
`;

const ColorDescription = props => {
  const { prop, val } = props;
  return (
    <Li>
      {prop} ({val}):
      <ColorBox color={val} />
    </Li>
  );
};

const Colors = () => {
  const colors = Object.keys(themeLight).reduce((result, key) => {
    const val = themeLight[key];
    if (typeof val === 'string' && val.startsWith('#')) {
      return result.concat({
        prop: key,
        val,
      });
    }
    return result;
  }, []);
  return (
    <Example>
      <Ul>
        {colors.map(c => (
          <ColorDescription key={c.prop} {...c} />
        ))}
      </Ul>
    </Example>
  );
};

export default Colors;
