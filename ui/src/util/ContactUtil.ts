import { Contact, ContactWithKey } from '../types/ContactTypes';

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
  var label = contact.info.label as string | undefined;
  return label || '< New Contact >';
}

export function withKey(entry:[string, Contact]): ContactWithKey {
  return {
    key: entry[0],
    ...entry[1],
  };
}