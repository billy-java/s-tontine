export type TReunion = {
  id: string;
  idInscription: string;
  idCreateur: string;
  nomReunion: string;
  description1: string;
  description2: string;
  type: 'Tournante' | 'Investissement';
  dateCreation: string;
  epargne: boolean;
  aide: boolean;
  idRejetes: string[];
  groupeWhatsapp: string;
};

export function generateUniqueIdInscription(
  existingReunions: TReunion[]
): string {
  const existingIds = new Set(
    existingReunions.map((reunion) => reunion.idInscription)
  );

  let newId: string;
  do {
    newId = createId(); // Générer un ID aléatoire
  } while (existingIds.has(newId)); // Vérifier qu'il n'est pas déjà utilisé

  return newId;
}

function createId(): string {
  // Génère une chaîne au format 000-00-0000
  const part1 = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  const part2 = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');
  const part3 = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${part1}-${part2}-${part3}`;
}

export type TMembre = {
  id: string;
  idReunion: string;
  nom: string;
  email: string;
  password: string;
  role:
    | 'Président'
    | 'VicePrésident'
    | 'Trésorier'
    | 'Censeur'
    | 'Secrétaire'
    | 'Membre';
  metier: string;
  commenceTravail: string;
  demandeAdhesion: boolean;
  approuvee: boolean;
  actif: boolean;
};

export type TTransaction = {
  id: string;
  idReunion: string;
  idReceveur: string;
  type: 'Cotisation' | 'Versement' | 'Prêt' | 'Aide';
  status: 'En attente' | 'Acceptée' | 'Rejetée'; //Applicable pour cotisations et prêts
  montant: string;
  dateTransaction: string;
  description: string;
  tauxInteret: string; //Applicable pour prêts
  duree: string; //combien de mois ? applicable pour cotisations et prêts
  frequenceTransaction: number; //applicable pour cotisations
  approuvee: boolean; //Applicable pour cotisations, aide et prets
};

export type TActivite = {
  id: string;
  idReunion: string;
  type: 'Événement' | 'Vote' | 'Badge';
  titre: string;
  description: string;
  dateCreation: string;
  optionVote1: string;
  optionVote2: string;
  resultat: 'Aucun' | 'Option 1' | 'Option 2';
  lieu: string; //Applicable pour événements
  heure: string; //Applicable pour événements
  idReceveur: string; //Applicable pour badges
};

export type TNotification = {
  id: string;
  idReunion: string;
  idDestinateur: string; //si la notification est envoyée par un membre
  titre: string;
  message: string;
  lu: boolean;
  dateCreation: string;
  urlRedirection: string;
};

export function initialiserReunion(
  id: string = 'default-id',
  idInscription: string = 'default-inscription-id',
  idCreateur: string = 'default-createur-id',
  nomReunion: string = 'Nom de la Réunion',
  description1: string = 'Description 1',
  description2: string = 'Description 2',
  type: 'Tournante' | 'Investissement' = 'Tournante',
  dateCreation: string = new Date().toISOString(),
  epargne: boolean = false,
  aide: boolean = false,
  idRejetes: string[] = [],
  groupeWhatsapp: string = 'default-whatsapp-group'
): TReunion {
  return {
    id,
    idInscription,
    idCreateur,
    nomReunion: nomReunion,
    description1,
    description2,
    type,
    dateCreation,
    epargne,
    aide,
    idRejetes,
    groupeWhatsapp,
  };
}

export function initialiserMembre(
  id: string = 'default-id',
  idReunion: string = 'default-reunion-id',
  name: string = 'Nom du Membre',
  email: string = 'exemple@email.com',
  password: string = 'motdepasse',
  role:
    | 'Président'
    | 'VicePrésident'
    | 'Trésorier'
    | 'Censeur'
    | 'Secrétaire'
    | 'Membre' = 'Membre',
  metier: string = 'Métier',
  commenceTravail: string = new Date().toISOString(),
  demandeAdhesion: boolean = false,
  approuvee: boolean = false,
  actif: boolean = true
): TMembre {
  return {
    id,
    idReunion,
    nom: name,
    email,
    password,
    role,
    metier,
    commenceTravail,
    demandeAdhesion,
    approuvee,
    actif,
  };
}

export function initialiserTransaction(
  id: string = 'default-id',
  idReunion: string = 'default-reunion-id',
  idReceveur: string = 'default-receveur-id',
  type: 'Cotisation' | 'Versement' | 'Prêt' | 'Aide' = 'Cotisation',
  status: 'En attente' | 'Acceptée' | 'Rejetée' = 'En attente', //Applicable pour cotisations et prêts
  montant: string = '0',
  dateTransaction: string = new Date().toISOString(),
  description: string = 'Description de la Transaction',
  tauxInteret: string = '0', //Applicable pour prêts
  duree: string = '0', //combien de mois ? applicable pour cotisations et prêts
  frequenceTransaction: number = 1, //applicable pour cotisations
  approuvee: boolean = false //Applicable pour cotisations, aide et prets
): TTransaction {
  return {
    id,
    idReunion,
    idReceveur,
    type,
    status,
    montant,
    dateTransaction,
    description,
    tauxInteret,
    duree,
    frequenceTransaction,
    approuvee,
  };
}

export function initialiserActivite(
  id: string = 'default-id',
  idReunion: string = 'default-reunion-id',
  type: 'Événement' | 'Vote' | 'Badge' = 'Événement',
  titre: string = "Titre de l'Activité",
  description: string = "Description de l'Activité",
  dateCreation: string = new Date().toISOString(),
  optionVote1: string = 'Option 1',
  optionVote2: string = 'Option 2',
  resultat: 'Aucun' | 'Option 1' | 'Option 2' = 'Aucun',
  lieu: string = "Lieu de l'Événement", //Applicable pour événements
  heure: string = '00:00', //Applicable pour événements
  idReceveur: string = 'default-receveur-id' //Applicable pour badges
): TActivite {
  return {
    id,
    idReunion,
    type,
    titre,
    description,
    dateCreation,
    optionVote1,
    optionVote2,
    resultat,
    lieu,
    heure,
    idReceveur,
  };
}

export function initialiserNotification(
  id: string = 'default-id',
  idReunion: string = 'default-reunion-id',
  idDestinateur: string = 'default-destinateur-id', //si la notification est envoyée par un membre
  titre: string = 'Titre de la Notification',
  message: string = 'Message de la Notification',
  lu: boolean = false,
  dateCreation: string = new Date().toISOString(),
  urlRedirection: string = 'http://example.com'
): TNotification {
  return {
    id,
    idReunion,
    idDestinateur,
    titre,
    message,
    lu,
    dateCreation,
    urlRedirection,
  };
}
