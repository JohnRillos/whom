import { Contact, Contacts, ContactWithKey } from '../types/ContactTypes';

export const initialContacts: Contacts = {
  urbitContacts: {},
  earthContacts: {}
}

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

export function withKey(entry:[string, Contact]): ContactWithKey {
  return {
    key: entry[0],
    ...entry[1],
  };
}

export function getContact(contacts: Contacts, contactKey: string): Contact | undefined {
  return contacts.urbitContacts[contactKey] || contacts.earthContacts[contactKey];
}
