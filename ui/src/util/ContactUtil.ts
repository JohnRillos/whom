import { Contact, Contacts, ContactWithKey, InfoValueTypeName } from '../types/ContactTypes';

function getFullName(contact: Contact): string {
  var first = contact.info['first-name'];
  var last = contact.info['last-name'];
  return [first, last].filter(s => !!s).join(' ');
}

export function getDisplayName(contact: Contact): string {
  var fullName = getFullName(contact);
  if (contact.ship) {
    if (fullName) {
      return fullName + ' (' + contact.ship + ')';
    }
    return contact.ship
  }
  if (fullName) {
    return fullName;
  }
  var label = contact.info.label;
  return label || '???';
}

export function withKey(entry: [string, Contact]): ContactWithKey {
  return {
    key: entry[0],
    ...entry[1],
  };
}

export function getContactWithKey(contacts: Contacts, contactKey: string): ContactWithKey | undefined {
  const contact = contacts[contactKey];
  return contact ? withKey([contactKey, contact]) : undefined;
}

// TODO: fetch field defs from gall instead
const INFO_FIELD_DEFS: Record<string, InfoFieldDef> = {
  'first-name': { display: 'First Name', type: 'string' },
  'middle-name': { display: 'Middle Name', type: 'string' },
  'last-name': { display: 'Last Name', type: 'string' },
  'nickname': { display: 'Nickname', type: 'string' },
  'label': { display: 'Label', type: 'string' },
  'dob': { display: 'Date of Birth', type: 'InfoDate' },
  'note': { display: 'Note', type: 'string' },
  'job': { display: 'Occupation', type: 'string' },
  'phone': { display: 'Phone #', type: 'string' },
  'email': { display: 'Email', type: 'string' },
  'website': { display: 'Website', type: 'string' },
  'github': { display: 'GitHub', type: 'string' },
  'twitter': { display: 'Twitter', type: 'string' }
} as const;

type InfoFieldDef = {
  display: string,
  type: InfoValueTypeName
}

export const OrderedInfoKeys: string[] = Object.keys(INFO_FIELD_DEFS) as string[];

export function getFieldDisplayName(key: string): string {
  return INFO_FIELD_DEFS[key].display;
}

export function getFieldType(key: string): InfoValueTypeName {
  return INFO_FIELD_DEFS[key].type;
}
