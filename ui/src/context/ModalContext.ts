import { createContext } from 'react';
import { Contacts } from '../types/ContactTypes';

export type AppContextType = {
  contacts: Contacts | null,
  selectedContactKey: string | null,
  selectContact: (key: string) => void,
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void
}

const initialContext: AppContextType = {
  contacts: null,
  selectedContactKey: null,
  selectContact: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
}

const ModalContext = createContext(initialContext);

export { ModalContext, initialContext };
