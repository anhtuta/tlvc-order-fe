import React from 'react';
import Home from './pages/Home/Home';
import Home2 from './pages/Home/Home2';
import MayLocKk from './pages/MayLocKk/MayLocKk';
import TLVC from './pages/TLVC/TLVC';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/home2',
    exact: true,
    main: () => <Home2 />
  },
  {
    path: '/tlvc',
    exact: true,
    main: () => <TLVC />
  },
  {
    path: '/may-loc-kk',
    exact: true,
    main: () => <MayLocKk />
  },
  {
    path: '/about',
    exact: false,
    main: () => <About />
  },
  {
    path: '',
    exact: false,
    main: () => <NotFound />
  }
];

export default routes;
