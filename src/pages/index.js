import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

export default () => {
  return (
    <Layout>
      <h1>Sharetribe Flex developer documentation</h1>
      <p>Welcome to the docs. This is the intro.</p>
      <section>
        <h2>
          <Link to="/tutorials">Tutorials</Link>
        </h2>
        <p>
          Get started in learning about the product with hands-on tutorials for
          developers.
        </p>
        <ul>
          <li>Getting Started</li>
          <li>
            <Link to="/tutorials">All tutorials</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <Link to="/guides">How-to Guides</Link>
        </h2>
        <p>Specific step-by-step guides for solving </p>
        <ul>
          <li>How to...</li>
          <li>
            <Link to="/guides">All guides</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <Link to="/references">Reference</Link>
        </h2>
        <p>Technical reference to the tooling.</p>
        <ul>
          <li>API Reference</li>
          <li>
            <Link to="/references">All reference</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <Link to="/background">Background</Link>
        </h2>
        <p>
          Explanations and background information for important concepts and
          design decisions behind the product.
        </p>
        <ul>
          <li>Important concepts</li>
          <li>Sharetribe Flex architecture</li>
          <li>
            <Link to="/background">All background articles</Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
};
