import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/Redux/redux';
import { initialiserMembre, TMembre } from '../../lib/types';
import { useEffect, useState } from 'react';
import { ajouterMembre, modifierMembre } from '../../lib/Redux/membreSlice';
import { fermerModal } from '../../lib/Redux/appStateSlice';
import Button from '../Button';
import { style_gradiant_blue, style_gradiant_red } from '../../lib/styles';

const Modal_Membre = () => {
  const { isOpen, idToUpdate } = useSelector(
    (state: RootState) => state.appState.membreModal
  );
  const dispatch = useDispatch();
  const membres: TMembre[] = useSelector(
    (state: RootState) => state.membre.membres
  );

  const [unMembre, setUnMembre] = useState<TMembre>(initialiserMembre());

  useEffect(() => {
    if (idToUpdate) {
      const membreToUpdate = membres.find((m) => m.id === idToUpdate);
      if (membreToUpdate) {
        setUnMembre(membreToUpdate);
      }
    } else {
      setUnMembre(initialiserMembre());
    }
  }, [idToUpdate, membres]);

  if (!isOpen) return null;

  const titre = (): { titreModal: string; titre_Bouton_Bleu: string } => {
    const nouveau = {
      titreModal: 'Créer un Membre',
      titre_Bouton_Bleu: 'Créer le Membre',
    };
    const modifier = {
      titreModal: 'Modifier un Membre',
      titre_Bouton_Bleu: 'Modifier le Membre',
    };
    return unMembre.id === 'default-id' ? nouveau : modifier;
  };

  const mettre_A_Jour_Les_Donnees_saisies = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setUnMembre((prevMembre) => ({
      ...prevMembre,
      [name]: type === 'radio' ? value === 'true' : value,
    }));
  };

  const onSave = () => {
    if (unMembre.id === 'default-id') {
      dispatch(ajouterMembre(unMembre));
    } else {
      dispatch(modifierMembre(unMembre));
    }
    dispatch(fermerModal('membreModal'));
  };

  const onCancel = () => {
    dispatch(fermerModal('membreModal'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-sm sm:text-base lg:text-base w-[70%] sm:w-2/3 lg:w-1/3 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{titre().titreModal}</h2>
        <div className="mb-4">
          <input
            type="text"
            name="nom"
            value={unMembre.nom}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Nom"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={unMembre.email}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={unMembre.password}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Mot de passe"
          />
        </div>
        <div className="mb-4">
          <select
            name="role"
            value={unMembre.role}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="Président">Président</option>
            <option value="VicePrésident">Vice-Président</option>
            <option value="Trésorier">Trésorier</option>
            <option value="Censeur">Censeur</option>
            <option value="Secrétaire">Secrétaire</option>
            <option value="Membre">Membre</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="metier"
            value={unMembre.metier}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Métier"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="commenceTravail"
            value={unMembre.commenceTravail}
            onChange={mettre_A_Jour_Les_Donnees_saisies}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Commence travail"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="approuvee"
            className="block text-sm font-medium text-gray-700">
            Accepter la demande dadhesion ?
          </label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                id="approuveeOui"
                type="radio"
                name="approuvee"
                value="true"
                checked={unMembre.approuvee === true}
                onChange={mettre_A_Jour_Les_Donnees_saisies}
                className="mr-2"
              />
              <label htmlFor="approuveeOui" className="text-sm">
                Oui
              </label>
            </div>
            <div>
              <input
                id="approuveeNon"
                type="radio"
                name="approuvee"
                value="false"
                checked={unMembre.approuvee === false}
                onChange={mettre_A_Jour_Les_Donnees_saisies}
                className="mr-2"
              />
              <label htmlFor="approuveeNon" className="text-sm">
                Non
              </label>
            </div>
          </div>
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

export default Modal_Membre;
