import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  actif?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variante?: 'bleu' | 'rouge' | 'jaune';
  taille?: 'sm' | 'md' | 'lg' | string;
  chargement?: boolean;
  className?: string;
}

const Button = ({
  onClick,
  children,
  actif = false,
  variante = 'bleu',
  taille = 'md',
  chargement = false,
  className = '',
}: ButtonProps) => {
  const baseClass = `cursor shadow-lg text-white rounded-lg ${variante} ${taille} ${className}`;
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={!actif || chargement}
      className={baseClass}>
      {chargement ? <p>chargement...</p> : children}
    </button>
  );
};

export default Button;



/* 

<Button
        onClick={() => alert('Clic !')}
        actif={true}
        variante="bleu"
        taille="px-3 py-1.5"
        chargement={false}
        className={style_gradiant_blue}>
        <p>Mon Bouton 111</p>
      </Button>
      
      */