import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import {
  IMenu,
  monMenu,
  sousMenu_Activites,
  sousMenu_Transactions,
} from './lib/monMenu';

import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Membres from './pages/Membres';
import Reunions from './pages/Reunions';
import Contact from './pages/Support/Contact';
import Parametres from './pages/Parametres';
import Aides from './pages/Transactions/Aides';
import Cotisations from './pages/Transactions/Cotisations';
import Prets from './pages/Transactions/Prets';
import Versements from './pages/Transactions/Versements';
import Evenements from './pages/Activites/Evenements';
import Votes from './pages/Activites/Votes';
import Badges from './pages/Activites/Badges';

// Combinez tous les menus en une seule liste
const menus: IMenu[] = [
  ...monMenu,
  ...sousMenu_Transactions,
  ...sousMenu_Activites,
];

// Définissez une table de correspondance pour les composants des routes
const routeMap: { [key: string]: React.ReactElement } = {
  '/': <Home />,
  '/notifications': <Notifications />,
  '/reunions': <Reunions />,
  '/membres': <Membres />,
  '/transactions/aides': <Aides />,
  '/transactions/cotisations': <Cotisations />,
  '/transactions/prets': <Prets />,
  '/transactions/versements': <Versements />,
  '/activites/evenements': <Evenements />,
  '/activites/votes': <Votes />,
  '/activites/badges': <Badges />,
  '/parametres': <Parametres />,
  '/contact': <Contact />,
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Génération automatique des routes */}
      {menus.map((menuItem) => (
        <Route
          key={menuItem.lien}
          path={menuItem.lien}
          element={routeMap[menuItem.lien] || <Navigate to="/" />}
        />
      ))}
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
