import React, { useState, useEffect } from 'react';
import { initialiserReunion, TReunion } from '../../lib/types';
import { style_gradiant_blue, style_gradiant_red } from '../../lib/styles';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/Redux/redux';
import { ajouterReunion, modifierReunion } from '../../lib/Redux/reunionSlice';
import { fermerModal } from '../../lib/Redux/appStateSlice';

const Modal_Reunion = () => {
  const { isOpen, idToUpdate } = useSelector(
    (state: RootState) => state.appState.reunionModal
  );
  const dispatch = useDispatch();
  const reunions: TReunion[] = useSelector(
    (state: RootState) => state.reunion.reunions
  );

  const [uneReunion, setUneReunion] = useState<TReunion>(initialiserReunion());

  useEffect(() => {
    if (idToUpdate) {
      const reunion = reunions.find((r) => r.id === idToUpdate);
      if (reunion) {
        setUneReunion(reunion);
      }
    } else {
      setUneReunion(initialiserReunion());
    }
  }, [idToUpdate, reunions]);
  
  if (!isOpen) return null;

  const titre = (): { titreModal: string; titre_Bouton_Bleu: string } => {
    const nouveau = {
      titreModal: 'Créer une Réunion',
      titre_Bouton_Bleu: 'Créer la Réunion',
    };
    const modifier = {
      titreModal: 'Modifier une Réunion',
      titre_Bouton_Bleu: 'Modifier la Réunion',
    };
    return uneReunion.id === 'default-id' ? nouveau : modifier;
  };

  const mettre_A_Jour_Les_Donnees_saisies = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setUneReunion((prevReunion) => ({
      ...prevReunion,
      [name]: type === 'radio' ? value === 'true' : value,
    }));
  };

  const onSave = () => {
    if (uneReunion.id === 'default-id') {
      dispatch(ajouterReunion(uneReunion));
    } else {
      dispatch(modifierReunion(uneReunion));
    }
    dispatch(fermerModal('reunionModal'));
  };

  const onCancel = () => {
    dispatch(fermerModal('reunionModal'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-sm sm:text-base lg:text-base w-[70%] sm:w-2/3 lg:w-1/3 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{titre().titreModal}</h2>
        <div className="mb-4">
          <input
            type="text"
            name="nomReunion"
            value={uneReunion.nomReunion}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description1"
            value={uneReunion.description1}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description2"
            value={uneReunion.description2}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <select
            name="type"
            value={uneReunion.type}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="Tournante">A tour de role</option>
            <option value="Investissement">Investissement</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="dateCreation"
            value={uneReunion.dateCreation}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="epargne"
            className="block text-sm font-medium text-gray-700">
            Épargne
          </label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                id="epargneOui"
                type="radio"
                name="epargne"
                value="true"
                checked={uneReunion.epargne === true}
                onChange={mettre_A_Jour_Les_Donnees_saisies}
                className="mr-2"
              />
              <label htmlFor="epargneOui" className="text-sm">
                Oui
              </label>
            </div>
            <div>
              <input
                id="epargneNon"
                type="radio"
                name="epargne"
                value="false"
                checked={uneReunion.epargne === false}
                onChange={mettre_A_Jour_Les_Donnees_saisies}
                className="mr-2"
              />
              <label htmlFor="epargneNon" className="text-sm">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="aide"
            className="block text-sm font-medium text-gray-700">
            Aide
          </label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                id="aideOui"
                type="radio"
                name="aide"
                value="true"
                checked={uneReunion.aide === true}
                onChange={mettre_A_Jour_Les_Donnees_saisies}
                className="mr-2"
              />
              <label htmlFor="aideOui" className="text-sm">
                Oui
              </label>
            </div>
            <div>
              <input
                id="aideNon"
                type="radio"
                name="aide"
                value="false"
                checked={uneReunion.aide === false}
                onChange={mettre_A_Jour_Les_Donnees_saisies}
                className="mr-2"
              />
              <label htmlFor="aideNon" className="text-sm">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="groupeWhatsapp"
            placeholder="Lien du groupe Whatsapp."
            value={uneReunion.groupeWhatsapp}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <Button
          onClick={onSave}
          actif={true}
          variante="bleu"
          taille="px-3 py-1.5"
          chargement={false}
          className={style_gradiant_blue + ' m-1'}>
          <p>{titre().titre_Bouton_Bleu}</p>
        </Button>
        <Button
          onClick={onCancel}
          actif={true}
          variante="rouge"
          taille="px-3 py-1.5"
          chargement={false}
          className={style_gradiant_red + ' m-1'}>
          <p>Annuler</p>
        </Button>
      </div>
    </div>
  );
};
export default Modal_Reunion;
