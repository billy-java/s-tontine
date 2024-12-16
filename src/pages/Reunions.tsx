import Carte_Reunion from '../components/Cartes/Carte_Reunion';
import { TReunion } from '../lib/types';
import { style_gradiant_blue, style_gradiant_green } from '../lib/styles';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/Redux/redux';
import Modal_Reunion from '../components/Modals/Modal_Reunion';
import { ouvrirModal } from '../lib/Redux/appStateSlice';

const Reunions = () => {
  const dispatch = useDispatch();

  const reunions: TReunion[] = useSelector(
    (state: RootState) => state.reunion.reunions
  );

  // Trier les réunions : acceptées en haut, refusées en bas
  const sortedReunions = [...reunions].sort((a, b) => {
    const aRejected = a.idRejetes.length > 0 ? 1 : 0;
    const bRejected = b.idRejetes.length > 0 ? 1 : 0;
    return aRejected - bRejected;
  });

  const debuterCreation = () => {
    dispatch(ouvrirModal({ modal: 'reunionModal'}));
  };

  return (
    <div className="w-full bg-red-300 flex flex-col items-center px-2 py-10">
      {/* Section des boutons */}
      <div className="bg-white w-full px-5 my-10">
        <div className="flex bg-slate-600 flex-wrap justify-center">
          <Button
            onClick={() => alert('Adhérer à une réunion')}
            actif={true}
            variante="bleu"
            taille="px-3 py-1.5"
            chargement={false}
            className={`${style_gradiant_green} mx-1 m-4`}>
            Adhérer à une réunion
          </Button>
          <Button
            onClick={() => debuterCreation()}
            actif={true}
            variante="bleu"
            taille="px-3 py-1.5"
            chargement={false}
            className={`${style_gradiant_blue} mx-1 m-4`}>
            Créer une réunion
          </Button>
        </div>
      </div>

      {/* Section des réunions */}
      <div className="mt-10 bg-white w-full px-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">
          Liste de mes réunions
        </h1>
        <div className="mt-5 w-full flex flex-wrap justify-center">
          {sortedReunions.map((reunion) => (
            <Carte_Reunion key={reunion.id} reunion={reunion} />
          ))}
        </div>
      </div>
          <Modal_Reunion />
    </div>
  );
};

export default Reunions;
