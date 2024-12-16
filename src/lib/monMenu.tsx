import { ReactNode } from 'react';
import { iconsListe } from './iconsListe';

export type IMenu = {
  actif: boolean;
  nom: string;
  lien: string;
  icon1?: ReactNode;
  icon2?: ReactNode;
};

export const monMenu: IMenu[] = [
  {
    actif: true,
    nom: 'Accueil',
    lien: '/',
    icon1: iconsListe.home,
    icon2: iconsListe.dashboard,
  },
  {
    actif: false,
    nom: 'Notifications',
    lien: '/notifications',
    icon1: iconsListe.notifications1,
    icon2: iconsListe.notifications2,
  },
  {
    actif: false,
    nom: 'Reunions',
    lien: '/reunions',
    icon1: iconsListe.reunion,
  },
  {
    actif: false,
    nom: 'Membres',
    lien: '/membres',
    icon1: iconsListe.membre1,
    icon2: iconsListe.membre2,
  },
  {
    actif: false,
    nom: 'Transactions',
    lien: '/transactions',
    icon1: iconsListe.transaction,
  },
  {
    actif: false,
    nom: 'Activites',
    lien: '/activites',
    icon1: iconsListe.activite1,
    icon2: iconsListe.activite2,
  },

  {
    actif: false,
    nom: 'Parametres',
    lien: '/parametres',
    icon1: iconsListe.parametre1,
    icon2: iconsListe.parametre2,
  },
  {
    actif: false,
    nom: 'Contact',
    lien: '/contact',
    icon1: iconsListe.contact,
  },
  {
    actif: false,
    nom: 'Faq',
    lien: '/reponses',
    icon1: iconsListe.faq,
  },
  {
    actif: false,
    nom: 'A Propos',
    lien: '/apropos',
    icon1: iconsListe.apropos,
  },
];

export const sousMenu_Transactions: IMenu[] = [
  {
    actif: false,
    nom: 'Cotisations',
    lien: '/transactions/cotisations',
    icon1: iconsListe.cotisation,
  },
  {
    actif: false,
    nom: 'Versements',
    lien: '/transactions/versements',
    icon1: iconsListe.versement,
  },
  {
    actif: false,
    nom: 'Aides',
    lien: '/transactions/aides',
    icon1: iconsListe.aide,
  },
  {
    actif: false,
    nom: 'Prets',
    lien: '/transactions/prets',
    icon1: iconsListe.pret,
  },
];

export const sousMenu_Activites: IMenu[] = [
  {
    actif: false,
    nom: 'Evenements',
    lien: '/activites/evenements',
    icon1: iconsListe.evenement,
  },
  {
    actif: false,
    nom: 'Votes',
    lien: '/activites/votes',
    icon1: iconsListe.vote,
  },
  {
    actif: false,
    nom: 'Badges',
    lien: '/activites/badges',
    icon1: iconsListe.badge1,
    icon2: iconsListe.badge2,
  },
];
