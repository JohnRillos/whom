import Urbit from '@urbit/http-api';
import { Contact } from './ContactTypes';

export declare type GallApp = 'whom';

export declare type GallUpdate = {
  api?: Urbit,
  app?: GallApp,
  data?: WhomUpdate
};

export declare type WhomUpdate = {
  urbitContacts: {
    [key: string]: Contact
  },
  earthContacts: {
    [key: string]: Contact
  }
};
