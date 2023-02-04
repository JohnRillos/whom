import { ContactStoreProfile } from './ContactStoreTypes';
import { Contact, Contacts, InfoValue } from './ContactTypes';
import { PalsInfo } from './PalsTypes';
import { Self, ProfileField } from './ProfileTypes';
import { FieldDefWithKey, FieldTypeTag } from './SettingTypes';

export declare type GallApp = 'whom' | 'contact-store';

export declare type GallUpdate = WhomUpdate | ContactStoreUpdate;

export declare type WhomUpdate
  = ContactUpdate
  | FieldUpdate
  | SelfUpdate
  | ImportPalsUpdate
  | PalsUpdate;

export enum SubscribePath {
  Contacts = '/1/contacts',
  Fields = '/0/fields',
  Self = '/0/self',
  ImportPals = '/0/pals/import',
  Pals = '/0/pals',
  ContactStore = '/all',
}

export declare type ContactUpdate = {
  app: 'whom',
  path: SubscribePath.Contacts,
  data: Contacts
};

export declare type FieldUpdate = {
  app: 'whom',
  path: SubscribePath.Fields,
  data: FieldDefWithKey[]
};

export declare type SelfUpdate = {
  app: 'whom',
  path: SubscribePath.Self,
  data: Self
};

export declare type ImportPalsUpdate = {
  app: 'whom',
  path: SubscribePath.ImportPals,
  data: boolean
}

export declare type PalsUpdate = {
  app: 'whom',
  path: SubscribePath.Pals,
  data: PalsInfo
}

export declare type ContactStoreUpdate = {
  app: 'contact-store',
  path: SubscribePath.ContactStore,
  data: {
    'contact-update': {
      initial?: {
        'is-public': boolean,
        rolodex: Record<string, ContactStoreProfile>
      },
      add?: {
        ship: string,
        contact: ContactStoreProfile
      },
      'set-public'?: boolean
    }
  }
}

export type WhomAction = AddContactAction |
  EditContactAction |
  EditContactShipAction |
  DeleteContactAction |
  AddFieldAction |
  DelFieldAction |
  EditSelfAction |
  PalSyncAction |
  HeyPalAction |
  ByePalAction;

type AddContactAction = {
  'add-contact': {
    ship: string | null,
    contact: Contact
  }
};

type EditContactAction = {
  'mod-contact-info': {
    key: string,
    info: Record<string, InfoValue | null>
  }
};

type EditContactShipAction = {
  'mod-contact-ship': {
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
  'mod-self': {
    info: Record<string, ProfileField | null>
  }
};

type PalSyncAction = {
  'pal-sync': {
    enabled: boolean
  }
}

type HeyPalAction = {
  'hey-pal': string
}

type ByePalAction = {
  'bye-pal': string
}
