import React from 'react';
import { useContext } from 'react';
import { ContactCard } from './ContactCard';
import { AppContext } from '../context/AppContext';
import { Contacts, ContactWithKey } from '../types/ContactTypes';
import { getDisplayName, withKey } from '../util/ContactUtil';

// todo: add option to sort by either @p or name
function sortContacts(contacts: ContactWithKey[]): ContactWithKey[] {
  return contacts.sort((a, b) => {
    const sortByA = getDisplayName(a).toLowerCase();
    const sortByB = getDisplayName(b).toLowerCase();
    return sortByA > sortByB ? 1 : -1;
  });
}

function unifiedContactsList(contacts: Contacts): ContactWithKey[] {
  return sortContacts(Object.entries(contacts).map(withKey));
}

export const ContactList = () => {
  const { contacts } = useContext(AppContext);
  return (
    <div className="h-full w-full overflow-y-auto">
      <ul className="m-auto max-w-fit divide-y divide-gray-400/50">
        {unifiedContactsList(contacts).map((contact: ContactWithKey) => (
          <li key={contact.key} className="flex items-center space-x-3 leading-tight mx-4">
            <ContactCard contact={contact}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
