import { Contact, Contacts, ContactWithKey } from '../types/ContactTypes';

function getFullNameFromMe(contact: Contact): string {
  const first = contact.info['first-name'];
  const last = contact.info['last-name'];
  return [first, last].filter(s => !!s).join(' ');
}

function getFullNameFromThem(contact: Contact): string {
  const first = contact.profile?.info['first-name']?.value;
  const last = contact.profile?.info['last-name']?.value;
  return [first, last].filter(s => !!s).join(' ');
}

function getNicknameFromMe(contact: Contact): string | undefined {
  return contact.info.nickname;
}

function getNicknameFromThem(contact: Contact): string | undefined {
  return contact.profile?.info.nickname?.value;
}

export function getDisplayName(contact: ContactWithKey): string {
  const alias = getNicknameFromMe(contact) || getFullNameFromMe(contact) ||
              getFullNameFromThem(contact) || getNicknameFromThem(contact);
  if (contact.ship && alias) {
    return alias + ' (' + contact.ship + ')';
  }
  if (contact.ship) {
    return contact.ship
  }
  return alias || '(New Contact)';
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
