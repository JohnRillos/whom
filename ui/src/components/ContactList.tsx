import React from 'react';
import { ContactCard } from './ContactCard';
import { Contacts, ContactWithKey } from '../types/ContactTypes';
import { getDisplayName, withKey } from '../util/ContactUtil';

// todo: add option to sort either @p or name
function sortContacts(contacts: ContactWithKey[]): ContactWithKey[] {
  return contacts.sort((a, b) => {
    var sortByA = getDisplayName(a).toLowerCase();
    var sortByB = getDisplayName(b).toLowerCase();
    return sortByA > sortByB ? 1 : -1;
  });
}

function unifiedContactsList(contacts: Contacts): ContactWithKey[] {
  var entries = Object.entries(contacts.urbitContacts)
    .concat(Object.entries(contacts.earthContacts));
  return sortContacts(entries.map(withKey));
}

export const ContactList = (props: {contacts: Contacts}) => {
  return (
    <ul className="divide-y divide-solid divide-gray-400/50">
      {unifiedContactsList(props.contacts).map((contact: ContactWithKey) => (
        <li key={contact.key} className="flex items-center space-x-3 leading-tight">
          <ContactCard contact={contact}/>
        </li>
      ))}
    </ul>
  );
}
