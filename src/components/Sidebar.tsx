import React, { useEffect, useState } from 'react';
import {
  monMenu,
  sousMenu_Transactions,
  sousMenu_Activites,
} from '../lib/monMenu';
import { debounce } from 'lodash';
import { NavLink } from 'react-router-dom';
import { iconsListe } from '../lib/iconsListe';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({
    Transactions: false,
    Activites: false,
  });
  const [estOuvert, setEstOuvert] = useState(false);
  const [grandEcran, setGrandEcran] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      const grandEcranNavigateur =
        window.matchMedia('(min-width: 768px)').matches;
      /* setEstOuvert(grandEcranNavigateur); */
      setGrandEcran(grandEcranNavigateur);
    }, 1000);

    // Appeler une première fois pour l'initialisation au chargement de la page
    handleResize();

    // Écouter les changements de taille de l'écran
    window.addEventListener('resize', handleResize);

    // Nettoyer l'événement lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = (menu: string) => {
    setIsOpen((prev) => {
      const updatedState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === menu ? !prev[menu] : false; // Mettre à false sauf pour le menu actuel
        return acc;
      }, {} as { [key: string]: boolean });
      return updatedState;
    });
  };

  const toggleSidebar = () => {
    setEstOuvert((prev) => !prev);
  };

  return (
    <div
      className={`${
        estOuvert ? 'w-fit px-4' : 'w-auto px-1'
      }  bg-white h-auto shadow-lg`}>
      <div
        className={`${
          grandEcran ? 'block' : 'hidden'
        } flex justify-end px-2 pt-5`}>
        <button
          onClick={toggleSidebar}
          className="text-sky-900 hover:text-sky-600">
          {estOuvert ? iconsListe.menu_FERMEE : iconsListe.menu_OUVERT}
        </button>
      </div>

      <ul className="py-10">
        {monMenu.map((menu) => {
          // Menu avec sous-menu
          if (menu.nom === 'Transactions') {
            return (
              <li key={menu.nom} className="mb-4">
                <div
                  className={`${
                    isOpen.Transactions ? 'bg-sky-200' : 'font-medium'
                  } ${
                    estOuvert ? 'justify-between px-4' : 'space-x-2 px-1 '
                  } cursor-pointer py-2 flex items-center hover:bg-sky-400 rounded-lg`}
                  onClick={() => toggleMenu(menu.nom)}>
                  <div
                    className={`${estOuvert ? 'flex space-x-2' : 'mx-auto'}`}>
                    {estOuvert ? (
                      <div className="flex space-x-2">
                        <>{menu.icon1}</>
                        <span>{menu.nom}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <>{menu.icon1}</>
                        <span className="text-xs">{menu.nom}</span>
                      </div>
                    )}
                  </div>
                  {estOuvert && (
                    <>
                      {isOpen.Transactions
                        ? iconsListe.menu_MOINS
                        : iconsListe.menu_PLUS}
                    </>
                  )}
                </div>
                {isOpen.Transactions && (
                  <ul className="ml-4">
                    {sousMenu_Transactions.map((sousMenu) => (
                      <li key={sousMenu.nom} className="py-1">
                        <NavLink
                          to={sousMenu.lien}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg ${
                              isActive
                                ? 'bg-sky-700 text-white'
                                : 'hover:bg-sky-400'
                            }`
                          }>
                          {estOuvert ? (
                            <div className="flex space-x-2">
                              <>{sousMenu.icon1}</>
                              <span>{sousMenu.nom}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <>{sousMenu.icon1}</>
                              <span className="text-xs">{sousMenu.nom}</span>
                            </div>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          if (menu.nom === 'Activites') {
            return (
              <li key={menu.nom} className="mb-4">
                <div
                  className={`${
                    isOpen.Activites ? 'bg-sky-200' : 'font-medium'
                  } ${
                    estOuvert ? 'justify-between px-4' : 'space-x-2 px-1 '
                  } cursor-pointer py-2 flex items-center hover:bg-sky-700 rounded-lg`}
                  onClick={() => toggleMenu(menu.nom)}>
                  <div
                    className={`${estOuvert ? 'flex space-x-2' : 'mx-auto'}`}>
                    {estOuvert ? (
                      <div className="flex space-x-2">
                        <>{menu.icon1}</>
                        <span>{menu.nom}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <>{menu.icon1}</>
                        <span className="text-xs">{menu.nom}</span>
                      </div>
                    )}
                  </div>
                  {estOuvert && (
                    <>
                      {isOpen.Transactions
                        ? iconsListe.menu_MOINS
                        : iconsListe.menu_PLUS}
                    </>
                  )}
                </div>
                {isOpen.Activites && (
                  <ul className="ml-4">
                    {sousMenu_Activites.map((sousMenu) => (
                      <li key={sousMenu.nom} className={`py-1`}>
                        <NavLink
                          to={sousMenu.lien}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg ${
                              isActive
                                ? 'bg-sky-700 text-white'
                                : 'hover:bg-sky-400'
                            }`
                          }>
                          {estOuvert ? (
                            <div className="flex space-x-2">
                              <>{sousMenu.icon1}</>
                              <span>{sousMenu.nom}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <>{sousMenu.icon1}</>
                              <span className="text-xs">{sousMenu.nom}</span>
                            </div>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          // Menu simple
          return (
            <li key={menu.nom} className="mb-4">
              <NavLink
                to={menu.lien}
                className={({ isActive }) =>
                  `block ${estOuvert ? 'px-4' : 'px-1'} py-2 rounded-lg ${
                    isActive ? 'bg-sky-700 text-white' : 'hover:bg-sky-400'
                  }`
                }>
                {estOuvert ? (
                  <div className="flex space-x-2">
                    <>{menu.icon1}</>
                    <span>{menu.nom}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <>{menu.icon1}</>
                    <span className="text-xs">{menu.nom}</span>
                  </div>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
