

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.logo}>QUIZZIE</h1>
      <ul className={styles.menu}>
        <li>
          <NavLink to="/dashboard" activeClassName={styles.active}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/analysis" activeClassName={styles.active}>Analytics</NavLink>
        </li>
        <li>
          <NavLink to="/create-quiz" activeClassName={styles.active}>Create Quiz</NavLink>
        </li>
      </ul>
      <hr className={styles.divider} />
      <ul className={styles.bottomMenu}>
        <li>
          <NavLink to="/" activeClassName={styles.active}>Logout</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

