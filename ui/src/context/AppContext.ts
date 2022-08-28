import Urbit from '@urbit/http-api';
import { createContext } from 'react';
import { Contacts } from '../types/ContactTypes';
import { initialContacts } from '../util/ContactUtil';

export type AppContextType = {
  api: Urbit,
  contacts: Contacts,
  selectedContactKey: string | null,
  selectContact: (key: string) => void,
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void,
  editContactMode: boolean,
  setEditContactMode: (value: boolean) => void,
}

function getUrbitApi(): Urbit {
  const api = new Urbit('', '', '');
  api.ship = window.ship;
  return api;
}

const initialContext: AppContextType = {
  api: getUrbitApi(),
  contacts: initialContacts,
  selectedContactKey: null,
  selectContact: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  editContactMode: false,
  setEditContactMode: () => {}
}

const AppContext = createContext(initialContext);

export { AppContext, initialContext };
