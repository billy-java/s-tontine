import { style_gradiant_green, style_gradiant_blue } from '../lib/styles';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="w-full bg-red-300 flex flex-col justify-center items-center px-2 py-10">
      <div className="bg-white w-full px-5 my-10">
        <div className="flex  bg-slate-600 flex-wrap justify-center  ">
          <Button
            onClick={() => alert('Éditer une reunion')}
            actif={true}
            variante="bleu"
            taille="px-6 py-2 text-lg"
            chargement={false}
            className={`${style_gradiant_green}} mx-1 m-4`}>
            Adherer a une reusion
          </Button>
          <Button
            onClick={() => alert('Éditer une reunion')}
            actif={true}
            variante="bleu"
            taille="px-6 py-2 text-lg"
            chargement={false}
            className={`${style_gradiant_blue}} mx-1 m-4`}>
            Creer une reusion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
