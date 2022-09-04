import Urbit from '@urbit/http-api';
import { Contact, Contacts, InfoValue } from './ContactTypes';

export declare type GallApp = 'whom';

export declare type GallUpdate = {
  api?: Urbit,
  app?: GallApp,
  data?: WhomUpdate
};

export declare type WhomUpdate = {
  contacts: Contacts
};

export type WhomAction = AddContactAction | EditContactAction | DeleteContactAction;

type AddContactAction = {
  'add-contact': {
    contact: Contact
  }
};

type EditContactAction = {
  'edit-contact': {
    key: string,
    info: Record<string, InfoValue | null>
  }
};

type DeleteContactAction = {
  'del-contact': {
    key: string
  }
};