import React, { Component } from 'react';
import { PRD_TLVC, PRD_MAY_LOC_KK } from '../../constants/Constants';
import { Route, Link } from 'react-router-dom';

const menus = [
  {
    name: 'Home',
    to: '/',
    exact: true
  },
  {
    name: PRD_TLVC,
    to: '/tlvc',
    exact: true
  },
  {
    name: PRD_MAY_LOC_KK,
    to: '/may-loc-kk',
    exact: true
  },
  {
    name: 'About',
    to: '/about',
    exact: true
  }
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <li className={match ? 'active-menu' : ''}>
            <Link to={to}>{label}</Link>
          </li>
        );
      }}
    />
  );
};

class Menu extends Component {
  render() {
    return (
      <div className="navbar navbar-default">
        <ul className="nav navbar-nav">{this.showMenus(menus)}</ul>
      </div>
    );
  }

  showMenus = (menus) => {
    let result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <MenuLink
            key={index}
            label={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
          />
        );
      });
    }
    return result;
  };
}

export default Menu;
