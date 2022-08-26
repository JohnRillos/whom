import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Subscribe } from './api/Subscribe';
import { ContactCard } from './components/ContactCard';
import { Contacts, ContactWithKey } from './types/ContactTypes';
import { GallUpdate } from './types/GallTypes';
import { getDisplayName, withKey } from './util/ContactUtil';

const urbit = new Urbit('', '', '');
urbit.ship = window.ship;

async function scryContacts(): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts/all' });
}

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

export function App() {
  const [contacts, setContacts] = useState<Contacts>();

  useEffect(() => {
    scryContacts()
      .then(res => setContacts(res))
      .then(() => Subscribe(handleUpdate));
  }, []);

  function handleUpdate(update: GallUpdate) {
    if (update.app === 'whom' && update.data) {
      setContacts({
        urbitContacts: update.data.urbitContacts,
        earthContacts: update.data.earthContacts
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-black text-black dark:text-gray-200">
      <div className="max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Contacts</h1>
        {contacts && (
          <ul className="divide-y divide-solid divide-gray-400/50">
            {unifiedContactsList(contacts).map((contact: ContactWithKey) => (
              <li key={contact.key} className="flex items-center space-x-3 leading-tight">
                <ContactCard {...contact} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
