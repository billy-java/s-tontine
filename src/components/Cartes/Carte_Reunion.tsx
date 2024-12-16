import { FC } from 'react';
import { TReunion } from '../../lib/types';
import Button from '../Button';
import { iconsListe } from '../../lib/iconsListe';
import { style_gradiant_blue, style_gradiant_red } from '../../lib/styles';
import { useDispatch } from 'react-redux';
import { supprimerReunion } from '../../lib/Redux/reunionSlice';
import { ouvrirModal } from '../../lib/Redux/appStateSlice';

interface ReunionCardProps {
  reunion: TReunion;
}

const Carte_Reunion: FC<ReunionCardProps> = ({ reunion }) => {
  const dispatch = useDispatch();

  const debuterModification = () => {
    dispatch(ouvrirModal({ modal: 'reunionModal', idToUpdate: reunion.id }));
  };

  const handleSupprimer = () => {
    dispatch(supprimerReunion(reunion.id));
  };

  return (
    <dl className="w-full lg:w-2/5 opacity-85 bg-white shadow-lg shadow-sky-700 rounded-lg pt-4 mx-4 my-5">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1">
          <dl className="px-7">
            <div className="border border-t-white border-x-white pb-4 border-b-slate-700">
              <div className="flex flex-wrap items-center">
                <h2 className="text-2xl font-semibold mb-2 mr-3">
                  {reunion.nomReunion}
                </h2>
                <dd className="flex items-center space-x-2 bg-gray-300 text-sm rounded-sm px-2">
                  <span>{reunion.type}</span>
                  {iconsListe.badge2Petit}
                </dd>
              </div>
              <dd className="flex flex-wrap">
                <span className="mr-4">8 Membres,</span>
                <span className="mr-4">{reunion.dateCreation},</span>
                <span>3 Versements.</span>
              </dd>
              <dd className="flex flex-wrap">
                <p className="mr-2 underline">{'ID de connexion:'}</p>
                <div className="flex flex-wrap">
                  <strong className="mr-1">{reunion.idInscription}</strong>
                  {iconsListe.securite}
                </div>
              </dd>
            </div>
          </dl>

          <dl className="px-7 text-gray-600 mb-1 border border-t-white border-x-white py-4 border-b-white">
            <dl>
              <strong>Description: </strong>
              {reunion.description1}
              <dd>{reunion.description2}</dd>
            </dl>
          </dl>
        </div>
        <dl className="px-7 text-gray-600 mb-1">
          <div className="border border-x-white border-y-slate-700 py-4">
            <dl className="flex flex-wrap items-center space-x-4">
              <strong>Épargne: </strong>
              {reunion.epargne ? (
                <div className="flex flex-wrap items-center space-x-2">
                  <span>Oui</span> {iconsListe.true2}
                </div>
              ) : (
                <div className="flex flex-wrap items-center space-x-2">
                  <span>Non</span> {iconsListe.false}
                </div>
              )}
            </dl>
            <dl className="px-7 flex flex-wrap items-center space-x-4">
              <strong>Aide: </strong>
              {reunion.aide ? (
                <div className="flex flex-wrap items-center space-x-2">
                  <span>Oui</span> {iconsListe.true2}
                </div>
              ) : (
                <div className="flex flex-wrap items-center space-x-2">
                  <span>Non</span> {iconsListe.false}
                </div>
              )}
            </dl>
          </div>
        </dl>

        <p className="mt-2 mx-7 text-sky-500 hover:text-white hover:bg-sky-700 hover:px-3 py-1 hover:rounded-md w-fit mb-4">
          <a
            href={reunion.groupeWhatsapp}
            target="_blank"
            rel="noopener noreferrer">
            Rejoindre le groupe WhatsApp
          </a>
        </p>
        <dl className="flex flex-wrap px-7">
          <Button
            onClick={() => debuterModification()}
            actif={true}
            variante="bleu"
            taille="px-3 py-1.5"
            chargement={false}
            className={`${style_gradiant_blue} m-1`}>
            Modifier
          </Button>
          <Button
            onClick={() => handleSupprimer()}
            actif={true}
            variante="rouge"
            taille="px-3 py-1.5"
            chargement={false}
            className={`${style_gradiant_red} m-1`}>
            Supprimer
          </Button>
        </dl>

        <dl className="bg-sky-700 rounded-t-lg mt-4 text-white border border-t-white border-x-white border-b-slate-700">
          <p className="text-center">Vous êtes membre de cette réunion.</p>
        </dl>
      </div>
    </dl>
  );
};

export default Carte_Reunion;
