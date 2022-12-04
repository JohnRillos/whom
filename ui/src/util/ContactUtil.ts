import { Contact, Contacts, ContactWithKey, InfoFields } from '../types/ContactTypes';

function getFullName(contact: ContactWithKey): string {
  var first = contact.info['first-name'] || contact.profile?.info['first-name']?.value;
  var last = contact.info['last-name'] || contact.profile?.info['last-name']?.value;
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
  var nickname = contact.info.nickname || contact.profile?.info.nickname?.value as string | undefined;
  return nickname || '(New Contact)';
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
