import Urbit from '@urbit/http-api';
import { Contact, Contacts, InfoFields } from './ContactTypes';

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
    info: InfoFields,
    custom: Record<string, string>
  }
};

type DeleteContactAction = {
  'del-contact': {
    key: string
  }
};