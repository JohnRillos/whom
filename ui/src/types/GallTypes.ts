import { Contact, Contacts, InfoValue } from './ContactTypes';
import { Self } from './ProfileTypes';
import { FieldDef, FieldTypeTag } from './SettingTypes';

export declare type GallApp = 'whom';

export declare type GallUpdate = ContactUpdate | FieldUpdate | SelfUpdate;

export declare type SubscribePath = '/contacts' | '/fields' | '/self';

export declare type ContactUpdate = {
  app: 'whom',
  path: '/contacts',
  data: Contacts
};

export declare type FieldUpdate = {
  app: 'whom',
  path: '/fields',
  data: FieldDef[]
};

export declare type SelfUpdate = {
  app: 'whom',
  path: '/self',
  data: Self
};

export type WhomAction = AddContactAction |
  EditContactAction |
  EditContactShipAction |
  DeleteContactAction |
  AddFieldAction |
  DelFieldAction |
  EditSelfAction;

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

type EditSelfAction = {
  'edit-self': {
    info: Record<string, InfoValue | null>
  }
};
