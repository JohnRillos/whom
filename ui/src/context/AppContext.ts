import Urbit from '@urbit/http-api';
import { createContext } from 'react';
import { Contacts } from '../types/ContactTypes';
import { GroupsProfile } from '../types/GroupsTypes';
import { PalsInfo } from '../types/PalsTypes';
import { Self } from '../types/ProfileTypes';
import { FieldSettings } from '../types/SettingTypes';

export type AppContextType = {
  api: Urbit,
  errorMessage: string | null,
  displayError: (message: string) => void,
  dismissError: () => void,
  contacts: Contacts,
  selectedContactKey: string | null,
  selectContact: (key: string) => void,
  closeAddContactModal: () => void,
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void,
  editContactMode: boolean,
  setEditContactMode: (value: boolean) => void,
  fieldSettings: FieldSettings,
  self: Self,
  palsSyncEnabled: boolean,
  palsInfo: PalsInfo,
  setPalsInfo: (pals: PalsInfo) => void,
  setPalModalOpen: (open: boolean) => void,
  rolodex: Record<string, GroupsProfile>,
}

function getUrbitApi(): Urbit {
  const api = new Urbit('', '', '');
  api.ship = window.ship;
  return api;
}

const initialContext: AppContextType = {
  api: getUrbitApi(),
  errorMessage: null,
  displayError: () => {},
  dismissError: () => {},
  contacts: {},
  selectedContactKey: null,
  selectContact: () => {},
  closeAddContactModal: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  editContactMode: false,
  setEditContactMode: () => {},
  fieldSettings: { defs: {}, order: [] },
  self: { info: {} },
  palsSyncEnabled: false,
  palsInfo: { running: false, pals: {} },
  setPalsInfo: () => {},
  setPalModalOpen: () => {},
  rolodex: {},
}

const AppContext = createContext(initialContext);

export { AppContext, initialContext };
