import React from 'react';
import { Link } from 'gatsby';

const NavLink = props => {
  return (
    <Link
      getProps={({ isPartiallyCurrent }) => {
        return isPartiallyCurrent
          ? {
              style: {
                fontWeight: 'bold',
              },
            }
          : null;
      }}
      {...props}
    />
  );
};

const Topbar = () => {
  return (
    <div
      style={{
        backgroundColor: '#eee',
        color: '#666',
      }}
    >
      <nav>
        <ul
          style={{
            margin: 0,
            padding: '2rem 0',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink to="/tutorials">Tutorials</NavLink>
          </li>
          <li>
            <NavLink to="/guides">How-to Guides</NavLink>
          </li>
          <li>
            <NavLink to="/references">Reference</NavLink>
          </li>
          <li>
            <NavLink to="/background">Background</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Topbar;
