// Brand components
export { default as fonts } from '../brand-components/fonts';
export { default as GlobalStyle } from '../brand-components/GlobalStyle';
export { H1, H2, H3, H4, H5, H6 } from '../brand-components/headings';
export { default as P } from '../brand-components/P';
export { default as Ingress } from '../brand-components/Ingress';
export { default as Ul } from '../brand-components/Ul';
export { default as Ol } from '../brand-components/Ol';
export { default as Li } from '../brand-components/Li';
export { default as A } from '../brand-components/A';
export { default as Hr } from '../brand-components/Hr';
export { default as Strong } from '../brand-components/Strong';
export { default as Em } from '../brand-components/Em';
export {
  default as BaselineDevGrid,
} from '../brand-components/BaselineDevGrid';

// Components that don't import other components from this
// index. These should not create any circular dependencies.
export { default as Link } from './Link';
export { default as Footer } from './Footer';
export { default as SecondaryBox } from './SecondaryBox';
export { default as Breadcrumb } from './Breadcrumb';
export { default as UiText } from './UiText';

// Components that import other components from this index. These
// might create circular dependencies. Changing the order of these
// exports solves those problems.
//
// See the gatsby-node.js file to enable a Webpack plugin that warns
// about circular dependencies to aid in finding problematic
// dependencies.
export { default as BaseLayout } from './BaseLayout';
export { default as MainLayout } from './MainLayout';
export { default as Topbar } from './Topbar/Topbar';
export {
  default as ArticleIndexPage,
} from './ArticleIndexPage/ArticleIndexPage';
export { default as ArticlePage } from './ArticlePage/ArticlePage';
export { default as LandingPage } from './LandingPage/LandingPage';
export { default as NotFoundPage } from './NotFoundPage';
export {
  default as ThanksForTheFeedbackPage,
} from './ThanksForTheFeedbackPage';
export { default as Root } from './Root';
