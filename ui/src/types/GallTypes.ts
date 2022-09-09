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
  DeleteContactAction |
  AddCustomFieldAction;

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

type DeleteContactAction = {
  'del-contact': {
    key: string
  }
};

type AddCustomFieldAction = {
  'add-custom-field': {
    key: string,
    def: {
      name: string,
      type: FieldTypeTag,
      custom: true
    }
  }
};
