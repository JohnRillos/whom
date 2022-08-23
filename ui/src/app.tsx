import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { ContactTile } from './components/ContactTile';
import { Contact, Contacts } from './types/ContactTypes';
import { GallUpdate } from './types/GallTypes';
import { Subscribe } from './logic/Subscribe';

const urbit = new Urbit('', '', '');
urbit.ship = window.ship;

async function scryContacts(): Promise<Contacts> {
  return urbit.scry<Contacts>({ app: 'whom', path: '/contacts/all' });
}

function unifiedContactsList(contacts: Contacts): Contact[] {
  return Object.values(contacts.urbitContacts).concat(Object.values(contacts.earthContacts));
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
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Contacts</h1>
        {contacts && (
          <ul className="space-y-4">
            {unifiedContactsList(contacts).map((contact: Contact) => (
              <li key={contact.ship} className="flex items-center space-x-3 text-sm leading-tight">
                <ContactTile {...contact} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
