import { Contact } from '../types/ContactTypes';

function getFullName(contact: Contact): string {
  var first = contact.info['first-name'];
  var last = contact.info['last-name'];
  return [first, last].filter(s => !!s).join(' ');
}

export function getDisplayName(contact: Contact) {
  var fullName = getFullName(contact);
  if (contact.ship) {
    if (fullName) {
      return fullName + ' (' + contact.ship + ')';
    }
    return contact.ship
  }
  return fullName || '< New Contact >';
}
