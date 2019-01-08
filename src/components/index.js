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
