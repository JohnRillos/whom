import { Contact, Contacts, ContactWithKey, InfoFields } from '../types/ContactTypes';

function getFullName(info: InfoFields): string {
  var first = info['first-name'];
  var last = info['last-name'];
  return [first, last].filter(s => !!s).join(' ');
}

export function getDisplayName(contact: ContactWithKey): string {
  var fullName = getFullName(contact.info) || getFullName(contact.profile?.info || {});
  if (contact.ship) {
    if (fullName) {
      return fullName + ' (' + contact.ship + ')';
    }
    return contact.ship
  }
  if (fullName) {
    return fullName;
  }
  var nickname = contact.info.nickname || contact.profile?.info.nickname;
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
