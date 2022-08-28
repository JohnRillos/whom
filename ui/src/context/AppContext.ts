import Urbit from '@urbit/http-api';
import { createContext } from 'react';
import { Contacts } from '../types/ContactTypes';

export type AppContextType = {
  api: Urbit,
  contacts: Contacts | null,
  selectedContactKey: string | null,
  selectContact: (key: string) => void,
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void
}

function getUrbitApi(): Urbit {
  const api = new Urbit('', '', '');
  api.ship = window.ship;
  return api;
}

const initialContext: AppContextType = {
  api: getUrbitApi(),
  contacts: null,
  selectedContactKey: null,
  selectContact: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
}

const AppContext = createContext(initialContext);

export { AppContext, initialContext };
