import { Contact, Contacts, ContactWithKey } from '../types/ContactTypes';

function getFullName(contact: Contact): string {
  var first = contact.info['first-name'];
  var last = contact.info['last-name'];
  return [first, last].filter(s => !!s).join(' ');
}

export function getDisplayName(contact: ContactWithKey): string {
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
  const [ key, contact ] = entry;
  return {
    ...contact,
    key: key,
    ship: key.charAt(0) == '~' ? key : null,
  };
}

export function getContactWithKey(contacts: Contacts, contactKey: string): ContactWithKey | undefined {
  const contact = contacts[contactKey];
  return contact ? withKey([contactKey, contact]) : undefined;
}
