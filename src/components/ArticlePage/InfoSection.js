import React from 'react';
import styled from 'styled-components';

import { H6, UiText } from '../../components';

const InfoWrapper = styled.div`
  display: flex;
`;

const InfoLabel = styled(H6)`
  flex-shrink: 0;
  margin-right: 6px;
`;

const Info = props => {
  const { label, children } = props;
  return (
    <InfoWrapper>
      <InfoLabel as="p">{label}:</InfoLabel>
      {children}
    </InfoWrapper>
  );
};

const HighlightedText = styled.span`
  color: ${props => props.theme.textColorHighlight};
`;

const SkillLi = styled.li`
  display: inline;

  margin-right: 6px;

  ::after {
    content: '•';
    margin-left: 6px;
  }

  :last-child {
    margin-right: 0;

    ::after {
      display: none;
    }
  }
`;

const SkillsWrapper = styled(H6)`
  padding: 0;
`;

const Skill = props => {
  const { children } = props;
  return (
    <SkillLi>
      <HighlightedText>{children}</HighlightedText>
    </SkillLi>
  );
};

const Skills = props => {
  const { skills } = props;
  const skillList = skills.split(',');
  return (
    <SkillsWrapper as="ul">
      {skillList.map(skill => (
        <Skill key={skill}>{skill}</Skill>
      ))}
    </SkillsWrapper>
  );
};

const formattedReadingTime = (readingTimeText, minutes) => {
  if (readingTimeText === 'estimate') {
    const mins = Math.ceil(minutes);
    return `${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
  }
  return readingTimeText;
};

const InfoSection = props => {
  const { frontmatter, estimatedReadingTime, ...rest } = props;
  const { skills, readingTime } = frontmatter;
  return (
    <div {...rest}>
      {skills ? (
        <Info label={UiText.fn('ArticlePage.InfoSection.requiredSkills')}>
          <Skills skills={skills} />
        </Info>
      ) : null}
      {readingTime ? (
        <Info label={UiText.fn('ArticlePage.InfoSection.readingTime')}>
          <H6 as="p">
            <HighlightedText>
              {formattedReadingTime(readingTime, estimatedReadingTime)}
            </HighlightedText>
          </H6>
        </Info>
      ) : null}
    </div>
  );
};

export default InfoSection;
