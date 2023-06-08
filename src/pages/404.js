import React from 'react';

import { NotFoundPage } from '../components';

const Page404 = () => {
  React.useEffect(() => {
    if (window.plausible) {
      window.plausible(`404`, { props: { path: document.location.pathname } });
    }
  }, []);
  return <NotFoundPage />;
};
export default Page404;
