import React from 'react';
import TextInput from './TextInput';
import DatePicker from './DatePicker';
import ListeDeroulante from './ListeDeroulante';
import Button from '../Button';
import { style_gradiant_blue } from '../../lib/styles';

export type TListeDeroulanteProps = {
  valeurSelectionnee: string;
  options: string[];
  placeholderLD: string;
};

export type TDateProps = {
  valeurSelectionnee: string;
  options: string[];
  placeholderLD: string;
};

interface FiltersProps {
  resultatRecherche: string;
  setResultatRecherche: React.Dispatch<React.SetStateAction<string>>;
  recherchePlaceholder: string;
  listeDesLD: TListeDeroulanteProps[];
  setListeDesLD: React.Dispatch<React.SetStateAction<TListeDeroulanteProps[]>>;
  dateFilters: string[];
  setDateFilters: React.Dispatch<React.SetStateAction<string[]>>;
  onFilter: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  resultatRecherche,
  setResultatRecherche,
  recherchePlaceholder,

  listeDesLD,
  setListeDesLD,
  dateFilters,

  setDateFilters,
  onFilter,
}) => {
  // Gestion des changements dans les dropdowns
  const handleDropdownChange = (index: number, valeurSelectionnee: string) => {
    const modifierDropdowns = [...listeDesLD];
    modifierDropdowns[index].valeurSelectionnee = valeurSelectionnee;
    setListeDesLD(modifierDropdowns);
  };

  // Gestion des changements dans les filtres de date
  const handleDateChange = (index: number, valeurSelectionnee: string) => {
    const modifierDates = [...dateFilters];
    modifierDates[index] = valeurSelectionnee;
    setDateFilters(modifierDates);
  };

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 p-4 bg-white rounded-lg shadow-lg mb-6">
      {/* Champs de texte dynamiques */}
      <TextInput
        value={resultatRecherche}
        onChange={(e) => setResultatRecherche(e.target.value)}
        placeholder={recherchePlaceholder}
        className="w-full sm:w-60"
      />

      {/* Listes déroulantes dynamiques */}

      {listeDesLD.map((dropdown, index) => (
        <ListeDeroulante
          key={index}
          value={dropdown.valeurSelectionnee}
          options={dropdown.options}
          onChange={(valeurSelectionnee) =>
            handleDropdownChange(index, valeurSelectionnee)
          }
          placeholder={dropdown.placeholderLD || 'Sélectionner...'}
          className="flex flex-col sm:flex-wrap  w-full sm:w-48"
          aria-label={`Filtrer par ${dropdown.options[0]}`}
        />
      ))}

      {/* Champs de date dynamiques */}
      {dateFilters.map((date, index) => (
        <DatePicker
          key={index}
          value={date}
          onChange={(e) => handleDateChange(index, e.target.value)}
          placeholder="Sélectionner une date"
          className="flex flex-col sm:flex-wrap w-full sm:w-48"
          aria-label="Filtrer par date"
        />
      ))}

      <Button
        onClick={onFilter}
        actif={true}
        variante="bleu"
        taille="px-5 py-2 w-full sm:w-auto"
        chargement={false}
        className={style_gradiant_blue}>
        <p>Rechercher</p>
      </Button>
    </div>
  );
};

export default Filters;
