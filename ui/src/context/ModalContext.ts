import { createContext } from 'react';
import { Contacts } from '../types/ContactTypes';

export type AppContextType = {
  contacts: Contacts | null,
  selectedContact: string | null,
  selectContact: (key: string) => void,
  isOpen: boolean,
  openModal: () => void,
  closeModal: () => void
}

const initialContext: AppContextType = {
  contacts: null,
  selectedContact: null,
  selectContact: () => {},
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
}

const ModalContext = createContext(initialContext);

export { ModalContext, initialContext };
