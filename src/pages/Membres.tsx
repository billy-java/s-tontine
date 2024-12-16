// Membres.tsx
import React, { useEffect, useState } from 'react';
import { TMembre } from '../lib/types';
import Filters, {
  TListeDeroulanteProps,
} from '../components/recherche/Filters';
import Button from '../components/Button';
import {
  style_gradiant_blue,
  style_gradiant_green,
  style_gradiant_red,
} from '../lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ouvrirModal } from '../lib/Redux/appStateSlice';
import { RootState } from '../lib/Redux/redux';
import Modal_Membre from '../components/Modals/Modal_Membre';
import { modifierMembre, supprimerMembre } from '../lib/Redux/membreSlice';
import { iconsListe } from '../lib/iconsListe';

const Membres: React.FC = () => {
  const dispatch = useDispatch();
  const membres: TMembre[] = useSelector(
    (state: RootState) => state.membre.membres
  );

  const approuver = (membre: TMembre) => {
    dispatch(modifierMembre({ ...membre, approuvee: true }));
  };

  const debuterModification = (id: string) => {
    dispatch(ouvrirModal({ modal: 'membreModal', idToUpdate: id }));
  };

  const handleSupprimer = (id: string) => {
    dispatch(supprimerMembre(id));
  };

  const [search, setSearch] = useState('');
  const [listeDesLD, setListeDesLD] = useState<TListeDeroulanteProps[]>([
    {
      valeurSelectionnee: '',
      options: [
        'Président',
        'VicePrésident',
        'Trésorier',
        'Censeur',
        'Secrétaire',
        'Membre',
      ],
      placeholderLD: 'Selectionner un role',
    },
    {
      valeurSelectionnee: '',
      options: ['approuve', 'non approuve'],
      placeholderLD: 'Selectionner...',
    },
  ]);
  const [dateFilters, setDateFilters] = useState<string[]>(['']);

  const [filteredMembres, setFilteredMembres] = useState<TMembre[]>(membres);

  const handleSearch = () => {
    let result = membres.filter(
      (membre) =>
        membre.nom.toLowerCase().includes(search.toLowerCase()) ||
        membre.email.toLowerCase().includes(search.toLowerCase())
    );

    listeDesLD.forEach((dropdown) => {
      if (dropdown.valeurSelectionnee) {
        // Si le dropdown concerne les rôles
        if (
          JSON.stringify(dropdown.options) ===
          JSON.stringify([
            'Président',
            'VicePrésident',
            'Trésorier',
            'Censeur',
            'Secrétaire',
            'Membre',
          ])
        ) {
          result = result.filter(
            (membre) => membre.role === dropdown.valeurSelectionnee
          );
        }

        // Si le dropdown concerne l'approbation
        if (
          JSON.stringify(dropdown.options) ===
          JSON.stringify(['approuve', 'non approuve'])
        ) {
          const isApproved = dropdown.valeurSelectionnee === 'approuve'; // Convertir la valeur du dropdown en booléen
          result = result.filter((membre) => membre.approuvee === isApproved);
        }
      }
    });
    dateFilters.forEach((date) => {
      if (date) {
        result = result.filter(
          (membre) => new Date(membre.commenceTravail) >= new Date(date)
        );
      }
    });

    setFilteredMembres(result);
  };

  useEffect(() => {
    const applyFilters = () => {
      let result = membres.filter(
        (membre) =>
          membre.nom.toLowerCase().includes(search.toLowerCase()) ||
          membre.email.toLowerCase().includes(search.toLowerCase())
      );

      listeDesLD.forEach((dropdown) => {
        if (dropdown.valeurSelectionnee) {
          if (
            JSON.stringify(dropdown.options) ===
            JSON.stringify([
              'Président',
              'VicePrésident',
              'Trésorier',
              'Censeur',
              'Secrétaire',
              'Membre',
            ])
          ) {
            result = result.filter(
              (membre) => membre.role === dropdown.valeurSelectionnee
            );
          }
          if (
            JSON.stringify(dropdown.options) ===
            JSON.stringify(['approuve', 'non approuve'])
          ) {
            const isApproved = dropdown.valeurSelectionnee === 'approuve';
            result = result.filter((membre) => membre.approuvee === isApproved);
          }
        }
      });

      dateFilters.forEach((date) => {
        if (date) {
          result = result.filter(
            (membre) => new Date(membre.commenceTravail) >= new Date(date)
          );
        }
      });

      setFilteredMembres(result);
    };

    applyFilters();
  }, [membres, search, listeDesLD, dateFilters]);

  return (
    <div className="p-8 bg-gray-100  w-full min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Gestion des Membres
      </h1>

      {/* Section des filtres */}
      <Filters
        resultatRecherche={search}
        setResultatRecherche={setSearch}
        recherchePlaceholder="Rechercher par nom ou email"
        listeDesLD={listeDesLD}
        setListeDesLD={setListeDesLD}
        dateFilters={dateFilters}
        setDateFilters={setDateFilters}
        onFilter={handleSearch}
      />

      {/* Liste des Membres filtrés */}
      <div className="hidden sm:block w-full  mt-20  rounded-lg">
        <table className="table table-auto w-full ">
          <thead className="bg-gray-200 border-b rounded-t-lg border-gray-300">
            <tr>
              <th className="p-4 rounded-tl-lg">Nom, Email</th>
              <th className="p-4 ">Rôle, Status</th>
              <th className="p-4 ">Poste, depuis</th>

              <th className="p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembres.map((membre, index) => (
              <React.Fragment key={membre.id}>
                <tr
                  key={membre.id} // Clé principale pour chaque membre
                  className="hover:bg-slate-200 hover:shadow-lg rounded-lg transition duration-200 ease-in-out odd:bg-gray-50 even:bg-gray-100">
                  {/* Colonne Nom et Email */}
                  <td className="p-4 space-y-2 rounded-l-lg">
                    <p className="text-lg font-bold text-gray-800">
                      {membre.nom}
                    </p>
                    <p className="text-sm text-gray-600">{membre.email}</p>
                  </td>

                  {/* Colonne Rôle et Statut */}
                  <td className="p-4 space-y-2">
                    <p className="text-gray-700 font-medium flex items-center space-x-2">
                      <span>{membre.role}</span>
                      {membre.role === 'Président' ? iconsListe.securite : ''}
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        membre.approuvee ? 'text-green-500' : 'text-red-500'
                      }`}>
                      {membre.approuvee ? 'Approuvee' : 'Refusée'}
                    </p>
                  </td>

                  {/* Colonne Métier et Date */}
                  <td className="p-4 space-y-2">
                    <p className="text-gray-700">{membre.metier}</p>
                    <p className="text-sm text-gray-500">
                      {membre.commenceTravail}
                    </p>
                  </td>

                  {/* Colonne Actions */}
                  <td className="p-4 flex flex-wrap justify-center space-x-2 rounded-r-lg">
                    {!membre.approuvee && (
                      <Button
                        onClick={() => approuver(membre)}
                        actif={true}
                        variante="bleu"
                        taille="px-3 py-1.5"
                        chargement={false}
                        className={
                          style_gradiant_blue +
                          ' flex justify-center items-center'
                        }>
                        Approuver
                      </Button>
                    )}
                    <Button
                      onClick={() => debuterModification(membre.id)}
                      actif={true}
                      variante="bleu"
                      taille="px-3 py-1.5"
                      chargement={false}
                      className={`${style_gradiant_green} m-1`}>
                      {iconsListe.modifier}
                    </Button>
                    <Button
                      onClick={() => handleSupprimer(membre.id)}
                      actif={true}
                      variante="rouge"
                      taille="px-3 py-1.5"
                      chargement={false}
                      className={`${style_gradiant_red} m-1`}>
                      {iconsListe.supprimer}
                    </Button>
                  </td>
                </tr>
                {/* Ligne de séparation */}
                {index < filteredMembres.length - 1 && (
                  <tr className="bg-opacity-100" key={`separator-${membre.id}`}>
                    <td colSpan={4} className="h-4"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-20  sm:hidden w-full flex flex-col items-center justify-center ">
        {filteredMembres.map((membre) => (
          <div
            key={membre.id}
            className="mb-4 w-2/3 border border-gray-50 p-4  rounded-lg shadow-md">
            {/* Nom et Email */}
            <div className="mb-2">
              <h2 className="text-lg font-bold text-gray-800">{membre.nom}</h2>
              <p className="text-sm text-gray-600">{membre.email}</p>
            </div>

            {/* Rôle et Statut */}
            <div className="mb-2">
              <p className="text-gray-700 text-sm font-medium flex items-center space-x-2">
                <span>{membre.role}</span>
                {membre.role === 'Président' ? iconsListe.securite : ''}
              </p>

              <p
                className={`text-sm font-semibold ${
                  membre.approuvee ? 'text-green-500' : 'text-red-500'
                }`}>
                {membre.approuvee ? 'Approuvee' : 'Refusee'}
              </p>
            </div>

            {/* Métier et Date */}
            <div className="mb-2">
              <p className="text-sm">
                <span className="font-semibold">Métier :</span> {membre.metier}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Depuis :</span>{' '}
                {membre.commenceTravail}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-start space-x-4 mt-2">
              {!membre.approuvee && (
                <Button
                  onClick={() => approuver(membre)}
                  actif={true}
                  variante="bleu"
                  taille="px-3 py-1.5"
                  chargement={false}
                  className={
                    style_gradiant_blue + ' flex justify-center items-center'
                  }>
                  Approuver
                </Button>
              )}
              <Button
                onClick={() => debuterModification(membre.id)}
                actif={true}
                variante="bleu"
                taille="px-3 py-1.5"
                chargement={false}
                className={style_gradiant_green + ' flex justify-center'}>
                {iconsListe.modifier}
              </Button>
              <Button
                onClick={() => handleSupprimer(membre.id)}
                actif={true}
                variante="rouge"
                taille="px-3 py-1.5"
                chargement={false}
                className={style_gradiant_red + ' flex justify-center'}>
                {iconsListe.supprimer}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal_Membre />
    </div>
  );
};

export default Membres;

/* 

•  Titre principal : Gestion des Membres.
•  Section Recherche et Filtres :
•	Champ de recherche par nom ou email.
•	Filtres : rôle, actif/inactif, date d’inscription.
•  Liste des membres :
•	Tableau avec colonnes :
o	Nom, Rôle, Statut, Date d’inscription, Actions.


Baby gemini
*/
