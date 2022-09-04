import Urbit from '@urbit/http-api';
import { createContext } from 'react';
import { Contacts } from '../types/ContactTypes';
import { FieldSettings } from '../types/SettingTypes';

export type AppContextType = {
  api: Urbit,
  contacts: Contacts,
  selectedContactKey: string | null,
  selectContact: (key: string) => void,
  closeAddContactModal: () => void,
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void,
  editContactMode: boolean,
  setEditContactMode: (value: boolean) => void,
  fieldSettings: FieldSettings
}

function getUrbitApi(): Urbit {
  const api = new Urbit('', '', '');
  api.ship = window.ship;
  return api;
}

const initialContext: AppContextType = {
  api: getUrbitApi(),
  contacts: {},
  selectedContactKey: null,
  selectContact: () => {},
  closeAddContactModal: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  editContactMode: false,
  setEditContactMode: () => {},
  fieldSettings: { defs: {}, order: [] }
}

const AppContext = createContext(initialContext);

export { AppContext, initialContext };
