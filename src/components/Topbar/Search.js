import styled from 'styled-components';

import { baselineBreakpoint } from '../../brand-components';

// Temporary placeholder for search to align the Topbar items nicely
const Search = styled.div`
  width: 60px;
  height: 60px;

  @media (min-width: ${baselineBreakpoint}px) {
    // Same width as the logo in the left for symmetry
    width: 120px;
    height: 72px;
  }
`;

export default Search;
