import { Contact, Contacts, InfoValue } from './ContactTypes';
import { FieldDef, FieldTypeTag } from './SettingTypes';

export declare type GallApp = 'whom';

export declare type GallUpdate = ContactUpdate | FieldUpdate;

export declare type SubscribePath = '/updates' | '/settings/fields';

export declare type ContactUpdate = {
  app: 'whom',
  path: '/updates',
  data: {
    contacts: Contacts
  }
};

export declare type FieldUpdate = {
  app: 'whom',
  path: '/settings/fields',
  data: FieldDef[]
};

export type WhomAction = AddContactAction |
  EditContactAction |
  EditContactShipAction |
  DeleteContactAction |
  AddFieldAction |
  DelFieldAction;

type AddContactAction = {
  'add-contact': {
    ship: string | null,
    contact: Contact
  }
};

type EditContactAction = {
  'edit-contact': {
    key: string,
    info: Record<string, InfoValue | null>
  }
};

type EditContactShipAction = {
  'edit-contact-ship': {
    key: string,
    ship: string | null
  }
};

type DeleteContactAction = {
  'del-contact': {
    key: string
  }
};

type AddFieldAction = {
  'add-field': {
    key: string,
    def: {
      name: string,
      type: FieldTypeTag,
    }
  }
};

type DelFieldAction = {
  'del-field': {
    key: string
  }
};
